import { verifyLeadResponseSig } from '@/lib/lead-response-sig'
import { getServiceSupabase } from '@/lib/supabase'
import { BRAND_NAME } from '@/lib/country'

/**
 * Confirmation page rendered after the firm clicks accept or decline. Read
 * `?action&lead&supplier&sig` from the redirect that /api/lead-response/...
 * issues. Sig is re-verified here so a bookmarked thanks URL can't be
 * abused to scrape customer contact data; failed sig = generic message.
 *
 * Three variants:
 *   action=accept     confirmation + customer contact for the firm to use
 *   action=decline    reason form (4 preset + Sonstiges) that POSTs to
 *                      /api/lead-response/decline-reason
 *   done=1            final thanks after reason submitted
 *
 * dynamic='force-dynamic' because the page renders per-request based on
 * URL params; ISR would cache the first visitor's content for everyone.
 */
export const dynamic = 'force-dynamic'

type SearchParams = { [key: string]: string | string[] | undefined }

function getStr(sp: SearchParams, key: string): string {
  const v = sp[key]
  return Array.isArray(v) ? v[0] || '' : v || ''
}

type LeadInfo = {
  customer_name: string | null
  customer_email: string | null
  customer_phone: string | null
  city: string | null
}

export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const sp = await searchParams

  // Final state after decline reason was submitted
  if (getStr(sp, 'done') === '1') {
    return (
      <div style={{ maxWidth: 560, margin: '60px auto', padding: 24, fontFamily: 'system-ui' }}>
        <h1 style={{ fontSize: 22, color: '#111', marginBottom: 16 }}>Danke für Ihre Rückmeldung</h1>
        <p style={{ color: '#4b5563', lineHeight: 1.6 }}>
          Wir berücksichtigen Ihren Hinweis bei der zukünftigen Lead-Verteilung. Sie können dieses Fenster schließen.
        </p>
        <p style={{ marginTop: 40, fontSize: 12, color: '#9ca3af' }}>
          {BRAND_NAME}
        </p>
      </div>
    )
  }

  const action = getStr(sp, 'action')
  const leadId = getStr(sp, 'lead')
  const supplierId = getStr(sp, 'supplier')
  const sig = getStr(sp, 'sig')

  if (action !== 'accept' && action !== 'decline') {
    return (
      <div style={{ maxWidth: 560, margin: '60px auto', padding: 24, fontFamily: 'system-ui' }}>
        <h1 style={{ fontSize: 22, color: '#111' }}>Ungültige Anfrage</h1>
        <p style={{ color: '#4b5563', lineHeight: 1.6 }}>Dieser Link kann nicht verarbeitet werden.</p>
      </div>
    )
  }

  if (!verifyLeadResponseSig(leadId, supplierId, action, sig)) {
    return (
      <div style={{ maxWidth: 560, margin: '60px auto', padding: 24, fontFamily: 'system-ui' }}>
        <h1 style={{ fontSize: 22, color: '#111' }}>Ungültiger Link</h1>
        <p style={{ color: '#4b5563', lineHeight: 1.6 }}>
          Der Link konnte nicht verifiziert werden. Bitte verwenden Sie den Original-Link aus der Anfrage-E-Mail.
        </p>
      </div>
    )
  }

  // Look up customer + company for the accept-variant personalisation.
  // RLS denies anon; this page uses the service-role client (server-side).
  const sb = getServiceSupabase()
  const { data } = await sb
    .from('lead_companies')
    .select('companies(name), leads(customer_name, customer_email, customer_phone, city)')
    .eq('lead_id', leadId)
    .eq('company_id', supplierId)
    .maybeSingle()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customer: LeadInfo = (data as any)?.leads || { customer_name: null, customer_email: null, customer_phone: null, city: null }

  if (action === 'accept') {
    return (
      <div style={{ maxWidth: 560, margin: '60px auto', padding: 24, fontFamily: 'system-ui' }}>
        <h1 style={{ fontSize: 22, color: '#111', marginBottom: 16 }}>Vielen Dank!</h1>
        <p style={{ color: '#4b5563', lineHeight: 1.6 }}>
          Wir haben Ihre Annahme registriert. Bitte melden Sie sich bei{' '}
          <strong>{customer.customer_name || 'dem Kunden'}</strong>{' '}
          innerhalb von 24 Stunden direkt per E-Mail oder Telefon.
        </p>
        <div style={{ marginTop: 24, padding: 16, background: '#f9fafb', borderRadius: 8, fontSize: 14, lineHeight: 1.6 }}>
          <strong style={{ color: '#111' }}>Kontaktdaten:</strong><br />
          {customer.customer_email && (
            <>
              E-Mail:{' '}
              <a href={`mailto:${customer.customer_email}`} style={{ color: '#2563eb' }}>
                {customer.customer_email}
              </a>
              <br />
            </>
          )}
          {customer.customer_phone && (
            <>
              Telefon: {customer.customer_phone}
              <br />
            </>
          )}
          {customer.city && <>Stadt: {customer.city}</>}
        </div>
        <p style={{ marginTop: 40, fontSize: 12, color: '#9ca3af' }}>
          {BRAND_NAME} · Signal-Back vom {new Date().toLocaleDateString('de-DE')}
        </p>
      </div>
    )
  }

  // Decline reason form
  const reasonOptions: Array<[string, string]> = [
    ['kapazitaet', 'Keine Kapazität / momentan ausgelastet'],
    ['region', 'Region außerhalb unseres Servicegebiets'],
    ['krantyp', 'Krantyp passt nicht zu unserem Fuhrpark'],
    ['budget', 'Budget nicht passend'],
    ['sonstiges', 'Sonstiges (bitte Textfeld nutzen)'],
  ]

  return (
    <div style={{ maxWidth: 560, margin: '60px auto', padding: 24, fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: 22, color: '#111', marginBottom: 16 }}>Schade, dass es nicht passt</h1>
      <p style={{ color: '#4b5563', lineHeight: 1.6 }}>
        Eine kurze Rückmeldung warum hilft uns, das Lead-Routing zu verbessern. Optional. Sie können das Fenster auch einfach schließen.
      </p>
      <form method="POST" action="/api/lead-response/decline-reason" style={{ marginTop: 24 }}>
        <input type="hidden" name="lead" value={leadId} />
        <input type="hidden" name="supplier" value={supplierId} />
        <input type="hidden" name="sig" value={sig} />
        {reasonOptions.map(([code, label]) => (
          <label
            key={code}
            style={{ display: 'block', padding: '8px 0', cursor: 'pointer', color: '#374151', fontSize: 14 }}
          >
            <input type="radio" name="reason" value={code} required style={{ marginRight: 10 }} />
            {label}
          </label>
        ))}
        <textarea
          name="reason_text"
          maxLength={500}
          rows={3}
          placeholder="Optionale Anmerkung (nur bei Sonstiges nötig)"
          style={{
            width: '100%',
            padding: 8,
            marginTop: 12,
            fontSize: 14,
            fontFamily: 'inherit',
            border: '1px solid #d1d5db',
            borderRadius: 4,
            boxSizing: 'border-box',
          }}
        />
        <button
          type="submit"
          style={{
            marginTop: 16,
            padding: '10px 18px',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            fontSize: 14,
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Rückmeldung senden
        </button>
      </form>
      <p style={{ marginTop: 40, fontSize: 12, color: '#9ca3af' }}>
        {BRAND_NAME}
      </p>
    </div>
  )
}
