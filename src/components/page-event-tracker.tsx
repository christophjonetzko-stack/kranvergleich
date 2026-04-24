'use client'

import { useEffect } from 'react'
import { trackPageEvent } from '@/lib/track'

/**
 * Drop-in analytics tracker for pillar content pages. Fires:
 *   - `scroll_depth_75` once when the visitor reaches 75% of scroll height.
 *   - `click_city_link` / `click_type_link` on anchors marked with
 *     `data-track-city` / `data-track-type` attributes.
 *
 * Uses document-level delegation so a single listener covers all links on the
 * page — server-rendered anchors get tracked without needing to be refactored
 * into client components. Safe to mount once per page.
 */
export function PageEventTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // --- Scroll depth (75%) ---
    let scrollFired = false
    const onScroll = () => {
      if (scrollFired) return
      const doc = document.documentElement
      const scrolled = window.scrollY + window.innerHeight
      const total = doc.scrollHeight
      if (total <= 0) return
      if (scrolled / total >= 0.75) {
        scrollFired = true
        trackPageEvent('scroll_depth_75')
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // --- Click delegation for city / type links ---
    const onClick = (e: MouseEvent) => {
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
    document.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return null
}
