'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { CompanyCard } from './company-card'
import { InquiryBar } from './inquiry-bar'
import type { CompanyWithCranes } from '@/lib/types'
import { getCraneTypeNameById } from '@/data/crane-types'

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
  /** Called when filtered company list changes — use to sync map */
  onFilteredChange?: (companies: CompanyWithCranes[]) => void
  /** Reference price label for companies without own pricing */
  referencePrice?: string | null
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

  // Lookup PLZ → coordinates via /api/cities
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

  // Pre-fill PLZ from URL (?plz=12345) on mount — used by SearchBox redirect
  const searchParams = useSearchParams()
  useEffect(() => {
    const plz = searchParams.get('plz')
    if (plz && /^\d{5}$/.test(plz) && !plzInput) {
      setPlzInput(plz)
      lookupPlz(plz)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Distance map: company id → km (only when userCoords set)
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

  // Reset pagination when filters change
  const handleFilterChange = (setter: (v: string) => void, value: string) => {
    setter(value)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <div>
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
            {filtered.length} Anbieter
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
      />
    </div>
  )
}
