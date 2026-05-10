'use client'

import { useEffect, useState, useSyncExternalStore, type AnchorHTMLAttributes, type ReactNode } from 'react'
import { craneTypes } from '@/data/crane-types'

// Firm engagement tracker. Client-only because /anbieter/[slug] is cached
// with revalidate=86400 — SSR hits would only fire on cache revalidation,
// missing 99% of real views. Uses navigator.sendBeacon so the request
// survives immediate navigation (tel:, mailto:, external website).

type EventType =
  | 'profile_view'
  | 'phone_reveal'
  | 'phone_click'
  | 'email_click'
  | 'website_click'
  | 'map_click'
  | 'form_submit'

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

interface RevealablePhoneProps {
  firmId: string
  phone: string
  cityContext?: string | null
  typeContext?: string | null
  className?: string
  /** Optional icon rendered before the label on both states. */
  icon?: ReactNode
  /** Label shown BEFORE the number is revealed (e.g., "Anrufen"). */
  children: ReactNode
  /** Optional prefix rendered before the number AFTER reveal (e.g., "Rufen Sie an: "). */
  revealedPrefix?: string
}

// Two-step phone CTA: first click unmasks the number and logs phone_reveal;
// the revealed `<a href="tel:…">` logs phone_click on activation. Gives us
// a high-intent signal even when the user reads the number and dials from a
// different device (common on desktop, where `tel:` opens Skype/FaceTime).
export function RevealablePhone({
  firmId,
  phone,
  cityContext,
  typeContext,
  className,
  icon,
  children,
  revealedPrefix,
}: RevealablePhoneProps) {
  const [revealed, setRevealed] = useState(false)

  if (!revealed) {
    return (
      <button
        type="button"
        onClick={() => {
          fire('phone_reveal', { firmId, cityContext, typeContext })
          setRevealed(true)
        }}
        className={className}
        aria-label="Telefonnummer anzeigen"
      >
        {icon}
        {children}
      </button>
    )
  }

  return (
    <a
      href={`tel:${phone}`}
      onClick={() => fire('phone_click', { firmId, cityContext, typeContext })}
      className={className}
      aria-label={`Anrufen: ${phone}`}
    >
      {icon}
      {revealedPrefix}
      {phone}
    </a>
  )
}

// Crane-type URL segments (e.g. "autokran-mieten") used by listing pages
// /[crane-type]/[city]. Source of truth: data/crane-types.ts.
const CRANE_TYPE_URL_SEGMENTS = new Set(craneTypes.map((t) => t.slug))

// Sniff city/type context from same-origin referrer URL. Used on profile pages
// /anbieter/[slug] where the page URL itself carries no listing context — we
// want to know which listing brought the visitor here so website_click events
// can be attributed back to a city × type combo.
function parseReferrerContext(): { cityContext: string | null; typeContext: string | null } {
  if (typeof window === 'undefined' || !document.referrer) {
    return { cityContext: null, typeContext: null }
  }
  try {
    const url = new URL(document.referrer)
    if (url.origin !== window.location.origin) {
      return { cityContext: null, typeContext: null }
    }
    const segs = url.pathname.split('/').filter(Boolean)
    if (segs[0] && CRANE_TYPE_URL_SEGMENTS.has(segs[0])) {
      // Match DB convention: type slug stored without "-mieten" suffix
      // (consistent with cost-calculator.tsx and the 10 existing rows).
      const typeContext = segs[0].replace(/-mieten$/, '')
      const cityContext = segs[1] || null
      return { typeContext, cityContext }
    }
    return { cityContext: null, typeContext: null }
  } catch {
    return { cityContext: null, typeContext: null }
  }
}

// Stable empty result returned during SSR. useSyncExternalStore requires the
// server snapshot to be referentially stable across calls.
const EMPTY_REFERRER_CTX = { cityContext: null, typeContext: null } as const

// Memoize the client snapshot so useSyncExternalStore sees a stable reference
// across renders (document.referrer is immutable after first navigation).
let cachedReferrerCtx: { cityContext: string | null; typeContext: string | null } | null = null
function getClientReferrerCtx() {
  if (cachedReferrerCtx === null) cachedReferrerCtx = parseReferrerContext()
  return cachedReferrerCtx
}

function useReferrerContext(): { cityContext: string | null; typeContext: string | null } {
  return useSyncExternalStore(
    () => () => {}, // nothing to subscribe to — referrer is immutable
    getClientReferrerCtx,
    () => EMPTY_REFERRER_CTX,
  )
}

interface TrackedWebsiteLinkProps extends Omit<TrackedLinkProps, 'eventType' | 'cityContext' | 'typeContext'> {
  // Optional explicit overrides (rare — usually omit and let referrer sniff fill in).
  cityContextOverride?: string | null
  typeContextOverride?: string | null
}

// Drop-in replacement for `<TrackedLink eventType="website_click" />` that
// auto-fills city_context / type_context from document.referrer. Use on
// profile pages where the URL itself carries no listing context.
export function TrackedWebsiteLink({
  cityContextOverride,
  typeContextOverride,
  ...props
}: TrackedWebsiteLinkProps) {
  const referrerCtx = useReferrerContext()
  return (
    <TrackedLink
      {...props}
      eventType="website_click"
      cityContext={cityContextOverride ?? referrerCtx.cityContext}
      typeContext={typeContextOverride ?? referrerCtx.typeContext}
    />
  )
}
