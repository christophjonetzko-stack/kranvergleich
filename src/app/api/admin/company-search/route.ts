import { NextResponse } from 'next/server'
import { z } from 'zod'
import { isAdminRequest } from '@/lib/admin-auth'
import { getServiceSupabase } from '@/lib/supabase'

// Admin-only firm lookup for the abo generator (KROK 8a, P4). A SEPARATE read —
// it does NOT touch queries.ts. ilike on name (text column), never on a uuid.
// Returns enough for the UI to pick a firm and warn about an existing sub.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const ACTIVE_STATUSES = ['active', 'trialing', 'past_due']

export async function GET(req: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const raw = new URL(req.url).searchParams.get('q') ?? ''
  let q: string
  try {
    q = z.string().min(2).max(100).parse(raw.trim())
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }

  const sb = getServiceSupabase()
  const { data: companies, error } = await sb
    .from('companies')
    .select('id, name, city, is_premium')
    .ilike('name', `%${q}%`)
    .order('name')
    .limit(15)
  if (error) {
    console.error('[admin/company-search] read failed', error.message)
    return NextResponse.json({ error: 'lookup_failed' }, { status: 500 })
  }

  // Flag firms that already track an active/trialing/past_due subscription so the
  // UI can warn before generating a (would-be-orphaning) second checkout link.
  const ids = (companies ?? []).map((c) => c.id)
  const activeSet = new Set<string>()
  if (ids.length > 0) {
    const { data: subs } = await sb
      .from('subscriptions')
      .select('company_id, stripe_subscription_id, plan_status')
      .in('company_id', ids)
    for (const s of subs ?? []) {
      if (s.stripe_subscription_id && ACTIVE_STATUSES.includes(s.plan_status)) {
        activeSet.add(s.company_id)
      }
    }
  }

  return NextResponse.json({
    results: (companies ?? []).map((c) => ({
      id: c.id,
      name: c.name,
      city: c.city,
      is_premium: c.is_premium,
      hasActiveSub: activeSet.has(c.id),
    })),
  })
}
