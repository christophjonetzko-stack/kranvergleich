'use client'

import { useState, useMemo } from 'react'
import { CompanyCard } from './company-card'
import { InquiryBar } from './inquiry-bar'
import type { CompanyWithCranes } from '@/lib/types'
import { getCraneTypeNameById } from '@/data/crane-types'

const PAGE_SIZE = 20

type SortOption = 'rating' | 'reviews' | 'name'

interface CompanyListWithFormProps {
  companies: CompanyWithCranes[]
  craneTypeId?: string
  craneTypeName?: string
  cityName?: string
  /** Show Bundesland filter (useful on crane type pages, not on city pages) */
  showStateFilter?: boolean
  /** Show crane type filter (useful on city pages with mixed crane types) */
  showCraneTypeFilter?: boolean
}

export function CompanyListWithForm({
  companies,
  craneTypeId,
  craneTypeName,
  cityName,
  showStateFilter = false,
  showCraneTypeFilter = false,
}: CompanyListWithFormProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [sortBy, setSortBy] = useState<SortOption>('rating')
  const [filterState, setFilterState] = useState<string>('')
  const [filterMinRating, setFilterMinRating] = useState<string>('')
  const [filterOperator, setFilterOperator] = useState<string>('')
  const [filterCraneType, setFilterCraneType] = useState<string>('')

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

    if (filterOperator === 'yes') {
      list = list.filter((c) => c.company_cranes.some((cc) => cc.has_operator))
    } else if (filterOperator === 'no') {
      list = list.filter((c) => c.company_cranes.some((cc) => !cc.has_operator))
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
    }

    return list
  }, [companies, sortBy, filterState, filterMinRating, filterOperator, filterCraneType])

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

          <select
            value={filterOperator}
            onChange={(e) => handleFilterChange(setFilterOperator, e.target.value)}
            className="text-[13px] text-gray-500 bg-transparent border border-gray-200 rounded-md px-2 py-1"
          >
            <option value="">Kranführer</option>
            <option value="yes">Mit Kranführer</option>
            <option value="no">Ohne Kranführer</option>
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
