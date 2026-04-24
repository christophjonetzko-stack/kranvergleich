import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { Resend, type CreateEmailOptions } from 'resend'
import { submitLead, getCompaniesForCraneTypeNearLocation, type FirmMatch } from '@/lib/queries'
import { getServiceSupabase } from '@/lib/supabase'
import { getCraneTypeNameById } from '@/data/crane-types'

// Must match the salt base used by /api/track so a single visitor's events
// hash identically on the same day (enables cross-event user journey queries).
const FIRM_EVENTS_SALT_BASE = 'kranvergleich-firm-events-v1'

// Resend SDK resolves with `{ data, error }` for API failures instead of
// throwing — a bare `.catch()` swallows invalid-key, unverified-domain, and
// rate-limit errors. Always inspect `error` and log it; also wrap the call
// in try/catch for SDK-level throws (network, SDK bugs). Without this,
// Resend failures look identical to success in Vercel logs.
async function sendResendEmail(
  label: string,
  options: CreateEmailOptions,
): Promise<{ ok: boolean; error?: unknown }> {
  try {
    const { error } = await getResend().emails.send(options)
    if (error) {
      console.error(`Resend ${label} error:`, error)
      return { ok: false, error }
    }
    return { ok: true }
  } catch (err) {
    console.error(`Resend ${label} threw:`, err)
    return { ok: false, error: err }
  }
}

// Lazy init — avoid instantiating at module load so builds work without env.
let resendInstance: Resend | null = null
function getResend(): Resend {
  if (!resendInstance) {
    const key = process.env.RESEND_API_KEY
    if (!key) throw new Error('RESEND_API_KEY environment variable is required')
    resendInstance = new Resend(key)
  }
  return resendInstance
}

function getNotificationEmail(): string {
  const email = process.env.NOTIFICATION_EMAIL
  if (!email) throw new Error('NOTIFICATION_EMAIL environment variable is required')
  return email
}

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
    // Rate limit by IP — prefer CF-Connecting-IP (Cloudflare sets authoritatively, can't be spoofed)
    const ip =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'unknown'
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

    // Auto-select nearest firms when client requests it (cost calculator flow
    // — user doesn't see a firm list, we pick for them based on craneType +
    // location). Skipped when client already supplied `company_ids` explicitly.
    // `location` accepts either a 5-digit PLZ or a city name; `plz` is kept
    // as a backwards-compat alias for older clients still sending that field.
    let companyIds: string[] = Array.isArray(body.company_ids) ? body.company_ids.slice(0, MAX_COMPANY_IDS) : []
    let autoSelectedRadiusKm: number | null = null
    let autoSelectedResolvedLabel: string | null = null
    let autoSelectedMatches: FirmMatch[] | null = null
    const locationInput: string | null =
      (typeof body.location === 'string' && body.location.trim()) ||
      (typeof body.plz === 'string' && body.plz.trim()) ||
      null
    if (
      companyIds.length === 0 &&
      body.auto_select_nearest === true &&
      typeof body.crane_type_id === 'string' &&
      locationInput
    ) {
      try {
        const result = await getCompaniesForCraneTypeNearLocation(body.crane_type_id, locationInput, {
          limit: MAX_COMPANY_IDS,
        })
        if (result && result.matches.length > 0) {
          companyIds = result.matches.map((m) => m.company.id)
          autoSelectedRadiusKm = result.radius_used_km
          autoSelectedResolvedLabel = result.resolved_label
          autoSelectedMatches = result.matches
        }
      } catch (err) {
        console.error('auto_select_nearest lookup failed:', err)
        // Fall through — lead still gets saved without company_ids, owner handles manually.
      }
    }

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

    // Look up crane type name so firm emails can show "Krantyp: Autokran"
    // — the single most important piece of info for a firm to triage a lead.
    let craneTypeName: string | null = null
    if (body.crane_type_id) {
      const sb = getServiceSupabase()
      const { data: ct } = await sb
        .from('crane_types')
        .select('name')
        .eq('id', body.crane_type_id)
        .maybeSingle()
      craneTypeName = ct?.name ?? null
    }
    const safeCraneType = craneTypeName ? escapeHtml(craneTypeName) : null

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

    // Log a firm_events row per selected company. Server-side (not a client
    // beacon) because this is the most important conversion signal and must
    // not be lost to navigation/beacon failure. Fire-and-forget — never block
    // the lead response on tracking. See migration 007.
    if (companyIds.length > 0) {
      const eventDate = new Date().toISOString().slice(0, 10)
      const ipHash = createHash('sha256')
        .update(`${ip}|${eventDate}|${FIRM_EVENTS_SALT_BASE}`)
        .digest('hex')
      const rows = companyIds.map((firmId) => ({
        firm_id: firmId,
        event_type: 'form_submit',
        city_context: null,
        type_context: null,
        ip_hash: ipHash,
        event_date: eventDate,
      }))
      getServiceSupabase()
        .from('firm_events')
        .upsert(rows, {
          onConflict: 'firm_id,ip_hash,event_type,event_date',
          ignoreDuplicates: true,
        })
        .then(({ error }) => {
          if (error) console.error('firm_events form_submit insert error:', error)
        })
    }

    // Per-company email template. Defined before sending so the same HTML is
    // reused by every firm email and (if needed) a retry script.
    const buildCompanyEmailHtml = (companyName: string) => `
            <div style="font-family:system-ui;max-width:560px;">
              <h2 style="font-size:18px;color:#1a1a1a;">Neue Anfrage über KranVergleich.de</h2>
              <p style="color:#4b5563;font-size:14px;line-height:1.6;margin:0 0 6px 0;">
                Sehr geehrtes Team von <strong>${escapeHtml(companyName)}</strong>,
              </p>
              <p style="color:#4b5563;font-size:14px;line-height:1.6;">
                ein potenzieller Kunde hat über KranVergleich.de eine Anfrage an Sie gesendet.
              </p>
              <table style="border-collapse:collapse;font-size:14px;margin:16px 0;width:100%;">
                ${safeCraneType ? `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Krantyp</td><td><strong>${safeCraneType}</strong></td></tr>` : ''}
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
          `

    // Send per-company emails FIRST so the owner notification can report the
    // REAL delivery status per firm (not optimistic labels). Parallel send
    // via Promise.all is safe because sendResendEmail never throws.
    // MAX_COMPANY_IDS = 10 keeps this well below Resend's rate limit.
    const firmResults: { company_id: string; ok: boolean }[] = await Promise.all(
      companiesWithEmail.map(async (company) => {
        const result = await sendResendEmail(`company email (${company.name})`, {
          from: FROM_EMAIL,
          to: company.email!,
          replyTo: customerEmail,
          subject: `KranVergleich.de - Neue Kranvermietungs-Anfrage von ${safeName} — ${safeCity}`,
          html: buildCompanyEmailHtml(company.name),
        })
        return { company_id: company.id, ok: result.ok }
      }),
    )

    // Mark lead_companies.sent_at for successful deliveries. Service role
    // bypasses RLS. One UPDATE with .in() filter handles all successes at once.
    const successCompanyIds = firmResults.filter((r) => r.ok).map((r) => r.company_id)
    if (successCompanyIds.length > 0) {
      const sb = getServiceSupabase()
      const { error: updateErr } = await sb
        .from('lead_companies')
        .update({ sent_at: new Date().toISOString() })
        .eq('lead_id', lead.id)
        .in('company_id', successCompanyIds)
      if (updateErr) console.error('lead_companies.sent_at update error:', updateErr)
    }

    // Build owner notification's company list with REAL per-firm delivery
    // status. Was optimistic ("gesendet" whenever company has an email) — now
    // distinguishes gesendet / fehlgeschlagen / keine E-Mail.
    const companyListHtml = selectedCompanies.length > 0
      ? `<ul style="margin:4px 0 0 0;padding-left:18px;font-size:13px;color:#1a1a1a;">
          ${selectedCompanies
            .map((c) => {
              let status: string
              if (!c.email) {
                status = '<span style="color:#dc2626;">⚠️ keine E-Mail — manuell weiterleiten</span>'
              } else {
                const r = firmResults.find((fr) => fr.company_id === c.id)
                status = r?.ok
                  ? '<span style="color:#16a34a;">✉️ E-Mail gesendet</span>'
                  : '<span style="color:#dc2626;">❌ E-Mail fehlgeschlagen — manuell weiterleiten</span>'
              }
              return `<li style="margin-bottom:2px;"><strong>${escapeHtml(c.name)}</strong> — ${status}</li>`
            })
            .join('')}
        </ul>`
      : '<span style="color:#9ca3af;">keine</span>'

    // Send notification email to owner (now with real delivery status)
    await sendResendEmail('notification', {
      from: FROM_EMAIL,
      to: getNotificationEmail(),
      subject: `KranVergleich.de - Neue Anfrage: ${safeName} — ${safeCity}`,
      html: `
        <h2>Neue Kranvermietungs-Anfrage</h2>
        <table style="border-collapse:collapse;font-family:system-ui;font-size:14px;">
          ${safeCraneType ? `<tr><td style="padding:4px 12px 4px 0;color:#6b7280;">Krantyp</td><td><strong>${safeCraneType}</strong></td></tr>` : ''}
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
    })

    // Send confirmation email to customer
    await sendResendEmail('confirmation', {
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
    })

    // Forward leads for companies without email to owner
    if (companiesWithoutEmail.length > 0) {
      const missingNames = companiesWithoutEmail.map((c) => escapeHtml(c.name)).join(', ')
      await sendResendEmail('missing-email notification', {
        from: FROM_EMAIL,
        to: getNotificationEmail(),
        subject: `KranVergleich.de - ⚠️ Anfrage ohne Firmen-E-Mail: ${missingNames}`,
        html: `
            <h3>Firmen ohne E-Mail-Adresse — manuelle Weiterleitung nötig</h3>
            <p>Folgende Firmen wurden vom Kunden ausgewählt, haben aber keine E-Mail in der Datenbank:</p>
            <ul>${companiesWithoutEmail.map((c) => `<li><strong>${escapeHtml(c.name)}</strong> (ID: ${c.id})</li>`).join('')}</ul>
            <p>Kundendaten: <strong>${safeName}</strong>, ${safeEmail}, ${safePhone}</p>
            <p style="font-size:12px;color:#9ca3af;">Lead-ID: ${lead.id}</p>
          `,
      })
    }

    // Rich matched_companies for the UI success card (avatars, rating, tags…).
    // Auto-selected path reuses the FirmMatch data we already have in memory
    // (includes distance_km + full company fields + crane types). Manual path
    // falls back to the lighter `selectedCompanies` lookup used for emails.
    const matchedCompaniesForClient = autoSelectedMatches
      ? autoSelectedMatches.map((m) => ({
          id: m.company.id,
          name: m.company.name,
          slug: m.company.slug,
          city: m.company.city,
          distance_km: Math.round(m.distance_km),
          google_rating: m.company.google_rating,
          google_reviews_count: m.company.google_reviews_count,
          is_verified: m.company.is_verified,
          crane_type_names: Array.from(
            new Set(
              (m.company.company_cranes ?? []).map((cc) => getCraneTypeNameById(cc.crane_type_id)),
            ),
          ),
        }))
      : selectedCompanies.map((c) => ({
          id: c.id,
          name: c.name,
          slug: '',
          city: '',
          distance_km: null,
          google_rating: null,
          google_reviews_count: 0,
          is_verified: false,
          crane_type_names: [] as string[],
        }))

    return NextResponse.json({
      success: true,
      id: lead.id,
      matched_companies: matchedCompaniesForClient,
      radius_used_km: autoSelectedRadiusKm,
      resolved_label: autoSelectedResolvedLabel,
    })
  } catch {
    return NextResponse.json(
      { error: 'Interner Serverfehler. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    )
  }
}
