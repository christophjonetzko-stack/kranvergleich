// Shared core for the mode:'subscription' Stripe Checkout (KROK 7 + KROK 8a).
// Extracted verbatim from /api/subscription-checkout so BOTH the public route and
// the admin outbound-link generator (8a) call one implementation — no duplicated
// payment logic. Behaviour is identical to the original route body AFTER request
// parsing; the route still owns zod validation (400 invalid_request).

import { getStripe } from './stripe'
import { getServiceSupabase } from './supabase'
import { resolvePlanCheckout, type PlanSelection } from './subscription-plans'
import { hasActiveSubscription } from './subscriptions'
import { BASE_URL } from './country'

// Discriminated result. The `{ ok: false, blocked }` arm is RESERVED for the
// re-subscription guard added in 8a-2 — this module does not emit it yet, so the
// public route's behaviour is unchanged in 8a-1. The `{ ok: false, error, status }`
// arm carries the route's pre-existing failure outcomes verbatim so every caller
// can forward them byte-identically.
export type SubscriptionCheckoutResult =
  | { ok: true; url: string }
  | { ok: false; blocked: 'active_subscription' } // 8a-2 guard (not emitted in 8a-1)
  | { ok: false; error: SubscriptionCheckoutError; status: number; detail?: string }

export type SubscriptionCheckoutError =
  | 'pricing_unavailable'
  | 'lookup_failed'
  | 'company_not_found'
  | 'session_no_url'
  | 'checkout_failed'

/**
 * Create a recurring (mode:'subscription') Stripe Checkout session for a firm.
 * `plan` is the user selection ('premium' | 'pro' | 'gruender'); 'gruender' resolves
 * to dbPlan 'premium' (cheaper price only), distinguished downstream via the Stripe
 * subscription metadata.plan_variant.
 *
 * 8a-2: the re-subscription guard will be added at the marked spot below and return
 * { ok: false, blocked: 'active_subscription' }. Per P2 the public route then also
 * inherits the guard; that contract change is decided in 8a-2, not here.
 */
export async function createSubscriptionCheckoutSession(
  companyId: string,
  plan: PlanSelection,
): Promise<SubscriptionCheckoutResult> {
  // ── 8a-2: re-subscription guard ───────────────────────────────────────────
  // A firm tracks exactly one sub (036: company_id UNIQUE). If it already has a
  // LIVE one (active/trialing/past_due with a stripe_subscription_id), a second
  // checkout would orphan the first (still billed in Stripe). Block BEFORE we
  // touch Stripe — don't create a session we'd refuse anyway. This also fixes a
  // latent bug in the public route (it used to silently create the second sub).
  if (await hasActiveSubscription(companyId)) {
    return { ok: false, blocked: 'active_subscription' }
  }

  // Map selection -> Stripe price + the plan we store in `subscriptions`.
  const resolved = resolvePlanCheckout(plan)
  if (!resolved) {
    console.error('[subscription-checkout] price env not set for plan', plan)
    return { ok: false, error: 'pricing_unavailable', status: 500 }
  }

  // Confirm the company exists before opening checkout (service-role read —
  // companies/subscriptions are not exposed to the anon key under RLS).
  const sb = getServiceSupabase()
  const { data: company, error: readErr } = await sb
    .from('companies')
    .select('id, name')
    .eq('id', companyId)
    .maybeSingle()
  if (readErr) {
    console.error('[subscription-checkout] company read failed', readErr.message)
    return { ok: false, error: 'lookup_failed', status: 500 }
  }
  if (!company) {
    return { ok: false, error: 'company_not_found', status: 404 }
  }

  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription', // recurring — distinct from Path 4's mode:'payment'
      line_items: [{ price: resolved.priceId, quantity: 1 }],
      // Webhook contract (KROK 7.3): company id on BOTH client_reference_id and
      // metadata so checkout.session.completed maps the session back to a firm.
      client_reference_id: company.id,
      metadata: { company_id: company.id, plan: resolved.dbPlan },
      subscription_data: {
        metadata: { company_id: company.id, plan_variant: plan },
      },
      automatic_tax: { enabled: true },
      billing_address_collection: 'required',
      tax_id_collection: { enabled: true },
      locale: 'de',
      success_url: `${BASE_URL}/?abo=erfolgreich&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/?abo=abgebrochen`,
    })

    if (!session.url) {
      return { ok: false, error: 'session_no_url', status: 500 }
    }
    return { ok: true, url: session.url }
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err)
    console.error('[subscription-checkout] stripe error', detail)
    return { ok: false, error: 'checkout_failed', status: 500, detail }
  }
}
