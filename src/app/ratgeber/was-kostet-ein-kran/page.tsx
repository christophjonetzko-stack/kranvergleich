import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/faq-section'
import { getSiteStats } from '@/lib/queries'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Kran kaufen oder mieten? Break-even-Rechnung & Entscheidungshilfe 2026',
  description:
    'Lohnt sich der Kauf eines Krans oder ist Miete günstiger? Kaufpreise, Betriebskosten, Break-even pro Krantyp und Entscheidungshilfe — ab wann sich der Kauf rechnet.',
  alternates: { canonical: '/ratgeber/was-kostet-ein-kran' },
  openGraph: {
    title: 'Kran kaufen oder mieten? Break-even-Rechnung 2026',
    description:
      'Lohnt sich der Kauf eines Krans oder ist Miete günstiger? Kaufpreise, Betriebskosten und Break-even pro Krantyp im Vergleich.',
    type: 'website',
    url: '/ratgeber/was-kostet-ein-kran',
  },
}

const faqs = [
  {
    question: 'Lohnt es sich, einen Autokran zu kaufen?',
    answer:
      'Der Kauf eines Autokrans lohnt sich erst ab ca. 180–220 Einsatztagen pro Jahr. Ein 50-Tonnen-Autokran kostet neu 500.000–800.000€, hinzu kommen jährlich ca. 180.000€ Betriebskosten (Kranführer-Gehalt 65.000€, Wartung 36.000€, Versicherung 9.000€, Wertverlust 48.000€, Finanzierung 24.000€). Bei weniger Einsatztagen ist Mieten (ab 500€/Tag inkl. Kranführer) deutlich günstiger.',
  },
  {
    question: 'Was kostet ein gebrauchter Kran?',
    answer:
      'Gebrauchte Krane kosten typischerweise 30–60% des Neupreises — abhängig von Baujahr, Betriebsstunden und Zustand. Beispiele: Gebrauchter Autokran 50t (5–10 Jahre alt): 150.000–300.000€. Gebrauchter Minikran: 25.000–120.000€. Gebrauchter Baukran: 50.000–400.000€. Beachten Sie: Bei älteren Kranen steigen die Wartungskosten, und die TÜV-Abnahme kann aufwendiger werden.',
  },
  {
    question: 'Wie lange dauert es, bis sich der Kauf eines Krans amortisiert?',
    answer:
      'Die Amortisationszeit hängt von der jährlichen Auslastung ab. Faustregel: Bei 150+ Einsatztagen/Jahr amortisiert sich ein Kran in 5–7 Jahren. Bei 80–120 Tagen dauert es 10–15 Jahre — oft länger als die wirtschaftliche Nutzungsdauer. Bei weniger als 80 Tagen pro Jahr rentiert sich der Kauf praktisch nie.',
  },
  {
    question: 'Kann ich einen Kran leasen statt kaufen?',
    answer:
      'Ja, Leasing ist eine gängige Alternative. Beim Finanzierungsleasing zahlen Sie monatliche Raten (ca. 1,5–2,5% des Kaufpreises) über 48–72 Monate und übernehmen am Ende den Restwert. Beim Operating Leasing geben Sie den Kran nach der Laufzeit zurück — ideal, wenn Sie immer aktuelle Technik wollen. Leasing ist steuerlich attraktiv (Raten sind Betriebsausgaben), bindet aber weniger Kapital als Kauf.',
  },
  {
    question: 'Was kostet ein Baukran zum Kauf?',
    answer:
      'Ein Baukran (Turmdrehkran) kostet neu zwischen 150.000€ (kleiner Schnellmontagekran) und 800.000€ (großer Obendreher mit 60m+ Hakenhöhe). Gebrauchte Baukrane: 50.000–400.000€. Hinzu kommen Kosten für Montage/Demontage (3.000–8.000€ pro Einsatz), Transport, Lagerung zwischen Projekten und regelmäßige Hauptuntersuchung. Baukrane werden meist von größeren Bauunternehmen gekauft — kleine und mittlere Betriebe mieten fast immer.',
  },
  {
    question: 'Warum mieten die meisten Unternehmen statt zu kaufen?',
    answer:
      'Über 80% der Krannutzer in Deutschland mieten — aus mehreren Gründen: (1) Keine Kapitalbindung (500.000€ für einen Autokran bindet liquide Mittel), (2) Flexibilität beim Krantyp je nach Projekt, (3) Wartung, TÜV und Kranführer sind inklusive, (4) Steuerlich sofort als Betriebsausgabe absetzbar, (5) Kein Risiko durch Stillstand bei Auftragslücken. Kauf lohnt sich erst bei kontinuierlich hoher Auslastung in größeren Unternehmen.',
  },
]

export default async function WasKostetEinKranPage() {
  const { anbieterCount } = await getSiteStats()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/ratgeber" className="hover:text-gray-600">Ratgeber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Kran kaufen oder mieten?</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Kran kaufen oder mieten? Break-even-Rechnung &amp; Entscheidungshilfe 2026
      </h1>
      <p className="text-[15px] text-gray-500 mb-4 max-w-3xl">
        Ein Kran kostet beim Kauf zwischen <strong className="text-gray-900">25.000€</strong> (Anhängerkran)
        und <strong className="text-gray-900">5.000.000€</strong> (Schwerlast-Raupenkran) — und dann kommen
        jährlich noch einmal 15–30% des Kaufpreises für Wartung, Versicherung, Kranführer und Wertverlust
        hinzu. Wir rechnen vor, ab wie vielen Einsatztagen pro Jahr sich der Kauf gegenüber der Miete rechnet.
      </p>
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
        <p className="text-[13px] text-gray-700">
          <strong className="text-gray-900">Kurz gesagt:</strong> Bei kleinen Kranen (Anhängerkran, Minikran)
          lohnt sich der Kauf ab ca. 40–80 Einsatztagen/Jahr. Bei mittleren (Autokran 30–80t) erst ab
          150–220 Tagen. Bei Schwerlastkranen (Mobil-/Raupenkran) fast nie — diese werden praktisch immer
          gemietet oder über Leasing finanziert.
        </p>
      </div>
      <p className="text-[11px] text-gray-300 mb-8">Stand: April 2026 | Alle Preise netto zzgl. MwSt.</p>

      {/* TOC */}
      <nav className="mb-8 border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-medium text-gray-900 mb-2">Inhalt</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          <li><a href="#kaufpreise" className="text-[13px] text-blue-600 hover:underline">Was kostet ein Kran zum Kauf?</a></li>
          <li><a href="#laufende-kosten" className="text-[13px] text-blue-600 hover:underline">Versteckte Kosten beim Kranbesitz</a></li>
          <li><a href="#break-even" className="text-[13px] text-blue-600 hover:underline">Break-even: Ab wann lohnt sich der Kauf?</a></li>
          <li><a href="#entscheidung" className="text-[13px] text-blue-600 hover:underline">Entscheidungsmatrix: kaufen oder mieten?</a></li>
          <li><a href="#alternativen" className="text-[13px] text-blue-600 hover:underline">Alternativen: Leasing, Langzeitmiete, Mietkauf</a></li>
          <li><a href="#miete-vorteile" className="text-[13px] text-blue-600 hover:underline">Vorteile der Miete im Überblick</a></li>
          <li><a href="#faq" className="text-[13px] text-blue-600 hover:underline">Häufige Fragen</a></li>
        </ul>
      </nav>

      <div className="space-y-10 text-[14px] text-gray-600 leading-relaxed">

        {/* Kaufpreise */}
        <section id="kaufpreise" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Was kostet ein Kran zum Kauf? Anschaffungspreise 2026
          </h2>
          <p className="mb-4">
            Die Anschaffungskosten für einen Kran hängen stark von Typ, Tragkraft und Hersteller ab.
            Die folgenden Preise beziehen sich auf <strong className="text-gray-900">Neukrane</strong> —
            gebrauchte Modelle kosten typischerweise 30–60% davon.
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Krantyp</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Neupreis</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Gebraucht</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Typische Käufer</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-t">
                  <td className="py-3 px-4 font-medium text-gray-900">Anhängerkran</td>
                  <td className="py-3 px-4 whitespace-nowrap">25.000–80.000€</td>
                  <td className="py-3 px-4 whitespace-nowrap">10.000–40.000€</td>
                  <td className="py-3 px-4 text-gray-500">Dachdecker-Kleinbetriebe, Garten- &amp; Landschaftsbau</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">Minikran</td>
                  <td className="py-3 px-4 whitespace-nowrap">50.000–300.000€</td>
                  <td className="py-3 px-4 whitespace-nowrap">25.000–120.000€</td>
                  <td className="py-3 px-4 text-gray-500">Glasmontagebetriebe, Innenausbau-Spezialisten</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4 font-medium text-gray-900">Dachdeckerkran</td>
                  <td className="py-3 px-4 whitespace-nowrap">80.000–200.000€</td>
                  <td className="py-3 px-4 whitespace-nowrap">35.000–90.000€</td>
                  <td className="py-3 px-4 text-gray-500">Dachdeckerbetriebe mit hoher Auslastung</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">Ladekran (auf LKW)</td>
                  <td className="py-3 px-4 whitespace-nowrap">60.000–250.000€</td>
                  <td className="py-3 px-4 whitespace-nowrap">25.000–120.000€</td>
                  <td className="py-3 px-4 text-gray-500">Speditionen, Baustoffhändler, Logistikdienstleister</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4 font-medium text-gray-900">Autokran 30–80t</td>
                  <td className="py-3 px-4 whitespace-nowrap">400.000–1.500.000€</td>
                  <td className="py-3 px-4 whitespace-nowrap">150.000–700.000€</td>
                  <td className="py-3 px-4 text-gray-500">Spezialisierte Kranvermietungen</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">Baukran (Turmdrehkran)</td>
                  <td className="py-3 px-4 whitespace-nowrap">150.000–800.000€</td>
                  <td className="py-3 px-4 whitespace-nowrap">50.000–400.000€</td>
                  <td className="py-3 px-4 text-gray-500">Große Bauunternehmen mit Dauerauslastung</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4 font-medium text-gray-900">Mobilkran 100–500t</td>
                  <td className="py-3 px-4 whitespace-nowrap">1.500.000–4.000.000€</td>
                  <td className="py-3 px-4 whitespace-nowrap">500.000–1.800.000€</td>
                  <td className="py-3 px-4 text-gray-500">Reine Kranvermieter, Großunternehmen</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">Raupenkran 100–500t</td>
                  <td className="py-3 px-4 whitespace-nowrap">1.000.000–5.000.000€</td>
                  <td className="py-3 px-4 whitespace-nowrap">400.000–2.500.000€</td>
                  <td className="py-3 px-4 text-gray-500">Windkraft-Errichter, Schwerlast-Spezialisten</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Neupreise für Hersteller wie Liebherr, Terex, Manitowoc, Palfinger, Böcker, Klaas, Jekko.
            Gebrauchtpreise variieren stark mit Baujahr, Betriebsstunden und Zustand.
          </p>
        </section>

        {/* Laufende Kosten */}
        <section id="laufende-kosten" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Versteckte Kosten beim Kranbesitz</h2>
          <p className="mb-4">
            Der Kaufpreis ist nur die halbe Wahrheit. Wer einen Kran kauft, zahlt jedes Jahr zusätzlich
            zwischen <strong className="text-gray-900">15% und 30% des Anschaffungspreises</strong> an
            laufenden Kosten — bei einem 600.000€ Autokran sind das 90.000–180.000€ pro Jahr, bevor
            der Kran einen einzigen Handgriff getan hat.
          </p>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Wartung &amp; Inspektionen — 5–8% pro Jahr</p>
              <p className="text-[13px] text-gray-500">
                Regelmäßige Wartung durch den Hersteller, Verschleißteile (Seile, Bremsen, Hydraulik),
                Ölwechsel. Bei älteren Kranen steigt dieser Posten deutlich.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Versicherung — 1–2% pro Jahr</p>
              <p className="text-[13px] text-gray-500">
                Maschinenbruchversicherung, Haftpflicht, Transportversicherung. Bei einem 600.000€
                Autokran: 6.000–12.000€ jährlich.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Kranführer-Gehalt — 60.000–80.000€ brutto/Jahr</p>
              <p className="text-[13px] text-gray-500">
                Bei Auto-, Mobil- und Raupenkranen gesetzlich vorgeschrieben (kein Einsatz ohne Bediener).
                Inkl. Sozialversicherung, Weiterbildung und Urlaubsersatz kalkulieren die meisten
                Betriebe 75.000–95.000€ pro Kranführer und Jahr.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Wertverlust (Abschreibung) — 6–10% pro Jahr</p>
              <p className="text-[13px] text-gray-500">
                Im ersten Jahr 10–15%, danach ca. 6–8% pro Jahr. Über 10 Jahre verliert ein Kran
                rund 50–60% seines Neuwerts.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Finanzierung / Kapitalbindung — 3–5% pro Jahr</p>
              <p className="text-[13px] text-gray-500">
                Zinsen auf Kredite oder entgangene Rendite auf gebundenes Eigenkapital. Bei
                500.000€ Kaufpreis: 15.000–25.000€ pro Jahr Opportunitätskosten.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">TÜV, Prüfungen, Zertifikate — 500–3.000€ pro Jahr</p>
              <p className="text-[13px] text-gray-500">
                Jährliche Hauptuntersuchung nach BetrSichV, Kranprüfungen, Sachverständigen-Gutachten,
                Dokumentation. Bei Schwerlastkranen entsprechend höher.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Lagerung, Transport &amp; Standzeiten</p>
              <p className="text-[13px] text-gray-500">
                Stellplatz oder Halle zwischen Einsätzen, Transporte zwischen Baustellen, Stillstand
                bei schlechtem Wetter oder Auftragslücken. Schwer zu beziffern, aber real.
              </p>
            </div>
          </div>
        </section>

        {/* Break-even */}
        <section id="break-even" className="scroll-mt-20 border border-gray-200 rounded-lg p-5 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Break-even: Ab wann lohnt sich der Kauf eines Krans?
          </h2>
          <p className="mb-4">
            Der Break-even-Punkt ist die Anzahl der Einsatztage pro Jahr, ab der die Kaufkosten
            (Anschaffung + jährliche Fixkosten) günstiger sind als die entsprechende Miete.
            Faustformel:
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-5 font-mono text-[13px] text-gray-700">
            Break-even-Tage/Jahr = (Jährliche Fixkosten) ÷ (Mietpreis pro Tag − variable Eigenkosten)
          </div>
          <p className="mb-4">
            Hier die Richtwerte pro Krantyp — kalkuliert mit Standardauslastung, Finanzierung über
            8 Jahre und Mietpreisen aus <Link href="/kran-mieten-preise" className="text-blue-600 hover:underline">unserer Preisliste</Link>:
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-[13px] bg-white">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Krantyp</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Fixkosten/Jahr</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Mietpreis/Tag</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Break-even</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Kauf lohnt sich?</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-t">
                  <td className="py-3 px-4 font-medium text-gray-900">Anhängerkran</td>
                  <td className="py-3 px-4 whitespace-nowrap">~8.000€</td>
                  <td className="py-3 px-4 whitespace-nowrap">200€</td>
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-gray-900">ca. 40 Tage</td>
                  <td className="py-3 px-4 text-green-600">bei Dachdeckerbetrieben sinnvoll</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">Minikran</td>
                  <td className="py-3 px-4 whitespace-nowrap">~22.000€</td>
                  <td className="py-3 px-4 whitespace-nowrap">350€</td>
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-gray-900">ca. 65 Tage</td>
                  <td className="py-3 px-4 text-green-600">bei Glasmontagebetrieben oft rentabel</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4 font-medium text-gray-900">Dachdeckerkran</td>
                  <td className="py-3 px-4 whitespace-nowrap">~20.000€</td>
                  <td className="py-3 px-4 whitespace-nowrap">300€</td>
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-gray-900">ca. 70 Tage</td>
                  <td className="py-3 px-4 text-green-600">ja, bei Dachdeckerbetrieben ab mittlerer Größe</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">Ladekran (mit LKW)</td>
                  <td className="py-3 px-4 whitespace-nowrap">~35.000€</td>
                  <td className="py-3 px-4 whitespace-nowrap">500€</td>
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-gray-900">ca. 80 Tage</td>
                  <td className="py-3 px-4 text-green-600">für Speditionen ab Eigenauslastung rentabel</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4 font-medium text-gray-900">Autokran 30–50t</td>
                  <td className="py-3 px-4 whitespace-nowrap">~150.000€</td>
                  <td className="py-3 px-4 whitespace-nowrap">800€</td>
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-gray-900">ca. 200 Tage</td>
                  <td className="py-3 px-4 text-amber-600">nur bei reinen Kranvermietern</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">Autokran 80–120t</td>
                  <td className="py-3 px-4 whitespace-nowrap">~200.000€</td>
                  <td className="py-3 px-4 whitespace-nowrap">1.300€</td>
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-gray-900">ca. 180 Tage</td>
                  <td className="py-3 px-4 text-amber-600">nur bei reinen Kranvermietern</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4 font-medium text-gray-900">Baukran (mittel)</td>
                  <td className="py-3 px-4 whitespace-nowrap">~50.000€</td>
                  <td className="py-3 px-4 whitespace-nowrap">8.000€/Monat</td>
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-gray-900">ca. 6 Monate/Jahr</td>
                  <td className="py-3 px-4 text-amber-600">nur für große Bauunternehmen</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">Mobilkran 250t+</td>
                  <td className="py-3 px-4 whitespace-nowrap">~400.000€</td>
                  <td className="py-3 px-4 whitespace-nowrap">2.800€</td>
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-gray-900">ca. 230 Tage</td>
                  <td className="py-3 px-4 text-red-600">praktisch nie — immer mieten</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-3">
            Die Zahlen sind Richtwerte. Der tatsächliche Break-even hängt von Finanzierungsart, regionalen
            Mietpreisen, Wartungsaufwand und möglichen Mieterträgen durch Untervermietung ab.
          </p>
        </section>

        {/* Entscheidungsmatrix */}
        <section id="entscheidung" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Entscheidungsmatrix: Kaufen oder mieten?
          </h2>
          <p className="mb-4">
            Die reine Break-even-Rechnung ist nur die halbe Miete. Auch strategische Faktoren zählen:
            Kapitalbindung, Flexibilität, Verfügbarkeit und Risiko. Hier die wichtigsten Entscheidungskriterien:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">✓ Kauf lohnt sich, wenn…</p>
              <ul className="text-[13px] text-gray-600 space-y-1.5">
                <li className="flex gap-2"><span className="text-green-600 shrink-0">•</span> Auslastung über 150–220 Einsatztagen pro Jahr (je nach Krantyp)</li>
                <li className="flex gap-2"><span className="text-green-600 shrink-0">•</span> Stabiler Auftragsbestand über 5+ Jahre</li>
                <li className="flex gap-2"><span className="text-green-600 shrink-0">•</span> Eigener, ausgebildeter Kranführer vorhanden</li>
                <li className="flex gap-2"><span className="text-green-600 shrink-0">•</span> Möglichkeit, den Kran an Dritte zu vermieten (Mieteinnahmen gegenrechnen)</li>
                <li className="flex gap-2"><span className="text-green-600 shrink-0">•</span> Kranbetrieb ist Kerngeschäft (z. B. Dachdecker mit Dachdeckerkran)</li>
                <li className="flex gap-2"><span className="text-green-600 shrink-0">•</span> Ausreichend Kapital verfügbar, das nicht anderweitig benötigt wird</li>
              </ul>
            </div>
            <div className="border border-amber-200 bg-amber-50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">↻ Miete lohnt sich, wenn…</p>
              <ul className="text-[13px] text-gray-600 space-y-1.5">
                <li className="flex gap-2"><span className="text-amber-600 shrink-0">•</span> Einzel- oder Projektgeschäft mit wechselndem Bedarf</li>
                <li className="flex gap-2"><span className="text-amber-600 shrink-0">•</span> Unterschiedliche Krantypen werden benötigt (Flexibilität)</li>
                <li className="flex gap-2"><span className="text-amber-600 shrink-0">•</span> Weniger als 100–150 Einsatztage pro Jahr</li>
                <li className="flex gap-2"><span className="text-amber-600 shrink-0">•</span> Kapital für Wachstum oder andere Investitionen benötigt</li>
                <li className="flex gap-2"><span className="text-amber-600 shrink-0">•</span> Kein eigenes Fachpersonal (Kranführer, Wartung)</li>
                <li className="flex gap-2"><span className="text-amber-600 shrink-0">•</span> Immer aktuelle Technik gewünscht (keine Wertverlust-Sorgen)</li>
                <li className="flex gap-2"><span className="text-amber-600 shrink-0">•</span> Start-up oder KMU ohne Investitionsbudget</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Alternativen */}
        <section id="alternativen" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Alternativen zum Kauf: Leasing, Langzeitmiete, Mietkauf
          </h2>
          <p className="mb-4">
            Zwischen Kauf und Tagesmiete gibt es weitere Modelle, die je nach Situation die bessere
            Wahl sein können:
          </p>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Finanzierungsleasing</p>
              <p className="text-[13px] text-gray-500">
                Monatliche Raten über 48–72 Monate (ca. 1,5–2,5% des Kaufpreises/Monat). Am Ende
                übernehmen Sie den Restwert und werden Eigentümer. Leasingraten sind sofort als
                Betriebsausgabe absetzbar — steuerlich oft attraktiver als Abschreibung.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Operating Leasing</p>
              <p className="text-[13px] text-gray-500">
                Sie nutzen den Kran über 3–5 Jahre und geben ihn danach zurück. Kein Restwert-Risiko,
                immer aktuelle Technik, keine Kapitalbindung. Monatliche Kosten liegen höher als beim
                Finanzierungsleasing, dafür ohne Übernahmeverpflichtung.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Langzeitmiete (6–24 Monate)</p>
              <p className="text-[13px] text-gray-500">
                Klassische Miete, aber mit deutlichem Rabatt bei langen Laufzeiten. Bei Baukranen der
                Standard-Weg. Wartung, Versicherung und Austausch bei Defekt sind Sache des Vermieters.
                Ideal bei einem konkreten Großprojekt mit planbarer Laufzeit.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Mietkauf</p>
              <p className="text-[13px] text-gray-500">
                Sie mieten den Kran über einen festgelegten Zeitraum und ein Teil der Mietzahlungen
                wird beim späteren Kauf angerechnet. Gibt Ihnen Flexibilität, den Kauf aufzuschieben,
                bis Sie die Auslastung real kennen. Verfügbar bei einigen großen Kranvermietern.
              </p>
            </div>
          </div>
        </section>

        {/* Miete Vorteile */}
        <section id="miete-vorteile" className="scroll-mt-20 border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Warum über 80% der Nutzer mieten statt kaufen
          </h2>
          <p className="mb-4">
            Der deutsche Kranmarkt wird klar von der Miete dominiert — aus guten Gründen:
          </p>
          <div className="grid gap-2 sm:grid-cols-2 text-[13px]">
            <div className="flex gap-2"><span className="text-green-600 shrink-0">✓</span> <span><strong className="text-gray-900">Keine Kapitalbindung</strong> — 500.000€ bleiben frei für andere Investitionen</span></div>
            <div className="flex gap-2"><span className="text-green-600 shrink-0">✓</span> <span><strong className="text-gray-900">Keine Wartungsaufgaben</strong> — Wartung, TÜV und Reparaturen sind Sache des Vermieters</span></div>
            <div className="flex gap-2"><span className="text-green-600 shrink-0">✓</span> <span><strong className="text-gray-900">Flexibilität beim Krantyp</strong> — für jedes Projekt der passende Kran</span></div>
            <div className="flex gap-2"><span className="text-green-600 shrink-0">✓</span> <span><strong className="text-gray-900">Kranführer inklusive</strong> — kein Einstellungs- und Gehaltsrisiko</span></div>
            <div className="flex gap-2"><span className="text-green-600 shrink-0">✓</span> <span><strong className="text-gray-900">Sofort abzugsfähig</strong> — Miete ist Betriebsausgabe, keine Abschreibung nötig</span></div>
            <div className="flex gap-2"><span className="text-green-600 shrink-0">✓</span> <span><strong className="text-gray-900">Kein Wertverlust-Risiko</strong> — kein Kopfzerbrechen beim Wiederverkauf</span></div>
            <div className="flex gap-2"><span className="text-green-600 shrink-0">✓</span> <span><strong className="text-gray-900">Skalierbar</strong> — bei Auftragslücken entstehen keine Fixkosten</span></div>
            <div className="flex gap-2"><span className="text-green-600 shrink-0">✓</span> <span><strong className="text-gray-900">Immer aktuell</strong> — Sie nutzen neueste Modelle mit modernster Sicherheitstechnik</span></div>
          </div>
          <div className="mt-4">
            <Link href="/kran-mieten-preise" className="text-[13px] text-blue-600 hover:underline">
              Alle aktuellen Mietpreise im Überblick &rarr;
            </Link>
          </div>
        </section>

      </div>

      {/* Anbieter finden CTA */}
      <section className="mt-10 bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Miete ist für Sie die bessere Wahl?
        </h2>
        <p className="text-[14px] text-gray-500 mb-5 max-w-xl mx-auto">
          Vergleichen Sie {anbieterCount}+ Kranvermieter in Deutschland und holen Sie kostenlos
          Angebote ein — ohne Kaufrisiko, ohne Kapitalbindung, mit Kranführer und voller Wartung.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          <Link href="/minikran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Minikran mieten</Link>
          <Link href="/autokran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Autokran mieten</Link>
          <Link href="/baukran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Baukran mieten</Link>
          <Link href="/mobilkran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Mobilkran mieten</Link>
          <Link href="/dachdeckerkran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Dachdeckerkran mieten</Link>
        </div>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-semibold rounded-md transition-colors"
        >
          Jetzt {anbieterCount}+ Anbieter vergleichen
        </Link>
        <p className="text-[12px] text-gray-400 mt-3">Kostenlos &amp; unverbindlich.</p>
      </section>

      {/* Weiterführende Artikel */}
      <section className="mt-10">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Weiterführende Ratgeber</h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/kran-mieten-preise" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Aktuelle Mietpreise aller Krantypen</Link>
          <Link href="/autokran-mieten#ratgeber" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Autokran Kosten im Detail</Link>
          <Link href="/baukran-mieten#ratgeber" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Baukran Kosten im Detail</Link>
          <Link href="/ratgeber/welchen-kran-brauche-ich" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Welchen Kran brauche ich?</Link>
          <Link href="/ratgeber/kran-mieten-tipps" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">7 Tipps zur Kranmiete</Link>
          <Link href="/kostenrechner" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Kostenrechner</Link>
        </div>
      </section>

      {/* FAQ */}
      <div id="faq" className="mt-10 scroll-mt-20">
        <FAQSection faqs={faqs} craneTypeName="Kran" />
      </div>

      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://kranvergleich.de/' },
              { '@type': 'ListItem', position: 2, name: 'Ratgeber', item: 'https://kranvergleich.de/ratgeber' },
              { '@type': 'ListItem', position: 3, name: 'Kran kaufen oder mieten?' },
            ],
          }),
        }}
      />
    </div>
  )
}
