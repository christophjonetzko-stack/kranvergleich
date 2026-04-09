'use client'

import { useState, useCallback } from 'react'
import { CompanyListWithForm } from './company-list-with-form'
import { CompanyMapWrapper } from './company-map-wrapper'
import type { CompanyWithCranes } from '@/lib/types'

interface CompanySectionProps {
  companies: CompanyWithCranes[]
  craneTypeId?: string
  craneTypeName?: string
  cityName?: string
  showStateFilter?: boolean
  showCraneTypeFilter?: boolean
  centerLat: number
  centerLng: number
  referencePrice?: string | null
}

export function CompanySection({
  companies,
  craneTypeId,
  craneTypeName,
  cityName,
  showStateFilter,
  showCraneTypeFilter,
  centerLat,
  centerLng,
  referencePrice,
}: CompanySectionProps) {
  const [mapCompanies, setMapCompanies] = useState(() =>
    companies
      .filter((c) => c.lat != null && c.lng != null)
      .map((c) => ({
        name: c.name,
        slug: c.slug,
        lat: c.lat!,
        lng: c.lng!,
        city: c.city,
        google_rating: c.google_rating,
      }))
  )

  const handleFilteredChange = useCallback((filtered: CompanyWithCranes[]) => {
    setMapCompanies(
      filtered
        .filter((c) => c.lat != null && c.lng != null)
        .map((c) => ({
          name: c.name,
          slug: c.slug,
          lat: c.lat!,
          lng: c.lng!,
          city: c.city,
          google_rating: c.google_rating,
        }))
    )
  }, [])

  return (
    <>
      <CompanyListWithForm
        companies={companies}
        craneTypeId={craneTypeId}
        craneTypeName={craneTypeName}
        cityName={cityName}
        showStateFilter={showStateFilter}
        showCraneTypeFilter={showCraneTypeFilter}
        onFilteredChange={handleFilteredChange}
        referencePrice={referencePrice}
      />

      {mapCompanies.length > 0 && (
        <section id="karte" className="mt-10 mb-10 scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {craneTypeName ? `${craneTypeName}-Anbieter` : 'Anbieter'}{cityName ? ` in ${cityName}` : ' in Deutschland'} — Karte
            <span className="text-[13px] font-normal text-gray-400 ml-2">({mapCompanies.length})</span>
          </h2>
          <CompanyMapWrapper
            companies={mapCompanies}
            centerLat={centerLat}
            centerLng={centerLng}
          />
        </section>
      )}
    </>
  )
}
