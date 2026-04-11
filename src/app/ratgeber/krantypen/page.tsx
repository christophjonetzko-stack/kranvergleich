import type { Metadata } from 'next'
import Link from 'next/link'
import { getCraneIcon } from '@/components/crane-icons'
import { cranePrices } from '@/data/crane-prices'
import { getSiteStats } from '@/lib/queries'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Krantypen im Vergleich: 8 Typen, Kosten & Einsatzgebiete 2026',
  description:
    'Alle 8 Krantypen im direkten Vergleich: Tragkraft, Kosten pro Tag, Vor- und Nachteile, typische Einsätze. Welcher Kran passt zu Ihrem Projekt? Entscheidungshilfe & Links zu Anbietern.',
  alternates: { canonical: '/ratgeber/krantypen' },
  openGraph: {
    title: 'Krantypen im Vergleich: 8 Typen, Kosten & Einsatzgebiete 2026',
    description:
      'Alle 8 Krantypen im direkten Vergleich: Tragkraft, Kosten pro Tag, Vor- und Nachteile, typische Einsätze.',
    type: 'article',
    url: '/ratgeber/krantypen',
  },
}

interface CraneTypeEntry {
  slug: string
  name: string
  also: string
  shortDesc: string
  capacity: string
  einsatz: string
  pros: string[]
  cons: string[]
  operatorRequired: boolean
}

const craneTypeData: CraneTypeEntry[] = [
  {
    slug: 'anhaengerkran-mieten',
    name: 'Anhängerkran',
    also: 'PKW-Anhänger mit Kran, Trailerkran, Kleinkran',
    shortDesc: 'Der günstigste Krantyp — auf PKW-Anhänger montiert, mit normaler Anhängerkupplung transportierbar. Ideal für Handwerker und kleine Hebearbeiten ohne Kranführerschein.',
    capacity: 'bis 1.500 kg',
    einsatz: 'Kleine Budgets, Dachdecker, Gartenbau, Baumaterialtransport',
    pros: ['Günstigster Krantyp', 'PKW-Transport mit Anhängerkupplung', 'Kein Kranführerschein nötig', 'Kompakter Stellplatz'],
    cons: ['Nur leichte Lasten (max. 1,5t)', 'Begrenzte Reichweite', 'Nicht für schwere Bauprojekte'],
    operatorRequired: false,
  },
  {
    slug: 'dachdeckerkran-mieten',
    name: 'Dachdeckerkran',
    also: 'Dachkran, Ziegelkran, Aufzugskran',
    shortDesc: 'Speziell für Dacharbeiten konstruiert — steht an der Straße und hebt Material direkt aufs Dach. 60–70% günstiger als ein Autokran bei Dachsanierungen.',
    capacity: '500 – 2.000 kg',
    einsatz: 'Dachsanierung, Solaranlagen, Dachstuhl, Schornsteinsanierung',
    pros: ['Ohne Kranführer bedienbar', 'Deutlich günstiger als Autokran bei Dacharbeiten', 'Steiler Auslegerwinkel für Dachkanten', 'Passt in enge Wohnstraßen'],
    cons: ['Hakenhöhe maximal 30m (ca. 9 Stockwerke)', 'Nur leichte Lasten (max. 2t)', 'Ungeeignet für hohe Gebäude'],
    operatorRequired: false,
  },
  {
    slug: 'minikran-mieten',
    name: 'Minikran',
    also: 'Spinnenkran, Spider Crane, Glasmontagekran',
    shortDesc: 'Der kompakteste Krantyp — passt durch Türöffnungen ab 80 cm und wird oft elektrisch betrieben. Ideal für Innenräume, enge Baustellen und Glasmontage.',
    capacity: '500 – 3.000 kg',
    einsatz: 'Innenräume, Glasmontage, enge Zufahrten, Hinterhöfe',
    pros: ['Passt durch Türen und Hallentore', 'Elektrisch & abgasfrei für Innenräume', 'Kein Kranführerschein erforderlich', 'Ideal mit Glassauger für Glasmontage'],
    cons: ['Begrenzte Tragkraft (max. 3t)', 'Begrenzte Hubhöhe (max. 18m)', 'Langsamer als größere Krane'],
    operatorRequired: false,
  },
  {
    slug: 'ladekran-mieten',
    name: 'Ladekran',
    also: 'Knickarmkran, Hiab-Kran, LKW-Ladekran, Lastkran',
    shortDesc: 'Hydraulischer Knickarmkran direkt auf einem LKW montiert. Oft als Komplettpaket mit LKW und Fahrer buchbar — ideal zum Be- und Entladen von Baustellen.',
    capacity: '1 – 30 t',
    einsatz: 'Be-/Entladearbeiten, Container, Baumaterialtransport',
    pros: ['Direkt am LKW — kein separater Transport', 'Knickarm erreicht enge Stellen', 'Komplettpaket mit Fahrer möglich', 'Schnell einsatzbereit'],
    cons: ['Immer an LKW gebunden', 'Hauptsächlich für Material-Handling', 'Begrenzte Hubhöhe (30m)'],
    operatorRequired: false,
  },
  {
    slug: 'autokran-mieten',
    name: 'Autokran',
    also: 'Kranwagen, Fahrzeugkran, LKW-Kran',
    shortDesc: 'Der vielseitigste und meistgemietete Krantyp in Deutschland — LKW-Fahrgestell, fährt selbst zur Baustelle, in 15–30 Minuten einsatzbereit. Kranführer gesetzlich inklusive.',
    capacity: '10 – 500 t',
    einsatz: 'Kurzfristige Hebearbeiten, Montagen, Dachstuhl, Baumfällung',
    pros: ['Fährt selbst zur Baustelle', 'Schnell einsatzbereit (15–30 Min.)', 'Kranführer im Preis enthalten', 'Breites Tragkraftspektrum'],
    cons: ['Kranführer gesetzlich Pflicht', 'Braucht Stellfläche für Abstützungen', 'Nicht für Innenräume geeignet'],
    operatorRequired: true,
  },
  {
    slug: 'baukran-mieten',
    name: 'Baukran',
    also: 'Turmdrehkran, Baustellenkran, Schnellbaukran, Hochbaukran',
    shortDesc: 'Der Turmdrehkran ist der Klassiker auf Großbaustellen — steht fest auf einem Fundament und deckt mit seinem drehbaren Ausleger die gesamte Baustelle ab. Wirtschaftlich ab ca. 3 Monaten Bauzeit.',
    capacity: '1 – 20 t',
    einsatz: 'Hochbau, Wohnungsbau, Gewerbebauten, Sanierungen ab 3 Monaten',
    pros: ['Deckt gesamte Baustelle ab', 'Niedrige Monatsmiete bei langer Laufzeit', 'Ideal für Dauereinsätze', 'Verschiedene Hubhöhen (bis 80m)'],
    cons: ['Hohe Montagekosten (3.000–8.000€)', 'Braucht Kranfundament', 'Genehmigungen erforderlich', 'Lange Vorlaufzeit'],
    operatorRequired: true,
  },
  {
    slug: 'mobilkran-mieten',
    name: 'Mobilkran',
    also: 'Schwerlastkran, Teleskopkran, Telekran',
    shortDesc: 'Die große Version des Autokrans — eigenes Kranfahrgestell mit Traglasten bis 1.200 t. Kommt bei Großprojekten zum Einsatz, bei denen ein Autokran an seine Grenzen stößt.',
    capacity: '20 – 1.200 t',
    einsatz: 'Schwerlastmontage, Industriebau, Brückenbau, Windkraft',
    pros: ['Höchste mobile Tragkraft (bis 1.200t)', 'Große Hubhöhe (bis 150m)', 'Kranführer im Preis', 'Fährt auf eigenem Fahrgestell'],
    cons: ['Sehr teuer (ab 600€/Tag)', 'Schwertransport ab 100t nötig', 'Lange Aufbauzeit (1–8 Stunden)', 'Vorlauf 4–8 Wochen bei Großkranen'],
    operatorRequired: true,
  },
  {
    slug: 'raupenkran-mieten',
    name: 'Raupenkran',
    also: 'Kettenkran, Crawler Crane, Gleiskettenkran',
    shortDesc: 'Der Kraftprotz mit Raupenfahrwerk — verteilt das Gewicht auf große Fläche und funktioniert auch auf weichem oder unbefestigtem Untergrund. Höchste Tragkraft aller Krantypen.',
    capacity: '50 – 3.000 t',
    einsatz: 'Schwerlast, Windkraftanlagen, Brückenbau, unbefestigter Untergrund',
    pros: ['Höchste Tragkraft aller Krantypen (bis 3.000t)', 'Funktioniert auf weichem Untergrund', 'Extrem stabil', 'Große Ausladung'],
    cons: ['Teuerster Krantyp (ab 800€/Tag)', 'Aufbau dauert mehrere Tage', 'Schwertransport zwingend nötig', 'Benötigt große Fläche'],
    operatorRequired: true,
  },
]

const faqs = [
  {
    q: 'Welchen Kran brauche ich?',
    a: 'Die Wahl des richtigen Krans hängt von drei Faktoren ab: Tragkraft (wie schwer ist die Last?), Hubhöhe (wie hoch muss gehoben werden?) und Zugänglichkeit (wie ist die Zufahrt?). Faustregel: Innenräume oder enge Zufahrten → Minikran. Dacharbeiten bis 30m → Dachdeckerkran. Kurzfristige Hebearbeiten im Freien (1–3 Tage) → Autokran. Baustellen ab 3 Monaten → Baukran (Turmdrehkran). Schwerlast über 200t → Mobilkran oder Raupenkran. Leichte Lasten bis 1,5t mit Transport → Anhängerkran. Nutzen Sie unseren Kostenrechner oder fordern Sie direkt Angebote an.',
  },
  {
    q: 'Was ist der Unterschied zwischen Autokran und Mobilkran?',
    a: 'Ein Autokran basiert auf einem LKW-Fahrgestell (10–500 t Tragkraft) und ist schnell einsatzbereit (15–30 Min. Aufbauzeit). Ein Mobilkran hat ein spezielles Kranfahrgestell und erreicht deutlich höhere Tragkräfte (20–1.200 t), braucht aber längere Aufbauzeit (1–8 Stunden) und ab ca. 100 t Tragkraft einen Schwertransport. Faustregel: Bis 100 t reicht ein Autokran — er ist schneller und günstiger. Ab 100 t wird der Mobilkran wirtschaftlicher, ab 500 t ist er praktisch die einzige Option. Beide haben den Kranführer immer im Preis enthalten.',
  },
  {
    q: 'Welcher Kran für Hausbau?',
    a: 'Für den Hausbau gibt es drei typische Optionen, abhängig von Bauzeit und Projekttyp: (1) Neubau mit Bauzeit unter 3 Monaten → Autokran für punktuelle Einsätze (Dachstuhl setzen, Fertigteile positionieren, Betonelemente heben), ab 500€/Tag inklusive Kranführer. (2) Neubau mit Bauzeit über 3 Monaten oder mehrgeschossiger Bau → Baukran (Turmdrehkran), 4.000–8.000€/Monat zzgl. 3.000–5.000€ Montage. (3) Dachsanierung, Solaranlagen-Montage oder Dachdeckerarbeiten → Dachdeckerkran, ab 200€/Tag ohne Kranführer. Faustregel: Unter 3 Monaten Bauzeit lohnt sich der Autokran, darüber der Baukran.',
  },
  {
    q: 'Welche Krantypen gibt es in Deutschland?',
    a: 'In Deutschland werden 8 Haupttypen vermietet: Anhängerkran (bis 1,5t, ab 150€/Tag), Dachdeckerkran (bis 2t, ab 200€/Tag), Minikran (bis 3t, ab 250€/Tag), Ladekran (bis 30t, ab 300€/Tag), Baukran/Turmdrehkran (bis 20t, ab 300€/Tag), Autokran (bis 500t, ab 500€/Tag), Mobilkran (bis 1.200t, ab 600€/Tag) und Raupenkran (bis 3.000t, ab 800€/Tag). Jeder Typ hat spezifische Tragkräfte, Einsatzgebiete und Preiskategorien.',
  },
  {
    q: 'Welcher Kran ist der günstigste?',
    a: 'Der Anhängerkran ist mit ab 150€/Tag der günstigste Krantyp. Er eignet sich für Hebearbeiten bis 1.500 kg und kann mit einem PKW-Anhänger transportiert werden. Für etwas schwerere Lasten oder Dacharbeiten ist der Dachdeckerkran (ab 200€/Tag, ohne Kranführer) eine günstige Alternative. Der Minikran (ab 250€/Tag) ist für Innenräume und Glasmontage die kosteneffizienteste Wahl.',
  },
  {
    q: 'Welcher Kran hat die höchste Tragkraft?',
    a: 'Der Raupenkran erreicht Traglasten von bis zu 3.000 Tonnen und ist damit der stärkste Krantyp. Er kommt vor allem bei Windkraftanlagen, Offshore-Projekten und Schwerlastmontagen zum Einsatz. Mobilkrane erreichen bis zu 1.200 Tonnen, Autokrane bis 500 Tonnen. Für die meisten Bauprojekte reichen jedoch Autokrane (10–500 t) oder Baukrane (bis 20 t) vollkommen aus.',
  },
  {
    q: 'Brauche ich einen Kranführer?',
    a: 'Autokrane, Mobilkrane, Raupenkrane und Baukrane (Turmdrehkrane) dürfen ausschließlich von zertifizierten Kranführern bedient werden — bei Miete ist der Kranführer entweder im Tagespreis enthalten (Autokran, Mobilkran, Raupenkran) oder separat buchbar (Baukran). Minikrane, Dachdeckerkrane, Anhängerkrane und Ladekrane können Sie nach einer kurzen Einweisung (30–60 Minuten, DGUV Vorschrift 52) selbst bedienen — ein Kranführerschein ist nicht nötig.',
  },
]

export default async function KrantypenPage() {
  const { anbieterCount } = await getSiteStats()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/ratgeber" className="hover:text-gray-600">Ratgeber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Krantypen im Überblick</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Alle Krantypen im Überblick — welcher Kran für welchen Einsatz?
      </h1>
      <p className="text-[15px] text-gray-500 mb-4 max-w-3xl">
        Von 150€ für den Anhängerkran bis 10.000€+ für den 500-Tonnen-Raupenkran — die Wahl
        des richtigen Krantyps entscheidet über Kosten, Zeit und Machbarkeit Ihres Projekts.
        In diesem Vergleich finden Sie alle 8 in Deutschland üblichen Krantypen mit Tragkraft,
        Tagespreisen, typischen Einsätzen sowie Vor- und Nachteilen.
      </p>
      <p className="text-[11px] text-gray-300 mb-6">Stand: April 2026 · Preise netto, Richtwerte</p>

      {/* Table of Contents */}
      <nav className="mb-8 border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-medium text-gray-900 mb-2">Inhalt</p>
        <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-x-4">
          <li><a href="#vergleich" className="text-[13px] text-blue-600 hover:underline">Vergleichstabelle (alle 8 Typen)</a></li>
          <li><a href="#details" className="text-[13px] text-blue-600 hover:underline">Krantypen im Detail</a></li>
          <li><a href="#faq" className="text-[13px] text-blue-600 hover:underline">Häufige Fragen</a></li>
        </ul>
      </nav>

      {/* Comparison table — FIRST, so users get the overview immediately */}
      <section id="vergleich" className="mb-12 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Krantypen-Vergleich: Tragkraft, Kosten, Vor- &amp; Nachteile
        </h2>
        <p className="text-[14px] text-gray-500 mb-4">
          Alle 8 Krantypen auf einen Blick — sortiert nach Einstiegspreis (Tagesmiete). Klicken Sie
          auf einen Krantyp, um direkt zu den Anbietern zu gelangen.
        </p>
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-gray-50 border-b text-left">
                <th className="py-3 px-3 font-medium text-gray-900 whitespace-nowrap">Krantyp</th>
                <th className="py-3 px-3 font-medium text-gray-900 whitespace-nowrap">Tragkraft</th>
                <th className="py-3 px-3 font-medium text-gray-900 whitespace-nowrap">Kosten / Tag</th>
                <th className="py-3 px-3 font-medium text-gray-900">Typische Einsätze</th>
                <th className="py-3 px-3 font-medium text-gray-900">Vorteile</th>
                <th className="py-3 px-3 font-medium text-gray-900">Nachteile</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 align-top">
              {craneTypeData.map((ct, i) => {
                const price = cranePrices.find((p) => p.craneTypeSlug === ct.slug)
                return (
                  <tr key={ct.slug} className={`border-b last:border-0 ${i % 2 === 1 ? 'bg-gray-50/50' : ''}`}>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <Link href={`/${ct.slug}`} className="text-blue-600 hover:underline font-medium">
                        {ct.name}
                      </Link>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-gray-700">{ct.capacity}</td>
                    <td className="py-3 px-3 whitespace-nowrap font-medium text-gray-900">
                      {price ? `ab ${price.dayFrom}€` : '—'}
                    </td>
                    <td className="py-3 px-3 text-gray-500">{ct.einsatz}</td>
                    <td className="py-3 px-3 text-gray-500">
                      <ul className="space-y-0.5">
                        {ct.pros.slice(0, 3).map((pro) => (
                          <li key={pro} className="flex gap-1">
                            <span className="text-green-600 shrink-0">+</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-3 px-3 text-gray-500">
                      <ul className="space-y-0.5">
                        {ct.cons.slice(0, 3).map((con) => (
                          <li key={con} className="flex gap-1">
                            <span className="text-red-500 shrink-0">−</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-gray-400 mt-2">
          Alle Preise netto zzgl. MwSt. Richtwerte basierend auf Marktrecherche Q1 2026.{' '}
          <Link href="/kran-mieten-preise" className="text-blue-600 hover:underline">
            Ausführliche Preisliste 2026 &rarr;
          </Link>
        </p>
      </section>

      {/* Short descriptions of each type with links */}
      <section id="details" className="mb-12 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Krantypen im Detail — kurze Beschreibung &amp; Anbieter
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {craneTypeData.map((ct) => {
            const Icon = getCraneIcon(ct.slug)
            const price = cranePrices.find((p) => p.craneTypeSlug === ct.slug)
            return (
              <article key={ct.slug} className="border border-gray-200 rounded-lg p-5">
                <div className="flex items-start gap-3 mb-2">
                  <div className="shrink-0 text-gray-500">
                    <Icon className="w-12 h-12" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[16px] font-semibold text-gray-900">
                      <Link href={`/${ct.slug}`} className="hover:text-blue-600">{ct.name}</Link>
                    </h3>
                    <p className="text-[11px] text-gray-400 mb-1">Auch: {ct.also}</p>
                    <p className="text-[12px] font-medium text-blue-600">
                      {price ? `ab ${price.dayFrom}€/Tag` : '—'} · {ct.capacity}
                    </p>
                  </div>
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-3">{ct.shortDesc}</p>
                <p className="text-[12px] text-gray-400 mb-3">
                  <strong className="text-gray-600">Ideal für:</strong> {ct.einsatz}
                </p>
                <Link href={`/${ct.slug}`} className="text-[13px] text-blue-600 hover:underline font-medium">
                  {ct.name} Anbieter &amp; Preise &rarr;
                </Link>
              </article>
            )
          })}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mb-12 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Häufige Fragen zu Krantypen
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details key={i} className="group border border-gray-200 rounded-lg">
              <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-[14px] font-medium text-gray-900 select-none">
                {faq.q}
                <svg className="w-4 h-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
              </summary>
              <p className="px-5 pb-4 text-[14px] text-gray-600 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-50 border border-blue-100 rounded-xl p-6 sm:p-8 text-center mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Den richtigen Kran gefunden?
        </h2>
        <p className="text-[14px] text-gray-500 mb-5 max-w-lg mx-auto">
          Vergleichen Sie jetzt {anbieterCount}+ Kranvermieter in ganz Deutschland.
          Kostenlos Angebote anfragen — bei einem oder mehreren Anbietern gleichzeitig.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/kostenrechner"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium rounded-lg transition-colors"
          >
            Kostenrechner starten &rarr;
          </Link>
          <Link
            href="/ratgeber/welchen-kran-brauche-ich"
            className="px-6 py-3 border border-gray-200 hover:border-gray-300 text-[14px] text-gray-700 font-medium rounded-lg transition-colors"
          >
            Welchen Kran brauche ich?
          </Link>
        </div>
      </section>

      {/* Structured data — FAQPage + Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Alle Krantypen im Überblick — welcher Kran für welchen Einsatz?',
            description: 'Alle 8 Krantypen im direkten Vergleich: Tragkraft, Kosten pro Tag, Vor- und Nachteile, typische Einsätze.',
            author: { '@type': 'Organization', name: 'KranVergleich.de', url: 'https://kranvergleich.de' },
            datePublished: '2026-04-09',
            dateModified: '2026-04-11',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://kranvergleich.de/' },
              { '@type': 'ListItem', position: 2, name: 'Ratgeber', item: 'https://kranvergleich.de/ratgeber' },
              { '@type': 'ListItem', position: 3, name: 'Krantypen im Überblick' },
            ],
          }),
        }}
      />
    </div>
  )
}
