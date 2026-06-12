import { getServiceSupabase } from '@/lib/supabase'

/**
 * Lead status lifecycle roll-up (lead-flow Pakiet 3, 2026-06-12).
 *
 * Automates the mig-025 convention that was documented as "roll-up by hand":
 * when EVERY firm on a lead has declined (feedback_outcome lost / wrong_fit),
 * the lead as a whole is lost. Called from the decline paths
 * (/api/lead-response POST and /api/lead-response/decline-reason).
 *
 * 'won' is intentionally NOT automated — a customer "got_offer" answer or an
 * accept click doesn't tell us which firm won; the owner closes those by
 * hand (see /api/lead-outcome owner alert).
 */
export async function maybeMarkLeadLost(leadId: string): Promise<void> {
  const sb = getServiceSupabase()
  const { data, error } = await sb
    .from('lead_companies')
    .select('feedback_outcome')
    .eq('lead_id', leadId)
  if (error) {
    console.error('[lead-status] rollup lookup failed:', error)
    return
  }
  if (!data || data.length === 0) return
  const allClosed = data.every(
    (r) => r.feedback_outcome === 'lost' || r.feedback_outcome === 'wrong_fit',
  )
  if (!allClosed) return
  const { error: updErr } = await sb
    .from('leads')
    .update({ status: 'lost' })
    .eq('id', leadId)
    .in('status', ['new', 'contacted'])
  if (updErr) console.error('[lead-status] mark-lost failed:', updErr)
}
