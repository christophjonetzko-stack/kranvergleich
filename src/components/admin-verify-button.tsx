'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Confirms a paid firm after Christoph checked Impressum + website + phone.
// On success it refreshes the server component so the row leaves the queue.
export function AdminVerifyButton({ companyId, companyName }: { companyId: string; companyName: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleVerify() {
    if (loading) return
    if (!window.confirm(`„${companyName}" als verifiziert freischalten?`)) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/path4-verify', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ companyId }),
      })
      if (res.ok) {
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
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleVerify}
        disabled={loading}
        className="inline-flex items-center justify-center rounded-lg bg-green-600 px-3 py-1.5 text-[13px] font-semibold text-white hover:bg-green-700 disabled:opacity-60"
      >
        {loading ? '…' : 'Verifizieren'}
      </button>
      {error && <span className="text-[12px] text-red-600">{error}</span>}
    </div>
  )
}
