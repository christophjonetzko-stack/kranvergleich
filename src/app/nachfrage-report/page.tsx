import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { alternatesFor } from '@/lib/alternates'
import { OG_IMAGE } from '@/lib/og-image'

export const revalidate = 86400

const TITLE = 'Nachfrage-Report 2026: Was Deutschland beim Kran sucht'
const DESC =
  '117.380 Suchanfragen ausgewertet: Welcher Krantyp gefragt ist, warum der Preis die häufigste Frage ist und wie sich die Nachfrage 2026 regional verteilt. Frei zitierbar mit Quellenangabe.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: alternatesFor('/nachfrage-report'),
  openGraph: {
    title: TITLE,
    description: DESC,
    type: 'article',
    url: '/nachfrage-report',
    images: [OG_IMAGE],
  },
}

// Report snapshot. Static by design: a dated report must stay stable and citable
// between editions. Numbers FROZEN on the 01.04.–28.06.2026 window and must match
// the charts. Source: Dosc/NACHFRAGE_REPORT_2026_VERSION_A.md (GSC re-pull 30.06).
const STAND = '1. Juli 2026'
const DATE_PUBLISHED = '2026-07-01'

// §3 — type share of search impressions (GSC, 01.04.–28.06.2026).
const DEMAND_SEARCH = [
  { name: 'Autokran', slug: 'autokran-mieten', share: '31,4 %' },
  { name: 'Minikran', slug: 'minikran-mieten', share: '19,0 %' },
  { name: 'Baukran', slug: 'baukran-mieten', share: '16,2 %' },
  { name: 'Mobilkran', slug: 'mobilkran-mieten', share: '12,1 %' },
  { name: 'Dachdeckerkran', slug: 'dachdeckerkran-mieten', share: '8,4 %' },
  { name: 'Ladekran', slug: 'ladekran-mieten', share: '6,2 %' },
  { name: 'Anhängerkran', slug: 'anhaengerkran-mieten', share: '3,7 %' },
  { name: 'Raupenkran', slug: 'raupenkran-mieten', share: '2,9 %' },
]

// §3 — share of on-site type-page interactions (1.323 interactions; separate source).
const DEMAND_ONSITE = [
  { name: 'Minikran', slug: 'minikran-mieten', share: '24,0 %' },
  { name: 'Autokran', slug: 'autokran-mieten', share: '20,9 %' },
  { name: 'Baukran', slug: 'baukran-mieten', share: '14,6 %' },
  { name: 'Anhängerkran', slug: 'anhaengerkran-mieten', share: '13,0 %' },
  { name: 'Mobilkran', slug: 'mobilkran-mieten', share: '11,2 %' },
]

const TOP_CITIES = [
  'München', 'Köln', 'Hannover', 'Hamburg', 'Nürnberg',
  'Bonn', 'Berlin', 'Leipzig', 'Karlsruhe', 'Erfurt',
]

const PRICE_QUERIES = ['kran mieten kosten', 'baukran mieten preisliste', 'autokran mieten kosten']

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'KranVergleich Nachfrage-Report 2026',
  description: DESC,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_PUBLISHED,
  author: { '@type': 'Person', name: 'Christoph Jonetzko' },
  publisher: {
    '@type': 'Organization',
    name: 'KranVergleich.de',
    url: 'https://kranvergleich.de',
  },
  mainEntityOfPage: 'https://kranvergleich.de/nachfrage-report',
  image: 'https://kranvergleich.de/images/nachfrage-report-2026-d1-preis.webp',
  isAccessibleForFree: true,
}

function ReportChart({
  src, alt, caption, width, height,
}: { src: string; alt: string; caption: string; width: number; height: number }) {
  return (
    <figure className="my-6">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto border border-gray-200 rounded-lg"
      />
      <figcaption className="mt-2 text-[12px] text-gray-500">{caption}</figcaption>
    </figure>
  )
}

function SignupCta() {
  return (
    <section className="border border-blue-100 bg-blue-50 rounded-lg p-5">
      <h2 className="text-[15px] font-semibold text-gray-900 mb-2">Die nächste Ausgabe erhalten</h2>
      <p className="text-[14px] text-gray-700 leading-relaxed mb-4">
        Dieser Report erscheint regelmäßig. Tragen Sie sich ein, und Sie bekommen die nächste Ausgabe
        automatisch, inklusive der regionalen Auswertung für Ihre Stadt. Kein Verkauf, keine Werbung,
        einmal pro Quartal.
      </p>
      <Link
        href="/nachfrage-report/anmelden"
        className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium rounded-lg transition-colors"
      >
        Report kostenlos abonnieren
      </Link>
    </section>
  )
}

export default function NachfrageReportPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Nachfrage-Report 2026</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
        KranVergleich Nachfrage-Report 2026
      </h1>
      <p className="text-[15px] text-gray-600 mb-3">
        Was Deutschland beim Kranmieten wirklich sucht: 117.380 Suchanfragen ausgewertet.
      </p>
      {/* Byline (author = authority). */}
      <p className="text-[13px] text-gray-500 mb-6 leading-relaxed">
        Ein Report von <strong className="text-gray-700">Christoph Jonetzko</strong>. Vier Jahre lang hat
        er im Liebherr-Werk Ehingen Mobilkrane gebaut, von der LTM 1230 bis zur LTM 1650, heute ist er
        Gründer von KranVergleich.de. · Stand: {STAND} · <a href="#methodik" className="text-blue-600 hover:underline">Methodik</a>
      </p>

      {/* §1 — Kurzantwort (AEO). */}
      <section className="mb-10">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-6">
          <p className="text-[13px] font-semibold text-gray-900 mb-3">Das Wichtigste in Kürze</p>
          <ul className="space-y-3 text-[14px] text-gray-700 leading-relaxed">
            <li>
              <strong className="text-gray-900">Der Preis ist die häufigste Frage.</strong> 27,6 % aller
              Such-Impressionen entfallen auf Anfragen mit Preisbezug, sie lösen aber 68 % aller Klicks
              aus. Wer die Preisfrage ernst nimmt und ehrlich einordnet, trifft die Nachfrage dort, wo
              sie am größten ist.
            </li>
            <li>
              <strong className="text-gray-900">Autokran führt in der Suche, Minikran im Interesse vor Ort.</strong>{' '}
              In den Suchanfragen liegt der Autokran mit 31,4 % vorn. Auf der Plattform zieht der Minikran
              mit 24 % der Seiteninteraktionen das meiste Engagement.
            </li>
            <li>
              <strong className="text-gray-900">Die Nachfrage wächst deutlich.</strong> Die täglichen
              Such-Impressionen sind von rund 30 (Anfang April) auf über 2.000 (Ende Juni) gestiegen.
            </li>
            <li>
              <strong className="text-gray-900">Ballungsräume dominieren.</strong> München, Köln und
              Hannover stehen an der Spitze der regionalen Suchnachfrage, gefolgt von Hamburg, Nürnberg
              und Bonn.
            </li>
          </ul>
        </div>
        <ReportChart
          src="/images/nachfrage-report-2026-d1-preis.webp"
          alt="Balkendiagramm: preisbezogene Anfragen 27,6 % der Impressionen, 68 % der Klicks"
          caption="Preisbezogene Anfragen machen 27,6 % der Impressionen aus, lösen aber 68 % der Klicks aus. Quelle: KranVergleich.de, Nachfrage-Report 2026."
          width={1200}
          height={840}
        />
      </section>

      {/* Signup CTA — top. */}
      <div className="mb-10"><SignupCta /></div>

      {/* §2 — Methodik. */}
      <section id="methodik" className="mb-10 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Methodik und Datengrundlage</h2>
        <div className="text-[14px] text-gray-600 leading-relaxed space-y-3">
          <p>
            Die Auswertung zeigt die Suchnachfrage, die über KranVergleich.de sichtbar wird, nicht den
            gesamten deutschen Kranmarkt. Mietpreise einzelner Anbieter werden hier nicht verglichen.
            Drei Quellen liegen dem Report zugrunde:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-gray-900">Google Search Console (KranVergleich.de):</strong>{' '}
              Auswertungszeitraum 1. April bis 28. Juni 2026. Die meistgenutzten 1.000 Suchanfragen decken
              75.110 von 117.380 Impressionen in Deutschland ab, also 64 % des Suchvolumens.
            </li>
            <li>
              <strong className="text-gray-900">Nutzungsverhalten auf der Plattform:</strong> 1.323 erfasste
              Interaktionen mit den Krantyp-Seiten zeigen, wofür sich Besucher nach der Suche interessieren.
            </li>
            <li>
              <strong className="text-gray-900">Reale Anfragen:</strong> 41 Anfragen gingen im Zeitraum
              ein, 35 wurden an mindestens einen Anbieter weitergeleitet. Sie dienen als Größenordnung,
              nicht als statistische Grundlage.
            </li>
          </ul>
          <p>
            Alle Zahlen sind Aggregate, einzelne Anfragen oder Personen lassen sich daraus nicht ableiten.
            Die Diagramme sind eigene Darstellungen auf Basis der genannten Quellen.
          </p>
        </div>
      </section>

      {/* §3 — Nachfrage nach Krantyp (2 Tabellen). */}
      <section id="krantypen" className="mb-10 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Nachfrage nach Krantyp</h2>
        <p className="text-[14px] text-gray-600 mb-4 leading-relaxed">
          In den Google-Suchanfragen ergibt sich eine klare Rangfolge. Der Autokran ist mit Abstand der
          gefragteste Typ, was zu seiner breiten Einsetzbarkeit passt.
        </p>
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left font-medium text-gray-900">Krantyp</th>
                <th className="py-3 px-4 text-left font-medium text-gray-900 whitespace-nowrap">Anteil der Such-Impressionen</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {DEMAND_SEARCH.map((d, idx) => (
                <tr key={d.slug} className={`border-t ${idx % 2 ? 'bg-gray-50' : ''}`}>
                  <td className="py-3 px-4 font-medium text-gray-900">
                    <Link href={`/${d.slug}`} className="hover:text-blue-600 hover:underline">{d.name}</Link>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">{d.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[14px] text-gray-600 my-4 leading-relaxed">
          Wer von der Suche auf KranVergleich.de landet, beschäftigt sich aber überdurchschnittlich oft
          mit dem Minikran. Wonach gesucht wird, ist also nicht dasselbe wie das, womit man sich dann
          näher befasst: Der Autokran bringt das Volumen, der Minikran das Engagement.
        </p>
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left font-medium text-gray-900">Krantyp</th>
                <th className="py-3 px-4 text-left font-medium text-gray-900 whitespace-nowrap">Anteil der Seiteninteraktionen</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {DEMAND_ONSITE.map((d, idx) => (
                <tr key={d.slug} className={`border-t ${idx % 2 ? 'bg-gray-50' : ''}`}>
                  <td className="py-3 px-4 font-medium text-gray-900">
                    <Link href={`/${d.slug}`} className="hover:text-blue-600 hover:underline">{d.name}</Link>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">{d.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ReportChart
          src="/images/nachfrage-report-2026-d2-typen.webp"
          alt="Vergleich Krantyp-Nachfrage in der Suche und Interaktionen auf der Plattform"
          caption="Suchnachfrage gegen Interesse auf der Plattform: Der Autokran führt die Suche an, der Minikran das Engagement. Quelle: KranVergleich.de, Nachfrage-Report 2026."
          width={1200}
          height={840}
        />
      </section>

      {/* §4 — Preis-Transparenz. */}
      <section id="preis-transparenz" className="mb-10 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Die Preisfrage: am häufigsten gestellt, am schwersten zu beantworten
        </h2>
        <p className="text-[14px] text-gray-600 mb-4 leading-relaxed">
          Anfragen mit Preisbezug machen 27,6 % der Such-Impressionen aus, lösen aber 68 % aller Klicks
          aus. Mehr als ein Viertel aller Suchanfragen dreht sich um Kosten, und genau diese Anfragen
          erzeugen den Großteil der Klicks. Die häufigsten preisbezogenen Suchbegriffe zeigen, wie konkret
          die Erwartung ist:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-[14px] text-gray-700 mb-4">
          {PRICE_QUERIES.map((q) => (
            <li key={q}><code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">{q}</code></li>
          ))}
        </ul>
        <p className="text-[14px] text-gray-600 mb-2 leading-relaxed">
          Wer so sucht, will eine Orientierung. Nur lässt sich ein seriöser Kranpreis vorab kaum als
          Pauschale nennen. Er hängt an Anfahrt, Zufahrt, Hubgeometrie, Ballast und nötigen
          Genehmigungen, und jede Baustelle ist anders. Eine Preistabelle täuscht hier eine Genauigkeit
          vor, die es nicht gibt. Die eigentliche Lücke ist deshalb nicht die fehlende Preisliste,
          sondern die fehlende ehrliche Einordnung, was einen Einsatz teuer oder günstig macht, und die
          Möglichkeit, schnell mehrere Anbieter zu vergleichen. Welche Faktoren einen Einsatz teuer oder
          günstig machen, zeigen die{' '}
          <Link href="/ratgeber/kranpreise-praxis" className="text-blue-600 hover:underline">fünf echten Preistreiber</Link>.
        </p>
        <ReportChart
          src="/images/nachfrage-report-2026-d3-ratio.webp"
          alt="Ringdiagramm: 27,6 % der Impressionen, 68 % der Klicks preisbezogen"
          caption="27,6 % der Impressionen, aber 68 % der Klicks entfallen auf preisbezogene Anfragen. Quelle: KranVergleich.de, Nachfrage-Report 2026."
          width={1200}
          height={760}
        />
      </section>

      {/* §5 — Regionale Nachfrage. */}
      <section id="regionen" className="mb-10 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Regionale Nachfrage und DACH-Ausblick</h2>
        <p className="text-[14px] text-gray-600 mb-3 leading-relaxed">
          Die Suchnachfrage konzentriert sich auf die großen Ballungsräume. An der Spitze stehen:
        </p>
        <p className="text-[14px] text-gray-800 font-medium mb-4">{TOP_CITIES.join(' · ')}</p>
        <p className="text-[14px] text-gray-600 mb-3 leading-relaxed">
          Das Muster folgt der Bautätigkeit. Auffällig ist, dass neben den erwarteten Metropolen auch
          Städte wie Hannover, Bonn und Erfurt weit oben liegen, ein Hinweis, dass die Nachfrage nicht
          allein an der Einwohnerzahl hängt, sondern an der konkreten Bauaktivität vor Ort.
        </p>
        <p className="text-[14px] text-gray-600 mb-2 leading-relaxed">
          <strong className="text-gray-900">DACH-Ausblick:</strong> Österreich kommt im Zeitraum auf 1.307
          Impressionen, das bestätigt den Schritt zu KranVergleich.at. Bemerkenswerter ist die Schweiz mit
          1.526 Impressionen bei bisher null Abdeckung, ein offenes Signal, das wir im Blick behalten.
        </p>
        <ReportChart
          src="/images/nachfrage-report-2026-d4-staedte.webp"
          alt="Balkendiagramm: Top-Städte nach Kran-Suchnachfrage, München führt"
          caption="Top-Städte nach Kran-Suchnachfrage, angeführt von München. Quelle: KranVergleich.de, Nachfrage-Report 2026."
          width={1200}
          height={840}
        />
      </section>

      {/* §6 — Entwicklung über die Zeit. */}
      <section id="entwicklung" className="mb-10 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Entwicklung über die Zeit</h2>
        <p className="text-[14px] text-gray-600 mb-2 leading-relaxed">
          Anfang April lagen die täglichen Such-Impressionen bei rund 30. Bis Mai kletterten sie auf über
          2.000 und haben sich seither auf diesem Niveau eingependelt. Der Anstieg um mehr als das
          Sechzigfache fand vor allem im Frühjahr statt, danach hielt sich die Nachfrage stabil auf hohem
          Niveau. Für eine belastbare Saisonalitätsaussage über das ganze Jahr ist der Zeitraum noch zu
          kurz, die Richtung ist aber eindeutig.
        </p>
        <ReportChart
          src="/images/nachfrage-report-2026-d5-trend.webp"
          alt="Liniendiagramm: tägliche Such-Impressionen April bis Juni 2026, Anstieg dann Plateau"
          caption="Tägliche Such-Impressionen April bis Juni 2026: steiler Anstieg, danach Plateau. Quelle: KranVergleich.de, Nachfrage-Report 2026."
          width={1200}
          height={760}
        />
      </section>

      {/* §7 — Praxis. */}
      <section id="praxis" className="mb-10 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Was die Zahlen für die Praxis bedeuten</h2>
        <div className="text-[14px] text-gray-600 leading-relaxed space-y-3">
          <p>
            <strong className="text-gray-900">Für Vermieter:</strong> Die Nachfrage ist dort am größten, wo
            der Preis sichtbar wird. Jeder Einsatz ist anders, Tragkraft, Hubhöhe, Mietdauer, Anfahrt und
            nötige Genehmigungen verschieben den Preis spürbar. Wer schnell und nachvollziehbar auf eine
            Anfrage reagiert und offen erklärt, was den Preis bestimmt, trifft die am häufigsten gestellte
            Frage besser als jede Pauschale. Der Minikran verdient dabei mehr Aufmerksamkeit, als sein
            Suchvolumen vermuten lässt.
          </p>
          <p>
            <strong className="text-gray-900">Für Bauunternehmen und Einkäufer:</strong> Mit Ihrer
            Preisfrage sind Sie nicht allein, sie ist die Norm. Ein Vergleich mehrerer Anbieter lohnt sich
            gerade deshalb, weil Preise selten offen kommuniziert werden. Wer früh anfragt und mehrere
            Angebote nebeneinanderlegt, verschafft sich den klarsten Überblick.
          </p>
        </div>
      </section>

      {/* §8 — Über + Zitieren. */}
      <section id="ueber" className="mb-10 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Über KranVergleich.de und Datennutzung</h2>
        <div className="text-[14px] text-gray-600 leading-relaxed space-y-3">
          <p>
            KranVergleich.de ist ein Vergleichsportal für Kranvermietung in Deutschland und Österreich.
            Über die Plattform finden Bauunternehmen, Handwerksbetriebe und Privatkunden über 740
            Kranvermieter in mehr als 100 Städten und können kostenlos und unverbindlich Angebote anfragen.
            Gegründet wurde KranVergleich.de von Christoph Jonetzko, der zuvor vier Jahre im Liebherr-Werk
            Ehingen Mobilkrane der Baureihe LTM 1230 bis 1650 mitgebaut hat.
          </p>
          <p>
            Diesen Report stellen wir frei zur Verfügung. Zahlen, Diagramme und Auszüge dürfen mit
            Quellenangabe „KranVergleich.de, Nachfrage-Report 2026" und Link auf diese Seite verwendet
            werden. Für Rückfragen oder Sonderauswertungen erreichen Sie uns unter{' '}
            <a href="mailto:christoph@kranvergleich.de" className="text-blue-600 hover:underline">christoph@kranvergleich.de</a>.
          </p>
        </div>
      </section>

      {/* Signup CTA — bottom. */}
      <SignupCta />
    </div>
  )
}
