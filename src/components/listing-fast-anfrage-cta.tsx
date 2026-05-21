'use client'

import Link from 'next/link'
import { trackPageEvent } from '@/lib/track'

interface ListingFastAnfrageCTAProps {
  /** Crane-type slug WITHOUT the "-mieten" suffix (e.g. "autokran"). */
  craneTypeSlug: string
  /** City slug when rendered on /<type>-mieten/<city>; null on type-only page. */
  citySlug?: string | null
}

export function ListingFastAnfrageCTA({ craneTypeSlug, citySlug }: ListingFastAnfrageCTAProps) {
  return (
    <Link
      href="/kran-mieten-preise"
      prefetch={false}
      onClick={() => {
        trackPageEvent('listing_cta_to_preise_clicked', {
          crane_type: craneTypeSlug,
          ...(citySlug ? { city: citySlug } : {}),
        })
      }}
      className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 rounded-lg border border-blue-200 bg-blue-50/50 px-5 py-4 hover:bg-blue-50 hover:border-blue-300 transition-colors"
    >
      <div className="min-w-0">
        <p className="text-[15px] font-semibold text-gray-900 mb-0.5">
          Kostenrechner: Was kostet Ihr Kran?, in 2 Minuten
        </p>
        <p className="text-[13px] text-gray-600">
          Bedarf eingeben, Tagespreis abschätzen, kostenlos Angebote von passenden Anbietern erhalten.
        </p>
      </div>
      <span className="shrink-0 inline-flex items-center justify-center text-[14px] font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2.5 transition-colors w-full sm:w-auto">
        Kostenrechner öffnen 
      </span>
    </Link>
  )
}
