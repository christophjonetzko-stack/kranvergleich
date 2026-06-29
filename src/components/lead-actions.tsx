'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

type FirmLite = { companyId: string; name: string; response: 'accept' | 'decline' | null }

const LOST_REASONS = [
  'kein Angebot erhalten',
  'Kunde abgesprungen',
  'Duplikat',
  'Termin nicht machbar',
  'Preis zu hoch',
  'Sonstiges',
] as const

export function LeadActions({
  leadId,
  status,
  firms,
}: {
  leadId: string
  status: string
  firms: FirmLite[]
}) {
  const router = useRouter()
  const [mode, setMode] = useState<null | 'won' | 'lost'>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const accepted = useMemo(() => firms.filter((f) => f.response === 'accept'), [firms])
  const [showAll, setShowAll] = useState(false)
  const winnerOptions = showAll || accepted.length === 0 ? firms : accepted
  const [winnerId, setWinnerId] = useState<string>(winnerOptions[0]?.companyId ?? '')

  const [reasonPreset, setReasonPreset] = useState<string>(LOST_REASONS[0])
  const [reasonText, setReasonText] = useState('')

  async function submit(payload: Record<string, unknown>, confirmMsg: string) {
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
        router.refresh()
        return
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      setError(data.error ?? 'Fehler')
    } catch {
      setError('Netzwerkfehler')
    } finally {
      setLoading(false)
    }
  }

  function submitWon() {
    if (!winnerId) {
      setError('Bitte Gewinner wählen')
      return
    }
    const name = winnerOptions.find((f) => f.companyId === winnerId)?.name ?? winnerId
    submit({ action: 'won', leadId, winnerId }, `Lead als WON markieren mit „${name}"?`)
  }

  function submitLost() {
    const reason = reasonPreset === 'Sonstiges' ? reasonText.trim() : reasonPreset
    if (!reason) {
      setError('Bitte Grund angeben')
      return
    }
    submit({ action: 'lost', leadId, reason }, `Lead als LOST markieren (${reason})?`)
  }

  const btn = 'inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-[13px] font-semibold disabled:opacity-60'

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => { setMode(mode === 'won' ? null : 'won'); setError(null) }} className={`${btn} bg-blue-600 text-white hover:bg-blue-700`}>
          Als WON markieren
        </button>
        <button type="button" onClick={() => { setMode(mode === 'lost' ? null : 'lost'); setError(null) }} className={`${btn} bg-gray-600 text-white hover:bg-gray-700`}>
          Als LOST markieren
        </button>
        {(status === 'won' || status === 'lost') && (
          <span className="text-[12px] text-gray-400">aktuell: {status} — neu setzen überschreibt</span>
        )}
      </div>

      {mode === 'won' && (
        <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50/50 p-3">
          <label className="mb-1 block text-[12px] font-medium text-gray-600">Gewinner wählen</label>
          <select value={winnerId} onChange={(e) => setWinnerId(e.target.value)} className="w-full rounded-lg border px-3 py-2 text-[14px]">
            {winnerOptions.length === 0 && <option value="">(keine Firma)</option>}
            {winnerOptions.map((f) => (
              <option key={f.companyId} value={f.companyId}>
                {f.name}{f.response === 'accept' ? ' ✓ Zusage' : f.response === 'decline' ? ' ✕ Absage' : ' ⏳ offen'}
              </option>
            ))}
          </select>
          {accepted.length > 0 && (
            <label className="mt-2 flex items-center gap-2 text-[12px] text-gray-500">
              <input type="checkbox" checked={showAll} onChange={(e) => { setShowAll(e.target.checked); setWinnerId('') }} />
              alle angeschriebenen Firmen anzeigen (nicht nur Zusagen)
            </label>
          )}
          <button type="button" onClick={submitWon} disabled={loading} className={`${btn} mt-3 bg-blue-600 text-white hover:bg-blue-700`}>
            {loading ? '…' : 'WON speichern'}
          </button>
        </div>
      )}

      {mode === 'lost' && (
        <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
          <label className="mb-1 block text-[12px] font-medium text-gray-600">Grund</label>
          <select value={reasonPreset} onChange={(e) => setReasonPreset(e.target.value)} className="w-full rounded-lg border px-3 py-2 text-[14px]">
            {LOST_REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          {reasonPreset === 'Sonstiges' && (
            <input
              type="text"
              value={reasonText}
              onChange={(e) => setReasonText(e.target.value)}
              placeholder="Grund eingeben…"
              maxLength={200}
              className="mt-2 w-full rounded-lg border px-3 py-2 text-[14px]"
            />
          )}
          <button type="button" onClick={submitLost} disabled={loading} className={`${btn} mt-3 bg-gray-700 text-white hover:bg-gray-800`}>
            {loading ? '…' : 'LOST speichern'}
          </button>
        </div>
      )}

      {error && <p className="mt-2 text-[13px] text-red-600">{error}</p>}
    </div>
  )
}
