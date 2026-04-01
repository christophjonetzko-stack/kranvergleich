'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { craneTypes } from '@/data/crane-types'
import { seoCities } from '@/data/cities-static'

function getCraneTypeSlugFromPath(pathname: string): string {
  // Extract crane type slug from paths like /autokran-mieten or /autokran-mieten/berlin
  const segment = pathname.split('/')[1] || ''
  if (craneTypes.some((ct) => ct.slug === segment)) {
    return segment
  }
  return 'minikran-mieten' // default
}

export function Footer() {
  const pathname = usePathname()
  const cityLinkBase = getCraneTypeSlugFromPath(pathname)

  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Krantypen */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Krantypen</h3>
            <ul className="space-y-1.5">
              {craneTypes.map((ct) => (
                <li key={ct.slug}>
                  <Link
                    href={`/${ct.slug}`}
                    className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {ct.name} mieten
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Städte — contextual based on current crane type */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Top Städte</h3>
            <ul className="space-y-1.5">
              {seoCities.slice(0, 10).map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/${cityLinkBase}/${city.slug}`}
                    className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    Kran mieten {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Rechtliches</h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/impressum"
                  className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Datenschutzerklärung
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-[12px] text-gray-400">
          &copy; {new Date().getFullYear()} KranVergleich.de — Alle Angaben ohne Gewähr.
        </div>
      </div>
    </footer>
  )
}
