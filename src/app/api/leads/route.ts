import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { submitLead } from '@/lib/queries'
import { getServiceSupabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

// --- Input sanitization ---
const MAX_TEXT_LENGTH = 500
const MAX_COMPANY_IDS = 10

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function truncate(str: string, max = MAX_TEXT_LENGTH): string {
  return typeof str === 'string' ? str.slice(0, max) : ''
}

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL!
if (!process.env.NOTIFICATION_EMAIL) {
  throw new Error('NOTIFICATION_EMAIL environment variable is required')
}
const FROM_EMAIL = 'KranVergleich <noreply@send.kranvergleich.de>'

// --- Rate limiting: max 5 requests per minute per IP ---
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const ipRequestLog = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = ipRequestLog.get(ip) ?? []
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  recent.push(now)
  ipRequestLog.set(ip, recent)
  // Clean up old entries periodically
  if (ipRequestLog.size > 10_000) {
    for (const [key, val] of ipRequestLog) {
      if (val.every((t) => now - t > RATE_LIMIT_WINDOW_MS)) ipRequestLog.delete(key)
    }
  }
  return recent.length > RATE_LIMIT_MAX
}

export async function POST(request: Request) {
  try {
    // Rate limit by IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut.' },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Honeypot: if the hidden field is filled, it's a bot
    if (body.website_url) {
      // Silently accept but do nothing — bots think it worked
      return NextResponse.json({ success: true, id: 'ok' })
    }

    // Validate required fields
    if (!body.customer_email || !body.dsgvo_consent) {
      return NextResponse.json(
        { error: 'E-Mail und DSGVO-Zustimmung sind erforderlich.' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.customer_email)) {
      return NextResponse.json(
        { error: 'Ungültige E-Mail-Adresse.' },
        { status: 400 }
      )
    }

    // Validate company_ids array size
    const companyIds: string[] = Array.isArray(body.company_ids) ? body.company_ids.slice(0, MAX_COMPANY_IDS) : []

    // Truncate text fields
    const city = truncate(body.city || '')
    const customerName = truncate(body.customer_name || '')
    const customerPhone = truncate(body.customer_phone || '', 30)
    const customerEmail = truncate(body.customer_email, 254)
    const projectDescription = truncate(body.project_description || '', 2000)
    const preferredDate = truncate(body.preferred_date || '', 20)
    const durationDays = typeof body.duration_days === 'number' ? Math.min(Math.max(0, Math.round(body.duration_days)), 3650) : null

    const lead = await submitLead({
      crane_type_id: body.crane_type_id || null,
      city,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail,
      project_description: projectDescription,
      preferred_date: preferredDate || null,
      duration_days: durationDays,
      dsgvo_consent: body.dsgvo_consent,
      company_ids: companyIds,
    })

    // Escape all user input for HTML emails
    const safeName = escapeHtml(customerName) || '–'
    const safeEmail = escapeHtml(customerEmail)
    const safePhone = escapeHtml(customerPhone) || '–'
    const safeCity = escapeHtml(city) || '–'
    const safeDate = escapeHtml(preferredDate) || '–'
    const safeDesc = escapeHtml(projectDescription)
    const companyCount = companyIds.length

    // Fetch selected companies upfront — used by both the owner notification
    // (company list) and the downstream per-company lead emails.
    let selectedCompanies: { id: string; name: string; email: string | null }[] = []
    if (companyIds.length > 0) {
      const sb = getServiceSupabase()
      const { data } = await sb
        .from('companies')
        .select('id, name, email')
        .in('id', companyIds)
      selectedCompanies = data ?? []
    }
    const companiesWithEmail = selectedCompanies.filter((c) => c.email)
    const companiesWithoutEmail = selectedCompanies.filter((c) => !c.email)

    const companyListHtml = selectedCompanies.length > 0
      ? `<ul style="margin:4px 0 0 0;padding-left:18px;font-size:13px;color:#1a1a1a;">
          ${selectedCompanies
            .map((c) => {
              const hasEmail = !!c.email
              const status = hasEmail
                ? '<span style="color:#16a34a;">✉️ E-Mail gesendet</span>'
                : '<span style="color:#dc2626;">⚠️ keine E-Mail — manuell weiterleiten</span>'
              return `<li style="margin-bottom:2px;"><strong>${escapeHtml(c.name)}</strong> — ${status}</li>`
            })
            .join('')}
        </ul>`
      : '<span style="color:#9ca3af;">keine</span>'

    // Send notification email to owner
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject: `Neue Anfrage: ${safeName} — ${safeCity}`,
      html: `
        <h2>Neue Kranvermietungs-Anfrage</h2>
        <table style="border-collapse:collapse;font-family:system-ui;font-size:14px;">
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280;">Name</td><td><strong>${safeName}</strong></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280;">E-Mail</td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280;">Telefon</td><td>${safePhone}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280;">Stadt</td><td>${safeCity}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280;">Wunschtermin</td><td>${safeDate}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280;">Mietdauer</td><td>${durationDays ? `${durationDays} Tage` : '–'}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280;vertical-align:top;">Anbieter</td><td>${companyCount} ausgewählt (${companiesWithEmail.length} mit E-Mail, ${companiesWithoutEmail.length} ohne)${companyListHtml}</td></tr>
        </table>
        ${safeDesc ? `<p style="margin-top:12px;padding:12px;background:#f9fafb;border-radius:6px;font-size:14px;">${safeDesc}</p>` : ''}
        <p style="margin-top:16px;font-size:12px;color:#9ca3af;">Lead-ID: ${lead.id}</p>
      `,
    }).catch((err) => {
      console.error('Resend notification error:', err)
    })

    // Send confirmation email to customer
    await resend.emails.send({
      from: FROM_EMAIL,
      to: customerEmail,
      subject: `Ihre Anfrage bei KranVergleich.de — ${companyCount > 0 ? `${companyCount} Anbieter kontaktiert` : 'Bestätigung'}`,
      html: `
        <div style="font-family:system-ui;max-width:520px;">
          <h2 style="font-size:18px;">Vielen Dank für Ihre Anfrage!</h2>
          <p style="color:#4b5563;font-size:14px;line-height:1.6;">
            ${safeName !== '–' ? `Hallo ${safeName},` : 'Hallo,'}<br><br>
            ${companyCount > 0
              ? `Ihre Anfrage wurde an <strong>${companyCount} Anbieter</strong> weitergeleitet. Die Unternehmen werden sich in Kürze bei Ihnen melden.`
              : 'Wir haben Ihre Anfrage erhalten und melden uns in Kürze bei Ihnen.'}
          </p>
          <table style="border-collapse:collapse;font-size:13px;margin:16px 0;">
            ${safeCity !== '–' ? `<tr><td style="padding:3px 10px 3px 0;color:#6b7280;">Stadt</td><td>${safeCity}</td></tr>` : ''}
            ${safeDate !== '–' ? `<tr><td style="padding:3px 10px 3px 0;color:#6b7280;">Wunschtermin</td><td>${safeDate}</td></tr>` : ''}
            ${durationDays ? `<tr><td style="padding:3px 10px 3px 0;color:#6b7280;">Mietdauer</td><td>${durationDays} Tage</td></tr>` : ''}
          </table>
          <p style="font-size:13px;color:#9ca3af;margin-top:24px;">
            KranVergleich.de — Kranvermietung in Deutschland vergleichen<br>
            <a href="https://kranvergleich.de" style="color:#2563eb;">kranvergleich.de</a>
          </p>
        </div>
      `,
    }).catch((err) => {
      console.error('Resend confirmation error:', err)
    })

    // Send lead email to selected companies (reuses selectedCompanies fetched above)
    if (selectedCompanies.length > 0) {
      // Send to each company that has an email
      for (const company of companiesWithEmail) {
          resend.emails.send({
            from: FROM_EMAIL,
            to: company.email!,
            replyTo: customerEmail,
            subject: `Neue Kranvermietungs-Anfrage von ${safeName} — ${safeCity}`,
            html: `
              <div style="font-family:system-ui;max-width:560px;">
                <h2 style="font-size:18px;color:#1a1a1a;">Neue Anfrage über KranVergleich.de</h2>
                <p style="color:#4b5563;font-size:14px;line-height:1.6;">
                  Ein potenzieller Kunde hat über KranVergleich.de eine Anfrage an <strong>${escapeHtml(company.name)}</strong> gesendet.
                </p>
                <table style="border-collapse:collapse;font-size:14px;margin:16px 0;width:100%;">
                  <tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Name</td><td><strong>${safeName}</strong></td></tr>
                  <tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">E-Mail</td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
                  ${safePhone !== '–' ? `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Telefon</td><td>${safePhone}</td></tr>` : ''}
                  <tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Stadt</td><td>${safeCity}</td></tr>
                  ${safeDate !== '–' ? `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Wunschtermin</td><td>${safeDate}</td></tr>` : ''}
                  ${durationDays ? `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Mietdauer</td><td>${durationDays} Tage</td></tr>` : ''}
                </table>
                ${safeDesc ? `<p style="margin:16px 0;padding:12px;background:#f9fafb;border-radius:6px;font-size:14px;line-height:1.5;"><strong>Projektbeschreibung:</strong><br>${safeDesc}</p>` : ''}
                <p style="font-size:14px;color:#4b5563;">Bitte antworten Sie direkt auf diese E-Mail oder kontaktieren Sie den Kunden über die oben genannten Kontaktdaten.</p>
                <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
                <p style="font-size:12px;color:#9ca3af;">
                  Diese Anfrage wurde über <a href="https://kranvergleich.de" style="color:#2563eb;">KranVergleich.de</a> vermittelt.
                </p>
              </div>
            `,
          }).catch((err) => {
            console.error(`Resend company email error (${company.name}):`, err)
          })
        }

        // Forward leads for companies without email to owner
        if (companiesWithoutEmail.length > 0) {
          const missingNames = companiesWithoutEmail.map((c) => escapeHtml(c.name)).join(', ')
          resend.emails.send({
            from: FROM_EMAIL,
            to: NOTIFICATION_EMAIL,
            subject: `⚠️ Anfrage ohne Firmen-E-Mail: ${missingNames}`,
            html: `
              <h3>Firmen ohne E-Mail-Adresse — manuelle Weiterleitung nötig</h3>
              <p>Folgende Firmen wurden vom Kunden ausgewählt, haben aber keine E-Mail in der Datenbank:</p>
              <ul>${companiesWithoutEmail.map((c) => `<li><strong>${escapeHtml(c.name)}</strong> (ID: ${c.id})</li>`).join('')}</ul>
              <p>Kundendaten: <strong>${safeName}</strong>, ${safeEmail}, ${safePhone}</p>
              <p style="font-size:12px;color:#9ca3af;">Lead-ID: ${lead.id}</p>
            `,
        }).catch((err) => {
          console.error('Resend missing-email notification error:', err)
        })
      }
    }

    return NextResponse.json({ success: true, id: lead.id })
  } catch {
    return NextResponse.json(
      { error: 'Interner Serverfehler. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    )
  }
}
