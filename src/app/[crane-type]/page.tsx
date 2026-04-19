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
import { getRatgeberForCraneType } from '@/data/crane-ratgeber'
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

  // Title: ≤60 Zeichen, mit Preis + Anbieterzahl (Google-Snippet-optimiert)
  const title = priceStr
    ? `${craneType.name} mieten — ${priceStr} | ${count} Anbieter vergleichen`
    : `${craneType.name} mieten — Preise 2026 | ${count} Anbieter vergleichen`

  // Description: ≤155 Zeichen, damit Google nicht abschneidet. Konkrete Zahlen, klarer CTA.
  const description = priceStr
    ? `${craneType.name} mieten 2026: ${priceStr} bei ${count} geprüften Anbietern. Tages-, Wochen- & Monatspreise vergleichen. Kostenlos 3 Angebote anfragen.`
    : `${craneType.name} mieten 2026: Preise von ${count} geprüften Anbietern. Tages-, Wochen- & Monatspreise vergleichen. Kostenlos 3 Angebote anfragen.`

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
  searchParams,
}: {
  params: Promise<{ 'crane-type': string }>
  searchParams: Promise<{ plz?: string }>
}) {
  const { 'crane-type': craneTypeSlug } = await params
  const { plz } = await searchParams
  const craneType = await getCraneTypeBySlug(craneTypeSlug)
  if (!craneType) notFound()

  const [companies, cities] = await Promise.all([
    getCompaniesForCraneType(craneType.id, plz),
    getCities(),
  ])

  const faqs = getFAQsForCraneType(craneType.slug)
  const price = getPriceForCraneType(craneType.slug)
  const ratgeber = getRatgeberForCraneType(craneType.slug)
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

      {/* Table of Contents — horizontal pills */}
      <nav className="mb-8 border border-gray-200 rounded-lg px-4 py-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-[13px] font-medium text-gray-900 shrink-0">Inhalt:</p>
        <a href="#preise" className="text-[13px] text-blue-600 hover:underline">
          Preisübersicht
        </a>
        {companies.length > 0 && (
          <a href="#anbieter" className="text-[13px] text-blue-600 hover:underline">
            {companies.length} Anbieter
          </a>
        )}
        {companies.some((c) => c.lat != null && c.lng != null) && (
          <a href="#karte" className="text-[13px] text-blue-600 hover:underline">
            Karte
          </a>
        )}
        {craneType.slug === 'baukran-mieten' && (
          <a href="#schnellbaukran" className="text-[13px] text-blue-600 hover:underline">
            Schnellbaukran
          </a>
        )}
        {faqs.length > 0 && (
          <a href="#faq" className="text-[13px] text-blue-600 hover:underline">
            Häufige Fragen
          </a>
        )}
        {topCities.length > 0 && (
          <a href="#staedte" className="text-[13px] text-blue-600 hover:underline">
            {craneType.name} in Ihrer Stadt
          </a>
        )}
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
        <p className="mt-3 text-[13px] text-gray-500">
          Ausführliche Preisvergleiche aller Krantypen finden Sie auf unserer{' '}
          <Link href="/kran-mieten-preise" className="text-blue-600 hover:underline">
            Kran mieten Preisliste 2026
          </Link>.
        </p>
      </div>

      {/* Company Listings + Map — placed right after prices for fast access */}
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

      {/* Ratgeber section — merged from /ratgeber/{slug}-mieten-kosten articles */}
      {ratgeber && (
        <section id="ratgeber" className="mb-10 scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Ratgeber: Was beeinflusst die {craneType.name}-Kosten?
          </h2>
          <p className="text-[14px] text-gray-500 mb-4">
            Der Tagespreis ist nur ein Teil der Gesamtkosten. Hier finden Sie die wichtigsten Kostenfaktoren,
            was im Mietpreis enthalten ist und wie Sie die {craneType.name}-Miete optimieren.
          </p>

          {/* Im Preis enthalten vs Zusätzliche Kosten */}
          <div className="grid gap-3 sm:grid-cols-2 mb-5">
            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2 text-[14px]">Im Preis enthalten</p>
              <ul className="text-[13px] text-gray-600 space-y-1">
                {ratgeber.included.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-green-600 shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2 text-[14px]">Zusätzliche Kosten</p>
              <ul className="text-[13px] text-gray-600 space-y-1">
                {ratgeber.extras.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tipps */}
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-5">
            <p className="font-medium text-gray-900 mb-2 text-[14px]">
              Tipps zur Kostenoptimierung
            </p>
            <ul className="text-[13px] text-gray-700 space-y-1.5">
              {ratgeber.tips.map((tip) => (
                <li key={tip} className="flex gap-2">
                  <span className="text-amber-600 shrink-0">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Use cases */}
          {ratgeber.useCases && ratgeber.useCases.length > 0 && (
            <div>
              <h3 className="text-[14px] font-semibold text-gray-900 mb-3">
                Wann lohnt sich ein {craneType.name}? Typische Einsatzgebiete
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {ratgeber.useCases.map((uc) => (
                  <div key={uc.title} className="border border-gray-200 rounded-lg p-4">
                    <p className="font-medium text-gray-900 mb-1 text-[14px]">{uc.title}</p>
                    <p className="text-[13px] text-gray-500">{uc.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Schnellbaukran sub-topic — only on Baukran page, SEO for "schnellbaukran mieten" */}
      {craneType.slug === 'baukran-mieten' && (
        <section id="schnellbaukran" className="mb-10 scroll-mt-20 border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Schnellbaukran mieten — kompakte Baukrane ab 20 m Ausladung
          </h2>
          <p className="text-[14px] text-gray-600 leading-relaxed mb-4">
            Ein <strong>Schnellbaukran</strong> (auch <em>Untendreher</em> oder <em>Mobilbaukran</em> genannt) ist die mobile Variante des klassischen Turmdrehkrans.
            Er wird als Anhänger zur Baustelle transportiert, hydraulisch in 10–30 Minuten aufgebaut und benötigt in den meisten Fällen{' '}
            <strong>kein Fundament</strong>. Ideal für Einfamilienhäuser, Sanierungen, Anbauten und beengte Baustellen.
          </p>

          <div className="grid gap-3 sm:grid-cols-2 mb-4 text-[13px]">
            <div className="bg-blue-50 border border-blue-100 rounded-md p-3">
              <p className="font-medium text-gray-900 mb-1">Schnellbaukran (Untendreher)</p>
              <ul className="text-gray-600 space-y-0.5">
                <li>• Ausladung: 20–45 m</li>
                <li>• Hakenhöhe: 15–30 m</li>
                <li>• Tragkraft: 1.000–6.000 kg</li>
                <li>• Aufbauzeit: 10–30 Minuten (hydraulisch)</li>
                <li>• Fundament meist nicht nötig</li>
                <li>• Transport: Anhänger (1–2 Achsen)</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
              <p className="font-medium text-gray-900 mb-1">Klassischer Turmdrehkran (Obendreher)</p>
              <ul className="text-gray-600 space-y-0.5">
                <li>• Ausladung: 40–80 m</li>
                <li>• Hakenhöhe: 30–100+ m</li>
                <li>• Tragkraft: 4.000–25.000 kg</li>
                <li>• Aufbauzeit: 1–3 Tage (Autokran erforderlich)</li>
                <li>• Fundament oder Kreuzrahmen nötig</li>
                <li>• Für Hochhäuser &amp; Großbaustellen</li>
              </ul>
            </div>
          </div>

          <h3 className="text-[14px] font-semibold text-gray-900 mb-2">Bekannte Schnellbaukran-Modelle</h3>
          <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
            <strong>Potain IGO</strong> (T70, T85, T130) — die meistvermieteten Schnellbaukrane in Deutschland.{' '}
            <strong>Potain GTMR</strong> (331 C, 336 B, 346 A, 386 A) — Serie für mittelgroße Hochbauprojekte.{' '}
            <strong>Liebherr K</strong>-Serie, <strong>Wolffkran WOLFF 7018</strong>, <strong>Eurogru DS 216</strong> — kompakte Modelle für Sanierungen und Einfamilienhäuser.
          </p>

          <h3 className="text-[14px] font-semibold text-gray-900 mb-2">Wann Schnellbaukran statt Turmdrehkran?</h3>
          <ul className="text-[13px] text-gray-600 space-y-1.5 list-disc pl-5">
            <li>Einfamilien- oder Doppelhaus bis 2 Vollgeschosse</li>
            <li>Sanierung, Umbau, Dachaufstockung, Anbau</li>
            <li>Enge Einfahrten, begrenzte Stellfläche (ab 4,5 × 4,5 m Abstützung)</li>
            <li>Bauzeit unter 6 Monaten — kein Fundament spart 1.000–3.000 €</li>
            <li>Wochen- oder Monatsmiete gewünscht (typisch 1.900–4.000 €/Monat)</li>
          </ul>
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
