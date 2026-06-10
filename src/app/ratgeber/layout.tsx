import type { ReactNode } from 'react'
import { PageEventTracker } from '@/components/page-event-tracker'
import { ListingFastAnfrageCTA } from '@/components/listing-fast-anfrage-cta'

export default function RatgeberLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageEventTracker />
      {children}
      {/* Lead-capture exit for every Ratgeber article. Articles were dead ends
          (best CTR pages on the site, zero lead path). Reuses the tracked
          listing CTA; ratgeber origin is distinguishable via page_path. */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <ListingFastAnfrageCTA craneTypeSlug="ratgeber" />
      </div>
    </>
  )
}
