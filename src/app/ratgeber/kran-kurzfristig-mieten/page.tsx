import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/faq-section'
import { getSiteStats } from '@/lib/queries'
import { BRAND_NAME } from '@/lib/country'

export const revalidate = 86400

export const metadata: Metadata = {
  title: { absolute: 'Kran kurzfristig mieten 2026: heute, am Wochenende, im Notfall' },
  description:
    'Kran kurzfristig mieten: Welcher Kran ist sofort verfügbar, was kosten Eil-, Nacht- und Wochenendeinsätze und wie Sie in 24 Stunden ein Angebot bekommen.',
  alternates: { canonical: '/ratgeber/kran-kurzfristig-mieten' },
}

const faqs = [
  {
    question: 'Kann ich heute noch einen Kran mieten?',
    answer: 'Ein Einsatz am selben Tag ist möglich, wenn ein Anbieter in der Nähe einen passenden Kran samt Fahrer frei hat. Sicher planbar ist ein Einsatz innerhalb von 24 bis 48 Stunden. Fragen Sie am besten gleich mehrere Anbieter parallel an.',
  },
  {
    question: 'Was kostet ein Kran am Wochenende oder nachts?',
    answer: 'Die Tagesmiete bleibt gleich. Hinzu kommen Nacht-, Wochenend- oder Feiertagszuschläge sowie meist eine Mindestmiete von vier Stunden. Die genaue Höhe legt der Anbieter fest.',
  },
  {
    question: 'Welcher Kran ist am schnellsten verfügbar?',
    answer: 'Der Autokran, er fährt auf eigener Achse an und ist in 15 bis 30 Minuten einsatzbereit. Der Minikran und der Anhängerkran sind ebenfalls schnell, weil kein Kranführer eingeplant werden muss.',
  },
  {
    question: 'Brauche ich für einen kurzfristigen Einsatz eine Genehmigung?',
    answer: 'Auf Privatgelände brauchen Sie meist keine. Steht der Kran auf öffentlichem Grund, brauchen Sie eine Sondernutzungserlaubnis, und die erfordert Vorlauf. Das macht spontane Einsätze auf der Straße schwierig.',
  },
]

export default async function KranKurzfristigPage() {
  const { anbieterCount } = await getSiteStats()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/ratgeber" className="hover:text-gray-600">Ratgeber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Kran kurzfristig mieten</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Kran kurzfristig mieten: Geht das heute noch? Ablauf, Verfügbarkeit &amp; Zuschläge
      </h1>
      <p className="text-[15px] text-gray-500 mb-4 max-w-3xl">
        Wenn der Kran schnell kommen muss: Welcher Krantyp ist kurzfristig verfügbar, was kostet
        ein Einsatz am Wochenende oder nachts, und wie bekommen Sie in 24 Stunden ein Angebot?
      </p>
      <p className="text-[11px] text-gray-300 mb-6">Stand: Juni 2026</p>

      {/* Kurzantwort (AEO) */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-8">
        <p className="text-[13px] font-medium text-gray-900 mb-1">Kurzantwort</p>
        <p className="text-[14px] text-gray-600 leading-relaxed">
          Einen Kran kurzfristig zu mieten heißt in der Praxis meist: ein Autokran innerhalb von 24
          bis 48 Stunden. Am selben Tag klappt es, wenn ein Anbieter in der Nähe freie Kapazität
          hat. Schnell verfügbar ist nur, was ohne Genehmigung und ohne lange Montage auskommt,
          also Autokran, Minikran oder Anhängerkran. Ein Baukran fällt aus, denn er braucht Wochen
          für Genehmigung und Aufbau.
        </p>
      </div>

      {/* TOC */}
      <nav className="mb-8 border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-medium text-gray-900 mb-2">Inhalt</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          <li><a href="#bedeutung" className="text-[13px] text-blue-600 hover:underline">Was heißt „kurzfristig"?</a></li>
          <li><a href="#verfuegbar" className="text-[13px] text-blue-600 hover:underline">Welcher Kran ist verfügbar?</a></li>
          <li><a href="#kosten" className="text-[13px] text-blue-600 hover:underline">Was kostet es?</a></li>
          <li><a href="#schneller" className="text-[13px] text-blue-600 hover:underline">So geht es schneller</a></li>
          <li><a href="#faq" className="text-[13px] text-blue-600 hover:underline">Häufige Fragen</a></li>
        </ul>
      </nav>

      <div className="space-y-10 text-[14px] text-gray-600 leading-relaxed">

        <section id="bedeutung" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Was bedeutet „kurzfristig" beim Kranmieten?</h2>
          <p className="mb-3">
            „Kurzfristig" heißt nicht für jeden dasselbe. Für den einen ist es der Einsatz am selben
            Tag, für den anderen das Wochenende oder die kommenden zwei, drei Tage.
          </p>
          <p>
            Realistisch sind drei Stufen. Der Einsatz am selben Tag ist machbar, aber die Ausnahme:
            Es braucht einen Anbieter in der Nähe, der gerade einen passenden Kran samt Fahrer frei
            hat. Bei einem Autokran ist ein Einsatz innerhalb von 24 bis 48 Stunden der Normalfall.
            Hier finden die meisten Anbieter eine Lücke. Alles, was Genehmigung, Schwertransport oder
            Montage braucht, lässt sich dagegen nicht kurzfristig stemmen.
          </p>
        </section>

        <section id="verfuegbar" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Welcher Kran ist kurzfristig verfügbar, welcher nicht?</h2>
          <p className="mb-3">Entscheidend ist, wie schnell der Kran einsatzbereit ist.</p>
          <p className="mb-3">
            Schnell geht der Autokran: Er fährt auf eigener Achse an und ist in 15 bis 30 Minuten
            aufgebaut. Für kurzfristige Hebearbeiten im Freien ist er die erste Wahl. Der Minikran
            und der Anhängerkran sind ebenfalls schnell verfügbar, weil Sie diese nach kurzer
            Einweisung selbst bedienen dürfen und kein Kranführer eingeplant werden muss.
          </p>
          <p>
            Nicht kurzfristig geht der Baukran (Turmdrehkran): Genehmigung, Fundament und Montage
            brauchen Wochen. Träger sind auch große Mobilkrane ab etwa 100 Tonnen, weil sie einen
            Schwertransport und mehrere Stunden Aufbau erfordern.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/autokran-mieten" className="text-[13px] text-blue-600 hover:underline">Autokran-Anbieter vergleichen</Link>
            <Link href="/minikran-mieten" className="text-[13px] text-blue-600 hover:underline">Minikran-Anbieter vergleichen</Link>
          </div>
        </section>

        <section id="kosten" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Was kostet ein kurzfristiger Kraneinsatz?</h2>
          <p className="mb-3">
            Der Kran selbst kostet kurzfristig nicht mehr als geplant. Die Tagesmiete für einen
            Autokran beginnt bei 500 Euro. Teurer wird es durch Zuschläge, wenn der Einsatz
            außerhalb der regulären Zeiten liegt.
          </p>
          <p>
            Üblich sind Nacht-, Wochenend- und Feiertagszuschläge sowie ein Eilzuschlag bei sehr
            kurzem Vorlauf. Dazu kommt fast immer eine Mindestmiete. Beim 30-Tonnen-Autokran sind
            das in der Regel vier Stunden. Wie hoch die Zuschläge ausfallen, legt jeder Anbieter
            selbst fest. Erfragen Sie den konkreten Aufschlag bei der Anfrage.
          </p>
        </section>

        <section id="schneller" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">So bekommen Sie schneller einen Kran</h2>
          <p className="mb-3">
            Je vollständiger Ihre Angaben sind, desto schneller kommt das Angebot. Halten Sie bereit:
          </p>
          <ul className="space-y-2 text-[13px] mb-3">
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">&bull;</span> <strong className="text-gray-900">Einsatzort</strong> (Adresse oder PLZ) und Wunschtermin</li>
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">&bull;</span> <strong className="text-gray-900">Gewicht</strong> der Last und <strong className="text-gray-900">Hubhöhe</strong></li>
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">&bull;</span> <strong className="text-gray-900">Zufahrt</strong>: Wie nah kommt der Kran an die Last, und gibt es Hindernisse?</li>
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">&bull;</span> ob ein <strong className="text-gray-900">Kranführer</strong> gebraucht wird</li>
          </ul>
          <p>
            Den größten Zeitgewinn bringt es, mehrere Anbieter gleichzeitig anzufragen statt
            nacheinander zu telefonieren. Über {BRAND_NAME} erreichen Sie mit einer Anfrage mehrere
            Vermieter in Ihrer Nähe und sehen schnell, wer kurzfristig frei hat.
          </p>
          <p className="mt-3 text-[13px] text-gray-500">
            Steht der Kran auf öffentlichem Grund, planen Sie zusätzlich Zeit für die{' '}
            <Link href="/ratgeber/kran-aufstellen-genehmigung" className="text-blue-600 hover:underline">Sondernutzungserlaubnis</Link> ein.
          </p>
          <div className="mt-4">
            <Link href="/kostenrechner" className="text-[13px] text-blue-600 hover:underline">
              Mit dem Kostenrechner Anbieter in Ihrer Nähe finden
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
          Kurzfristig einen Kran brauchen?
        </h2>
        <p className="text-[14px] text-gray-500 mb-5 max-w-xl mx-auto">
          Fragen Sie mit einer Anfrage mehrere der {anbieterCount}+ Kranvermieter auf {BRAND_NAME}
          gleichzeitig an und sehen Sie schnell, wer in Ihrer Nähe frei hat.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-semibold rounded-md transition-colors"
        >
          Jetzt {anbieterCount}+ Anbieter vergleichen
        </Link>
        <p className="text-[12px] text-gray-400 mt-3">Kostenlos &amp; unverbindlich.</p>
      </section>
    </div>
  )
}
