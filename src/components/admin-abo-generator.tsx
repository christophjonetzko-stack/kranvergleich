'use client'

import { useState } from 'react'

// Admin outbound subscription-link generator (KROK 8a). Pick a firm (search by
// name OR paste a company_id) + plan, then generate a Stripe Checkout link to send
// the firm. German UI, EN identifiers. The re-subscription guard + portal fallback
// land in 8a-2 (this UI already renders the 'blocked' branch).

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

type Plan = 'premium' | 'pro' | 'gruender'

interface FirmHit {
  id: string
  name: string
  city: string
  is_premium: boolean
  hasActiveSub: boolean
}

const PLAN_LABELS: Record<Plan, string> = {
  premium: 'Premium (49 €/Monat)',
  pro: 'Pro (149 €/Monat)',
  gruender: 'Gründerpreis (29 €/Monat)',
}

export function AdminAboGenerator() {
  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState<FirmHit[]>([])
  const [searchError, setSearchError] = useState<string | null>(null)

  const [pasteId, setPasteId] = useState('')
  const [selected, setSelected] = useState<FirmHit | null>(null)

  const [plan, setPlan] = useState<Plan>('premium')

  const [generating, setGenerating] = useState(false)
  const [link, setLink] = useState<string | null>(null)
  const [blocked, setBlocked] = useState(false)
  const [portalUrl, setPortalUrl] = useState<string | null>(null)
  const [genError, setGenError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  function resetResult() {
    setLink(null)
    setBlocked(false)
    setPortalUrl(null)
    setGenError(null)
    setCopied(false)
  }

  async function handleSearch() {
    const q = query.trim()
    if (q.length < 2 || searching) return
    setSearching(true)
    setSearchError(null)
    setResults([])
    try {
      const res = await fetch(`/api/admin/company-search?q=${encodeURIComponent(q)}`)
      if (!res.ok) {
        setSearchError(res.status === 401 ? 'Nicht angemeldet.' : 'Suche fehlgeschlagen.')
        return
      }
      const data = (await res.json()) as { results: FirmHit[] }
      setResults(data.results)
      if (data.results.length === 0) setSearchError('Keine Treffer.')
    } catch {
      setSearchError('Netzwerkfehler.')
    } finally {
      setSearching(false)
    }
  }

  function selectFirm(f: FirmHit) {
    setSelected(f)
    setResults([])
    setQuery('')
    resetResult()
  }

  function usePastedId() {
    const id = pasteId.trim()
    if (!UUID_RE.test(id)) {
      setSearchError('Ungültige company_id (UUID erwartet).')
      return
    }
    setSelected({ id, name: '(per company_id)', city: '—', is_premium: false, hasActiveSub: false })
    setPasteId('')
    setSearchError(null)
    resetResult()
  }

  async function handleGenerate() {
    if (!selected || generating) return
    setGenerating(true)
    resetResult()
    try {
      const res = await fetch('/api/admin/subscription-link', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ companyId: selected.id, plan }),
      })
      if (res.status === 409) {
        const data = (await res.json().catch(() => ({}))) as { portalUrl?: string }
        setBlocked(true)
        setPortalUrl(data.portalUrl ?? null)
        return
      }
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string; detail?: string }
      if (res.ok && data.url) {
        setLink(data.url)
        return
      }
      setGenError(data.detail ?? data.error ?? `Fehler (${res.status})`)
    } catch {
      setGenError('Netzwerkfehler.')
    } finally {
      setGenerating(false)
    }
  }

  async function copyLink() {
    if (!link) return
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked — user can select the field manually */
    }
  }

  return (
    <div className="space-y-6">
      {/* 1) Firma wählen */}
      <section className="border rounded-lg p-4">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">1. Firma</h2>

        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Nach Firmenname suchen…"
            className="flex-1 rounded-lg border px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleSearch}
            disabled={searching || query.trim().length < 2}
            className="rounded-lg bg-blue-600 px-3 py-2 text-[13px] font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {searching ? '…' : 'Suchen'}
          </button>
        </div>

        {results.length > 0 && (
          <ul className="mt-2 divide-y border rounded-lg">
            {results.map((f) => (
              <li key={f.id}>
                <button
                  type="button"
                  onClick={() => selectFirm(f)}
                  className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-[13px] hover:bg-gray-50"
                >
                  <span className="min-w-0 truncate">
                    {f.name} <span className="text-gray-400">· {f.city}</span>
                  </span>
                  <span className="flex shrink-0 gap-1">
                    {f.is_premium && <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[11px] text-blue-700">Premium</span>}
                    {f.hasActiveSub && <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[11px] text-amber-700">Abo aktiv</span>}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-3 flex gap-2">
          <input
            value={pasteId}
            onChange={(e) => setPasteId(e.target.value)}
            placeholder="oder company_id (UUID) einfügen"
            className="flex-1 rounded-lg border px-3 py-2 font-mono text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={usePastedId}
            disabled={!pasteId.trim()}
            className="rounded-lg border px-3 py-2 text-[13px] font-medium text-gray-700 hover:border-gray-400 disabled:opacity-60"
          >
            Übernehmen
          </button>
        </div>

        {searchError && <p className="mt-2 text-[12px] text-red-600">{searchError}</p>}

        {selected && (
          <div className="mt-3 flex items-center justify-between gap-2 rounded-lg bg-gray-50 px-3 py-2">
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-gray-900">
                {selected.name} <span className="font-normal text-gray-400">· {selected.city}</span>
              </p>
              <p className="font-mono text-[11px] text-gray-400">{selected.id}</p>
            </div>
            {selected.hasActiveSub && (
              <span className="shrink-0 rounded bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                ⚠ Abo aktiv
              </span>
            )}
          </div>
        )}
      </section>

      {/* 2) Plan wählen */}
      <section className="border rounded-lg p-4">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">2. Plan</h2>
        <div className="flex flex-col gap-2">
          {(Object.keys(PLAN_LABELS) as Plan[]).map((p) => (
            <label key={p} className="flex items-center gap-2 text-[14px] text-gray-800">
              <input
                type="radio"
                name="plan"
                value={p}
                checked={plan === p}
                onChange={() => {
                  setPlan(p)
                  resetResult()
                }}
              />
              {PLAN_LABELS[p]}
            </label>
          ))}
        </div>
      </section>

      {/* 3) Generieren */}
      <button
        type="button"
        onClick={handleGenerate}
        disabled={!selected || generating}
        className="w-full rounded-lg bg-green-600 px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-green-700 disabled:opacity-60"
      >
        {generating ? '…' : 'Checkout-Link generieren'}
      </button>

      {/* 4) Ergebnis */}
      {link && (
        <section className="border border-green-200 bg-green-50/40 rounded-lg p-4">
          <p className="mb-2 text-[13px] font-medium text-gray-900">Checkout-Link (an die Firma senden):</p>
          <div className="flex gap-2">
            <input readOnly value={link} className="flex-1 rounded-lg border bg-white px-3 py-2 font-mono text-[12px]" />
            <button
              type="button"
              onClick={copyLink}
              className="rounded-lg bg-gray-900 px-3 py-2 text-[13px] font-semibold text-white hover:bg-gray-700"
            >
              {copied ? '✓ Kopiert' : 'Kopieren'}
            </button>
          </div>
        </section>
      )}

      {blocked && (
        <section className="border border-amber-200 bg-amber-50 rounded-lg p-4">
          <p className="text-[13px] font-medium text-amber-800">
            Diese Firma hat bereits ein aktives Abo — es wird KEIN neuer Checkout-Link erzeugt
            (ein zweites Abo würde das erste verwaisen lassen).
          </p>
          {portalUrl ? (
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex rounded-lg bg-amber-700 px-3 py-2 text-[13px] font-semibold text-white hover:bg-amber-800"
            >
              Kundenportal öffnen
            </a>
          ) : (
            <p className="mt-2 text-[12px] text-amber-700">
              Kein Kundenportal verfügbar (kein Stripe-Kunde hinterlegt).
            </p>
          )}
        </section>
      )}

      {genError && (
        <section className="border border-red-200 bg-red-50 rounded-lg p-4">
          <p className="text-[13px] text-red-700">{genError}</p>
        </section>
      )}
    </div>
  )
}
