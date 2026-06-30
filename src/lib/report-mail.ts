import { Resend } from 'resend'
import { BASE_URL, BRAND_NAME } from '@/lib/country'

/**
 * Double-opt-in confirmation mail for the Nachfrage-Report subscription.
 *
 * BGH "Double-Opt-in" rule: this mail MUST stay a neutral confirmation request.
 * No report content, no figures, no advertising — otherwise the confirmation
 * mail itself counts as unsolicited advertising. Keep it minimal.
 */

const FROM_EMAIL = `${BRAND_NAME} Nachfrage-Report <christoph@send.kranvergleich.de>`

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export async function sendReportConfirmEmail(
  to: string,
  confirmToken: string,
): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY
  if (!key) return { ok: false, error: 'resend_unconfigured' }

  const confirmUrl = `${BASE_URL}/api/report-confirm?token=${encodeURIComponent(confirmToken)}`
  const html = `
    <div style="font-family:system-ui;max-width:520px;color:#111;line-height:1.6;">
      <p style="font-size:15px;color:#1a1a1a;">Guten Tag,</p>
      <p style="font-size:14px;color:#4b5563;">vielen Dank für Ihr Interesse am Nachfrage-Report von ${esc(BRAND_NAME)}. Bitte bestätigen Sie mit einem Klick, dass Sie die nächste Ausgabe erhalten möchten:</p>
      <div style="margin:24px 0;">
        <a href="${confirmUrl}" style="display:inline-block;padding:12px 20px;background:#2563eb;color:#ffffff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:500;">Anmeldung bestätigen</a>
      </div>
      <p style="font-size:13px;color:#6b7280;">Falls der Button nicht funktioniert, kopieren Sie diesen Link in Ihren Browser:<br><span style="word-break:break-all;color:#2563eb;">${confirmUrl}</span></p>
      <p style="font-size:13px;color:#6b7280;">Wenn Sie sich nicht angemeldet haben, ignorieren Sie diese E-Mail einfach. Ohne Ihre Bestätigung speichern wir nichts dauerhaft und senden Ihnen nichts zu.</p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
      <p style="font-size:11px;color:#9ca3af;">${esc(BRAND_NAME)} &middot; Christoph Jonetzko &middot; <a href="${BASE_URL}/impressum" style="color:#9ca3af;">Impressum</a> &middot; <a href="${BASE_URL}/datenschutz" style="color:#9ca3af;">Datenschutz</a></p>
    </div>`

  const resend = new Resend(key)
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: 'Bitte bestätigen Sie Ihre Anmeldung zum Nachfrage-Report',
    html,
  })
  if (error) return { ok: false, error: String((error as { message?: string }).message ?? error) }
  return { ok: true }
}
