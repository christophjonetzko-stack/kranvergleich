import type { Metadata } from 'next'
import Link from 'next/link'
import { CostCalculator } from '@/components/cost-calculator'
import { FAQSection } from '@/components/faq-section'

export const metadata: Metadata = {
  title: 'Kostenrechner — Wie viel kostet ein Kran für mein Projekt?',
  description:
    'Kran-Kostenrechner: In 4 Schritten erfahren Sie, welchen Kran Sie brauchen und was er kostet. Minikran, Autokran, Baukran — unverbindliche Preisschätzung mit Anbietervergleich.',
  alternates: { canonical: '/kostenrechner' },
  openGraph: {
    title: 'Kostenrechner — Wie viel kostet ein Kran für mein Projekt?',
    description:
      'Kran-Kostenrechner: In 4 Schritten den passenden Kran finden und Kosten schätzen.',
    type: 'website',
    url: '/kostenrechner',
  },
}

const faqs = [
  {
    question: 'Wie genau ist der Kostenrechner?',
    answer:
      'Der Rechner liefert unverbindliche Richtwerte basierend auf Marktdurchschnitt 2026. Die tatsächlichen Kosten hängen von Anbieter, Region, Verfügbarkeit und Projektdetails ab. Für ein verbindliches Angebot empfehlen wir, über KranVergleich.de direkt bei Anbietern anzufragen.',
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
      'Nach der Berechnung zeigt der Rechner einen Link zu passenden Anbietern in Ihrer Region. Auf KranVergleich.de können Sie Preise, Bewertungen und Leistungen vergleichen und kostenlos Angebote anfragen.',
  },
]

export default function KostenrechnerPage() {
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
          Die Preise basieren auf einer Marktanalyse von über 800 Kranvermietungen in Deutschland
          (Stand 2026). Für ein verbindliches Angebot können Sie über KranVergleich.de kostenlos
          bei mehreren Anbietern gleichzeitig anfragen.
        </p>
        <p>
          <strong className="text-gray-700">Tipp:</strong> Bei längerer Mietdauer (Woche oder
          Monat) sinkt der Tagespreis erheblich. Fragen Sie gezielt nach Wochen- oder
          Monatspreisen, um Kosten zu sparen.
        </p>
      </div>

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
