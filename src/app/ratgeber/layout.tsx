import type { ReactNode } from 'react'
import { PageEventTracker } from '@/components/page-event-tracker'

export default function RatgeberLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageEventTracker />
      {children}
    </>
  )
}
