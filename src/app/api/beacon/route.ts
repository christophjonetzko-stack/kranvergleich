import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { getServiceSupabase } from '@/lib/supabase'
import { COUNTRY } from '@/lib/country'
import { classifyUserAgent } from '@/lib/device'

// Page-level engagement tracking — see supabase/migrations/011_page_events.sql
// for the DSGVO rationale. Same cookie-free, daily-salt, hashed-IP design as
// /api/track (which is firm-specific). This endpoint handles page-scope events
// that do NOT belong to a single firm (calculator funnel, scroll depth, etc.).

const EVENT_TYPES = new Set([
  'calculator_step_completed',
  'calculator_recommendation_shown',
  'calculator_lead_submit_attempt',
  'calculator_lead_submit_success',
  'calculator_form_validation_failed',
  'inline_sammelanfrage_submit',
  'scroll_depth_25',
  'scroll_depth_50',
  'scroll_depth_75',
  'click_city_link',
  'click_type_link',
  'hero_search_submit',
  'hero_project_describe_expanded',
  'chatbot_opened',
  'chatbot_message_sent',
  'chatbot_recommendation_shown',
  'chatbot_view_providers_clicked',
  'chatbot_prompt_shown',
  'chatbot_prompt_dismissed',
  'listing_cta_to_preise_clicked',
  'listing_inquire_all_clicked',
  'listing_inquire_all_submitted',
])

// Matches /api/track for consistency. The base is not a secret — the daily
// rotation of the full salt (base + event_date) is what prevents cross-day
// linkability (Plausible architecture pattern).
const SALT_BASE = 'kranvergleich-firm-events-v1'

const BOT_UA_RE = /(bot|crawl|spider|headless|fetch|monitor|scan|wget|curl|python-requests|preview|scraper)/i

// Rate limit: 30 tracks/min per IP. Same as /api/track — a visitor scrolling
// + completing 4 calculator steps + submitting can easily hit 8+ events in
// a couple of minutes without being abusive.
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

// Page path must start with `/`, be ≤120 chars, contain only characters that
// appear in this app's URL surface. Anything weirder is dropped.
const PAGE_PATH_RE = /^\/[a-z0-9/_.-]{0,120}$/i

// Context is a shallow object with whitelisted keys + primitive values.
// Everything else is stripped — we never store raw user input verbatim.
const CONTEXT_KEY_WHITELIST = new Set([
  'step',                     // number, 1-4 (calculator)
  'value',                    // string, slug-like (calculator answer)
  'crane_type',               // string, slug-like
  'city',                     // string, slug-like
  'matched_count',            // number
  'radius_km',                // number
  'project_details_filled',   // boolean
  'project_details_length',   // number
  // Hero search (added 2026-05-01 — pre-decision instrumentation)
  'has_crane_type',           // boolean — was the type select non-empty
  'has_city',                 // boolean — was the city/PLZ field non-empty
  'has_project',              // boolean — was the optional textarea expanded + filled
  'project_length',           // number  — char count of the optional textarea
  // Chatbot
  'message_index',            // number  — 1-based index of the user message in the session
  'type_slug',                // string  — slug-like, recommended crane type
  // Calculator validation failure
  'reason',                   // string  — slug-like (dsgvo / location_too_short / server_error)
  'field',                    // string  — slug-like (which form field failed)
])
const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,63}$/

function sanitizeContext(raw: unknown): Record<string, string | number | boolean> | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null
  const out: Record<string, string | number | boolean> = {}
  for (const [key, val] of Object.entries(raw as Record<string, unknown>)) {
    if (!CONTEXT_KEY_WHITELIST.has(key)) continue
    if (typeof val === 'string') {
      if (SLUG_RE.test(val)) out[key] = val
    } else if (typeof val === 'number' && Number.isFinite(val)) {
      // Clamp numbers to a sane range to prevent enormous values polluting the table.
      out[key] = Math.max(-1_000_000, Math.min(1_000_000, Math.round(val)))
    } else if (typeof val === 'boolean') {
      out[key] = val
    }
  }
  return Object.keys(out).length > 0 ? out : null
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

    // Blob from sendBeacon carries content-type application/json too, but
    // explicit JSON parse + narrow types. If parse fails, log nothing.
    const body = (await request.json().catch(() => null)) as {
      event_type?: unknown
      page_path?: unknown
      context?: unknown
      utm_source?: unknown
      utm_medium?: unknown
      utm_campaign?: unknown
      utm_content?: unknown
    } | null
    if (!body) return new NextResponse(null, { status: 400 })

    const eventType = typeof body.event_type === 'string' ? body.event_type : ''
    const pagePath = typeof body.page_path === 'string' ? body.page_path : ''
    if (!EVENT_TYPES.has(eventType) || !PAGE_PATH_RE.test(pagePath)) {
      return new NextResponse(null, { status: 400 })
    }

    const eventDate = new Date().toISOString().slice(0, 10)
    const ipHash = hashIp(ip, eventDate)
    const device = classifyUserAgent(ua)

    // UTM stamping (mig 027). Client sends first-touch payload from
    // sessionStorage; we trust the values verbatim but clip to 120 chars
    // so a forged URL can't bloat the column. NULL when the client sends
    // no attribution (organic / direct entry).
    const clipUtm = (v: unknown): string | null => {
      if (typeof v !== 'string') return null
      const trimmed = v.trim()
      if (!trimmed) return null
      return trimmed.length > 120 ? trimmed.slice(0, 120) : trimmed
    }

    const sb = getServiceSupabase()
    await sb.from('page_events').insert({
      event_type: eventType,
      page_path: pagePath,
      context: sanitizeContext(body.context),
      ip_hash: ipHash,
      event_date: eventDate,
      country: COUNTRY,
      device,
      utm_source: clipUtm(body.utm_source),
      utm_medium: clipUtm(body.utm_medium),
      utm_campaign: clipUtm(body.utm_campaign),
      utm_content: clipUtm(body.utm_content),
    })

    return new NextResponse(null, { status: 204 })
  } catch {
    // Fire-and-forget — sendBeacon can't inspect bodies.
    return new NextResponse(null, { status: 500 })
  }
}
