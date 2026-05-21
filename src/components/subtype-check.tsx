'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

/**
 * AI subtype-check addon for the Kostenrechner result panel. Watches the
 * "Projektdetails (optional)" textarea and, when the user describes
 * something that points to a different/specialized crane type than the
 * one the Q&A picked, surfaces a single hint with an optional CTA to
 * switch flows.
 *
 * Why: the calculator's deterministic Q&A only asks about weight, height
 * and duration, it can't tell that "13 Glasscheiben durch 3m Zufahrt
 * aufs Dach" is really a Spinnenkran (= specialized Minikran) job rather
 * than the Mobilkran the rules pick from those numbers. Free text +
 * Haiku catches that, banner gives the user a one-click out before they
 * submit a lead to the wrong supplier pool.
 *
 * Backed by /api/ai-helper mode=subtype-check (Haiku 4.5, ~$0.002/call).
 * Server-side guard skips the AI call if projectDetails < 20 chars, so
 * idle keystrokes don't cost anything.
 */
export function SubtypeCheck({
  chosenTypeName,
  chosenTypeSlug,
  weightTons,
  heightMeters,
  projectDetails,
  cityForRedirect,
}: {
  chosenTypeName: string
  /** slug WITHOUT the -mieten suffix, e.g. "mobilkran". */
  chosenTypeSlug: string
  weightTons?: number | null
  heightMeters?: number | null
  projectDetails: string
  /** When set, "Mit X weitermachen" CTA links to /<slug>-mieten?plz=… or
   *  /<slug>-mieten/<city>, same shape as resolveSearchTarget. */
  cityForRedirect?: string | null
}) {
  const [hint, setHint] = useState<{
    kind: 'switch_type' | 'subtype_note'
    suggestedSlug: string
    message: string
  } | null>(null)
  const [dismissed, setDismissed] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastQueryRef = useRef<string>('')

  useEffect(() => {
    if (dismissed) return
    const trimmed = projectDetails.trim()
    if (trimmed.length < 25 || !chosenTypeSlug) {
      setHint(null)
      return
    }

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      // Server also guards on this, but let's avoid the request entirely
      // when the input hasn't changed since last fetch.
      const cacheKey = `${chosenTypeSlug}|${trimmed}`
      if (lastQueryRef.current === cacheKey) return
      lastQueryRef.current = cacheKey
      try {
        const res = await fetch('/api/ai-helper', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mode: 'subtype-check',
            chosenTypeName,
            chosenTypeSlug,
            weightTons,
            heightMeters,
            projectDetails: trimmed,
          }),
        })
        if (!res.ok) return
        const data = (await res.json()) as {
          should_suggest: boolean
          hint_kind: 'none' | 'switch_type' | 'subtype_note'
          suggested_type_slug: string
          message: string
        }
        if (!data.should_suggest || data.hint_kind === 'none' || !data.message) {
          setHint(null)
          return
        }
        setHint({
          kind: data.hint_kind,
          suggestedSlug: data.suggested_type_slug,
          message: data.message,
        })
      } catch {
        // Silent, non-blocking addon, never bother the user with errors.
      }
    }, 1500)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [projectDetails, chosenTypeSlug, chosenTypeName, weightTons, heightMeters, dismissed])

  if (!hint || dismissed) return null

  // Build the redirect URL for switch_type CTAs. Same shape as the home
  // SearchBox uses (lib/search.ts), frontend-side equivalent kept simple
  // here because we only need PLZ-or-city + slug.
  let switchHref: string | null = null
  if (hint.kind === 'switch_type' && hint.suggestedSlug) {
    let path = `/${hint.suggestedSlug}-mieten`
    const loc = (cityForRedirect || '').trim()
    if (loc) {
      if (/^\d{5}$/.test(loc)) {
        path += `?plz=${loc}`
      } else {
        const slug = loc
          .toLowerCase()
          .replace(/ä/g, 'ae')
          .replace(/ö/g, 'oe')
          .replace(/ü/g, 'ue')
          .replace(/ß/g, 'ss')
          .replace(/[^a-z0-9-]+/g, '-')
          .replace(/^-|-$/g, '')
        if (slug) path += `/${slug}`
      }
    }
    if (projectDetails.trim()) {
      path += (path.includes('?') ? '&' : '?') + 'project=' + encodeURIComponent(projectDetails.trim().slice(0, 500))
    }
    switchHref = path
  }

  return (
    <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5">
      <div className="flex items-start gap-2">
        <span aria-hidden className="text-amber-600 text-[14px] leading-5">🤖</span>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-medium text-amber-900">
            {hint.kind === 'switch_type' ? 'Hinweis zum Krantyp' : 'Spezial-Variante beachten'}
          </p>
          <p className="text-[12px] text-amber-900/85 leading-snug mt-0.5">{hint.message}</p>
          {switchHref && (
            <Link
              href={switchHref}
              className="inline-block mt-1.5 text-[12px] font-medium text-amber-900 underline-offset-2 underline hover:no-underline"
            >
              Mit {hint.suggestedSlug.charAt(0).toUpperCase() + hint.suggestedSlug.slice(1)} weitermachen 
            </Link>
          )}
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Hinweis ausblenden"
          className="text-amber-400 hover:text-amber-700 text-[14px] leading-none px-1"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
