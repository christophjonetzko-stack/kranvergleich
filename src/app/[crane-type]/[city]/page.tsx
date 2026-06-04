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
  getCompanyCountsPerCraneType,
  computeAggregateRating,
  getSiteStats,
} from '@/lib/queries'
import { CompanySection } from '@/components/company-section'
import { PriceTable } from '@/components/price-table'
import { FAQSection } from '@/components/faq-section'
import { NewsletterPanel } from '@/components/newsletter-panel'
import { PageEventTracker } from '@/components/page-event-tracker'
import { ListingFastAnfrageCTA } from '@/components/listing-fast-anfrage-cta'
import { getFAQsForCraneAndCity, dedupeFaqs } from '@/data/faq'
import { getPriceForCraneType } from '@/data/crane-prices'
import { craneTypes as craneTypesList } from '@/data/crane-types'
import { BRAND_NAME, BASE_URL, COUNTRY_LABEL } from '@/lib/country'
import { OG_IMAGE } from '@/lib/og-image'

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

  const { matching, others } = await getCompaniesForCraneAndCity(craneType.id, city.id)
  // "Anbieter" count = firms that actually offer this crane type. `others`
  // (firms serving the city without this type) only count toward the thin-
  // content noindex threshold so the page is not de-indexed when it still
  // carries regional substance.
  const companies = matching
  const totalForThreshold = matching.length + others.length
  const price = getPriceForCraneType(craneType.slug)
  const priceStr = price ? `ab ${price.dayFrom}€/Tag` : ''

  // Title: keep under ~41 chars before the layout's " | KranVergleich.de" suffix
  // (19 chars) so the full SERP title stays under Google's ~580px ≈ 60-char
  // truncation limit. Previously the title carried name + city + count + price
  // and ran to 63-69 chars, getting truncated and killing CTR. Price moved to
  // description; count alone drives the click. Long crane-type + long city
  // combos (Dachdeckerkran in Frankfurt am Main, etc.) drop the count to fit.
  const titleWithCount = `${craneType.name} mieten ${city.name}: ${companies.length} Anbieter`
  const title = companies.length > 0 && titleWithCount.length <= 41
    ? titleWithCount
    : `${craneType.name} mieten ${city.name}`
  // Description: ≤155 chars. Synonyms dropped (they crowd the snippet without
  // ranking benefit, meta-desc is not a ranking factor). Trailer compressed.
  const description = companies.length > 0
    ? `${craneType.name} mieten in ${city.name}${priceStr ? `: Kosten ${priceStr}` : ''}. ${companies.length} Anbieter in ${city.name} vergleichen. Bewertungen, Preise & kostenlose Angebote.`
    : `${craneType.name} mieten in ${city.name}${priceStr ? `: ${priceStr}` : ''}. Anbieter vergleichen, Preise & kostenlose Angebote anfragen.`
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
          images: [OG_IMAGE],
    },
    // noindex pages with fewer than 3 firms (type-matching + regional) to avoid
    // thin content penalty
    ...(totalForThreshold < 3 && { robots: { index: false, follow: true } }),
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

  const [companiesSplit, allCities, siteStats, craneTypeCounts] = await Promise.all([
    getCompaniesForCraneAndCity(craneType.id, city.id),
    getCities(),
    getSiteStats(),
    getCompanyCountsPerCraneType(),
  ])
  // `companies` = firms that actually offer this crane type (selectable for the
  // Sammelanfrage). `otherCompanies` = firms serving the city without this type,
  // shown read-only as regional context further down (no per-type Anfrage).
  const companies = companiesSplit.matching
  const otherCompanies = companiesSplit.others
  const totalForType = craneTypeCounts.get(craneType.id) ?? 0
  // Currency signal, refreshes monthly via 24h ISR (text only flips on
  // month boundary). Per AEO rules in seo-content-de skill: include "Stand"
  // timestamp so AI engines + Bauunternehmer see the page is current.
  const lastUpdated = new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
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

  // Manually written city FAQ (from Supabase) takes priority over template FAQ.
  // Override is city-wide (not crane-type-specific), local info like permits, costs, logistics.
  // Assembled here (after nearby cities) so the template can fold the real firm
  // count and the neighbouring cities into the answers as city-unique facts.
  const nearbyCityNames = nearbyCities
    .filter((c) => (nearbyCityCounts.get(c.id) ?? 0) > 0)
    .map((c) => c.name)
  const templateFaqs = getFAQsForCraneAndCity(craneType.slug, city.name, craneType.name, {
    companyCount: companies.length,
    nearbyCityNames,
  })
  const cityOverrideFaqs = (city.city_faq_override ?? []).map(f => ({
    question: f.question.replace('{craneName}', craneType.name),
    answer: f.answer.replace(/{craneName}/g, craneType.name),
  }))
  const faqs = dedupeFaqs([...cityOverrideFaqs, ...templateFaqs])

  return (
    <>
    <PageEventTracker />
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
          <h1 className="font-[var(--font-display)] font-extrabold text-neutral-950 leading-[1.0] tracking-[-0.02em] text-[28px] sm:text-[36px] lg:text-[40px] mb-2">
            {craneType.name} mieten {city.name}
            {price && <span className="text-blue-600">, ab {price.dayFrom}€/Tag</span>}
            {companies.length > 0 && (
              <span className="text-neutral-500 font-normal"> | {companies.length} Anbieter</span>
            )}
          </h1>
          <p className="text-[15px] text-neutral-600 mb-3">
            Mietpreise &amp; Bewertungen von Kranvermietern in {city.name} und Umgebung vergleichen
          </p>
          {/* Trust bar, scoped to city, same visual language as home hero */}
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-neutral-600 mb-2">
            {companies.length > 0 && (
              <>
                <li className="font-[var(--font-mono)] tabular-nums text-neutral-900 font-semibold">
                  {companies.length} Anbieter in {city.name}
                </li>
                <li aria-hidden className="text-neutral-300">·</li>
              </>
            )}
            {siteStats.avgRating !== null && (
              <>
                <li className="inline-flex items-center gap-1.5">
                  <span className="text-[#FFD100] text-[15px] leading-none" aria-hidden>★</span>
                  <span className="font-[var(--font-mono)] tabular-nums text-neutral-900 font-semibold">
                    {siteStats.avgRating.toString().replace('.', ',')}
                  </span>
                  <span>Google</span>
                </li>
                <li aria-hidden className="text-neutral-300">·</li>
              </>
            )}
            <li className="font-[var(--font-mono)] text-neutral-500">Stand: {lastUpdated}</li>
            <li aria-hidden className="text-neutral-300">·</li>
            <li>DSGVO-konform</li>
            <li aria-hidden className="text-neutral-300">·</li>
            <li>Kostenlos &amp; unverbindlich</li>
          </ul>
          <nav className="flex items-center gap-1 text-[12px] text-gray-400 flex-wrap">
            {companies.length > 0 && <><a href="#anbieter" className="hover:text-gray-600">Anbieter</a><span>·</span></>}
            {companies.some((c) => c.lat != null && c.lng != null) && <><a href="#karte" className="hover:text-gray-600">Karte</a><span>·</span></>}
            <a href="#preise" className="hover:text-gray-600">Preise</a>
            {faqs.length > 0 && <><span>·</span><a href="#faq" className="hover:text-gray-600">FAQ</a></>}
            <span>·</span><a href="#verwandte" className="hover:text-gray-600">Verwandte Suchen</a>
          </nav>
      </div>

      <p className="text-[11px] text-gray-300 mb-6">Daten zuletzt geprüft: April 2026</p>

      <ListingFastAnfrageCTA
        craneTypeSlug={craneType.slug.replace(/-mieten$/, '')}
        citySlug={city.slug}
      />

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
            referencePrice={price ? `ab ${price.dayFrom}€/Tag, Richtwert` : null}
            cityContext={city.slug}
            typeContext={craneType.slug}
          />
        </section>
      ) : (
        <section className="border border-gray-200 rounded-lg p-8 text-center mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Noch keine {craneType.name}-Anbieter in {city.name}
          </h2>
          <p className="text-sm text-gray-500">
            Wir erweitern unser Verzeichnis ständig. Schauen Sie bald wieder vorbei.
          </p>
        </section>
      )}

      {/* Other firms that serve the city but do not offer this crane type.
          Read-only regional context, no per-type Anfrage CTA, so trailer-crane
          requests can't be routed to a Minikran-only generalist (lead 788b037b). */}
      {otherCompanies.length > 0 && (
        <section id="weitere-anbieter" className="mb-10 scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Weitere Kranbetriebe in {city.name}
          </h2>
          <p className="text-[13px] text-gray-500 mb-4">
            Diese Betriebe sind in {city.name} und Umgebung tätig, führen {craneType.name} aber nicht im gelisteten Angebot.
            Für eine {craneType.name}-Anfrage nutzen Sie bitte die Anbieter oben.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {otherCompanies.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/anbieter/${c.slug}`}
                  className="block text-[13px] text-gray-600 hover:text-gray-900 border border-gray-100 hover:border-gray-200 rounded-md px-3 py-2 transition-colors"
                >
                  <span className="font-medium">{c.name}</span>
                  {c.city && <span className="text-gray-400"> · {c.city}</span>}
                </Link>
              </li>
            ))}
          </ul>
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
              Auf {BRAND_NAME} finden Sie {companies.length > 0 ? `${companies.length} ` : ''}
              {craneType.name}-Vermieter in {city.name} und Umgebung, mit Preisen, Google-Bewertungen und direkter Kontaktmöglichkeit.
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
                data-track-type={ct.slug.replace(/-mieten$/, '')}
                data-track-city={city.slug}
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
                  data-track-type={craneType.slug.replace(/-mieten$/, '')}
                  data-track-city={c.slug}
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

      {/* Hub upsell, boosts parent /{craneType.slug} authority for country-wide queries.
          Anchor text uses the hub's own SEO target ("{craneType.name} mieten") rather
          than generic "hier", internal-link power is anchor-text gated for Google.
          COUNTRY_LABEL keeps phrasing correct on kranvergleich.at (Österreich) vs .de. */}
      {totalForType > 0 && (
        <p className="text-[13px] text-gray-500 mb-4">
          Suchen Sie in ganz {COUNTRY_LABEL}?{' '}
          <Link href={`/${craneType.slug}`} className="text-blue-600 hover:underline">
            {craneType.name} mieten: alle {totalForType} Anbieter im Vergleich
          </Link>
          .
        </p>
      )}

      {/* Cross-link to main price page, boosts /kran-mieten-preise authority for "preisliste" queries */}
      <p className="text-[13px] text-gray-500 mb-10">
        Komplette Preisübersicht aller Krantypen:{' '}
        <Link href="/kran-mieten-preise" className="text-blue-600 hover:underline">
          Kran mieten Preisliste 2026
        </Link>
        {' '}mit Tages-, Wochen- und Monatspreisen im Vergleich.
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
              itemListElement: companies.slice(0, 10).map((company, i) => {
                const lo = company.price_day_from
                const hi = company.price_day_to
                const priceRange = lo && hi ? `€${lo}–${hi} / Tag` : lo ? `ab €${lo} / Tag` : null
                return {
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
                      addressCountry: company.country,
                    },
                    telephone: company.phone,
                    ...(company.website && { url: company.website }),
                    ...(priceRange && { priceRange }),
                    ...(company.google_rating && (company.google_reviews_count ?? 0) > 0 && {
                      aggregateRating: {
                        '@type': 'AggregateRating',
                        ratingValue: company.google_rating,
                        reviewCount: company.google_reviews_count,
                      },
                    }),
                  },
                }
              }),
            }),
          }}
        />
      )}
      {/* Product + AggregateOffer. AEO-citable regional price range.
          AggregateRating added when ≥3 listed firms have a Google rating
          (computeAggregateRating returns null otherwise, avoids cargo-cult
          schema on small-sample city×type combos). */}
      {price && companies.length > 0 && (() => {
        const aggRating = computeAggregateRating(companies)
        // Technical params (typical_*) ride on the Product so AI agents can match
        // user constraints (weight/height/reach) to the crane type without parsing
        // body copy. Strings, may include ranges like "8-60 t", pass-through.
        const additionalProperty: object[] = []
        if (craneType.typical_capacity_kg) additionalProperty.push({ '@type': 'PropertyValue', name: 'Typische Tragkraft', value: craneType.typical_capacity_kg })
        if (craneType.typical_height_m) additionalProperty.push({ '@type': 'PropertyValue', name: 'Typische Hubhöhe', value: craneType.typical_height_m })
        if (craneType.typical_reach_m) additionalProperty.push({ '@type': 'PropertyValue', name: 'Typische Ausladung', value: craneType.typical_reach_m })
        return (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Product',
                name: `${craneType.name} mieten ${city.name}`,
                description: `${craneType.name} in ${city.name} mieten. ${companies.length} Anbieter im Vergleich, Preise ab ${price.dayFrom}€/Tag.`,
                category: 'Kranvermietung',
                brand: { '@type': 'Brand', name: BRAND_NAME },
                ...(additionalProperty.length > 0 && { additionalProperty }),
                areaServed: { '@type': 'City', name: city.name },
                offers: {
                  '@type': 'AggregateOffer',
                  priceCurrency: 'EUR',
                  lowPrice: price.dayFrom,
                  highPrice: price.dayTo,
                  offerCount: companies.length,
                  availability: 'https://schema.org/InStock',
                  priceSpecification: {
                    '@type': 'UnitPriceSpecification',
                    price: price.dayFrom,
                    priceCurrency: 'EUR',
                    referenceQuantity: {
                      '@type': 'QuantitativeValue',
                      value: 1,
                      unitCode: 'DAY',
                    },
                  },
                },
                ...(aggRating && {
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: aggRating.ratingValue,
                    reviewCount: aggRating.reviewCount,
                    bestRating: 5,
                    worstRating: 1,
                  },
                }),
              }),
            }}
          />
        )
      })()}
    </div>
    <NewsletterPanel />
    </>
  )
}
