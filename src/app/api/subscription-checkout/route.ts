import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createSubscriptionCheckoutSession } from '@/lib/subscription-checkout-core'

// Node runtime: Stripe SDK + transitive supabase import (Edge would break) —
// same constraint as /api/path4-checkout. This route is SEPARATE from Path 4's
// one-shot checkout and never touches it; it only adds the subscription path.
// The session-creation logic lives in lib/subscription-checkout-core.ts (KROK 8a),
// shared with the admin outbound-link generator. This route owns only request
// parsing + mapping the core result to HTTP responses (unchanged contract).
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

  const result = await createSubscriptionCheckoutSession(parsed.companyId, parsed.plan)

  if (result.ok) {
    return NextResponse.json({ url: result.url })
  }
  if ('blocked' in result) {
    // Shared re-subscription guard (8a-2). The core never returns this arm in 8a-1,
    // so the public route's behaviour is unchanged here; the public-route blocked
    // contract is decided in 8a-2 (P2). 409 placeholder.
    return NextResponse.json({ error: result.blocked }, { status: 409 })
  }
  return NextResponse.json(
    { error: result.error, ...(result.detail !== undefined && { detail: result.detail }) },
    { status: result.status },
  )
}
