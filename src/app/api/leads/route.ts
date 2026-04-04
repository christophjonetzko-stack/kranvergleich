import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { submitLead } from '@/lib/queries'

const resend = new Resend(process.env.RESEND_API_KEY)

const NOTIFICATION_EMAIL = 'anfragen@send.kranvergleich.de'
const FROM_EMAIL = 'KranVergleich <anfragen@send.kranvergleich.de>'

export async function POST(request: Request) {
  try {
    const body = await request.json()

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

    const lead = await submitLead({
      crane_type_id: body.crane_type_id || null,
      city: body.city || '',
      customer_name: body.customer_name || '',
      customer_phone: body.customer_phone || '',
      customer_email: body.customer_email,
      project_description: body.project_description || '',
      preferred_date: body.preferred_date || null,
      duration_days: body.duration_days || null,
      dsgvo_consent: body.dsgvo_consent,
      company_ids: body.company_ids || [],
    })

    // Send notification email to owner
    const companyCount = body.company_ids?.length || 0
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject: `Neue Anfrage: ${body.customer_name || 'Unbekannt'} — ${body.city || 'Keine Stadt'}`,
      html: `
        <h2>Neue Kranvermietungs-Anfrage</h2>
        <table style="border-collapse:collapse;font-family:system-ui;font-size:14px;">
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280;">Name</td><td><strong>${body.customer_name || '–'}</strong></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280;">E-Mail</td><td><a href="mailto:${body.customer_email}">${body.customer_email}</a></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280;">Telefon</td><td>${body.customer_phone || '–'}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280;">Stadt</td><td>${body.city || '–'}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280;">Wunschtermin</td><td>${body.preferred_date || '–'}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280;">Mietdauer</td><td>${body.duration_days ? `${body.duration_days} Tage` : '–'}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280;">Anbieter</td><td>${companyCount} ausgewählt</td></tr>
        </table>
        ${body.project_description ? `<p style="margin-top:12px;padding:12px;background:#f9fafb;border-radius:6px;font-size:14px;">${body.project_description}</p>` : ''}
        <p style="margin-top:16px;font-size:12px;color:#9ca3af;">Lead-ID: ${lead.id}</p>
      `,
    }).catch((err) => {
      console.error('Resend notification error:', err)
    })

    // Send confirmation email to customer
    await resend.emails.send({
      from: FROM_EMAIL,
      to: body.customer_email,
      subject: `Ihre Anfrage bei KranVergleich.de — ${companyCount > 0 ? `${companyCount} Anbieter kontaktiert` : 'Bestätigung'}`,
      html: `
        <div style="font-family:system-ui;max-width:520px;">
          <h2 style="font-size:18px;">Vielen Dank für Ihre Anfrage!</h2>
          <p style="color:#4b5563;font-size:14px;line-height:1.6;">
            ${body.customer_name ? `Hallo ${body.customer_name},` : 'Hallo,'}<br><br>
            ${companyCount > 0
              ? `Ihre Anfrage wurde an <strong>${companyCount} Anbieter</strong> weitergeleitet. Die Unternehmen werden sich in Kürze bei Ihnen melden.`
              : 'Wir haben Ihre Anfrage erhalten und melden uns in Kürze bei Ihnen.'}
          </p>
          <table style="border-collapse:collapse;font-size:13px;margin:16px 0;">
            ${body.city ? `<tr><td style="padding:3px 10px 3px 0;color:#6b7280;">Stadt</td><td>${body.city}</td></tr>` : ''}
            ${body.preferred_date ? `<tr><td style="padding:3px 10px 3px 0;color:#6b7280;">Wunschtermin</td><td>${body.preferred_date}</td></tr>` : ''}
            ${body.duration_days ? `<tr><td style="padding:3px 10px 3px 0;color:#6b7280;">Mietdauer</td><td>${body.duration_days} Tage</td></tr>` : ''}
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

    return NextResponse.json({ success: true, id: lead.id })
  } catch {
    return NextResponse.json(
      { error: 'Interner Serverfehler. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    )
  }
}
