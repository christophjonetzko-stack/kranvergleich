'use client'

import { useState, type ReactNode } from 'react'

// Path 4 checkout trigger. The firm arrives at /path4?firma=<slug> (linked from
// the claim CTA on its profile or from the soft-pilot outreach mail). On click
// we read the slug from the URL — deliberately NOT useSearchParams, so the page
// stays static (revalidate) and does not de-opt to dynamic. With a slug we open
// a Stripe Checkout session; without one (a generic visitor) we fall back to the
// contact mailbox so the firm can tell us which company to verify.
export function Path4Cta({
  children,
  mailtoHref,
  className,
}: {
  children: ReactNode
  mailtoHref: string
  className?: string
}) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    if (loading) return
    const firma = new URLSearchParams(window.location.search).get('firma')
    if (!firma) {
      window.location.href = mailtoHref
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/path4-checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ companySlug: firma }),
      })
      const data = (await res.json()) as { url?: string }
      if (res.ok && data.url) {
        window.location.href = data.url
        return
      }
      // Endpoint reachable but no session (firm not found, pricing env missing,
      // Stripe down) — fall back to contact so the CTA is never a dead end.
      window.location.href = mailtoHref
    } catch {
      window.location.href = mailtoHref
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      data-cta="path4-checkout"
      className={
        className ??
        'inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60'
      }
    >
      {loading ? 'Einen Moment …' : children}
    </button>
  )
}
