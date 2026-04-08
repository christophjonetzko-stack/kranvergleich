import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/faq-section'
import { getSiteStats } from '@/lib/queries'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Mobilkran mieten: Kosten, Tragkraft & Einsatz 2026',
  description:
    'Mobilkran mieten ab 600\u20AC/Tag inkl. Kranf\u00FChrer. Tragkraft 20\u20131.200t. Preisliste, typische Eins\u00E4tze und Unterschied zum Autokran.',
  alternates: { canonical: '/ratgeber/mobilkran-mieten-kosten' },
  openGraph: {
    title: 'Mobilkran mieten: Kosten, Tragkraft & Einsatz 2026',
    description:
      'Mobilkran mieten ab 600\u20AC/Tag inkl. Kranf\u00FChrer. Tragkraft 20\u20131.200t. Preisliste und typische Eins\u00E4tze.',
    type: 'website',
    url: '/ratgeber/mobilkran-mieten-kosten',
  },
}

const faqs = [
  {
    question: 'Was ist der Unterschied zwischen Mobilkran und Autokran?',
    answer:
      'Der Hauptunterschied liegt in der Tragkraft: Autokrane tragen typischerweise 10\u2013500\u202Ft, Mobilkrane 20\u20131.200\u202Ft. Mobilkrane haben ein separates Fahrwerk und ben\u00F6tigen oft Schwertransport-Genehmigungen. F\u00FCr Lasten bis 500\u202Ft reicht meist ein Autokran \u2014 dar\u00FCber hinaus brauchen Sie einen Mobilkran.',
  },
  {
    question: 'Ist der Kranf\u00FChrer beim Mobilkran inklusive?',
    answer:
      'Ja, immer. Mobilkrane d\u00FCrfen ausschlie\u00DFlich von ausgebildeten Kranf\u00FChrern bedient werden. Der Bediener ist bei der Miete stets im Preis enthalten. Bei Gro\u00DFkranen ab 500\u202Ft sind oft mehrere Kranf\u00FChrer und ein Einweiser im Team.',
  },
  {
    question: 'Wie schnell ist ein Mobilkran verf\u00FCgbar?',
    answer:
      'Mobilkrane bis 100\u202Ft sind meist innerhalb von 1\u20132 Wochen verf\u00FCgbar. Gro\u00DFkrane ab 250\u202Ft sollten Sie 4\u20138 Wochen im Voraus buchen. In der Hochsaison (M\u00E4rz\u2013Oktober) planen Sie zus\u00E4tzliche Vorlaufzeit ein.',
  },
]

export default async function MobilkranMietenKostenPage() {
  const { anbieterCount, staedteCount } = await getSiteStats()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/ratgeber" className="hover:text-gray-600">Ratgeber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Mobilkran mieten Kosten</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Mobilkran mieten: Kosten, Tragkraft &amp; Einsatz (2026)
      </h1>
      <p className="text-[15px] text-gray-500 mb-4 max-w-3xl">
        Ein Mobilkran kostet <strong className="text-gray-900">600&ndash;3.000&euro;/Tag</strong> inklusive
        Kranf&uuml;hrer. Mobilkrane decken Tragkraftbereiche von 20 bis 1.200&thinsp;t ab und sind damit
        die leistungsst&auml;rkste Option f&uuml;r Schwerlast-Hebearbeiten auf Stra&szlig;en und Baustellen.
      </p>
      <p className="text-[11px] text-gray-300 mb-8">Stand: April 2026</p>

      {/* Table of contents */}
      <nav className="mb-8 border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-medium text-gray-900 mb-2">Inhalt</p>
        <ul className="flex flex-col gap-1">
          <li><a href="#unterschied" className="text-[13px] text-blue-600 hover:underline">Mobilkran vs. Autokran</a></li>
          <li><a href="#kosten" className="text-[13px] text-blue-600 hover:underline">Was kostet ein Mobilkran?</a></li>
          <li><a href="#wann" className="text-[13px] text-blue-600 hover:underline">Wann brauche ich einen Mobilkran?</a></li>
          <li><a href="#berechnen" className="text-[13px] text-blue-600 hover:underline">Mobilkran Kosten berechnen</a></li>
          <li><a href="#anbieter" className="text-[13px] text-blue-600 hover:underline">Anbieter finden</a></li>
          <li><a href="#faq" className="text-[13px] text-blue-600 hover:underline">H&auml;ufige Fragen</a></li>
        </ul>
      </nav>

      <div className="space-y-10 text-[14px] text-gray-600 leading-relaxed">

        {/* Mobilkran vs. Autokran */}
        <section id="unterschied" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Was ist der Unterschied zwischen Mobilkran und Autokran?</h2>
          <p className="mb-4">
            Beide Krantypen sind stra&szlig;enfahrbar und werden mit Kranf&uuml;hrer vermietet. Der
            entscheidende Unterschied liegt in der <strong className="text-gray-900">Tragkraft und Gr&ouml;&szlig;e</strong>:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Kriterium</th>
                  <th className="py-3 px-4 text-left font-medium text-blue-600">Autokran</th>
                  <th className="py-3 px-4 text-left font-medium text-blue-600">Mobilkran</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-t"><td className="py-3 px-4 font-medium text-gray-900">Tragkraft</td><td className="py-3 px-4">10&ndash;500&thinsp;t</td><td className="py-3 px-4">20&ndash;1.200&thinsp;t</td></tr>
                <tr className="border-t bg-gray-50"><td className="py-3 px-4 font-medium text-gray-900">Tagespreis</td><td className="py-3 px-4">ab 500&thinsp;&euro;</td><td className="py-3 px-4">ab 600&thinsp;&euro;</td></tr>
                <tr className="border-t"><td className="py-3 px-4 font-medium text-gray-900">Kranf&uuml;hrer</td><td className="py-3 px-4">Inklusive</td><td className="py-3 px-4">Inklusive</td></tr>
                <tr className="border-t bg-gray-50"><td className="py-3 px-4 font-medium text-gray-900">Aufbauzeit</td><td className="py-3 px-4">15&ndash;45&thinsp;Min.</td><td className="py-3 px-4">1&ndash;8&thinsp;Std.</td></tr>
                <tr className="border-t"><td className="py-3 px-4 font-medium text-gray-900">Transport</td><td className="py-3 px-4 text-green-600">F&auml;hrt selbst</td><td className="py-3 px-4">Oft Schwertransport n&ouml;tig</td></tr>
                <tr className="border-t bg-gray-50"><td className="py-3 px-4 font-medium text-gray-900">Ideal f&uuml;r</td><td className="py-3 px-4">Tageseins&auml;tze bis 500&thinsp;t</td><td className="py-3 px-4">Schwerlast &gt;&thinsp;100&thinsp;t</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-[13px] text-gray-500 mt-3">
            <strong className="text-gray-900">Faustregel:</strong> Bis 100&thinsp;t reicht ein Autokran. Ab 100&thinsp;t
            wird der Mobilkran wirtschaftlicher. Ab 500&thinsp;t ist ein Mobilkran die einzige Option.
          </p>
        </section>

        {/* Kosten nach Tragkraft */}
        <section id="kosten" className="scroll-mt-20 border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Was kostet ein Mobilkran?</h2>
          <p className="mb-4 text-[13px]">
            Die Kosten richten sich vor allem nach der Tragkraft. Alle Preise inklusive Kranf&uuml;hrer:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-3 text-left font-medium text-gray-900">Tragkraft</th>
                  <th className="py-2 px-3 text-left font-medium text-gray-900">Tagespreis</th>
                  <th className="py-2 px-3 text-left font-medium text-gray-900">Wochenpreis</th>
                  <th className="py-2 px-3 text-left font-medium text-gray-900">Typischer Einsatz</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                <tr className="border-b">
                  <td className="py-2 px-3">40&thinsp;t</td>
                  <td className="py-2 px-3 font-medium text-gray-900">600&ndash;900&thinsp;&euro;</td>
                  <td className="py-2 px-3">3.000&ndash;4.500&thinsp;&euro;</td>
                  <td className="py-2 px-3">Stahlbau, Maschinen</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">100&thinsp;t</td>
                  <td className="py-2 px-3 font-medium text-gray-900">900&ndash;1.500&thinsp;&euro;</td>
                  <td className="py-2 px-3">4.500&ndash;7.500&thinsp;&euro;</td>
                  <td className="py-2 px-3">Br&uuml;ckenteile, Fertigteile</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">250&thinsp;t</td>
                  <td className="py-2 px-3 font-medium text-gray-900">1.500&ndash;2.500&thinsp;&euro;</td>
                  <td className="py-2 px-3">7.500&ndash;12.500&thinsp;&euro;</td>
                  <td className="py-2 px-3">Industriemontage, Raffinerie</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">500&thinsp;t</td>
                  <td className="py-2 px-3 font-medium text-gray-900">2.500&ndash;4.000&thinsp;&euro;</td>
                  <td className="py-2 px-3">12.500&ndash;20.000&thinsp;&euro;</td>
                  <td className="py-2 px-3">Windkraftanlagen, Br&uuml;ckenbau</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">1.000&thinsp;t</td>
                  <td className="py-2 px-3 font-medium text-gray-900">5.000&ndash;10.000&thinsp;&euro;</td>
                  <td className="py-2 px-3">25.000&ndash;50.000&thinsp;&euro;</td>
                  <td className="py-2 px-3">Offshore, Kraftwerke</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-3">
            Alle Preise netto, inkl. Kranf&uuml;hrer. Zus&auml;tzlich k&ouml;nnen Anfahrtskosten
            (2&ndash;5&thinsp;&euro;/km), Auf-/Abbaukosten und Schwertransportgeb&uuml;hren anfallen.
          </p>
        </section>

        {/* Wann brauche ich einen Mobilkran? */}
        <section id="wann" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Wann brauche ich einen Mobilkran?</h2>
          <p className="mb-4">
            Mobilkrane kommen dort zum Einsatz, wo Autokrane an ihre Grenzen sto&szlig;en &mdash;
            bei sehr schweren Lasten und gro&szlig;en H&ouml;hen:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Stahlbau &amp; Industriemontage</p>
              <p className="text-[13px] text-gray-500">Schwere Stahltr&auml;ger, Maschinenteile, Transformatoren. Lasten 50&ndash;500&thinsp;t.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Br&uuml;ckenbau</p>
              <p className="text-[13px] text-gray-500">Br&uuml;ckentr&auml;ger und Fertigteile einsetzen. Oft 250&ndash;1.000&thinsp;t Tragkraft n&ouml;tig.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Windkraftanlagen</p>
              <p className="text-[13px] text-gray-500">T&uuml;rme, Gondeln und Rotorbl&auml;tter montieren. Hubh&ouml;hen bis 160&thinsp;m.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Kraftwerke &amp; Raffinerien</p>
              <p className="text-[13px] text-gray-500">Kessel, Kolonnen, Reaktorbeh&auml;lter. H&ouml;chste Tragkraftanforderungen.</p>
            </div>
          </div>
        </section>

        {/* Mobilkran Kosten berechnen */}
        <section id="berechnen" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Mobilkran Kosten berechnen &mdash; welche Faktoren z&auml;hlen?</h2>
          <p className="mb-4">
            Der Endpreis f&uuml;r einen Mobilkran setzt sich aus mehreren Komponenten zusammen.
            Die Tragkraft allein bestimmt nicht den Preis:
          </p>
          <div className="space-y-3 text-[13px]">
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span><strong className="text-gray-900">Tragkraft</strong> &mdash; gr&ouml;&szlig;ter Kostenfaktor</span>
              <span className="text-gray-400">60&ndash;70&thinsp;% des Preises</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span><strong className="text-gray-900">Anfahrt</strong> &mdash; Entfernung zum Einsatzort</span>
              <span className="text-gray-400">2&ndash;5&thinsp;&euro;/km</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span><strong className="text-gray-900">Einsatzdauer</strong> &mdash; l&auml;nger = g&uuml;nstiger pro Tag</span>
              <span className="text-gray-400">Wochenrabatt 20&ndash;30&thinsp;%</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span><strong className="text-gray-900">Auf-/Abbau</strong> &mdash; bei Gro&szlig;kranen separat</span>
              <span className="text-gray-400">500&ndash;5.000&thinsp;&euro;</span>
            </div>
            <div className="flex justify-between">
              <span><strong className="text-gray-900">Schwertransport</strong> &mdash; ab ca. 100&thinsp;t n&ouml;tig</span>
              <span className="text-gray-400">1.000&ndash;10.000&thinsp;&euro;</span>
            </div>
          </div>
          <div className="mt-4 bg-amber-50 border border-amber-100 rounded-lg p-4">
            <p className="text-[13px] text-amber-800">
              <strong>Tipp:</strong> Holen Sie immer mindestens 3 Angebote ein. Bei Mobilkranen
              k&ouml;nnen die Preisunterschiede zwischen Anbietern 30&ndash;50&thinsp;% betragen &mdash;
              vor allem durch unterschiedliche Anfahrtswege.
            </p>
          </div>
        </section>

        {/* Anbieter finden */}
        <section id="anbieter" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Mobilkran-Anbieter finden</h2>
          <p className="mb-4">
            Vergleichen Sie Mobilkran-Vermieter in Ihrer Region. {anbieterCount}+ Anbieter
            in {staedteCount}+ St&auml;dten auf KranVergleich.de.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href="/mobilkran-mieten" className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors">
              <span className="text-[13px] font-medium text-blue-600">Mobilkran mieten &mdash; alle St&auml;dte</span>
            </Link>
            <Link href="/mobilkran-mieten/berlin" className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors">
              <span className="text-[13px] font-medium text-blue-600">Mobilkran mieten Berlin</span>
            </Link>
            <Link href="/mobilkran-mieten/hamburg" className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors">
              <span className="text-[13px] font-medium text-blue-600">Mobilkran mieten Hamburg</span>
            </Link>
            <Link href="/autokran-mieten" className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors">
              <span className="text-[13px] font-medium text-blue-600">Autokran mieten (bis 500&thinsp;t)</span>
            </Link>
          </div>
        </section>
      </div>

      {/* FAQ */}
      <div id="faq" className="mt-10 scroll-mt-20">
        <FAQSection faqs={faqs} craneTypeName="Mobilkran" />
      </div>

      {/* CTA */}
      <section className="mt-10 bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Mobilkran-Angebote vergleichen
        </h2>
        <p className="text-[14px] text-gray-500 mb-5 max-w-xl mx-auto">
          Finden Sie den passenden Mobilkran f&uuml;r Ihr Projekt. Kostenlos Angebote
          von {anbieterCount}+ Vermietern vergleichen &mdash; inkl. Kranf&uuml;hrer.
        </p>
        <Link
          href="/mobilkran-mieten"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-semibold rounded-md transition-colors"
        >
          Jetzt Mobilkran-Anbieter finden
        </Link>
        <p className="text-[12px] text-gray-400 mt-3">Kostenlos &amp; unverbindlich.</p>
      </section>

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
              { '@type': 'ListItem', position: 3, name: 'Mobilkran mieten Kosten', item: 'https://kranvergleich.de/ratgeber/mobilkran-mieten-kosten' },
            ],
          }),
        }}
      />
    </div>
  )
}
