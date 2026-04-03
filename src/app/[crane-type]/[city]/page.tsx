import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  getCraneTypes,
  getCraneTypeBySlug,
  getCityBySlug,
  getCities,
  getCompaniesForCraneAndCity,
  getCitiesWithMinCompanies,
  getCompanyCountsPerCity,
} from '@/lib/queries'
import { CompanyListWithForm } from '@/components/company-list-with-form'
import { CompanyMapWrapper } from '@/components/company-map-wrapper'
import { PriceTable } from '@/components/price-table'
import { FAQSection } from '@/components/faq-section'
import { getFAQsForCraneAndCity } from '@/data/faq'
import { getPriceForCraneType } from '@/data/crane-prices'
import { craneTypes as craneTypesList } from '@/data/crane-types'

export const revalidate = 86400

export async function generateStaticParams() {
  const craneTypes = await getCraneTypes()
  const allParams: { 'crane-type': string; city: string }[] = []

  for (const ct of craneTypes) {
    const cities = await getCitiesWithMinCompanies(ct.id, 3)
    for (const city of cities) {
      allParams.push({ 'crane-type': ct.slug, city: city.slug })
    }
  }

  return allParams
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ 'crane-type': string; city: string }>
}): Promise<Metadata> {
  const { 'crane-type': craneTypeSlug, city: citySlug } = await params
  const [craneType, city] = await Promise.all([
    getCraneTypeBySlug(craneTypeSlug),
    getCityBySlug(citySlug),
  ])

  if (!craneType || !city) return {}

  const companies = await getCompaniesForCraneAndCity(craneType.id, city.id)
  const price = getPriceForCraneType(craneType.slug)
  const priceStr = price ? `ab ${price.dayFrom}€/Tag` : ''
  const countStr = companies.length > 0 ? `${companies.length} Anbieter vergleichen` : 'Anbieter vergleichen'

  const title = `${craneType.name} mieten ${city.name}${priceStr ? ` — ${priceStr}` : ''} | ${countStr}`
  const description = `${craneType.name} mieten in ${city.name}${priceStr ? ` ${priceStr}` : ''}. ${companies.length > 0 ? `${companies.length} Anbieter` : 'Anbieter'} mit Preisen & Bewertungen vergleichen. Kostenlos Angebote anfragen.`
  const canonical = `/${craneTypeSlug}/${citySlug}`

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
    },
    // noindex pages with fewer than 3 companies to avoid thin content penalty
    ...(companies.length < 3 && { robots: { index: false, follow: true } }),
  }
}

export default async function CraneCityPage({
  params,
}: {
  params: Promise<{ 'crane-type': string; city: string }>
}) {
  const { 'crane-type': craneTypeSlug, city: citySlug } = await params

  const [craneType, city] = await Promise.all([
    getCraneTypeBySlug(craneTypeSlug),
    getCityBySlug(citySlug),
  ])

  if (!craneType || !city) notFound()

  const [companies, allCities] = await Promise.all([
    getCompaniesForCraneAndCity(craneType.id, city.id),
    getCities(),
  ])
  const faqs = getFAQsForCraneAndCity(craneType.slug, city.name, craneType.name)
  const price = getPriceForCraneType(craneType.slug)

  // Cross-links: other crane types in this city
  const otherCraneTypes = craneTypesList.filter((ct) => ct.slug !== craneType.slug)

  // Nearby cities by geodistance
  const nearbyCities = city.lat != null && city.lng != null
    ? allCities
        .filter((c) => c.slug !== city.slug && c.lat != null && c.lng != null)
        .map((c) => {
          const dlat = (c.lat! - city.lat!) * 111
          const dlng = (c.lng! - city.lng!) * 111 * Math.cos((city.lat! * Math.PI) / 180)
          return { ...c, dist: Math.sqrt(dlat * dlat + dlng * dlng) }
        })
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 8)
    : allCities.filter((c) => c.slug !== city.slug && c.state === city.state).slice(0, 8)

  const nearbyCityCounts = await getCompanyCountsPerCity(nearbyCities.map((c) => c.id))

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href={`/${craneType.slug}`} className="hover:text-gray-600">
          {craneType.name} mieten
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">{city.name}</span>
      </nav>

      {/* Hero mini */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
          {craneType.name} mieten in {city.name}
          {price && <span className="text-blue-600"> — ab {price.dayFrom}€/Tag</span>}
        </h1>
        <p className="text-[15px] text-gray-500">
          {companies.length} Anbieter in {city.name} und Umgebung
        </p>
      </div>

      <p className="text-[11px] text-gray-300 mb-6">Daten zuletzt geprüft: April 2026</p>

      {/* Table of Contents */}
      <nav className="mb-8 border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-medium text-gray-900 mb-2">Inhalt</p>
        <ul className="flex flex-col gap-1">
          {companies.length > 0 && (
            <li>
              <a href="#anbieter" className="text-[13px] text-blue-600 hover:underline">
                {companies.length} Anbieter in {city.name}
              </a>
            </li>
          )}
          {companies.some((c) => c.lat != null && c.lng != null) && (
            <li>
              <a href="#karte" className="text-[13px] text-blue-600 hover:underline">
                Karte
              </a>
            </li>
          )}
          <li>
            <a href="#preise" className="text-[13px] text-blue-600 hover:underline">
              Preise
            </a>
          </li>
          {faqs.length > 0 && (
            <li>
              <a href="#faq" className="text-[13px] text-blue-600 hover:underline">
                Häufige Fragen
              </a>
            </li>
          )}
          <li>
            <a href="#verwandte" className="text-[13px] text-blue-600 hover:underline">
              Verwandte Suchen
            </a>
          </li>
        </ul>
      </nav>

      {/* Company Listings */}
      {companies.length > 0 ? (
        <section id="anbieter" className="mb-10 scroll-mt-20">
          <CompanyListWithForm
            companies={companies}
            craneTypeId={craneType.id}
            craneTypeName={craneType.name}
            cityName={city.name}
            showCraneTypeFilter
          />
        </section>
      ) : (
        <section className="border border-gray-200 rounded-lg p-8 text-center mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Noch keine Anbieter in {city.name}
          </h2>
          <p className="text-sm text-gray-500">
            Wir erweitern unser Verzeichnis ständig. Schauen Sie bald wieder vorbei.
          </p>
        </section>
      )}

      {/* Map */}
      {(() => {
        const mappable = companies.filter((c) => c.lat != null && c.lng != null)
        if (mappable.length === 0) return null
        return (
          <section id="karte" className="mb-10 scroll-mt-20">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {craneType.name}-Anbieter in {city.name} — Karte
            </h2>
            <CompanyMapWrapper
              companies={mappable.map((c) => ({
                name: c.name,
                slug: c.slug,
                lat: c.lat!,
                lng: c.lng!,
                city: c.city,
                google_rating: c.google_rating,
              }))}
              centerLat={city.lat ?? 51.1657}
              centerLng={city.lng ?? 10.4515}
            />
          </section>
        )
      })()}

      {/* Price Table */}
      <div id="preise" className="mb-10 scroll-mt-20">
        <PriceTable craneTypeSlug={craneType.slug} />
      </div>

      {/* Intro text (unique per page for SEO) */}
      <div className="text-[14px] text-gray-500 leading-relaxed mb-10">
        <p>
          Sie suchen einen <strong className="text-gray-900">{craneType.name}</strong> zur Miete
          in <strong className="text-gray-900">{city.name}</strong> ({city.state})?
          Auf KranVergleich.de finden Sie {companies.length > 0 ? `${companies.length} ` : ''}
          {craneType.name}-Vermieter in {city.name} und Umgebung.
          {price && (
            <> Die Tagesmiete liegt zwischen ca. {price.dayFrom}€ und {price.dayTo}€ (Richtwerte, netto).
            {price.includesOperator
              ? ' Der Preis beinhaltet in der Regel einen qualifizierten Kranführer.'
              : ' Ein Kranführer ist nicht im Preis enthalten und kann separat gebucht werden.'}</>
          )}
        </p>
      </div>

      {/* FAQ */}
      <div id="faq" className="mb-10 scroll-mt-20">
        <FAQSection faqs={faqs} craneTypeName={craneType.name} cityName={city.name} />
      </div>

      {/* Cross-links */}
      <div id="verwandte" className="grid gap-6 sm:grid-cols-2 mb-10 scroll-mt-20">
        {/* Other crane types in this city */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 mb-3">
            Andere Krane in {city.name}
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {otherCraneTypes.map((ct) => (
              <Link
                key={ct.slug}
                href={`/${ct.slug}/${city.slug}`}
                className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors"
              >
                {ct.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Nearby cities */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 mb-3">
            {craneType.name} in der Nähe
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {nearbyCities.map((c) => {
              const count = nearbyCityCounts.get(c.id) ?? 0
              return (
                <Link
                  key={c.slug}
                  href={`/${craneType.slug}/${c.slug}`}
                  className="inline-flex items-center gap-1 text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors"
                >
                  {c.name}
                  {count > 0 && <span className="text-[11px] text-gray-400">{count}</span>}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://kranvergleich.de/' },
              { '@type': 'ListItem', position: 2, name: `${craneType.name} mieten`, item: `https://kranvergleich.de/${craneType.slug}` },
              { '@type': 'ListItem', position: 3, name: city.name },
            ],
          }),
        }}
      />
      {companies.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: `${craneType.name}-Vermieter in ${city.name}`,
              numberOfItems: companies.length,
              itemListElement: companies.slice(0, 10).map((company, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'LocalBusiness',
                  name: company.name,
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: company.city,
                    addressRegion: company.state,
                    postalCode: company.zip,
                    addressCountry: 'DE',
                  },
                  telephone: company.phone,
                  url: company.website,
                  ...(company.google_rating && {
                    aggregateRating: {
                      '@type': 'AggregateRating',
                      ratingValue: company.google_rating,
                      reviewCount: company.google_reviews_count,
                    },
                  }),
                },
              })),
            }),
          }}
        />
      )}
    </div>
  )
}
