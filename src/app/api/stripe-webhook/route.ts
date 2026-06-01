import { NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { Resend } from 'resend'
import { recordTierPurchase, revokeTier } from '@/lib/path4'
import { BASE_URL } from '@/lib/country'

// Node runtime required: uses node:crypto and the service-role Supabase client.
// (Edge breaks on transitive supabase imports — see memory next16_og_image_gotchas.)
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Manual Stripe signature verification — keeps the `stripe` SDK out of the
// dependency tree for the webhook. Algorithm is Stripe's documented scheme:
//   signed_payload = `${t}.${rawBody}`
//   expected       = HMAC_SHA256(signed_payload, webhook_secret)  (hex)
// compared timing-safe against each v1 in the Stripe-Signature header, with a
// 5-minute timestamp tolerance to reject replays.
const TOLERANCE_SECONDS = 300

function verifyStripeSignature(payload: string, header: string, secret: string): boolean {
  let timestamp: string | undefined
  const signatures: string[] = []
  for (const part of header.split(',')) {
    const idx = part.indexOf('=')
    if (idx === -1) continue
    const key = part.slice(0, idx).trim()
    const value = part.slice(idx + 1).trim()
    if (key === 't') timestamp = value
    else if (key === 'v1') signatures.push(value)
  }
  if (!timestamp || signatures.length === 0) return false

  const ts = Number.parseInt(timestamp, 10)
  if (!Number.isFinite(ts)) return false
  const nowSec = Math.floor(Date.now() / 1000)
  if (Math.abs(nowSec - ts) > TOLERANCE_SECONDS) return false

  const expected = createHmac('sha256', secret).update(`${timestamp}.${payload}`, 'utf8').digest('hex')
  const expectedBuf = Buffer.from(expected, 'utf8')
  return signatures.some((sig) => {
    const sigBuf = Buffer.from(sig, 'utf8')
    return sigBuf.length === expectedBuf.length && timingSafeEqual(sigBuf, expectedBuf)
  })
}

// Minimal shapes for the handled events. Without the SDK we type only what we
// read; the Day-2 Checkout-session endpoint sets `client_reference_id` (and a
// `metadata.company_id` fallback) to the company UUID so the webhook can map a
// payment back to a row.
interface StripeEventLite {
  type: string
  data: { object: Record<string, unknown> }
}

function asString(v: unknown): string | undefined {
  return typeof v === 'string' && v.length > 0 ? v : undefined
}

function companyIdFromObject(obj: Record<string, unknown>): string | undefined {
  const direct = asString(obj.client_reference_id)
  if (direct) return direct
  const meta = obj.metadata
  if (meta && typeof meta === 'object') return asString((meta as Record<string, unknown>).company_id)
  return undefined
}

// Internal alert so Christoph knows to run the manual verification. Never fatal
// to the webhook: a failed notification must not make Stripe retry (and thus
// re-process) an already-recorded purchase.
async function notifyNewPurchase(companyName: string, amountCents: number): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.NOTIFICATION_EMAIL
  if (!apiKey || !to) {
    console.warn('[stripe-webhook] notify skipped: RESEND_API_KEY/NOTIFICATION_EMAIL not set')
    return
  }
  const euro = (amountCents / 100).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: 'KranVergleich <noreply@send.kranvergleich.de>',
      to,
      subject: `Neue Path-4-Anmeldung: ${companyName}`,
      text:
        `${companyName} hat ein Premium-Listing gebucht (${euro}).\n\n` +
        `Bitte Impressum, Website und Telefon prüfen und freischalten:\n${BASE_URL}/admin/path4`,
    })
    if (error) console.error('[stripe-webhook] notify send error', error)
  } catch (err) {
    console.error('[stripe-webhook] notify threw', err)
  }
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    console.error('[stripe-webhook] STRIPE_WEBHOOK_SECRET not set')
    return NextResponse.json({ error: 'webhook not configured' }, { status: 500 })
  }

  const sig = req.headers.get('stripe-signature')
  if (!sig) return NextResponse.json({ error: 'missing signature' }, { status: 400 })

  // RAW body is mandatory for signature verification — do not JSON-parse first.
  const payload = await req.text()
  if (!verifyStripeSignature(payload, sig, secret)) {
    return NextResponse.json({ error: 'invalid signature' }, { status: 400 })
  }

  let event: StripeEventLite
  try {
    event = JSON.parse(payload) as StripeEventLite
  } catch {
    return NextResponse.json({ error: 'invalid payload' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const companyId = companyIdFromObject(session)
        const amount = session.amount_total
        if (!companyId || typeof amount !== 'number') {
          console.warn('[stripe-webhook] checkout.session.completed missing company_id/amount', asString(session.id))
          break
        }
        const res = await recordTierPurchase({
          companyId,
          stripeSessionId: asString(session.id) ?? '',
          amountCents: amount,
        })
        if (!res.ok) {
          console.error('[stripe-webhook] recordTierPurchase failed', companyId, res.reason)
          return NextResponse.json({ error: 'processing failed' }, { status: 500 })
        }
        // Alert only on first processing, not on idempotent re-delivery.
        if (!res.alreadyProcessed) {
          await notifyNewPurchase(res.companyName ?? companyId, amount)
        }
        break
      }

      case 'charge.refunded':
      case 'charge.dispute.created': {
        // Refunds/disputes are processed manually in Stripe per PATH4_TIER_SPEC.
        // Best-effort auto-revoke if the company is resolvable from metadata;
        // otherwise log loudly for manual review. Robust charge->company mapping
        // (via payment_intent) is a Day-3 dashboard concern, not the money path.
        const obj = event.data.object
        const companyId = companyIdFromObject(obj)
        if (companyId) {
          await revokeTier(companyId, `${event.type} ${asString(obj.id) ?? ''}`)
        }
        console.warn(`[stripe-webhook] ${event.type} — manual review`, asString(obj.id), 'company:', companyId ?? 'unresolved')
        break
      }

      default:
        // Acknowledge unhandled events so Stripe stops retrying them.
        break
    }
  } catch (err) {
    console.error('[stripe-webhook] processing error', event.type, err)
    // 500 → Stripe retries with backoff (transient DB issue etc).
    return NextResponse.json({ error: 'processing failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
