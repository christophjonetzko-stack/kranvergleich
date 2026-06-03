import { NextResponse } from 'next/server'
import { runCoach, runBerater, runSubtypeCheck, runRequirements, type BeraterMessage } from '@/lib/ai-helper'

// Rate limit per IP, same shape as /api/leads (5/min). Coach gets called on
// every typing pause so we want a slightly higher ceiling than the lead form.
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 12
const ipRequestLog = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = ipRequestLog.get(ip) ?? []
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  recent.push(now)
  ipRequestLog.set(ip, recent)
  if (ipRequestLog.size > 10_000) {
    for (const [key, val] of ipRequestLog) {
      if (val.every((t) => now - t > RATE_LIMIT_WINDOW_MS)) ipRequestLog.delete(key)
    }
  }
  return recent.length > RATE_LIMIT_MAX
}

const MAX_DESCRIPTION_LEN = 1500
const MAX_MESSAGES = 10
const MAX_MESSAGE_LEN = 1000

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Zu viele Anfragen. Bitte warten Sie einen Moment.' },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Honeypot, same hidden field as /api/leads
    if (body.website_url) {
      return NextResponse.json({ ok: true, mode: body.mode, silent: true })
    }

    if (body.mode === 'coach') {
      const description = String(body.description ?? '').slice(0, MAX_DESCRIPTION_LEN)
      if (!description.trim()) {
        return NextResponse.json({ missing: [], hints: [], subtype_suggestion: '' })
      }
      const craneTypeName =
        typeof body.craneTypeName === 'string' ? body.craneTypeName.slice(0, 80) : null
      const result = await runCoach({ description, craneTypeName })
      return NextResponse.json(result)
    }

    if (body.mode === 'subtype-check') {
      const projectDetails = String(body.projectDetails ?? '').slice(0, MAX_DESCRIPTION_LEN)
      const chosenTypeSlug = String(body.chosenTypeSlug ?? '').slice(0, 40)
      const chosenTypeName = String(body.chosenTypeName ?? '').slice(0, 40)
      // Skip the AI call entirely when there's nothing useful to check 
      // saves tokens and avoids "kein Hinweis" responses when the user
      // didn't write any free-text description.
      if (!projectDetails.trim() || !chosenTypeSlug || projectDetails.trim().length < 20) {
        return NextResponse.json({ should_suggest: false, hint_kind: 'none', suggested_type_slug: '', message: '' })
      }
      const weightTons = typeof body.weightTons === 'number' ? body.weightTons : null
      const heightMeters = typeof body.heightMeters === 'number' ? body.heightMeters : null
      const result = await runSubtypeCheck({
        chosenTypeName,
        chosenTypeSlug,
        weightTons,
        heightMeters,
        projectDetails,
      })
      return NextResponse.json(result)
    }

    if (body.mode === 'requirements') {
      const description = String(body.description ?? '').slice(0, MAX_DESCRIPTION_LEN)
      // Nothing useful to extract from a near-empty field — skip the AI call.
      if (description.trim().length < 8) {
        return NextResponse.json({ capacity_kg: 0, reach_m: 0, needs_glass: false, needs_operator: false, reasoning: '' })
      }
      const result = await runRequirements(description)
      return NextResponse.json(result)
    }

    if (body.mode === 'berater') {
      if (!Array.isArray(body.messages)) {
        return NextResponse.json({ error: 'messages array required' }, { status: 400 })
      }
      // Sanitize message array, only allowed roles, capped length, trimmed.
      const rawMessages = body.messages.slice(-MAX_MESSAGES) as unknown[]
      const messages: BeraterMessage[] = []
      for (const m of rawMessages) {
        if (
          typeof m === 'object' &&
          m !== null &&
          'role' in m &&
          'content' in m &&
          ((m as { role: string }).role === 'user' || (m as { role: string }).role === 'assistant') &&
          typeof (m as { content: unknown }).content === 'string'
        ) {
          const content = ((m as { content: string }).content).slice(0, MAX_MESSAGE_LEN)
          if (content.trim().length === 0) continue
          messages.push({ role: (m as { role: 'user' | 'assistant' }).role, content })
        }
      }

      if (messages.length === 0) {
        return NextResponse.json({ error: 'no valid messages' }, { status: 400 })
      }
      // Trim leading assistant messages (Anthropic requires first message = user)
      while (messages.length > 0 && messages[0].role !== 'user') messages.shift()
      if (messages.length === 0) {
        return NextResponse.json({ error: 'no user message' }, { status: 400 })
      }

      const result = await runBerater(messages)
      return NextResponse.json(result)
    }

    return NextResponse.json({ error: 'unknown mode' }, { status: 400 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'unknown error'
    console.error('/api/ai-helper error:', msg)
    return NextResponse.json(
      { error: 'KI-Service vorübergehend nicht verfügbar.' },
      { status: 500 }
    )
  }
}
