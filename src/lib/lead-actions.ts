import { Resend } from 'resend'
import { getServiceSupabase } from '@/lib/supabase'

const BRAND_NAME = 'KranVergleich.de'
const FROM_EMAIL = `Christoph Jonetzko · ${BRAND_NAME} <christoph@send.kranvergleich.de>`
const FOUNDER_EMAIL = process.env.KRANVERGLEICH_FOUNDER_EMAIL || 'christoph@kranvergleich.de'

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Lead panel write-actions — WON / LOST (Faza 2a, DB-only) + Nachfassen /
 * Kunden-Mail (Faza 2b-i, Resend). Original 2a doc:
 *
 * Every action appends an audit line to leads.feedback_notes ("[date] X via
 * Panel: …") so the detail view keeps a human-readable trail. Admin-gated at
 * the API route; these helpers assume the caller is already authorized.
 */

export type ActionResult = { ok: true } | { ok: false; reason: string }

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

async function appendNote(
  sb: ReturnType<typeof getServiceSupabase>,
  leadId: string,
  line: string,
): Promise<string> {
  const { data } = await sb.from('leads').select('feedback_notes').eq('id', leadId).limit(1)
  const prev = (data?.[0]?.feedback_notes as string | null) ?? ''
  return prev.trim() ? `${prev}\n${line}` : line
}

export async function markLeadWon(leadId: string, winnerId: string): Promise<ActionResult> {
  const sb = getServiceSupabase()

  const { data: lead, error: leadErr } = await sb
    .from('leads')
    .select('id')
    .eq('id', leadId)
    .limit(1)
    .maybeSingle()
  if (leadErr || !lead) return { ok: false, reason: 'lead_not_found' }

  // Winner must be a firm actually dispatched on this lead.
  const { data: lc } = await sb
    .from('lead_companies')
    .select('company_id')
    .eq('lead_id', leadId)
    .eq('company_id', winnerId)
    .limit(1)
    .maybeSingle()
  if (!lc) return { ok: false, reason: 'firm_not_on_lead' }

  const { data: company } = await sb.from('companies').select('name').eq('id', winnerId).limit(1).maybeSingle()
  const name = (company?.name as string | undefined) ?? winnerId

  const notes = await appendNote(sb, leadId, `[${today()}] WON via Panel: ${name}`)
  const { error: updErr } = await sb
    .from('leads')
    .update({ status: 'won', winning_company_id: winnerId, feedback_notes: notes })
    .eq('id', leadId)
  if (updErr) {
    console.error('[lead-actions] markLeadWon update failed:', updErr)
    return { ok: false, reason: 'update_failed' }
  }
  return { ok: true }
}

export async function markLeadLost(leadId: string, reason: string): Promise<ActionResult> {
  const sb = getServiceSupabase()

  const { data: lead, error: leadErr } = await sb
    .from('leads')
    .select('id')
    .eq('id', leadId)
    .limit(1)
    .maybeSingle()
  if (leadErr || !lead) return { ok: false, reason: 'lead_not_found' }

  const clean = reason.trim().slice(0, 200)
  const notes = await appendNote(sb, leadId, `[${today()}] LOST via Panel: ${clean}`)
  const { error: updErr } = await sb
    .from('leads')
    .update({ status: 'lost', feedback_notes: notes })
    .eq('id', leadId)
  if (updErr) {
    console.error('[lead-actions] markLeadLost update failed:', updErr)
    return { ok: false, reason: 'update_failed' }
  }
  return { ok: true }
}

function buildNachfassenHtml(
  firmName: string,
  craneType: string,
  city: string | null,
  custName: string | null,
  custEmail: string | null,
  custPhone: string | null,
): string {
  const loc = [craneType, city].filter(Boolean).map((x) => escapeHtml(String(x))).join(' · ')
  const contact = [custName, custEmail, custPhone]
    .filter((x) => x && String(x).trim())
    .map((x) => escapeHtml(String(x)))
    .join(' · ')
  return `<div style="font-family:system-ui;max-width:560px;font-size:14px;line-height:1.6;color:#1a1a1a;">
    <p>Sehr geehrtes Team von <strong>${escapeHtml(firmName)}</strong>,</p>
    <p>Sie haben über ${BRAND_NAME} zugesagt, für eine Anfrage ein Angebot zu erstellen (${loc}). Der Kunde wartet bislang noch auf ein Angebot.</p>
    <p>Falls es für Sie noch passt, nehmen Sie gern direkt Kontakt auf:<br><strong>${contact || '–'}</strong></p>
    <p>Eine kurze Rückmeldung an den Kunden genügt. Vielen Dank und beste Grüße<br>Christoph Jonetzko<br>${BRAND_NAME}</p>
  </div>`
}

// Nachfassen: remind a firm that ALREADY accepted but the customer has no offer
// yet. Targets only response='accept' (never re-pokes firms that declined or
// stayed silent). Reply-to = customer so the firm can reply to them directly.
export async function sendNachfassen(leadId: string, firmId: string): Promise<ActionResult> {
  const sb = getServiceSupabase()

  const { data: lc } = await sb
    .from('lead_companies')
    .select('company_id')
    .eq('lead_id', leadId)
    .eq('company_id', firmId)
    .limit(1)
    .maybeSingle()
  if (!lc) return { ok: false, reason: 'firm_not_on_lead' }

  const { data: resp } = await sb
    .from('lead_responses')
    .select('action')
    .eq('lead_id', leadId)
    .eq('supplier_id', firmId)
    .eq('action', 'accept')
    .limit(1)
    .maybeSingle()
  if (!resp) return { ok: false, reason: 'firm_not_accepted' }

  const { data: lead } = await sb
    .from('leads')
    .select('customer_name, customer_email, customer_phone, city, crane_type_id')
    .eq('id', leadId)
    .limit(1)
    .maybeSingle()
  if (!lead) return { ok: false, reason: 'lead_not_found' }

  const { data: firm } = await sb.from('companies').select('name, email').eq('id', firmId).limit(1).maybeSingle()
  if (!firm?.email) return { ok: false, reason: 'firm_no_email' }

  const { data: ct } = lead.crane_type_id
    ? await sb.from('crane_types').select('name').eq('id', lead.crane_type_id).limit(1).maybeSingle()
    : { data: null }
  const craneType = (ct?.name as string | undefined) ?? 'Kran'

  const key = process.env.RESEND_API_KEY
  if (!key) return { ok: false, reason: 'resend_unconfigured' }
  const resend = new Resend(key)
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: firm.email,
    ...(lead.customer_email ? { replyTo: lead.customer_email } : {}),
    subject: `Nachfrage zu Ihrer Zusage: ${[craneType, lead.city].filter(Boolean).join(' · ')}`,
    html: buildNachfassenHtml(firm.name, craneType, lead.city, lead.customer_name, lead.customer_email, lead.customer_phone),
  })
  if (error) {
    console.error('[lead-actions] sendNachfassen failed:', error)
    return { ok: false, reason: 'send_failed' }
  }

  const notes = await appendNote(sb, leadId, `[${today()}] Nachfassen via Panel an ${firm.name}`)
  await sb.from('leads').update({ feedback_notes: notes }).eq('id', leadId)
  return { ok: true }
}

// Kunden-Mail: free-form (admin edits a template) message to the customer.
// Body is plain text from the textarea -> escaped + rendered with pre-wrap, so
// no HTML injection. Reply-to = founder so replies reach Christoph.
export async function sendCustomerMail(leadId: string, subject: string, body: string): Promise<ActionResult> {
  const sb = getServiceSupabase()
  const { data: lead } = await sb
    .from('leads')
    .select('customer_email')
    .eq('id', leadId)
    .limit(1)
    .maybeSingle()
  if (!lead) return { ok: false, reason: 'lead_not_found' }
  if (!lead.customer_email) return { ok: false, reason: 'no_customer_email' }

  const key = process.env.RESEND_API_KEY
  if (!key) return { ok: false, reason: 'resend_unconfigured' }
  const html = `<div style="font-family:system-ui;max-width:560px;font-size:14px;line-height:1.6;color:#1a1a1a;white-space:pre-wrap;">${escapeHtml(body)}</div>`
  const resend = new Resend(key)
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: lead.customer_email,
    replyTo: FOUNDER_EMAIL,
    subject: subject.slice(0, 200),
    html,
  })
  if (error) {
    console.error('[lead-actions] sendCustomerMail failed:', error)
    return { ok: false, reason: 'send_failed' }
  }

  const notes = await appendNote(sb, leadId, `[${today()}] Kunden-Mail via Panel: ${subject.slice(0, 80)}`)
  await sb.from('leads').update({ feedback_notes: notes }).eq('id', leadId)
  return { ok: true }
}
