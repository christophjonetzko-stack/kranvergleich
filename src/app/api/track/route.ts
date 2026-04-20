import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { getServiceSupabase } from '@/lib/supabase'

// Firm engagement tracking — see supabase/migrations/005_firm_events.sql for
// the DSGVO rationale (no cookies, no fingerprint, IP pseudonymized with
// daily salt, Art. 6(1)(f) legitimate interest).

const EVENT_TYPES = new Set([
  'profile_view',
  'phone_click',
  'email_click',
  'website_click',
])

// Fixed salt base. The real de-identification comes from combining it with
// the event date so hashes rotate daily; the base itself does not need to
// be secret in the adversarial sense (see Plausible architecture docs).
const SALT_BASE = 'kranvergleich-firm-events-v1'

// Rough UUID shape check before hitting Supabase — avoids DB trips on garbage.
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const BOT_UA_RE = /(bot|crawl|spider|headless|fetch|monitor|scan|wget|curl|python-requests|preview|scraper)/i

// In-memory rate limit: max 30 tracks per minute per IP. Higher than
// /api/leads (5/min) because legitimate users clicking around a listing
// page can hit several tracks in quick succession.
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

function hashIp(ip: string, eventDate: string): string {
  return createHash('sha256').update(`${ip}|${eventDate}|${SALT_BASE}`).digest('hex')
}

function sanitizeContext(val: unknown): string | null {
  if (typeof val !== 'string') return null
  const trimmed = val.trim().slice(0, 64)
  // Only allow lowercase slugs — prevents injecting JS/markup into the
  // firm-report HTML that renders this back.
  return /^[a-z0-9-]+$/.test(trimmed) ? trimmed : null
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'unknown'

    if (isRateLimited(ip)) return new NextResponse(null, { status: 429 })

    const ua = request.headers.get('user-agent') || ''
    if (BOT_UA_RE.test(ua)) return new NextResponse(null, { status: 204 })

    const body = await request.json().catch(() => null) as {
      firm_id?: unknown
      event_type?: unknown
      city_context?: unknown
      type_context?: unknown
    } | null

    if (!body) return new NextResponse(null, { status: 400 })

    const firmId = typeof body.firm_id === 'string' ? body.firm_id : ''
    const eventType = typeof body.event_type === 'string' ? body.event_type : ''
    if (!UUID_RE.test(firmId) || !EVENT_TYPES.has(eventType)) {
      return new NextResponse(null, { status: 400 })
    }

    const eventDate = new Date().toISOString().slice(0, 10)
    const ipHash = hashIp(ip, eventDate)

    const sb = getServiceSupabase()
    // UPSERT with ignore-duplicates: the unique (firm_id, ip_hash, event_type,
    // event_date) index collapses a refreshing/re-clicking visitor into one
    // row per day.
    await sb
      .from('firm_events')
      .upsert(
        {
          firm_id: firmId,
          event_type: eventType,
          city_context: sanitizeContext(body.city_context),
          type_context: sanitizeContext(body.type_context),
          ip_hash: ipHash,
          event_date: eventDate,
        },
        { onConflict: 'firm_id,ip_hash,event_type,event_date', ignoreDuplicates: true },
      )

    return new NextResponse(null, { status: 204 })
  } catch {
    // Fire-and-forget contract — the client uses sendBeacon, cannot inspect
    // error bodies. Return 500 without detail.
    return new NextResponse(null, { status: 500 })
  }
}
