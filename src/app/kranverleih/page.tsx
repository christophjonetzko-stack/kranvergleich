import type { Metadata } from 'next'
import Link from 'next/link'
import { craneTypes } from '@/data/crane-types'
import { cranePrices } from '@/data/crane-prices'
import { seoCities } from '@/data/cities-static'
import { getSiteStats } from '@/lib/queries'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const { anbieterCount } = await getSiteStats()
  return {
    title: 'Kranverleih — Krane mieten in ganz Deutschland',
    description: `Kranverleih in Deutschland: ${anbieterCount}+ Anbieter für Minikran, Autokran, Baukran und mehr. Preise vergleichen und kostenlos Angebote anfragen.`,
    alternates: { canonical: '/kranverleih' },
    openGraph: {
      title: 'Kranverleih — Krane mieten in ganz Deutschland',
      description: `Kranverleih in Deutschland: ${anbieterCount}+ Anbieter für Minikran, Autokran, Baukran und mehr. Preise vergleichen und kostenlos Angebote anfragen.`,
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
        Kranverleih — Krane mieten in ganz Deutschland
      </h1>
      <p className="text-[15px] text-gray-500 mb-8 max-w-3xl">
        Sie suchen einen Kranverleih in Ihrer Nähe? Auf KranVergleich.de finden Sie über {anbieterCount}
        {' '}Kranverleiher in ganz Deutschland. Ob Minikran, Autokran oder Baukran — vergleichen Sie
        Preise, lesen Sie Bewertungen und fragen Sie kostenlos Angebote an.
      </p>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Alle Krantypen im Überblick</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {craneTypes.map((ct) => {
            const priceFrom = getPriceFrom(ct.slug)
            return (
              <Link key={ct.slug} href={`/${ct.slug}`} className="flex items-center justify-between gap-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                <div className="min-w-0">
                  <p className="font-medium text-[15px] text-gray-900">{ct.name} leihen</p>
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
          Auf KranVergleich.de können Sie Kranverleiher in ganz Deutschland vergleichen — mit
          transparenten Preisen, echten Google-Bewertungen und der Möglichkeit, kostenlos Angebote
          bei mehreren Anbietern gleichzeitig anzufragen.
        </p>
      </section>
    </div>
  )
}
