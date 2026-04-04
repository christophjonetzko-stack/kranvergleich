'use client'

import { useState } from 'react'
import Link from 'next/link'
import { craneTypes } from '@/data/crane-types'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">KranVergleich.de</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {craneTypes.slice(0, 3).map((ct) => (
              <Link
                key={ct.slug}
                href={`/${ct.slug}`}
                className="px-2.5 py-1.5 text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
              >
                {ct.name}
              </Link>
            ))}
            <Link
              href="/kran-mieten-preise"
              className="px-2.5 py-1.5 text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
            >
              Preisliste
            </Link>
            <div className="relative group">
              <button className="px-2.5 py-1.5 text-[13px] text-gray-500 hover:text-gray-900 transition-colors">
                Mehr &#9662;
              </button>
              <div className="absolute right-0 top-full hidden group-hover:block bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-[180px]">
                {craneTypes.slice(3).map((ct) => (
                  <Link
                    key={ct.slug}
                    href={`/${ct.slug}`}
                    className="block px-4 py-2 text-[13px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    {ct.name} mieten
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-500 hover:text-gray-900"
            aria-label="Menü öffnen"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileOpen ? (
                <path d="M5 5l10 10M15 5L5 15" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-gray-200 bg-white">
          <div className="max-w-5xl mx-auto px-4 py-3 space-y-1">
            {craneTypes.map((ct) => (
              <Link
                key={ct.slug}
                href={`/${ct.slug}`}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-[14px] text-gray-500 hover:text-gray-900 transition-colors"
              >
                {ct.name} mieten
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-2 mt-2">
              <Link
                href="/kran-mieten-preise"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-[14px] text-gray-500 hover:text-gray-900 transition-colors"
              >
                Preisliste
              </Link>
              <Link
                href="/ratgeber/welchen-kran-brauche-ich"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-[14px] text-gray-500 hover:text-gray-900 transition-colors"
              >
                Ratgeber
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
