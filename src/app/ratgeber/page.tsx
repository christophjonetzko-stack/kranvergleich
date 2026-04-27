import type { Metadata } from 'next'
import Link from 'next/link'
import { COUNTRY_LABEL, BRAND_NAME } from '@/lib/country'
import { alternatesFor } from '@/lib/alternates'

export const metadata: Metadata = {
  title: 'Ratgeber — Kran mieten: Tipps, Kosten & Vergleiche',
  description:
    `Ratgeber rund um Kranvermietung: Welchen Kran brauche ich? Minikran vs. Autokran, Kranführerschein, 7 Tipps für Bauunternehmer. Kostenlos auf ${BRAND_NAME}.`,
  alternates: alternatesFor('/ratgeber'),
}

// Curated list of real ratgeber pages (those that exist as standalone routes
// under /ratgeber/<slug>/page.tsx). DO NOT add slugs here that redirect to a
// type page in next.config.ts — Google was discovering these tiles, following
// the link, getting a 308, and never seeing the canonical type page directly,
// which made the rewrite path look like the canonical one. Per 2026-04-27
// audit five ratgeber were genuinely orphan (no internal links anywhere) —
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
    description: '8 typische Baustellen-Szenarien mit Empfehlung — plus Minikran vs. Autokran im direkten Vergleich. Vergleichstabelle aller 8 Krantypen.',
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
        Praktische Ratgeber rund um Kranvermietung in {COUNTRY_LABEL}. Finden Sie den richtigen Kran,
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
