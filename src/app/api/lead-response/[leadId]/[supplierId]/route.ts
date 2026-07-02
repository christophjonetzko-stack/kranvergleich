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
 * Two-step flow added 2026-05-28 after the Knöss lead surfaced bot-prefetch
 * pollution (1 human click on GS Crane Service inflated to 6 lead_responses
 * rows via Cloudflare/Gmail link-preview proxies hitting the URL from
 * different egress IPs):
 *
 *   GET   render a minimal confirm page with a single-button POST form.
 *          Read-only: verifies sig but writes nothing, sends no alert.
 *          Bots/preview scanners stop here.
 *   POST  the original logic, insert lead_responses, roll up
 *          lead_companies, alert owner, redirect to /lead-response/thanks.
 *
 * Sig verify happens on both verbs. After verify the (lead, supplier)
 * pair is validated against lead_companies so a click for a firm that
 * wasn't on the lead can't write a row even if the sig somehow checks out.
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

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * GET, render a confirm page only. No DB writes, no owner alerts; bot
 * prefetchers and mail-scanner proxies hit this and stop. The page contains
 * a form whose POST hits this same URL and triggers the actual signal-back.
 */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ leadId: string; supplierId: string }> },
) {
  const rawParams = await context.params
  const parsed = paramsSchema.safeParse(rawParams)
  if (!parsed.success) {
    return new NextResponse('Invalid link.', { status: 400, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  }
  const { leadId, supplierId } = parsed.data
  const url = new URL(req.url)
  const action = url.searchParams.get('action') || ''
  const sig = url.searchParams.get('sig') || ''

  if (!verifyLeadResponseSig(leadId, supplierId, action, sig)) {
    // Bare GET on a bad sig is most likely a preview bot scanning a stale link,
    // not an active forge attempt. Render generic page, no owner alert spam.
    return new NextResponse(
      `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Link ungültig</title></head>
       <body style="font-family:system-ui;max-width:520px;margin:60px auto;padding:24px;color:#111;">
         <h1 style="font-size:22px;">Link ungültig oder abgelaufen</h1>
         <p style="color:#4b5563;line-height:1.6;">Bitte öffnen Sie die Anfrage erneut über die ursprüngliche E-Mail.</p>
       </body></html>`,
      { status: 403, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
    )
  }

  const actionLabel = action === 'accept' ? 'Angebot erstellen' : 'Nicht passend'
  const buttonStyle = action === 'accept'
    ? 'background:#059669;color:#fff;'
    : 'background:#dc2626;color:#fff;'
  const intro = action === 'accept'
    ? 'Sie möchten der Kundin/dem Kunden ein Angebot erstellen.'
    : 'Sie möchten die Anfrage als nicht passend markieren.'

  // Form POSTs to the SAME URL (including action+sig in query) so the POST
  // handler below has the same context. Hidden inputs are not required.
  const formAction = `${req.nextUrl.pathname}?${url.searchParams.toString()}`

  return new NextResponse(
    `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Bestätigen, ${escapeHtml(actionLabel)}</title>
     <meta name="robots" content="noindex">
     </head>
     <body style="font-family:system-ui;max-width:520px;margin:60px auto;padding:24px;color:#111;">
       <h1 style="font-size:22px;margin-bottom:12px;">${escapeHtml(actionLabel)}</h1>
       <p style="color:#4b5563;line-height:1.6;">${escapeHtml(intro)} Bitte bestätigen Sie unten:</p>
       <form method="POST" action="${escapeHtml(formAction)}" style="margin-top:24px;">
         <button type="submit" style="${buttonStyle}padding:14px 22px;border:0;border-radius:8px;font-size:15px;font-weight:500;cursor:pointer;">
           ${escapeHtml(actionLabel)} bestätigen
         </button>
       </form>
       <p style="color:#9ca3af;font-size:12px;margin-top:32px;line-height:1.5;">
         Diese Zwischenbestätigung schützt vor automatischen Klicks durch E-Mail-Scanner. Ihre Antwort wird erst nach Klick auf den Button registriert.
       </p>
     </body></html>`,
    { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  )
}

/**
 * POST, the actual state-mutating handler. Triggered by the GET-page form
 * button so bot/preview prefetches (GET-only) can't generate false signals.
 */
export async function POST(
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
      `${BRAND_NAME} - 🚨 lead-response sig mismatch (POST)`,
      `<p>HMAC verification failed on the POST commit.</p>
       <ul>
         <li>action=<code>${action}</code></li>
         <li>leadId=<code>${leadId}</code></li>
         <li>supplierId=<code>${supplierId}</code></li>
         <li>ip=${getIp(req) || '?'}</li>
         <li>UA=${(req.headers.get('user-agent') || '').slice(0, 200)}</li>
       </ul>
       <p>POST-side check, so this is more interesting than a bare-GET preview-scan. Possibly a forged form, replay attempt, or stale link.</p>`,
    )
    return NextResponse.json({ error: 'invalid_sig' }, { status: 403 })
  }

  const sb = getServiceSupabase()

  // Defence-in-depth: even with valid sig, only count the click if the
  // (lead, supplier) pair really shipped together in lead_companies.
  const { data: lcRow, error: lcErr } = await sb
    .from('lead_companies')
    .select('lead_id, company_id, feedback_notes, companies(name), leads(customer_name, customer_email, customer_phone, city, crane_type_id, crane_types(name))')
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
       <p>Sig was valid, so the link came from a mail we sent, but the row is gone (lead deleted, supplier deactivated, FK cascade). Audit only.</p>`,
    )
    return NextResponse.json({ error: 'pair_not_found' }, { status: 403 })
  }

  // Idempotency: a double-click on the confirm button (Boels, lead
  // 73d65729, 2026-06-17 — two POSTs 1.9s apart) otherwise inserts a second
  // lead_responses row AND fires a second owner alert. If this firm already
  // registered the SAME action for this lead, short-circuit to the thanks
  // page with no new write or mail. A genuine change of mind uses a
  // different action (decline -> accept) and is still recorded.
  // (Sub-second simultaneous double-fires could still race past this; a
  // partial unique index would be the hard guarantee, deferred.)
  const { data: priorSame } = await sb
    .from('lead_responses')
    .select('id')
    .eq('lead_id', leadId)
    .eq('supplier_id', supplierId)
    .eq('action', action)
    .limit(1)
    .maybeSingle()
  if (priorSame) {
    const thanksUrl = new URL('/lead-response/thanks', BASE_URL)
    thanksUrl.searchParams.set('action', action)
    thanksUrl.searchParams.set('lead', leadId)
    thanksUrl.searchParams.set('supplier', supplierId)
    thanksUrl.searchParams.set('sig', sig as string)
    return NextResponse.redirect(thanksUrl.toString(), 302)
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
  // (engaged, no final outcome yet, the deal is still open). decline gets a
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

  // Lifecycle (Pakiet 3): when this decline closed the last open firm on the
  // lead, the lead as a whole is lost. No-op on accepts and partial declines.
  if (action === 'decline') {
    const { maybeMarkLeadLost } = await import('@/lib/lead-status')
    await maybeMarkLeadLost(leadId)
  }

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
  const actionLabel = action === 'accept' ? 'ANGENOMMEN' : 'ABGELEHNT'

  // C4 (2026-06-12): on decline, surface the 3 nearest same-type firms NOT
  // already on the lead, so the opt-in-reroute decision takes a minute
  // instead of a research session. Info only — NEVER auto-dispatched
  // (opt-in rule, memory feedback_lead_reroute_dsgvo_optin).
  let candidatesHtml = ''
  if (action === 'decline') {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const leadInfo = (lcRow as any).leads
      const craneTypeId: string | null = leadInfo?.crane_type_id ?? null
      const leadCity: string | null = leadInfo?.city ?? null
      if (craneTypeId && leadCity) {
        const { getCompaniesForCraneTypeNearLocation } = await import('@/lib/queries')
        const { data: existing } = await sb
          .from('lead_companies')
          .select('company_id')
          .eq('lead_id', leadId)
        const existingIds = new Set((existing ?? []).map((r) => r.company_id))
        const result = await getCompaniesForCraneTypeNearLocation(craneTypeId, leadCity, { limit: 13 })
        const candidates = (result?.matches ?? [])
          .filter((m) => !existingIds.has(m.company.id))
          .slice(0, 3)
        if (candidates.length > 0) {
          candidatesHtml = `<p><strong>Kandidaten für Opt-in-Reroute</strong> (gleicher Krantyp, nächstgelegen, NICHT auf dem Lead):</p>
            <ul>${candidates
              .map(
                (m) =>
                  `<li>${escapeHtml(m.company.name)} (${escapeHtml(m.company.city ?? '?')}, ~${Math.round(m.distance_km)} km${m.company.email ? '' : ', KEINE E-MAIL'})</li>`,
              )
              .join('')}</ul>
            <p style="font-size:12px;color:#9ca3af;">Nur zur Info, KEIN automatischer Versand (Opt-in-Regel: Kunde muss erst zustimmen).</p>`
        }
      }
    } catch (err) {
      console.error('decline replacement-candidates lookup failed (alert continues):', err)
    }
  }

  await sendOwnerAlert(
    `${BRAND_NAME} - ${actionLabel} - ${companyName}  ${customerName} (${customerCity}, ${craneType})`,
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
       : '<p><em>Die Firma sollte den Kunden innerhalb 24h direkt kontaktieren. Wenn 48h ohne Folge, manuell nachhaken (Kunden anrufen, Status erfragen).</em></p>'}
     <p><a href="${BASE_URL}/admin/leads/${leadId}" style="font-size:13px;color:#2563eb;">→ Lead im Panel öffnen</a></p>
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
