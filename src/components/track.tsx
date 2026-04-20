'use client'

import { useEffect, type AnchorHTMLAttributes, type ReactNode } from 'react'

// Firm engagement tracker. Client-only because /anbieter/[slug] is cached
// with revalidate=86400 — SSR hits would only fire on cache revalidation,
// missing 99% of real views. Uses navigator.sendBeacon so the request
// survives immediate navigation (tel:, mailto:, external website).

type EventType = 'profile_view' | 'phone_click' | 'email_click' | 'website_click'

interface TrackingContext {
  firmId: string
  cityContext?: string | null
  typeContext?: string | null
}

function fire(eventType: EventType, ctx: TrackingContext) {
  const payload = JSON.stringify({
    firm_id: ctx.firmId,
    event_type: eventType,
    city_context: ctx.cityContext ?? null,
    type_context: ctx.typeContext ?? null,
  })
  try {
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }))
      return
    }
    // sendBeacon missing (old browsers) — fall back to keepalive fetch so the
    // request still finishes during navigation.
    fetch('/api/track', {
      method: 'POST',
      body: payload,
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
    }).catch(() => {})
  } catch {
    // Tracking must never break UX — swallow everything.
  }
}

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  firmId: string
  eventType: Exclude<EventType, 'profile_view'>
  cityContext?: string | null
  typeContext?: string | null
  children: ReactNode
}

export function TrackedLink({
  firmId,
  eventType,
  cityContext,
  typeContext,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    fire(eventType, { firmId, cityContext, typeContext })
    onClick?.(e)
  }
  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  )
}

export function TrackProfileView({ firmId }: { firmId: string }) {
  useEffect(() => {
    fire('profile_view', { firmId })
  }, [firmId])
  return null
}
