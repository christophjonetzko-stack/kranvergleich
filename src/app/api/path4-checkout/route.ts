import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getStripe } from '@/lib/stripe'
import { getCompanyBySlug } from '@/lib/queries'
import { BASE_URL } from '@/lib/country'

// Node runtime: Stripe SDK + transitive supabase import (Edge would break).
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const bodySchema = z.object({
  companySlug: z.string().min(1).max(200),
})

// Launch window per PATH4_TIER_SPEC: 99 EUR until 25.06.2026, 149 EUR after.
// Europe/Berlin is UTC+2 in June (DST). Overridable via env if the soft pilot
// extends the early-adopter window.
const LAUNCH_END_DEFAULT = '2026-06-25T23:59:59+02:00'

/** Returns the Stripe Price id for the current period, or null if the matching env is unset. */
function selectPriceId(now: Date): { priceId: string | undefined; isLaunch: boolean } {
  const launchEnd = new Date(process.env.STRIPE_PATH4_LAUNCH_END || LAUNCH_END_DEFAULT)
  const isLaunch = now.getTime() <= launchEnd.getTime()
  const priceId = isLaunch
    ? process.env.STRIPE_PRICE_LAUNCH_99
    : process.env.STRIPE_PRICE_STANDARD_149
  return { priceId, isLaunch }
}

export async function POST(req: Request) {
  let parsed: z.infer<typeof bodySchema>
  try {
    parsed = bodySchema.parse(await req.json())
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }

  // Resolve slug -> company so the webhook can map the payment back via
  // client_reference_id. getCompanyBySlug already filters is_active + is_relevant.
  const company = await getCompanyBySlug(parsed.companySlug)
  if (!company) {
    return NextResponse.json({ error: 'company_not_found' }, { status: 404 })
  }

  const { priceId } = selectPriceId(new Date())
  if (!priceId) {
    console.error('[path4-checkout] price env not set (STRIPE_PRICE_LAUNCH_99 / STRIPE_PRICE_STANDARD_149)')
    return NextResponse.json({ error: 'pricing_unavailable' }, { status: 500 })
  }

  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      mode: 'payment', // one-time charge, NOT a subscription (Path 4 contract)
      line_items: [{ price: priceId, quantity: 1 }],
      // Contract with /api/stripe-webhook: company id travels on the session and
      // on the PaymentIntent so both checkout.session.completed and a later
      // refund/dispute can be mapped back to the row.
      client_reference_id: company.id,
      metadata: { company_id: company.id, company_slug: company.slug },
      payment_intent_data: { metadata: { company_id: company.id } },
      locale: 'de',
      tax_id_collection: { enabled: true },
      success_url: `${BASE_URL}/path4/erfolgreich?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/path4/abgebrochen`,
    })

    if (!session.url) {
      return NextResponse.json({ error: 'session_no_url' }, { status: 500 })
    }
    return NextResponse.json({ url: session.url })
  } catch (err) {
    // 500 (not 502): Cloudflare masks origin 502s with its own page, hiding the
    // body. 500 passes through so the reason is visible. `detail` is a short,
    // non-sensitive Stripe error message (e.g. "No such price", "Invalid API
    // Key") to aid setup; it never includes secrets.
    const detail = err instanceof Error ? err.message : String(err)
    console.error('[path4-checkout] stripe error', detail)
    return NextResponse.json({ error: 'checkout_failed', detail }, { status: 500 })
  }
}
