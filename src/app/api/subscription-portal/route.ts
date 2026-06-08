import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getStripe } from '@/lib/stripe'
import { getServiceSupabase } from '@/lib/supabase'
import { BASE_URL } from '@/lib/country'

// Node runtime: Stripe SDK + transitive supabase import (Edge would break) —
// same constraint as /api/subscription-checkout. Additive route; touches nothing
// existing.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const bodySchema = z.object({
  companyId: z.string().uuid(),
})

export async function POST(req: Request) {
  let parsed: z.infer<typeof bodySchema>
  try {
    parsed = bodySchema.parse(await req.json())
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }

  // Map firm -> Stripe customer via the subscriptions row (service-role read —
  // subscriptions is not exposed to the anon key under RLS).
  const sb = getServiceSupabase()
  const { data: sub, error: readErr } = await sb
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('company_id', parsed.companyId)
    .maybeSingle()
  if (readErr) {
    console.error('[subscription-portal] subscription read failed', readErr.message)
    return NextResponse.json({ error: 'lookup_failed' }, { status: 500 })
  }
  // No row / no customer id means the firm never checked out — there is no
  // billing to manage. 404 (not 500): this is an expected "nothing to manage"
  // state, not a server fault.
  if (!sub || !sub.stripe_customer_id) {
    return NextResponse.json(
      { error: 'no_subscription', detail: 'Firma hat noch keine Subscription / keinen Stripe-Kunden.' },
      { status: 404 },
    )
  }

  try {
    const stripe = getStripe()
    // Portal scope (cancel + payment method + invoices; NO plan switching) is
    // configured in the Stripe Dashboard (7.1), not here — this route only opens
    // the session.
    const session = await stripe.billingPortal.sessions.create({
      customer: sub.stripe_customer_id,
      // No Anbieter-Dashboard yet (KROK 8) — return to the homepage with a flag
      // rather than creating new pages outside this step's scope.
      return_url: `${BASE_URL}/?abo=portal`,
    })

    if (!session.url) {
      return NextResponse.json({ error: 'session_no_url' }, { status: 500 })
    }
    return NextResponse.json({ url: session.url })
  } catch (err) {
    // 500 not 502 (Cloudflare masks origin 502 bodies). `detail` is a short,
    // non-secret Stripe message to aid local setup; it never includes secrets.
    const detail = err instanceof Error ? err.message : String(err)
    console.error('[subscription-portal] stripe error', detail)
    return NextResponse.json({ error: 'portal_failed', detail }, { status: 500 })
  }
}
