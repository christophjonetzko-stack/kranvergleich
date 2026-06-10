'use client'

import { useState } from 'react'
import Link from 'next/link'
import { trackPageEvent } from '@/lib/track'

interface RueckrufFormProps {
  craneTypeId: string
  craneTypeName: string
  craneTypeSlug: string
  cityName: string
}

/**
 * Low-friction callback request: phone + PLZ + DSGVO consent, nothing else.
 * Crane rental is a phone-first trade; part of the demand never fills a full
 * form with project description. Posts to /api/leads with callback_request
 * (email optional since mig 038) + auto_select_nearest routing by PLZ.
 */
export function RueckrufForm({ craneTypeId, craneTypeName, craneTypeSlug, cityName }: RueckrufFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [contactedCount, setContactedCount] = useState<number | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    const formData = new FormData(e.currentTarget)
    setStatus('sending')
    setErrorMsg(null)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callback_request: true,
          auto_select_nearest: true,
          customer_phone: formData.get('phone'),
          location: formData.get('plz'),
          crane_type_id: craneTypeId,
          dsgvo_consent: formData.get('dsgvo') === 'on',
          entry_path: typeof window !== 'undefined' ? window.location.pathname : null,
        }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        setErrorMsg(
          (data && typeof data.error === 'string' && data.error) ||
            'Senden fehlgeschlagen. Bitte versuchen Sie es erneut.',
        )
        setStatus('error')
        return
      }
      trackPageEvent('inline_sammelanfrage_submit', { crane_type: craneTypeSlug })
      setContactedCount(
        data && Array.isArray(data.matched_companies) ? data.matched_companies.length : null,
      )
      setStatus('success')
    } catch {
      setErrorMsg('Senden fehlgeschlagen. Bitte versuchen Sie es erneut.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="mb-10 rounded-lg border border-green-200 bg-green-50 p-5">
        <p className="text-[15px] font-semibold text-gray-900 mb-1">Rückruf angefordert ✓</p>
        <p className="text-[13px] text-gray-700">
          {contactedCount
            ? `${contactedCount} ${craneTypeName}-Anbieter aus Ihrer Region wurden informiert und rufen Sie zurück.`
            : `Passende ${craneTypeName}-Anbieter aus Ihrer Region wurden informiert und rufen Sie zurück.`}
        </p>
      </div>
    )
  }

  return (
    <section className="mb-10 rounded-lg border border-gray-200 bg-gray-50/60 p-5">
      <p className="text-[15px] font-semibold text-gray-900 mb-1">
        Lieber zurückrufen lassen?
      </p>
      <p className="text-[13px] text-gray-600 mb-4">
        Telefonnummer und PLZ genügen. Passende {craneTypeName}-Anbieter aus der Region {cityName} rufen Sie zurück, kostenlos und unverbindlich.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-start">
          <input
            type="tel"
            name="phone"
            required
            placeholder="Ihre Telefonnummer"
            autoComplete="tel"
            className="flex-1 rounded-md border border-gray-300 px-3 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="plz"
            required
            inputMode="numeric"
            pattern="[0-9]{4,5}"
            title="Postleitzahl (4–5 Ziffern)"
            placeholder="PLZ des Einsatzorts"
            autoComplete="postal-code"
            className="w-full sm:w-44 rounded-md border border-gray-300 px-3 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-60 px-5 py-2.5 text-[14px] font-medium text-white transition-colors"
          >
            {status === 'sending' ? 'Wird gesendet…' : 'Rückruf anfordern'}
          </button>
        </div>
        {errorMsg && <p className="mt-2 text-[13px] text-red-600">{errorMsg}</p>}
        <label className="mt-3 flex items-start gap-2 text-[12px] text-gray-500 cursor-pointer">
          <input type="checkbox" name="dsgvo" required className="mt-0.5" />
          <span>
            Ich stimme zu, dass meine Telefonnummer an passende Kranvermieter in meiner Region
            weitergegeben wird (
            <Link href="/datenschutz" className="underline hover:text-gray-600">Datenschutzerklärung</Link>
            ).
          </span>
        </label>
      </form>
    </section>
  )
}
