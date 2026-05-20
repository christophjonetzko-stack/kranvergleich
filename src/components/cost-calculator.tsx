'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cranePrices } from '@/data/crane-prices'
import { getCraneTypeIdBySlug } from '@/data/crane-types'
import { trackPageEvent } from '@/lib/track'
import { TAX_LABEL, COUNTRY_LABEL } from '@/lib/country'
import { SubtypeCheck } from './subtype-check'
import { getSessionEntryPath } from './session-entry-recorder'
import { getStoredUtm } from '@/lib/utm'

// STEPS answer values are upper-bound buckets ('5' = "1–5 t", '20' = "5–20 t").
// SubtypeCheck wants approximate numerics for context — use the upper bound
// directly; the AI is meant to take it as a coarse hint not a precise figure.
function parseTonsFromAnswer(v: string | undefined): number | null {
  if (!v) return null
  const n = parseInt(v, 10)
  return Number.isFinite(n) ? n : null
}
function parseMetersFromAnswer(v: string | undefined): number | null {
  if (!v) return null
  const n = parseInt(v, 10)
  return Number.isFinite(n) ? n : null
}

// --- Step definitions ---

interface Option {
  label: string
  value: string
}

interface Step {
  id: string
  question: string
  options: Option[]
  // BLOK D — mid-flow lead capture step. Rendered with a name+email mini-
  // form instead of the option-button grid. Inserted between Q2 (weight)
  // and Q3 (height) so the user is committed (= row in DB) before they
  // see the engineering questions that filter out tire-kickers.
  isLeadCapture?: true
}

const STEPS: Step[] = [
  {
    id: 'project_type',
    question: 'Was steht bei Ihrem nächsten Projekt an?',
    options: [
      { label: 'Neubau / Rohbau', value: 'neubau' },
      { label: 'Sanierung / Umbau', value: 'sanierung' },
      { label: 'Dachdeckerarbeiten', value: 'dachdecker' },
      { label: 'Industriemontage / Maschinen', value: 'industrie' },
      { label: 'Einzeltransport / Einmaliger Hub', value: 'einzeltransport' },
    ],
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
      { label: 'Ich bin mir nicht sicher', value: 'unsure' },
    ],
  },
  {
    id: 'lead_capture',
    question: 'Letzte 2 Fragen — wohin schicken wir Ihre Empfehlung?',
    options: [],
    isLeadCapture: true,
  },
  {
    id: 'height',
    question: 'Auf welche Höhe muss gehoben werden?',
    options: [
      { label: 'Bis 10 Meter', value: '10' },
      { label: '10–20 Meter', value: '20' },
      { label: '20–40 Meter', value: '40' },
      { label: 'Über 40 Meter', value: '60' },
      { label: 'Ich bin mir nicht sicher', value: 'unsure' },
    ],
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
    ],
  },
]

// Sessionstorage keys for the partial-capture lifecycle. Cleared on
// successful final submission so a repeat user doesn't keep updating
// the same DB row across separate calculator runs.
const PARTIAL_LEAD_ID_KEY = 'kran-calc-partial-lead-id'
const PARTIAL_CAPTURE_NAME_KEY = 'kran-calc-capture-name'
const PARTIAL_CAPTURE_EMAIL_KEY = 'kran-calc-capture-email'

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

// --- Display helpers (BLOK G — personalized recommendation reasoning) ---

// Map raw duration value (the option value string) to its human label.
// Used in the result header so the reason text echoes the user's choice
// ("Bei Ihrer Mietdauer von 1 Monat…") instead of showing the raw number.
function durationLabel(value: string | undefined): string {
  switch (value) {
    case '1': return '1 Tag'
    case '3': return '2–3 Tage'
    case '7': return '1 Woche'
    case '30': return '1 Monat'
    case '90': return 'mehreren Monaten'
    default: return 'Ihrer Mietdauer'
  }
}

function heightLabel(value: string | undefined): string {
  switch (value) {
    case '10': return 'bis 10 m'
    case '20': return '10–20 m'
    case '40': return '20–40 m'
    case '60': return 'über 40 m'
    default: return 'Ihrer Hubhöhe'
  }
}

// Full display name with parenthetical synonym where the synonym is the
// dominant industry term. Only Baukran (Turmdrehkran) and Minikran
// (Spinnenkran) get the parenthetical — others stand alone clearly.
function displayName(slug: string, fallbackName: string): string {
  switch (slug) {
    case 'baukran-mieten': return 'Baukran (Turmdrehkran)'
    case 'minikran-mieten': return 'Minikran (Spinnenkran)'
    default: return fallbackName
  }
}

// Personalized reasoning per recommended crane type, with a concrete
// numeric comparison vs the next-most-likely alternative. Each template
// answers "why this one and not the obvious alternative?" — the question
// a buyer asks themselves before clicking submit. The duration/height
// labels echo the user's own answers so it reads as a custom analysis,
// not a static blurb.
function personalizedReason(slug: string, answers: Record<string, string>): string {
  const dLabel = durationLabel(answers.duration)
  const hLabel = heightLabel(answers.height)
  switch (slug) {
    case 'baukran-mieten':
      return `Bei Ihrer Mietdauer von ${dLabel} und Hubhöhe ${hLabel} ist ein Turmdrehkran ca. 30–40% wirtschaftlicher als ein Mobilkran. Mobilkrane lohnen sich bei Einsätzen unter 4 Wochen — ab einem Monat dreht sich das Verhältnis.`
    case 'mobilkran-mieten':
      return `Bei Ihrer Last und Hubhöhe ${hLabel} ist der Mobilkran 25–35% günstiger pro Hub als ein Raupenkran und schneller einsatzbereit. Raupenkrane werden erst bei sehr schwerem Gelände oder >100 t Last wirtschaftlich.`
    case 'autokran-mieten':
      return `Bei Ihrer Last und Hubhöhe ${hLabel} ist der Autokran die wirtschaftlichste Wahl. Ein Mobilkran wäre 40–60% teurer pro Tag, ein Minikran reicht meist nicht über 18 m Hubhöhe.`
    case 'raupenkran-mieten':
      return `Über 50 t Last erfordert einen Raupenkran. Vergleichbare Mobilkrane > 100 t kosten 200–400% mehr pro Tag und sind in weichem oder unwegsamem Gelände nicht einsetzbar.`
    case 'minikran-mieten':
      return `Bei Ihrer Last bis 5 t und Hubhöhe ${hLabel} ist der Minikran ideal — kompakt für enge Zufahrten und ca. 30–50% günstiger als ein Autokran-Einsatz. Über 18 m Hubhöhe wechseln Sie auf Autokran.`
    case 'anhaengerkran-mieten':
      return `Bei leichten Lasten bis 1 t und Hubhöhe ${hLabel} ist der Anhängerkran die günstigste Wahl — kein Kranführerschein nötig und ca. 50–70% billiger pro Tag als ein Minikran.`
    case 'dachdeckerkran-mieten':
      return `Optimal für Dacharbeiten — schneller Aufbau in 30 Minuten, kein Kranführerschein nötig, ca. 40–60% günstiger als ein vergleichbarer Autokran-Einsatz.`
    default:
      return ''
  }
}

// --- Recommendation engine ---

interface Recommendation {
  slug: string
  name: string
  reason: string
  priceEstimate: string
  includesOperator: boolean
  // TRUE when the user answered "Ich bin mir nicht sicher" to weight or
  // height. Surfaced so the result UI can swap the confident point estimate
  // for a wider range and use generic "multiple crane types possible"
  // copy instead of a specific reason.
  isUncertain: boolean
}

function getRecommendation(answers: Record<string, string>): Recommendation {
  // "Ich bin mir nicht sicher" in weight OR height short-circuits the
  // engineering decision tree: the user explicitly told us they don't
  // know the key inputs, so we shouldn't pretend to recommend one crane
  // type with a confident price tag. Surface a generic "talk to an
  // anbieter" message and let BLOK H swap the point estimate for a
  // wider range.
  if (answers.weight === 'unsure' || answers.height === 'unsure') {
    return {
      // No specific crane_type — submitting this lead leaves crane_type_id
      // NULL, auto_select_nearest can't match, owner reroutes manually.
      slug: '',
      name: 'Mehrere Krantypen kommen in Frage',
      reason: 'Mehrere Krantypen kommen für Ihr Projekt in Frage — unsere Anbieter beraten Sie kostenlos zur passenden Wahl.',
      priceEstimate: '',
      includesOperator: false,
      isUncertain: true,
    }
  }

  const weight = Number(answers.weight)
  const height = Number(answers.height)
  const duration = Number(answers.duration)
  const projectType = answers.project_type

  // Decision tree based on weight, height, duration. project_type is captured
  // for segmentation (DB + future CRM nurture) but does not drive crane choice
  // — engineering signals (weight + height + duration) decide that. The one
  // exception is the Dachdeckerkran shortcut, where the project type is a
  // strong enough signal to override the generic "Anhängerkran for light low
  // loads" branch (a roofer needs the basket + tile-pulley flow, not a
  // car-trailer crane that maxes at the eaves).
  let slug = 'minikran-mieten'
  let name = 'Minikran'
  let reason = ''

  if (projectType === 'dachdecker' && weight <= 1 && height <= 20) {
    slug = 'dachdeckerkran-mieten'
    name = 'Dachdeckerkran'
    reason = 'Optimal für Dacharbeiten — schneller Aufbau, kein Kranführerschein nötig.'
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
  } else if (height > 40) {
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

  // BLOK G — overlay a personalized reasoning sentence that references the
  // user's actual duration + height choices and includes a concrete numeric
  // comparison vs the next-most-likely alternative crane type. Falls back
  // to the engineering branch's `reason` if no template matches (shouldn't
  // happen — every slug above has a template — but defensive).
  const personalized = personalizedReason(slug, answers)
  const finalReason = personalized || reason

  return {
    slug,
    name: displayName(slug, name),
    reason: finalReason,
    priceEstimate,
    includesOperator: price?.includesOperator ?? false,
    isUncertain: false,
  }
}

// --- Component ---

interface CostCalculatorProps {
  // Page path where the calculator is embedded; forwarded into the lead's
  // project_description so we can attribute which landing page drove the conversion.
  page?: string
  // Real firm count from getSiteStats(), already rounded down to nearest 10 by
  // queries.ts. Surfaces in the trust footer under each question (BLOK F) and
  // the result-page authority strip (BLOK K) so trust anchors stay accurate as
  // the catalog grows. Undefined → trust elements skip the count line gracefully.
  firmCount?: number
}

export function CostCalculator({ page = '/kostenrechner', firmCount }: CostCalculatorProps = {}) {
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
  // Live value of the optional Projektdetails textarea — needs to be
  // controlled state so the SubtypeCheck addon can watch it via prop and
  // run an AI subtype suggestion when the description points to a more
  // specialized crane type than the Q&A picked.
  const [projectDetailsLive, setProjectDetailsLive] = useState('')
  const [locationLive, setLocationLive] = useState('')
  // Hides phone/date/project-details by default — 2026-05-01 audit showed 25
  // recommendations vs 0 submit_attempts despite 101 step_completions in W18.
  // Hypothesis: 7 visible fields below recommendation = too much friction on
  // mobile (form scrolls below fold). Compact form (4 required only) closes
  // visual gap to submit button. Optional fields stay reachable via toggle.
  const [showOptionalFields, setShowOptionalFields] = useState(false)
  // BLOK D — mid-flow capture state. Pre-populated from sessionStorage if
  // the user already filled the mini-form earlier in this browser session
  // (so a refresh / accidental back-button doesn't make them re-type).
  const [captureName, setCaptureName] = useState('')
  const [captureEmail, setCaptureEmail] = useState('')
  const [captureDsgvo, setCaptureDsgvo] = useState(false)
  const [captureSubmitting, setCaptureSubmitting] = useState(false)
  const [captureError, setCaptureError] = useState<string | null>(null)
  const [partialLeadId, setPartialLeadId] = useState<string | null>(null)

  // Hydrate capture state from sessionStorage on mount so a mid-flow
  // refresh doesn't wipe progress. sessionStorage scope = current tab only,
  // which matches "this user, this calculator run" without leaking to other
  // tabs that might use a different email.
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const id = window.sessionStorage.getItem(PARTIAL_LEAD_ID_KEY)
      const name = window.sessionStorage.getItem(PARTIAL_CAPTURE_NAME_KEY)
      const email = window.sessionStorage.getItem(PARTIAL_CAPTURE_EMAIL_KEY)
      if (id) setPartialLeadId(id)
      if (name) setCaptureName(name)
      if (email) setCaptureEmail(email)
    } catch {
      // sessionStorage disabled — silently skip; the user just re-types if needed.
    }
  }, [])

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
    setProjectDetailsLive('')
    setLocationLive('')
    // Wipe the partial-capture trail too — "Neu berechnen" means a clean
    // run, not a continuation of the previous abandoned lead. The DB row
    // stays (it's a real partial lead worth recovering) but the client
    // no longer carries the id, so the next final submit creates a fresh
    // row rather than UPDATE'ing the abandoned one.
    setCaptureName('')
    setCaptureEmail('')
    setCaptureDsgvo(false)
    setCaptureError(null)
    setPartialLeadId(null)
    if (typeof window !== 'undefined') {
      try {
        window.sessionStorage.removeItem(PARTIAL_LEAD_ID_KEY)
        window.sessionStorage.removeItem(PARTIAL_CAPTURE_NAME_KEY)
        window.sessionStorage.removeItem(PARTIAL_CAPTURE_EMAIL_KEY)
      } catch {
        // Ignore — storage unavailable, nothing to clear.
      }
    }
  }

  // BLOK D — submit the mid-flow capture step. Inserts (or upserts) a leads
  // row with is_partial=TRUE so the abandon-recovery cohort exists in DB
  // even if the user never finishes Q4+Q5+PLZ. On any non-network failure
  // we still let the user advance (data save is best-effort here; blocking
  // the wizard on a backend hiccup would erase the very conversion we're
  // trying to recover).
  async function handleCaptureSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (captureSubmitting) return
    setCaptureError(null)

    const name = captureName.trim()
    const email = captureEmail.trim()

    if (name.length < 2) {
      setCaptureError('Bitte geben Sie Ihren Namen ein.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setCaptureError('Bitte geben Sie eine gültige E-Mail-Adresse ein.')
      return
    }
    if (!captureDsgvo) {
      setCaptureError('Bitte stimmen Sie der Datenschutzerklärung zu.')
      return
    }

    // Persist immediately so the user has the data back if they refresh
    // mid-network-call. Lead id arrives below.
    if (typeof window !== 'undefined') {
      try {
        window.sessionStorage.setItem(PARTIAL_CAPTURE_NAME_KEY, name)
        window.sessionStorage.setItem(PARTIAL_CAPTURE_EMAIL_KEY, email)
      } catch {
        // ignore
      }
    }

    setCaptureSubmitting(true)
    // Find the weight option's label text so it can ride along as a
    // segmentation hint in the partial row. Falls back to the raw value
    // if the option got out of sync.
    const weightStep = STEPS.find((s) => s.id === 'weight')
    const weightVal = answers.weight ?? ''
    const weightBand = weightStep?.options.find((o) => o.value === weightVal)?.label ?? weightVal

    try {
      const res = await fetch('/api/calculator/partial-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: name,
          customer_email: email,
          project_type: answers.project_type ?? null,
          weight_band: weightBand,
          dsgvo_consent: true,
          dry_run: isDryRunMode,
          website_url: '',
        }),
      })
      const data = await res.json().catch(() => null)
      if (res.ok && data && typeof data.id === 'string' && data.id !== 'honeypot') {
        setPartialLeadId(data.id)
        if (typeof window !== 'undefined') {
          try {
            window.sessionStorage.setItem(PARTIAL_LEAD_ID_KEY, data.id)
          } catch {
            // ignore
          }
        }
        trackPageEvent('calculator_partial_lead_captured')
      }
    } catch {
      // Network failure — don't block forward progress. The user finishes
      // the calculator and the final /api/leads submit still works (just
      // without the abandon-recovery row attached).
    } finally {
      setCaptureSubmitting(false)
    }

    // Advance regardless of partial-save outcome. The lead-capture step's
    // value isn't a wizard answer; it just persists contact info early.
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  // Submit Sammelanfrage — /api/leads auto-selects up to 10 nearest firms
  // for the recommended crane type within 50/100 km of the PLZ, so the user
  // doesn't have to pick firms from a list (peak-intent UX, no extra step).
  async function handleSubmitLead(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!result || leadSending) return

    if (!dsgvoConsent) {
      setLeadError('Bitte stimmen Sie der Datenschutzerklärung zu.')
      // Diagnose the recommendation→attempt drop (87% in the 2026-04-29 audit).
      // Reason fires only on actual click — readers who never press submit
      // produce no row, so high counts here mean "users tried but tripped on
      // DSGVO" while low counts mean "users left before clicking at all".
      trackPageEvent('calculator_form_validation_failed', { reason: 'dsgvo', field: 'dsgvo' })
      return
    }

    const form = new FormData(e.currentTarget)
    const location = String(form.get('location') || '').trim()
    if (location.length < 2) {
      setLeadError('Bitte geben Sie eine PLZ oder Stadt ein.')
      trackPageEvent('calculator_form_validation_failed', { reason: 'location_too_short', field: 'location' })
      return
    }

    // Project description = ONLY what the customer typed. The recommended crane
    // type already appears as its own field ("Krantyp: Mobilkran") in the firm
    // email, so prefixing the boilerplate ("Empfehlung Kostenrechner: …") just
    // buries the real project details in noise the firm doesn't need.
    const userDetails = String(form.get('project_details') || '').trim()
    const projectDescription = userDetails

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

    // First-touch UTM payload from sessionStorage (mig 027). Stays null
    // when the visitor entered organically / directly without UTM params.
    const utm = getStoredUtm()

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
          // Carries the FIRST page of the visitor's session so the lead can
          // be attributed to the entry point (deeplink vs. homepage).
          entry_path: getSessionEntryPath(),
          // The calculator sits on /kran-mieten-preise — set type_context so
          // firm_events form_submit rows show "this lead came from the
          // recommendation pipeline" instead of NULL.
          type_context: result.slug.replace(/-mieten$/, ''),
          // Segmentation tag from calculator Q1 (mig 029). Drives CRM nurture
          // — orthogonal to the recommended crane_type which is engineering-
          // derived. NULL when the answer was never collected.
          project_type: answers.project_type || null,
          // BLOK D — when present, /api/leads UPDATEs the existing partial
          // row instead of inserting a new lead. Keeps the abandon-recovery
          // trail under one identity.
          partial_lead_id: partialLeadId,
          utm_source: utm.utm_source,
          utm_medium: utm.utm_medium,
          utm_campaign: utm.utm_campaign,
          utm_content: utm.utm_content,
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
      // Clear sessionStorage for the partial-capture handshake so a later
      // calculator run on the same tab starts fresh instead of UPDATE'ing
      // the now-completed lead. The DB row stays (status=new, is_partial=
      // false) and continues through the normal dispatch lifecycle.
      if (typeof window !== 'undefined') {
        try {
          window.sessionStorage.removeItem(PARTIAL_LEAD_ID_KEY)
          window.sessionStorage.removeItem(PARTIAL_CAPTURE_NAME_KEY)
          window.sessionStorage.removeItem(PARTIAL_CAPTURE_EMAIL_KEY)
        } catch {
          // ignore
        }
      }
      setPartialLeadId(null)
      // Scroll the success panel into view so the visitor actually sees the
      // confirmation (earlier flow silently left them looking at the old form
      // on mobile). Use requestAnimationFrame so React has re-rendered first.
      requestAnimationFrame(() => {
        document.getElementById('kostenrechner')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } catch (err) {
      setLeadError(err instanceof Error ? err.message : 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.')
      trackPageEvent('calculator_form_validation_failed', { reason: 'server_error' })
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
              href={result.isUncertain ? '/kran-mieten-preise' : `/${result.slug}`}
              className="flex-1 text-center bg-blue-600 text-white text-[14px] font-medium py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {result.isUncertain ? 'Alle Krantypen vergleichen' : `Alle ${result.name}-Anbieter ansehen`}
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

        {/* Recommendation card — price + operator visible up-front when we
            have a confident recommendation. When the user picked "nicht
            sicher" in weight or height (isUncertain), BLOK H replaces this
            with a broader range; for now we suppress the confident grid
            entirely so we don't show an empty price box. */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <p className="text-xl font-semibold text-gray-900 mb-1">
            {result.isUncertain ? result.name : `Für Ihr Projekt empfehlen wir: ${result.name}`}
          </p>
          <p className="text-[14px] text-gray-500 mb-3">{result.reason}</p>
          {!result.isUncertain && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-[12px] text-gray-400">Geschätzte Kosten</p>
                <p className="text-lg font-semibold text-gray-900">{result.priceEstimate}</p>
                <p className="text-[11px] text-gray-400">Richtwert, netto zzgl. {TAX_LABEL}</p>
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
          )}
        </div>

        {/* Inline Sammelanfrage — POSTs to /api/leads with auto_select_nearest.
            Server picks up to 10 nearest firms offering this crane type within
            50/100 km of the PLZ and emails them directly. */}
        <div className="border border-gray-200 bg-white rounded-lg p-4">
          <p className="text-[14px] font-semibold text-gray-900 mb-1">
            {result.isUncertain
              ? 'Kostenlose Beratung anfordern — wir finden den passenden Krantyp'
              : `Konkrete Angebote für ${result.name} — kostenlos & unverbindlich`}
          </p>
          <p className="text-[12px] text-gray-500 mb-3">
            {result.isUncertain
              ? 'Beschreiben Sie kurz Ihr Projekt — unsere Anbieter melden sich mit individuellen Empfehlungen und Angeboten.'
              : `Wir leiten Ihre Anfrage automatisch an die nächstgelegenen Anbieter weiter, die den ${result.name} im Angebot haben.`}
          </p>

          <form onSubmit={handleSubmitLead} className="space-y-3">
            {/* Honeypot */}
            <input type="text" name="website_url" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none" />
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="calc-name" className="block text-[12px] text-gray-600 mb-1">Name *</label>
                <input id="calc-name" name="name" required defaultValue={captureName} placeholder="Max Mustermann" className="w-full text-[13px] border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label htmlFor="calc-email" className="block text-[12px] text-gray-600 mb-1">E-Mail *</label>
                <input id="calc-email" name="email" type="email" required defaultValue={captureEmail} placeholder="max@beispiel.de" className="w-full text-[13px] border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label htmlFor="calc-location" className="block text-[12px] text-gray-600 mb-1">PLZ oder Stadt Einsatzort *</label>
                <input id="calc-location" name="location" required placeholder="z.B. 10115 oder Berlin" maxLength={80} value={locationLive} onChange={(e) => setLocationLive(e.target.value)} className="w-full text-[13px] border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400" />
              </div>
              {showOptionalFields && (
                <>
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
                      value={projectDetailsLive}
                      onChange={(e) => setProjectDetailsLive(e.target.value)}
                      placeholder={`z.B. 12 Dachfenster, Stahlträger 4 m, enge Zufahrt über Hinterhof… (Helfen Sie den ${result.name}-Anbietern, Ihnen ein präzises Angebot zu machen.)`}
                      maxLength={2000}
                      className="w-full text-[13px] border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 resize-y min-h-[72px]"
                    />
                    {!result.isUncertain && (
                      <SubtypeCheck
                        chosenTypeName={result.name}
                        chosenTypeSlug={result.slug.replace(/-mieten$/, '')}
                        weightTons={parseTonsFromAnswer(answers['weight'])}
                        heightMeters={parseMetersFromAnswer(answers['height'])}
                        projectDetails={projectDetailsLive}
                        cityForRedirect={locationLive}
                      />
                    )}
                  </div>
                </>
              )}
            </div>

            {!showOptionalFields && (
              <button
                type="button"
                onClick={() => setShowOptionalFields(true)}
                className="text-[12px] text-blue-600 hover:text-blue-700 underline self-start"
              >
                + Telefon, Wunschtermin & Projektdetails (optional)
              </button>
            )}

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

            {/* Button stays clickable when DSGVO is unchecked — handleSubmitLead
                catches it and surfaces an inline error. Pre-fix: disabled={!dsgvoConsent}
                meant clicks did nothing silently AND calculator_form_validation_failed
                (reason='dsgvo') never fired, leaving the audit blind to "users try
                to submit but DSGVO blocks them" vs. "users never click at all". */}
            <button
              type="submit"
              disabled={leadSending}
              className="w-full text-[15px] font-semibold bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {leadSending
                ? 'Wird gesendet…'
                : result.isUncertain
                  ? 'Kostenlose Beratung anfragen →'
                  : `${result.name}-Angebote jetzt erhalten →`}
            </button>

            <p className="text-[11px] text-center text-gray-500">
              Kostenlos · unverbindlich · Antwort meist innerhalb 24 h
            </p>
          </form>

          <div className="flex items-center justify-between mt-3 gap-3">
            <button
              onClick={handleReset}
              className="text-[12px] text-gray-400 hover:text-gray-600 transition-colors"
            >
              ← Neu berechnen
            </button>
            {/* Escape route — users who don't want to submit a form yet should
                still be able to browse providers. Without this, the only path
                forward from the recommendation was the gated form, and the
                2026-04-29 audit showed 87% of step-4 completions never clicked
                submit. Linking to the listing keeps them in the funnel
                instead of bouncing. */}
            <Link
              href={result.isUncertain ? '/kran-mieten-preise' : `/${result.slug}`}
              className="text-[12px] text-gray-500 hover:text-gray-900 hover:underline transition-colors"
            >
              {result.isUncertain ? 'Alle Krantypen vergleichen ohne Anfrage →' : `Alle ${result.name}-Anbieter ohne Anfrage ansehen →`}
            </Link>
          </div>
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

      {step.isLeadCapture ? (
        // BLOK D — mid-flow capture mini-form. Owns its own submit handler so
        // it can POST to /api/calculator/partial-lead and store the returned
        // id in sessionStorage before advancing the wizard.
        <form onSubmit={handleCaptureSubmit} className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="cap-name" className="block text-[12px] text-gray-600 mb-1">Name *</label>
              <input
                id="cap-name"
                type="text"
                value={captureName}
                onChange={(e) => setCaptureName(e.target.value)}
                required
                placeholder="Max Mustermann"
                className="w-full text-[13px] border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label htmlFor="cap-email" className="block text-[12px] text-gray-600 mb-1">E-Mail *</label>
              <input
                id="cap-email"
                type="email"
                value={captureEmail}
                onChange={(e) => setCaptureEmail(e.target.value)}
                required
                placeholder="max@beispiel.de"
                className="w-full text-[13px] border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>

          <label className="flex gap-2 items-start cursor-pointer">
            <input
              type="checkbox"
              checked={captureDsgvo}
              onChange={(e) => setCaptureDsgvo(e.target.checked)}
              className="mt-0.5 shrink-0"
            />
            <span className="text-[11px] text-gray-500 leading-relaxed">
              Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
              <Link href="/datenschutz" className="underline hover:text-gray-700" target="_blank">Datenschutzerklärung</Link>{' '}
              zu. *
            </span>
          </label>

          {captureError && (
            <p className="text-[12px] text-red-600">{captureError}</p>
          )}

          <button
            type="submit"
            disabled={captureSubmitting}
            className="w-full text-[14px] font-semibold bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {captureSubmitting ? 'Wird gespeichert…' : 'Weiter zur Höhen-Frage →'}
          </button>

          <p className="text-[11px] text-gray-400 text-center leading-relaxed">
            🔒 Nur 1 E-Mail mit Ihrem Ergebnis. Keine Weitergabe ohne Ihre ausdrückliche Anfrage.
          </p>
        </form>
      ) : (
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
      )}

      {currentStep > 0 && (
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          className="mt-3 text-[13px] text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Zurück
        </button>
      )}

      {/* Persistent trust footer (BLOK F) — reassures users at every question
          that the catalog is GDPR-compliant + that submissions don't leak.
          Firm count anchors authority; falls back gracefully when the parent
          didn't pass firmCount. Hidden on the lead-capture step (BLOK D)
          which carries its own narrower trust copy specific to email capture. */}
      {!step.isLeadCapture && (
        <p className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-400 leading-relaxed">
          🔒 DSGVO-konform · Daten gehen nur an Anbieter Ihrer Wahl{firmCount ? ` · ${firmCount}+ Kranverleiher in ${COUNTRY_LABEL}` : ''}
        </p>
      )}
    </div>
  )
}
