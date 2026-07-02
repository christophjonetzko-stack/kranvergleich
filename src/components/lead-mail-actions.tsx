'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

type FirmLite = { companyId: string; name: string }

type TemplateKey = 'geduld' | 'reroute' | 'keine'

function buildTemplate(
  key: TemplateKey,
  craneType: string,
  city: string | null,
  acceptedCount: number,
): { subject: string; body: string } {
  const loc = [craneType, city].filter(Boolean).join(', ')
  const sig = '\n\nHerzliche Grüße\nChristoph Jonetzko\nKranVergleich.de'
  if (key === 'reroute') {
    return {
      subject: 'Ihre Krananfrage über KranVergleich.de - weitere Anbieter angefragt',
      body:
        `Guten Tag,\n\nzu Ihrer Anfrage über KranVergleich.de (${loc}): Wir haben weitere passende Kranbetriebe in Ihrer Nähe angeschrieben, damit Sie schnell ein Angebot erhalten.\n\nFalls sich in den nächsten Tagen niemand meldet, sagen Sie mir kurz Bescheid.` +
        sig,
    }
  }
  if (key === 'keine') {
    return {
      subject: 'Ihre Krananfrage über KranVergleich.de',
      body:
        `Guten Tag,\n\nzu Ihrer Anfrage über KranVergleich.de (${loc}): Leider konnten wir aktuell keinen passenden Anbieter für Ihr Projekt finden. Das tut mir leid.\n\nFalls sich Ihr Termin oder die Anforderungen ändern, melden Sie sich gern erneut.` +
        sig,
    }
  }
  const zusage =
    acceptedCount > 0
      ? `${acceptedCount} Betrieb(e) haben zugesagt, Ihnen ein Angebot zu erstellen.`
      : 'wir haben passende Betriebe für Sie angeschrieben.'
  return {
    subject: 'Ihre Krananfrage über KranVergleich.de - kurzes Update',
    body:
      `Guten Tag,\n\nkurzes Update zu Ihrer Anfrage über KranVergleich.de (${loc}): ${zusage}\n\nGerade in der Hochsaison dauert die Kalkulation manchmal ein paar Tage. Bitte gedulden Sie sich noch einige Tage. Sollte Sie bis dahin kein Angebot erreicht haben, melden Sie sich einfach kurz bei mir.` +
      sig,
  }
}

export function LeadMailActions({
  leadId,
  customerEmail,
  craneType,
  city,
  acceptedFirms,
  acceptedCount,
}: {
  leadId: string
  customerEmail: string | null
  craneType: string
  city: string | null
  acceptedFirms: FirmLite[]
  acceptedCount: number
}) {
  const router = useRouter()
  const [mode, setMode] = useState<null | 'nachfassen' | 'mail'>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [firmId, setFirmId] = useState<string>(acceptedFirms[0]?.companyId ?? '')
  // Set after the server rejects with already_sent; the next click re-sends with force.
  const [forceResend, setForceResend] = useState(false)

  const initial = useMemo(() => buildTemplate('geduld', craneType, city, acceptedCount), [craneType, city, acceptedCount])
  const [tpl, setTpl] = useState<TemplateKey>('geduld')
  const [subject, setSubject] = useState(initial.subject)
  const [body, setBody] = useState(initial.body)

  function pickTemplate(k: TemplateKey) {
    setTpl(k)
    const t = buildTemplate(k, craneType, city, acceptedCount)
    setSubject(t.subject)
    setBody(t.body)
  }

  async function post(payload: Record<string, unknown>, confirmMsg: string) {
    if (loading) return
    if (!window.confirm(confirmMsg)) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/lead-action', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setMode(null)
        setForceResend(false)
        router.refresh()
        return
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (data.error === 'already_sent') {
        setForceResend(true)
        setError('Diese Firma wurde laut Verlauf schon nachgefasst. Erneut „Senden" klicken, um trotzdem zu senden.')
      } else {
        setError(data.error ?? 'Fehler')
      }
    } catch {
      setError('Netzwerkfehler')
    } finally {
      setLoading(false)
    }
  }

  function sendNachfassen() {
    if (!firmId) {
      setError('Bitte Firma wählen')
      return
    }
    const name = acceptedFirms.find((f) => f.companyId === firmId)?.name ?? firmId
    post(
      { action: 'nachfassen', leadId, firmId, ...(forceResend ? { force: true } : {}) },
      forceResend ? `Wirklich ERNEUT an „${name}" nachfassen?` : `Nachfass-Mail an „${name}" senden?`,
    )
  }

  function sendMail() {
    if (!subject.trim() || !body.trim()) {
      setError('Betreff und Text dürfen nicht leer sein')
      return
    }
    post({ action: 'customer_mail', leadId, subject, body }, `Mail an den Kunden senden?`)
  }

  const btn = 'inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-[13px] font-semibold disabled:opacity-60'

  return (
    <div className="mt-3 border-t border-gray-100 pt-3">
      <div className="flex flex-wrap items-center gap-2">
        {acceptedFirms.length > 0 && (
          <button type="button" onClick={() => { setMode(mode === 'nachfassen' ? null : 'nachfassen'); setError(null) }} className={`${btn} bg-amber-500 text-white hover:bg-amber-600`}>
            Firma nachfassen
          </button>
        )}
        {customerEmail && (
          <button type="button" onClick={() => { setMode(mode === 'mail' ? null : 'mail'); setError(null) }} className={`${btn} bg-emerald-600 text-white hover:bg-emerald-700`}>
            Mail an Kunden
          </button>
        )}
        {acceptedFirms.length === 0 && !customerEmail && (
          <span className="text-[12px] text-gray-400">Keine Mail-Aktion möglich (keine Zusage, keine Kunden-Mail).</span>
        )}
      </div>

      {mode === 'nachfassen' && (
        <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50/50 p-3">
          <label className="mb-1 block text-[12px] font-medium text-gray-600">Firma (nur Zusagen) erinnern, den Kunden zu kontaktieren</label>
          <select value={firmId} onChange={(e) => { setFirmId(e.target.value); setForceResend(false); setError(null) }} className="w-full rounded-lg border px-3 py-2 text-[14px]">
            {acceptedFirms.map((f) => <option key={f.companyId} value={f.companyId}>{f.name}</option>)}
          </select>
          <button type="button" onClick={sendNachfassen} disabled={loading} className={`${btn} mt-3 bg-amber-500 text-white hover:bg-amber-600`}>
            {loading ? '…' : 'Nachfass-Mail senden'}
          </button>
        </div>
      )}

      {mode === 'mail' && (
        <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50/40 p-3">
          <div className="mb-2 flex flex-wrap gap-2">
            {(['geduld', 'reroute', 'keine'] as TemplateKey[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => pickTemplate(k)}
                className={`rounded-full px-3 py-1 text-[12px] font-medium ${tpl === k ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {k === 'geduld' ? 'Geduld' : k === 'reroute' ? 'Reroute' : 'keine Anbieter'}
              </button>
            ))}
          </div>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={200} className="mb-2 w-full rounded-lg border px-3 py-2 text-[14px]" placeholder="Betreff" />
          <textarea value={body} onChange={(e) => setBody(e.target.value)} maxLength={5000} rows={9} className="w-full rounded-lg border px-3 py-2 text-[13px] leading-relaxed" />
          <p className="mt-1 text-[12px] text-gray-400">An: {customerEmail} · vor dem Senden frei editierbar.</p>
          <button type="button" onClick={sendMail} disabled={loading} className={`${btn} mt-2 bg-emerald-600 text-white hover:bg-emerald-700`}>
            {loading ? '…' : 'Mail senden'}
          </button>
        </div>
      )}

      {error && <p className="mt-2 text-[13px] text-red-600">{error}</p>}
    </div>
  )
}
