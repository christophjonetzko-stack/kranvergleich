import { NextResponse } from 'next/server'
import { z } from 'zod'
import { isAdminRequest } from '@/lib/admin-auth'
import { markLeadWon, markLeadLost } from '@/lib/lead-actions'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const bodySchema = z.discriminatedUnion('action', [
  z.object({ action: z.literal('won'), leadId: z.string().uuid(), winnerId: z.string().uuid() }),
  z.object({ action: z.literal('lost'), leadId: z.string().uuid(), reason: z.string().min(1).max(200) }),
])

export async function POST(req: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  let body: z.infer<typeof bodySchema>
  try {
    body = bodySchema.parse(await req.json())
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }

  const res =
    body.action === 'won'
      ? await markLeadWon(body.leadId, body.winnerId)
      : await markLeadLost(body.leadId, body.reason)

  if (!res.ok) {
    return NextResponse.json({ error: res.reason }, { status: 400 })
  }
  return NextResponse.json({ ok: true })
}
