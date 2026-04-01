import Link from 'next/link'
import { craneTypes } from '@/data/crane-types'
import { seoCities } from '@/data/cities-static'

interface FooterProps {
  /** Current crane type slug — used to make city links contextual */
  craneTypeSlug?: string
}

export function Footer({ craneTypeSlug }: FooterProps) {
  const cityLinkBase = craneTypeSlug || 'minikran-mieten'

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

          {/* Top Städte — contextual */}
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
