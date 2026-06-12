import { Resend } from 'resend'
import { getServiceSupabase } from '@/lib/supabase'
import { signLeadResponse, signLeadOutcome, type LeadOutcomeAction } from '@/lib/lead-response-sig'
import { COUNTRY, BASE_URL, BRAND_NAME } from '@/lib/country'

/**
 * Lead follow-up automation (lead-flow Pakiet 1, 2026-06-12 audit).
 *
 * Two daily jobs, both invoked from the existing /api/cron/drip-emails
 * handler (Vercel Hobby caps the project at 2 cron jobs, so no new slot):
 *
 *   1. Firm reminder — firms that received a lead 24-96h ago and never
 *      clicked accept/decline get ONE polite reminder carrying the same
 *      HMAC-signed CTA links (deterministic signature, regenerable here).
 *      Idempotency via lead_companies.reminder_sent_at (mig 039).
 *
 *   2. Owner digest — leads older than 72h (max 14d) where NO firm has
 *      reacted at all, rolled into one mail so dead leads surface on a
 *      signal instead of from memory. Intentionally re-sends on subsequent
 *      days while the lead stays dead (max 14d window bounds the noise).
 *
 * Both deployments (.de / .at) run this against the SAME database, so every
 * query filters leads.country = COUNTRY — each deployment handles only its
 * own leads, and the CTA links carry the matching BASE_URL.
 */

const FROM_EMAIL = `Christoph Jonetzko · ${BRAND_NAME} <christoph@send.kranvergleich.de>`

const REMINDER_MIN_AGE_H = 24
const REMINDER_MAX_AGE_H = 96
const DIGEST_MIN_AGE_H = 72
const DIGEST_MAX_AGE_D = 14
// Statuses still worth chasing. won/lost/no_response are closed cycles.
const OPEN_LEAD_STATUSES = new Set(['new', 'contacted'])

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function hoursAgoIso(hours: number): string {
  return new Date(Date.now() - hours * 3600 * 1000).toISOString()
}

type ReminderLead = {
  customer_name: string | null
  customer_email: string | null
  customer_phone: string | null
  city: string | null
  preferred_date: string | null
  status: string | null
  is_test: boolean
  country: string | null
  crane_types: { name: string } | null
}

type ReminderRow = {
  lead_id: string
  company_id: string
  sent_at: string
  companies: { name: string; email: string | null } | null
  leads: ReminderLead | null
}

function buildReminderHtml(row: ReminderRow, daysWaiting: number): string {
  const lead = row.leads!
  const company = row.companies!
  const craneType = lead.crane_types?.name ?? 'Kran'
  const safeCompany = escapeHtml(company.name)
  const safeName = escapeHtml(lead.customer_name || '–')
  const safeCity = escapeHtml(lead.city || '–')
  const safePhone = escapeHtml(lead.customer_phone || '')
  const safeEmail = escapeHtml(lead.customer_email || '')
  const safeDate = escapeHtml(lead.preferred_date || '')

  const acceptSig = signLeadResponse(row.lead_id, row.company_id, 'accept')
  const declineSig = signLeadResponse(row.lead_id, row.company_id, 'decline')
  const acceptUrl = `${BASE_URL}/api/lead-response/${row.lead_id}/${row.company_id}?action=accept&sig=${acceptSig}`
  const declineUrl = `${BASE_URL}/api/lead-response/${row.lead_id}/${row.company_id}?action=decline&sig=${declineSig}`

  return `
    <div style="font-family:system-ui;max-width:560px;">
      <h2 style="font-size:17px;color:#1a1a1a;">Erinnerung: Kundenanfrage ${escapeHtml(craneType)} · ${safeCity}</h2>
      <p style="color:#4b5563;font-size:14px;line-height:1.6;">
        Sehr geehrtes Team von <strong>${safeCompany}</strong>,
      </p>
      <p style="color:#4b5563;font-size:14px;line-height:1.6;">
        vor ${daysWaiting} ${daysWaiting === 1 ? 'Tag' : 'Tagen'} haben Sie über ${BRAND_NAME} eine
        Kundenanfrage erhalten und noch nicht reagiert. Der Kunde wartet auf Angebote,
        eine kurze Rückmeldung genügt:
      </p>
      <table style="border-collapse:collapse;font-size:14px;margin:14px 0;">
        <tr><td style="padding:4px 12px 4px 0;color:#6b7280;">Kunde</td><td><strong>${safeName}</strong></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6b7280;">Krantyp</td><td>${escapeHtml(craneType)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6b7280;">Ort</td><td>${safeCity}</td></tr>
        ${safeDate ? `<tr><td style="padding:4px 12px 4px 0;color:#6b7280;">Wunschtermin</td><td>${safeDate}</td></tr>` : ''}
        ${safePhone ? `<tr><td style="padding:4px 12px 4px 0;color:#6b7280;">Telefon</td><td>${safePhone}</td></tr>` : ''}
        ${safeEmail ? `<tr><td style="padding:4px 12px 4px 0;color:#6b7280;">E-Mail</td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>` : ''}
      </table>
      <div style="margin:16px 0;">
        <a href="${acceptUrl}" style="display:inline-block;padding:10px 16px;background:#059669;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:500;margin-right:8px;margin-bottom:6px;">&#10003; Ja, ich erstelle ein Angebot</a>
        <a href="${declineUrl}" style="display:inline-block;padding:10px 16px;background:#6b7280;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:500;">&#10005; Nein, nicht passend</a>
      </div>
      <p style="color:#4b5563;font-size:13px;line-height:1.6;">
        Auch ein „Nein" hilft: Der Kunde sucht dann gezielt weiter und Ihre Zeit wird nicht
        mit Nachfragen belegt. Falls Sie bereits direkt mit dem Kunden in Kontakt stehen,
        können Sie diese Erinnerung ignorieren.
      </p>
      <p style="color:#9ca3af;font-size:12px;line-height:1.6;margin-top:20px;">
        Dies ist die einzige Erinnerung zu dieser Anfrage. ${BRAND_NAME} · <a href="${BASE_URL}" style="color:#2563eb;">${BASE_URL.replace('https://', '')}</a>
      </p>
    </div>
  `
}

async function runFirmReminders(resend: Resend): Promise<number> {
  const sb = getServiceSupabase()
  const { data, error } = await sb
    .from('lead_companies')
    .select(
      'lead_id, company_id, sent_at, reminder_sent_at, feedback_received_at, companies(name, email), leads(customer_name, customer_email, customer_phone, city, preferred_date, status, is_test, country, crane_types(name))',
    )
    .not('sent_at', 'is', null)
    .is('feedback_received_at', null)
    .is('reminder_sent_at', null)
    .gte('sent_at', hoursAgoIso(REMINDER_MAX_AGE_H))
    .lte('sent_at', hoursAgoIso(REMINDER_MIN_AGE_H))

  if (error) {
    // Most likely cause pre-mig-039: column reminder_sent_at missing. Log and
    // bail; the drip part of the cron must never be affected.
    console.error('[lead-followup] reminder query failed (mig 039 applied?):', error.message)
    return 0
  }

  let sent = 0
  for (const raw of data ?? []) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const row = raw as any as ReminderRow
    const lead = row.leads
    const company = row.companies
    if (!lead || !company || !company.email) continue
    if (lead.is_test) continue
    if (lead.country !== COUNTRY) continue
    if (lead.status && !OPEN_LEAD_STATUSES.has(lead.status)) continue

    const daysWaiting = Math.max(1, Math.round((Date.now() - new Date(row.sent_at).getTime()) / 86400000))
    const craneType = lead.crane_types?.name ?? 'Kran'
    const subjectBits = [craneType, lead.city || null].filter(Boolean).join(' · ')

    try {
      const { error: sendErr } = await resend.emails.send({
        from: FROM_EMAIL,
        to: company.email,
        ...(lead.customer_email ? { replyTo: lead.customer_email } : {}),
        subject: `Erinnerung: Kundenanfrage ${subjectBits} wartet auf Ihre Antwort`,
        html: buildReminderHtml(row, daysWaiting),
      })
      if (sendErr) {
        console.error(`[lead-followup] reminder send failed (${company.name}):`, sendErr)
        continue
      }
      const { error: stampErr } = await sb
        .from('lead_companies')
        .update({ reminder_sent_at: new Date().toISOString() })
        .eq('lead_id', row.lead_id)
        .eq('company_id', row.company_id)
      if (stampErr) console.error('[lead-followup] reminder stamp failed:', stampErr)
      sent += 1
      // Stay under Resend's 5 req/s (same throttle as the lead pipeline).
      await new Promise((r) => setTimeout(r, 200))
    } catch (err) {
      console.error(`[lead-followup] reminder threw (${company.name}):`, err)
    }
  }
  return sent
}

type DigestLeadRow = {
  id: string
  customer_name: string | null
  city: string | null
  created_at: string
  status: string | null
  is_test: boolean
  crane_types: { name: string } | null
  lead_companies: Array<{
    sent_at: string | null
    feedback_received_at: string | null
    reminder_sent_at: string | null
    companies: { name: string } | null
  }>
}

async function runOwnerDigest(resend: Resend): Promise<number> {
  const ownerEmail = process.env.NOTIFICATION_EMAIL
  if (!ownerEmail) {
    console.error('[lead-followup] NOTIFICATION_EMAIL missing, digest skipped')
    return 0
  }
  const sb = getServiceSupabase()
  const { data, error } = await sb
    .from('leads')
    .select(
      'id, customer_name, city, created_at, status, is_test, crane_types(name), lead_companies(sent_at, feedback_received_at, reminder_sent_at, companies(name))',
    )
    .eq('country', COUNTRY)
    .eq('is_test', false)
    .gte('created_at', hoursAgoIso(DIGEST_MAX_AGE_D * 24))
    .lte('created_at', hoursAgoIso(DIGEST_MIN_AGE_H))

  if (error) {
    console.error('[lead-followup] digest query failed:', error.message)
    return 0
  }

  const dead: DigestLeadRow[] = []
  for (const raw of data ?? []) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lead = raw as any as DigestLeadRow
    if (lead.status && !OPEN_LEAD_STATUSES.has(lead.status)) continue
    const lcs = lead.lead_companies ?? []
    const dispatched = lcs.some((lc) => lc.sent_at != null)
    const anyFeedback = lcs.some((lc) => lc.feedback_received_at != null)
    if (dispatched && !anyFeedback) dead.push(lead)
  }

  if (dead.length === 0) return 0

  const rowsHtml = dead
    .map((l) => {
      const age = Math.round((Date.now() - new Date(l.created_at).getTime()) / 86400000)
      const firms = (l.lead_companies ?? []).filter((lc) => lc.sent_at != null)
      const reminded = firms.filter((lc) => lc.reminder_sent_at != null).length
      return `<tr>
        <td style="padding:6px 10px;border-top:1px solid #e5e7eb;"><strong>${escapeHtml(l.customer_name || '–')}</strong></td>
        <td style="padding:6px 10px;border-top:1px solid #e5e7eb;">${escapeHtml(l.city || '–')}</td>
        <td style="padding:6px 10px;border-top:1px solid #e5e7eb;">${escapeHtml(l.crane_types?.name || '–')}</td>
        <td style="padding:6px 10px;border-top:1px solid #e5e7eb;white-space:nowrap;">${age} Tage</td>
        <td style="padding:6px 10px;border-top:1px solid #e5e7eb;">${firms.length} (davon ${reminded} erinnert)</td>
        <td style="padding:6px 10px;border-top:1px solid #e5e7eb;font-size:11px;color:#9ca3af;">${l.id}</td>
      </tr>`
    })
    .join('')

  try {
    const { error: sendErr } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ownerEmail,
      subject: `${BRAND_NAME} - ⏰ ${dead.length} Lead${dead.length === 1 ? '' : 's'} ohne jede Anbieter-Reaktion (72h+)`,
      html: `
        <div style="font-family:system-ui;">
          <h3>Leads ohne Reaktion, manuell nachfassen oder schließen</h3>
          <p style="font-size:13px;color:#4b5563;">Versendet an Anbieter, aber kein einziger Accept/Decline-Klick.
          Optionen: Firmen anrufen, Opt-in-Reroute (Greb-Pattern) oder Lead als lost schließen.
          Dieser Digest wiederholt sich täglich, solange der Lead offen und unbeantwortet ist (max. ${DIGEST_MAX_AGE_D} Tage).</p>
          <table style="border-collapse:collapse;font-size:13px;width:100%;">
            <tr style="text-align:left;color:#6b7280;">
              <th style="padding:6px 10px;">Kunde</th><th style="padding:6px 10px;">Ort</th>
              <th style="padding:6px 10px;">Krantyp</th><th style="padding:6px 10px;">Alter</th>
              <th style="padding:6px 10px;">Firmen</th><th style="padding:6px 10px;">Lead-ID</th>
            </tr>
            ${rowsHtml}
          </table>
        </div>
      `,
    })
    if (sendErr) {
      console.error('[lead-followup] digest send failed:', sendErr)
      return 0
    }
  } catch (err) {
    console.error('[lead-followup] digest threw:', err)
    return 0
  }
  return dead.length
}

/**
 * Customer outcome mail (Pakiet 2, T+7-10d). Legal posture per legal-check
 * 2026-06-12 (Art. 6(1)(b) DSGVO, outside Werbung per BGH VI ZR 225/17 and
 * outside §107 TKG-AT): the template must stay STRICTLY operational — no
 * promo content, no review ask, single mail per lead, and the no_offer
 * answer must trigger a real rescue (owner alert in /api/lead-outcome).
 * Do not add marketing copy here without re-running legal-check.
 */
const OUTCOME_MIN_AGE_D = 7
const OUTCOME_MAX_AGE_D = 10

function buildOutcomeUrl(leadId: string, action: LeadOutcomeAction): string {
  const sig = signLeadOutcome(leadId, action)
  return `${BASE_URL}/api/lead-outcome/${leadId}?action=${action}&sig=${sig}`
}

type OutcomeLeadRow = {
  id: string
  customer_name: string | null
  customer_email: string | null
  city: string | null
  created_at: string
  status: string | null
  is_test: boolean
  crane_types: { name: string } | null
  lead_companies: Array<{ sent_at: string | null }>
}

async function runOutcomeMails(resend: Resend): Promise<number> {
  const sb = getServiceSupabase()
  const { data, error } = await sb
    .from('leads')
    .select(
      'id, customer_name, customer_email, city, created_at, status, is_test, outcome_mail_sent_at, crane_types(name), lead_companies(sent_at)',
    )
    .eq('country', COUNTRY)
    .eq('is_test', false)
    .is('outcome_mail_sent_at', null)
    .not('customer_email', 'is', null)
    .gte('created_at', hoursAgoIso(OUTCOME_MAX_AGE_D * 24))
    .lte('created_at', hoursAgoIso(OUTCOME_MIN_AGE_D * 24))

  if (error) {
    // Pre-mig-040 the outcome_mail_sent_at column is missing. Log and bail.
    console.error('[lead-followup] outcome query failed (mig 040 applied?):', error.message)
    return 0
  }

  let sent = 0
  for (const raw of data ?? []) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lead = raw as any as OutcomeLeadRow
    if (lead.status && !OPEN_LEAD_STATUSES.has(lead.status)) continue
    if (!lead.customer_email) continue
    // Only leads that were actually dispatched to firms — for a held /
    // 0-firm lead the question "Angebote erhalten?" would be absurd.
    if (!(lead.lead_companies ?? []).some((lc) => lc.sent_at != null)) continue

    const craneType = lead.crane_types?.name ?? 'Kran'
    const firmCount = (lead.lead_companies ?? []).filter((lc) => lc.sent_at != null).length
    const safeName = escapeHtml(lead.customer_name || '')
    const safeCity = escapeHtml(lead.city || '')

    try {
      const { error: sendErr } = await resend.emails.send({
        from: FROM_EMAIL,
        to: lead.customer_email,
        subject: `Ihre Krananfrage${safeCity ? ` (${lead.city})` : ''}: Haben Sie Angebote erhalten?`,
        html: `
          <div style="font-family:system-ui;max-width:520px;">
            <p style="color:#4b5563;font-size:14px;line-height:1.6;">
              ${safeName ? `Hallo ${safeName},` : 'Hallo,'}
            </p>
            <p style="color:#4b5563;font-size:14px;line-height:1.6;">
              vor einer Woche haben wir Ihre Anfrage (${escapeHtml(craneType)}${safeCity ? `, ${safeCity}` : ''})
              an ${firmCount} ${firmCount === 1 ? 'Kranbetrieb' : 'Kranbetriebe'} weitergeleitet.
              Damit wir Ihre Anfrage abschließen oder für Sie nachfassen können, eine kurze Frage,
              ein Klick genügt:
            </p>
            <div style="margin:18px 0;">
              <a href="${buildOutcomeUrl(lead.id, 'got_offer')}" style="display:inline-block;padding:10px 16px;background:#059669;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:500;margin:0 8px 8px 0;">&#10003; Ja, Angebot erhalten</a>
              <a href="${buildOutcomeUrl(lead.id, 'no_offer')}" style="display:inline-block;padding:10px 16px;background:#dc2626;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:500;margin:0 8px 8px 0;">&#10005; Nein, keine Angebote</a>
              <a href="${buildOutcomeUrl(lead.id, 'still_open')}" style="display:inline-block;padding:10px 16px;background:#6b7280;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:500;margin:0 0 8px 0;">Noch offen</a>
            </div>
            <p style="color:#4b5563;font-size:13px;line-height:1.6;">
              Falls keine Angebote angekommen sind, fassen wir bei den Betrieben nach oder
              schlagen Ihnen passende Alternativen vor.
            </p>
            <p style="color:#9ca3af;font-size:12px;line-height:1.6;margin-top:20px;">
              Dies ist die einzige Nachricht dieser Art zu Ihrer Anfrage, weitere E-Mails folgen nicht.<br>
              ${BRAND_NAME} · <a href="${BASE_URL}" style="color:#2563eb;">${BASE_URL.replace('https://', '')}</a> ·
              <a href="${BASE_URL}/datenschutz" style="color:#9ca3af;">Datenschutz</a>
            </p>
          </div>
        `,
      })
      if (sendErr) {
        console.error(`[lead-followup] outcome send failed (lead ${lead.id}):`, sendErr)
        continue
      }
      const { error: stampErr } = await sb
        .from('leads')
        .update({ outcome_mail_sent_at: new Date().toISOString() })
        .eq('id', lead.id)
      if (stampErr) console.error('[lead-followup] outcome stamp failed:', stampErr)
      sent += 1
      await new Promise((r) => setTimeout(r, 200))
    } catch (err) {
      console.error(`[lead-followup] outcome threw (lead ${lead.id}):`, err)
    }
  }
  return sent
}

export async function runLeadFollowup(): Promise<{ reminders: number; digestLeads: number; outcomeMails: number }> {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error('[lead-followup] RESEND_API_KEY missing, skipped')
    return { reminders: 0, digestLeads: 0, outcomeMails: 0 }
  }
  const resend = new Resend(key)
  const reminders = await runFirmReminders(resend)
  const digestLeads = await runOwnerDigest(resend)
  const outcomeMails = await runOutcomeMails(resend)
  return { reminders, digestLeads, outcomeMails }
}
