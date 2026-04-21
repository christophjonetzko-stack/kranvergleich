'use client'

import { useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from 'react'

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
