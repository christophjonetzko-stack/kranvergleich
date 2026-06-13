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
  // Demoted from a full-width primary box to a quiet secondary line: the city
  // page now has a single visual primary (the "Was möchten Sie heben?" matcher).
  // Link target + tracking unchanged so the internal-link/SEO value to
  // /kran-mieten-preise and the listing_cta_to_preise_clicked signal survive.
  return (
    <p className="mb-6 text-[13px] text-gray-500">
      Lieber selbst kalkulieren?{' '}
      <Link
        href="/kran-mieten-preise"
        prefetch={false}
        onClick={() => {
          trackPageEvent('listing_cta_to_preise_clicked', {
            crane_type: craneTypeSlug,
            ...(citySlug ? { city: citySlug } : {}),
          })
        }}
        className="font-medium text-blue-600 hover:underline"
      >
        Zum Kostenrechner
      </Link>
      {' '}— Tagespreis in 2 Minuten abschätzen.
    </p>
  )
}
