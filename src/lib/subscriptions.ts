// Server-side subscription state ops (supply-side monetisation, KROK 7).
// All writes go through the service-role client (RLS bypass) and run only from
// the Stripe webhook. is_premium is NEVER written here — the migration 036
// trigger derives it from (plan, plan_status). This module only owns the
// `subscriptions` row.

import { getServiceSupabase } from './supabase'
import type { DbPlan } from './subscription-plans'

export type PlanStatus = 'active' | 'trialing' | 'past_due' | 'canceled'

/**
 * Map a raw Stripe subscription.status to one of our 4 allowed plan_status
 * values, or 'skip' to write nothing. The 036 CHECK permits only the 4, so the
 * raw status is NEVER stored directly.
 *   active/trialing/past_due/canceled -> 1:1
 *   unpaid / incomplete_expired / paused -> canceled
 *   incomplete -> skip (wait for active; never grant premium on a half-open sub)
 *   anything unknown -> skip (defensive: don't write a status we don't model)
 */
export function mapStripeStatus(raw: string | undefined): PlanStatus | 'skip' {
  switch (raw) {
    case 'active':
      return 'active'
    case 'trialing':
      return 'trialing'
    case 'past_due':
      return 'past_due'
    case 'canceled':
      return 'canceled'
    case 'unpaid':
    case 'incomplete_expired':
    case 'paused':
      return 'canceled'
    case 'incomplete':
    default:
      return 'skip'
  }
}

export interface SubscriptionUpsert {
  companyId: string
  plan?: DbPlan
  planStatus?: PlanStatus
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  currentPeriodEnd?: string // ISO 8601
}

/**
 * UPSERT a subscription row keyed on company_id (UNIQUE). Only the provided
 * fields are written: on a conflict (existing row) the omitted columns are left
 * untouched, so two out-of-order Stripe events can each set the part they carry
 * without clobbering the other (e.g. checkout.session.completed sets the ids +
 * plan, customer.subscription.updated sets status + current_period_end).
 *
 * Keyed on company_id (NOT stripe_subscription_id) precisely because Stripe does
 * not guarantee event ordering: a customer.subscription.created can arrive
 * before checkout.session.completed. Upserting by the company makes the write
 * order-independent and idempotent.
 */
export async function upsertSubscription(
  f: SubscriptionUpsert,
): Promise<{ ok: boolean; reason?: string }> {
  const sb = getServiceSupabase()
  const row: Record<string, unknown> = { company_id: f.companyId }
  if (f.plan !== undefined) row.plan = f.plan
  if (f.planStatus !== undefined) row.plan_status = f.planStatus
  if (f.stripeCustomerId !== undefined) row.stripe_customer_id = f.stripeCustomerId
  if (f.stripeSubscriptionId !== undefined) row.stripe_subscription_id = f.stripeSubscriptionId
  if (f.currentPeriodEnd !== undefined) row.current_period_end = f.currentPeriodEnd

  const { error } = await sb.from('subscriptions').upsert(row, { onConflict: 'company_id' })
  if (error) return { ok: false, reason: error.message }
  return { ok: true }
}

/** Resolve company_id from a tracked subscription id (NULL-safe). */
export async function companyIdBySubscriptionId(
  subId: string | undefined,
): Promise<string | undefined> {
  if (!subId) return undefined
  const sb = getServiceSupabase()
  const { data } = await sb
    .from('subscriptions')
    .select('company_id')
    .eq('stripe_subscription_id', subId)
    .maybeSingle()
  return data?.company_id ?? undefined
}

/** Resolve company_id from a Stripe customer id (NULL-safe; invoice fallback). */
export async function companyIdByCustomerId(
  customerId: string | undefined,
): Promise<string | undefined> {
  if (!customerId) return undefined
  const sb = getServiceSupabase()
  const { data } = await sb
    .from('subscriptions')
    .select('company_id')
    .eq('stripe_customer_id', customerId)
    .maybeSingle()
  return data?.company_id ?? undefined
}

/**
 * Scope guard for state-MUTATING events. A firm tracks exactly one subscription
 * (036: company_id UNIQUE). Returns true — the event MAY write — iff:
 *   (a) the row has no stripe_subscription_id yet (first event establishes it), OR
 *   (b) the tracked stripe_subscription_id equals this event's subId.
 * Returns false when the row already tracks a DIFFERENT sub (e.g. an orphaned old
 * sub after re-subscription), so its late .updated / .deleted / payment_failed
 * cannot clobber the row tracking the firm's active sub.
 *
 * Deliberately NOT used by checkout.session.completed / customer.subscription
 * .created — those ESTABLISH the tracked sub (latest checkout wins). A NULL/empty
 * subId against an already-tracked row returns false (can't verify -> caller skips).
 */
export async function isTrackedSubscription(
  companyId: string,
  subId: string | undefined,
): Promise<boolean> {
  const sb = getServiceSupabase()
  const { data } = await sb
    .from('subscriptions')
    .select('stripe_subscription_id')
    .eq('company_id', companyId)
    .maybeSingle()
  const tracked = data?.stripe_subscription_id ?? undefined
  if (!tracked) return true // (a) nothing tracked yet
  return tracked === subId // (b) same sub only
}

/** True if a subscriptions row already exists for the firm. */
export async function subscriptionExists(companyId: string): Promise<boolean> {
  const sb = getServiceSupabase()
  const { data } = await sb
    .from('subscriptions')
    .select('company_id')
    .eq('company_id', companyId)
    .maybeSingle()
  return !!data
}
