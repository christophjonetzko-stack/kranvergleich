import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { craneTypes } from '@/data/crane-types'
import { cranePrices } from '@/data/crane-prices'
import { seoCities } from '@/data/cities-static'
import { getSiteStats } from '@/lib/queries'
import { alternatesFor } from '@/lib/alternates'
import { COUNTRY_LABEL, BRAND_NAME } from '@/lib/country'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const { anbieterCount } = await getSiteStats()
  return {
    title: `Kranverleih — Krane mieten in ganz ${COUNTRY_LABEL}`,
    description: `Kranverleih in ${COUNTRY_LABEL}: ${anbieterCount}+ Anbieter für Minikran, Autokran, Baukran und mehr. Preise vergleichen und kostenlos Angebote anfragen.`,
    alternates: alternatesFor('/kranverleih'),
    openGraph: {
      title: `Kranverleih — Krane mieten in ganz ${COUNTRY_LABEL}`,
      description: `Kranverleih in ${COUNTRY_LABEL}: ${anbieterCount}+ Anbieter für Minikran, Autokran, Baukran und mehr. Preise vergleichen und kostenlos Angebote anfragen.`,
      type: 'website',
      url: '/kranverleih',
    },
  }
}

function getPriceFrom(slug: string): number | null {
  return cranePrices.find((p) => p.craneTypeSlug === slug)?.dayFrom ?? null
}

export default async function KranverleihPage() {
  const { anbieterCount } = await getSiteStats()
  const topCities = seoCities.slice(0, 12)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Kranverleih</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Kranverleih — Krane mieten in ganz {COUNTRY_LABEL}
      </h1>
      <p className="text-[15px] text-gray-500 mb-8 max-w-3xl">
        Sie suchen einen Kranverleih in Ihrer Nähe? Auf KranVergleich.de finden Sie über {anbieterCount}
        {' '}Kranverleiher in ganz {COUNTRY_LABEL}. Ob Minikran, Autokran oder Baukran — vergleichen Sie
        Preise, lesen Sie Bewertungen und fragen Sie kostenlos Angebote an.
      </p>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Alle Krantypen im Überblick</h2>
        {/* Equipment-catalog cards — portrait thumbnail anchors each card,
            mono labels + tabular numerics + yellow hover edge match the
            industrial spec-sheet language used on the homepage table. */}
        <div className="grid gap-3 sm:grid-cols-2">
          {craneTypes.map((ct) => {
            const priceFrom = getPriceFrom(ct.slug)
            return (
              <Link
                key={ct.slug}
                href={`/${ct.slug}`}
                className="group relative flex bg-white border border-neutral-200 hover:border-neutral-900 transition-colors overflow-hidden"
              >
                {/* Yellow stripe slides in on hover */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-0 group-hover:w-1 bg-[#FFD100] transition-all z-10"
                />

                {/* Portrait thumbnail — 4:5, fills card height */}
                <div className="relative shrink-0 w-28 sm:w-32 self-stretch bg-neutral-50 border-r border-neutral-200">
                  <Image
                    src={ct.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 128px, 112px"
                    className="object-cover saturate-[0.9] group-hover:saturate-100 transition-[filter] duration-300"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-w-0 gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-neutral-400 font-[var(--font-mono)] mb-1">
                      Kranverleih
                    </p>
                    <h3 className="font-semibold text-[16px] sm:text-[17px] text-neutral-950 leading-tight">
                      {ct.name} mieten
                    </h3>
                    <p className="text-[13px] text-neutral-500 mt-1 line-clamp-2">{ct.desc}</p>
                  </div>
                  <div className="flex items-end justify-between gap-2">
                    {priceFrom ? (
                      <span className="text-[13px] font-semibold text-neutral-900 font-[var(--font-mono)] tabular-nums">
                        ab {priceFrom.toLocaleString('de-DE')} €
                        <span className="text-neutral-400 font-normal">/Tag</span>
                      </span>
                    ) : (
                      <span />
                    )}
                    <span
                      aria-hidden
                      className="text-neutral-300 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all text-base"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Kranverleih in Ihrer Stadt</h2>
        <div className="flex flex-wrap gap-2">
          {topCities.map((city, i) => {
            // Rotate across 4 top crane types so links distribute across pages, not just minikran
            const typeSlugs = ['baukran-mieten', 'autokran-mieten', 'mobilkran-mieten', 'minikran-mieten']
            const typeSlug = typeSlugs[i % typeSlugs.length]
            return (
              <Link key={city.slug} href={`/${typeSlug}/${city.slug}`} className="inline-flex items-center gap-1.5 text-[13px] bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full px-3.5 py-1.5 transition-colors">
                {city.name}
                <span className="text-[11px] text-gray-400">{city.companyCount}</span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="text-[14px] text-gray-500 leading-relaxed">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Kranverleih — so funktioniert die Kranmiete</h2>
        <p className="mb-3">
          Ein Kranverleih bietet verschiedene Krantypen zur Miete an — vom kompakten Minikran für
          enge Baustellen bis zum schweren Raupenkran für Großprojekte. Die Kranvermietung
          erfolgt in der Regel tageweise, wochenweise oder monatsweise.
        </p>
        <p>
          Auf {BRAND_NAME} können Sie Kranverleiher in ganz {COUNTRY_LABEL} vergleichen — mit
          transparenten Preisen, echten Google-Bewertungen und der Möglichkeit, kostenlos Angebote
          bei mehreren Anbietern gleichzeitig anzufragen.
        </p>
      </section>
    </div>
  )
}
