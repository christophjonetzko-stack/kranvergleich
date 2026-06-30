import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FAQSection } from '@/components/faq-section'
import { TAX_LABEL } from '@/lib/country'
import { alternatesFor } from '@/lib/alternates'
import { cranePrices } from '@/data/crane-prices'
import { OG_IMAGE } from '@/lib/og-image'

export const revalidate = 86400

export const metadata: Metadata = {
  title: { absolute: 'Kran-Preisreport 2026: Mietpreise & Nachfrage in Zahlen' },
  description:
    'Preisspannen aller 8 Krantypen, Nachfrage-Auswertung aus 50.000 Suchanfragen, Anbieterdichte je Bundesland. Daten frei zitierbar mit Quellenangabe.',
  alternates: alternatesFor('/kran-preisreport-2026'),
  openGraph: {
    title: 'Kran-Preisreport 2026: Mietpreise & Nachfrage in Zahlen',
    description:
      'Was kostet Kranmiete 2026? Auswertung über 746 Anbieter und 50.000 Suchanfragen: Preisspannen, meistgesuchte Krantypen, regionale Anbieterdichte.',
    type: 'website',
    url: '/kran-preisreport-2026',
    images: [OG_IMAGE],
  },
}

// Report snapshot data (Stand: 10.06.2026). Static by design: a report is a
// dated snapshot, the numbers must stay stable and citable between updates.
// Source pipeline: Dosc/PREISREPORT_2026_DATASET.md (catalog + GSC aggregates).
const STAND = '10. Juni 2026'

const CRANE_DISPLAY: Record<string, { name: string; tonnage: string }> = {
  'anhaengerkran-mieten': { name: 'Anhängerkran', tonnage: 'bis 1,5 t' },
  'dachdeckerkran-mieten': { name: 'Dachdeckerkran', tonnage: '0,5–2 t' },
  'minikran-mieten': { name: 'Minikran (Spinnenkran)', tonnage: '0,5–3 t' },
  'ladekran-mieten': { name: 'Ladekran (LKW)', tonnage: '1–30 t' },
  'autokran-mieten': { name: 'Autokran', tonnage: '10–500 t' },
  'mobilkran-mieten': { name: 'Mobilkran', tonnage: '20–1.200 t' },
  'baukran-mieten': { name: 'Baukran (Turmdrehkran)', tonnage: '1–20 t' },
  'raupenkran-mieten': { name: 'Raupenkran', tonnage: '50–3.000 t' },
}
const PRICE_TABLE_ORDER = [
  'anhaengerkran-mieten',
  'dachdeckerkran-mieten',
  'minikran-mieten',
  'ladekran-mieten',
  'autokran-mieten',
  'mobilkran-mieten',
  'baukran-mieten',
  'raupenkran-mieten',
] as const

// Share of type-attributable search demand (impressions), GSC 31.03.–07.06.2026.
const DEMAND_BY_TYPE = [
  { name: 'Autokran', slug: 'autokran-mieten', impressions: 10766, share: 34 },
  { name: 'Minikran', slug: 'minikran-mieten', impressions: 6016, share: 19 },
  { name: 'Baukran', slug: 'baukran-mieten', impressions: 5400, share: 17 },
  { name: 'Mobilkran', slug: 'mobilkran-mieten', impressions: 3711, share: 12 },
  { name: 'Dachdeckerkran', slug: 'dachdeckerkran-mieten', impressions: 2307, share: 7 },
  { name: 'Ladekran', slug: 'ladekran-mieten', impressions: 1827, share: 6 },
  { name: 'Anhängerkran', slug: 'anhaengerkran-mieten', impressions: 1019, share: 3 },
  { name: 'Raupenkran', slug: 'raupenkran-mieten', impressions: 720, share: 2 },
]

// Catalog firms with registered seat in the Bundesland (NOT total market size).
const FIRMS_BY_STATE = [
  { state: 'Nordrhein-Westfalen', firms: 146 },
  { state: 'Bayern', firms: 126 },
  { state: 'Baden-Württemberg', firms: 95 },
  { state: 'Niedersachsen', firms: 59 },
  { state: 'Sachsen', firms: 44 },
  { state: 'Brandenburg', firms: 38 },
  { state: 'Hessen', firms: 36 },
  { state: 'Rheinland-Pfalz', firms: 23 },
  { state: 'Sachsen-Anhalt', firms: 20 },
  { state: 'Thüringen', firms: 20 },
  { state: 'Schleswig-Holstein', firms: 19 },
  { state: 'Berlin', firms: 16 },
  { state: 'Mecklenburg-Vorpommern', firms: 15 },
  { state: 'Hamburg', firms: 12 },
  { state: 'Bremen', firms: 9 },
  { state: 'Saarland', firms: 4 },
]

const TOP_PRICE_QUERIES = [
  { query: 'kran mieten kosten', impressions: 1112 },
  { query: 'baukran mieten preisliste', impressions: 673 },
  { query: 'kran mieten preisliste', impressions: 621 },
  { query: 'autokran mieten preisliste', impressions: 417 },
  { query: 'autokran mieten kosten', impressions: 411 },
  { query: 'baukran mieten kosten', impressions: 408 },
  { query: 'minikran mieten preise', impressions: 395 },
  { query: 'was kostet ein autokran pro stunde', impressions: 257 },
  { query: 'autokran preise pro stunde', impressions: 248 },
  { query: 'was kostet ein baukran pro monat', impressions: 233 },
]

const faqs = [
  {
    question: 'Was kostet es 2026, einen Kran zu mieten?',
    answer:
      'Die Tagesmiete liegt 2026 zwischen 150€ (Anhängerkran) und 5.000€ (Schwerlast-Raupenkran). Die gängigsten Klassen: Dachdeckerkran 200–450€, Minikran 250–500€, Autokran 500–2.000€ inklusive Kranführer. Baukrane werden meist monatlich gemietet, ab etwa 4.000€/Monat zuzüglich Montage. Alle Werte sind Richtwerte netto, ohne Transport.',
  },
  {
    question: 'Welcher Krantyp wird am häufigsten gesucht?',
    answer:
      'Der Autokran führt mit 34% der typbezogenen Suchnachfrage, vor Minikran (19%) und Baukran (17%). Zusammen stehen diese drei Typen für 70% des Suchinteresses rund um Kranmiete in Deutschland. Grundlage sind 31.766 typbezogene Suchanfragen-Impressionen aus drei Monaten (April bis Juni 2026).',
  },
  {
    question: 'Woher stammen die Daten in diesem Report?',
    answer:
      'Aus drei Quellen der Plattform KranVergleich: dem eigenen Katalog mit 746 aktiven Kranvermietern (682 in Deutschland, 64 in Österreich), anonymisierten Suchdaten der Plattform aus der Google Search Console (31. März bis 7. Juni 2026) und Preisspannen aus eigener Marktrecherche im ersten Quartal 2026. Der Report ist keine Vollerhebung des Markts, die Methodik ist auf dieser Seite offengelegt.',
  },
  {
    question: 'Dürfen die Zahlen aus dem Report zitiert werden?',
    answer:
      'Ja. Alle Zahlen, Tabellen und die Grafik dürfen für redaktionelle Zwecke frei verwendet werden. Bedingung ist die Quellenangabe „KranVergleich.de, Kran-Preisreport 2026" mit Link auf diese Seite. Für Rohdaten oder regionale Sonderauswertungen erreichen Sie uns unter christoph@kranvergleich.de.',
  },
  {
    question: 'Wie aktuell sind die Preisangaben?',
    answer:
      'Die Preisspannen stammen aus der Marktrecherche im ersten Quartal 2026, die Nachfrage- und Katalogdaten vom Stand 10. Juni 2026. Eine Aktualisierung des Reports ist jährlich geplant. Tagesaktuelle Angebote erhalten Sie über eine kostenlose Anfrage an mehrere Anbieter gleichzeitig.',
  },
]

export default function KranPreisreportPage() {
  const fmt = (n: number) => n.toLocaleString('de-DE')

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Kran-Preisreport 2026</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Kran-Preisreport 2026: Mietpreise und Nachfrage in Deutschland
      </h1>
      <p className="text-[13px] text-gray-500 mb-5">
        Stand: {STAND} · Datenbasis: 746 Anbieter im KranVergleich-Katalog und rund 95.000
        Suchanfragen-Impressionen aus drei Monaten · <a href="#methodik" className="text-blue-600 hover:underline">Methodik</a>
      </p>

      {/* AEO Kurzantwort, first content block. */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-8">
        <p className="text-[13px] font-semibold text-gray-900 mb-2">Die Kernzahlen auf einen Blick:</p>
        <p className="text-[14px] text-gray-700 leading-relaxed">
          Die Tagesmiete für einen Kran liegt in Deutschland 2026 zwischen{' '}
          <strong className="text-gray-900">150€ (Anhängerkran)</strong> und{' '}
          <strong className="text-gray-900">5.000€ (Schwerlast-Raupenkran)</strong>.
          Fast ein Drittel der Suchnachfrage rund um Kranmiete (<strong className="text-gray-900">31%</strong>) sind
          reine Preisfragen, verbindliche Preislisten veröffentlichen jedoch die wenigsten Vermieter.
          Meistgesuchter Krantyp ist der <strong className="text-gray-900">Autokran mit 34%</strong> der
          typbezogenen Nachfrage, vor Minikran (19%) und Baukran (17%).
        </p>
        <p className="text-[11px] text-gray-500 mt-2">
          Alle Preise netto zzgl. {TAX_LABEL}, ohne Transport. Unverbindliche Richtwerte aus Marktrecherche Q1 2026.
        </p>
      </div>

      {/* Headline findings, the citable core of the report. */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Die fünf wichtigsten Ergebnisse</h2>
        <ol className="space-y-4">
          <li className="border border-gray-200 rounded-lg p-4">
            <p className="text-[14px] font-semibold text-gray-900 mb-1">
              1. 31% aller Kran-Suchanfragen sind Preisfragen
            </p>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              Von 50.822 ausgewerteten Suchanfragen-Impressionen entfielen 15.674 auf Anfragen mit
              klarem Preisbezug, etwa „kran mieten kosten" oder „autokran preise pro stunde". Wer
              einen Kran mieten will, sucht zuerst nach Zahlen und findet sie selten: Kaum ein
              Vermieter veröffentlicht eine Preisliste.
            </p>
          </li>
          <li className="border border-gray-200 rounded-lg p-4">
            <p className="text-[14px] font-semibold text-gray-900 mb-1">
              2. Der Autokran dominiert die Nachfrage
            </p>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              34% der typbezogenen Suchnachfrage entfallen auf den Autokran. Es folgen Minikran
              (19%) und Baukran (17%). Die drei Typen zusammen stehen für 70% des gesamten
              Suchinteresses, die übrigen fünf Krantypen teilen sich den Rest.
            </p>
          </li>
          <li className="border border-gray-200 rounded-lg p-4">
            <p className="text-[14px] font-semibold text-gray-900 mb-1">
              3. Faktor 30 zwischen günstigster und teuerster Tagesmiete
            </p>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              Ein Anhängerkran ist ab 150€ pro Tag zu mieten, ein Schwerlast-Raupenkran kostet bis
              zu 5.000€. Wer den Krantyp falsch wählt, zahlt schnell ein Mehrfaches: Für viele
              Einsätze im Hausbau reicht eine kleinere Klasse als zunächst angefragt.
            </p>
          </li>
          <li className="border border-gray-200 rounded-lg p-4">
            <p className="text-[14px] font-semibold text-gray-900 mb-1">
              4. Anbieterdichte mit starkem regionalem Gefälle
            </p>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              Nordrhein-Westfalen führt mit 146 im Katalog erfassten Kranvermietern, Bayern folgt
              mit 126. Am dünnsten ist das Netz im Saarland (4), in Bremen (9) und in
              Mecklenburg-Vorpommern (15). In dünn besetzten Regionen bedeutet das längere
              Anfahrten und weniger Vergleichsangebote.
            </p>
          </li>
          <li className="border border-gray-200 rounded-lg p-4">
            <p className="text-[14px] font-semibold text-gray-900 mb-1">
              5. Der 30-Tonnen-Autokran ist die Brot-und-Butter-Klasse
            </p>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              500–800€ pro Tag inklusive Kranführer: Der 30-Tonner deckt die meisten Einsätze im
              Hausbau ab, vom Dachstuhl bis zum Fertiggaragen-Versetzen. Stundeneinsätze liegen bei
              150–200€/h mit typischerweise vier Stunden Mindestmietdauer.
            </p>
          </li>
        </ol>
      </section>

      {/* Signature insight: the Straßensperrung cost driver (Kranbetrieb-Input 2026-06, generalisiert).
          Qualitative, citable, links to the dedicated 5-Preistreiber page. No fabricated price. */}
      <section className="mb-10 border border-amber-200 bg-amber-50 rounded-lg p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Der unterschätzte Kostentreiber: die Straßensperrung
        </h2>
        <p className="text-[14px] text-gray-700 leading-relaxed">
          Der Mietpreis des Krans ist oft nicht der größte Posten. Steht der Kran auf öffentlichem
          Grund oder schwenkt die Last über den Verkehr, kommt eine Verkehrssicherung hinzu, im
          Extremfall eine behördlich angeordnete Vollsperrung. Bei manchen Einsätzen kostet allein
          diese Sperrung das{' '}
          <strong className="text-gray-900">Zwei- bis Dreifache des eigentlichen Kraneinsatzes</strong>.
          Wer früh klärt, ob der Kran auf privatem oder öffentlichem Grund steht, vermeidet die
          größte Überraschung auf der Rechnung.
        </p>
        <p className="text-[13px] text-gray-600 mt-3">
          Mehr dazu:{' '}
          <Link href="/ratgeber/kranpreise-praxis" className="text-blue-600 hover:underline">
            die fünf echten Preistreiber beim Kranmieten
          </Link>.
        </p>
      </section>

      {/* Price table, single source of truth: cranePrices. */}
      <section id="preise" className="mb-10 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Mietpreise 2026 nach Krantyp
        </h2>
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left font-medium text-gray-900">Krantyp</th>
                <th className="py-3 px-4 text-left font-medium text-gray-900">Tragkraft</th>
                <th className="py-3 px-4 text-left font-medium text-gray-900 whitespace-nowrap">Tagespreis</th>
                <th className="py-3 px-4 text-left font-medium text-gray-900 whitespace-nowrap">Wochenpreis</th>
                <th className="py-3 px-4 text-left font-medium text-gray-900">Kranführer</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {PRICE_TABLE_ORDER.map((slug, idx) => {
                const p = cranePrices.find(x => x.craneTypeSlug === slug)
                const meta = CRANE_DISPLAY[slug]
                if (!p || !meta) return null
                return (
                  <tr key={slug} className={`border-t ${idx % 2 ? 'bg-gray-50' : ''}`}>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      <Link href={`/${slug}`} className="hover:text-blue-600 hover:underline">{meta.name}</Link>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">{meta.tonnage}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{fmt(p.dayFrom)}–{fmt(p.dayTo)}€</td>
                    <td className="py-3 px-4 whitespace-nowrap">{fmt(p.weekFrom)}–{fmt(p.weekTo)}€</td>
                    <td className="py-3 px-4 text-gray-500">{p.includesOperator ? 'inklusive' : 'nicht enthalten'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-gray-400 mt-2">
          Unverbindliche Richtwerte (netto, zzgl. {TAX_LABEL}) aus Marktrecherche Q1 2026, ohne Transport
          und Sondergenehmigungen. Detaillierte Preise je Typ:{' '}
          <Link href="/kran-mieten-preise" className="text-blue-600 hover:underline">komplette Preisliste</Link>.
        </p>
      </section>

      {/* Demand by type. */}
      <section id="nachfrage" className="mb-10 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Welche Krantypen 2026 gesucht werden
        </h2>
        <p className="text-[14px] text-gray-600 mb-4 leading-relaxed">
          Grundlage: 31.766 typbezogene Suchanfragen-Impressionen der Plattform zwischen dem
          31. März und dem 7. Juni 2026. Der Anteil zeigt, wie sich das Suchinteresse auf die acht
          Krantypen verteilt.
        </p>
        {/* Citable key-figures graphic, same asset that goes out with press pitches. */}
        <figure className="mb-6">
          <a
            href="/images/kran-preisreport-2026-grafik.png"
            target="_blank"
            rel="noopener"
            title="Grafik in voller Auflösung öffnen"
          >
            <Image
              src="/images/kran-preisreport-2026-grafik.png"
              alt="Infografik Kran-Preisreport 2026: 31 Prozent der Suchanfragen rund um Kranmiete sind Preisfragen. Suchnachfrage nach Krantyp: Autokran 34 Prozent, Minikran 19 Prozent, Baukran 17 Prozent."
              width={1920}
              height={1080}
              className="w-full h-auto border border-gray-200 rounded-lg"
            />
          </a>
          <figcaption className="mt-2 text-[12px] text-gray-500">
            Zentrale Ergebnisse als Grafik, frei verwendbar mit Quellenangabe
            „KranVergleich.de, Kran-Preisreport 2026".{' '}
            <a
              href="/images/kran-preisreport-2026-grafik.png"
              className="text-blue-600 hover:underline"
              download
            >
              PNG herunterladen (1920×1080)
            </a>
          </figcaption>
        </figure>
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left font-medium text-gray-900">Krantyp</th>
                <th className="py-3 px-4 text-left font-medium text-gray-900 whitespace-nowrap">Impressionen</th>
                <th className="py-3 px-4 text-left font-medium text-gray-900 whitespace-nowrap">Anteil</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {DEMAND_BY_TYPE.map((d, idx) => (
                <tr key={d.slug} className={`border-t ${idx % 2 ? 'bg-gray-50' : ''}`}>
                  <td className="py-3 px-4 font-medium text-gray-900">
                    <Link href={`/${d.slug}`} className="hover:text-blue-600 hover:underline">{d.name}</Link>
                  </td>
                  <td className="py-3 px-4">{fmt(d.impressions)}</td>
                  <td className="py-3 px-4">{d.share}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-[15px] font-semibold text-gray-900 mt-6 mb-3">
          Die zehn häufigsten Preisfragen
        </h3>
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left font-medium text-gray-900">Suchanfrage</th>
                <th className="py-3 px-4 text-left font-medium text-gray-900 whitespace-nowrap">Impressionen (3 Monate)</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {TOP_PRICE_QUERIES.map((q, idx) => (
                <tr key={q.query} className={`border-t ${idx % 2 ? 'bg-gray-50' : ''}`}>
                  <td className="py-3 px-4">{q.query}</td>
                  <td className="py-3 px-4">{fmt(q.impressions)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Regional density. */}
      <section id="regionen" className="mb-10 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Anbieterdichte je Bundesland
        </h2>
        <p className="text-[14px] text-gray-600 mb-4 leading-relaxed">
          Gezählt werden Kranvermieter mit Firmensitz im jeweiligen Bundesland, die im
          KranVergleich-Katalog erfasst und aktiv sind (682 in Deutschland, Stand {STAND}). Die
          Zahlen bilden den Katalog ab, nicht den Gesamtmarkt, zeigen aber das regionale Gefälle
          deutlich: Viele Anbieter im Saarland und in Bremen bedienen die Region von Nachbarländern
          aus, was Anfahrtskosten erhöht.
        </p>
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left font-medium text-gray-900">Bundesland</th>
                <th className="py-3 px-4 text-left font-medium text-gray-900 whitespace-nowrap">Erfasste Anbieter</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {FIRMS_BY_STATE.map((s, idx) => (
                <tr key={s.state} className={`border-t ${idx % 2 ? 'bg-gray-50' : ''}`}>
                  <td className="py-3 px-4 font-medium text-gray-900">{s.state}</td>
                  <td className="py-3 px-4">{s.firms}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Methodology, legally required transparency (no "Marktstudie" framing). */}
      <section id="methodik" className="mb-10 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Methodik und Datenbasis</h2>
        <div className="text-[14px] text-gray-600 leading-relaxed space-y-3">
          <p>
            Dieser Report ist keine Vollerhebung des deutschen Kranmarkts. Datenbasis sind drei
            Quellen der Plattform KranVergleich:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-gray-900">Anbieter-Katalog:</strong> 682 aktive Kranvermieter
              in Deutschland und 64 in Österreich (Stand {STAND}), erfasst über 91 Städte. Gezählt
              werden Firmensitze, Niederlassungen großer Gruppen erscheinen je Standort einmal.
            </li>
            <li>
              <strong className="text-gray-900">Suchdaten:</strong> anonymisierte Impressionen und
              Suchanfragen der Plattform aus der Google Search Console, 31. März bis 7. Juni 2026
              (rund 95.000 Impressionen gesamt, 50.822 in der Suchanfragen-Stichprobe). Die Daten
            zeigen, wonach Nutzer suchen, die auf KranVergleich-Seiten treffen, und sind damit
              eine Stichprobe der Nachfrage, kein Gesamtmarktvolumen.
            </li>
            <li>
              <strong className="text-gray-900">Preisspannen:</strong> eigene Marktrecherche aus dem
              ersten Quartal 2026, identisch mit den Richtwerten unserer{' '}
              <Link href="/kran-mieten-preise" className="text-blue-600 hover:underline">Preisliste</Link>.
              Alle Preise netto zzgl. {TAX_LABEL}, ohne Transport, unverbindlich.
            </li>
          </ul>
          <p>
            Anbieter zahlen für die Aufnahme in den Katalog nichts. Premium-Einträge sind als
            solche gekennzeichnet und haben keinen Einfluss auf die Zahlen dieses Reports.
          </p>
        </div>
      </section>

      {/* Citation invite, the link-earning block. */}
      <section id="zitieren" className="mb-10 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Daten verwenden und zitieren</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-[14px] text-gray-600 leading-relaxed space-y-3">
          <p>
            Alle Zahlen, Tabellen und die Grafik dieses Reports dürfen für redaktionelle Zwecke
            frei verwendet werden. Bedingung ist die Quellenangabe mit Link:{' '}
            <strong className="text-gray-900">„Quelle: KranVergleich.de, Kran-Preisreport 2026"</strong>.
          </p>
          <p>
            Sie benötigen Rohdaten, eine regionale Sonderauswertung oder Zahlen zu einem einzelnen
            Krantyp? Schreiben Sie an{' '}
            <a href="mailto:christoph@kranvergleich.de" className="text-blue-600 hover:underline">
              christoph@kranvergleich.de
            </a>, Antwort in der Regel innerhalb von 24 Stunden.
          </p>
          <p>
            Eine vertiefte Auswertung der Nachfrageseite, also wonach 2026 gesucht wird und wie sich die
            Nachfrage regional entwickelt, finden Sie im{' '}
            <Link href="/nachfrage-report" className="text-blue-600 hover:underline">Nachfrage-Report 2026</Link>.
          </p>
        </div>
      </section>

      {/* FAQ + FAQPage JSON-LD via component. */}
      <div id="faq" className="mb-10 scroll-mt-20">
        <FAQSection faqs={faqs} craneTypeName="Kran" />
      </div>

      {/* Next step, no boilerplate CTA. */}
      <section className="border border-blue-100 bg-blue-50 rounded-lg p-5">
        <h2 className="text-[15px] font-semibold text-gray-900 mb-2">
          Sie planen einen Kraneinsatz?
        </h2>
        <p className="text-[14px] text-gray-700 leading-relaxed mb-3">
          Über den <Link href="/kostenrechner" className="text-blue-600 hover:underline font-medium">Kostenrechner</Link>{' '}
          erhalten Sie in zwei Minuten eine Krantyp-Empfehlung mit Kostenrahmen, oder Sie vergleichen
          direkt auf der <Link href="/kran-mieten-preise" className="text-blue-600 hover:underline font-medium">Preisliste aller 8 Krantypen</Link>.
          Eine Sammelanfrage an mehrere Anbieter ist kostenlos.
        </p>
      </section>
    </div>
  )
}
