'use client'

import { useEffect } from 'react'
import { parseUtmFromSearch, setFirstTouchUtm } from '@/lib/utm'

/**
 * Mount-once UTM capture for first-touch attribution (mig 027, 2026-05-12).
 *
 * On every page that includes the root layout, this component reads the
 * current URL's utm_* params and writes them to sessionStorage.kv_utm
 * IFF no payload is stored yet. First-touch wins: later navigations
 * within the same browser tab don't overwrite, so a LinkedIn-attributed
 * visitor stays LinkedIn-attributed for the whole session even after
 * they browse pages without UTM in the URL.
 *
 * DSGVO: sessionStorage is session-scoped (clears on tab close); §25(2)
 * TDDDG treats it as strictly necessary for the comparison-portal flow,
 * no consent banner gating needed. See src/lib/utm.ts header for the
 * legal posture in detail.
 *
 * SSR-safe: returns null, real work happens in useEffect after hydrate.
 */
export function UtmCapture() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const payload = parseUtmFromSearch(window.location.search)
    setFirstTouchUtm(payload)
  }, [])
  return null
}
