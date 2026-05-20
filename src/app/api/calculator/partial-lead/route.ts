import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getServiceSupabase } from '@/lib/supabase'
import { COUNTRY } from '@/lib/country'

// Mid-calculator name+email capture (BLOK D of the Priestley reframe).
// Writes a leads row with is_partial=TRUE so abandon-recovery sequences
// can later contact users who stopped before completing Q3+Q4+PLZ.
//
// When the user finishes the calculator, /api/leads receives the same
// partial_lead_id (sent by the client from sessionStorage) and UPDATEs
// that row to is_partial=FALSE + the full payload. Dispatch (firm emails,
// auto-select) only runs on completion, not on the partial.
//
// Email + name are the only mandatory fields. project_type / weight_band
// are nice-to-have segmentation hints that ride along when present.

const PROJECT_TYPE_WHITELIST = new Set([
  'neubau',
  'sanierung',
  'dachdecker',
  'industrie',
  'einzeltransport',
])

// Rate limit — same envelope as /api/beacon: 30 inserts/min/IP. The mid-
// flow capture step shouldn't fire more than once or twice per session,
// so anything beyond that is bot churn.
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 30
const ipRequestLog = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (ipRequestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  recent.push(now)
  ipRequestLog.set(ip, recent)
  if (ipRequestLog.size > 10_000) {
    for (const [k, v] of ipRequestLog) {
      if (v.every((t) => now - t > RATE_LIMIT_WINDOW_MS)) ipRequestLog.delete(k)
    }
  }
  return recent.length > RATE_LIMIT_MAX
}

const emailSchema = z.string().email().max(254)

interface PartialLeadBody {
  customer_name?: unknown
  customer_email?: unknown
  project_type?: unknown
  weight_band?: unknown
  dsgvo_consent?: unknown
  dry_run?: unknown
  // Honeypot — bots fill, real users never see it.
  website_url?: unknown
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
    }

    const body = (await request.json().catch(() => null)) as PartialLeadBody | null
    if (!body) return NextResponse.json({ error: 'invalid_body' }, { status: 400 })

    // Honeypot — silently drop bot submissions.
    if (typeof body.website_url === 'string' && body.website_url.length > 0) {
      return NextResponse.json({ id: 'honeypot' })
    }

    // DSGVO is mandatory — the BLOK D mini-form checkbox enforces it client-side;
    // server double-checks so a malicious caller can't bypass.
    if (body.dsgvo_consent !== true) {
      return NextResponse.json({ error: 'dsgvo_consent_required' }, { status: 400 })
    }

    const rawName = typeof body.customer_name === 'string' ? body.customer_name.trim() : ''
    const rawEmail = typeof body.customer_email === 'string' ? body.customer_email.trim() : ''
    if (rawName.length < 2 || rawName.length > 80) {
      return NextResponse.json({ error: 'invalid_name' }, { status: 400 })
    }
    const emailParse = emailSchema.safeParse(rawEmail)
    if (!emailParse.success) {
      return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
    }

    const projectType = typeof body.project_type === 'string' && PROJECT_TYPE_WHITELIST.has(body.project_type)
      ? body.project_type
      : null

    // weight_band is a free-form display label from the calculator option
    // ("1–5 Tonnen", "Über 50 Tonnen"). Stash in project_description so
    // abandon-recovery can reference it without a separate column. Capped
    // at 60 chars to prevent injection of long strings into the column.
    const weightBand = typeof body.weight_band === 'string'
      ? body.weight_band.trim().slice(0, 60)
      : ''

    const partialDescription = [
      '[Partial Capture]',
      projectType ? `Projekttyp: ${projectType}` : null,
      weightBand ? `Gewicht: ${weightBand}` : null,
    ].filter(Boolean).join(' | ')

    // dry_run mode — for QA / smoke tests via `?dryrun=1` propagated by the
    // calculator client. Doesn't touch the DB; returns a fake id so the
    // client-side flow can be exercised end-to-end.
    if (body.dry_run === true) {
      return NextResponse.json({
        id: '00000000-0000-0000-0000-000000000000',
        dry_run: true,
      })
    }

    const sb = getServiceSupabase()
    const { data, error } = await sb
      .from('leads')
      .insert({
        customer_name: rawName,
        customer_email: rawEmail.toLowerCase(),
        project_description: partialDescription,
        project_type: projectType,
        dsgvo_consent: true,
        is_partial: true,
        // city is NOT NULL on the leads table — fill with a placeholder until
        // completion. Reports filtering WHERE NOT is_partial will never see it.
        city: 'pending',
        status: 'new',
        country: COUNTRY,
      })
      .select('id')
      .single()

    if (error || !data) {
      console.error('[partial-lead] insert error:', error)
      return NextResponse.json({ error: 'db_insert_failed' }, { status: 500 })
    }

    return NextResponse.json({ id: data.id })
  } catch (err) {
    console.error('[partial-lead] unexpected error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
