import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  getCraneTypes,
  getCraneTypeBySlug,
  getCityBySlug,
  getCompaniesForCraneAndCity,
  getCitiesWithMinCompanies,
} from '@/lib/queries'
import { CompanyListWithForm } from '@/components/company-list-with-form'
import { PriceTable } from '@/components/price-table'
import { FAQSection } from '@/components/faq-section'
import { getFAQsForCraneAndCity } from '@/data/faq'
import { getPriceForCraneType } from '@/data/crane-prices'
import { craneTypes as craneTypesList } from '@/data/crane-types'
import { seoCities } from '@/data/cities-static'

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

  const companies = await getCompaniesForCraneAndCity(craneType.id, city.id)
  const faqs = getFAQsForCraneAndCity(craneType.slug, city.name, craneType.name)
  const price = getPriceForCraneType(craneType.slug)

  // Cross-links: other crane types in this city
  const otherCraneTypes = craneTypesList.filter((ct) => ct.slug !== craneType.slug)

  // Nearby cities (same state first, then by companyCount)
  const nearbyCities = seoCities
    .filter((c) => c.slug !== city.slug)
    .sort((a, b) => {
      const aState = a.state === city.state ? 0 : 1
      const bState = b.state === city.state ? 0 : 1
      if (aState !== bState) return aState - bState
      return b.companyCount - a.companyCount
    })
    .slice(0, 8)

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

      {/* Company Listings */}
      {companies.length > 0 ? (
        <section className="mb-10">
          <CompanyListWithForm
            companies={companies}
            craneTypeId={craneType.id}
            craneTypeName={craneType.name}
            cityName={city.name}
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

      {/* Price Table */}
      <div className="mb-10">
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
      <div className="mb-10">
        <FAQSection faqs={faqs} craneTypeName={craneType.name} cityName={city.name} />
      </div>

      {/* Cross-links */}
      <div className="grid gap-6 sm:grid-cols-2 mb-10">
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
            {nearbyCities.map((c) => (
              <Link
                key={c.slug}
                href={`/${craneType.slug}/${c.slug}`}
                className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors"
              >
                {c.name}
              </Link>
            ))}
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
