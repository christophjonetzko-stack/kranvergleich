import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { getServiceSupabase } from '@/lib/supabase'
import { verifyLeadOutcomeSig } from '@/lib/lead-response-sig'
import { BRAND_NAME, BASE_URL } from '@/lib/country'

/**
 * Customer-side outcome landing (lead-flow Pakiet 2, 2026-06-12). The
 * T+7 service mail carries three HMAC-signed links; this route records the
 * answer. Same GET-confirm / POST-commit split as the firm-side
 * /api/lead-response — mail-scanner prefetchers stop at the read-only GET.
 *
 * Actions:
 *   got_offer  — note + owner alert (owner decides won; we never guess the
 *                winning firm).
 *   no_offer   — note + 🚨 owner alert. This rescue path is load-bearing for
 *                the legal posture (service execution, not a survey).
 *   still_open — note only.
 */

const FROM_EMAIL = `Christoph Jonetzko · ${BRAND_NAME} <christoph@send.kranvergleich.de>`

const ACTION_LABELS: Record<string, string> = {
  got_offer: 'Ja, ich habe ein Angebot erhalten',
  no_offer: 'Nein, ich habe keine Angebote erhalten',
  still_open: 'Noch offen, ich warte noch',
}

const paramsSchema = z.object({ leadId: z.string().uuid() })

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function page(title: string, body: string, status = 200): NextResponse {
  return new NextResponse(
    `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>${escapeHtml(title)}</title></head>
     <body style="font-family:system-ui;max-width:520px;margin:60px auto;padding:24px;color:#111;">
       ${body}
     </body></html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  )
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ leadId: string }> },
) {
  const rawParams = await context.params
  const parsed = paramsSchema.safeParse(rawParams)
  if (!parsed.success) {
    return new NextResponse('Invalid link.', { status: 400, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  }
  const { leadId } = parsed.data
  const url = new URL(req.url)
  const action = url.searchParams.get('action') || ''
  const sig = url.searchParams.get('sig') || ''

  if (!verifyLeadOutcomeSig(leadId, action, sig)) {
    return page(
      'Link ungültig',
      `<h1 style="font-size:22px;">Link ungültig oder abgelaufen</h1>
       <p style="color:#4b5563;line-height:1.6;">Bitte öffnen Sie den Link erneut aus der ursprünglichen E-Mail.</p>`,
      403,
    )
  }

  const label = ACTION_LABELS[action]
  const formAction = `${req.nextUrl.pathname}?${url.searchParams.toString()}`
  return page(
    `Bestätigen: ${label}`,
    `<h1 style="font-size:22px;margin-bottom:12px;">Ihre Antwort: ${escapeHtml(label)}</h1>
     <p style="color:#4b5563;line-height:1.6;">Bitte bestätigen Sie unten, damit wir Ihre Anfrage entsprechend bearbeiten können:</p>
     <form method="POST" action="${escapeHtml(formAction)}" style="margin-top:24px;">
       <button type="submit" style="background:#2563eb;color:#fff;padding:14px 22px;border:0;border-radius:8px;font-size:15px;font-weight:500;cursor:pointer;">
         Antwort bestätigen
       </button>
     </form>
     <p style="color:#9ca3af;font-size:12px;margin-top:32px;line-height:1.5;">
       Diese Zwischenbestätigung schützt vor automatischen Klicks durch E-Mail-Scanner. Ihre Antwort wird erst nach Klick auf den Button registriert.
     </p>`,
  )
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ leadId: string }> },
) {
  const rawParams = await context.params
  const parsed = paramsSchema.safeParse(rawParams)
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_uuid' }, { status: 400 })
  }
  const { leadId } = parsed.data
  const url = new URL(req.url)
  const action = url.searchParams.get('action') || ''
  const sig = url.searchParams.get('sig')

  if (!verifyLeadOutcomeSig(leadId, action, sig)) {
    return NextResponse.json({ error: 'invalid_sig' }, { status: 403 })
  }

  const sb = getServiceSupabase()
  const { data: lead, error: leadErr } = await sb
    .from('leads')
    .select('id, customer_name, city, status, feedback_notes, crane_types(name)')
    .eq('id', leadId)
    .maybeSingle()

  if (leadErr) {
    console.error('[lead-outcome] lead lookup failed:', leadErr)
    return NextResponse.json({ error: 'lookup_failed' }, { status: 500 })
  }
  if (!lead) return NextResponse.json({ error: 'lead_not_found' }, { status: 404 })

  const dayStamp = new Date().toISOString().slice(0, 10)
  const note = `[${dayStamp}] customer outcome: ${action}`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const priorNotes: string | null = (lead as any).feedback_notes ?? null
  const newNotes = priorNotes && priorNotes.trim() ? `${priorNotes}\n${note}` : note
  const { error: updErr } = await sb
    .from('leads')
    .update({ feedback_notes: newNotes, feedback_received_at: new Date().toISOString() })
    .eq('id', leadId)
  if (updErr) console.error('[lead-outcome] notes update failed:', updErr)

  // Owner alert on the two actionable answers. still_open is note-only.
  const ownerEmail = process.env.NOTIFICATION_EMAIL
  const resendKey = process.env.RESEND_API_KEY
  if (ownerEmail && resendKey && action !== 'still_open') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const craneType: string = (lead as any).crane_types?.name || '?'
    const customerName: string = lead.customer_name || '?'
    const city: string = lead.city || '?'
    const isRescue = action === 'no_offer'
    try {
      await new Resend(resendKey).emails.send({
        from: FROM_EMAIL,
        to: ownerEmail,
        subject: isRescue
          ? `${BRAND_NAME} - 🚨 KEINE ANGEBOTE: ${customerName} (${city}, ${craneType}) - nachfassen!`
          : `${BRAND_NAME} - ✅ Angebot erhalten: ${customerName} (${city}, ${craneType})`,
        html: isRescue
          ? `<h3>Kunde meldet: keine Angebote erhalten</h3>
             <p>Der Kunde hat 7+ Tage nach Versand keine Angebote bekommen. Jetzt nachfassen:
             Firmen anrufen, Opt-in-Reroute zu Alternativen (Greb-Pattern) oder dem Kunden direkt antworten.</p>
             <ul><li>Kunde: <strong>${escapeHtml(customerName)}</strong> (${escapeHtml(city)})</li>
             <li>Krantyp: ${escapeHtml(craneType)}</li></ul>
             <p><a href="${BASE_URL}/admin/leads/${leadId}" style="font-size:13px;color:#2563eb;">→ Lead im Panel öffnen</a></p>
             <p style="font-size:12px;color:#9ca3af;">Lead-ID: ${leadId}</p>`
          : `<h3>Kunde meldet: Angebot erhalten</h3>
             <p>Kandidat für status='won'. Wir raten den Gewinner nicht: bei Gelegenheit prüfen,
             welche Firma akzeptiert hatte (lead_responses), und den Lead manuell schließen.</p>
             <ul><li>Kunde: <strong>${escapeHtml(customerName)}</strong> (${escapeHtml(city)})</li>
             <li>Krantyp: ${escapeHtml(craneType)}</li></ul>
             <p><a href="${BASE_URL}/admin/leads/${leadId}" style="font-size:13px;color:#2563eb;">→ Lead im Panel öffnen</a></p>
             <p style="font-size:12px;color:#9ca3af;">Lead-ID: ${leadId}</p>`,
      })
    } catch (err) {
      console.error('[lead-outcome] owner alert failed:', err)
    }
  }

  const thanksBody =
    action === 'no_offer'
      ? `<h1 style="font-size:22px;">Danke für Ihre Rückmeldung</h1>
         <p style="color:#4b5563;line-height:1.6;">Das tut uns leid. Wir fassen bei den angefragten Betrieben nach
         und melden uns, sobald es Neuigkeiten gibt. Sie können jederzeit eine
         <a href="${BASE_URL}" style="color:#2563eb;">neue Anfrage</a> stellen.</p>`
      : action === 'got_offer'
        ? `<h1 style="font-size:22px;">Danke, das freut uns!</h1>
           <p style="color:#4b5563;line-height:1.6;">Wir schließen Ihre Anfrage damit ab. Viel Erfolg bei Ihrem Projekt!</p>`
        : `<h1 style="font-size:22px;">Danke für Ihre Rückmeldung</h1>
           <p style="color:#4b5563;line-height:1.6;">Alles klar, wir lassen Ihre Anfrage offen. Sie müssen nichts weiter tun.</p>`

  return page('Danke', thanksBody)
}
