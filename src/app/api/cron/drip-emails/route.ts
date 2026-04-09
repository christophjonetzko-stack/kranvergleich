import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getServiceSupabase } from '@/lib/supabase'

const FROM_EMAIL = 'KranVergleich <noreply@send.kranvergleich.de>'

// Drip email content for each step
const DRIP_EMAILS = [
  {
    // Step 0 → 1: sent after 1 day
    delayDays: 1,
    subject: '5 Tipps: So sparen Sie beim Kran mieten',
    html: `
      <div style="font-family:system-ui;max-width:520px;">
        <h2 style="font-size:18px;color:#1a1a1a;">5 Tipps: So sparen Sie beim Kran mieten</h2>

        <p style="color:#4b5563;font-size:14px;line-height:1.7;">
          Sie haben kürzlich unseren Kostenrechner genutzt — hier sind 5 Tipps,
          mit denen Sie bei der Kranmiete bares Geld sparen:
        </p>

        <ol style="color:#4b5563;font-size:14px;line-height:2;padding-left:20px;">
          <li><strong>Mehrere Angebote einholen</strong> — Preise variieren bis zu 40% zwischen Anbietern</li>
          <li><strong>Wochentarif nutzen</strong> — Ab 3 Tagen lohnt sich oft der Wochenpreis</li>
          <li><strong>Kranführer einplanen</strong> — Eigenregie ist günstiger, aber ein Profi spart Zeit und vermeidet Schäden</li>
          <li><strong>Zufahrt prüfen</strong> — Schwierige Aufstellung = Aufpreis. Klären Sie das vorher</li>
          <li><strong>Frühzeitig buchen</strong> — Kurzfristige Buchungen kosten oft 20-30% mehr</li>
        </ol>

        <a href="https://kranvergleich.de/ratgeber/kran-mieten-tipps" style="display:inline-block;background:#2563eb;color:#ffffff;font-size:14px;font-weight:500;padding:10px 20px;border-radius:8px;text-decoration:none;margin:16px 0;">
          Alle Tipps lesen →
        </a>

        <p style="font-size:11px;color:#9ca3af;margin-top:24px;">
          KranVergleich.de — <a href="https://kranvergleich.de" style="color:#2563eb;">kranvergleich.de</a><br>
          <a href="https://kranvergleich.de/datenschutz" style="color:#9ca3af;">Datenschutz</a>
        </p>
      </div>
    `,
  },
  {
    // Step 1 → 2: sent after 3 days
    delayDays: 3,
    subject: 'Welcher Kran passt zu Ihrem Projekt?',
    html: `
      <div style="font-family:system-ui;max-width:520px;">
        <h2 style="font-size:18px;color:#1a1a1a;">Welcher Kran passt zu Ihrem Projekt?</h2>

        <p style="color:#4b5563;font-size:14px;line-height:1.7;">
          Die Wahl des richtigen Krans entscheidet über Kosten und Effizienz.
          Hier ein kurzer Überblick:
        </p>

        <table style="border-collapse:collapse;font-size:14px;width:100%;margin:16px 0;">
          <tr style="background:#f0f7ff;">
            <td style="padding:8px 12px;font-weight:600;border:1px solid #bfdbfe;">Minikran</td>
            <td style="padding:8px 12px;border:1px solid #bfdbfe;">Enge Baustellen, Innenräume — ab 250€/Tag</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-weight:600;border:1px solid #e5e7eb;">Autokran</td>
            <td style="padding:8px 12px;border:1px solid #e5e7eb;">Flexibel, schneller Aufbau — ab 800€/Tag</td>
          </tr>
          <tr style="background:#f0f7ff;">
            <td style="padding:8px 12px;font-weight:600;border:1px solid #bfdbfe;">Mobilkran</td>
            <td style="padding:8px 12px;border:1px solid #bfdbfe;">Schwere Lasten, große Höhen — ab 1.200€/Tag</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-weight:600;border:1px solid #e5e7eb;">Baukran</td>
            <td style="padding:8px 12px;border:1px solid #e5e7eb;">Langzeit-Einsatz auf Baustellen — ab 3.000€/Monat</td>
          </tr>
        </table>

        <a href="https://kranvergleich.de/ratgeber/welchen-kran-brauche-ich" style="display:inline-block;background:#2563eb;color:#ffffff;font-size:14px;font-weight:500;padding:10px 20px;border-radius:8px;text-decoration:none;margin:8px 0;">
          Ausführlichen Ratgeber lesen →
        </a>

        <p style="font-size:11px;color:#9ca3af;margin-top:24px;">
          KranVergleich.de — <a href="https://kranvergleich.de" style="color:#2563eb;">kranvergleich.de</a><br>
          <a href="https://kranvergleich.de/datenschutz" style="color:#9ca3af;">Datenschutz</a>
        </p>
      </div>
    `,
  },
  {
    // Step 2 → 3: sent after 7 days
    delayDays: 7,
    subject: 'Kostenlose Angebote von Kranverleih-Firmen in Ihrer Nähe',
    html: `
      <div style="font-family:system-ui;max-width:520px;">
        <h2 style="font-size:18px;color:#1a1a1a;">Haben Sie schon Angebote verglichen?</h2>

        <p style="color:#4b5563;font-size:14px;line-height:1.7;">
          Vor einer Woche haben Sie unseren Kostenrechner genutzt. Falls Sie noch keinen
          Kran gebucht haben — jetzt ist der beste Zeitpunkt, Angebote einzuholen:
        </p>

        <div style="background:#f0f7ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin:16px 0;">
          <p style="font-size:14px;color:#1a1a1a;margin:0 0 8px;font-weight:600;">Warum über KranVergleich.de?</p>
          <ul style="margin:0;padding-left:18px;color:#4b5563;font-size:14px;line-height:1.8;">
            <li>740+ geprüfte Anbieter in 50+ Städten</li>
            <li>Echte Google-Bewertungen</li>
            <li>100% kostenlos & unverbindlich</li>
          </ul>
        </div>

        <a href="https://kranvergleich.de" style="display:inline-block;background:#2563eb;color:#ffffff;font-size:14px;font-weight:500;padding:10px 20px;border-radius:8px;text-decoration:none;margin:8px 0;">
          Jetzt Anbieter vergleichen →
        </a>

        <p style="font-size:11px;color:#9ca3af;margin-top:24px;">
          Dies ist die letzte E-Mail unserer Tipps-Serie. Sie erhalten keine weiteren automatischen E-Mails.<br>
          KranVergleich.de — <a href="https://kranvergleich.de" style="color:#2563eb;">kranvergleich.de</a><br>
          <a href="https://kranvergleich.de/datenschutz" style="color:#9ca3af;">Datenschutz</a>
        </p>
      </div>
    `,
  },
]

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const sb = getServiceSupabase()
  const resend = new Resend(process.env.RESEND_API_KEY)
  const now = new Date()
  let totalSent = 0

  for (let step = 0; step < DRIP_EMAILS.length; step++) {
    const drip = DRIP_EMAILS[step]

    // Calculate cutoff: subscriber must have signed up at least N days ago
    const cutoff = new Date(now.getTime() - drip.delayDays * 24 * 60 * 60 * 1000)

    const { data: subscribers } = await sb
      .from('newsletter_subscribers')
      .select('id, email')
      .eq('drip_step', step)
      .lte('created_at', cutoff.toISOString())
      .limit(50)

    if (!subscribers || subscribers.length === 0) continue

    for (const sub of subscribers) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: sub.email,
          subject: drip.subject,
          html: drip.html,
        })

        await sb
          .from('newsletter_subscribers')
          .update({ drip_step: step + 1 })
          .eq('id', sub.id)

        totalSent++
      } catch {
        // Skip failed sends, will retry next cron run
      }
    }
  }

  return NextResponse.json({ sent: totalSent, timestamp: now.toISOString() })
}
