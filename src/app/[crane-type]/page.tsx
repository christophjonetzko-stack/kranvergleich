import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getCraneTypeBySlug, getCraneTypes, getCities } from '@/lib/queries'
import { CompanyListWithForm } from '@/components/company-list-with-form'
import { PriceTable } from '@/components/price-table'
import { FAQSection } from '@/components/faq-section'
import { getFAQsForCraneType } from '@/data/faq'
import { getCompaniesForCraneType } from '@/lib/queries'

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

  const title = `${craneType.name} mieten — ${priceStr ? `${priceStr} | ` : ''}${count} Anbieter vergleichen`
  const description = `${craneType.name} mieten in Deutschland: ${count} Anbieter im Vergleich. ${craneType.description}${priceStr ? ` Preise ${priceStr}.` : ''} Kostenlos Angebote anfragen.`
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
  const topCities = cities.slice(0, 15)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">{craneType.name} mieten</span>
      </nav>

      {/* Hero mini */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
          {craneType.name} mieten
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
          {craneType.price_day_from && (
            <span className="text-blue-600 font-medium">
              ab {craneType.price_day_from.toLocaleString('de-DE')}€/Tag
            </span>
          )}
        </div>
      </div>

      {/* Price Table */}
      <div className="mb-8">
        <PriceTable craneTypeSlug={craneType.slug} />
      </div>

      {/* Company Listings */}
      {companies.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {craneType.name}-Anbieter in Deutschland ({companies.length})
          </h2>
          <CompanyListWithForm
            companies={companies}
            craneTypeId={craneType.id}
            craneTypeName={craneType.name}
            showStateFilter
          />
        </section>
      )}

      {/* FAQ */}
      <div className="mb-10">
        <FAQSection faqs={faqs} craneTypeName={craneType.name} />
      </div>

      {/* Cities pills */}
      {topCities.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {craneType.name} mieten in Ihrer Stadt
          </h2>
          <div className="flex flex-wrap gap-2">
            {topCities.map((city) => (
              <Link
                key={city.slug}
                href={`/${craneType.slug}/${city.slug}`}
                className="inline-flex items-center text-[13px] bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full px-3.5 py-1.5 transition-colors"
              >
                {city.name}
              </Link>
            ))}
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
