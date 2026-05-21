import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabase'
import { verifyLeadResponseSig } from '@/lib/lead-response-sig'
import { BASE_URL } from '@/lib/country'

/**
 * Form-submit endpoint for the decline-reason form on /lead-response/thanks.
 * The GET handler at /api/lead-response/[leadId]/[supplierId] already wrote
 * the decline event row with reason=NULL and set lead_companies.feedback_outcome
 * provisionally to 'lost'. This route refines both: it stamps the reason on
 * the most-recent decline event and (where the reason indicates wrong fit
 * rather than capacity/budget) flips the outcome to 'wrong_fit' or 'other'.
 *
 * Sig is the same HMAC the GET handler verified, forwarded through the
 * thanks page as a hidden form field. We re-verify here so a direct POST
 * to this route without going through the thanks page can't write garbage.
 */

const REASON_TO_OUTCOME: Record<string, 'lost' | 'wrong_fit' | 'other'> = {
  kapazitaet: 'lost',
  region: 'wrong_fit',
  krantyp: 'wrong_fit',
  budget: 'lost',
  sonstiges: 'other',
}

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const leadId = String(form.get('lead') || '')
  const supplierId = String(form.get('supplier') || '')
  const sig = String(form.get('sig') || '')
  const reasonCode = String(form.get('reason') || '')
  const reasonTextRaw = String(form.get('reason_text') || '').slice(0, 500).trim()

  // Sig path is always 'decline' for this endpoint
  if (!verifyLeadResponseSig(leadId, supplierId, 'decline', sig)) {
    return NextResponse.json({ error: 'invalid_sig' }, { status: 403 })
  }

  if (!(reasonCode in REASON_TO_OUTCOME)) {
    return NextResponse.json({ error: 'invalid_reason' }, { status: 400 })
  }

  // For sonstiges, fold the free-text into the stored reason so the
  // owner alert + future reports carry the full context. For preset
  // codes, store the code alone so reports can group cleanly.
  const reasonStored =
    reasonCode === 'sonstiges' && reasonTextRaw
      ? `sonstiges: ${reasonTextRaw}`
      : reasonCode

  const sb = getServiceSupabase()

  // Find the most recent decline event for this (lead, supplier) and stamp
  // the reason on it. We pick the latest in case a firm declined twice
  // (rare; would only happen if they re-clicked from a cached mail).
  const { data: events, error: eventsErr } = await sb
    .from('lead_responses')
    .select('id')
    .eq('lead_id', leadId)
    .eq('supplier_id', supplierId)
    .eq('action', 'decline')
    .order('responded_at', { ascending: false })
    .limit(1)

  if (eventsErr) {
    console.error('lead_responses lookup failed:', eventsErr)
    return NextResponse.json({ error: 'lookup_failed' }, { status: 500 })
  }

  if (events && events.length > 0) {
    const { error: updErr } = await sb
      .from('lead_responses')
      .update({ reason: reasonStored })
      .eq('id', events[0].id)
    if (updErr) console.error('lead_responses reason update failed:', updErr)
  }

  // Roll up to lead_companies. Refines the provisional 'lost' set by the
  // GET handler to wrong_fit / other where the reason indicates.
  const outcome = REASON_TO_OUTCOME[reasonCode]
  const { data: lcRow } = await sb
    .from('lead_companies')
    .select('feedback_notes')
    .eq('lead_id', leadId)
    .eq('company_id', supplierId)
    .maybeSingle()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const priorNotes: string | null = (lcRow as any)?.feedback_notes ?? null
  const dayStamp = new Date().toISOString().slice(0, 10)
  const reasonNote = `[${dayStamp}] decline reason: ${reasonStored}`
  const newNotes = priorNotes && priorNotes.trim() ? `${priorNotes}\n${reasonNote}` : reasonNote

  const { error: updateError } = await sb
    .from('lead_companies')
    .update({ feedback_outcome: outcome, feedback_notes: newNotes })
    .eq('lead_id', leadId)
    .eq('company_id', supplierId)
  if (updateError) console.error('lead_companies refine update failed:', updateError)

  // 303 See Other, correct POSTGET redirect that prevents re-submission
  // on browser back-button.
  const thanksUrl = new URL('/lead-response/thanks', BASE_URL)
  thanksUrl.searchParams.set('done', '1')
  return NextResponse.redirect(thanksUrl.toString(), 303)
}
