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
import { CompanySection } from '@/components/company-section'
import { PriceTable } from '@/components/price-table'
import { FAQSection } from '@/components/faq-section'
import { getFAQsForCraneAndCity } from '@/data/faq'
import { getPriceForCraneType } from '@/data/crane-prices'
import { craneTypes as craneTypesList } from '@/data/crane-types'
import { getCraneIcon } from '@/components/crane-icons'

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

  const ctInfo = craneTypesList.find((c) => c.slug === craneTypeSlug)
  const synonymStr = ctInfo?.synonyms?.slice(0, 2).join(', ') ?? ''

  const title = `${craneType.name} mieten ${city.name}${priceStr ? ` — ${priceStr}` : ''} | ${countStr}`
  const description = `${craneType.name}${synonymStr ? ` (${synonymStr})` : ''} mieten in ${city.name}${priceStr ? `: Kosten ${priceStr}` : ''}. ${companies.length > 0 ? `${companies.length} Anbieter` : 'Anbieter'} in ${city.name} & Umgebung vergleichen. Preisliste, Bewertungen & kostenlose Angebote.`
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
  // Manually written city FAQ (from Supabase) takes priority over template FAQ.
  // Override is city-wide (not crane-type-specific) — local info like permits, costs, logistics.
  const templateFaqs = getFAQsForCraneAndCity(craneType.slug, city.name, craneType.name)
  const cityOverrideFaqs = (city.city_faq_override ?? []).map(f => ({
    question: f.question.replace('{craneName}', craneType.name),
    answer: f.answer.replace(/{craneName}/g, craneType.name),
  }))
  const faqs = [...cityOverrideFaqs, ...templateFaqs]
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
      <div className="mb-8 flex items-start gap-4">
        {(() => {
          const Icon = getCraneIcon(craneType.slug)
          return (
            <div className="shrink-0 hidden sm:block text-gray-600">
              <Icon className="w-16 h-16" />
            </div>
          )
        })()}
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
            {craneType.name} mieten {city.name}
            {price && <span className="text-blue-600"> — ab {price.dayFrom}€/Tag</span>}
            {companies.length > 0 && (
              <span className="text-gray-500 font-normal"> | {companies.length} Anbieter</span>
            )}
          </h1>
          <p className="text-[15px] text-gray-500 mb-1">
            Mietpreise &amp; Bewertungen von Kranvermietern in {city.name} und Umgebung vergleichen
          </p>
          <nav className="flex items-center gap-1 text-[12px] text-gray-400 flex-wrap">
            {companies.length > 0 && <><a href="#anbieter" className="hover:text-gray-600">Anbieter</a><span>·</span></>}
            {companies.some((c) => c.lat != null && c.lng != null) && <><a href="#karte" className="hover:text-gray-600">Karte</a><span>·</span></>}
            <a href="#preise" className="hover:text-gray-600">Preise</a>
            {faqs.length > 0 && <><span>·</span><a href="#faq" className="hover:text-gray-600">FAQ</a></>}
            <span>·</span><a href="#verwandte" className="hover:text-gray-600">Verwandte Suchen</a>
          </nav>
        </div>
      </div>

      <p className="text-[11px] text-gray-300 mb-6">Daten zuletzt geprüft: April 2026</p>

      {/* Company Listings + Map (synced via filters) */}
      {companies.length > 0 ? (
        <section id="anbieter" className="mb-10 scroll-mt-20">
          <CompanySection
            companies={companies}
            craneTypeId={craneType.id}
            craneTypeName={craneType.name}
            cityName={city.name}
            showCraneTypeFilter
            centerLat={city.lat ?? 51.1657}
            centerLng={city.lng ?? 10.4515}
            referencePrice={price ? `ab ${price.dayFrom}€/Tag — Richtwert` : null}
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
      <div id="preise" className="mb-10 scroll-mt-20">
        <PriceTable craneTypeSlug={craneType.slug} />
      </div>

      {/* Intro text (unique per page for SEO) */}
      {(() => {
        const ctInfo = craneTypesList.find((c) => c.slug === craneType.slug)
        const synonyms = ctInfo?.synonyms ?? []
        return (
          <div className="text-[14px] text-gray-500 leading-relaxed mb-10">
            <p>
              Sie möchten einen <strong className="text-gray-900">{craneType.name}</strong>
              {synonyms.length > 0 && <> ({synonyms.slice(0, 2).join(', ')})</>}
              {' '}mieten oder leihen in <strong className="text-gray-900">{city.name}</strong> ({city.state})?
              Auf KranVergleich.de finden Sie {companies.length > 0 ? `${companies.length} ` : ''}
              {craneType.name}-Vermieter in {city.name} und Umgebung — mit Preisen, Google-Bewertungen und direkter Kontaktmöglichkeit.
              {price && (
                <> Die {craneType.name}-Kosten in {city.name} liegen bei ca. {price.dayFrom}€–{price.dayTo}€ pro Tag (Richtwerte, netto).
                {price.includesOperator
                  ? ' Der Preis beinhaltet in der Regel einen qualifizierten Kranführer.'
                  : ' Ein Kranführer ist nicht im Preis enthalten und kann separat gebucht werden.'}</>
              )}
              {' '}Vergleichen Sie Angebote und sparen Sie bei Ihrer {craneType.name}-Miete in {city.name}.
            </p>
          </div>
        )
      })()}

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

      {/* Cross-link to main price page — boosts /kran-mieten-preise authority for "preisliste" queries */}
      <p className="text-[13px] text-gray-500 mb-10">
        Komplette Preisübersicht aller Krantypen:{' '}
        <Link href="/kran-mieten-preise" className="text-blue-600 hover:underline">
          Kran mieten Preisliste 2026
        </Link>
        {' '}— Tages-, Wochen- und Monatspreise im Vergleich.
      </p>

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
                  ...(company.website && { url: company.website }),
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
