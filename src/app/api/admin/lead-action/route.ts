import { NextResponse } from 'next/server'
import { z } from 'zod'
import { isAdminRequest } from '@/lib/admin-auth'
import { markLeadWon, markLeadLost, sendNachfassen, sendCustomerMail, dispatchTopup, addLeadNote } from '@/lib/lead-actions'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const bodySchema = z.discriminatedUnion('action', [
  z.object({ action: z.literal('won'), leadId: z.string().uuid(), winnerId: z.string().uuid() }),
  z.object({ action: z.literal('lost'), leadId: z.string().uuid(), reason: z.string().min(1).max(200) }),
  z.object({ action: z.literal('nachfassen'), leadId: z.string().uuid(), firmId: z.string().uuid(), force: z.boolean().optional() }),
  z.object({
    action: z.literal('customer_mail'),
    leadId: z.string().uuid(),
    subject: z.string().min(1).max(200),
    body: z.string().min(1).max(5000),
  }),
  z.object({ action: z.literal('topup'), leadId: z.string().uuid(), firmIds: z.array(z.string().uuid()).min(1).max(20) }),
  z.object({ action: z.literal('note'), leadId: z.string().uuid(), text: z.string().min(1).max(2000) }),
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

  let res
  if (body.action === 'won') res = await markLeadWon(body.leadId, body.winnerId)
  else if (body.action === 'lost') res = await markLeadLost(body.leadId, body.reason)
  else if (body.action === 'nachfassen') res = await sendNachfassen(body.leadId, body.firmId, body.force === true)
  else if (body.action === 'customer_mail') res = await sendCustomerMail(body.leadId, body.subject, body.body)
  else if (body.action === 'note') res = await addLeadNote(body.leadId, body.text)
  else res = await dispatchTopup(body.leadId, body.firmIds)

  if (!res.ok) {
    return NextResponse.json({ error: res.reason }, { status: 400 })
  }
  return NextResponse.json({ ok: true })
}
