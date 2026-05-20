import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getCompaniesByBrand, getSiteStats } from '@/lib/queries'
import { BRANDS, getBrandBySlug, getAllBrandSlugs } from '@/data/brands'
import { craneTypes as craneTypesList } from '@/data/crane-types'
import { CompanySection } from '@/components/company-section'
import { FAQSection } from '@/components/faq-section'
import { PageEventTracker } from '@/components/page-event-tracker'
import { alternatesFor } from '@/lib/alternates'
import { BRAND_NAME, COUNTRY_LABEL } from '@/lib/country'
import { OG_IMAGE } from '@/lib/og-image'

export const revalidate = 86400

export async function generateStaticParams() {
  return getAllBrandSlugs().map((brand) => ({ brand }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>
}): Promise<Metadata> {
  const { brand: brandSlug } = await params
  const brand = getBrandBySlug(brandSlug)
  if (!brand) return {}

  const companies = await getCompaniesByBrand(brand.name)
  const title = companies.length > 0
    ? `${brand.displayName} mieten ${COUNTRY_LABEL} — ${companies.length} Anbieter`
    : `${brand.displayName} mieten in ${COUNTRY_LABEL}`
  const description = companies.length > 0
    ? `${brand.displayName}-Krane mieten: ${companies.length} Vermieter in ${COUNTRY_LABEL} vergleichen. ${brand.introShort.slice(0, 110)}`
    : brand.introShort

  const canonical = `/marke/${brand.slug}`
  return {
    title,
    description,
    alternates: alternatesFor(canonical),
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      images: [OG_IMAGE],
    },
    ...(companies.length < 3 && { robots: { index: false, follow: true } }),
  }
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ brand: string }>
}) {
  const { brand: brandSlug } = await params
  const brand = getBrandBySlug(brandSlug)
  if (!brand) notFound()

  const [companies, siteStats] = await Promise.all([
    getCompaniesByBrand(brand.name),
    getSiteStats(),
  ])

  const lastUpdated = new Date().toLocaleDateString('de-DE', {
    month: 'long',
    year: 'numeric',
  })

  const relatedTypes = craneTypesList.filter((ct) =>
    brand.relatedCraneTypes.includes(ct.slug)
  )
  const otherBrands = BRANDS.filter((b) => b.slug !== brand.slug)

  return (
    <>
      <PageEventTracker />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-[13px] text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600">
            Startseite
          </Link>
          <span className="mx-1.5">/</span>
          <Link href="/marke" className="hover:text-gray-600">
            Kranmarken
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-gray-900">{brand.displayName}</span>
        </nav>

        {/* Hero */}
        <div className="mb-8">
          <h1 className="font-[var(--font-display)] font-extrabold text-neutral-950 leading-[1.0] tracking-[-0.02em] text-[28px] sm:text-[36px] lg:text-[40px] mb-2">
            {brand.displayName}-Krane mieten in {COUNTRY_LABEL}
            {companies.length > 0 && (
              <span className="text-neutral-500 font-normal"> | {companies.length} Anbieter</span>
            )}
          </h1>
          <p className="text-[15px] text-neutral-600 mb-3">
            Vermieter von {brand.displayName}-Kranen vergleichen — Preise, Bewertungen und kostenlose Angebote
          </p>

          {/* Trust bar */}
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-neutral-600 mb-2">
            {companies.length > 0 && (
              <>
                <li className="font-[var(--font-mono)] tabular-nums text-neutral-900 font-semibold">
                  {companies.length} Anbieter mit {brand.displayName}
                </li>
                <li aria-hidden className="text-neutral-300">
                  ·
                </li>
              </>
            )}
            {siteStats.avgRating !== null && (
              <>
                <li className="inline-flex items-center gap-1.5">
                  <span className="text-[#FFD100] text-[15px] leading-none" aria-hidden>
                    ★
                  </span>
                  <span className="font-[var(--font-mono)] tabular-nums text-neutral-900 font-semibold">
                    {siteStats.avgRating.toString().replace('.', ',')}
                  </span>
                  <span>Google</span>
                </li>
                <li aria-hidden className="text-neutral-300">
                  ·
                </li>
              </>
            )}
            <li className="font-[var(--font-mono)] text-neutral-500">Stand: {lastUpdated}</li>
            <li aria-hidden className="text-neutral-300">·</li>
            <li>DSGVO-konform</li>
            <li aria-hidden className="text-neutral-300">·</li>
            <li>Kostenlos &amp; unverbindlich</li>
          </ul>

          <nav className="flex items-center gap-1 text-[12px] text-gray-400 flex-wrap">
            {companies.length > 0 && (
              <>
                <a href="#anbieter" className="hover:text-gray-600">Anbieter</a>
                <span>·</span>
              </>
            )}
            <a href="#info" className="hover:text-gray-600">Über {brand.displayName}</a>
            {relatedTypes.length > 0 && (
              <>
                <span>·</span>
                <a href="#krantypen" className="hover:text-gray-600">Krantypen</a>
              </>
            )}
            <span>·</span>
            <a href="#faq" className="hover:text-gray-600">FAQ</a>
          </nav>
        </div>

        {/* Companies — actual catalog data, takes top spot above the fold */}
        {companies.length > 0 ? (
          <section id="anbieter" className="mb-10 scroll-mt-20">
            <CompanySection
              companies={companies}
              showCraneTypeFilter
              centerLat={51.1657}
              centerLng={10.4515}
              typeContext={`brand-${brand.slug}`}
            />
          </section>
        ) : (
          <section className="border border-gray-200 rounded-lg p-8 text-center mb-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Noch keine {brand.displayName}-Vermieter im Katalog
            </h2>
            <p className="text-sm text-gray-500">
              Wir erweitern unser Verzeichnis ständig. Über die allgemeine Sammelanfrage können
              Sie {brand.displayName}-Angebote von Vermietern erhalten, die diese Marke parallel
              zu anderen führen.
            </p>
          </section>
        )}

        {/* Brand info */}
        <section id="info" className="mb-10 scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Über {brand.displayName} — {brand.origin}, gegründet {brand.founded}
          </h2>
          <p className="text-[14px] text-gray-600 leading-relaxed">{brand.introLong}</p>
        </section>

        {/* Related crane types */}
        {relatedTypes.length > 0 && (
          <section id="krantypen" className="mb-10 scroll-mt-20">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {brand.displayName}-Krantypen im Katalog
            </h2>
            <p className="text-[13px] text-gray-500 mb-4">
              {brand.displayName} ist in {COUNTRY_LABEL} vor allem bei diesen Krantypen verbreitet —
              hier finden Sie Vermieter mit passender Fahrzeugklasse:
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedTypes.map((ct) => (
                <Link
                  key={ct.slug}
                  href={`/${ct.slug}`}
                  className="flex items-center justify-between bg-white border border-neutral-200 hover:border-neutral-900 rounded px-4 py-3 transition-colors"
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-neutral-400 font-[var(--font-mono)] mb-1">
                      Krantyp
                    </p>
                    <h3 className="font-semibold text-[15px] text-neutral-950">{ct.name} mieten</h3>
                  </div>
                  <span
                    aria-hidden
                    className="text-neutral-300 group-hover:text-neutral-900 transition-all text-base"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section id="faq" className="mb-10 scroll-mt-20">
          <FAQSection
            faqs={brand.faqs}
            craneTypeName={`${brand.displayName}-Kran`}
            cityName={COUNTRY_LABEL}
          />
        </section>

        {/* Other brands */}
        {otherBrands.length > 0 && (
          <section className="mb-10">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">
              Andere Kranmarken im Katalog
            </h2>
            <div className="flex flex-wrap gap-2">
              {otherBrands.map((b) => (
                <Link
                  key={b.slug}
                  href={`/marke/${b.slug}`}
                  className="inline-flex items-center gap-1.5 text-[13px] bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full px-3.5 py-1.5 transition-colors"
                >
                  {b.displayName}
                </Link>
              ))}
            </div>
          </section>
        )}

        <p className="text-[11px] text-gray-300 mt-10">
          Daten zuletzt geprüft: {lastUpdated}. Quelle: {BRAND_NAME}-Katalog mit
          LLM-extrahierten Markendaten aus den Vermieter-Selbstbeschreibungen.
        </p>
      </div>
    </>
  )
}
