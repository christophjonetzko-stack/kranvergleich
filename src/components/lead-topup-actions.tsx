'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Candidate = { companyId: string; name: string; email: string; distanceKm: number; nationalHeavy?: boolean }

export function LeadTopupActions({
  leadId,
  candidates,
  optinRequired,
}: {
  leadId: string
  candidates: Candidate[]
  optinRequired: boolean
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // Pre-check the nearest 6 local candidates (fanout sweet spot); injected
  // national-heavy firms start unchecked — the human opts them in.
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(candidates.filter((c) => !c.nationalHeavy).slice(0, 6).map((c) => c.companyId)),
  )

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function dispatch() {
    const firmIds = [...selected]
    if (firmIds.length === 0) {
      setError('Bitte mindestens eine Firma wählen')
      return
    }
    if (!window.confirm(`Top-up: Anfrage an ${firmIds.length} weitere Firma(en) senden?`)) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/lead-action', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'topup', leadId, firmIds }),
      })
      if (res.ok) {
        setOpen(false)
        router.refresh()
        return
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      setError(data.error === 'optin_required' ? 'Opt-in erforderlich (manuelle Firmenwahl)' : data.error ?? 'Fehler')
    } catch {
      setError('Netzwerkfehler')
    } finally {
      setLoading(false)
    }
  }

  if (optinRequired) {
    return (
      <div className="mt-3 border-t border-gray-100 pt-3">
        <p className="text-[12px] text-gray-400">
          Top-up gesperrt: Lead aus manueller Firmenwahl (/anbieter) — Weiterleitung an weitere Firmen bräuchte Kunden-Opt-in (DSGVO §4).
        </p>
      </div>
    )
  }

  const btn = 'inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-[13px] font-semibold disabled:opacity-60'

  return (
    <div className="mt-3 border-t border-gray-100 pt-3">
      <button
        type="button"
        onClick={() => { setOpen(!open); setError(null) }}
        disabled={candidates.length === 0}
        className={`${btn} bg-indigo-600 text-white hover:bg-indigo-700`}
      >
        Top-up dispatch{candidates.length > 0 ? ` (${candidates.length} verfügbar)` : ' (keine in Reichweite)'}
      </button>

      {open && candidates.length > 0 && (
        <div className="mt-3 rounded-lg border border-indigo-200 bg-indigo-50/40 p-3">
          <p className="mb-2 text-[12px] text-gray-500">Weitere Kranbetriebe im Umkreis (gleicher Typ, noch nicht angeschrieben). Auswahl prüfen:</p>
          <div className="max-h-72 space-y-1 overflow-y-auto">
            {candidates.map((c) => (
              <label key={c.companyId} className="flex items-center gap-2 rounded px-1 py-1 text-[13px] hover:bg-white">
                <input type="checkbox" checked={selected.has(c.companyId)} onChange={() => toggle(c.companyId)} />
                <span className="w-12 shrink-0 text-gray-400">{c.distanceKm}km</span>
                <span className="flex-1">
                  {c.name}
                  {c.nationalHeavy ? <span className="ml-1 rounded bg-indigo-100 px-1 text-[11px] text-indigo-700">bundesweit</span> : null}
                </span>
                <span className="text-[12px] text-gray-400">{c.email}</span>
              </label>
            ))}
          </div>
          <button type="button" onClick={dispatch} disabled={loading} className={`${btn} mt-3 bg-indigo-600 text-white hover:bg-indigo-700`}>
            {loading ? '…' : `An ${selected.size} Firma(en) senden`}
          </button>
        </div>
      )}

      {error && <p className="mt-2 text-[13px] text-red-600">{error}</p>}
    </div>
  )
}
