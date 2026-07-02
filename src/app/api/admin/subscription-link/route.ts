import { NextResponse } from 'next/server'
import { z } from 'zod'
import { isAdminRequest } from '@/lib/admin-auth'
import { createSubscriptionCheckoutSession } from '@/lib/subscription-checkout-core'

// Admin-only generator for an outbound subscription Checkout link (KROK 8a).
// Reuses the shared core (same logic as the public /api/subscription-checkout) and
// adds the admin auth gate. The re-subscription guard lives in the core (8a-2), so
// the 'blocked' branch below becomes reachable then; in 8a-1 it is a placeholder.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const bodySchema = z.object({
  companyId: z.string().uuid(),
  plan: z.enum(['premium', 'pro', 'gruender']),
})

// Reuse the existing /api/subscription-portal as a black box — no duplication, no
// edit to that route. Same-origin (derived from req.url) so it resolves to
// localhost in dev and the prod host in production. Returns null if the firm has
// no Stripe customer yet (portal 404) — the UI then shows the warning without a link.
async function fetchPortalUrl(req: Request, companyId: string): Promise<string | null> {
  try {
    const res = await fetch(new URL('/api/subscription-portal', req.url), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ companyId }),
    })
    if (!res.ok) return null
    const data = (await res.json().catch(() => ({}))) as { url?: string }
    return data.url ?? null
  } catch {
    return null
  }
}

export async function POST(req: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  let parsed: z.infer<typeof bodySchema>
  try {
    parsed = bodySchema.parse(await req.json())
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }

  const result = await createSubscriptionCheckoutSession(parsed.companyId, parsed.plan)

  if (result.ok) {
    return NextResponse.json({ url: result.url })
  }
  if ('blocked' in result) {
    // Firm already has a live subscription → offer the Customer Portal instead of a
    // second checkout. portalUrl is omitted if the firm has no Stripe customer yet.
    const portalUrl = await fetchPortalUrl(req, parsed.companyId)
    return NextResponse.json({ blocked: true, ...(portalUrl && { portalUrl }) }, { status: 409 })
  }
  return NextResponse.json(
    { error: result.error, ...(result.detail !== undefined && { detail: result.detail }) },
    { status: result.status },
  )
}
