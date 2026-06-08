import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getStripe } from '@/lib/stripe'
import { getServiceSupabase } from '@/lib/supabase'
import { resolvePlanCheckout } from '@/lib/subscription-plans'
import { BASE_URL } from '@/lib/country'

// Node runtime: Stripe SDK + transitive supabase import (Edge would break) —
// same constraint as /api/path4-checkout. This route is SEPARATE from Path 4's
// one-shot checkout and never touches it; it only adds the subscription path.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const bodySchema = z.object({
  companyId: z.string().uuid(),
  plan: z.enum(['premium', 'pro', 'gruender']),
})

export async function POST(req: Request) {
  let parsed: z.infer<typeof bodySchema>
  try {
    parsed = bodySchema.parse(await req.json())
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }

  // Map selection -> Stripe price + the plan we store in `subscriptions`.
  // 'gruender' resolves to dbPlan 'premium' (cheaper price only).
  const resolved = resolvePlanCheckout(parsed.plan)
  if (!resolved) {
    console.error('[subscription-checkout] price env not set for plan', parsed.plan)
    return NextResponse.json({ error: 'pricing_unavailable' }, { status: 500 })
  }

  // Confirm the company exists before opening checkout (service-role read —
  // companies/subscriptions are not exposed to the anon key under RLS).
  const sb = getServiceSupabase()
  const { data: company, error: readErr } = await sb
    .from('companies')
    .select('id, name')
    .eq('id', parsed.companyId)
    .maybeSingle()
  if (readErr) {
    console.error('[subscription-checkout] company read failed', readErr.message)
    return NextResponse.json({ error: 'lookup_failed' }, { status: 500 })
  }
  if (!company) {
    return NextResponse.json({ error: 'company_not_found' }, { status: 404 })
  }

  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription', // recurring — distinct from Path 4's mode:'payment'
      line_items: [{ price: resolved.priceId, quantity: 1 }],
      // Webhook contract (KROK 7.3): company id on BOTH client_reference_id and
      // metadata so checkout.session.completed maps the session back to a firm.
      // metadata.plan carries the DB enum value ('premium'|'pro') to upsert.
      client_reference_id: company.id,
      metadata: { company_id: company.id, plan: resolved.dbPlan },
      // Stamp the subscription object too: company_id lets later
      // customer.subscription.* events (which do NOT carry the session metadata)
      // be traced back, and plan_variant preserves the founder/regular
      // distinction the DB enum intentionally drops ('gruender' vs 'premium').
      subscription_data: {
        metadata: { company_id: company.id, plan_variant: parsed.plan },
      },
      // Stripe Tax needs a billing address; prices are net, USt added on top.
      automatic_tax: { enabled: true },
      billing_address_collection: 'required',
      tax_id_collection: { enabled: true },
      locale: 'de',
      // No Anbieter-Dashboard yet (KROK 8) — return to the homepage with a flag
      // rather than creating new pages outside this step's scope.
      success_url: `${BASE_URL}/?abo=erfolgreich&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/?abo=abgebrochen`,
    })

    if (!session.url) {
      return NextResponse.json({ error: 'session_no_url' }, { status: 500 })
    }
    return NextResponse.json({ url: session.url })
  } catch (err) {
    // 500 not 502: Cloudflare masks origin 502 bodies. `detail` is a short,
    // non-secret Stripe message ("No such price", "Invalid API Key") to aid
    // local setup; it never includes secrets.
    const detail = err instanceof Error ? err.message : String(err)
    console.error('[subscription-checkout] stripe error', detail)
    return NextResponse.json({ error: 'checkout_failed', detail }, { status: 500 })
  }
}
