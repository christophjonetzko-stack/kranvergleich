'use client'

import { useState, useMemo, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

// Reads ?plz=XXXXX from URL on mount. Isolated in its own component so the
// useSearchParams() CSR bailout only suspends this tiny subtree, not the page.
function PlzFromUrl({ onPlz }: { onPlz: (plz: string) => void }) {
  const searchParams = useSearchParams()
  useEffect(() => {
    const plz = searchParams.get('plz')
    if (plz && /^\d{5}$/.test(plz)) onPlz(plz)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}
import { CompanyCard } from './company-card'
import { InquiryBar } from './inquiry-bar'
import type { CompanyWithCranes } from '@/lib/types'
import { getCraneTypeNameById } from '@/data/crane-types'
import { trackPageEvent } from '@/lib/track'

const PAGE_SIZE = 20

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

  // Lookup PLZ  coordinates via /api/cities
  const lookupPlz = useCallback(async (plz: string) => {
    if (!/^\d{5}$/.test(plz)) {
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

    return list
  }, [companies, sortBy, filterState, filterMinRating, filterCraneType, distanceMap])

  // Notify parent when filtered list changes (for map sync)
  useEffect(() => {
    onFilteredChange?.(filtered)
  }, [filtered, onFilteredChange])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const addCompany = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  const removeCompany = (id: string) => {
    setSelectedIds((prev) => prev.filter((i) => i !== id))
  }

  const clearSelection = () => setSelectedIds([])

  const selectedCompanies = companies.filter((c) => selectedIds.includes(c.id))

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
    const ids = filtered.map((c) => c.id)
    setSelectedIds(ids)
    setInquiryFromAllCta(true)
    setInquiryOpen(true)
    trackPageEvent('listing_inquire_all_clicked', { matched_count: ids.length })
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
      {/* Primary CTA, 1-click sammelanfrage to all currently-visible firms.
          City-listings only (`cityName` set), type pages have too many firms
          country-wide for a single broadcast to make sense. The modal that
          opens lists every firm explicitly and lets the user deselect any
          before submit, so the flow stays DSGVO-explicit-consent. */}
      {cityName && filtered.length >= 2 && (
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-blue-200 bg-blue-50/60 px-5 py-4">
          <div className="min-w-0">
            <p className="text-[15px] font-semibold text-gray-900 mb-0.5">
              Anfrage an alle {filtered.length} Anbieter in {cityName} senden
            </p>
            <p className="text-[13px] text-gray-600">
              Ein Formular, eine Anfrage. Sie erhalten individuelle Angebote von allen{' '}
              {filtered.length} Anbietern. Kostenlos &amp; unverbindlich.
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
            onRequestQuote={addCompany}
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
