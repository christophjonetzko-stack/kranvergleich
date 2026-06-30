import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabase'
import { sendReportConfirmEmail } from '@/lib/report-mail'
import { genToken, getClientIp } from '@/lib/report-subscribe'

/**
 * Demand-signal opt-in (Nachfrage-Report, Version A / free).
 * DSGVO Art. 6(1)(a): consent completed only via the double-opt-in click in
 * GET /api/report-confirm. This endpoint creates a `pending` row and sends the
 * neutral confirmation mail. Writes go through the service-role client only.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Generic success — the endpoint never reveals whether an address is already on file.
function ok() {
  return NextResponse.json({ success: true })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
    const cityRaw = typeof body?.city === 'string' ? body.city.trim() : ''
    const city = cityRaw ? cityRaw.slice(0, 120) : null

    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Bitte geben Sie eine gültige E-Mail-Adresse an.' }, { status: 400 })
    }

    const sb = getServiceSupabase()

    // Already an active (pending|confirmed) subscription? Stay silent
    // (anti-enumeration). If it is still pending, re-send the confirmation so a
    // lost mail can be recovered without creating a duplicate row.
    const { data: existing } = await sb
      .from('report_subscribers')
      .select('id, status, confirm_token')
      .eq('email', email)
      .in('status', ['pending', 'confirmed'])
      .maybeSingle()

    if (existing) {
      if (existing.status === 'pending' && existing.confirm_token) {
        const mail = await sendReportConfirmEmail(email, existing.confirm_token)
        if (!mail.ok) console.error('report-subscribe: confirmation re-send failed:', mail.error)
      }
      return ok()
    }

    const confirm_token = genToken()
    const unsubscribe_token = genToken()
    const { error: insErr } = await sb.from('report_subscribers').insert({
      email,
      city,
      status: 'pending',
      confirm_token,
      unsubscribe_token,
      source: 'nachfrage_report_2026',
      consent_ip: getClientIp(req),
    })

    if (insErr) {
      // Most likely the partial-unique-index race (two parallel submits).
      // Treat as success so we neither leak state nor 500 the user.
      console.error('report_subscribers insert:', insErr.message)
      return ok()
    }

    const mail = await sendReportConfirmEmail(email, confirm_token)
    if (!mail.ok) console.error('report-subscribe: confirmation mail failed:', mail.error)
    return ok()
  } catch {
    return NextResponse.json(
      { error: 'Interner Serverfehler. Bitte versuchen Sie es später erneut.' },
      { status: 500 },
    )
  }
}
