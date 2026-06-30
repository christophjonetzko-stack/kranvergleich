import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { BASE_URL, BRAND_NAME } from '@/lib/country'

/**
 * Shared helpers for the Nachfrage-Report double-opt-in flow
 * (POST /api/report-subscribe, GET /api/report-confirm, GET /api/report-unsubscribe).
 *
 * Tokens are unguessable bearer secrets stored on the subscriber row — the
 * capability-URL pattern. No HMAC needed: the token itself is the secret and is
 * looked up in report_subscribers. Data-minimised by design.
 */

/** 48-char hex token, stored on the row, carried in confirm/unsubscribe links. */
export function genToken(): string {
  return randomBytes(24).toString('hex')
}

export function getClientIp(req: NextRequest): string | null {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return req.headers.get('x-real-ip')?.trim() ?? null
}

/** Minimal noindex status page for the confirm/unsubscribe GET routes. */
export function statusPage(title: string, heading: string, body: string, status = 200): NextResponse {
  return new NextResponse(
    `<!doctype html><html lang="de"><head><meta charset="utf-8">` +
      `<meta name="viewport" content="width=device-width, initial-scale=1">` +
      `<meta name="robots" content="noindex"><title>${title}</title></head>` +
      `<body style="font-family:system-ui;max-width:520px;margin:60px auto;padding:24px;color:#111;line-height:1.6;">` +
      `<h1 style="font-size:22px;margin-bottom:12px;">${heading}</h1>` +
      `<p style="color:#4b5563;">${body}</p>` +
      `<p style="margin-top:32px;"><a href="${BASE_URL}" style="color:#2563eb;font-size:14px;">Zurück zu ${BRAND_NAME}</a></p>` +
      `</body></html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  )
}
