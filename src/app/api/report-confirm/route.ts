import { NextRequest } from 'next/server'
import { getServiceSupabase } from '@/lib/supabase'
import { getClientIp, statusPage } from '@/lib/report-subscribe'

/**
 * Double-opt-in confirmation landing (GET, token in query).
 * Flips the subscriber from `pending` to `confirmed` and records the consent
 * timestamp + IP (Art. 7(1) Nachweispflicht). Idempotent and safe to re-open.
 */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token') || ''
  if (token.length < 16) {
    return statusPage(
      'Link ungültig',
      'Link ungültig',
      'Bitte öffnen Sie den Bestätigungslink erneut aus Ihrer E-Mail.',
      400,
    )
  }

  const sb = getServiceSupabase()
  const { data: row } = await sb
    .from('report_subscribers')
    .select('id, status')
    .eq('confirm_token', token)
    .maybeSingle()

  if (!row) {
    return statusPage(
      'Link ungültig',
      'Link ungültig oder abgelaufen',
      'Bitte melden Sie sich bei Bedarf erneut an.',
      404,
    )
  }
  if (row.status === 'confirmed') {
    return statusPage(
      'Bereits bestätigt',
      'Ihre Anmeldung ist bereits bestätigt',
      'Sie erhalten die nächste Ausgabe des Nachfrage-Reports automatisch.',
    )
  }
  if (row.status === 'unsubscribed') {
    return statusPage(
      'Abgemeldet',
      'Dieser Zugang wurde abgemeldet',
      'Bitte melden Sie sich bei Bedarf erneut an.',
    )
  }

  await sb
    .from('report_subscribers')
    .update({ status: 'confirmed', confirmed_at: new Date().toISOString(), consent_ip: getClientIp(req) })
    .eq('id', row.id)
    .eq('status', 'pending')

  return statusPage(
    'Anmeldung bestätigt',
    'Vielen Dank, Ihre Anmeldung ist bestätigt.',
    'Sie erhalten die nächste Ausgabe des Nachfrage-Reports, inklusive der regionalen Auswertung für Ihre Stadt. Kein Verkauf, keine Werbung.',
  )
}
