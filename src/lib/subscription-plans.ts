// Single source of truth mapping the supply-side subscription tiers to their
// Stripe Price ids (env-driven, never hardcoded) and to the `subscriptions.plan`
// enum from migration 036.
//
// The user-facing selection has THREE options (premium / pro / gruender), but
// the DB `plan` enum has only TWO paid values (premium / pro): Gründerpreis is a
// premium plan at a cheaper price. So 'gruender' resolves to dbPlan 'premium'
// and is distinguished downstream ONLY by its Stripe price id / subscription
// metadata.plan_variant — the enum is deliberately NOT widened.

export type PlanSelection = 'premium' | 'pro' | 'gruender'
export type DbPlan = 'premium' | 'pro'

const PREMIUM_ENV = 'STRIPE_PRICE_PREMIUM'
const PRO_ENV = 'STRIPE_PRICE_PRO'
const GRUENDER_ENV = 'STRIPE_PRICE_GRUENDER'

/** Trim guards against whitespace pasted into env (a stray space => "No such price"). */
function envPrice(name: string): string | undefined {
  return process.env[name]?.trim() || undefined
}

// selection -> { which DB plan to store, which env holds the price }
const PLAN_SPEC: Record<PlanSelection, { dbPlan: DbPlan; env: string }> = {
  premium: { dbPlan: 'premium', env: PREMIUM_ENV },
  pro: { dbPlan: 'pro', env: PRO_ENV },
  gruender: { dbPlan: 'premium', env: GRUENDER_ENV },
}

/**
 * Resolve a user selection to the Stripe price + the DB plan to store.
 * Returns null if the matching price env is unset (route -> 500 pricing_unavailable).
 */
export function resolvePlanCheckout(
  selection: PlanSelection,
): { dbPlan: DbPlan; priceId: string } | null {
  const { dbPlan, env } = PLAN_SPEC[selection]
  const priceId = envPrice(env)
  return priceId ? { dbPlan, priceId } : null
}

/**
 * Reverse map (used by the Stripe webhook, KROK 7.3): given the price id carried
 * on a subscription, return the DB plan to store. Gründer + Premium prices both
 * map to 'premium'. Unknown / unset price -> null, so the webhook never upserts a
 * premium row it cannot classify.
 */
export function dbPlanFromPriceId(priceId: string | undefined | null): DbPlan | null {
  if (!priceId) return null
  const id = priceId.trim()
  if (id === envPrice(PREMIUM_ENV) || id === envPrice(GRUENDER_ENV)) return 'premium'
  if (id === envPrice(PRO_ENV)) return 'pro'
  return null
}
