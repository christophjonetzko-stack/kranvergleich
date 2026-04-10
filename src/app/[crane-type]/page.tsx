import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getCraneTypeBySlug, getCraneTypes, getCities, getCompaniesForCraneType, getCompanyCountsPerCity } from '@/lib/queries'
import { CompanySection } from '@/components/company-section'
import { PriceTable } from '@/components/price-table'
import { FAQSection } from '@/components/faq-section'
import { getFAQsForCraneType } from '@/data/faq'
import { getPriceForCraneType } from '@/data/crane-prices'
import { craneTypes as craneTypesList } from '@/data/crane-types'
import { getCraneIcon } from '@/components/crane-icons'

export const revalidate = 86400

export async function generateStaticParams() {
  const craneTypes = await getCraneTypes()
  return craneTypes.map((ct) => ({ 'crane-type': ct.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ 'crane-type': string }>
}): Promise<Metadata> {
  const { 'crane-type': craneTypeSlug } = await params
  const craneType = await getCraneTypeBySlug(craneTypeSlug)
  if (!craneType) return {}

  const companies = await getCompaniesForCraneType(craneType.id)
  const count = companies.length
  const priceStr = craneType.price_day_from ? `ab ${craneType.price_day_from}€/Tag` : ''

  const ctInfo = craneTypesList.find((c) => c.slug === craneTypeSlug)
  const synonymStr = ctInfo?.synonyms?.slice(0, 2).join(', ') ?? ''

  const title = `${craneType.name} mieten — ${priceStr ? `${priceStr} | ` : ''}Preisliste & ${count} Anbieter`
  const description = `${craneType.name}${synonymStr ? ` (${synonymStr})` : ''} mieten oder leihen: ${count} Anbieter vergleichen. ${craneType.description}${priceStr ? ` Kosten ${priceStr}.` : ''} Preisliste 2026 mit Tages-, Wochen- & Monatspreisen. Kostenlos Angebote anfragen.`
  const canonical = `/${craneTypeSlug}`

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
  }
}

export default async function CraneTypePage({
  params,
}: {
  params: Promise<{ 'crane-type': string }>
}) {
  const { 'crane-type': craneTypeSlug } = await params
  const craneType = await getCraneTypeBySlug(craneTypeSlug)
  if (!craneType) notFound()

  const [companies, cities] = await Promise.all([
    getCompaniesForCraneType(craneType.id),
    getCities(),
  ])

  const faqs = getFAQsForCraneType(craneType.slug)
  const price = getPriceForCraneType(craneType.slug)
  const topCities = cities.slice(0, 15)
  const cityCounts = await getCompanyCountsPerCity(topCities.map((c) => c.id))

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">{craneType.name} mieten</span>
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
          {craneType.name} mieten
          {craneType.price_day_from && (
            <span className="text-blue-600"> — ab {craneType.price_day_from.toLocaleString('de-DE')}€/Tag</span>
          )}
        </h1>
        <p className="text-[15px] text-gray-500 mb-3">
          {craneType.description}
        </p>

        {/* Specs inline */}
        <div className="flex flex-wrap gap-4 text-[13px] text-gray-500">
          {companies.length > 0 && (
            <span>{companies.length} Anbieter</span>
          )}
          {craneType.typical_capacity_kg && (
            <span>Tragkraft: {craneType.typical_capacity_kg}</span>
          )}
          {craneType.typical_height_m && (
            <span>Hakenhöhe: {craneType.typical_height_m}</span>
          )}
        </div>
        </div>
      </div>

      <p className="text-[11px] text-gray-300 mb-6">Daten zuletzt geprüft: April 2026</p>

      {/* Table of Contents */}
      <nav className="mb-8 border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-medium text-gray-900 mb-2">Inhalt</p>
        <ul className="flex flex-col gap-1">
          <li>
            <a href="#preise" className="text-[13px] text-blue-600 hover:underline">
              Preisübersicht
            </a>
          </li>
          {companies.length > 0 && (
            <li>
              <a href="#anbieter" className="text-[13px] text-blue-600 hover:underline">
                {companies.length} Anbieter
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
          {faqs.length > 0 && (
            <li>
              <a href="#faq" className="text-[13px] text-blue-600 hover:underline">
                Häufige Fragen
              </a>
            </li>
          )}
          {topCities.length > 0 && (
            <li>
              <a href="#staedte" className="text-[13px] text-blue-600 hover:underline">
                {craneType.name} in Ihrer Stadt
              </a>
            </li>
          )}
        </ul>
      </nav>

      {/* Synonym H2 — SEO for "leihen", "ausleihen", "Verleih", "Vermietung" variants */}
      {(() => {
        const ctInfo = craneTypesList.find((c) => c.slug === craneType.slug)
        const synonyms = ctInfo?.synonyms ?? []
        const plural = ctInfo?.namePlural ?? `${craneType.name}e`
        return (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {craneType.name} leihen, ausleihen oder mieten? {plural} Vermietung in ganz Deutschland
            </h2>
            <p className="text-[14px] text-gray-500 leading-relaxed">
              Ob Sie einen <strong className="text-gray-900">{craneType.name}</strong> mieten, leihen oder ausleihen möchten —
              {' '}auf KranVergleich.de vergleichen Sie {plural}-Vermietung, {craneType.name}verleih und Anbieter im direkten Preisvergleich.
              {synonyms.length > 0 && (
                <> Der {craneType.name} wird auch als <strong className="text-gray-900">{synonyms.slice(0, 4).join(', ')}</strong>
                {synonyms.length > 4 ? ` oder ${synonyms[4]}` : ''} bezeichnet.</>
              )}
              {' '}Die Vermieter bieten Tages-, Wochen- und Monatsmiete — mit oder ohne Kranführer, inkl. Transport.
            </p>
          </section>
        )
      })()}

      {/* Price Table */}
      <div id="preise" className="mb-8 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          {craneType.name} mieten — Preisliste 2026 mit Tages-, Wochen- und Monatspreisen
        </h2>
        <PriceTable craneTypeSlug={craneType.slug} />
      </div>

      {/* Cost breakdown — targets "kosten pro tag/stunde/woche/monat" queries */}
      {price && (
        <section className="mb-10 border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Was kostet ein {craneType.name}? Kosten pro Tag, Stunde, Woche & Monat
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
            <div className="bg-gray-50 rounded-md p-3">
              <p className="text-[11px] text-gray-400 mb-1">{craneType.name} mieten — Kosten pro Tag</p>
              <p className="text-gray-700">
                Ein {craneType.name} kostet zwischen <strong>{price.dayFrom.toLocaleString('de-DE')}€ und {price.dayTo.toLocaleString('de-DE')}€ pro Tag</strong> (netto).
                {price.includesOperator ? ' Kranführer inklusive.' : ' Ohne Kranführer.'}
              </p>
            </div>
            <div className="bg-gray-50 rounded-md p-3">
              <p className="text-[11px] text-gray-400 mb-1">{craneType.name} Kosten pro Woche</p>
              <p className="text-gray-700">
                Wochenmiete: <strong>{price.weekFrom.toLocaleString('de-DE')}€ – {price.weekTo.toLocaleString('de-DE')}€</strong>.
                {' '}Ersparnis gegenüber Tagesmiete: ca. 15–25%.
              </p>
            </div>
            <div className="bg-gray-50 rounded-md p-3">
              <p className="text-[11px] text-gray-400 mb-1">{craneType.name} Kosten pro Monat</p>
              <p className="text-gray-700">
                Monatsmiete: <strong>{price.monthFrom.toLocaleString('de-DE')}€ – {price.monthTo.toLocaleString('de-DE')}€</strong>.
                {' '}Ersparnis ca. 30–40% gegenüber Einzeltagen.
              </p>
            </div>
            <div className="bg-gray-50 rounded-md p-3">
              <p className="text-[11px] text-gray-400 mb-1">Was kostet ein {craneType.name} pro Stunde?</p>
              <p className="text-gray-700">
                {price.includesOperator
                  ? `Stundenpreis ca. ${Math.round(price.dayFrom / 8).toLocaleString('de-DE')}–${Math.round(price.dayTo / 6).toLocaleString('de-DE')}€/h inkl. Kranführer. Mindestmietdauer meist 4 Stunden.`
                  : `Stundensätze sind bei ${craneType.name} unüblich — der ${craneType.name} wird tageweise vermietet. Kurzzeitmiete auf Anfrage.`}
              </p>
            </div>
          </div>
          <p className="text-[11px] text-gray-400 mt-3">
            Alle Preise netto, zzgl. MwSt. Richtwerte — die tatsächlichen {craneType.name}-Mietpreise hängen von Tragkraft, Einsatzdauer und Standort ab.
            {' '}Transport (An-/Abfahrt) kommt je nach Entfernung hinzu (ca. 150–500€).
          </p>
        </section>
      )}

      {/* Company Listings + Map (synced via filters) */}
      {companies.length > 0 && (
        <section id="anbieter" className="mb-10 scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {craneType.name}-Anbieter in Deutschland ({companies.length})
          </h2>
          <CompanySection
            companies={companies}
            craneTypeId={craneType.id}
            craneTypeName={craneType.name}
            showStateFilter
            centerLat={51.1657}
            centerLng={10.4515}
            referencePrice={price ? `ab ${price.dayFrom}€/Tag — Richtwert` : null}
          />
        </section>
      )}

      {/* Intro text (unique per crane type for SEO + synonyms) */}
      {(() => {
        const ctInfo = craneTypesList.find((c) => c.slug === craneType.slug)
        const synonyms = ctInfo?.synonyms ?? []
        return (
          <div className="text-[14px] text-gray-500 leading-relaxed mb-10">
            <p>
              Sie möchten einen <strong className="text-gray-900">{craneType.name}</strong>
              {synonyms.length > 0 && <> (auch {synonyms.slice(0, 3).join(', ')} genannt)</>}
              {' '}mieten oder leihen in Deutschland? Auf KranVergleich.de finden Sie{' '}
              {companies.length > 0 ? `${companies.length} ` : ''}{craneType.name}-Vermieter im direkten Vergleich.
              {price && (
                <> Die Tagesmiete liegt zwischen ca. {price.dayFrom.toLocaleString('de-DE')}€ und{' '}
                {price.dayTo.toLocaleString('de-DE')}€ (Richtwerte, netto).
                {price.includesOperator
                  ? ' Der Preis beinhaltet in der Regel einen qualifizierten Kranführer.'
                  : ' Ein Kranführer ist nicht im Preis enthalten und kann separat gebucht werden.'}</>
              )}
              {' '}Vergleichen Sie Bewertungen, Preise und Leistungen — und fordern Sie kostenlos Angebote an.
            </p>
          </div>
        )
      })()}

      {/* FAQ */}
      <div id="faq" className="mb-10 scroll-mt-20">
        <FAQSection faqs={faqs} craneTypeName={craneType.name} />
      </div>

      {/* Cities pills */}
      {topCities.length > 0 && (
        <section id="staedte" className="mb-10 scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {craneType.name} mieten in Ihrer Stadt
          </h2>
          <div className="flex flex-wrap gap-2">
            {topCities.map((city) => {
              const count = cityCounts.get(city.id) ?? 0
              return (
                <Link
                  key={city.slug}
                  href={`/${craneType.slug}/${city.slug}`}
                  className="inline-flex items-center gap-1.5 text-[13px] bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full px-3.5 py-1.5 transition-colors"
                >
                  {city.name}
                  {count > 0 && <span className="text-[11px] text-gray-400">{count}</span>}
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* BreadcrumbList structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://kranvergleich.de/' },
              { '@type': 'ListItem', position: 2, name: `${craneType.name} mieten` },
            ],
          }),
        }}
      />
    </div>
  )
}
