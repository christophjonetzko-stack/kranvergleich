import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/faq-section'
import { getSiteStats } from '@/lib/queries'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Dachdeckerkran mieten: Kosten, Einsatz & Anbieter 2026',
  description:
    'Dachdeckerkran mieten ab 200\u20AC/Tag. Hakenh\u00F6he bis 30m, ideal f\u00FCr Dachsanierung & Solaranlagen. Kosten, Einsatzbereiche und Anbieter im \u00DCberblick.',
  alternates: { canonical: '/ratgeber/dachdeckerkran-mieten' },
  openGraph: {
    title: 'Dachdeckerkran mieten: Kosten, Einsatz & Anbieter 2026',
    description:
      'Dachdeckerkran mieten ab 200\u20AC/Tag. Hakenh\u00F6he bis 30m, ideal f\u00FCr Dachsanierung & Solaranlagen.',
    type: 'website',
    url: '/ratgeber/dachdeckerkran-mieten',
  },
}

const faqs = [
  {
    question: 'Was kostet ein Dachdeckerkran pro Tag?',
    answer:
      'Ein Dachdeckerkran kostet zwischen 200 und 450\u20AC pro Tag, je nach Modell und Hakenh\u00F6he. F\u00FCr l\u00E4ngere Eins\u00E4tze lohnt sich der Wochenpreis (1.000\u20131.500\u20AC) oder Monatspreis (3.000\u20137.000\u20AC). Der Kranf\u00FChrer ist nicht n\u00F6tig \u2014 Sie bedienen den Kran selbst.',
  },
  {
    question: 'Kann ich einen Dachdeckerkran ohne Kranf\u00FChrerschein bedienen?',
    answer:
      'Ja. F\u00FCr Dachdeckerkrane ist kein Kranf\u00FChrerschein erforderlich. Eine kurze Einweisung durch den Vermieter (ca. 30\u201360 Minuten) gem\u00E4\u00DF DGUV Vorschrift 52 reicht aus. Der Kran wird per Funkfernsteuerung bedient.',
  },
  {
    question: 'Wie hoch reicht ein Dachdeckerkran?',
    answer:
      'Dachdeckerkrane erreichen Hakenh\u00F6hen von 18 bis 30 Metern \u2014 das entspricht etwa 5 bis 9 Stockwerken. F\u00FCr die meisten Wohngeb\u00E4ude und Mehrfamilienh\u00E4user ist das ausreichend. F\u00FCr h\u00F6here Geb\u00E4ude empfiehlt sich ein Autokran.',
  },
]

export default async function DachdeckerkranMietenPage() {
  const { anbieterCount, staedteCount } = await getSiteStats()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/ratgeber" className="hover:text-gray-600">Ratgeber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Dachdeckerkran mieten</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Dachdeckerkran mieten: Kosten, Einsatz &amp; Anbieter (2026)
      </h1>
      <p className="text-[15px] text-gray-500 mb-4 max-w-3xl">
        Ein Dachdeckerkran kostet <strong className="text-gray-900">200&ndash;450&euro;/Tag</strong> und
        ist ohne Kranf&uuml;hrer bedienbar. Mit Hakenh&ouml;hen bis 30&thinsp;m eignet er sich ideal
        f&uuml;r Dachsanierungen, Solaranlagen-Montage und Schornsteinsanierungen &mdash; kompakt genug
        f&uuml;r enge Wohnstra&szlig;en.
      </p>
      <p className="text-[11px] text-gray-300 mb-8">Stand: April 2026</p>

      {/* Table of contents */}
      <nav className="mb-8 border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-medium text-gray-900 mb-2">Inhalt</p>
        <ul className="flex flex-col gap-1">
          <li><a href="#was-ist" className="text-[13px] text-blue-600 hover:underline">Was ist ein Dachdeckerkran?</a></li>
          <li><a href="#kosten" className="text-[13px] text-blue-600 hover:underline">Was kostet ein Dachdeckerkran?</a></li>
          <li><a href="#wann" className="text-[13px] text-blue-600 hover:underline">Wann brauche ich einen Dachdeckerkran?</a></li>
          <li><a href="#vergleich" className="text-[13px] text-blue-600 hover:underline">Dachdeckerkran vs. Autokran</a></li>
          <li><a href="#fuehrerschein" className="text-[13px] text-blue-600 hover:underline">Brauche ich einen F&uuml;hrerschein?</a></li>
          <li><a href="#anbieter" className="text-[13px] text-blue-600 hover:underline">Anbieter finden</a></li>
          <li><a href="#faq" className="text-[13px] text-blue-600 hover:underline">H&auml;ufige Fragen</a></li>
        </ul>
      </nav>

      <div className="space-y-10 text-[14px] text-gray-600 leading-relaxed">

        {/* Was ist ein Dachdeckerkran? */}
        <section id="was-ist" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Was ist ein Dachdeckerkran?</h2>
          <p className="mb-3">
            Ein Dachdeckerkran ist ein kompakter <strong className="text-gray-900">LKW-Aufbaukran oder
            Anh&auml;ngerkran</strong>, der speziell f&uuml;r Arbeiten am Dach entwickelt wurde. Er wird
            an der Stra&szlig;e aufgestellt und hebt Material &uuml;ber die Dachkante &mdash; ohne dass ein
            Ger&uuml;st oder Aufzug n&ouml;tig ist.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Hakenh&ouml;he</p>
              <p className="text-[13px] text-gray-500">18&ndash;30&thinsp;m (ca. 5&ndash;9 Stockwerke)</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Tragkraft</p>
              <p className="text-[13px] text-gray-500">500&ndash;2.000&thinsp;kg je nach Ausladung</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Bedienung</p>
              <p className="text-[13px] text-gray-500">Per Funkfernsteuerung, kein Kranf&uuml;hrer n&ouml;tig</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Aufbauzeit</p>
              <p className="text-[13px] text-gray-500">15&ndash;30 Minuten, kompakter Stellplatz</p>
            </div>
          </div>
        </section>

        {/* Kosten */}
        <section id="kosten" className="scroll-mt-20 border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Was kostet ein Dachdeckerkran?</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-3 text-left font-medium text-gray-900">Mietdauer</th>
                  <th className="py-2 px-3 text-left font-medium text-gray-900">Preis</th>
                  <th className="py-2 px-3 text-left font-medium text-gray-900">Preis/Tag</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                <tr className="border-b">
                  <td className="py-2 px-3">Tagesmiete</td>
                  <td className="py-2 px-3 font-medium text-gray-900">200&ndash;450&thinsp;&euro;</td>
                  <td className="py-2 px-3">200&ndash;450&thinsp;&euro;</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Wochenmiete</td>
                  <td className="py-2 px-3 font-medium text-gray-900">1.000&ndash;2.500&thinsp;&euro;</td>
                  <td className="py-2 px-3">143&ndash;357&thinsp;&euro;</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Monatsmiete</td>
                  <td className="py-2 px-3 font-medium text-gray-900">3.000&ndash;7.000&thinsp;&euro;</td>
                  <td className="py-2 px-3">100&ndash;233&thinsp;&euro;</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-3">
            Alle Preise netto, ohne Kranf&uuml;hrer (Selbstbedienung). Transport und Einweisung sind
            bei den meisten Vermietern im Preis enthalten.
          </p>
        </section>

        {/* Wann brauche ich einen Dachdeckerkran? */}
        <section id="wann" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Wann brauche ich einen Dachdeckerkran?</h2>
          <p className="mb-4">
            Der Dachdeckerkran ist die wirtschaftlichste L&ouml;sung, wenn Material auf oder vom Dach
            transportiert werden muss. Typische Einsatzbereiche:
          </p>
          <ul className="space-y-2 text-[13px]">
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> <strong className="text-gray-900">Dachsanierung:</strong> Dachziegel, D&auml;mmstoffe, Dachfenster aufs Dach heben</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> <strong className="text-gray-900">Solaranlagen:</strong> PV-Module, Montagegestelle, Wechselrichter transportieren</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> <strong className="text-gray-900">Dachbegr&uuml;nung:</strong> Substrat, Pflanzkassetten und Drainageschichten aufs Flachdach heben</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> <strong className="text-gray-900">Schornsteinsanierung:</strong> Schornsteinteile, Edelstahlrohre, Kamink&ouml;pfe auf Dachh&ouml;he bringen</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> <strong className="text-gray-900">Klimaanlagen:</strong> Au&szlig;enger&auml;te auf Flachd&auml;cher setzen</li>
          </ul>
        </section>

        {/* Dachdeckerkran vs. Autokran */}
        <section id="vergleich" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Dachdeckerkran vs. Autokran &mdash; was ist g&uuml;nstiger?</h2>
          <p className="mb-4">
            F&uuml;r Dacharbeiten ist der Dachdeckerkran in den meisten F&auml;llen die bessere Wahl.
            Der Autokran lohnt sich nur bei sehr schweren Lasten oder gro&szlig;en H&ouml;hen.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Kriterium</th>
                  <th className="py-3 px-4 text-left font-medium text-blue-600">Dachdeckerkran</th>
                  <th className="py-3 px-4 text-left font-medium text-blue-600">Autokran</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-t"><td className="py-3 px-4 font-medium text-gray-900">Tagespreis</td><td className="py-3 px-4">ab 200&thinsp;&euro;</td><td className="py-3 px-4">ab 500&thinsp;&euro;</td></tr>
                <tr className="border-t bg-gray-50"><td className="py-3 px-4 font-medium text-gray-900">Kranf&uuml;hrer</td><td className="py-3 px-4 text-green-600">Nicht n&ouml;tig</td><td className="py-3 px-4">Pflicht (inklusive)</td></tr>
                <tr className="border-t"><td className="py-3 px-4 font-medium text-gray-900">Hakenh&ouml;he</td><td className="py-3 px-4">bis 30&thinsp;m</td><td className="py-3 px-4">bis 80&thinsp;m</td></tr>
                <tr className="border-t bg-gray-50"><td className="py-3 px-4 font-medium text-gray-900">Tragkraft</td><td className="py-3 px-4">bis 2&thinsp;t</td><td className="py-3 px-4">10&ndash;500&thinsp;t</td></tr>
                <tr className="border-t"><td className="py-3 px-4 font-medium text-gray-900">Mietdauer</td><td className="py-3 px-4 text-green-600">Tage bis Wochen</td><td className="py-3 px-4">Stundenweise</td></tr>
                <tr className="border-t bg-gray-50"><td className="py-3 px-4 font-medium text-gray-900">Ideal f&uuml;r Dach</td><td className="py-3 px-4 text-green-600">Ja</td><td className="py-3 px-4">Nur bei Schwerlast</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-[13px] text-gray-500 mt-3">
            <strong className="text-gray-900">Fazit:</strong> F&uuml;r typische Dacharbeiten (Ziegel, Solar, D&auml;mmung)
            ist der Dachdeckerkran <strong className="text-gray-900">60&ndash;70&thinsp;% g&uuml;nstiger</strong> als ein Autokran.
          </p>
        </section>

        {/* F&uuml;hrerschein */}
        <section id="fuehrerschein" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Brauche ich einen F&uuml;hrerschein f&uuml;r einen Dachdeckerkran?</h2>
          <p className="mb-3">
            <strong className="text-gray-900">Nein.</strong> F&uuml;r die Bedienung eines Dachdeckerkrans ist kein
            Kranf&uuml;hrerschein erforderlich. Eine <strong className="text-gray-900">kurze Einweisung durch den
            Vermieter</strong> (30&ndash;60 Minuten) reicht aus.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 text-[13px]">
            <p className="mb-2"><strong className="text-gray-900">Rechtliche Grundlage:</strong></p>
            <ul className="space-y-1 text-gray-500">
              <li className="flex gap-2"><span className="text-gray-400">&bull;</span> DGUV Vorschrift 52: Einweisung durch den Unternehmer (Vermieter) ausreichend</li>
              <li className="flex gap-2"><span className="text-gray-400">&bull;</span> Mindestalter: 18 Jahre</li>
              <li className="flex gap-2"><span className="text-gray-400">&bull;</span> Bedienung per Funkfernsteuerung &mdash; Sie stehen am Boden</li>
            </ul>
          </div>
          <div className="mt-3">
            <Link href="/ratgeber/kran-mieten-ohne-fuehrerschein" className="text-[13px] text-blue-600 hover:underline">
              Mehr zum Thema: Kran mieten ohne F&uuml;hrerschein &rarr;
            </Link>
          </div>
        </section>

        {/* Anbieter finden */}
        <section id="anbieter" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Dachdeckerkran-Anbieter finden</h2>
          <p className="mb-4">
            Vergleichen Sie Dachdeckerkran-Vermieter in Ihrer Region. Auf KranVergleich.de finden Sie
            {' '}{anbieterCount}+ Anbieter in {staedteCount}+ St&auml;dten.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href="/dachdeckerkran-mieten" className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors">
              <span className="text-[13px] font-medium text-blue-600">Dachdeckerkran mieten &mdash; alle St&auml;dte</span>
            </Link>
            <Link href="/dachdeckerkran-mieten/berlin" className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors">
              <span className="text-[13px] font-medium text-blue-600">Dachdeckerkran mieten Berlin</span>
            </Link>
            <Link href="/dachdeckerkran-mieten/hamburg" className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors">
              <span className="text-[13px] font-medium text-blue-600">Dachdeckerkran mieten Hamburg</span>
            </Link>
            <Link href="/dachdeckerkran-mieten/koeln" className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors">
              <span className="text-[13px] font-medium text-blue-600">Dachdeckerkran mieten K&ouml;ln</span>
            </Link>
          </div>
          <div className="mt-3">
            <Link href="/ratgeber/welchen-kran-brauche-ich" className="text-[13px] text-blue-600 hover:underline">
              Unsicher? Welchen Kran brauche ich? &rarr;
            </Link>
          </div>
        </section>
      </div>

      {/* FAQ */}
      <div id="faq" className="mt-10 scroll-mt-20">
        <FAQSection faqs={faqs} craneTypeName="Dachdeckerkran" />
      </div>

      {/* CTA */}
      <section className="mt-10 bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Dachdeckerkran-Anbieter vergleichen
        </h2>
        <p className="text-[14px] text-gray-500 mb-5 max-w-xl mx-auto">
          Finden Sie den g&uuml;nstigsten Dachdeckerkran in Ihrer N&auml;he. Kostenlos Angebote
          von {anbieterCount}+ Vermietern vergleichen.
        </p>
        <Link
          href="/dachdeckerkran-mieten"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-semibold rounded-md transition-colors"
        >
          Jetzt Dachdeckerkran-Anbieter finden
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
              { '@type': 'ListItem', position: 3, name: 'Dachdeckerkran mieten', item: 'https://kranvergleich.de/ratgeber/dachdeckerkran-mieten' },
            ],
          }),
        }}
      />
    </div>
  )
}
