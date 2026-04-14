import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/faq-section'
import { getSiteStats } from '@/lib/queries'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Kran mieten als Privatperson \u2014 Was ist m\u00F6glich? (2026)',
  description:
    'Kran mieten als Privatperson? Ja \u2014 Minikran ab 250\u20AC/Tag und Anh\u00E4ngerkran ab 150\u20AC/Tag ohne F\u00FChrerschein. Was Sie wissen m\u00FCssen: Kosten, Versicherung, Tipps.',
  alternates: { canonical: '/ratgeber/kran-mieten-privatperson' },
  openGraph: {
    title: 'Kran mieten als Privatperson \u2014 Was ist m\u00F6glich? (2026)',
    description:
      'Kran mieten als Privatperson? Ja \u2014 Minikran ab 250\u20AC/Tag und Anh\u00E4ngerkran ab 150\u20AC/Tag ohne F\u00FChrerschein.',
    type: 'website',
    url: '/ratgeber/kran-mieten-privatperson',
  },
}

const faqs = [
  {
    question: 'Kann ich als Privatperson einen Kran mieten?',
    answer:
      'Ja. Viele Kranvermieter vermieten auch an Privatpersonen. Am besten geeignet sind Minikrane (ab 250\u20AC/Tag), Anh\u00E4ngerkrane (ab 150\u20AC/Tag) und Dachdeckerkrane (ab 200\u20AC/Tag) \u2014 alle ohne Kranf\u00FChrerschein bedienbar.',
  },
  {
    question: 'Brauche ich als Privatperson eine besondere Versicherung?',
    answer:
      'Ja, Sie brauchen mindestens eine Haftpflichtversicherung f\u00FCr den Kraneinsatz. Viele Vermieter bieten zus\u00E4tzlich eine Maschinenbruchversicherung an (10\u201315\u20AC/Tag). Ohne Versicherung haften Sie pers\u00F6nlich f\u00FCr Sch\u00E4den am Kran und an Dritten.',
  },
  {
    question: 'Welcher Kran eignet sich f\u00FCr einen Pool-Einbau?',
    answer:
      'F\u00FCr einen Pool (1\u20133\u202Ft) eignet sich ein Minikran (ab 250\u20AC/Tag) oder ein Autokran (ab 500\u20AC/Tag inkl. Kranf\u00FChrer). Der Minikran ist g\u00FCnstiger und passt durch enge Gartenzufahrten. Den Autokran buchen Sie, wenn der Pool \u00FCber das Haus gehoben werden muss.',
  },
  {
    question: 'Was kostet ein Kran f\u00FCr einen Tag als Privatperson?',
    answer:
      'Die g\u00FCnstigste Option ist der Anh\u00E4ngerkran ab 150\u20AC/Tag. Ein Minikran kostet ab 250\u20AC/Tag, ein Dachdeckerkran ab 200\u20AC/Tag. Alle drei k\u00F6nnen Sie selbst bedienen. Ein Autokran mit Kranf\u00FChrer kostet ab 500\u20AC/Tag \u2014 daf\u00FCr m\u00FCssen Sie sich um nichts k\u00FCmmern.',
  },
]

export default async function KranMietenPrivatpersonPage() {
  const { anbieterCount, staedteCount } = await getSiteStats()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/ratgeber" className="hover:text-gray-600">Ratgeber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Kran mieten als Privatperson</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Kran mieten als Privatperson &mdash; Was ist m&ouml;glich? (2026)
      </h1>
      <p className="text-[15px] text-gray-500 mb-4 max-w-3xl">
        Ja, Sie k&ouml;nnen als Privatperson einen Kran mieten. Am besten geeignet sind
        der <strong className="text-gray-900">Minikran ab 250&euro;/Tag</strong> und der
        {' '}<strong className="text-gray-900">Anh&auml;ngerkran ab 150&euro;/Tag</strong> &mdash;
        beide ohne Kranf&uuml;hrerschein bedienbar. F&uuml;r schwere Lasten buchen Sie einen
        Autokran mit Kranf&uuml;hrer ab 500&euro;/Tag.
      </p>
      <p className="text-[11px] text-gray-300 mb-8">Stand: April 2026</p>

      {/* Table of contents */}
      <nav className="mb-8 border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-medium text-gray-900 mb-2">Inhalt</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          <li><a href="#welche-krane" className="text-[13px] text-blue-600 hover:underline">Welche Krane kann ich als Privatperson mieten?</a></li>
          <li><a href="#kosten" className="text-[13px] text-blue-600 hover:underline">Was kostet ein Kran f&uuml;r Privatpersonen?</a></li>
          <li><a href="#fuehrerschein" className="text-[13px] text-blue-600 hover:underline">Brauche ich einen F&uuml;hrerschein?</a></li>
          <li><a href="#versicherung" className="text-[13px] text-blue-600 hover:underline">Welche Versicherung brauche ich?</a></li>
          <li><a href="#projekte" className="text-[13px] text-blue-600 hover:underline">Typische Projekte f&uuml;r Privatpersonen</a></li>
          <li><a href="#autokran-privat" className="text-[13px] text-blue-600 hover:underline">Autokran f&uuml;r Privatpersonen</a></li>
          <li><a href="#anbieter" className="text-[13px] text-blue-600 hover:underline">Anbieter finden</a></li>
          <li><a href="#faq" className="text-[13px] text-blue-600 hover:underline">H&auml;ufige Fragen</a></li>
        </ul>
      </nav>

      <div className="space-y-10 text-[14px] text-gray-600 leading-relaxed">

        {/* Welche Krane */}
        <section id="welche-krane" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Welche Krane kann ich als Privatperson mieten?</h2>
          <p className="mb-4">
            Nicht jeder Kran ist f&uuml;r Privatpersonen geeignet. Entscheidend ist, ob Sie den Kran
            <strong className="text-gray-900"> selbst bedienen</strong> k&ouml;nnen oder einen Kranf&uuml;hrer
            ben&ouml;tigen:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="border border-gray-200 rounded-lg p-4">
              <Link href="/minikran-mieten" className="font-medium text-gray-900 hover:text-blue-600">Minikran (Spinnenkran)</Link>
              <p className="text-[13px] text-gray-500 mt-1">Ab 250&euro;/Tag. Kein F&uuml;hrerschein n&ouml;tig. Tragkraft bis 3&thinsp;t. Passt durch Gartentore und enge Zufahrten.</p>
              <p className="text-[12px] text-green-600 mt-1 font-medium">Empfehlung f&uuml;r Privatpersonen</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <Link href="/anhaengerkran-mieten" className="font-medium text-gray-900 hover:text-blue-600">Anh&auml;ngerkran</Link>
              <p className="text-[13px] text-gray-500 mt-1">Ab 150&euro;/Tag. Kein F&uuml;hrerschein n&ouml;tig. Tragkraft bis 1,5&thinsp;t. Mit PKW-Anh&auml;ngerkupplung transportierbar.</p>
              <p className="text-[12px] text-green-600 mt-1 font-medium">G&uuml;nstigste Option</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <Link href="/dachdeckerkran-mieten" className="font-medium text-gray-900 hover:text-blue-600">Dachdeckerkran</Link>
              <p className="text-[13px] text-gray-500 mt-1">Ab 200&euro;/Tag. Kein F&uuml;hrerschein n&ouml;tig. Ideal f&uuml;r Dacharbeiten und Solaranlagen.</p>
              <p className="text-[12px] text-green-600 mt-1 font-medium">Ideal f&uuml;r Dachprojekte</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <Link href="/autokran-mieten" className="font-medium text-gray-900 hover:text-blue-600">Autokran (mit Kranf&uuml;hrer)</Link>
              <p className="text-[13px] text-gray-500 mt-1">Ab 500&euro;/Tag inkl. Kranf&uuml;hrer. F&uuml;r schwere Lasten. Sie m&uuml;ssen sich um nichts k&uuml;mmern.</p>
              <p className="text-[12px] text-blue-600 mt-1 font-medium">Full-Service-Option</p>
            </div>
          </div>
        </section>

        {/* Kosten */}
        <section id="kosten" className="scroll-mt-20 border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Was kostet ein Kran f&uuml;r Privatpersonen?</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-3 text-left font-medium text-gray-900">Krantyp</th>
                  <th className="py-2 px-3 text-left font-medium text-gray-900">Tagespreis</th>
                  <th className="py-2 px-3 text-left font-medium text-gray-900">F&uuml;hrerschein</th>
                  <th className="py-2 px-3 text-left font-medium text-gray-900">Tragkraft</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                <tr className="border-b">
                  <td className="py-2 px-3">Anh&auml;ngerkran</td>
                  <td className="py-2 px-3 font-medium text-gray-900">150&ndash;350&thinsp;&euro;</td>
                  <td className="py-2 px-3 text-green-600 font-medium">Nein</td>
                  <td className="py-2 px-3">bis 1,5&thinsp;t</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Dachdeckerkran</td>
                  <td className="py-2 px-3 font-medium text-gray-900">200&ndash;450&thinsp;&euro;</td>
                  <td className="py-2 px-3 text-green-600 font-medium">Nein</td>
                  <td className="py-2 px-3">bis 2&thinsp;t</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Minikran</td>
                  <td className="py-2 px-3 font-medium text-gray-900">250&ndash;500&thinsp;&euro;</td>
                  <td className="py-2 px-3 text-green-600 font-medium">Nein</td>
                  <td className="py-2 px-3">bis 3&thinsp;t</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Autokran</td>
                  <td className="py-2 px-3 font-medium text-gray-900">500&ndash;2.000&thinsp;&euro;</td>
                  <td className="py-2 px-3">Kranf&uuml;hrer inkl.</td>
                  <td className="py-2 px-3">10&ndash;500&thinsp;t</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-3">
            Alle Preise netto. Zzgl. Lieferung (oft inklusive), Kaution (500&ndash;2.000&euro;) und
            ggf. Versicherung.
          </p>
        </section>

        {/* F&uuml;hrerschein */}
        <section id="fuehrerschein" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Brauche ich einen F&uuml;hrerschein?</h2>
          <p className="mb-3">
            F&uuml;r die drei beliebtesten Krantypen f&uuml;r Privatpersonen ist
            <strong className="text-gray-900"> kein Kranf&uuml;hrerschein</strong> erforderlich:
          </p>
          <ul className="space-y-2 text-[13px] mb-4">
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> <strong className="text-gray-900">Minikran:</strong> Einweisung ca. 30 Min. durch den Vermieter reicht aus</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> <strong className="text-gray-900">Anh&auml;ngerkran:</strong> Einweisung ca. 15&ndash;30 Min. durch den Vermieter</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> <strong className="text-gray-900">Dachdeckerkran:</strong> Einweisung ca. 30&ndash;60 Min., Bedienung per Funkfernsteuerung</li>
          </ul>
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
            <p className="text-[13px] text-amber-800">
              <strong>Wichtig:</strong> F&uuml;r Autokrane und Mobilkrane ist ein Kranf&uuml;hrerschein
              gesetzlich vorgeschrieben (DGUV Vorschrift 52). Diese Krane werden daher immer mit
              Kranf&uuml;hrer vermietet &mdash; Sie brauchen sich nicht darum zu k&uuml;mmern.
            </p>
          </div>
          <div className="mt-3">
            <Link href="/ratgeber/kran-mieten-ohne-fuehrerschein" className="text-[13px] text-blue-600 hover:underline">
              Mehr zum Thema: Kran mieten ohne F&uuml;hrerschein &rarr;
            </Link>
          </div>
        </section>

        {/* Versicherung */}
        <section id="versicherung" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Welche Versicherung brauche ich?</h2>
          <p className="mb-4">
            Als Privatperson sollten Sie beim Kran mieten auf drei Versicherungsaspekte achten:
          </p>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Haftpflichtversicherung</p>
              <p className="text-[13px] text-gray-500">Deckt Sch&auml;den an Dritten (Nachbarn, Passanten, Geb&auml;ude). Pr&uuml;fen Sie, ob Ihre private Haftpflicht Kranarbeiten einschlie&szlig;t &mdash; meist nicht. Der Vermieter bietet oft eine Zusatzversicherung an.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Maschinenbruchversicherung</p>
              <p className="text-[13px] text-gray-500">Deckt Sch&auml;den am Kran selbst (Bedienungsfehler, Umkippen). Kosten: 10&ndash;15&euro;/Tag. Dringend empfohlen &mdash; ein Minikran kostet 50.000&ndash;150.000&euro;.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Kaution</p>
              <p className="text-[13px] text-gray-500">Die meisten Vermieter verlangen eine Kaution von 500&ndash;2.000&euro; (wird nach Einsatz zur&uuml;ckgezahlt). Bei Autokranen mit Kranf&uuml;hrer entf&auml;llt die Kaution meist.</p>
            </div>
          </div>
        </section>

        {/* Typische Projekte */}
        <section id="projekte" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Typische Projekte f&uuml;r Privatpersonen</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Pool in den Garten setzen</p>
              <p className="text-[13px] text-gray-500">Minikran oder Autokran. Pool-Gewicht: 1&ndash;3&thinsp;t. Kosten: 250&ndash;600&euro; f&uuml;r einen Tag.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Baumf&auml;llung / Baumschnitt</p>
              <p className="text-[13px] text-gray-500">Minikran mit Greifer. Ideal f&uuml;r gro&szlig;e B&auml;ume in engen G&auml;rten. Kosten: 250&ndash;400&euro;/Tag.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Dachsanierung / Solaranlage</p>
              <p className="text-[13px] text-gray-500">Dachdeckerkran. Material aufs Dach heben. Kosten: 200&ndash;450&euro;/Tag, mehrere Tage m&ouml;glich.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Klimaanlage aufs Dach</p>
              <p className="text-[13px] text-gray-500">Autokran (1&ndash;2 Std.) oder Minikran. Au&szlig;enger&auml;t: 50&ndash;200&thinsp;kg. Kosten: ab 250&euro;.</p>
            </div>
          </div>
        </section>

        {/* Autokran f&uuml;r Privatpersonen */}
        <section id="autokran-privat" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Autokran f&uuml;r Privatpersonen &mdash; mit Kranf&uuml;hrer buchen</h2>
          <p className="mb-3">
            Wenn Ihr Projekt schwere Lasten erfordert oder Sie sich nicht selbst um die Bedienung
            k&uuml;mmern m&ouml;chten, ist der <strong className="text-gray-900">Autokran mit Kranf&uuml;hrer</strong> die
            sicherste Option:
          </p>
          <ul className="space-y-2 text-[13px]">
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Kranf&uuml;hrer &uuml;bernimmt Aufbau, Bedienung und Abbau</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Keine Einweisung oder Erfahrung n&ouml;tig</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Versicherung &uuml;ber den Vermieter</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Schnell: Aufbau in 15&ndash;30 Min., Einsatz in wenigen Stunden erledigt</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Preis ab 500&euro;/Tag (alles inklusive)</li>
          </ul>
          <p className="text-[13px] text-gray-500 mt-3">
            <strong className="text-gray-900">Tipp:</strong> F&uuml;r einen einzelnen Hebevorgang
            (z.&thinsp;B. Pool, Whirlpool, Fertiggarage) ist der Autokran oft g&uuml;nstiger als gedacht &mdash;
            viele Eins&auml;tze sind in 2&ndash;3 Stunden erledigt.
          </p>
        </section>

        {/* Anbieter finden */}
        <section id="anbieter" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Anbieter finden</h2>
          <p className="mb-4">
            Vergleichen Sie Kranvermieter in Ihrer Region, die auch an Privatpersonen vermieten.
            {' '}{anbieterCount}+ Anbieter in {staedteCount}+ St&auml;dten auf KranVergleich.de.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href="/minikran-mieten" className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors">
              <span className="text-[13px] font-medium text-blue-600">Minikran mieten &mdash; ab 250&euro;/Tag</span>
            </Link>
            <Link href="/anhaengerkran-mieten" className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors">
              <span className="text-[13px] font-medium text-blue-600">Anh&auml;ngerkran mieten &mdash; ab 150&euro;/Tag</span>
            </Link>
            <Link href="/dachdeckerkran-mieten" className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors">
              <span className="text-[13px] font-medium text-blue-600">Dachdeckerkran mieten &mdash; ab 200&euro;/Tag</span>
            </Link>
            <Link href="/kostenrechner" className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors">
              <span className="text-[13px] font-medium text-blue-600">Kostenrechner &mdash; Preis berechnen</span>
            </Link>
          </div>
        </section>
      </div>

      {/* FAQ */}
      <div id="faq" className="mt-10 scroll-mt-20">
        <FAQSection faqs={faqs} craneTypeName="Kran" />
      </div>

      {/* CTA */}
      <section className="mt-10 bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Kran f&uuml;r Ihr Privatprojekt finden
        </h2>
        <p className="text-[14px] text-gray-500 mb-5 max-w-xl mx-auto">
          Viele der {anbieterCount}+ Kranvermieter auf KranVergleich.de vermieten auch an
          Privatpersonen. Vergleichen Sie kostenlos Angebote in Ihrer Region.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-semibold rounded-md transition-colors"
        >
          Jetzt {anbieterCount}+ Anbieter vergleichen
        </Link>
        <p className="text-[12px] text-gray-400 mt-3">Kostenlos &amp; unverbindlich. Auch f&uuml;r Privatpersonen.</p>
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
              { '@type': 'ListItem', position: 3, name: 'Kran mieten als Privatperson', item: 'https://kranvergleich.de/ratgeber/kran-mieten-privatperson' },
            ],
          }),
        }}
      />
    </div>
  )
}
