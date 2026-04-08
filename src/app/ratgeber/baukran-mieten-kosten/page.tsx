import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/faq-section'
import { getSiteStats } from '@/lib/queries'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Baukran mieten: Kosten, Dauer & Genehmigung 2026',
  description:
    'Baukran (Turmdrehkran) mieten ab 4.000€/Monat. Montagekosten, Genehmigung, Mietdauer und Anbieter im Überblick. Lohnt sich ab 3 Monaten.',
  alternates: { canonical: '/ratgeber/baukran-mieten-kosten' },
  openGraph: {
    title: 'Baukran mieten: Kosten, Dauer & Genehmigung 2026',
    description:
      'Baukran (Turmdrehkran) mieten ab 4.000€/Monat. Montagekosten, Genehmigung und Mietdauer im Überblick.',
    type: 'website',
    url: '/ratgeber/baukran-mieten-kosten',
  },
}

const faqs = [
  {
    question: 'Was kostet ein Baukran pro Monat?',
    answer:
      'Ein Baukran kostet je nach Größe zwischen 4.000€ und 25.000€ pro Monat (netto). Kleine Baukrane (Hakenhöhe bis 30 m) ab 4.000€/Monat, mittlere (bis 50 m) ab 8.000€/Monat, große (über 50 m) ab 15.000€/Monat. Hinzu kommen einmalige Montagekosten von 3.000–8.000€.',
  },
  {
    question: 'Wie lange dauert die Montage eines Baukrans?',
    answer:
      'Die Montage eines Baukrans dauert je nach Größe 1–3 Tage. Kleine Schnellmontagekrane sind in 2–4 Stunden aufgebaut. Große Turmdrehkrane mit Fundamentarbeiten benötigen 2–5 Tage. Die Demontage dauert ähnlich lang. Planen Sie zusätzlich 1–2 Wochen für Fundament und Genehmigungen.',
  },
  {
    question: 'Brauche ich eine Genehmigung für einen Baukran?',
    answer:
      'Ja, in den meisten Fällen. Der Baukran ist oft Teil der Baugenehmigung. Zusätzlich benötigen Sie ggf.: Sondernutzungserlaubnis (wenn auf öffentlichem Grund), Überschwenkgenehmigung (wenn der Ausleger über Nachbargrundstücke reicht) und Abstimmung mit der Luftfahrtbehörde (ab 100 m Höhe). Kosten: 150–500€.',
  },
]

export default async function BaukranMietenKostenPage() {
  const { anbieterCount } = await getSiteStats()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/ratgeber" className="hover:text-gray-600">Ratgeber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Baukran mieten Kosten</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Baukran mieten: Kosten, Dauer &amp; Genehmigung 2026
      </h1>
      <p className="text-[15px] text-gray-500 mb-4 max-w-3xl">
        Ein Baukran (Turmdrehkran) kostet <strong className="text-gray-900">4.000–25.000€ pro Monat</strong> zzgl.
        3.000–8.000€ Montage/Demontage. In diesem Ratgeber erfahren Sie, welche Kosten auf Sie zukommen,
        welche Genehmigungen Sie brauchen und ab wann sich ein Baukran gegenüber dem Autokran lohnt.
      </p>
      <p className="text-[11px] text-gray-300 mb-8">Stand: April 2026 | Alle Preise netto zzgl. MwSt.</p>

      {/* TOC */}
      <nav className="mb-8 border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-medium text-gray-900 mb-2">Inhalt</p>
        <ul className="flex flex-col gap-1">
          <li><a href="#preistabelle" className="text-[13px] text-blue-600 hover:underline">Preistabelle nach Baukran-Größe</a></li>
          <li><a href="#lohnt-sich" className="text-[13px] text-blue-600 hover:underline">Lohnt sich ein Baukran?</a></li>
          <li><a href="#genehmigungen" className="text-[13px] text-blue-600 hover:underline">Welche Genehmigungen brauche ich?</a></li>
          <li><a href="#montage" className="text-[13px] text-blue-600 hover:underline">Wie lange dauert Montage und Demontage?</a></li>
          <li><a href="#baukran-vs-autokran" className="text-[13px] text-blue-600 hover:underline">Baukran vs. Autokran</a></li>
          <li><a href="#anbieter" className="text-[13px] text-blue-600 hover:underline">Baukran-Anbieter finden</a></li>
          <li><a href="#faq" className="text-[13px] text-blue-600 hover:underline">Häufige Fragen</a></li>
        </ul>
      </nav>

      <div className="space-y-10 text-[14px] text-gray-600 leading-relaxed">

        {/* Price table by size */}
        <section id="preistabelle" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Was kostet ein Baukran? Preise nach Größe</h2>
          <p className="mb-4">
            Die Mietkosten für einen Baukran hängen vor allem von der Hakenhöhe und der Ausladung
            (Reichweite) ab. Je größer der Kran, desto höher die Miete.
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Baukran-Größe</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Hakenhöhe</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Monat</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Montage</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-t">
                  <td className="py-3 px-4 font-medium text-gray-900">Klein (Schnellmontagekran)</td>
                  <td className="py-3 px-4">bis 30 m</td>
                  <td className="py-3 px-4">4.000–8.000€</td>
                  <td className="py-3 px-4">3.000–4.000€</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">Mittel (Obendreher)</td>
                  <td className="py-3 px-4">30–50 m</td>
                  <td className="py-3 px-4">8.000–15.000€</td>
                  <td className="py-3 px-4">4.000–6.000€</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4 font-medium text-gray-900">Groß (Obendreher)</td>
                  <td className="py-3 px-4">über 50 m</td>
                  <td className="py-3 px-4">15.000–25.000€</td>
                  <td className="py-3 px-4">6.000–8.000€</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Montagekosten fallen einmalig an (Auf- und Abbau). Fundament ggf. zusätzlich 1.000–3.000€.
          </p>

          {/* Total cost example */}
          <div className="mt-4 bg-gray-50 rounded-lg p-4">
            <p className="text-[13px] font-medium text-gray-900 mb-2">Rechenbeispiel: Baukran für 6 Monate</p>
            <div className="space-y-1 text-[13px] text-gray-600">
              <div className="flex justify-between"><span>Miete (6 x 8.000€)</span><span className="font-medium text-gray-900">48.000€</span></div>
              <div className="flex justify-between"><span>Montage/Demontage</span><span className="font-medium text-gray-900">5.000€</span></div>
              <div className="flex justify-between"><span>Fundament</span><span className="font-medium text-gray-900">2.000€</span></div>
              <div className="flex justify-between"><span>Transport</span><span className="font-medium text-gray-900">1.500€</span></div>
              <div className="flex justify-between border-t border-gray-200 pt-1 mt-1"><span className="font-medium text-gray-900">Gesamt</span><span className="font-semibold text-gray-900">56.500€</span></div>
            </div>
            <p className="text-[11px] text-gray-400 mt-2">Mittlerer Baukran, Hakenhöhe 40 m. Bedienerkosten nicht enthalten.</p>
          </div>
        </section>

        {/* Lohnt sich ein Baukran? */}
        <section id="lohnt-sich" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Lohnt sich ein Baukran für mein Projekt?</h2>
          <p className="mb-3">
            Ein Baukran lohnt sich, wenn Sie über einen längeren Zeitraum regelmäßig schwere Lasten
            heben müssen. Die Faustregel:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Baukran lohnt sich bei:</p>
              <ul className="text-[13px] text-gray-600 space-y-1">
                <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Bauzeit über 3 Monate</li>
                <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Tägliche oder wöchentliche Hebearbeiten</li>
                <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Große Baustelle mit vielen Hebepunkten</li>
                <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Lasten müssen über das gesamte Baufeld verteilt werden</li>
              </ul>
            </div>
            <div className="border border-red-200 bg-red-50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Autokran ist besser bei:</p>
              <ul className="text-[13px] text-gray-600 space-y-1">
                <li className="flex gap-2"><span className="text-red-500 shrink-0">&#10005;</span> Einzelne Hebearbeiten (1–3 Tage)</li>
                <li className="flex gap-2"><span className="text-red-500 shrink-0">&#10005;</span> Bauzeit unter 3 Monaten</li>
                <li className="flex gap-2"><span className="text-red-500 shrink-0">&#10005;</span> Kein Platz für Kranfundament</li>
                <li className="flex gap-2"><span className="text-red-500 shrink-0">&#10005;</span> Schnelle, flexible Einsätze</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Genehmigungen */}
        <section id="genehmigungen" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Welche Genehmigungen brauche ich?</h2>
          <p className="mb-3">
            Das Aufstellen eines Baukrans erfordert in der Regel mehrere Genehmigungen. Die wichtigsten:
          </p>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Baugenehmigung</p>
              <p className="text-[13px] text-gray-500">Der Baukran ist oft Teil der Baugenehmigung. Prüfen Sie Ihren Bauantrag — der Kranstandort muss dort eingezeichnet sein.</p>
              <p className="text-[12px] text-gray-400 mt-1">Beim Bauordnungsamt | Bearbeitungszeit: im Rahmen des Bauantrags</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Sondernutzungserlaubnis</p>
              <p className="text-[13px] text-gray-500">Erforderlich, wenn der Kran auf öffentlichem Grund steht oder Teile (Stützen, Gegengewichte) auf den Gehweg ragen.</p>
              <p className="text-[12px] text-gray-400 mt-1">Beim Ordnungsamt | Kosten: 50–300€ | Bearbeitungszeit: 1–3 Wochen</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Überschwenkgenehmigung</p>
              <p className="text-[13px] text-gray-500">Wenn der Kranausleger über Nachbargrundstücke schwenkt, brauchen Sie deren schriftliche Zustimmung oder eine behördliche Genehmigung.</p>
              <p className="text-[12px] text-gray-400 mt-1">Beim Bauordnungsamt | Kosten: 50–200€</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Statiknachweis</p>
              <p className="text-[13px] text-gray-500">Der Standsicherheitsnachweis für das Kranfundament muss von einem Statiker erstellt und genehmigt werden.</p>
              <p className="text-[12px] text-gray-400 mt-1">Statiker + Bauordnungsamt | Kosten: 500–2.000€</p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/ratgeber/kran-aufstellen-genehmigung" className="text-[13px] text-blue-600 hover:underline">
              Alle Genehmigungen im Detail &rarr;
            </Link>
          </div>
        </section>

        {/* Montage */}
        <section id="montage" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Wie lange dauert Montage und Demontage?</h2>
          <p className="mb-4">
            Die Dauer der Baukran-Montage hängt von der Größe und der Bauart ab:
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Baukran-Typ</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Montage</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Fundament</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Vorlauf gesamt</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-t">
                  <td className="py-3 px-4">Schnellmontagekran</td>
                  <td className="py-3 px-4">2–4 Stunden</td>
                  <td className="py-3 px-4">oft nicht nötig</td>
                  <td className="py-3 px-4">1–2 Wochen</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4">Obendreher (mittel)</td>
                  <td className="py-3 px-4">1–2 Tage</td>
                  <td className="py-3 px-4">2–3 Tage</td>
                  <td className="py-3 px-4">2–4 Wochen</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4">Obendreher (groß)</td>
                  <td className="py-3 px-4">2–3 Tage</td>
                  <td className="py-3 px-4">3–5 Tage</td>
                  <td className="py-3 px-4">4–8 Wochen</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mt-4">
            <p className="text-[13px] text-amber-800">
              <strong>Wichtig:</strong> Die Demontage dauert ähnlich lang wie die Montage. Planen Sie den
              Abbautermin rechtzeitig — vor allem, wenn nach dem Kran weitere Arbeiten (Außenanlagen,
              Pflasterung) anstehen.
            </p>
          </div>
        </section>

        {/* Baukran vs Autokran */}
        <section id="baukran-vs-autokran" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Baukran vs. Autokran — ab wann lohnt sich der Turmdrehkran?</h2>
          <p className="mb-4">
            Die Entscheidung zwischen Baukran und Autokran ist oft eine Frage der Einsatzdauer.
            Hier ein direkter Kostenvergleich:
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Szenario</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Autokran</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Baukran</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Günstiger</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-t">
                  <td className="py-3 px-4">5 Einsätze à 1 Tag</td>
                  <td className="py-3 px-4">5 x 800€ = 4.000€</td>
                  <td className="py-3 px-4">8.000€ + 5.000€ = 13.000€</td>
                  <td className="py-3 px-4 text-green-600 font-medium">Autokran</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4">3 Monate Dauereinsatz</td>
                  <td className="py-3 px-4">60 x 800€ = 48.000€</td>
                  <td className="py-3 px-4">3 x 8.000€ + 5.000€ = 29.000€</td>
                  <td className="py-3 px-4 text-green-600 font-medium">Baukran</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4">6 Monate Dauereinsatz</td>
                  <td className="py-3 px-4">120 x 800€ = 96.000€</td>
                  <td className="py-3 px-4">6 x 8.000€ + 5.000€ = 53.000€</td>
                  <td className="py-3 px-4 text-green-600 font-medium">Baukran</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[12px] text-gray-400 mt-2">
            Rechenbeispiel mit mittlerem Baukran (8.000€/Monat) vs. mittlerem Autokran (800€/Tag).
            Baukran-Bediener nicht enthalten.
          </p>
          <p className="mt-3 text-[13px]">
            <strong className="text-gray-900">Faustregel:</strong> Ab ca. 15–20 Kraneinsätzen oder einer
            Bauzeit von 3+ Monaten ist der Baukran in der Regel günstiger als wiederholte Autokran-Einsätze.
          </p>
        </section>

      </div>

      {/* Anbieter finden */}
      <section id="anbieter" className="mt-10 scroll-mt-20 bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Baukran-Anbieter finden
        </h2>
        <p className="text-[14px] text-gray-500 mb-5 max-w-xl mx-auto">
          Vergleichen Sie Baukran-Vermieter in Ihrer Region. Auf KranVergleich.de finden Sie
          {anbieterCount}+ Anbieter mit Montage-Service.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          <Link href="/baukran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Alle Baukran-Anbieter</Link>
          <Link href="/baukran-mieten/berlin" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Baukran Berlin</Link>
          <Link href="/baukran-mieten/hamburg" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Baukran Hamburg</Link>
          <Link href="/baukran-mieten/muenchen" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Baukran München</Link>
        </div>
        <Link
          href="/baukran-mieten"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-semibold rounded-md transition-colors"
        >
          Jetzt Baukran-Anbieter vergleichen
        </Link>
        <p className="text-[12px] text-gray-400 mt-3">Kostenlos & unverbindlich.</p>
      </section>

      {/* Related articles */}
      <section className="mt-10">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Weiterführende Ratgeber</h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/ratgeber/was-kostet-ein-kran" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Alle Kran-Preise</Link>
          <Link href="/ratgeber/kran-aufstellen-genehmigung" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Kran Genehmigung</Link>
          <Link href="/ratgeber/autokran-mieten-kosten" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Autokran Kosten</Link>
          <Link href="/ratgeber/welchen-kran-brauche-ich" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Welchen Kran brauche ich?</Link>
        </div>
      </section>

      {/* FAQ */}
      <div id="faq" className="mt-10 scroll-mt-20">
        <FAQSection faqs={faqs} craneTypeName="Baukran" />
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
              { '@type': 'ListItem', position: 3, name: 'Baukran mieten Kosten' },
            ],
          }),
        }}
      />
    </div>
  )
}
