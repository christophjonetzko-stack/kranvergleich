'use client'

import { useState, useMemo } from 'react'
import { CompanyCard } from './company-card'
import { InquiryBar } from './inquiry-bar'
import type { CompanyWithCranes } from '@/lib/types'

const PAGE_SIZE = 20

type SortOption = 'rating' | 'reviews' | 'name'

interface CompanyListWithFormProps {
  companies: CompanyWithCranes[]
  craneTypeId?: string
  craneTypeName?: string
  cityName?: string
}

export function CompanyListWithForm({
  companies,
  craneTypeId,
  craneTypeName,
  cityName,
}: CompanyListWithFormProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [sortBy, setSortBy] = useState<SortOption>('rating')

  const sorted = useMemo(() => {
    const list = [...companies]
    switch (sortBy) {
      case 'rating':
        return list.sort((a, b) => (b.google_rating ?? 0) - (a.google_rating ?? 0))
      case 'reviews':
        return list.sort((a, b) => b.google_reviews_count - a.google_reviews_count)
      case 'name':
        return list.sort((a, b) => a.name.localeCompare(b.name, 'de'))
    }
  }, [companies, sortBy])

  const visible = sorted.slice(0, visibleCount)
  const hasMore = visibleCount < sorted.length

  const addCompany = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  const removeCompany = (id: string) => {
    setSelectedIds((prev) => prev.filter((i) => i !== id))
  }

  const clearSelection = () => setSelectedIds([])

  const selectedCompanies = companies.filter((c) => selectedIds.includes(c.id))

  return (
    <div>
      {/* Sort bar */}
      {companies.length > 1 && (
        <div className="flex items-center justify-between mb-3">
          <p className="text-[13px] text-gray-400">
            {companies.length} Anbieter
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-[13px] text-gray-500 bg-transparent border border-gray-200 rounded-md px-2 py-1"
          >
            <option value="rating">Beste Bewertung</option>
            <option value="reviews">Meiste Bewertungen</option>
            <option value="name">Name A–Z</option>
          </select>
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

      {/* Load more */}
      {hasMore && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            className="px-6 py-2 border border-gray-200 hover:border-gray-300 text-[13px] text-gray-500 rounded-md transition-colors"
          >
            Weitere Anbieter laden ({sorted.length - visibleCount} verbleibend)
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
