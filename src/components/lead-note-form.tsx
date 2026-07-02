'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Manual timeline note (phone calls, Gmail threads, decisions) so the panel
// holds the full lead history, not only what panel actions append.
export function LeadNoteForm({ leadId }: { leadId: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function save() {
    const clean = text.trim()
    if (!clean) {
      setError('Bitte Text eingeben')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/lead-action', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'note', leadId, text: clean }),
      })
      if (res.ok) {
        setText('')
        setOpen(false)
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

  return (
    <div className="mt-3">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center rounded-lg bg-gray-100 px-3 py-1.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-200"
        >
          + Notiz hinzufügen
        </button>
      ) : (
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="z.B. Kunde angerufen: wartet auf Angebot von Kammann…"
            maxLength={2000}
            rows={3}
            className="w-full rounded-lg border px-3 py-2 text-[14px]"
          />
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={save}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-lg bg-gray-700 px-3 py-1.5 text-[13px] font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
            >
              {loading ? '…' : 'Notiz speichern'}
            </button>
            <button type="button" onClick={() => { setOpen(false); setError(null) }} className="text-[13px] text-gray-500 hover:underline">
              Abbrechen
            </button>
          </div>
        </div>
      )}
      {error && <p className="mt-2 text-[13px] text-red-600">{error}</p>}
    </div>
  )
}
