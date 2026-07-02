'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { craneTypes } from '@/data/crane-types'
import { seoCities } from '@/data/cities-static'
import { BRAND_NAME } from '@/lib/country'

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Krantypen */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Krantypen</h3>
            <ul className="space-y-1.5">
              {craneTypes.map((ct) => (
                <li key={ct.slug}>
                  <Link
                    href={`/${ct.slug}`}
                    data-track-type={ct.slug.replace(/-mieten$/, '')}
                    className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {ct.name} mieten
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Städte, contextual based on current crane type */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Top Städte</h3>
            <ul className="space-y-1.5">
              {seoCities.slice(0, 10).map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/${cityLinkBase}/${city.slug}`}
                    data-track-city={city.slug}
                    data-track-type={cityLinkBase.replace(/-mieten$/, '')}
                    className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    Kran mieten {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ratgeber & Preise — site-wide internal links to the money-pages and the
              Preisreport link-magnet, which were otherwise internally orphaned
              (0–1 inbound links). Distributes authority to the pos-25-45 pages. */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Ratgeber &amp; Preise</h3>
            <ul className="space-y-1.5">
              {[
                { href: '/kran-mieten-preise', label: 'Kran-Mietpreise' },
                { href: '/kostenrechner', label: 'Kostenrechner' },
                { href: '/preisliste', label: 'Preisliste 2026' },
                { href: '/kran-mieten-in-der-naehe', label: 'Kran in der Nähe' },
                { href: '/kran-preisreport-2026', label: 'Preisreport 2026' },
                { href: '/nachfrage-report', label: 'Nachfrage-Report 2026' },
                { href: '/ratgeber', label: 'Ratgeber' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Unternehmen + Rechtliches */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Unternehmen</h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/ueber-uns"
                  className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Über uns
                </Link>
              </li>
              <li>
                <a
                  href="mailto:christoph@kranvergleich.de?subject=Listing%20auf%20KranVergleich.de"
                  className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Für Kranvermieter
                </a>
              </li>
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
          &copy; {new Date().getFullYear()} {BRAND_NAME}. Alle Angaben ohne Gewähr.
        </div>
      </div>
    </footer>
  )
}
