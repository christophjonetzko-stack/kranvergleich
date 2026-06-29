import { getServiceSupabase } from '@/lib/supabase'

/**
 * Lead panel write-actions (Faza 2a) — WON / LOST only, no emails.
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
