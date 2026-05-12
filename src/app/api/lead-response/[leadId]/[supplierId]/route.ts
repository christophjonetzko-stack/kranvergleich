import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { getServiceSupabase } from '@/lib/supabase'
import { verifyLeadResponseSig } from '@/lib/lead-response-sig'
import { BASE_URL, BRAND_NAME } from '@/lib/country'

/**
 * Signal-back loop landing endpoint. Firms click one of the two HMAC-signed
 * CTAs in their notification mail; this route logs the event, rolls it up
 * into lead_companies, alerts the owner, and forwards to the thanks page.
 *
 * Sig verify first — a forged URL gets a 403 + owner alert and never
 * touches the DB. After verify the (lead, supplier) pair is validated
 * against lead_companies so a click for a firm that wasn't on the lead
 * can't write a row even if the sig somehow checks out (defence in depth).
 */

const RESEND_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = `Christoph Jonetzko · ${BRAND_NAME} <christoph@send.kranvergleich.de>`

async function sendOwnerAlert(subject: string, html: string): Promise<void> {
  const ownerEmail = process.env.NOTIFICATION_EMAIL
  if (!RESEND_KEY || !ownerEmail) return
  try {
    const resend = new Resend(RESEND_KEY)
    await resend.emails.send({ from: FROM_EMAIL, to: ownerEmail, subject, html })
  } catch (err) {
    console.error('lead-response owner alert failed:', err)
  }
}

function getIp(req: NextRequest): string | null {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  const xrip = req.headers.get('x-real-ip')
  if (xrip) return xrip.trim()
  return null
}

const paramsSchema = z.object({
  leadId: z.string().uuid(),
  supplierId: z.string().uuid(),
})

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ leadId: string; supplierId: string }> },
) {
  const rawParams = await context.params
  const parsed = paramsSchema.safeParse(rawParams)
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_uuid' }, { status: 400 })
  }
  const { leadId, supplierId } = parsed.data

  const url = new URL(req.url)
  const action = url.searchParams.get('action') || ''
  const sig = url.searchParams.get('sig')

  if (!verifyLeadResponseSig(leadId, supplierId, action, sig)) {
    await sendOwnerAlert(
      `${BRAND_NAME} - 🚨 lead-response sig mismatch`,
      `<p>HMAC verification failed for a click on the firm-side CTA.</p>
       <ul>
         <li>action=<code>${action}</code></li>
         <li>leadId=<code>${leadId}</code></li>
         <li>supplierId=<code>${supplierId}</code></li>
         <li>ip=${getIp(req) || '?'}</li>
         <li>UA=${(req.headers.get('user-agent') || '').slice(0, 200)}</li>
       </ul>
       <p>Either a forged URL, a stale link from before a LEAD_RESPONSE_SECRET rotation, or a copy-paste truncation. Not stored in the audit log.</p>`,
    )
    return NextResponse.json({ error: 'invalid_sig' }, { status: 403 })
  }

  const sb = getServiceSupabase()

  // Defence-in-depth: even with valid sig, only count the click if the
  // (lead, supplier) pair really shipped together in lead_companies.
  const { data: lcRow, error: lcErr } = await sb
    .from('lead_companies')
    .select('lead_id, company_id, feedback_notes, companies(name), leads(customer_name, customer_email, customer_phone, city, crane_types(name))')
    .eq('lead_id', leadId)
    .eq('company_id', supplierId)
    .maybeSingle()

  if (lcErr) {
    console.error('lead_companies lookup failed:', lcErr)
    return NextResponse.json({ error: 'lookup_failed' }, { status: 500 })
  }
  if (!lcRow) {
    await sendOwnerAlert(
      `${BRAND_NAME} - 🚨 lead-response: unknown pair`,
      `<p>Click landed for a (lead, supplier) pair that doesn't exist in lead_companies.</p>
       <ul>
         <li>leadId=<code>${leadId}</code></li>
         <li>supplierId=<code>${supplierId}</code></li>
         <li>action=<code>${action}</code></li>
       </ul>
       <p>Sig was valid, so the link came from a mail we sent — but the row is gone (lead deleted, supplier deactivated, FK cascade). Audit only.</p>`,
    )
    return NextResponse.json({ error: 'pair_not_found' }, { status: 403 })
  }

  const ip = getIp(req)
  const userAgent = req.headers.get('user-agent')

  // Append event row
  const { data: inserted, error: insertError } = await sb
    .from('lead_responses')
    .insert({
      lead_id: leadId,
      supplier_id: supplierId,
      action,
      ip,
      user_agent: userAgent,
    })
    .select('id')
    .single()

  if (insertError || !inserted) {
    console.error('lead_responses insert failed:', insertError)
    return NextResponse.json({ error: 'insert_failed' }, { status: 500 })
  }

  // Roll up to the lead_companies aggregate. accept stays feedback_outcome=null
  // (engaged, no final outcome yet — the deal is still open). decline gets a
  // provisional 'lost'; the thanks-page reason form refines that to wrong_fit
  // or other where the reason indicates.
  const now = new Date().toISOString()
  const dayStamp = now.slice(0, 10)
  const noteAdd = action === 'accept'
    ? `[${dayStamp}] click accept`
    : `[${dayStamp}] click decline`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const priorNotes: string | null = (lcRow as any).feedback_notes ?? null
  const newNotes = priorNotes && priorNotes.trim() ? `${priorNotes}\n${noteAdd}` : noteAdd

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rollup: Record<string, any> = {
    feedback_received_at: now,
    feedback_notes: newNotes,
  }
  if (action === 'decline') rollup.feedback_outcome = 'lost'

  const { error: updateError } = await sb
    .from('lead_companies')
    .update(rollup)
    .eq('lead_id', leadId)
    .eq('company_id', supplierId)
  if (updateError) console.error('lead_companies rollup failed:', updateError)

  // Owner notification per click. MVP volume is low (5 leads/mo × ~6 firms
  // × 2 clicks max = ~60 mails/mo max). Switch to daily digest if volume
  // outgrows the inbox.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const companyName: string = (lcRow as any).companies?.name || '?'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customer = (lcRow as any).leads || {}
  const customerName: string = customer.customer_name || '?'
  const customerCity: string = customer.city || '?'
  const craneType: string = customer.crane_types?.name || '?'
  const actionLabel = action === 'accept' ? '✅ ANGENOMMEN' : '❌ ABGELEHNT'

  await sendOwnerAlert(
    `${BRAND_NAME} - ${actionLabel} - ${companyName} → ${customerName} (${customerCity}, ${craneType})`,
    `<h3>${actionLabel}: ${companyName}</h3>
     <p>Klick auf den Signal-Back-Loop für Lead-ID <code>${leadId}</code>:</p>
     <ul>
       <li>Firma: <strong>${companyName}</strong></li>
       <li>Kunde: <strong>${customerName}</strong> (${customerCity})</li>
       <li>Krantyp: ${craneType}</li>
       <li>Action: <strong>${action}</strong></li>
       <li>IP: ${ip || '?'}</li>
       <li>User-Agent: ${userAgent ? userAgent.slice(0, 200) : '?'}</li>
     </ul>
     ${action === 'decline'
       ? '<p><em>Reason wird in der Folge-Seite erfragt (4 Optionen + Sonstiges). lead_companies.feedback_outcome ist vorläufig auf "lost" gesetzt; die Form refined das ggf. zu wrong_fit oder other.</em></p>'
       : '<p><em>Die Firma sollte den Kunden innerhalb 24h direkt kontaktieren. Wenn 48h ohne Folge — manuell nachhaken (Kunden anrufen, Status erfragen).</em></p>'}
     <p style="font-size:12px;color:#9ca3af;">Response-ID: ${inserted.id}</p>`,
  )

  // Redirect to thanks page; sig forwarded so the thanks page can re-verify
  // and the decline-reason form re-uses the same secret.
  const thanksUrl = new URL('/lead-response/thanks', BASE_URL)
  thanksUrl.searchParams.set('action', action)
  thanksUrl.searchParams.set('lead', leadId)
  thanksUrl.searchParams.set('supplier', supplierId)
  thanksUrl.searchParams.set('sig', sig as string)
  return NextResponse.redirect(thanksUrl.toString(), 302)
}
