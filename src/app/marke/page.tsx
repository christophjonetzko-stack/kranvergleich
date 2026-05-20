import type { Metadata } from 'next'
import Link from 'next/link'
import { BRANDS } from '@/data/brands'
import { getCompaniesByBrand } from '@/lib/queries'
import { alternatesFor } from '@/lib/alternates'
import { BRAND_NAME, COUNTRY_LABEL } from '@/lib/country'
import { OG_IMAGE } from '@/lib/og-image'

export const revalidate = 86400

export const metadata: Metadata = {
  title: `Kranmarken im Vergleich — Liebherr, Potain, Terex`,
  description: `Anbieter nach Kranmarke filtern: Liebherr-Mobilkrane, Potain-Turmdrehkrane, Terex-Mobilkrane. Vermieter in ${COUNTRY_LABEL} vergleichen.`,
  alternates: alternatesFor('/marke'),
  openGraph: {
    title: `Kranmarken im Vergleich`,
    description: `Anbieter nach Kranmarke filtern: Liebherr, Potain, Terex und mehr.`,
    type: 'website',
    url: '/marke',
    images: [OG_IMAGE],
  },
}

export default async function BrandIndexPage() {
  // Fetch firm count per brand in parallel
  const counts = await Promise.all(
    BRANDS.map(async (b) => ({
      brand: b,
      count: (await getCompaniesByBrand(b.name)).length,
    }))
  )
  // Sort by firm count desc
  counts.sort((a, b) => b.count - a.count)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">
          Startseite
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Kranmarken</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Kranmarken im Vergleich
      </h1>
      <p className="text-[15px] text-gray-500 mb-8 max-w-3xl leading-relaxed">
        Bevorzugen Sie eine bestimmte Marke? Auf {BRAND_NAME} können Sie Vermieter
        nach Kranhersteller filtern. Die Marke wird automatisch aus den
        Selbstbeschreibungen der Vermieter extrahiert — eine Firma mit „Liebherr und
        Potain im Mietpark" wird beiden Marken zugeordnet.
      </p>

      <section className="mb-10">
        <div className="grid gap-3 sm:grid-cols-2">
          {counts.map(({ brand, count }) => (
            <Link
              key={brand.slug}
              href={`/marke/${brand.slug}`}
              className="group relative flex flex-col bg-white border border-neutral-200 hover:border-neutral-900 transition-colors p-5"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-0 group-hover:w-1 bg-[#FFD100] transition-all z-10"
              />
              <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-neutral-400 font-[var(--font-mono)] mb-1">
                Kranmarke — {brand.origin}, seit {brand.founded}
              </p>
              <h2 className="font-semibold text-[18px] text-neutral-950 mb-2">
                {brand.displayName}
              </h2>
              <p className="text-[13px] text-neutral-500 mb-4 line-clamp-2">{brand.introShort}</p>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-neutral-100">
                <span className="text-[13px] font-semibold text-neutral-900 font-[var(--font-mono)] tabular-nums">
                  {count} Anbieter
                </span>
                <span
                  aria-hidden
                  className="text-neutral-300 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all text-base"
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="text-[14px] text-gray-500 leading-relaxed">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Warum die Markenwahl wichtig ist
        </h2>
        <p className="mb-3">
          Bei einer kurzen Mietzeit (Stunden bis Tage) spielt die Kranmarke meist keine
          Rolle — die Verfügbarkeit beim regionalen Vermieter ist wichtiger. Bei
          Langzeit-Einsätzen (Mehrfamilienhaus mit 6+ Monaten Mietdauer) lohnt sich der
          Markenvergleich: Liebherr bietet das dichteste deutsche Service-Netz, Potain
          die größte Turmdrehkran-Auswahl, Terex die wirtschaftliche Mittelklasse.
        </p>
        <p>
          Bei Wartung, Ersatzteilen und Versicherung gibt es markenbedingte Unterschiede,
          die der Vermieter Ihnen bei der Anfrage transparent darstellt. Auch der
          Wiederverkaufswert eines gebrauchten Krans hängt stark von der Marke ab —
          siehe unser Ratgeber{' '}
          <Link
            href="/ratgeber/kran-mieten-oder-kaufen"
            className="text-blue-600 hover:underline"
          >
            Kran mieten oder kaufen
          </Link>
          .
        </p>
      </section>
    </div>
  )
}
