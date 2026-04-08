import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ratgeber — Kran mieten: Tipps, Kosten & Vergleiche',
  description:
    'Ratgeber rund um Kranvermietung: Welchen Kran brauche ich? Minikran vs. Autokran, Kranführerschein, 7 Tipps für Bauunternehmer. Kostenlos auf KranVergleich.de.',
  alternates: { canonical: '/ratgeber' },
}

const articles = [
  {
    slug: 'was-kostet-ein-kran',
    title: 'Was kostet ein Kran? Preisübersicht 2026',
    description: 'Komplette Preisübersicht aller 8 Krantypen: Minikran ab 250€/Tag bis Raupenkran ab 800€/Tag. Tag-, Wochen- und Monatspreise im Vergleich.',
  },
  {
    slug: 'welchen-kran-brauche-ich',
    title: 'Welchen Kran brauche ich?',
    description: '8 typische Baustellen-Szenarien mit Empfehlung: Dacharbeiten, Glasmontage, Schwerlast, Großbaustelle und mehr. Plus Vergleichstabelle aller 8 Krantypen.',
  },
  {
    slug: 'autokran-mieten-kosten',
    title: 'Autokran mieten: Kosten pro Tag, Stunde & Einsatz',
    description: 'Autokran mieten ab 500€/Tag inkl. Kranführer. Preise nach Tonnage (30t–500t), Stundenpreise und typische Einsatzkosten.',
  },
  {
    slug: 'baukran-mieten-kosten',
    title: 'Baukran mieten: Kosten, Dauer & Genehmigung',
    description: 'Baukran (Turmdrehkran) mieten ab 4.000€/Monat. Montagekosten, Genehmigung, Mietdauer und Vergleich mit Autokran.',
  },
  {
    slug: 'dachdeckerkran-mieten',
    title: 'Dachdeckerkran mieten: Kosten, Einsatz & Anbieter 2026',
    description: 'Dachdeckerkran mieten ab 200€/Tag. Hakenhöhe bis 30m, ideal für Dachsanierung & Solaranlagen. Kosten und Vergleich mit Autokran.',
  },
  {
    slug: 'mobilkran-mieten-kosten',
    title: 'Mobilkran mieten: Kosten, Tragkraft & Einsatz 2026',
    description: 'Mobilkran mieten ab 600€/Tag inkl. Kranführer. Tragkraft 20–1.200t. Preisliste nach Tonnage und Unterschied zum Autokran.',
  },
  {
    slug: 'minikran-vs-autokran',
    title: 'Minikran vs. Autokran — Wann brauchen Sie was?',
    description: 'Die zwei beliebtesten Krantypen im direkten Vergleich: Tragkraft, Kosten, Führerscheinpflicht, Einsatzbereiche.',
  },
  {
    slug: 'kran-mieten-privatperson',
    title: 'Kran mieten als Privatperson — Was ist möglich?',
    description: 'Minikran ab 250€/Tag und Anhängerkran ab 150€/Tag ohne Führerschein. Kosten, Versicherung und Tipps für Privatpersonen.',
  },
  {
    slug: 'kran-mieten-ohne-fuehrerschein',
    title: 'Kran mieten ohne Führerschein — was ist erlaubt?',
    description: 'Welche Krane darf man selbst bedienen, wo ist ein Kranführer Pflicht? Übersichtstabelle aller 8 Krantypen.',
  },
  {
    slug: 'kran-mieten-tipps',
    title: 'Kran mieten: 7 Tipps für Bauunternehmer',
    description: 'So sparen Sie bei der Kranmiete Geld und Zeit. Praktische Tipps aus der Baupraxis.',
  },
  {
    slug: 'kran-aufstellen-genehmigung',
    title: 'Kran aufstellen: Genehmigung & Vorschriften',
    description: 'Welche Genehmigungen brauchen Sie zum Aufstellen eines Krans? Bauamt, Straßensperrung, Statik — alle Vorschriften im Überblick.',
  },
]

export default function RatgeberIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Ratgeber</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Ratgeber — Kran mieten
      </h1>
      <p className="text-[15px] text-gray-500 mb-8 max-w-3xl">
        Praktische Ratgeber rund um Kranvermietung in Deutschland. Finden Sie den richtigen Kran,
        vergleichen Sie Kosten und vermeiden Sie typische Fehler.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/ratgeber/${article.slug}`}
            className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <h2 className="font-medium text-[15px] text-gray-900 mb-2">{article.title}</h2>
            <p className="text-[13px] text-gray-500 leading-relaxed">{article.description}</p>
            <span className="inline-block mt-3 text-[13px] text-blue-600">Weiterlesen &rarr;</span>
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
    </div>
  )
}
