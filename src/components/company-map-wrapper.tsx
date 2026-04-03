'use client'

import dynamic from 'next/dynamic'

const CompanyMap = dynamic(
  () => import('@/components/company-map').then((m) => m.CompanyMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[350px] sm:h-[420px] rounded-lg bg-gray-100 animate-pulse" />
    ),
  }
)

interface MapCompany {
  name: string
  slug: string
  lat: number
  lng: number
  city: string
  google_rating: number | null
}

interface CompanyMapWrapperProps {
  companies: MapCompany[]
  centerLat: number
  centerLng: number
}

export function CompanyMapWrapper({ companies, centerLat, centerLng }: CompanyMapWrapperProps) {
  return <CompanyMap companies={companies} centerLat={centerLat} centerLng={centerLng} />
}
