import type { Metadata } from 'next'
import Link from 'next/link'
import { CostCalculator } from '@/components/cost-calculator'
import { FAQSection } from '@/components/faq-section'
import { getSiteStats } from '@/lib/queries'
import { alternatesFor } from '@/lib/alternates'
import { COUNTRY_LABEL, BRAND_NAME, TAX_LABEL } from '@/lib/country'
import { cranePrices } from '@/data/crane-prices'
import { OG_IMAGE } from '@/lib/og-image'

// Display name + tonnage band per slug for the Preis-Referenztabelle below.
// Same vocabulary as /ratgeber/was-kostet-ein-kran (kept consistent so a user
// who lands here vs there reads the same labels).
const CRANE_DISPLAY: Record<string, { name: string; tonnage: string }> = {
  'anhaengerkran-mieten': { name: 'Anhängerkran', tonnage: 'bis 1,5 t' },
  'minikran-mieten': { name: 'Minikran (Spinnenkran)', tonnage: '0,5–3 t' },
  'dachdeckerkran-mieten': { name: 'Dachdeckerkran', tonnage: '0,5–2 t' },
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

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Kostenrechner — Wie viel kostet ein Kran für mein Projekt?',
  description:
    'Kran-Kostenrechner: In 4 Schritten erfahren Sie, welchen Kran Sie brauchen und was er kostet. Minikran, Autokran, Baukran — unverbindliche Preisschätzung mit Anbietervergleich.',
  alternates: alternatesFor('/kostenrechner'),
  openGraph: {
    title: 'Kostenrechner — Wie viel kostet ein Kran für mein Projekt?',
    description:
      'Kran-Kostenrechner: In 4 Schritten den passenden Kran finden und Kosten schätzen.',
    type: 'website',
    url: '/kostenrechner',
      images: [OG_IMAGE],
  },
}

const faqs = [
  {
    question: 'Wie genau ist der Kostenrechner?',
    answer:
      `Der Rechner liefert unverbindliche Richtwerte basierend auf Marktdurchschnitt 2026. Die tatsächlichen Kosten hängen von Anbieter, Region, Verfügbarkeit und Projektdetails ab. Für ein verbindliches Angebot empfehlen wir, über ${BRAND_NAME} direkt bei Anbietern anzufragen.`,
  },
  {
    question: 'Welche Kosten sind im Ergebnis enthalten?',
    answer:
      'Das Ergebnis zeigt die reine Mietkosten (Tages-, Wochen- oder Monatspreise). Nicht enthalten sind: Transportkosten (An-/Abfahrt), Montage/Demontage bei Baukranen, Genehmigungsgebühren und eventuelle Zuschläge für Wochenend- oder Nachteinsätze.',
  },
  {
    question: 'Ist ein Kranführer im Preis enthalten?',
    answer:
      'Bei Autokranen, Mobilkranen und Raupenkranen ist der Kranführer gesetzlich vorgeschrieben und im Preis enthalten. Bei Minikranen, Dachdeckerkranen, Anhängerkranen und Ladekranen bedienen Sie den Kran nach Einweisung selbst.',
  },
  {
    question: 'Wie finde ich den passenden Anbieter?',
    answer:
      `Nach der Berechnung zeigt der Rechner einen Link zu passenden Anbietern in Ihrer Region. Auf ${BRAND_NAME} können Sie Preise, Bewertungen und Leistungen vergleichen und kostenlos Angebote anfragen.`,
  },
]

export default async function KostenrechnerPage() {
  const { anbieterCount } = await getSiteStats()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">
          Startseite
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Kostenrechner</span>
      </nav>

      {/* H1 */}
      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
        Kran-Kostenrechner
      </h1>
      <p className="text-[15px] text-gray-500 mb-6">
        Wie viel kostet ein Kran für Ihr Projekt? Beantworten Sie 4 kurze Fragen und erhalten
        Sie eine Empfehlung mit Preisschätzung — kostenlos und unverbindlich.
      </p>

      {/* Calculator */}
      <div className="mb-10">
        <CostCalculator />
      </div>

      {/* SEO text */}
      <div className="text-[14px] text-gray-500 leading-relaxed mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          So funktioniert der Kran-Kostenrechner
        </h2>
        <p className="mb-3">
          Unser Kostenrechner hilft Ihnen in wenigen Schritten, den richtigen Krantyp für Ihr
          Bauprojekt zu finden und die voraussichtlichen Mietkosten zu schätzen. Der Rechner
          berücksichtigt die Art der Arbeit, das Gewicht der Last, die benötigte Hubhöhe und die
          geplante Mietdauer.
        </p>
        <p className="mb-3">
          Die Preise basieren auf einer Marktanalyse von {anbieterCount} Kranvermietungen in {COUNTRY_LABEL}
          (Stand 2026). Für ein verbindliches Angebot können Sie über {BRAND_NAME} kostenlos
          bei mehreren Anbietern gleichzeitig anfragen.
        </p>
        <p>
          <strong className="text-gray-700">Tipp:</strong> Bei längerer Mietdauer (Woche oder
          Monat) sinkt der Tagespreis erheblich. Fragen Sie gezielt nach Wochen- oder
          Monatspreisen, um Kosten zu sparen.
        </p>
      </div>

      {/* Preis-Referenztabelle — covers the search intent for users who land
          here without using the wizard. Per Opus 4.7 audit (top-3 competitor
          edge): typical first-page results show price reference even
          alongside an interactive tool, so the page serves intent both ways. */}
      <section id="preise" className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Preisübersicht: Was kostet welcher Kran?</h2>
        <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
          Bevor Sie den Rechner ausfüllen oder direkt nach einem Krantyp suchen, hier die
          aktuellen Mietpreise aller 8 Krantypen im Überblick. Wochen- und Monatspreise senken
          den Tagespreis spürbar — bei einem Mobilkran beispielsweise von 600€/Tag auf rund
          330€/Tag bei Monatsmiete.
        </p>
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left font-medium text-gray-900">Krantyp</th>
                <th className="py-3 px-4 text-left font-medium text-gray-900">Tragkraft</th>
                <th className="py-3 px-4 text-left font-medium text-gray-900 whitespace-nowrap">Tag</th>
                <th className="py-3 px-4 text-left font-medium text-gray-900 whitespace-nowrap">Woche</th>
                <th className="py-3 px-4 text-left font-medium text-gray-900 whitespace-nowrap">Monat</th>
                <th className="py-3 px-4 text-left font-medium text-gray-900">Kranführer</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {PRICE_TABLE_ORDER.map((slug, idx) => {
                const p = cranePrices.find(x => x.craneTypeSlug === slug)
                const meta = CRANE_DISPLAY[slug]
                if (!p || !meta) return null
                const fmt = (n: number) => n.toLocaleString('de-DE')
                return (
                  <tr key={slug} className={`border-t ${idx % 2 ? 'bg-gray-50' : ''}`}>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      <Link href={`/${slug}`} className="hover:text-blue-600 hover:underline">{meta.name}</Link>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">{meta.tonnage}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{fmt(p.dayFrom)}–{fmt(p.dayTo)}€</td>
                    <td className="py-3 px-4 whitespace-nowrap">{fmt(p.weekFrom)}–{fmt(p.weekTo)}€</td>
                    <td className="py-3 px-4 whitespace-nowrap">{fmt(p.monthFrom)}–{fmt(p.monthTo)}€</td>
                    <td className="py-3 px-4 text-gray-500">{p.includesOperator ? 'inklusive' : 'nicht enthalten'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-gray-400 mt-2">
          Richtwerte 2026, netto zzgl. {TAX_LABEL}. Transport (An- und Abfahrt) typischerweise
          1–4€/km extra; bei Baukran kommen einmalig 3.000–8.000€ für Montage und Demontage hinzu.
        </p>
      </section>

      {/* "Was beeinflusst den Kranpreis?" — six factors with industry vocabulary
          (Tragkraft, Hubhöhe, Auslegerlänge, Mietdauer, Region, An-/Abfahrt) per
          Opus eval recommendation. Each ~70 words → ~420 words content total. */}
      <section id="faktoren" className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Was beeinflusst den Kranpreis?</h2>
        <p className="text-[14px] text-gray-500 leading-relaxed mb-5">
          Der Tagespreis eines Krans hängt von sechs Faktoren ab, die sich zum Teil deutlich
          auswirken. Wer die Stellschrauben kennt, kann gezielt sparen — oder umgekehrt früh
          erkennen, ob ein Angebot fair kalkuliert ist.
        </p>
        <div className="space-y-3">
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="font-medium text-gray-900 mb-1">1. Tragkraft (Tonnage)</p>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Der wichtigste Preisfaktor. Ein Mobilkran 30t kostet ca. 600–900€/Tag, ein
              Mobilkran 100t bereits 1.300–1.800€/Tag, ein Schwerlast-Mobilkran 500t über
              2.500€/Tag. Faustregel: Pro verdoppelter Tonnage steigt der Tagespreis um etwa
              60–80%. Wählen Sie immer den kleinsten Kran, der Ihre Last und Hubhöhe sicher
              schafft — Reservetragkraft kostet bares Geld.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="font-medium text-gray-900 mb-1">2. Hubhöhe und Auslegerlänge</p>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Bei gleicher Tragkraft kostet ein Kran mit längerem Ausleger oder mehr Hakenhöhe
              spürbar mehr. Für eine Hubhöhe von 30 m reicht meist ein Standard-Autokran;
              ab 40 m brauchen Sie einen größeren Mobilkran oder einen Baukran. Ein 60-m-Mast
              auf einem Mobilkran kann den Tagespreis im Vergleich zur 30-m-Variante verdoppeln.
              Hubhöhe nicht überdimensionieren — der Preis macht es spürbar.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="font-medium text-gray-900 mb-1">3. Mietdauer</p>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Wochen- und Monatsmieten senken den effektiven Tagespreis um 30–50%. Ein
              Mobilkran kostet in Tagesmiete 600€, in Wochenmiete entspricht das ca. 430€/Tag,
              in Monatsmiete sogar nur ~330€/Tag. Wer ein 4-Tage-Projekt hat, fragt fast immer
              günstiger mit Wochenpreis als mit 4 Einzeltagen — der Aufschlag für Mindestmietzeit
              ist meist verhandelbar.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="font-medium text-gray-900 mb-1">4. Mit oder ohne Kranführer</p>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Bei Auto-, Mobil- und Raupenkran ist der Kranführer gesetzlich vorgeschrieben
              (DGUV Vorschrift 52, Kran-Sachkundenachweis) und im Tagespreis enthalten —
              Stundenkosten Kranführer typischerweise 60–80€. Bei Mini-, Anhänger-, Dachdecker-,
              Lade- und Baukran übernehmen Sie die Bedienung selbst nach kurzer Einweisung
              durch den Vermieter. Das senkt den Mietpreis um 30–50% gegenüber bedienten
              Kranen.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="font-medium text-gray-900 mb-1">5. Region und Anfahrt</p>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Anfahrtkosten machen bei Kurzeinsätzen einen Großteil des Endpreises aus. Ein
              Autokran rechnet 1–4€/km für An- und Abfahrt — bei 100 km Entfernung sind das
              200–800€ extra. In Ballungsräumen (Berlin, Hamburg, München, Ruhrgebiet) ist die
              Auswahl größer und die Anfahrt kürzer; in ländlichen Regionen kommen meist 50–150
              km Anfahrt ab Standort des Vermieters dazu. Bei Spezialkranen (Spinnenkran,
              Schwerlast) oft auch Sondergenehmigungen für Großraumtransport.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="font-medium text-gray-900 mb-1">6. Sondergenehmigungen und Sperrungen</p>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Wenn der Kran nicht auf Privatgrund stehen kann, brauchen Sie eine
              Sondernutzungserlaubnis der Stadt (typischerweise 30–200€) und ggf. eine
              halbseitige Straßensperrung mit Verkehrszeichenplan (200–800€). In Innenstädten
              oder bei Hubarbeiten über öffentlichem Grund sind diese Posten Pflicht. Der
              Vermieter erledigt die Anträge meist gegen Aufpreis (~150€ Servicegebühr) — das
              ist deutlich schneller als selbst zur Verkehrsbehörde zu gehen.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div className="mb-10">
        <FAQSection faqs={faqs} craneTypeName="Kran" />
      </div>

      {/* Cross-links */}
      <div className="mb-10">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Weiterführende Seiten</h2>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/kran-mieten-preise"
            className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors"
          >
            Kran mieten Preisliste
          </Link>
          <Link
            href="/ratgeber/welchen-kran-brauche-ich"
            className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors"
          >
            Welchen Kran brauche ich?
          </Link>
          <Link
            href="/ratgeber/kran-mieten-tipps"
            className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors"
          >
            7 Tipps für Bauunternehmer
          </Link>
        </div>
      </div>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://kranvergleich.de/' },
              { '@type': 'ListItem', position: 2, name: 'Kostenrechner' },
            ],
          }),
        }}
      />
    </div>
  )
}
