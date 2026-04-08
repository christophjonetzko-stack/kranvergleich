import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/faq-section'
import { getSiteStats } from '@/lib/queries'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Autokran mieten: Kosten pro Tag, Stunde & Einsatz 2026',
  description:
    'Autokran mieten ab 500€/Tag inkl. Kranführer. Stundenpreise, Tagespreise und Einsatzkosten für alle Tonnagen — von 30t bis 500t.',
  alternates: { canonical: '/ratgeber/autokran-mieten-kosten' },
  openGraph: {
    title: 'Autokran mieten: Kosten pro Tag, Stunde & Einsatz 2026',
    description:
      'Autokran mieten ab 500€/Tag inkl. Kranführer. Stundenpreise und Tagespreise für alle Tonnagen.',
    type: 'website',
    url: '/ratgeber/autokran-mieten-kosten',
  },
}

const faqs = [
  {
    question: 'Was kostet ein Autokran pro Stunde?',
    answer:
      'Ein Autokran kostet je nach Tragkraft 150–500€ pro Stunde (inkl. Kranführer). Kleine Autokrane (30–50 t) liegen bei 150–200€/h, mittlere (50–100 t) bei 200–300€/h, große (100 t+) bei 300–500€/h. Die Mindestmietdauer beträgt meist 4 Stunden.',
  },
  {
    question: 'Ist der Kranführer beim Autokran im Preis enthalten?',
    answer:
      'Ja, beim Autokran ist der Kranführer immer inklusive. Das ist gesetzlich vorgeschrieben — Autokrane dürfen nur von ausgebildeten Kranführern bedient werden. Sie müssen keinen separaten Bediener buchen.',
  },
  {
    question: 'Was kostet ein 100-Tonnen-Autokran?',
    answer:
      'Ein 100-Tonnen-Autokran kostet ca. 1.000–1.500€ pro Tag (inkl. Kranführer). Stundenweise berechnet: 250–350€/h. Wochenpreis: 5.000–7.500€. An-/Abfahrt zusätzlich ca. 300–600€ je nach Entfernung. Ideal für Industriemontage und mittlere Stahlbauarbeiten.',
  },
]

export default async function AutokranMietenKostenPage() {
  const { anbieterCount } = await getSiteStats()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/ratgeber" className="hover:text-gray-600">Ratgeber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Autokran mieten Kosten</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Autokran mieten: Kosten pro Tag, Stunde &amp; Einsatz 2026
      </h1>
      <p className="text-[15px] text-gray-500 mb-4 max-w-3xl">
        Ein Autokran kostet <strong className="text-gray-900">500–2.000€ pro Tag</strong> inklusive Kranführer.
        Die genauen Kosten hängen von der Tragkraft, der Einsatzdauer und der Region ab. In dieser Übersicht
        finden Sie alle Preise nach Tonnage — von 30 t bis 500 t.
      </p>
      <p className="text-[11px] text-gray-300 mb-8">Stand: April 2026 | Alle Preise netto zzgl. MwSt. | Kranführer immer inklusive</p>

      {/* TOC */}
      <nav className="mb-8 border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-medium text-gray-900 mb-2">Inhalt</p>
        <ul className="flex flex-col gap-1">
          <li><a href="#preistabelle" className="text-[13px] text-blue-600 hover:underline">Preistabelle nach Tonnage</a></li>
          <li><a href="#im-preis-enthalten" className="text-[13px] text-blue-600 hover:underline">Was ist im Preis enthalten?</a></li>
          <li><a href="#stundenpreis" className="text-[13px] text-blue-600 hover:underline">Autokran Kosten pro Stunde</a></li>
          <li><a href="#wann-lohnt-sich" className="text-[13px] text-blue-600 hover:underline">Wann lohnt sich ein Autokran?</a></li>
          <li><a href="#autokran-vs-mobilkran" className="text-[13px] text-blue-600 hover:underline">Autokran vs. Mobilkran</a></li>
          <li><a href="#anbieter" className="text-[13px] text-blue-600 hover:underline">Autokran-Anbieter finden</a></li>
          <li><a href="#faq" className="text-[13px] text-blue-600 hover:underline">Häufige Fragen</a></li>
        </ul>
      </nav>

      <div className="space-y-10 text-[14px] text-gray-600 leading-relaxed">

        {/* Price table by tonnage */}
        <section id="preistabelle" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Was kostet ein Autokran? Preise nach Tonnage</h2>
          <p className="mb-4">
            Der Preis eines Autokrans richtet sich vor allem nach der Tragkraft. Je schwerer die Last
            und je höher/weiter sie gehoben werden muss, desto größer der Kran — und desto höher die Kosten.
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Tragkraft</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Tag</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Stunde</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Typischer Einsatz</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-t">
                  <td className="py-3 px-4 font-medium text-gray-900">30 t</td>
                  <td className="py-3 px-4">500–700€</td>
                  <td className="py-3 px-4">150–200€</td>
                  <td className="py-3 px-4">Klimaanlage, Dachstuhl, Fertiggarage</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">50 t</td>
                  <td className="py-3 px-4">700–1.000€</td>
                  <td className="py-3 px-4">180–250€</td>
                  <td className="py-3 px-4">Stahlträger, Betonfertigteile</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4 font-medium text-gray-900">100 t</td>
                  <td className="py-3 px-4">1.000–1.500€</td>
                  <td className="py-3 px-4">250–350€</td>
                  <td className="py-3 px-4">Industriemontage, Hallenbau</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">160 t</td>
                  <td className="py-3 px-4">1.200–1.800€</td>
                  <td className="py-3 px-4">300–400€</td>
                  <td className="py-3 px-4">Brückenteile, schwere Maschinen</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4 font-medium text-gray-900">250 t</td>
                  <td className="py-3 px-4">1.500–2.000€</td>
                  <td className="py-3 px-4">350–450€</td>
                  <td className="py-3 px-4">Windkraftanlagen, Schwerlastmontage</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">500 t</td>
                  <td className="py-3 px-4">2.500–5.000€</td>
                  <td className="py-3 px-4">500–800€</td>
                  <td className="py-3 px-4">Raffinerie, Kraftwerk, Großprojekte</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Alle Preise inkl. Kranführer. Stundenpreise bei Mindestmietdauer von 4 Stunden.
            An-/Abfahrt wird separat berechnet (ca. 2–4€/km).
          </p>
        </section>

        {/* Was ist im Preis enthalten? */}
        <section id="im-preis-enthalten" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Was ist im Preis enthalten?</h2>
          <p className="mb-3">
            Der Tagespreis eines Autokrans umfasst in der Regel:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">Im Preis enthalten:</p>
              <ul className="text-[13px] text-gray-600 space-y-1">
                <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Ausgebildeter Kranführer</li>
                <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Auf- und Abbau des Krans</li>
                <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> 8 Stunden Arbeitszeit</li>
                <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Haftpflichtversicherung</li>
                <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Standardanschlagmittel</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-2">Zusätzliche Kosten:</p>
              <ul className="text-[13px] text-gray-600 space-y-1">
                <li className="flex gap-2"><span className="text-gray-400 shrink-0">&bull;</span> An-/Abfahrt: 2–4€/km</li>
                <li className="flex gap-2"><span className="text-gray-400 shrink-0">&bull;</span> Überstunden: 80–150€/h</li>
                <li className="flex gap-2"><span className="text-gray-400 shrink-0">&bull;</span> Wochenend-Zuschlag: 20–30%</li>
                <li className="flex gap-2"><span className="text-gray-400 shrink-0">&bull;</span> Sondertraversen: nach Aufwand</li>
                <li className="flex gap-2"><span className="text-gray-400 shrink-0">&bull;</span> Straßensperrung: 100–500€</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Stundenpreis */}
        <section id="stundenpreis" className="scroll-mt-20 border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Autokran Kosten pro Stunde</h2>
          <p className="mb-4">
            Viele Autokran-Einsätze werden stundenweise abgerechnet. Der Stundenpreis ergibt sich aus
            dem Tagespreis geteilt durch 8 Stunden — mit einem Zuschlag von ca. 20%, da kurze Einsätze
            pro Stunde teurer sind.
          </p>
          <div className="grid gap-3 sm:grid-cols-3 text-center">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xl font-semibold text-gray-900">150–200€/h</p>
              <p className="text-[13px] text-gray-500 mt-1">Kleine Autokrane</p>
              <p className="text-[11px] text-gray-400">30–50 t Tragkraft</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xl font-semibold text-gray-900">200–350€/h</p>
              <p className="text-[13px] text-gray-500 mt-1">Mittlere Autokrane</p>
              <p className="text-[11px] text-gray-400">50–160 t Tragkraft</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xl font-semibold text-gray-900">350–800€/h</p>
              <p className="text-[13px] text-gray-500 mt-1">Große Autokrane</p>
              <p className="text-[11px] text-gray-400">160–500 t Tragkraft</p>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mt-4">
            <p className="text-[13px] text-amber-800">
              <strong>Tipp:</strong> Die meisten Anbieter haben eine Mindestmietdauer von 4 Stunden.
              Planen Sie den Einsatz so, dass Material und Einbauort vorbereitet sind — jede Wartestunde
              kostet bares Geld.
            </p>
          </div>
        </section>

        {/* Wann lohnt sich ein Autokran? */}
        <section id="wann-lohnt-sich" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Wann lohnt sich ein Autokran?</h2>
          <p className="mb-3">
            Der Autokran ist der vielseitigste Krantyp und eignet sich besonders für kurzfristige,
            flexible Hebearbeiten. Typische Einsatzgebiete:
          </p>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Hausbau &amp; Dachstuhl</p>
              <p className="text-[13px] text-gray-500">Dachstuhl setzen, Fertigteile heben, Betonelemente positionieren. Typisch: 30–50 t Autokran, 1 Tag, 500–800€.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Industriemontage</p>
              <p className="text-[13px] text-gray-500">Maschinen, Lüftungsanlagen, Transformatoren einsetzen. Typisch: 50–160 t Autokran, 1–2 Tage, 1.000–2.000€.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Baumfällung &amp; Garten</p>
              <p className="text-[13px] text-gray-500">Schwere Baumstämme heben, Pool einsetzen, Gartenhaus aufstellen. Typisch: 30 t Autokran, halber Tag, 400–600€.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Windkraft &amp; Infrastruktur</p>
              <p className="text-[13px] text-gray-500">Windkraftanlagen errichten, Brückenteile setzen, Stahlkonstruktionen montieren. Typisch: 250–500 t, mehrere Tage.</p>
            </div>
          </div>
        </section>

        {/* Autokran vs. Mobilkran */}
        <section id="autokran-vs-mobilkran" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Autokran vs. Mobilkran — Unterschiede</h2>
          <p className="mb-4">
            Die Begriffe werden oft synonym verwendet, es gibt aber Unterschiede:
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Merkmal</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Autokran</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Mobilkran</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-t">
                  <td className="py-3 px-4 font-medium text-gray-900">Tragkraft</td>
                  <td className="py-3 px-4">10–500 t</td>
                  <td className="py-3 px-4">20–1.200 t</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">Tagespreis</td>
                  <td className="py-3 px-4">500–2.000€</td>
                  <td className="py-3 px-4">600–3.000€</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4 font-medium text-gray-900">Aufbauzeit</td>
                  <td className="py-3 px-4">15–30 Minuten</td>
                  <td className="py-3 px-4">30–120 Minuten</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">Straßenzulassung</td>
                  <td className="py-3 px-4">Ja (fährt selbst)</td>
                  <td className="py-3 px-4">Teilweise Sondertransport</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4 font-medium text-gray-900">Ideal für</td>
                  <td className="py-3 px-4">Kurzeinsätze, Tagesmiete</td>
                  <td className="py-3 px-4">Schwerlast, Mehrtageseinsätze</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[13px] text-gray-500 mt-3">
            <strong className="text-gray-900">Zusammenfassung:</strong> Für die meisten Bauprojekte ist der
            Autokran die richtige Wahl. Mobilkrane kommen vor allem bei Schwerlastprojekten über 200 t zum Einsatz.
          </p>
          <div className="mt-3">
            <Link href="/ratgeber/minikran-vs-autokran" className="text-[13px] text-blue-600 hover:underline">
              Minikran vs. Autokran — Vergleich &rarr;
            </Link>
          </div>
        </section>

      </div>

      {/* Anbieter finden */}
      <section id="anbieter" className="mt-10 scroll-mt-20 bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Autokran-Anbieter finden
        </h2>
        <p className="text-[14px] text-gray-500 mb-5 max-w-xl mx-auto">
          Vergleichen Sie Autokran-Vermieter in Ihrer Region. Auf KranVergleich.de finden Sie
          {anbieterCount}+ Anbieter mit Autokran-Service inkl. Kranführer.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          <Link href="/autokran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Alle Autokran-Anbieter</Link>
          <Link href="/autokran-mieten/hamburg" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Autokran Hamburg</Link>
          <Link href="/autokran-mieten/koeln" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Autokran Köln</Link>
          <Link href="/autokran-mieten/berlin" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Autokran Berlin</Link>
        </div>
        <Link
          href="/autokran-mieten"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-semibold rounded-md transition-colors"
        >
          Jetzt Autokran-Anbieter vergleichen
        </Link>
        <p className="text-[12px] text-gray-400 mt-3">Kostenlos & unverbindlich. Kranführer immer inklusive.</p>
      </section>

      {/* Related articles */}
      <section className="mt-10">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Weiterführende Ratgeber</h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/ratgeber/was-kostet-ein-kran" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Alle Kran-Preise</Link>
          <Link href="/ratgeber/baukran-mieten-kosten" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Baukran Kosten</Link>
          <Link href="/ratgeber/minikran-vs-autokran" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Minikran vs. Autokran</Link>
          <Link href="/ratgeber/kran-aufstellen-genehmigung" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Kran Genehmigung</Link>
          <Link href="/kostenrechner" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Kostenrechner</Link>
        </div>
      </section>

      {/* FAQ */}
      <div id="faq" className="mt-10 scroll-mt-20">
        <FAQSection faqs={faqs} craneTypeName="Autokran" />
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
              { '@type': 'ListItem', position: 3, name: 'Autokran mieten Kosten' },
            ],
          }),
        }}
      />
    </div>
  )
}
