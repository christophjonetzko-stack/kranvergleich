import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getServiceSupabase } from '@/lib/supabase'

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

const FROM_EMAIL = 'KranVergleich <noreply@send.kranvergleich.de>'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, craneName, reason, priceEstimate, includesOperator, slug } = body

    if (!email || !craneName) {
      return NextResponse.json({ error: 'E-Mail und Ergebnis sind erforderlich.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 })
    }

    // Save to newsletter_subscribers (upsert to handle duplicates)
    const sb = getServiceSupabase()
    await sb
      .from('newsletter_subscribers')
      .upsert({ email, source: 'kostenrechner' }, { onConflict: 'email' })

    // Send result email
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Ihr Kran-Kostenvergleich: ${craneName} — ${priceEstimate}`,
      html: `
        <div style="font-family:system-ui;max-width:520px;">
          <h2 style="font-size:18px;color:#1a1a1a;">Ihr Kran-Kostenvergleich</h2>
          <p style="color:#4b5563;font-size:14px;line-height:1.6;">
            Basierend auf Ihren Angaben empfehlen wir:
          </p>

          <div style="background:#f0f7ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin:16px 0;">
            <p style="font-size:18px;font-weight:600;color:#1a1a1a;margin:0 0 4px;">${craneName}</p>
            <p style="font-size:14px;color:#6b7280;margin:0 0 12px;">${reason}</p>

            <table style="border-collapse:collapse;font-size:14px;width:100%;">
              <tr>
                <td style="padding:6px 12px 6px 0;color:#6b7280;">Geschätzte Kosten</td>
                <td style="font-weight:600;">${priceEstimate}</td>
              </tr>
              <tr>
                <td style="padding:6px 12px 6px 0;color:#6b7280;">Kranführer</td>
                <td style="font-weight:600;">${includesOperator ? 'Inklusive' : 'Optional (separat buchbar)'}</td>
              </tr>
            </table>
          </div>

          <p style="font-size:14px;color:#4b5563;line-height:1.6;">
            Vergleichen Sie jetzt Anbieter und holen Sie kostenlose Angebote ein:
          </p>

          <a href="https://kranvergleich.de/${slug}" style="display:inline-block;background:#2563eb;color:#ffffff;font-size:14px;font-weight:500;padding:10px 20px;border-radius:8px;text-decoration:none;margin:8px 0;">
            ${craneName}-Anbieter vergleichen →
          </a>

          <p style="font-size:11px;color:#9ca3af;margin-top:24px;">
            Preise sind unverbindliche Richtwerte (netto zzgl. MwSt.), basierend auf Marktanalyse 2026.<br>
            KranVergleich.de — <a href="https://kranvergleich.de" style="color:#2563eb;">kranvergleich.de</a>
          </p>

          <p style="font-size:11px;color:#9ca3af;margin-top:12px;">
            Sie erhalten diese E-Mail, weil Sie den Kran-Kostenrechner auf KranVergleich.de genutzt haben.
            Ihre E-Mail wird nur für den Versand des Kostenvergleichs verwendet.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Interner Serverfehler. Bitte versuchen Sie es später erneut.' },
      { status: 500 },
    )
  }
}
