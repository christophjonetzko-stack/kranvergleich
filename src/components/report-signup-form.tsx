'use client'

import { useState } from 'react'

/**
 * Nachfrage-Report opt-in form. Posts to /api/report-subscribe; the actual
 * consent is completed by the double-opt-in click in the confirmation mail.
 * Consent checkbox is unchecked by default (DSGVO — no pre-ticked boxes).
 */
export function ReportSignupForm() {
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !consent) return

    setStatus('loading')
    try {
      const res = await fetch('/api/report-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), city: city.trim() || undefined }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Anmeldung fehlgeschlagen.')
      }
      setStatus('success')
      setEmail('')
      setCity('')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Anmeldung fehlgeschlagen.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-4 max-w-md">
        <p className="text-[15px] font-medium text-green-800">Fast geschafft.</p>
        <p className="mt-1 text-[14px] leading-relaxed text-green-700">
          Wir haben Ihnen eine E-Mail geschickt. Bitte bestätigen Sie darin Ihre Anmeldung. Erst nach
          Ihrer Bestätigung erhalten Sie den Report.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
        placeholder="Ihre E-Mail-Adresse"
        className="w-full px-4 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Ihre Stadt (optional)"
        className="w-full px-4 py-2.5 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <label className="flex items-start gap-2 text-[13px] leading-relaxed text-gray-600">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 shrink-0"
        />
        <span>
          Ich möchte den Nachfrage-Report per E-Mail erhalten und stimme der Verarbeitung meiner
          E-Mail-Adresse gemäß der{' '}
          <a href="/datenschutz" className="underline hover:text-gray-900">Datenschutzerklärung</a> zu.
          Die Einwilligung kann ich jederzeit widerrufen.
        </span>
      </label>
      <button
        type="submit"
        disabled={status === 'loading' || !consent}
        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white text-[14px] font-medium rounded-lg transition-colors"
      >
        {status === 'loading' ? 'Wird gesendet...' : 'Report anfordern'}
      </button>
      {status === 'error' && <p className="text-[12px] text-red-600">{errorMsg}</p>}
    </form>
  )
}
