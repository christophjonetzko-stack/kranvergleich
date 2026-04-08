'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cranePrices } from '@/data/crane-prices'

// --- Step definitions ---

interface Option {
  label: string
  value: string
}

const STEPS = [
  {
    id: 'task',
    question: 'Was möchten Sie heben oder transportieren?',
    options: [
      { label: 'Dachziegel / Baumaterial', value: 'dach' },
      { label: 'Stahlträger / Maschinen', value: 'stahl' },
      { label: 'Glas / Fenster / Fassaden', value: 'glas' },
      { label: 'Beton / Fertigteile', value: 'beton' },
      { label: 'Allgemeine Hebearbeiten', value: 'allgemein' },
    ] as Option[],
  },
  {
    id: 'weight',
    question: 'Wie schwer ist die Last (ca.)?',
    options: [
      { label: 'Bis 1 Tonne', value: '1' },
      { label: '1–5 Tonnen', value: '5' },
      { label: '5–20 Tonnen', value: '20' },
      { label: '20–50 Tonnen', value: '50' },
      { label: 'Über 50 Tonnen', value: '100' },
    ] as Option[],
  },
  {
    id: 'height',
    question: 'Auf welche Höhe muss gehoben werden?',
    options: [
      { label: 'Bis 10 Meter', value: '10' },
      { label: '10–20 Meter', value: '20' },
      { label: '20–40 Meter', value: '40' },
      { label: 'Über 40 Meter', value: '60' },
    ] as Option[],
  },
  {
    id: 'duration',
    question: 'Wie lange brauchen Sie den Kran?',
    options: [
      { label: '1 Tag', value: '1' },
      { label: '2–3 Tage', value: '3' },
      { label: '1 Woche', value: '7' },
      { label: '1 Monat', value: '30' },
      { label: 'Länger als 1 Monat', value: '90' },
    ] as Option[],
  },
]

// --- Recommendation engine ---

interface Recommendation {
  slug: string
  name: string
  reason: string
  priceEstimate: string
  includesOperator: boolean
}

function getRecommendation(answers: Record<string, string>): Recommendation {
  const weight = Number(answers.weight)
  const height = Number(answers.height)
  const duration = Number(answers.duration)
  const task = answers.task

  // Decision tree based on weight, height, task
  let slug = 'minikran-mieten'
  let name = 'Minikran'
  let reason = ''

  if (task === 'dach' && weight <= 1 && height <= 20) {
    slug = 'dachdeckerkran-mieten'
    name = 'Dachdeckerkran'
    reason = 'Optimal für Dacharbeiten — schneller Aufbau, kein Kranführerschein nötig.'
  } else if (task === 'glas' && weight <= 5) {
    slug = 'minikran-mieten'
    name = 'Minikran'
    reason = 'Minikrane mit Glassauger sind ideal für Glasmontage und Fassadenarbeiten.'
  } else if (weight <= 1 && height <= 10) {
    slug = 'anhaengerkran-mieten'
    name = 'Anhängerkran'
    reason = 'Günstigste Option für leichte Lasten — transportierbar mit PKW.'
  } else if (weight <= 1 && height <= 20) {
    slug = 'minikran-mieten'
    name = 'Minikran'
    reason = 'Kompakt und flexibel — passt durch enge Zufahrten und Türöffnungen.'
  } else if (weight <= 5 && height <= 20) {
    slug = 'minikran-mieten'
    name = 'Minikran'
    reason = 'Minikrane schaffen bis 3t Traglast und 18m Höhe — ideal für mittlere Projekte.'
  } else if (weight <= 20 && height <= 30) {
    slug = 'autokran-mieten'
    name = 'Autokran'
    reason = 'Autokran — flexibel, schnell einsatzbereit, inkl. Kranführer.'
  } else if (weight <= 50 && height <= 40) {
    slug = 'mobilkran-mieten'
    name = 'Mobilkran'
    reason = 'Mobilkran für schwere Lasten — hohe Tragkraft, inkl. Kranführer.'
  } else if (weight > 50) {
    slug = 'raupenkran-mieten'
    name = 'Raupenkran'
    reason = 'Raupenkran für Schwerlast-Projekte — bis 3.000t Tragkraft möglich.'
  } else if (height > 40 || (duration >= 30 && task === 'beton')) {
    slug = 'baukran-mieten'
    name = 'Baukran'
    reason = 'Turmdrehkran für Großbaustellen — lohnt sich ab mehreren Wochen Einsatz.'
  } else {
    slug = 'autokran-mieten'
    name = 'Autokran'
    reason = 'Autokran — vielseitig einsetzbar für die meisten Hebeprojekte.'
  }

  // Long duration + height → consider Baukran override
  if (duration >= 30 && height >= 20 && slug !== 'raupenkran-mieten') {
    slug = 'baukran-mieten'
    name = 'Baukran'
    reason = 'Bei langer Mietdauer und großer Höhe ist ein Turmdrehkran wirtschaftlicher.'
  }

  // Calculate price estimate
  const price = cranePrices.find((p) => p.craneTypeSlug === slug)
  let priceEstimate = ''
  if (price) {
    if (duration <= 1) {
      priceEstimate = `${price.dayFrom.toLocaleString('de-DE')}–${price.dayTo.toLocaleString('de-DE')}€`
    } else if (duration <= 7) {
      const factor = Math.min(duration, 5)
      const low = Math.round(price.dayFrom * factor * 0.85)
      const high = Math.round(price.dayTo * factor * 0.9)
      priceEstimate = `${low.toLocaleString('de-DE')}–${high.toLocaleString('de-DE')}€`
    } else if (duration <= 30) {
      priceEstimate = `${price.monthFrom.toLocaleString('de-DE')}–${price.monthTo.toLocaleString('de-DE')}€`
    } else {
      const months = Math.ceil(duration / 30)
      const low = Math.round(price.monthFrom * months * 0.9)
      const high = Math.round(price.monthTo * months * 0.85)
      priceEstimate = `${low.toLocaleString('de-DE')}–${high.toLocaleString('de-DE')}€`
    }
  }

  return {
    slug,
    name,
    reason,
    priceEstimate,
    includesOperator: price?.includesOperator ?? false,
  }
}

// --- Component ---

export function CostCalculator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<Recommendation | null>(null)
  const [emailSent, setEmailSent] = useState(false)
  const [emailSending, setEmailSending] = useState(false)

  function handleSelect(value: string) {
    const step = STEPS[currentStep]
    const newAnswers = { ...answers, [step.id]: value }
    setAnswers(newAnswers)

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setResult(getRecommendation(newAnswers))
    }
  }

  function handleReset() {
    setCurrentStep(0)
    setAnswers({})
    setResult(null)
    setEmailSent(false)
    setEmailSending(false)
  }

  async function handleSendEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!result || emailSending) return
    const form = new FormData(e.currentTarget)
    const email = form.get('email') as string
    if (!email) return

    setEmailSending(true)
    try {
      const res = await fetch('/api/send-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          craneName: result.name,
          reason: result.reason,
          priceEstimate: result.priceEstimate,
          includesOperator: result.includesOperator,
          slug: result.slug,
        }),
      })
      if (res.ok) setEmailSent(true)
    } catch { /* ignore */ }
    setEmailSending(false)
  }

  // --- Result screen ---
  if (result) {
    return (
      <div className="border border-blue-200 bg-blue-50/50 rounded-xl p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
            ✓
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Unsere Empfehlung</h3>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <p className="text-xl font-semibold text-gray-900 mb-1">{result.name}</p>
          <p className="text-[14px] text-gray-500 mb-3">{result.reason}</p>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-[12px] text-gray-400">Geschätzte Kosten</p>
              <p className="text-lg font-semibold text-gray-900">{result.priceEstimate}</p>
              <p className="text-[11px] text-gray-400">Richtwert, netto zzgl. MwSt.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-[12px] text-gray-400">Kranführer</p>
              <p className="text-lg font-semibold text-gray-900">
                {result.includesOperator ? 'Inklusive' : 'Optional'}
              </p>
              <p className="text-[11px] text-gray-400">
                {result.includesOperator ? 'Im Preis enthalten' : 'Separat buchbar'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Link
            href={`/${result.slug}`}
            className="flex-1 text-center bg-blue-600 text-white text-[14px] font-medium py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {result.name}-Anbieter vergleichen
          </Link>
          <button
            onClick={handleReset}
            className="text-[13px] text-gray-500 hover:text-gray-700 py-2 px-4 transition-colors"
          >
            Neu berechnen
          </button>
        </div>

        {/* Email capture */}
        <div className="border border-gray-200 rounded-lg p-4 mt-4">
          {emailSent ? (
            <p className="text-[13px] text-green-700 font-medium">
              ✓ Kostenvergleich wurde an Ihre E-Mail gesendet.
            </p>
          ) : (
            <form onSubmit={handleSendEmail}>
              <p className="text-[13px] font-medium text-gray-700 mb-2">
                Ergebnis per E-Mail erhalten
              </p>
              <div className="flex gap-2">
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="ihre@email.de"
                  className="flex-1 text-[13px] border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400"
                />
                <button
                  type="submit"
                  disabled={emailSending}
                  className="text-[13px] font-medium bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors whitespace-nowrap"
                >
                  {emailSending ? 'Senden…' : 'Senden'}
                </button>
              </div>
              <p className="text-[11px] text-gray-400 mt-2">
                Ihre E-Mail wird nur für den Versand des Kostenvergleichs verwendet. Keine Werbung.
              </p>
            </form>
          )}
        </div>

        <p className="text-[11px] text-gray-400 mt-3">
          * Preise sind unverbindliche Richtwerte basierend auf Marktdurchschnitt 2026.
          Zusatzkosten für Transport, Montage und Genehmigungen können anfallen.
        </p>
      </div>
    )
  }

  // --- Question steps ---
  const step = STEPS[currentStep]

  return (
    <div className="border border-gray-200 rounded-xl p-5 sm:p-6">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-4">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      <p className="text-[12px] text-gray-400 mb-1">
        Frage {currentStep + 1} von {STEPS.length}
      </p>
      <h3 className="text-[16px] font-semibold text-gray-900 mb-4">{step.question}</h3>

      <div className="grid gap-2">
        {step.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleSelect(opt.value)}
            className="text-left text-[14px] text-gray-700 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 border border-gray-200 hover:border-blue-300 rounded-lg px-4 py-3 transition-colors"
          >
            {opt.label}
          </button>
        ))}
      </div>

      {currentStep > 0 && (
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          className="mt-3 text-[13px] text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Zurück
        </button>
      )}
    </div>
  )
}
