// Path 4 (Verified+Featured listing) server-side tier operations.
//
// All writes use the service-role client (RLS bypass) and must run only in API
// routes / server actions. The activation rule mirrors migration 033:
//
//   is_premium = true   iff   tier_purchased_at IS NOT NULL
//                        AND  tier_verified_at  IS NOT NULL
//
// recordTierPurchase() sets the purchase only — is_premium STAYS false until a
// human verification flips it (markCompanyVerified). revokeTier() drops the
// public premium flag but never clears the tier_* audit columns, so the Stripe
// payment trail survives a refund or dispute (migration 033 contract).

import { getServiceSupabase } from './supabase'

export interface PendingVerification {
  id: string
  name: string
  slug: string
  website: string | null
  phone: string | null
  tier_purchased_at: string
  tier_amount_cents: number | null
}

/**
 * Record a completed Stripe Checkout payment against a company.
 * Idempotent: re-delivery of the same checkout session is a no-op success.
 * is_premium is left false (verification pending).
 */
export async function recordTierPurchase(params: {
  companyId: string
  stripeSessionId: string
  amountCents: number
}): Promise<{ ok: boolean; alreadyProcessed?: boolean; reason?: string; companyName?: string }> {
  const { companyId, stripeSessionId, amountCents } = params
  const sb = getServiceSupabase()

  // Idempotency guard: Stripe re-delivers webhooks. If this exact session is
  // already recorded on the company, treat as a no-op success so a retry does
  // not reset tier_purchased_at or double-count anything.
  const { data: existing, error: readErr } = await sb
    .from('companies')
    .select('id, name, tier_stripe_session_id')
    .eq('id', companyId)
    .maybeSingle()
  if (readErr) return { ok: false, reason: `read_failed: ${readErr.message}` }
  if (!existing) return { ok: false, reason: 'company_not_found' }
  if (existing.tier_stripe_session_id === stripeSessionId) {
    return { ok: true, alreadyProcessed: true, companyName: existing.name }
  }

  const { error: updErr } = await sb
    .from('companies')
    .update({
      tier_purchased_at: new Date().toISOString(),
      tier_stripe_session_id: stripeSessionId,
      tier_amount_cents: amountCents,
      // is_premium intentionally NOT set here — manual verification gates it.
    })
    .eq('id', companyId)
  if (updErr) return { ok: false, reason: `update_failed: ${updErr.message}` }
  return { ok: true, companyName: existing.name }
}

/**
 * Firms that paid but are not yet verified — the manual verification queue.
 * Plain SELECT backed by the partial index from migration 033.
 */
export async function getPendingVerificationQueue(): Promise<PendingVerification[]> {
  const sb = getServiceSupabase()
  const { data, error } = await sb
    .from('companies')
    .select('id, name, slug, website, phone, tier_purchased_at, tier_amount_cents')
    .not('tier_purchased_at', 'is', null)
    .is('tier_verified_at', null)
    .order('tier_purchased_at', { ascending: true })
  if (error) throw new Error(`pending_queue_failed: ${error.message}`)
  return (data ?? []) as PendingVerification[]
}

/**
 * Flip a paid firm to verified + premium after Christoph confirmed Impressum,
 * website and phone. Guards against verifying a firm that never paid.
 */
export async function markCompanyVerified(
  companyId: string,
): Promise<{ ok: boolean; reason?: string }> {
  const sb = getServiceSupabase()
  const { data: row, error: readErr } = await sb
    .from('companies')
    .select('id, tier_purchased_at')
    .eq('id', companyId)
    .maybeSingle()
  if (readErr) return { ok: false, reason: readErr.message }
  if (!row) return { ok: false, reason: 'company_not_found' }
  if (!row.tier_purchased_at) return { ok: false, reason: 'not_purchased' }

  const { error: updErr } = await sb
    .from('companies')
    .update({ tier_verified_at: new Date().toISOString(), is_premium: true })
    .eq('id', companyId)
  if (updErr) return { ok: false, reason: updErr.message }
  return { ok: true }
}

/**
 * Refund / dispute / manual revoke: drop the public premium flag but KEEP the
 * tier_* audit columns intact (migration 033 contract). The caller logs the
 * reason for the audit trail.
 */
export async function revokeTier(
  companyId: string,
  reason: string,
): Promise<{ ok: boolean; reason?: string }> {
  void reason // logged by caller; kept in signature for an explicit audit handle
  const sb = getServiceSupabase()
  const { error } = await sb
    .from('companies')
    .update({ is_premium: false })
    .eq('id', companyId)
  if (error) return { ok: false, reason: error.message }
  return { ok: true }
}
