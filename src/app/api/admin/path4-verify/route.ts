import { NextResponse } from 'next/server'
import { z } from 'zod'
import { isAdminRequest } from '@/lib/admin-auth'
import { markCompanyVerified } from '@/lib/path4'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const bodySchema = z.object({ companyId: z.string().uuid() })

export async function POST(req: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  let companyId: string
  try {
    companyId = bodySchema.parse(await req.json()).companyId
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }

  const res = await markCompanyVerified(companyId)
  if (!res.ok) {
    return NextResponse.json({ error: res.reason ?? 'verify_failed' }, { status: 400 })
  }
  return NextResponse.json({ ok: true })
}
