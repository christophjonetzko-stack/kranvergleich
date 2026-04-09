'use client'

import { useState } from 'react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Fehler beim Anmelden.')
      }
      setStatus('success')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Fehler beim Anmelden.')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-3">
        <p className="text-[14px] font-medium text-green-700">
          Erfolgreich angemeldet! Sie erhalten in Kürze aktuelle Preise und Tipps.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
        placeholder="Ihre E-Mail-Adresse"
        className="flex-1 px-4 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-[14px] font-medium rounded-lg transition-colors whitespace-nowrap"
      >
        {status === 'loading' ? 'Wird gesendet...' : 'Kostenlos anmelden'}
      </button>
      {status === 'error' && (
        <p className="text-[12px] text-red-600 sm:absolute sm:bottom-0">{errorMsg}</p>
      )}
    </form>
  )
}
