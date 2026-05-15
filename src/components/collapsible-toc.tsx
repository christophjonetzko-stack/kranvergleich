'use client'

import { useState, type ReactNode } from 'react'

// Mobile-collapsed TOC. On viewports < md the TOC is closed by default with
// a tap-to-expand summary; on md+ the content is always visible and the
// toggle button is hidden. Added 2026-05-15 — viewport audit on
// /kran-mieten-preise showed the static TOC was eating ~350px of mobile
// fold above the wizard CTA. Server-rendered TOC links remain in the DOM
// for SEO / mobile-first indexing regardless of collapsed state.
export function CollapsibleToc({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <nav className="mb-8 border border-gray-200 rounded-lg p-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left md:hidden"
        aria-expanded={open}
        aria-controls="collapsible-toc-content"
      >
        <span className="text-[13px] font-medium text-gray-900">Inhalt</span>
        <span className="text-[13px] text-gray-500" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>
      <p className="hidden text-[13px] font-medium text-gray-900 md:mb-2 md:block">
        Inhalt
      </p>
      <div
        id="collapsible-toc-content"
        className={open ? 'mt-2 block' : 'hidden md:block'}
      >
        {children}
      </div>
    </nav>
  )
}
