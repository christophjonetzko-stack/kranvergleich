import type { Metadata } from 'next'
import Link from 'next/link'
import { COUNTRY_LABEL, BRAND_NAME } from '@/lib/country'
import { alternatesFor } from '@/lib/alternates'

export const metadata: Metadata = {
  title: { absolute: 'Kran-Ratgeber: Tipps, Kosten & Vergleiche' },
  description:
    `Ratgeber rund um Kranvermietung: Welchen Kran brauche ich? Minikran vs. Autokran, Kranführerschein, 7 Tipps für Bauunternehmer. Kostenlos auf ${BRAND_NAME}.`,
  alternates: alternatesFor('/ratgeber'),
}

// Curated list of real ratgeber pages (those that exist as standalone routes
// under /ratgeber/<slug>/page.tsx). DO NOT add slugs here that redirect to a
// type page in next.config.ts. Google was discovering these tiles, following
// the link, getting a 308, and never seeing the canonical type page directly,
// which made the rewrite path look like the canonical one. Per 2026-04-27
// audit five ratgeber were genuinely orphan (no internal links anywhere) 
// adding them here is what gets Googlebot to crawl them.
const articles = [
  {
    slug: 'was-kostet-ein-kran',
    title: 'Was kostet ein Kran? Preisübersicht 2026',
    description: 'Komplette Preisübersicht aller 8 Krantypen: Minikran ab 250€/Tag bis Raupenkran ab 800€/Tag. Tag-, Wochen- und Monatspreise im Vergleich.',
  },
  {
    slug: 'welchen-kran-brauche-ich',
    title: 'Welchen Kran brauche ich?',
    description: '8 typische Baustellen-Szenarien mit Empfehlung, plus Minikran vs. Autokran im direkten Vergleich. Vergleichstabelle aller 8 Krantypen.',
  },
  {
    slug: 'krantypen',
    title: 'Krantypen im Vergleich: 8 Typen, Kosten & Einsatzgebiete',
    description: 'Alle 8 Krantypen im direkten Vergleich: Tragkraft, Kosten pro Tag, Vor- und Nachteile, typische Einsätze. Entscheidungshilfe mit Links zu Anbietern.',
  },
  {
    slug: 'kran-mieten-hausbau',
    title: 'Kran mieten beim Hausbau: Welcher Kran, welche Kosten?',
    description: 'Welcher Kran beim Einfamilienhaus, Mehrfamilienhaus oder Anbau? Kosten, Mietdauer und Tipps zur Auswahl für Bauherren.',
  },
  {
    slug: 'solaranlage-kran-mieten',
    title: 'Kran für Solaranlage mieten: Kosten & Tipps',
    description: 'Solarmodule aufs Dach: Welcher Kran, was kostet er und wie viele Module pro Tag schafft man? Praxis-Ratgeber für PV-Installation.',
  },
  {
    slug: 'bootskran-mieten',
    title: 'Bootskran mieten: Yacht & Segelboot heben',
    description: 'Yacht oder Segelboot kranen. Mobilkran 50t ab 600€, Krantraverse + Saison-Vorlauf in der Krängungs-Spitze. Kosten nach Bootslänge und Lage.',
  },
  {
    slug: 'pool-kran-mieten',
    title: 'Pool mit Kran über das Haus heben',
    description: 'GFK-Pool oder Fertigpool in den Garten heben. Mobilkran 50t ab 700€. Auslage entscheidet, nicht das Pool-Gewicht.',
  },
  {
    slug: 'whirlpool-kran-mieten',
    title: 'Whirlpool mit Kran heben: Garten oder Dachterrasse',
    description: 'Mobilkran 35–50t ab 450€ für Garten-Hub. Wann Sie wirklich einen Kran brauchen, und wann der Spa-Dolly reicht.',
  },
  {
    slug: 'kran-mieten-privatperson',
    title: 'Kran mieten als Privatperson. Was ist möglich?',
    description: 'Minikran ab 250€/Tag und Anhängerkran ab 150€/Tag ohne Führerschein. Kosten, Versicherung und Tipps für Privatpersonen.',
  },
  {
    slug: 'kran-mieten-ohne-fuehrerschein',
    title: 'Kran mieten ohne Führerschein, was ist erlaubt?',
    description: 'Welche Krane darf man selbst bedienen, wo ist ein Kranführer Pflicht? Übersichtstabelle aller 8 Krantypen.',
  },
  {
    slug: 'kran-mieten-oder-kaufen',
    title: 'Kran mieten oder kaufen? Wann sich was lohnt. Vergleich 2026',
    description: 'Faustregel: unter 100 Einsatztagen ist Mieten günstiger. Anschaffungskosten ab 50.000€ (Minikran) bis 1.000.000€ (Autokran). Hybrid-Strategie für mittlere Betriebe.',
  },
  {
    slug: 'kran-mieten-tipps',
    title: 'Kran mieten: 7 Tipps für Bauunternehmer',
    description: 'So sparen Sie bei der Kranmiete Geld und Zeit. Praktische Tipps aus der Baupraxis.',
  },
  {
    slug: 'kranarbeiten-kosten',
    title: 'Kranarbeiten: Was kostet ein Kranhub?',
    description: 'Stundensätze 150–500€/h inkl. Kranführer, ein einzelner Kranhub kostet praktisch 750–1.200€. Warum die Mindestabnahme den Preis bestimmt und wie Sie pro Hub sparen.',
  },
  {
    slug: 'kran-aufstellen-genehmigung',
    title: 'Kran aufstellen: Genehmigung & Vorschriften',
    description: 'Welche Genehmigungen brauchen Sie zum Aufstellen eines Krans? Bauamt, Straßensperrung, Statik, alle Vorschriften im Überblick.',
  },
]

// Quick-Answer-Box, top 3 questions + 1-sentence answer each. AEO-optimized:
// AI engines (Perplexity, ChatGPT) lift this verbatim when they find a "kran
// ratgeber" query. Numbers must match the actual articles below.
const QUICK_ANSWERS = [
  {
    q: 'Was kostet ein Kran zur Miete?',
    a: 'Tagesmiete zwischen 150€ (Anhängerkran) und 5.000€ (Schwerlast-Raupenkran). Mobilkran 600–3.000€ inkl. Kranführer. Wochenmiete spart 30–50% gegenüber Tagespreisen.',
    href: '/ratgeber/was-kostet-ein-kran',
  },
  {
    q: 'Welchen Kran brauche ich für mein Projekt?',
    a: '8 Krantypen mit klaren Einsatzbereichen: Minikran für enge Zufahrten und Glasmontage, Autokran für Tageseinsätze, Baukran für Großbaustellen, Dachdeckerkran für Dachsanierung. Vergleichstabelle in unserem Ratgeber.',
    href: '/ratgeber/welchen-kran-brauche-ich',
  },
  {
    q: 'Brauche ich einen Kranführerschein?',
    a: 'Nicht für Mini-, Anhänger-, Dachdecker-, Lade- und Baukran. Bedienung nach Einweisung. Für Auto-, Mobil- und Raupenkran ist ein Kranführer mit Sachkundenachweis (DGUV Vorschrift 52) gesetzlich vorgeschrieben und im Mietpreis enthalten.',
    href: '/ratgeber/kran-mieten-ohne-fuehrerschein',
  },
] as const

export default function RatgeberIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Ratgeber</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Kran-Ratgeber 2026. Kosten, Auswahl, Genehmigung
      </h1>
      <p className="text-[15px] text-gray-500 mb-6 max-w-3xl leading-relaxed">
        Bevor Sie einen Kran mieten, helfen drei Fragen: Welcher Krantyp passt zu Ihrem Projekt,
        was kostet er, und welche rechtlichen und technischen Voraussetzungen müssen Sie kennen?
        Unsere {articles.length} Ratgeber-Artikel decken genau diese Themen ab und basieren auf
        einer Marktanalyse von {BRAND_NAME} mit Kranvermietern in {COUNTRY_LABEL}.
      </p>

      {/* Quick-Answer-Box. AEO play. */}
      <section className="mb-8 rounded-xl bg-blue-50/60 border border-blue-100 p-5">
        <h2 className="text-[14px] font-semibold text-gray-900 mb-3">Die drei wichtigsten Fragen vor der Kranmiete</h2>
        <div className="space-y-3">
          {QUICK_ANSWERS.map((qa) => (
            <div key={qa.q}>
              <p className="text-[13px] font-medium text-gray-900 mb-0.5">{qa.q}</p>
              <p className="text-[13px] text-gray-600 leading-snug">
                {qa.a}{' '}
                <Link href={qa.href} className="text-blue-600 hover:underline">Mehr erfahren </Link>
              </p>
            </div>
          ))}
        </div>
      </section>

      <p className="text-[14px] text-gray-500 mb-6 max-w-3xl leading-relaxed">
        <strong className="text-gray-700">So nutzen Sie unsere Ratgeber:</strong> Wenn Sie noch nicht
        wissen, welchen Krantyp Sie brauchen, starten Sie bei{' '}
        <Link href="/ratgeber/welchen-kran-brauche-ich" className="text-blue-600 hover:underline">„Welchen Kran brauche ich?"</Link>
        {' '} der Artikel führt durch acht typische Bauszenarien (Dachsanierung, Glasmontage,
        Schwerlast, Großbaustelle …) zur passenden Empfehlung. Wenn die Kostenfrage im Vordergrund
        steht, gehen Sie zu{' '}
        <Link href="/ratgeber/was-kostet-ein-kran" className="text-blue-600 hover:underline">„Was kostet ein Kran?"</Link>
        {' '}für Mietpreise aller acht Krantypen sowie Break-even-Rechnungen für den Kauf. Und für
        konkrete Projektdetails (Tragkraft, Hubhöhe, Mietdauer) liefert unser{' '}
        <Link href="/kostenrechner" className="text-blue-600 hover:underline">Kostenrechner</Link>
        {' '}eine projektbezogene Schätzung in unter zwei Minuten.
      </p>

      <h2 className="text-lg font-semibold text-gray-900 mb-4 mt-10">Alle Ratgeber im Überblick</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/ratgeber/${article.slug}`}
            className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <h3 className="font-medium text-[15px] text-gray-900 mb-2">{article.title}</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed">{article.description}</p>
            <span className="inline-block mt-3 text-[13px] text-blue-600">Weiterlesen </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-[14px] text-gray-500">
        <p>
          Sie haben eine konkrete Frage? Schauen Sie auch in unsere{' '}
          <Link href="/kran-mieten-preise" className="text-blue-600 hover:underline">Preisübersicht</Link> oder
          vergleichen Sie direkt{' '}
          <Link href="/" className="text-blue-600 hover:underline">Anbieter in Ihrer Stadt</Link>.
        </p>
      </div>

      {/* ItemList + BreadcrumbList JSON-LD, gives Google a machine-readable
          map of the hub's children, fixes "no schema" gap from the Opus eval
          and helps Googlebot discover the orphan ratgeber pages faster. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://kranvergleich.de/' },
              { '@type': 'ListItem', position: 2, name: 'Ratgeber' },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Kran-Ratgeber 2026',
            description: 'Ratgeber-Artikel rund um Kranvermietung: Kosten, Auswahl, Genehmigungen',
            itemListElement: articles.map((a, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: a.title,
              description: a.description,
              url: `https://kranvergleich.de/ratgeber/${a.slug}`,
            })),
          }),
        }}
      />
    </div>
  )
}
