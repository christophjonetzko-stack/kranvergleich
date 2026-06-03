'use client'

import { useState } from 'react'

export function AdminLoginForm() {
  const [token, setToken] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading || !token) return
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      if (res.ok) {
        window.location.reload()
        return
      }
      setError(true)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-3">
      <h1 className="text-lg font-semibold text-gray-900">Admin</h1>
      <input
        type="password"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Admin-Token"
        autoComplete="off"
        className="w-full rounded-lg border px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-[13px] text-red-600">Token ungültig.</p>}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-[15px] font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? '…' : 'Anmelden'}
      </button>
    </form>
  )
}
