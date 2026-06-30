import { NextRequest } from 'next/server'
import { getServiceSupabase } from '@/lib/supabase'
import { statusPage } from '@/lib/report-subscribe'

/**
 * Widerruf / unsubscribe (GET, token in query) — DSGVO Art. 7(3).
 * One click, no login. Flips the subscriber to `unsubscribed`. Idempotent.
 * The unsubscribe link is included in every future report mail.
 */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token') || ''
  if (token.length < 16) {
    return statusPage('Link ungültig', 'Link ungültig', 'Bitte verwenden Sie den Abmeldelink aus einer unserer E-Mails.', 400)
  }

  const sb = getServiceSupabase()
  const { data: row } = await sb
    .from('report_subscribers')
    .select('id, status')
    .eq('unsubscribe_token', token)
    .maybeSingle()

  if (!row) {
    return statusPage('Link ungültig', 'Link ungültig', 'Dieser Abmeldelink ist nicht gültig.', 404)
  }
  if (row.status === 'unsubscribed') {
    return statusPage('Abgemeldet', 'Sie sind bereits abgemeldet', 'Sie erhalten keine weiteren E-Mails zum Nachfrage-Report.')
  }

  await sb
    .from('report_subscribers')
    .update({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString() })
    .eq('id', row.id)

  return statusPage(
    'Abgemeldet',
    'Sie wurden abgemeldet',
    'Sie erhalten keine weiteren E-Mails zum Nachfrage-Report. Bei Bedarf können Sie sich jederzeit wieder anmelden.',
  )
}
