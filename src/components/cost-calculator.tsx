'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cranePrices } from '@/data/crane-prices'
import { getCraneTypeIdBySlug } from '@/data/crane-types'
import { trackPageEvent } from '@/lib/track'

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

// --- Presentation helpers for the success-state firm cards ---

function firmInitials(name: string): string {
  const cleaned = name.replace(/\b(GmbH|AG|KG|OHG|GbR|e\.K\.|UG|&amp;|&|\.)\b/gi, ' ').trim()
  const parts = cleaned.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '??'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

// Deterministic color per firm name — same firm → same avatar color on re-render.
const AVATAR_PALETTE = [
  'bg-blue-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-teal-500',
  'bg-indigo-500',
  'bg-rose-500',
]
function firmAvatarColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0
  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length]
}

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
  } else if (task === 'glas' && weight <= 5 && height <= 20) {
    // Minikran (with glass-sucker attachment) only for glass work up to ~18m;
    // taller façade work falls through to Autokran/Mobilkran below.
    slug = 'minikran-mieten'
    name = 'Minikran'
    reason = 'Minikrane mit Glassauger sind ideal für Glasmontage und Fassadenarbeiten bis 18 m Höhe.'
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
  } else if (weight <= 20 && height <= 40) {
    // Autokran covers light-to-medium loads at all reachable heights up to 40m;
    // bumping from height ≤ 30 to ≤ 40 prevents 1–5t jobs at 20–40m falling
    // through to Mobilkran (physically capable but economically overkill).
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

interface CostCalculatorProps {
  // Page path where the calculator is embedded; forwarded into the lead's
  // project_description so we can attribute which landing page drove the conversion.
  page?: string
}

export function CostCalculator({ page = '/kostenrechner' }: CostCalculatorProps = {}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<Recommendation | null>(null)
  const [isDryRunMode, setIsDryRunMode] = useState(false)
  const [leadSending, setLeadSending] = useState(false)
  const [leadError, setLeadError] = useState<string | null>(null)
  const [leadSuccess, setLeadSuccess] = useState<{
    matched: Array<{
      id: string
      name: string
      slug: string
      city: string
      distance_km: number | null
      google_rating: number | null
      google_reviews_count: number
      is_verified: boolean
      crane_type_names: string[]
    }>
    radiusKm: number | null
    // What the backend resolved the location input to — e.g. "10115 Berlin"
    // when the user typed a PLZ or just "Berlin" when they typed a city name.
    // Falls back to the raw input when the server didn't auto-select.
    locationLabel: string
    // True when the server confirmed the customer confirmation email was sent.
    // False → show a "check spam" hint; user emailed us but didn't get receipt.
    customerConfirmationSent: boolean
  } | null>(null)
  const [dsgvoConsent, setDsgvoConsent] = useState(false)

  // Pick up `?dryrun=1` after mount so we don't diverge between SSR and the
  // client during hydration; a prerendered page can't read the URL, and the
  // page is cached as static (ISR) on /kran-mieten-preise.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    setIsDryRunMode(params.get('dryrun') === '1')
  }, [])

  function handleSelect(value: string) {
    const step = STEPS[currentStep]
    const newAnswers = { ...answers, [step.id]: value }
    setAnswers(newAnswers)

    trackPageEvent('calculator_step_completed', { step: currentStep + 1, value })

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      const rec = getRecommendation(newAnswers)
      setResult(rec)
      trackPageEvent('calculator_recommendation_shown', {
        crane_type: rec.slug.replace(/-mieten$/, ''),
      })
    }
  }

  function handleReset() {
    setCurrentStep(0)
    setAnswers({})
    setResult(null)
    setLeadSending(false)
    setLeadError(null)
    setLeadSuccess(null)
    setDsgvoConsent(false)
  }

  // Submit Sammelanfrage — /api/leads auto-selects up to 10 nearest firms
  // for the recommended crane type within 50/100 km of the PLZ, so the user
  // doesn't have to pick firms from a list (peak-intent UX, no extra step).
  async function handleSubmitLead(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!result || leadSending) return

    if (!dsgvoConsent) {
      setLeadError('Bitte stimmen Sie der Datenschutzerklärung zu.')
      return
    }

    const form = new FormData(e.currentTarget)
    const location = String(form.get('location') || '').trim()
    if (location.length < 2) {
      setLeadError('Bitte geben Sie eine PLZ oder Stadt ein.')
      return
    }

    // Project description = calculator recommendation as the baseline (so firms
    // always know which crane the visitor settled on + why we recommended it)
    // plus any free-text details the visitor added, clearly labelled.
    const baseDescription = `Empfehlung Kostenrechner (${page}): ${result.name} — ${result.reason}`
    const userDetails = String(form.get('project_details') || '').trim()
    const projectDescription = userDetails
      ? `${baseDescription}\n\nProjektdetails vom Kunden:\n${userDetails}`
      : baseDescription

    setLeadSending(true)
    setLeadError(null)

    trackPageEvent('calculator_lead_submit_attempt', {
      crane_type: result.slug.replace(/-mieten$/, ''),
      project_details_filled: userDetails.length > 0,
      project_details_length: userDetails.length,
    })

    // Debug helper: visit the page with `?dryrun=1` to exercise the delivery
    // pipeline (owner notification + customer confirmation + email_delivery
    // response) without sending real emails to construction firms. Reads from
    // state (populated by the mount-time effect) to stay hydration-safe.
    const dryRun = isDryRunMode

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crane_type_id: getCraneTypeIdBySlug(result.slug),
          location,
          city: location,
          customer_name: form.get('name'),
          customer_email: form.get('email'),
          customer_phone: form.get('phone'),
          preferred_date: form.get('date') || null,
          project_description: projectDescription,
          dsgvo_consent: dsgvoConsent,
          auto_select_nearest: true,
          dry_run: dryRun,
          website_url: form.get('website_url') || '',
        }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Fehler beim Senden.')
      }
      const json = await res.json()
      const matchedCount = Array.isArray(json.matched_companies) ? json.matched_companies.length : 0
      const radiusKm = typeof json.radius_used_km === 'number' ? json.radius_used_km : null
      trackPageEvent('calculator_lead_submit_success', {
        crane_type: result.slug.replace(/-mieten$/, ''),
        matched_count: matchedCount,
        ...(radiusKm !== null ? { radius_km: radiusKm } : {}),
        project_details_filled: userDetails.length > 0,
        project_details_length: userDetails.length,
      })
      setLeadSuccess({
        matched: Array.isArray(json.matched_companies) ? json.matched_companies : [],
        radiusKm,
        locationLabel: typeof json.resolved_label === 'string' && json.resolved_label ? json.resolved_label : location,
        customerConfirmationSent: json.email_delivery?.customer_confirmation !== false,
      })
      // Scroll the success panel into view so the visitor actually sees the
      // confirmation (earlier flow silently left them looking at the old form
      // on mobile). Use requestAnimationFrame so React has re-rendered first.
      requestAnimationFrame(() => {
        document.getElementById('kostenrechner')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } catch (err) {
      setLeadError(err instanceof Error ? err.message : 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.')
    } finally {
      setLeadSending(false)
    }
  }

  // --- Result screen ---
  if (result) {
    // Success panel — shown after /api/leads successfully routed the Sammelanfrage
    // to auto-selected nearest firms. Matched list is honest (real DB names +
    // real radius used), never invented.
    if (leadSuccess) {
      const count = leadSuccess.matched.length
      return (
        <div className="border border-green-200 bg-green-50/60 rounded-xl p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              ✓
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Anfrage gesendet</h3>
          </div>
          <p className="text-[14px] text-gray-700 mb-3">
            {count > 0 ? (
              <>
                Ihre Anfrage wurde an <strong>{count} Anbieter</strong>
                {leadSuccess.radiusKm ? <> im Umkreis von <strong>{leadSuccess.radiusKm} km</strong> um {leadSuccess.locationLabel}</> : <> in der Region {leadSuccess.locationLabel}</>}
                {' '}weitergeleitet. Die Anbieter melden sich direkt per E-Mail bei Ihnen.
              </>
            ) : (
              <>
                Wir haben Ihre Anfrage erhalten. Aktuell finden wir für {leadSuccess.locationLabel} keine
                direkten {result.name}-Anbieter in der Nähe — wir prüfen manuell und melden uns
                innerhalb von 1–2 Werktagen.
              </>
            )}
          </p>
          {leadSuccess.customerConfirmationSent && (
            <p className="text-[12px] text-gray-500 mb-3">
              Eine Bestätigung wurde an Ihre E-Mail gesendet — bitte prüfen Sie ggf. auch den Spam-Ordner
              (Absender: <span className="font-mono">noreply@send.kranvergleich.de</span>).
            </p>
          )}
          {count > 0 && (
            <div className="space-y-2 mb-4">
              {leadSuccess.matched.map((c) => {
                const hasRating = c.google_rating != null && c.google_rating > 0
                const primaryTag = result.name
                const otherTags = c.crane_type_names.filter((n) => n !== primaryTag).slice(0, 3)
                return (
                  <div
                    key={c.id}
                    className="bg-white border border-gray-200 rounded-lg p-3 flex items-start gap-3"
                  >
                    <div
                      className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center text-white text-[13px] font-semibold ${firmAvatarColor(c.name)}`}
                      aria-hidden="true"
                    >
                      {firmInitials(c.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-semibold text-gray-900 truncate">{c.name}</p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[12px] text-gray-500 mt-0.5">
                        {c.city && <span>{c.city}</span>}
                        {typeof c.distance_km === 'number' && (
                          <span>{c.distance_km} km entfernt</span>
                        )}
                        {hasRating && (
                          <span className="flex items-center gap-1">
                            <span className="text-amber-500">★</span>
                            <span className="text-gray-700 font-medium">{c.google_rating!.toFixed(1)}</span>
                            {c.google_reviews_count > 0 && (
                              <span className="text-gray-400">({c.google_reviews_count})</span>
                            )}
                          </span>
                        )}
                      </div>
                      {c.crane_type_names.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {c.crane_type_names.includes(primaryTag) && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded font-medium">
                              {primaryTag}
                            </span>
                          )}
                          {otherTags.map((name) => (
                            <span
                              key={name}
                              className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded"
                            >
                              {name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-2">
            <Link
              href={`/${result.slug}`}
              className="flex-1 text-center bg-blue-600 text-white text-[14px] font-medium py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Alle {result.name}-Anbieter ansehen
            </Link>
            <button
              onClick={handleReset}
              className="text-[13px] text-gray-500 hover:text-gray-700 py-2 px-4 transition-colors"
            >
              Neu berechnen
            </button>
          </div>
          <p className="text-[11px] text-gray-400 mt-3">
            * Preise sind unverbindliche Richtwerte basierend auf Marktdurchschnitt 2026.
            Zusatzkosten für Transport, Montage und Genehmigungen können anfallen.
          </p>
        </div>
      )
    }

    // Recommendation + inline Sammelanfrage (no more email gate).
    return (
      <div className="border border-blue-200 bg-blue-50/50 rounded-xl p-5 sm:p-6">
        {isDryRunMode && (
          <div className="border border-amber-300 bg-amber-50 rounded-lg p-3 mb-4 text-[13px] text-amber-900">
            <strong>⚠ Dry-run mode aktywny.</strong> Firmy NIE otrzymają e-maili. Tylko owner notification + customer confirmation + zapis w DB. Zdejmij <code>?dryrun=1</code> z URL, żeby wrócić do normalnego trybu.
          </div>
        )}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
            ✓
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Unsere Empfehlung</h3>
        </div>

        {/* Recommendation card — price + operator visible up-front, no gating. */}
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

        {/* Inline Sammelanfrage — POSTs to /api/leads with auto_select_nearest.
            Server picks up to 10 nearest firms offering this crane type within
            50/100 km of the PLZ and emails them directly. */}
        <div className="border border-gray-200 bg-white rounded-lg p-4">
          <p className="text-[14px] font-semibold text-gray-900 mb-1">
            Konkrete Angebote für {result.name} — kostenlos &amp; unverbindlich
          </p>
          <p className="text-[12px] text-gray-500 mb-3">
            Wir leiten Ihre Anfrage automatisch an die nächstgelegenen Anbieter weiter,
            die den {result.name} im Angebot haben.
          </p>

          <form onSubmit={handleSubmitLead} className="space-y-3">
            {/* Honeypot */}
            <input type="text" name="website_url" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none" />
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="calc-name" className="block text-[12px] text-gray-600 mb-1">Name *</label>
                <input id="calc-name" name="name" required placeholder="Max Mustermann" className="w-full text-[13px] border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label htmlFor="calc-email" className="block text-[12px] text-gray-600 mb-1">E-Mail *</label>
                <input id="calc-email" name="email" type="email" required placeholder="max@beispiel.de" className="w-full text-[13px] border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label htmlFor="calc-location" className="block text-[12px] text-gray-600 mb-1">PLZ oder Stadt Einsatzort *</label>
                <input id="calc-location" name="location" required placeholder="z.B. 10115 oder Berlin" maxLength={80} className="w-full text-[13px] border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label htmlFor="calc-phone" className="block text-[12px] text-gray-600 mb-1">Telefon (optional)</label>
                <input id="calc-phone" name="phone" type="tel" placeholder="+49 170 1234567" className="w-full text-[13px] border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="calc-date" className="block text-[12px] text-gray-600 mb-1">Wunschtermin (optional)</label>
                <input id="calc-date" name="date" type="date" className="w-full text-[13px] border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="calc-project-details" className="block text-[12px] text-gray-600 mb-1">
                  Projektdetails (optional) — was soll konkret gehoben werden?
                </label>
                <textarea
                  id="calc-project-details"
                  name="project_details"
                  rows={3}
                  placeholder={`z.B. 12 Dachfenster, Stahlträger 4 m, enge Zufahrt über Hinterhof… (Helfen Sie den ${result.name}-Anbietern, Ihnen ein präzises Angebot zu machen.)`}
                  maxLength={2000}
                  className="w-full text-[13px] border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 resize-y min-h-[72px]"
                />
              </div>
            </div>

            <label className="flex gap-2 items-start cursor-pointer">
              <input
                type="checkbox"
                checked={dsgvoConsent}
                onChange={(e) => setDsgvoConsent(e.target.checked)}
                className="mt-0.5 shrink-0"
              />
              <span className="text-[11px] text-gray-500 leading-relaxed">
                Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
                <Link href="/datenschutz" className="underline hover:text-gray-700" target="_blank" onClick={(e) => e.stopPropagation()}>Datenschutzerklärung</Link>{' '}
                zu. Meine Daten werden zur Bearbeitung an passende Anbieter weitergeleitet. *
              </span>
            </label>

            {leadError && (
              <div className="border border-red-200 bg-red-50 rounded-lg p-3 text-[13px] text-red-700">
                <strong>Anfrage konnte nicht gesendet werden.</strong>
                <br />
                {leadError} Bitte versuchen Sie es in ein paar Sekunden erneut oder kontaktieren Sie uns direkt.
              </div>
            )}

            <button
              type="submit"
              disabled={leadSending || !dsgvoConsent}
              className="w-full text-[14px] font-medium bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {leadSending ? 'Wird gesendet…' : `Kostenlose Angebote für ${result.name} anfragen`}
            </button>

            <p className="text-[11px] text-center text-gray-400">
              Kostenlos · unverbindlich · keine versteckten Gebühren
            </p>
          </form>

          <button
            onClick={handleReset}
            className="text-[12px] text-gray-400 hover:text-gray-600 mt-3 transition-colors"
          >
            ← Neu berechnen
          </button>
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
