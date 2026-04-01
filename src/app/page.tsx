import Link from 'next/link'
import { SearchBox } from '@/components/search-box'
import { PriceTable } from '@/components/price-table'
import { craneTypes } from '@/data/crane-types'
import { cranePrices } from '@/data/crane-prices'
import { seoCities } from '@/data/cities-static'

function getPriceFrom(slug: string): number | null {
  return cranePrices.find((p) => p.craneTypeSlug === slug)?.dayFrom ?? null
}

export default function HomePage() {
  const topCities = seoCities.slice(0, 12)

  return (
    <div>
      {/* Hero */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-3">
            Kran mieten in Deutschland
          </h1>
          <p className="text-base text-gray-500 mb-8">
            780 Anbieter vergleichen. Preise sehen. Kostenlos Angebote anfragen.
          </p>
          <SearchBox />
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xl font-semibold text-gray-900">780+</p>
              <p className="text-xs text-gray-500">Anbieter</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">50+</p>
              <p className="text-xs text-gray-500">Städte</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">100%</p>
              <p className="text-xs text-gray-500">Kostenlos</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">8</p>
              <p className="text-xs text-gray-500">Krantypen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Crane types grid — 2 columns */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-3 sm:grid-cols-2">
          {craneTypes.map((ct) => {
            const priceFrom = getPriceFrom(ct.slug)
            return (
              <Link
                key={ct.slug}
                href={`/${ct.slug}`}
                className="flex items-center justify-between gap-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <div className="min-w-0">
                  <p className="font-medium text-[15px] text-gray-900">{ct.name}</p>
                  <p className="text-[13px] text-gray-500 truncate">{ct.desc}</p>
                </div>
                {priceFrom && (
                  <span className="text-[12px] font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded shrink-0">
                    ab {priceFrom.toLocaleString('de-DE')}€/Tag
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </section>

      {/* Top Städte — pills */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Städte</h2>
        <div className="flex flex-wrap gap-2">
          {topCities.map((city) => (
            <Link
              key={city.slug}
              href={`/minikran-mieten/${city.slug}`}
              className="inline-flex items-center gap-1.5 text-[13px] bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full px-3.5 py-1.5 transition-colors"
            >
              {city.name}
              <span className="text-[11px] text-gray-400">{city.companyCount}</span>
            </Link>
          ))}
          <Link
            href="/minikran-mieten"
            className="inline-flex items-center text-[13px] text-blue-600 hover:text-blue-700 px-2 py-1.5 transition-colors"
          >
            Alle Städte &rarr;
          </Link>
        </div>
      </section>

      {/* Price table */}
      <section className="bg-gray-50 border-y border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Was kostet ein Kran? Preisübersicht 2026
          </h2>
          <PriceTable showAll />
        </div>
      </section>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'KranVergleich.de',
            url: 'https://kranvergleich.de',
            description: 'Vergleichsportal für Kranvermietung in Deutschland',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://kranvergleich.de/{crane_type}/{city}',
              'query-input': 'required name=crane_type required name=city',
            },
          }),
        }}
      />
    </div>
  )
}
