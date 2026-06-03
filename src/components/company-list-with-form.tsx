'use client'

import { useState, useMemo, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

// Reads ?plz=XXXXX from URL on mount. Isolated in its own component so the
// useSearchParams() CSR bailout only suspends this tiny subtree, not the page.
function PlzFromUrl({ onPlz }: { onPlz: (plz: string) => void }) {
  const searchParams = useSearchParams()
  useEffect(() => {
    const plz = searchParams.get('plz')
    if (plz && PLZ_REGEX.test(plz)) onPlz(plz)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}
import { CompanyCard } from './company-card'
import { InquiryBar } from './inquiry-bar'
import type { CompanyWithCranes } from '@/lib/types'
import { getCraneTypeNameById, getCraneMaxReachById } from '@/data/crane-types'
import { evalReachFit } from '@/lib/fit'
import { trackPageEvent } from '@/lib/track'
import { PLZ_REGEX } from '@/lib/country'

const PAGE_SIZE = 20

// Mirrors MAX_COMPANY_IDS in /api/leads (route.ts): the server caps a single
// inquiry at 10 firms (Resend rate-limit + cost). Cap the "Anfrage an alle"
// pre-selection to the same number so the CTA copy and the modal never promise
// more firms than actually get contacted (silent truncation otherwise).
const MAX_INQUIRE_ALL = 10

type SortOption = 'rating' | 'reviews' | 'name' | 'distance'

// Haversine distance in km between two lat/lng points
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// Format kg as a compact tonne string ("1600" -> "1,6", "16000" -> "16").
function fmtTons(kg: number): string {
  return (kg / 1000).toFixed(1).replace(/\.0$/, '').replace('.', ',')
}

type Requirements = {
  capacity_kg: number // 0 = not stated
  reach_m: number // 0 = not stated
  needs_glass: boolean
  needs_operator: boolean
  reasoning: string
}
type FitVerdict = { rank: number; fit: 'good' | 'neutral' | 'weak'; note: string }
// Capacity safety margin, mirrors FIT_SAFETY_MARGIN in /api/leads.
const FIT_MARGIN = 1.2

interface CompanyListWithFormProps {
  companies: CompanyWithCranes[]
  craneTypeId?: string
  craneTypeName?: string
  cityName?: string
  /** Show Bundesland filter (useful on crane type pages, not on city pages) */
  showStateFilter?: boolean
  /** Show crane type filter (useful on city pages with mixed crane types) */
  showCraneTypeFilter?: boolean
  /** Called when filtered company list changes, use to sync map */
  onFilteredChange?: (companies: CompanyWithCranes[]) => void
  /** Reference price label for companies without own pricing */
  referencePrice?: string | null
  /** City slug passed to firm_events when a card's phone link is clicked */
  cityContext?: string | null
  /** Crane-type slug passed to firm_events for the same reason */
  typeContext?: string | null
  /** Pre-filled from ?project=… on the listing page, passed through to
   *  InquiryBar so the inquiry textarea opens with the user's home-page
   *  description already inside. */
  initialProjectDescription?: string
  /** Real catalog total for this slice (e.g. 332 Mobilkran in DE). When the
   *  parent page caps the displayed list (50 on hub pages), this lets the
   *  filter counter show "X von Y angezeigt" instead of just "48 Anbieter"
   *  next to a header that already advertises the higher total. */
  totalCount?: number
  /** Page-city coordinates (city×type pages). When present, the opt-out
   *  pre-selection picks the firms NEAREST the city instead of the top-rated,
   *  so far region-tagged firms (e.g. a Bavaria branch on a Hamburg page) don't
   *  land in the default selection. */
  cityCoords?: { lat: number; lng: number }
}

export function CompanyListWithForm({
  companies,
  craneTypeId,
  craneTypeName,
  cityName,
  showStateFilter = false,
  showCraneTypeFilter = false,
  onFilteredChange,
  referencePrice,
  cityContext,
  typeContext,
  initialProjectDescription,
  totalCount,
  cityCoords,
}: CompanyListWithFormProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [sortBy, setSortBy] = useState<SortOption>('rating')
  const [filterState, setFilterState] = useState<string>('')
  const [filterMinRating, setFilterMinRating] = useState<string>('')
  const [filterCraneType, setFilterCraneType] = useState<string>('')
  const [plzInput, setPlzInput] = useState('')
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [plzLabel, setPlzLabel] = useState('')
  // Controlled inquiry-bar dialog state, owned here so the 1-click
  // "Anfrage an alle Anbieter" CTA can pre-select all filtered firms AND
  // open the form modal in a single user gesture (without requiring an
  // intermediate sticky-pill click).
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const [inquiryFromAllCta, setInquiryFromAllCta] = useState(false)
  // AI fit-matcher ("A"): the customer describes what they want to lift; we
  // extract requirements (capacity, glass) and re-rank the firm list by fit.
  const [projectInput, setProjectInput] = useState(initialProjectDescription ?? '')
  const [requirements, setRequirements] = useState<Requirements | null>(null)
  const [matching, setMatching] = useState(false)
  const [matchError, setMatchError] = useState<string | null>(null)

  // Lookup PLZ  coordinates via /api/cities
  const lookupPlz = useCallback(async (plz: string) => {
    if (!PLZ_REGEX.test(plz)) {
      setUserCoords(null)
      setPlzLabel('')
      return
    }
    try {
      const res = await fetch(`/api/cities?q=${plz}`)
      const data = await res.json()
      if (data.length > 0) {
        setUserCoords({ lat: data[0].lat, lng: data[0].lng })
        setPlzLabel(data[0].name)
        setSortBy('distance')
        setVisibleCount(PAGE_SIZE)
      }
    } catch {
      setUserCoords(null)
      setPlzLabel('')
    }
  }, [])

  const handlePlzFromUrl = useCallback((plz: string) => {
    setPlzInput((prev) => {
      if (prev) return prev
      lookupPlz(plz)
      return plz
    })
  }, [lookupPlz])

  // Distance map: company id  km (only when userCoords set)
  const distanceMap = useMemo(() => {
    if (!userCoords) return new Map<string, number>()
    const map = new Map<string, number>()
    for (const c of companies) {
      if (c.lat != null && c.lng != null) {
        map.set(c.id, Math.round(haversineKm(userCoords.lat, userCoords.lng, c.lat, c.lng)))
      }
    }
    return map
  }, [companies, userCoords])

  // Fit verdict per company for the requested crane type, derived from the
  // AI-extracted requirements + the firm's own company_cranes data (already in
  // props). Positive-evidence only: a too-small declared capacity is "weak";
  // a documented Glassauger when glass is needed is "good"; NULL data stays
  // "neutral" (never penalised — coverage is partial). Glass never downgrades
  // to "weak" (a firm without the flag may simply be undocumented).
  const fitMap = useMemo(() => {
    const map = new Map<string, FitVerdict>()
    if (!requirements || !craneTypeId) return map
    const req = requirements.capacity_kg > 0 ? requirements.capacity_kg : null
    const reqReach = requirements.reach_m > 0 ? requirements.reach_m : 0
    const typeReach = getCraneMaxReachById(craneTypeId) ?? 0
    for (const c of companies) {
      const forType = c.company_cranes.filter((cc) => cc.crane_type_id === craneTypeId)
      const maxCap = forType.reduce<number | null>((acc, cc) => {
        if (cc.max_capacity_kg == null) return acc
        return acc == null ? cc.max_capacity_kg : Math.max(acc, cc.max_capacity_kg)
      }, null)
      const firmReach = forType.reduce<number | null>((acc, cc) => {
        if (cc.max_reach_m == null) return acc
        return acc == null ? cc.max_reach_m : Math.max(acc, cc.max_reach_m)
      }, null)
      const hasGlass = c.company_cranes.some((cc) => cc.has_glass_sucker === true)
      let fit: FitVerdict['fit'] = 'neutral'
      const notes: string[] = []
      if (reqReach > 0) {
        // 2D fit (Last × Reichweite) when the customer stated a reach/height.
        const rf = evalReachFit({ requiredKg: req ?? 0, requiredReachM: reqReach, firmMaxCapKg: maxCap, firmMaxReachM: firmReach, typeMaxReachM: typeReach })
        if (rf.verdict === 'reach_short') { fit = 'weak'; notes.push(`Reichweite ~${firmReach ?? typeReach} m`) }
        else if (rf.verdict === 'capacity_risk') { fit = 'weak'; notes.push(`bei ${reqReach} m evtl. zu klein`) }
        else if (rf.verdict === 'ok' && maxCap != null) { fit = 'good'; notes.push(`bis ${fmtTons(maxCap)} t`) }
      } else if (req != null && maxCap != null) {
        // No reach stated → fall back to the at-mast capacity check.
        if (maxCap < req * FIT_MARGIN) { fit = 'weak'; notes.push(`max ${fmtTons(maxCap)} t`) }
        else { fit = 'good'; notes.push(`bis ${fmtTons(maxCap)} t`) }
      }
      if (requirements.needs_glass && hasGlass) {
        if (fit !== 'weak') fit = 'good'
        notes.push('Glassauger')
      }
      const rank = fit === 'good' ? 0 : fit === 'weak' ? 2 : 1
      map.set(c.id, { rank, fit, note: notes.join(' · ') })
    }
    return map
  }, [companies, requirements, craneTypeId])

  // Unique states for filter dropdown
  const states = useMemo(() => {
    const s = [...new Set(companies.map((c) => c.state).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b, 'de')
    )
    return s
  }, [companies])

  // Unique crane types across all companies
  const availableCraneTypes = useMemo(() => {
    const typeIds = new Set<string>()
    for (const c of companies) {
      for (const cc of c.company_cranes) {
        typeIds.add(cc.crane_type_id)
      }
    }
    return [...typeIds]
      .map((id) => ({ id, name: getCraneTypeNameById(id) }))
      .sort((a, b) => a.name.localeCompare(b.name, 'de'))
  }, [companies])

  const filtered = useMemo(() => {
    let list = [...companies]

    if (filterState) {
      list = list.filter((c) => c.state === filterState)
    }

    if (filterMinRating) {
      const min = parseFloat(filterMinRating)
      list = list.filter((c) => (c.google_rating ?? 0) >= min)
    }

    if (filterCraneType) {
      list = list.filter((c) => c.company_cranes.some((cc) => cc.crane_type_id === filterCraneType))
    }

    switch (sortBy) {
      case 'rating':
        list.sort((a, b) => (b.google_rating ?? 0) - (a.google_rating ?? 0))
        break
      case 'reviews':
        list.sort((a, b) => b.google_reviews_count - a.google_reviews_count)
        break
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name, 'de'))
        break
      case 'distance':
        list.sort((a, b) => (distanceMap.get(a.id) ?? 9999) - (distanceMap.get(b.id) ?? 9999))
        break
    }

    // When the AI matcher has run, fit takes priority over the chosen sort:
    // good firms float to the top, too-small ones sink. Array.sort is stable,
    // so the sortBy order is preserved within each fit group.
    if (requirements && fitMap.size > 0) {
      list.sort((a, b) => (fitMap.get(a.id)?.rank ?? 1) - (fitMap.get(b.id)?.rank ?? 1))
    }

    return list
  }, [companies, sortBy, filterState, filterMinRating, filterCraneType, distanceMap, requirements, fitMap])

  // Notify parent when filtered list changes (for map sync)
  useEffect(() => {
    onFilteredChange?.(filtered)
  }, [filtered, onFilteredChange])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length
  // "Anfrage an alle" reaches at most MAX_INQUIRE_ALL firms (server cap), so the
  // copy must not claim "alle N" when more than that match.
  const inquireAllCount = Math.min(filtered.length, MAX_INQUIRE_ALL)
  const inquireAllIsAll = filtered.length <= MAX_INQUIRE_ALL
  const goodFitCount = requirements ? [...fitMap.values()].filter((v) => v.fit === 'good').length : 0
  const weakFitCount = requirements ? [...fitMap.values()].filter((v) => v.fit === 'weak').length : 0

  // Toggle a firm in/out of the selection. Adding is capped at MAX_INQUIRE_ALL
  // (mirrors the server cap); deselecting is always allowed.
  const toggleCompany = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : prev.length >= MAX_INQUIRE_ALL
          ? prev
          : [...prev, id],
    )
  }

  const removeCompany = (id: string) => {
    setSelectedIds((prev) => prev.filter((i) => i !== id))
  }

  const clearSelection = () => setSelectedIds([])

  const selectedCompanies = companies.filter((c) => selectedIds.includes(c.id))

  // Opt-out default (P0): on city listings, pre-select the suitable firms (capped
  // at MAX_INQUIRE_ALL) so an inquiry defaults to a competitive multi-firm request
  // instead of a risky single-firm one. The user deselects anyone before submit.
  // Mount-only: later sort/filter changes must not re-seed and clobber the user's
  // manual deselects. DSGVO: this pre-selects recipients (UX) only; the separate
  // consent checkbox in InquiryBar stays unchecked + required.
  useEffect(() => {
    if (!cityName || companies.length === 0) return
    // Distance-aware default: pre-select the firms NEAREST the page city, not
    // the top-rated ones. Stops nationally-region-tagged firms hundreds of km
    // away (e.g. a Bavaria branch on a Hamburg page) from landing in the default
    // selection and being mailed a lead they'd never serve. Firms without coords
    // sort last. Falls back to the filtered order when no city coords are passed.
    let pool = filtered
    if (cityCoords) {
      pool = [...companies].sort((a, b) => {
        const da = a.lat != null && a.lng != null ? haversineKm(cityCoords.lat, cityCoords.lng, a.lat, a.lng) : Infinity
        const db = b.lat != null && b.lng != null ? haversineKm(cityCoords.lat, cityCoords.lng, b.lat, b.lng) : Infinity
        return da - db
      })
    }
    setSelectedIds(pool.slice(0, MAX_INQUIRE_ALL).map((c) => c.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // After the AI matcher runs, re-seed the pre-selection to the best-fit firms
  // (top MAX_INQUIRE_ALL, excluding the ones flagged too small). Deliberate
  // re-seed on a user action, so it may override the mount default. Runs only
  // when `requirements` changes (filtered/fitMap are already current by then).
  useEffect(() => {
    if (!requirements || !cityName) return
    const ordered = filtered.filter((c) => fitMap.get(c.id)?.fit !== 'weak')
    setSelectedIds(ordered.slice(0, MAX_INQUIRE_ALL).map((c) => c.id))
    setVisibleCount(PAGE_SIZE)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirements])

  // Reset the "from inquire-all CTA" flag when the dialog closes, so a later
  // reopen via the sticky pill is correctly classified as the legacy per-firm
  // flow, not as an inquire-all submission.
  const handleInquiryOpenChange = (next: boolean) => {
    setInquiryOpen(next)
    if (!next) setInquiryFromAllCta(false)
  }

  // 1-click anfrage to every firm currently visible after filters. Pre-selects
  // all `filtered` companies, opens the form modal directly, and tags the
  // submission so analytics can distinguish it from per-firm sammelanfrage.
  const handleInquireAll = () => {
    const ids = filtered.slice(0, MAX_INQUIRE_ALL).map((c) => c.id)
    setSelectedIds(ids)
    setInquiryFromAllCta(true)
    setInquiryOpen(true)
    trackPageEvent('listing_inquire_all_clicked', { matched_count: ids.length })
  }

  // AI matcher: send the free-text need to /api/ai-helper (requirements mode),
  // store the parsed requirements; fitMap + filtered + the re-select effect
  // below react to it. Pure enhancement — failure leaves the manual flow intact.
  const handleMatch = async () => {
    const desc = projectInput.trim()
    if (desc.length < 8) {
      setMatchError('Bitte beschreiben Sie kurz, was Sie heben möchten (z.B. „700 kg Glasscheibe, 8 m“).')
      return
    }
    setMatching(true)
    setMatchError(null)
    try {
      const res = await fetch('/api/ai-helper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'requirements', description: desc }),
      })
      if (!res.ok) throw new Error('match failed')
      const data = (await res.json()) as Requirements
      setRequirements(data)
      trackPageEvent('listing_ai_match', {
        has_capacity: data.capacity_kg != null,
        needs_glass: !!data.needs_glass,
      })
    } catch {
      setMatchError('Analyse momentan nicht verfügbar. Bitte wählen Sie die Anbieter manuell aus.')
    } finally {
      setMatching(false)
    }
  }

  // Reset pagination when filters change
  const handleFilterChange = (setter: (v: string) => void, value: string) => {
    setter(value)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <div>
      <Suspense fallback={null}>
        <PlzFromUrl onPlz={handlePlzFromUrl} />
      </Suspense>
      {/* AI fit-matcher: free-text need → requirements → re-rank + pre-select the
          best-fit firms. Discovery action (black CTA per the colour convention).
          City listings only. Pure enhancement; manual selection still works. */}
      {cityName && companies.length >= 2 && (
        <div className="mb-3 rounded-lg border border-gray-200 bg-white px-5 py-4">
          <label htmlFor="cl-need" className="block text-[14px] font-semibold text-gray-900 mb-1">
            Was möchten Sie heben?
          </label>
          <p className="text-[12px] text-gray-500 mb-2">
            Kurz beschreiben — wir sortieren die passenden Anbieter nach oben und wählen sie vor. Optional.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="cl-need"
              type="text"
              value={projectInput}
              onChange={(e) => setProjectInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleMatch() } }}
              placeholder="z.B. 700 kg Glasscheibe, 8 m über ein Haus, mit Bediener"
              className="flex-1 text-[14px] text-gray-700 border border-gray-200 rounded-md px-3 py-2 placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={handleMatch}
              disabled={matching}
              className="shrink-0 inline-flex items-center justify-center text-[14px] font-semibold text-white bg-gray-900 hover:bg-black rounded-md px-4 py-2 transition-colors disabled:opacity-60"
            >
              {matching ? 'Analysiere…' : 'Passende Anbieter finden'}
            </button>
          </div>
          {matchError && <p className="text-[12px] text-red-600 mt-2">{matchError}</p>}
          {requirements && !matchError && (
            <p className="text-[12px] text-gray-600 mt-2">
              Erkannt:{requirements.capacity_kg > 0 ? ` ca. ${fmtTons(requirements.capacity_kg)} t` : ' Gewicht offen'}{requirements.reach_m > 0 ? ` · ${requirements.reach_m} m Reichweite/Höhe` : ''}{requirements.needs_glass ? ' · Glassauger nötig' : ''}.{' '}
              {goodFitCount > 0 ? `${goodFitCount} besonders passende Anbieter oben.` : 'Anbieter nach Eignung sortiert.'}
              {weakFitCount > 0 ? ` ${weakFitCount} evtl. zu klein – nach unten sortiert.` : ''}
            </p>
          )}
        </div>
      )}
      {/* Primary CTA, 1-click sammelanfrage to all currently-visible firms.
          City-listings only (`cityName` set), type pages have too many firms
          country-wide for a single broadcast to make sense. The modal that
          opens lists every firm explicitly and lets the user deselect any
          before submit, so the flow stays DSGVO-explicit-consent. */}
      {cityName && filtered.length >= 2 && (
        <>
          <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-blue-200 bg-blue-50/60 px-5 py-4">
            <div className="min-w-0">
              <p className="text-[15px] font-semibold text-gray-900 mb-0.5">
                {inquireAllIsAll
                  ? `Anfrage an alle ${filtered.length} Anbieter in ${cityName} senden`
                  : `Anfrage an ${inquireAllCount} Anbieter in ${cityName} senden`}
              </p>
              <p className="text-[13px] text-gray-600">
                Je mehr Anbieter Sie anfragen, desto höher Ihre Chance auf eine schnelle Antwort und ein gutes Angebot. Die passenden Betriebe sind bereits vorausgewählt; entfernen Sie einfach, wen Sie nicht anfragen möchten. Kostenlos und unverbindlich.
              </p>
            </div>
            <button
              type="button"
              onClick={handleInquireAll}
              className="shrink-0 inline-flex items-center justify-center text-[14px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2.5 transition-colors w-full sm:w-auto"
            >
              Jetzt anfragen
            </button>
          </div>
          <p className="text-[11px] text-gray-400 mb-4">
            Hinweis: Gelistete Betriebe zahlen eine Vermittlungsgebühr. Die Reihenfolge richtet sich nach Eignung (Entfernung, Bewertung), nicht nach Bezahlung.
          </p>
        </>
      )}
      {/* Filter & sort bar */}
      {companies.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {/* PLZ distance search */}
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              maxLength={5}
              placeholder="PLZ eingeben"
              value={plzInput}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, '').slice(0, 5)
                setPlzInput(v)
                if (v.length === 5) lookupPlz(v)
                if (v.length < 5) { setUserCoords(null); setPlzLabel(''); if (sortBy === 'distance') setSortBy('rating') }
              }}
              className="w-[120px] text-[13px] text-gray-700 border border-gray-200 rounded-md px-2 py-1 placeholder:text-gray-400"
            />
            {plzLabel && (
              <span className="absolute -top-5 left-0 text-[11px] text-blue-600 whitespace-nowrap">
                {plzLabel}
              </span>
            )}
          </div>

          {showStateFilter && states.length > 1 && (
            <select
              value={filterState}
              onChange={(e) => handleFilterChange(setFilterState, e.target.value)}
              className="text-[13px] text-gray-500 bg-transparent border border-gray-200 rounded-md px-2 py-1"
            >
              <option value="">Alle Bundesländer</option>
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          )}

          <select
            value={filterMinRating}
            onChange={(e) => handleFilterChange(setFilterMinRating, e.target.value)}
            className="text-[13px] text-gray-500 bg-transparent border border-gray-200 rounded-md px-2 py-1"
          >
            <option value="">Alle Bewertungen</option>
            <option value="4.0">Ab 4.0 Sterne</option>
            <option value="4.5">Ab 4.5 Sterne</option>
          </select>

          {showCraneTypeFilter && availableCraneTypes.length > 1 && (
            <select
              value={filterCraneType}
              onChange={(e) => handleFilterChange(setFilterCraneType, e.target.value)}
              className="text-[13px] text-gray-500 bg-transparent border border-gray-200 rounded-md px-2 py-1"
            >
              <option value="">Alle Krantypen</option>
              {availableCraneTypes.map((ct) => (
                <option key={ct.id} value={ct.id}>{ct.name}</option>
              ))}
            </select>
          )}

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-[13px] text-gray-500 bg-transparent border border-gray-200 rounded-md px-2 py-1"
          >
            {userCoords && <option value="distance">Nächste Entfernung</option>}
            <option value="rating">Beste Bewertung</option>
            <option value="reviews">Meiste Bewertungen</option>
            <option value="name">Name A–Z</option>
          </select>

          <span className="text-[13px] text-gray-400 ml-auto">
            {totalCount && totalCount > filtered.length
              ? `${filtered.length} von ${totalCount} angezeigt`
              : `${filtered.length} Anbieter`}
          </span>
        </div>
      )}

      {/* Company list */}
      <div className="space-y-3">
        {visible.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            onRequestQuote={toggleCompany}
            selected={selectedIds.includes(company.id)}
            fit={fitMap.get(company.id)?.fit}
            fitNote={fitMap.get(company.id)?.note}
            referencePrice={referencePrice}
            distanceKm={distanceMap.get(company.id)}
            cityContext={cityContext}
            typeContext={typeContext}
          />
        ))}
      </div>

      {/* Empty state after filtering */}
      {filtered.length === 0 && companies.length > 0 && (
        <p className="text-center text-[13px] text-gray-400 py-8">
          Keine Anbieter für diese Filter gefunden.
        </p>
      )}

      {/* Load more */}
      {hasMore && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            className="px-6 py-2 border border-gray-200 hover:border-gray-300 text-[13px] text-gray-500 rounded-md transition-colors"
          >
            Weitere Anbieter laden ({filtered.length - visibleCount} verbleibend)
          </button>
        </div>
      )}

      <InquiryBar
        selectedCompanies={selectedCompanies}
        onRemoveCompany={removeCompany}
        onClearSelection={clearSelection}
        craneTypeId={craneTypeId}
        craneTypeName={craneTypeName}
        cityName={cityName}
        initialProjectDescription={initialProjectDescription}
        cityContext={cityContext}
        typeContext={typeContext}
        open={inquiryOpen}
        onOpenChange={handleInquiryOpenChange}
        triggeredFromInquireAll={inquiryFromAllCta}
      />
    </div>
  )
}
