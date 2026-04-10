import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/faq-section'
import { getSiteStats } from '@/lib/queries'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Was kostet ein Kran? Komplette Preisübersicht 2026',
  description:
    'Was kostet ein Kran? Minikran ab 250€/Tag, Autokran ab 500€/Tag, Baukran ab 4.000€/Monat. Alle 8 Krantypen mit Preisen — basierend auf 740+ Anbietern.',
  alternates: { canonical: '/ratgeber/was-kostet-ein-kran' },
  openGraph: {
    title: 'Was kostet ein Kran? Komplette Preisübersicht 2026',
    description:
      'Was kostet ein Kran? Minikran ab 250€/Tag, Autokran ab 500€/Tag, Baukran ab 4.000€/Monat. Alle 8 Krantypen mit Preisen.',
    type: 'website',
    url: '/ratgeber/was-kostet-ein-kran',
  },
}

const faqs = [
  {
    question: 'Was kostet ein Kran pro Tag?',
    answer:
      'Die Tagesmiete liegt je nach Krantyp zwischen 150€ (Anhängerkran) und 5.000€ (Schwerlast-Raupenkran). Die gängigsten Krane: Minikran ab 250€/Tag, Autokran ab 500€/Tag, Baukran ab 300€/Tag. Alle Preise netto zzgl. MwSt.',
  },
  {
    question: 'Ist der Kranführer im Preis enthalten?',
    answer:
      'Bei Autokranen, Mobilkranen und Raupenkranen ist der Kranführer immer inklusive (gesetzlich vorgeschrieben). Bei Minikranen, Dachdeckerkranen, Anhängerkranen und Ladekranen bedienen Sie den Kran nach Einweisung selbst — oder buchen einen Bediener separat (ca. 40–60€/h).',
  },
  {
    question: 'Welcher Kran ist am günstigsten?',
    answer:
      'Der Anhängerkran ist mit 150–350€/Tag der günstigste Krantyp. Er eignet sich für leichte Lasten bis 1.500 kg und kann mit einer PKW-Anhängerkupplung transportiert werden. Für etwas schwerere Lasten ist der Dachdeckerkran ab 200€/Tag eine gute Alternative.',
  },
  {
    question: 'Was kostet ein Kran für einen Hausbau?',
    answer:
      'Für einen Hausbau wird typischerweise ein Baukran (Turmdrehkran) eingesetzt: 4.000–10.000€/Monat zzgl. 3.000–8.000€ Montage/Demontage. Bei einer Bauzeit von 6 Monaten rechnen Sie mit Gesamtkosten von 27.000–68.000€. Alternativ: punktuelle Autokran-Einsätze ab 500€/Tag.',
  },
]

export default async function WasKostetEinKranPage() {
  const { anbieterCount, staedteCount } = await getSiteStats()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/ratgeber" className="hover:text-gray-600">Ratgeber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Was kostet ein Kran?</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Was kostet ein Kran? Komplette Preisübersicht 2026
      </h1>
      <p className="text-[15px] text-gray-500 mb-4 max-w-3xl">
        Ein Kran kostet zwischen <strong className="text-gray-900">150€ und 5.000€ pro Tag</strong> —
        je nach Krantyp, Tragkraft und Mietdauer. In dieser Übersicht finden Sie die aktuellen Mietpreise
        für alle 8 Krantypen in Deutschland, basierend auf {anbieterCount}+ Anbietern.
      </p>
      <p className="text-[11px] text-gray-300 mb-8">Stand: April 2026 | Alle Preise netto zzgl. MwSt.</p>

      {/* TOC */}
      <nav className="mb-8 border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-medium text-gray-900 mb-2">Inhalt</p>
        <ul className="flex flex-col gap-1">
          <li><a href="#preistabelle" className="text-[13px] text-blue-600 hover:underline">Preistabelle: Alle 8 Krantypen im Vergleich</a></li>
          <li><a href="#minikran" className="text-[13px] text-blue-600 hover:underline">Minikran Kosten</a></li>
          <li><a href="#autokran" className="text-[13px] text-blue-600 hover:underline">Autokran Kosten</a></li>
          <li><a href="#baukran" className="text-[13px] text-blue-600 hover:underline">Baukran Kosten</a></li>
          <li><a href="#weitere-krantypen" className="text-[13px] text-blue-600 hover:underline">Weitere Krantypen</a></li>
          <li><a href="#preisfaktoren" className="text-[13px] text-blue-600 hover:underline">Welche Faktoren beeinflussen den Preis?</a></li>
          <li><a href="#sparen" className="text-[13px] text-blue-600 hover:underline">Wie kann ich bei der Kranmiete sparen?</a></li>
          <li><a href="#faq" className="text-[13px] text-blue-600 hover:underline">Häufige Fragen</a></li>
        </ul>
      </nav>

      <div className="space-y-10 text-[14px] text-gray-600 leading-relaxed">

        {/* Big comparison table */}
        <section id="preistabelle" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Preistabelle: Alle 8 Krantypen im Vergleich
          </h2>
          <p className="mb-4">
            Die folgende Tabelle zeigt die Mietpreise aller gängigen Krantypen in Deutschland —
            sortiert nach Tagespreis.
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Krantyp</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Tag</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Woche</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Monat</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Kranführer</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-t">
                  <td className="py-3 px-4"><Link href="/anhaengerkran-mieten" className="text-blue-600 hover:underline">Anhängerkran</Link></td>
                  <td className="py-3 px-4">150–350€</td>
                  <td className="py-3 px-4">700–1.800€</td>
                  <td className="py-3 px-4">2.000–5.000€</td>
                  <td className="py-3 px-4">ohne</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4"><Link href="/dachdeckerkran-mieten" className="text-blue-600 hover:underline">Dachdeckerkran</Link></td>
                  <td className="py-3 px-4">200–450€</td>
                  <td className="py-3 px-4">1.000–2.500€</td>
                  <td className="py-3 px-4">3.000–7.000€</td>
                  <td className="py-3 px-4">ohne</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4"><Link href="/minikran-mieten" className="text-blue-600 hover:underline">Minikran</Link></td>
                  <td className="py-3 px-4">250–500€</td>
                  <td className="py-3 px-4">1.200–2.800€</td>
                  <td className="py-3 px-4">3.500–8.000€</td>
                  <td className="py-3 px-4">ohne</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4"><Link href="/baukran-mieten" className="text-blue-600 hover:underline">Baukran</Link></td>
                  <td className="py-3 px-4">300–1.500€</td>
                  <td className="py-3 px-4">1.500–8.000€</td>
                  <td className="py-3 px-4">4.000–25.000€</td>
                  <td className="py-3 px-4">ohne*</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4"><Link href="/ladekran-mieten" className="text-blue-600 hover:underline">Ladekran</Link></td>
                  <td className="py-3 px-4">300–800€</td>
                  <td className="py-3 px-4">1.500–4.000€</td>
                  <td className="py-3 px-4">4.000–12.000€</td>
                  <td className="py-3 px-4">ohne</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4"><Link href="/autokran-mieten" className="text-blue-600 hover:underline">Autokran</Link></td>
                  <td className="py-3 px-4">500–2.000€</td>
                  <td className="py-3 px-4">2.500–10.000€</td>
                  <td className="py-3 px-4">8.000–35.000€</td>
                  <td className="py-3 px-4">inklusive</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4"><Link href="/mobilkran-mieten" className="text-blue-600 hover:underline">Mobilkran</Link></td>
                  <td className="py-3 px-4">600–3.000€</td>
                  <td className="py-3 px-4">3.000–15.000€</td>
                  <td className="py-3 px-4">10.000–50.000€</td>
                  <td className="py-3 px-4">inklusive</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4"><Link href="/raupenkran-mieten" className="text-blue-600 hover:underline">Raupenkran</Link></td>
                  <td className="py-3 px-4">800–5.000€</td>
                  <td className="py-3 px-4">4.000–25.000€</td>
                  <td className="py-3 px-4">12.000–80.000€</td>
                  <td className="py-3 px-4">inklusive</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            * Baukran: zzgl. 3.000–8.000€ Montage/Demontage. Alle Preise netto, unverbindliche Richtwerte.
          </p>
        </section>

        {/* Minikran */}
        <section id="minikran" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Was kostet ein Minikran?</h2>
          <p className="mb-3">
            Ein Minikran kostet <strong className="text-gray-900">250–500€ pro Tag</strong> ohne Bediener.
            Er eignet sich für enge Baustellen, Innenräume und Glasmontage. Tragkraft: 500 kg bis 3 t.
            Der Minikran wird ohne Kranführer vermietet — Sie bedienen ihn nach Einweisung selbst.
          </p>
          <div className="grid grid-cols-3 gap-2 text-[12px] mb-3">
            <div className="bg-gray-50 rounded p-3 text-center">
              <span className="text-gray-400">Tag</span>
              <p className="font-medium text-gray-900">250–500€</p>
            </div>
            <div className="bg-gray-50 rounded p-3 text-center">
              <span className="text-gray-400">Woche</span>
              <p className="font-medium text-gray-900">1.200–2.800€</p>
            </div>
            <div className="bg-gray-50 rounded p-3 text-center">
              <span className="text-gray-400">Monat</span>
              <p className="font-medium text-gray-900">3.500–8.000€</p>
            </div>
          </div>
          <Link href="/minikran-mieten" className="text-[13px] text-blue-600 hover:underline">
            Minikran-Anbieter vergleichen &rarr;
          </Link>
        </section>

        {/* Autokran */}
        <section id="autokran" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Was kostet ein Autokran?</h2>
          <p className="mb-3">
            Ein Autokran kostet <strong className="text-gray-900">500–2.000€ pro Tag</strong> inklusive Kranführer.
            Der Preis hängt von der Tragkraft ab: kleine Autokrane (30 t) ab 500€/Tag, große Modelle
            (250 t+) ab 1.500€/Tag. Autokrane sind ideal für kurzfristige Hebearbeiten von 1–3 Tagen.
          </p>
          <div className="grid grid-cols-3 gap-2 text-[12px] mb-3">
            <div className="bg-gray-50 rounded p-3 text-center">
              <span className="text-gray-400">Tag</span>
              <p className="font-medium text-gray-900">500–2.000€</p>
            </div>
            <div className="bg-gray-50 rounded p-3 text-center">
              <span className="text-gray-400">Woche</span>
              <p className="font-medium text-gray-900">2.500–10.000€</p>
            </div>
            <div className="bg-gray-50 rounded p-3 text-center">
              <span className="text-gray-400">Monat</span>
              <p className="font-medium text-gray-900">8.000–35.000€</p>
            </div>
          </div>
          <Link href="/autokran-mieten#ratgeber" className="text-[13px] text-blue-600 hover:underline">
            Autokran Kosten im Detail &rarr;
          </Link>
        </section>

        {/* Baukran */}
        <section id="baukran" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Was kostet ein Baukran?</h2>
          <p className="mb-3">
            Ein Baukran (Turmdrehkran) kostet <strong className="text-gray-900">4.000–25.000€ pro Monat</strong> zzgl.
            3.000–8.000€ Montage/Demontage. Baukrane werden typischerweise für mehrere Monate gemietet und
            lohnen sich ab einer Bauzeit von 3 Monaten. Der Bediener wird separat gebucht.
          </p>
          <div className="grid grid-cols-3 gap-2 text-[12px] mb-3">
            <div className="bg-gray-50 rounded p-3 text-center">
              <span className="text-gray-400">Tag</span>
              <p className="font-medium text-gray-900">300–1.500€</p>
            </div>
            <div className="bg-gray-50 rounded p-3 text-center">
              <span className="text-gray-400">Woche</span>
              <p className="font-medium text-gray-900">1.500–8.000€</p>
            </div>
            <div className="bg-gray-50 rounded p-3 text-center">
              <span className="text-gray-400">Monat</span>
              <p className="font-medium text-gray-900">4.000–25.000€</p>
            </div>
          </div>
          <Link href="/ratgeber/baukran-mieten-kosten" className="text-[13px] text-blue-600 hover:underline">
            Baukran Kosten im Detail &rarr;
          </Link>
        </section>

        {/* Weitere Krantypen */}
        <section id="weitere-krantypen" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Weitere Krantypen und ihre Kosten</h2>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Dachdeckerkran — 200–450€/Tag</p>
              <p className="text-[13px] text-gray-500">Kompakter Kran für Dacharbeiten. Hakenhöhe bis 30 m, ohne Bediener. Ideal für Dachsanierung und Solaranlagen.</p>
              <Link href="/dachdeckerkran-mieten" className="text-[13px] text-blue-600 hover:underline mt-1 inline-block">Dachdeckerkran-Anbieter &rarr;</Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Raupenkran — 800–5.000€/Tag</p>
              <p className="text-[13px] text-gray-500">Schwerlastkran für Lasten bis 3.000 t. Inkl. Kranführer. Einsatz auf unbefestigtem Untergrund möglich.</p>
              <Link href="/raupenkran-mieten" className="text-[13px] text-blue-600 hover:underline mt-1 inline-block">Raupenkran-Anbieter &rarr;</Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Mobilkran — 600–3.000€/Tag</p>
              <p className="text-[13px] text-gray-500">Flexibler Schwerlastkran, sofort einsatzbereit. Inkl. Kranführer. Tragkraft 20–1.200 t.</p>
              <Link href="/mobilkran-mieten" className="text-[13px] text-blue-600 hover:underline mt-1 inline-block">Mobilkran-Anbieter &rarr;</Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Ladekran — 300–800€/Tag</p>
              <p className="text-[13px] text-gray-500">Auf dem LKW montierter Kran. Ohne Bediener. Tragkraft 1–30 t, ideal zum Be- und Entladen.</p>
              <Link href="/ladekran-mieten" className="text-[13px] text-blue-600 hover:underline mt-1 inline-block">Ladekran-Anbieter &rarr;</Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Anhängerkran — 150–350€/Tag</p>
              <p className="text-[13px] text-gray-500">Günstigste Option. Mit PKW-Anhängerkupplung transportierbar. Tragkraft bis 1.500 kg.</p>
              <Link href="/anhaengerkran-mieten" className="text-[13px] text-blue-600 hover:underline mt-1 inline-block">Anhängerkran-Anbieter &rarr;</Link>
            </div>
          </div>
        </section>

        {/* Preisfaktoren */}
        <section id="preisfaktoren" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Welche Faktoren beeinflussen den Preis?</h2>
          <div className="space-y-3">
            <div className="flex gap-3">
              <span className="text-gray-400 shrink-0 font-medium">1.</span>
              <div>
                <p className="font-medium text-gray-900">Mietdauer</p>
                <p className="text-[13px] text-gray-500">Längere Miete = niedrigerer Tagespreis. Wochenpreise sind 20–40% günstiger pro Tag als Tagespreise.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 shrink-0 font-medium">2.</span>
              <div>
                <p className="font-medium text-gray-900">Region</p>
                <p className="text-[13px] text-gray-500">In Ballungsräumen (München, Hamburg, Frankfurt) sind die Preise 10–20% höher als in ländlichen Gebieten.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 shrink-0 font-medium">3.</span>
              <div>
                <p className="font-medium text-gray-900">Saison</p>
                <p className="text-[13px] text-gray-500">März bis Oktober ist Hochsaison. In der Nebensaison sind Rabatte von 10–15% möglich.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 shrink-0 font-medium">4.</span>
              <div>
                <p className="font-medium text-gray-900">Transport</p>
                <p className="text-[13px] text-gray-500">An- und Abfahrt kosten je nach Entfernung 150–500€. Bei Schwerlastkranen deutlich mehr.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 shrink-0 font-medium">5.</span>
              <div>
                <p className="font-medium text-gray-900">Genehmigungen</p>
                <p className="text-[13px] text-gray-500">Straßensperrung, Halteverbot und Sondernutzungserlaubnis kosten zusätzlich 100–500€.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sparen */}
        <section id="sparen" className="scroll-mt-20 border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Wie kann ich bei der Kranmiete sparen?</h2>
          <ul className="space-y-2 text-[13px]">
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> <strong className="text-gray-900">Mehrere Angebote vergleichen:</strong> Preisunterschiede von 30–50% sind üblich. Nutzen Sie unsere <Link href="/" className="text-blue-600 hover:underline">kostenlose Sammelanfrage</Link>.</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> <strong className="text-gray-900">Wochenpreis statt Tagespreis:</strong> Ab 3 Tagen lohnt sich fast immer der Wochenpreis.</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> <strong className="text-gray-900">Passenden Krantyp wählen:</strong> Ein zu großer Kran kostet unnötig viel. Lassen Sie sich beraten.</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> <strong className="text-gray-900">Frühzeitig buchen:</strong> 2–4 Wochen Vorlauf spart Eilzuschläge.</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> <strong className="text-gray-900">Einsatz gut planen:</strong> Wartezeiten vermeiden — jede Stunde zählt beim Autokran.</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> <strong className="text-gray-900">Nebensaison nutzen:</strong> November bis Februar bieten bessere Verfügbarkeit und Preise.</li>
          </ul>
          <div className="mt-4">
            <Link href="/kostenrechner" className="text-[13px] text-blue-600 hover:underline">
              Krankosten berechnen mit unserem Kostenrechner &rarr;
            </Link>
          </div>
        </section>

      </div>

      {/* Anbieter finden */}
      <section className="mt-10 bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Anbieter finden &amp; Preise vergleichen
        </h2>
        <p className="text-[14px] text-gray-500 mb-5 max-w-xl mx-auto">
          Vergleichen Sie jetzt {anbieterCount}+ Kranvermieter in {staedteCount}+ Städten.
          Kostenlos Angebote einholen und den besten Preis für Ihr Projekt finden.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          <Link href="/minikran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Minikran</Link>
          <Link href="/autokran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Autokran</Link>
          <Link href="/baukran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Baukran</Link>
          <Link href="/dachdeckerkran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Dachdeckerkran</Link>
          <Link href="/mobilkran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Mobilkran</Link>
          <Link href="/raupenkran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Raupenkran</Link>
          <Link href="/ladekran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Ladekran</Link>
          <Link href="/anhaengerkran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Anhängerkran</Link>
        </div>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-semibold rounded-md transition-colors"
        >
          Jetzt {anbieterCount}+ Anbieter vergleichen
        </Link>
        <p className="text-[12px] text-gray-400 mt-3">Kostenlos & unverbindlich.</p>
      </section>

      {/* Weiterführende Artikel */}
      <section className="mt-10">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Weiterführende Ratgeber</h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/autokran-mieten#ratgeber" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Autokran Kosten im Detail</Link>
          <Link href="/ratgeber/baukran-mieten-kosten" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Baukran Kosten im Detail</Link>
          <Link href="/ratgeber/welchen-kran-brauche-ich" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Welchen Kran brauche ich?</Link>
          <Link href="/ratgeber/kran-aufstellen-genehmigung" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Kran Genehmigung</Link>
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
              { '@type': 'ListItem', position: 3, name: 'Was kostet ein Kran?' },
            ],
          }),
        }}
      />
    </div>
  )
}
