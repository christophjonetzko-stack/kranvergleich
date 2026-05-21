'use client'

import { useEffect } from 'react'
import { trackPageEvent } from '@/lib/track'

/**
 * Drop-in analytics tracker for pillar content pages. Fires:
 *   - `scroll_depth_25` / `scroll_depth_50` / `scroll_depth_75` once each as the
 *     visitor crosses those scroll-height milestones (each event fires at most
 *     once per page-load; finer-grained funnel than a single 75% flag).
 *   - `click_city_link` / `click_type_link` on anchors marked with
 *     `data-track-city` / `data-track-type` attributes (via `pointerdown`
 *     capture, see the listener body for the navigation-timing rationale).
 *
 * Uses document-level delegation so a single listener covers all links on the
 * page, server-rendered anchors get tracked without needing to be refactored
 * into client components. Safe to mount once per page.
 */
export function PageEventTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // --- Scroll depth (25% / 50% / 75%) ---
    // 3 milestones give a coarse funnel: who skims past the fold (25%), who
    // engages mid-page (50%), who reads to the end (75%). Each fires at most
    // once. Listener detaches when the deepest milestone is reached.
    const scrollFired: Record<number, boolean> = { 25: false, 50: false, 75: false }
    const thresholds: Array<[number, 'scroll_depth_25' | 'scroll_depth_50' | 'scroll_depth_75']> = [
      [0.25, 'scroll_depth_25'],
      [0.50, 'scroll_depth_50'],
      [0.75, 'scroll_depth_75'],
    ]
    const onScroll = () => {
      const doc = document.documentElement
      const scrolled = window.scrollY + window.innerHeight
      const total = doc.scrollHeight
      if (total <= 0) return
      const ratio = scrolled / total
      for (const [pct, eventName] of thresholds) {
        const key = Math.round(pct * 100)
        if (!scrollFired[key] && ratio >= pct) {
          scrollFired[key] = true
          trackPageEvent(eventName)
        }
      }
      if (scrollFired[25] && scrollFired[50] && scrollFired[75]) {
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // --- Pointerdown delegation for city / type links ---
    // We listen on `pointerdown` (capture), not `click`. Reason: with `click`,
    // the browser fires our handler in the same task that React runs Link's
    // onClick  router.push()  starts unmounting the page. Even though
    // sendBeacon is supposed to survive navigation, in practice Chrome was
    // dropping the beacon on production (verified 2026-04-24, capture-phase
    // click was already in place but only server-side curl tests landed,
    // zero rows from real users). `pointerdown` fires earlier in the input
    // pipeline (pointerdown  pointerup  click), giving the beacon a clean
    // tick to enqueue before any navigation starts. Trade-off: we count
    // intent (press) instead of completed clicks, which slightly over-counts
    // but is fine for relative city-popularity ranking.
    const onPointerDown = (e: PointerEvent) => {
      // Primary (left) and auxiliary (middle = open-in-new-tab) only.
      // Skip right-click and other buttons, those are noise, not navigation.
      if (e.button !== 0 && e.button !== 1) return

      const target = e.target
      if (!(target instanceof Element)) return
      const anchor = target.closest<HTMLAnchorElement>('a[data-track-city], a[data-track-type]')
      if (!anchor) return

      const city = anchor.getAttribute('data-track-city')
      const craneType = anchor.getAttribute('data-track-type')

      if (city) {
        trackPageEvent('click_city_link', {
          city,
          ...(craneType ? { crane_type: craneType } : {}),
        })
      } else if (craneType) {
        trackPageEvent('click_type_link', { crane_type: craneType })
      }
    }
    document.addEventListener('pointerdown', onPointerDown, true)

    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('pointerdown', onPointerDown, true)
    }
  }, [])

  return null
}
