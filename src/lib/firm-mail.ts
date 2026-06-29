import { Resend } from 'resend'
import { signLeadResponse } from '@/lib/lead-response-sig'

/**
 * Firm-facing lead notification mail for the panel top-up dispatch (Faza 2b-ii).
 *
 * Mirrors the proven template from src/app/api/leads/route.ts and the
 * scripts/dispatch_*.py one-offs — same subject shape, same accept/decline CTA
 * (signed via the canonical signLeadResponse so links validate against
 * /api/lead-response), same signal-back loop. Deliberately a SEPARATE module
 * (not a refactor of route.ts) so the production lead flow stays untouched.
 *
 * UWG §5: the "Telefonnummer geprüft" stamp is rendered ONLY when the customer
 * actually left a phone number (feedback_firm_mail_phone_stamp_conditional).
 */

const BASE_URL = 'https://kranvergleich.de'
const BRAND_NAME = 'KranVergleich.de'
const FROM_EMAIL = `Christoph Jonetzko · ${BRAND_NAME} <christoph@send.kranvergleich.de>`
const FOUNDER_NAME = process.env.KRANVERGLEICH_FOUNDER_NAME || 'Christoph Jonetzko'
const FOUNDER_EMAIL = process.env.KRANVERGLEICH_FOUNDER_EMAIL || 'christoph@kranvergleich.de'

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export interface FirmLeadMailData {
  leadId: string
  craneType: string
  displayCity: string
  customerName: string | null
  customerEmail: string | null
  customerPhone: string | null
  projectDescription: string | null
  preferredDate: string | null
  durationDays: number | null
  otherCount: number
  anbieterCount: number
}

function dateShort(iso: string | null): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso ?? '')
  return m ? `${m[3]}.${m[2]}.` : null
}

export function firmLeadSubject(d: FirmLeadMailData): string {
  return 'Neue Anfrage: ' + [d.craneType, d.displayCity, dateShort(d.preferredDate)].filter(Boolean).join(' · ')
}

export function buildFirmLeadHtml(firmId: string, firmName: string, d: FirmLeadMailData): string {
  const acc = `${BASE_URL}/api/lead-response/${d.leadId}/${firmId}?action=accept&sig=${signLeadResponse(d.leadId, firmId, 'accept')}`
  const dec = `${BASE_URL}/api/lead-response/${d.leadId}/${firmId}?action=decline&sig=${signLeadResponse(d.leadId, firmId, 'decline')}`

  const sn = esc(d.customerName ?? '–')
  const se = d.customerEmail ? esc(d.customerEmail) : '–'
  const sp = d.customerPhone && d.customerPhone.trim() ? esc(d.customerPhone) : '–'
  const sc = esc(d.displayCity)
  const sd = d.preferredDate ? esc(String(d.preferredDate)) : '–'
  const sct = esc(d.craneType)
  const sdesc = d.projectDescription ? esc(d.projectDescription).replace(/\n/g, '<br>') : ''
  const head = `Kundenanfrage: ${[sct, sc, sd !== '–' ? sd : null].filter(Boolean).join(' · ')}`

  const descb = sdesc
    ? `<p style="margin:16px 0;padding:12px;background:#f9fafb;border-radius:6px;font-size:14px;line-height:1.5;"><strong>Projektbeschreibung:</strong><br>${sdesc}</p>`
    : ''
  const pr = sp !== '–' ? `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Telefon</td><td>${sp}</td></tr>` : ''
  const dr = sd !== '–' ? `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Wunschtermin</td><td>${sd}</td></tr>` : ''
  const durR = d.durationDays
    ? `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Mietdauer</td><td>${d.durationDays} ${d.durationDays === 1 ? 'Tag' : 'Tage'}</td></tr>`
    : ''
  // UWG §5: phone-stamp only when a phone number is present.
  const phoneStamp = sp !== '–' ? '<span style="color:#059669;">&#10003;</span> Telefonnummer geprüft (libphonenumber) &nbsp;&middot;&nbsp;' : ''
  const sam = d.otherCount > 0
    ? `<p style="margin:12px 0;font-size:14px;color:#374151;line-height:1.55;"><strong>Diese Anfrage wurde an ${d.otherCount} weitere Anbieter im Raum ${sc} gesendet.</strong> Wer zuerst reagiert, hinterlässt den besten Eindruck.</p>`
    : ''
  const al = d.anbieterCount > 0
    ? `Über ${d.anbieterCount} geprüfte Kranfirmen aus 16 deutschen und 9 österreichischen Bundesländern sind bereits gelistet.`
    : 'Geprüfte Kranfirmen aus 16 deutschen und 9 österreichischen Bundesländern sind bereits gelistet.'

  return `
            <div style="font-family:system-ui;max-width:560px;">
              <h2 style="font-size:18px;color:#1a1a1a;">${head}</h2>
              <p style="color:#4b5563;font-size:14px;line-height:1.6;margin:0 0 6px 0;">Sehr geehrtes Team von <strong>${esc(firmName)}</strong>,</p>
              <p style="color:#4b5563;font-size:14px;line-height:1.6;">ein Kunde sucht über ${BRAND_NAME} ein Angebot für sein Projekt:</p>
              ${descb}
              <table style="border-collapse:collapse;font-size:14px;margin:16px 0;width:100%;">
                <tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Krantyp</td><td><strong>${sct}</strong></td></tr>
                <tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Name</td><td><strong>${sn}</strong></td></tr>
                <tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">E-Mail</td><td><a href="mailto:${se}">${se}</a></td></tr>
                ${pr}
                <tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Einsatzort</td><td>${sc}</td></tr>
                ${dr}${durR}
              </table>
              <p style="margin:8px 0 16px 0;padding:8px 0;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;font-size:12px;color:#4b5563;line-height:1.5;">
                <span style="color:#059669;">&#10003;</span> E-Mail-Adresse geprüft (Format + Domain-Check) &nbsp;&middot;&nbsp;
                ${phoneStamp}
                <span style="color:#059669;">&#10003;</span> DSGVO-konforme Einwilligung dokumentiert
              </p>
              <p style="font-size:14px;color:#4b5563;">Bitte antworten Sie direkt auf diese E-Mail oder kontaktieren Sie den Kunden über die oben genannten Kontaktdaten.</p>
              <p style="margin:16px 0 8px 0;font-size:14px;color:#1a1a1a;"><strong>Können Sie das Projekt übernehmen?</strong> Ein Klick reicht.</p>
              <div style="margin:0 0 16px 0;">
                <a href="${acc}" style="display:inline-block;padding:10px 16px;background:#059669;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:500;margin-right:8px;margin-bottom:6px;">&#10003; Ja, ich erstelle ein Angebot</a>
                <a href="${dec}" style="display:inline-block;padding:10px 16px;background:#6b7280;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:500;">&#10005; Nein, nicht passend</a>
              </div>
              ${sam}
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
              <p style="font-size:13px;color:#4b5563;line-height:1.6;margin:0 0 16px 0;"><strong style="color:#1a1a1a;">Über ${BRAND_NAME}</strong><br>${BRAND_NAME} ist die fokussierte Vergleichsplattform für Kranverleih in Deutschland und Österreich. Jede Anfrage prüfen wir manuell, bevor sie an Sie geht. Keine Bots, keine Massenmails. ${al}</p>
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
              <p style="font-size:14px;color:#374151;line-height:1.55;margin:0;">Mit freundlichen Grüßen<br><strong>${esc(FOUNDER_NAME)}</strong><br>Gründer, ${BRAND_NAME}<br><a href="mailto:${esc(FOUNDER_EMAIL)}" style="color:#2563eb;">${esc(FOUNDER_EMAIL)}</a></p>
              <p style="font-size:11px;color:#9ca3af;margin:16px 0 0 0;">Referenz: ${d.leadId}<br>Bei Rückfragen zu dieser Anfrage bitte diese Referenz angeben.</p>
            </div>`
}

export async function sendFirmLeadEmail(
  to: string,
  subject: string,
  html: string,
  replyTo: string | null,
): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY
  if (!key) return { ok: false, error: 'resend_unconfigured' }
  const resend = new Resend(key)
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    ...(replyTo ? { replyTo } : {}),
    subject,
    html,
  })
  if (error) return { ok: false, error: String((error as { message?: string }).message ?? error) }
  return { ok: true }
}
