import { NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { Resend } from 'resend'
import { recordTierPurchase, revokeTier } from '@/lib/path4'
import { dbPlanFromPriceId, type DbPlan } from '@/lib/subscription-plans'
import {
  mapStripeStatus,
  upsertSubscription,
  companyIdBySubscriptionId,
  companyIdByCustomerId,
  subscriptionExists,
  isTrackedSubscription,
} from '@/lib/subscriptions'
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

// ── Subscription (mode:'subscription') helpers — KROK 7.3 ───────────────────
// The webhook parses the RAW JSON payload (no Stripe SDK), so every field is
// read defensively from the account-API-version shape, NOT from SDK 22.x types.

function asNumber(v: unknown): number | undefined {
  return typeof v === 'number' && Number.isFinite(v) ? v : undefined
}

function isoFromUnix(sec: number | undefined): string | undefined {
  return sec === undefined ? undefined : new Date(sec * 1000).toISOString()
}

function record(v: unknown): Record<string, unknown> | undefined {
  return v && typeof v === 'object' ? (v as Record<string, unknown>) : undefined
}

/** DB-enum plan we stamped on the Checkout Session metadata ('premium'|'pro'). */
function dbPlanFromMetadata(obj: Record<string, unknown>): DbPlan | undefined {
  const p = asString(record(obj.metadata)?.plan)
  return p === 'premium' || p === 'pro' ? p : undefined
}

/**
 * current_period_end, read defensively: newer API versions moved it from the
 * subscription top level onto the first subscription item. Verified against a
 * real payload in 7.5 (`stripe trigger`); both spots are checked here.
 */
function subPeriodEnd(sub: Record<string, unknown>): string | undefined {
  const top = asNumber(sub.current_period_end)
  if (top !== undefined) return isoFromUnix(top)
  const item = record(record(sub.items)?.data instanceof Array ? (record(sub.items)!.data as unknown[])[0] : undefined)
  return isoFromUnix(asNumber(item?.current_period_end))
}

/** Price id off the first subscription item (used to map back to our plan). */
function subPriceId(sub: Record<string, unknown>): string | undefined {
  const data = record(sub.items)?.data
  const first = record(Array.isArray(data) ? data[0] : undefined)
  return asString(record(first?.price)?.id)
}

/**
 * Subscription reference on an invoice, read defensively: in newer API versions
 * it moved off the top-level `subscription` onto `parent.subscription_details`.
 * Confirmed against a real payload in 7.5.
 */
function invoiceSubId(inv: Record<string, unknown>): string | undefined {
  const direct = asString(inv.subscription)
  if (direct) return direct
  const sd = record(record(inv.parent)?.subscription_details)
  return asString(sd?.subscription)
}

/**
 * checkout.session.completed with mode:'subscription'. Cements the linkage
 * (company_id ↔ subscription id ↔ customer id) and the plan. Authoritative
 * status + current_period_end come from the customer.subscription.* events,
 * which may even arrive first (handled by the order-independent upsert).
 */
async function handleSubscriptionCheckout(
  session: Record<string, unknown>,
): Promise<{ ok: boolean; reason?: string }> {
  const companyId = companyIdFromObject(session)
  if (!companyId) {
    console.warn('[stripe-webhook] subscription checkout missing company_id', asString(session.id))
    return { ok: true } // ack: nothing to map, retrying won't help
  }
  // Only mark active once the initial payment actually settled. If not paid yet,
  // write just the ids/plan and let the subscription.* events drive the status.
  const paid = asString(session.payment_status) === 'paid'
  return upsertSubscription({
    companyId,
    plan: dbPlanFromMetadata(session),
    planStatus: paid ? 'active' : undefined,
    stripeCustomerId: asString(session.customer),
    stripeSubscriptionId: asString(session.subscription),
  })
}

/**
 * customer.subscription.created / .updated / .deleted. Resolves the firm by
 * stripe_subscription_id FIRST, then falls back to the metadata.company_id we
 * stamped at checkout, then upserts by company_id (order-independent).
 */
async function handleSubscriptionChange(
  sub: Record<string, unknown>,
  opts: { deleted: boolean; guard: boolean },
): Promise<{ ok: boolean; reason?: string }> {
  const subId = asString(sub.id)
  const companyId = (await companyIdBySubscriptionId(subId)) ?? companyIdFromObject(sub)
  if (!companyId) {
    console.warn('[stripe-webhook] subscription change unresolved', subId)
    return { ok: true } // ack: cannot map to a firm
  }

  // Scope guard (.updated / .deleted): only mutate if this event targets the
  // firm's currently-tracked sub. An orphaned old sub (after re-subscription)
  // must not clobber the active row. .created is exempt (opts.guard=false) — it
  // establishes the tracked sub.
  if (opts.guard && !(await isTrackedSubscription(companyId, subId))) {
    console.warn('[stripe-webhook] subscription change for untracked sub, skip', subId)
    return { ok: true }
  }

  if (opts.deleted) {
    return upsertSubscription({ companyId, planStatus: 'canceled', stripeSubscriptionId: subId })
  }

  const mapped = mapStripeStatus(asString(sub.status))
  if (mapped === 'skip') {
    // incomplete / unknown — never grant or write a premium status, and never
    // INSERT a stray row; a later resolvable event will set the real state.
    return { ok: true }
  }
  const plan = dbPlanFromPriceId(subPriceId(sub)) ?? undefined
  if (!plan && !(await subscriptionExists(companyId))) {
    // Unknown price and no row yet: skip rather than INSERT a default-'basis'
    // row. A later event with a resolvable price will create it correctly.
    console.warn('[stripe-webhook] subscription change: unknown price, no row yet', subId)
    return { ok: true }
  }
  return upsertSubscription({
    companyId,
    plan,
    planStatus: mapped,
    stripeCustomerId: asString(sub.customer),
    stripeSubscriptionId: subId,
    currentPeriodEnd: subPeriodEnd(sub),
  })
}

/**
 * invoice.payment_failed → plan_status='past_due' (is_premium stays true: the
 * 036 trigger keeps premium during the dunning grace window). Finds the tracked
 * row by subscription id, then by customer id; if untracked, ack and skip (a
 * parallel customer.subscription.updated carries past_due and will correct it).
 */
async function handleInvoicePaymentFailed(
  inv: Record<string, unknown>,
): Promise<{ ok: boolean; reason?: string }> {
  const subId = invoiceSubId(inv)
  const companyId =
    (await companyIdBySubscriptionId(subId)) ??
    (await companyIdByCustomerId(asString(inv.customer)))
  if (!companyId) {
    console.warn('[stripe-webhook] payment_failed: untracked', subId, asString(inv.customer))
    return { ok: true }
  }
  // Scope guard: only mark past_due if this invoice's subscription is the one the
  // firm currently tracks. If the invoice carries no subscription ref (matched by
  // customer only), we can't prove which sub it's for -> skip; the parallel
  // customer.subscription.updated (which carries the sub id) sets past_due.
  if (!subId || !(await isTrackedSubscription(companyId, subId))) {
    console.warn('[stripe-webhook] payment_failed: not tracked sub, skip', subId, asString(inv.customer))
    return { ok: true }
  }
  return upsertSubscription({ companyId, planStatus: 'past_due' })
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

        // Branch by checkout mode. mode:'subscription' is the KROK 7 supply-side
        // recurring path; everything below is the UNCHANGED Path 4 mode:'payment'
        // one-shot path.
        if (asString(session.mode) === 'subscription') {
          const res = await handleSubscriptionCheckout(session)
          if (!res.ok) {
            console.error('[stripe-webhook] subscription checkout failed', res.reason)
            return NextResponse.json({ error: 'processing failed' }, { status: 500 })
          }
          break
        }

        // ── Path 4 (mode:'payment') — unchanged ──
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

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object
        const res = await handleSubscriptionChange(sub, {
          deleted: event.type === 'customer.subscription.deleted',
          // .created ESTABLISHES the tracked sub (no guard); .updated/.deleted
          // are scoped to the tracked sub.
          guard: event.type !== 'customer.subscription.created',
        })
        if (!res.ok) {
          console.error('[stripe-webhook] subscription change failed', event.type, res.reason)
          return NextResponse.json({ error: 'processing failed' }, { status: 500 })
        }
        break
      }

      case 'invoice.payment_failed': {
        const res = await handleInvoicePaymentFailed(event.data.object)
        if (!res.ok) {
          console.error('[stripe-webhook] payment_failed processing error', res.reason)
          return NextResponse.json({ error: 'processing failed' }, { status: 500 })
        }
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
