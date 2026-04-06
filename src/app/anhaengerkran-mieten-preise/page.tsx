import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/faq-section'
import { getSiteStats } from '@/lib/queries'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Anhängerkran mieten Preise & Kosten 2026 — ab 150€/Tag',
  description:
    'Anhängerkran mieten Preise 2026: Tagesmiete ab 150€, Wochenmiete ab 700€. PKW-Anhänger mit Kran Kosten im Überblick. Böcker, Klaas & mehr. Jetzt Anbieter vergleichen.',
  alternates: { canonical: '/anhaengerkran-mieten-preise' },
  openGraph: {
    title: 'Anhängerkran mieten Preise & Kosten 2026',
    description: 'Was kostet ein Anhängerkran? Tagesmiete ab 150€. Komplette Preisübersicht für PKW-Anhänger mit Kran.',
    type: 'website',
    url: '/anhaengerkran-mieten-preise',
  },
}

const faqs = [
  {
    question: 'Was kostet ein Anhängerkran pro Tag?',
    answer: 'Ein Anhängerkran kostet zwischen 150€ und 350€ pro Tag (netto). Kleine Modelle (bis 500 kg Tragkraft) ab 150€, mittlere (bis 1.000 kg) ab 200€, große (bis 1.500 kg) ab 280€. Transport und Einweisung sind oft inklusive.',
  },
  {
    question: 'Was kostet ein Anhängerkran pro Woche?',
    answer: 'Wochenmiete: 700€ bis 1.800€. Das entspricht ca. 100–257€ pro Tag — deutlich günstiger als der Tagespreis. Bei Projekten ab 3 Tagen lohnt sich die Wochenmiete fast immer.',
  },
  {
    question: 'Was kostet ein Böcker Anhängerkran?',
    answer: 'Böcker-Anhängerkrane (z.B. AK 46, AK 52) kosten ab 200€ pro Tag in der Miete. Kaufpreis: 40.000–80.000€ gebraucht, 70.000–120.000€ neu. Bei weniger als 80 Einsatztagen pro Jahr ist Mieten günstiger.',
  },
  {
    question: 'Sind Transportkosten im Mietpreis enthalten?',
    answer: 'Das hängt vom Vermieter ab. Viele bieten Selbstabholung an (Sie transportieren den Anhängerkran mit Ihrem PKW). Bei Lieferung rechnen Sie mit 50–200€ extra je nach Entfernung.',
  },
  {
    question: 'Anhängerkran mieten oder kaufen — was lohnt sich?',
    answer: 'Neukauf: 70.000–120.000€. Gebrauchtkauf: 40.000–80.000€. Tagesmiete: 150–350€. Faustformel: Bei weniger als 80 Einsatztagen pro Jahr ist Mieten günstiger. Dazu keine Wartungskosten, keine Lagerhaltung, keine Versicherung.',
  },
  {
    question: 'Wo finde ich einen Anhängerkran in meiner Nähe?',
    answer: 'Auf KranVergleich.de vergleichen Sie Anhängerkran-Vermieter in ganz Deutschland. Geben Sie Ihre Stadt ein und fordern Sie kostenlos Angebote an — bei einem oder mehreren Anbietern gleichzeitig.',
  },
]

export default async function AnhaengerkranPreisePage() {
  const { anbieterCount } = await getSiteStats()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/anhaengerkran-mieten" className="hover:text-gray-600">Anhängerkran mieten</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Preise</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Anhängerkran mieten — Preise &amp; Kosten 2026
      </h1>
      <p className="text-[15px] text-gray-500 mb-4 max-w-3xl">
        Was kostet ein Anhängerkran (PKW-Anhänger mit Kran)? Komplette Preisübersicht
        mit Tages-, Wochen- und Monatspreisen. Alle Preise netto, zzgl. MwSt.
      </p>
      <p className="text-[11px] text-gray-300 mb-8">Stand: April 2026</p>

      {/* TOC */}
      <nav className="mb-8 border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-medium text-gray-900 mb-2">Inhalt</p>
        <ul className="flex flex-col gap-1">
          <li><a href="#preistabelle" className="text-[13px] text-blue-600 hover:underline">Preistabelle nach Tragkraft</a></li>
          <li><a href="#kostenfaktoren" className="text-[13px] text-blue-600 hover:underline">Was beeinflusst den Preis?</a></li>
          <li><a href="#zusatzkosten" className="text-[13px] text-blue-600 hover:underline">Zusatzkosten</a></li>
          <li><a href="#marken" className="text-[13px] text-blue-600 hover:underline">Beliebte Marken &amp; Modelle</a></li>
          <li><a href="#mieten-vs-kaufen" className="text-[13px] text-blue-600 hover:underline">Mieten vs. Kaufen</a></li>
          <li><a href="#faq" className="text-[13px] text-blue-600 hover:underline">Häufige Fragen</a></li>
        </ul>
      </nav>

      {/* Quick summary */}
      <section className="mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-lg font-semibold text-gray-900">ab 150€</p>
            <p className="text-[12px] text-gray-500">Tagespreis</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-lg font-semibold text-gray-900">ab 700€</p>
            <p className="text-[12px] text-gray-500">Wochenpreis</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-lg font-semibold text-gray-900">ab 2.000€</p>
            <p className="text-[12px] text-gray-500">Monatspreis</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-lg font-semibold text-gray-900">bis 1.500 kg</p>
            <p className="text-[12px] text-gray-500">Tragkraft</p>
          </div>
        </div>
      </section>

      {/* Price table by capacity */}
      <section id="preistabelle" className="mb-10 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Anhängerkran Preise nach Tragkraft</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left font-medium text-gray-900">Tragkraft</th>
                <th className="py-3 px-4 text-left font-medium text-gray-900">Tagespreis</th>
                <th className="py-3 px-4 text-left font-medium text-gray-900">Wochenpreis</th>
                <th className="py-3 px-4 text-left font-medium text-gray-900">Monatspreis</th>
                <th className="py-3 px-4 text-left font-medium text-gray-900">Typisches Modell</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-t">
                <td className="py-3 px-4 font-medium text-gray-900">bis 500 kg</td>
                <td className="py-3 px-4">150–200€</td>
                <td className="py-3 px-4">700–1.000€</td>
                <td className="py-3 px-4">2.000–3.000€</td>
                <td className="py-3 px-4 text-gray-400">Böcker AK 27, Klaas K17-24</td>
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-900">500–1.000 kg</td>
                <td className="py-3 px-4">200–280€</td>
                <td className="py-3 px-4">1.000–1.500€</td>
                <td className="py-3 px-4">3.000–4.500€</td>
                <td className="py-3 px-4 text-gray-400">Böcker AK 35, AK 42</td>
              </tr>
              <tr className="border-t">
                <td className="py-3 px-4 font-medium text-gray-900">1.000–1.500 kg</td>
                <td className="py-3 px-4">280–350€</td>
                <td className="py-3 px-4">1.500–1.800€</td>
                <td className="py-3 px-4">4.500–5.500€</td>
                <td className="py-3 px-4 text-gray-400">Böcker AK 46, AK 52</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-gray-400 mt-2">Preise netto zzgl. MwSt. Richtwerte — tatsächliche Kosten je nach Anbieter und Region.</p>
      </section>

      {/* Cost factors */}
      <section id="kostenfaktoren" className="mb-10 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Was beeinflusst den Preis?</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-medium text-gray-900 mb-1">Tragkraft &amp; Hakenhöhe</p>
            <p className="text-[13px] text-gray-500">Je höher die Tragkraft und Hakenhöhe, desto teurer. 500 kg / 27m vs. 1.500 kg / 52m = fast doppelter Preis.</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-medium text-gray-900 mb-1">Mietdauer</p>
            <p className="text-[13px] text-gray-500">Wochenmiete spart 30-40% gegenüber Tagespreis. Monatspreis nochmal günstiger pro Tag.</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-medium text-gray-900 mb-1">Saison</p>
            <p className="text-[13px] text-gray-500">März–Oktober (Bausaison) höhere Preise und weniger Verfügbarkeit. Winter: 10–20% günstiger.</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-medium text-gray-900 mb-1">Selbstabholung vs. Lieferung</p>
            <p className="text-[13px] text-gray-500">Selbstabholung mit PKW spart 50–200€ Transportkosten. Nur Anhängerkupplung nötig.</p>
          </div>
        </div>
      </section>

      {/* Zusatzkosten */}
      <section id="zusatzkosten" className="mb-10 scroll-mt-20 border border-gray-200 rounded-lg p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Zusatzkosten beim Anhängerkran mieten</h2>
        <div className="space-y-3 text-[13px]">
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span>Lieferung &amp; Abholung</span>
            <span className="font-medium text-gray-900">50–200€ (oder Selbstabholung)</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span>Einweisung</span>
            <span className="font-medium text-gray-900">meist inklusive</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span>Versicherung (Maschinenbruch)</span>
            <span className="font-medium text-gray-900">10–25€/Tag (oft optional)</span>
          </div>
          <div className="flex justify-between">
            <span>Funkfernsteuerung</span>
            <span className="font-medium text-gray-900">meist inklusive</span>
          </div>
        </div>
      </section>

      {/* Marken */}
      <section id="marken" className="mb-10 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Beliebte Marken &amp; Modelle</h2>
        <div className="space-y-3">
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="font-medium text-gray-900">Böcker</p>
            <p className="text-[13px] text-gray-500">Marktführer in Deutschland. Modelle: AK 27/4000 (500 kg), AK 35/3000 (750 kg), AK 42/4000 (1.000 kg), AK 46/6000 (1.200 kg), AK 52 (1.500 kg). Am häufigsten vermietet.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="font-medium text-gray-900">Klaas</p>
            <p className="text-[13px] text-gray-500">Modelle: K17-24 (bis 500 kg), K30-35 (bis 1.000 kg). Gutes Preis-Leistungs-Verhältnis, weit verbreitet.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="font-medium text-gray-900">Paus / Denka Lift</p>
            <p className="text-[13px] text-gray-500">Spezialisten für kompakte Anhängerkrane. Gut für enge Zufahrten und Dacharbeiten.</p>
          </div>
        </div>
      </section>

      {/* Mieten vs Kaufen */}
      <section id="mieten-vs-kaufen" className="mb-10 scroll-mt-20 border border-gray-200 rounded-lg p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Anhängerkran mieten oder kaufen?</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-3 text-left font-medium text-gray-900"></th>
                <th className="py-2 px-3 text-left font-medium text-blue-600">Mieten</th>
                <th className="py-2 px-3 text-left font-medium text-gray-600">Kaufen (neu)</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b"><td className="py-2 px-3 font-medium text-gray-900">Kosten</td><td className="py-2 px-3">150–350€/Tag</td><td className="py-2 px-3">70.000–120.000€</td></tr>
              <tr className="border-b"><td className="py-2 px-3 font-medium text-gray-900">Wartung</td><td className="py-2 px-3 text-green-600">Vermieter</td><td className="py-2 px-3">Sie selbst</td></tr>
              <tr className="border-b"><td className="py-2 px-3 font-medium text-gray-900">Versicherung</td><td className="py-2 px-3 text-green-600">Im Mietpreis</td><td className="py-2 px-3">Extra (500–1.500€/Jahr)</td></tr>
              <tr className="border-b"><td className="py-2 px-3 font-medium text-gray-900">Lagerung</td><td className="py-2 px-3 text-green-600">Nicht nötig</td><td className="py-2 px-3">Stellplatz nötig</td></tr>
              <tr><td className="py-2 px-3 font-medium text-gray-900">Lohnt sich ab</td><td className="py-2 px-3">1–80 Tage/Jahr</td><td className="py-2 px-3 text-green-600">80+ Tage/Jahr</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <div id="faq" className="mb-10 scroll-mt-20">
        <FAQSection faqs={faqs} craneTypeName="Anhängerkran" />
      </div>

      {/* CTA */}
      <section className="bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Anhängerkran-Anbieter in Ihrer Nähe vergleichen
        </h2>
        <p className="text-[14px] text-gray-500 mb-5 max-w-xl mx-auto">
          Vergleichen Sie {anbieterCount}+ Kranvermieter auf KranVergleich.de. Finden Sie den
          passenden Anhängerkran zum besten Preis — kostenlos und unverbindlich.
        </p>
        <Link
          href="/anhaengerkran-mieten"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-semibold rounded-md transition-colors"
        >
          Anhängerkran-Anbieter vergleichen
        </Link>
      </section>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://kranvergleich.de/' },
              { '@type': 'ListItem', position: 2, name: 'Anhängerkran mieten', item: 'https://kranvergleich.de/anhaengerkran-mieten' },
              { '@type': 'ListItem', position: 3, name: 'Preise' },
            ],
          }),
        }}
      />
    </div>
  )
}
