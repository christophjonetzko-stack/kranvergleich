import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/faq-section'
import { getSiteStats } from '@/lib/queries'
import { COUNTRY_LABEL } from '@/lib/country'
import { alternatesFor } from '@/lib/alternates'
import { OG_IMAGE } from '@/lib/og-image'

export const revalidate = 86400

export const metadata: Metadata = {
  title: { absolute: 'Was beeinflusst den Kranpreis? Die 5 Preistreiber aus der Praxis' },
  description:
    'Warum kostet derselbe Kran mal wenige Hundert Euro und mal ein Vielfaches? Die 5 echten Preistreiber beim Kranmieten: Anfahrt, Zufahrt, Hub-Geometrie, Ballast und Straßensperrung.',
  alternates: alternatesFor('/ratgeber/kranpreise-praxis'),
  openGraph: {
    title: 'Was beeinflusst den Kranpreis? Die 5 Preistreiber',
    description:
      'Was einen Kraneinsatz wirklich teuer oder günstig macht. Fünf Faktoren aus der Praxis, statt Pauschalpreis.',
    type: 'article',
    url: '/ratgeber/kranpreise-praxis',
    images: [OG_IMAGE],
  },
}

const faqs = [
  {
    question: 'Warum gibt es keinen Pauschalpreis für einen Kran?',
    answer:
      'Weil der Kran selbst oft der kleinere Posten ist. Den Preis bestimmen fünf Faktoren: die Anfahrt zum Einsatzort, die Zufahrt und nötige Genehmigungen, die Hub-Geometrie (Gewicht, Höhe, Ausladung, Störkante), zusätzlicher Ballast und Spezialausrüstung sowie eine mögliche Straßensperrung. Erst wenn diese Punkte feststehen, nennt ein Anbieter eine belastbare Zahl.',
  },
  {
    question: 'Wie stark beeinflusst die Anfahrt den Kranpreis?',
    answer:
      'Jeder Kran muss zur Baustelle und zurück, das steckt als Fahrzeit, Kraftstoff und Arbeitszeit im Angebot, bevor der erste Hub passiert. Ein Betrieb aus der Nachbarstadt ist deshalb fast immer günstiger als einer, der über zwei Bundesländer anreist. Bei sehr großen Geräten relativiert sich das, weil diese ohnehin überregional fahren.',
  },
  {
    question: 'Warum kann eine Straßensperrung teurer sein als der Kran selbst?',
    answer:
      'Steht der Kran auf der Straße oder schwenkt die Last über den Verkehr, muss der Bereich gesichert werden, mit Absperrung, Beschilderung und teils einer behördlich angeordneten Vollsperrung. Diese Sperrung kann das Zwei- bis Dreifache des reinen Kraneinsatzes kosten und ist der Posten, den Bauherren am häufigsten unterschätzen.',
  },
  {
    question: 'Warum ist die Ausladung wichtiger als das reine Gewicht?',
    answer:
      'Je weiter der Kran horizontal über seinen Standplatz hinausreichen muss, desto weniger kann er tragen. An der Spitze seines Auslegers hebt selbst ein großer Kran nur noch einen Bruchteil seiner Maximallast. Steht zusätzlich eine Störkante im Weg, etwa ein Dachvorsprung, fällt der Kran eine Nummer größer aus, und das schlägt auf den Preis durch.',
  },
  {
    question: 'Was sollte ich bei der Anfrage angeben, um schnell einen belastbaren Preis zu bekommen?',
    answer:
      'Nennen Sie Einsatzort, Last (Gewicht), die Höhe, auf die gehoben werden soll, und die Ausladung sowie die Lage vor Ort, also Zufahrt und eine mögliche Straßensperrung. Mit diesen Angaben gibt Ihnen ein Anbieter rasch eine belastbare Indikation, statt eines Pauschalpreises, der ohnehin nicht passt.',
  },
]

export default async function KranpreisePraxisPage() {
  const { anbieterCount } = await getSiteStats()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/ratgeber" className="hover:text-gray-600">Ratgeber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Was beeinflusst den Kranpreis?</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Was beeinflusst den Kranpreis? Die 5 Preistreiber aus der Praxis
      </h1>

      {/* AEO Kurzantwort, price-free by design. */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-8">
        <p className="text-[13px] font-semibold text-gray-900 mb-2">Kurz erklärt:</p>
        <p className="text-[14px] text-gray-700 leading-relaxed">
          Den Preis eines Kraneinsatzes macht selten der Kran allein. Entscheidend sind fünf Faktoren:
          die <strong className="text-gray-900">Anfahrt</strong>, die <strong className="text-gray-900">Zufahrt und Genehmigungen</strong>,
          die <strong className="text-gray-900">Hub-Geometrie</strong> aus Gewicht, Höhe, Ausladung und Störkante,
          der nötige <strong className="text-gray-900">Ballast samt Spezialausrüstung</strong> und eine mögliche
          <strong className="text-gray-900"> Straßensperrung</strong>. Gerade die Sperrung kann das Zwei- bis
          Dreifache des eigentlichen Kraneinsatzes kosten. Eine seriöse Zahl nennt ein Anbieter daher erst,
          wenn diese fünf Punkte feststehen.
        </p>
      </div>

      <div className="space-y-10 text-[14px] text-gray-600 leading-relaxed">

        <section>
          <p className="mb-4">
            Warum kostet derselbe Kran an einem Tag wenige Hundert Euro und am nächsten ein Vielfaches?
            Weil der Kran selbst oft der kleinere Posten ist. Den Preis macht, was drumherum passiert.
            Wer die folgenden fünf Faktoren kennt, kann eine Hausnummer besser einordnen und bekommt vom
            Anbieter schneller eine belastbare Zahl (Stand 2026).
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mb-2 mt-6">1. Anfahrt und Entfernung</h2>
          <p className="mb-4">
            Jeder Kran muss zur Baustelle und wieder zurück. Je weiter der Weg, desto mehr Fahrzeit,
            Kraftstoff und Arbeitszeit stecken im Angebot, bevor der erste Hub passiert. Ein Betrieb aus
            der Nachbarstadt ist deshalb fast immer günstiger als einer, der über zwei Bundesländer anreist.
            Bei sehr großen Geräten relativiert sich das, weil diese ohnehin überregional fahren.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mb-2 mt-6">2. Zufahrt und Genehmigungen</h2>
          <p className="mb-4">
            Bevor gehoben wird, muss der Kran an seinen Standplatz kommen. Eine breite, befestigte Zufahrt
            ist der Idealfall. Geht es durch einen engen Innenhof, über weichen Boden oder dicht an Bebauung
            vorbei, wird es aufwendiger, manchmal braucht es ein kleineres Gerät oder Lastverteilplatten.
            Hinzu kommen Genehmigungen. Wer öffentlichen Grund nutzt oder eine Fläche absperrt, braucht
            häufig eine Erlaubnis der Stadt, die Zeit und Gebühren kostet.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mb-2 mt-6">3. Hub-Geometrie: Gewicht, Höhe, Ausladung, Störkante</h2>
          <p className="mb-4">
            Hier entscheidet sich, welche Krangröße Sie überhaupt brauchen. Drei Werte zählen: das Gewicht
            der Last, die Höhe, auf die sie soll, und die Ausladung, also wie weit der Kran horizontal über
            seinen Standplatz hinausreichen muss. Je größer die Ausladung, desto weniger kann ein Kran tragen;
            an der Spitze seines Auslegers hebt selbst ein großer Kran nur noch einen Bruchteil seiner
            Maximallast. Steht eine Störkante im Weg, etwa ein Dachvorsprung oder eine Leitung, muss der Kran
            höher oder weiter ausladen und fällt eine Nummer größer aus.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mb-2 mt-6">4. Zusatzballast und Spezialausrüstung</h2>
          <p className="mb-4">
            Schwere oder weite Hübe verlangen mehr Gegengewicht. Zusätzlicher Ballast muss oft separat
            antransportiert werden, teils mit einem eigenen Lkw. Dazu kommt Sonderausrüstung je nach Aufgabe:
            ein Personenkorb, wenn Menschen mit nach oben sollen, Spreizen oder Traversen für sperrige Lasten.
            Jedes dieser Teile ist ein eigener Posten auf der Rechnung.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 mb-2 mt-6">5. Straßensperrung und Verkehrssicherung</h2>
          <p className="mb-4">
            Diesen Faktor unterschätzen Bauherren am häufigsten. Steht der Kran auf der Straße oder schwenkt
            die Last über den Verkehr, muss der Bereich gesichert werden, mit Absperrung, Beschilderung und
            teils einer behördlich angeordneten Vollsperrung. Diese Sperrung kann das Zwei- bis Dreifache des
            reinen Kraneinsatzes kosten. Wer früh klärt, ob der Kran auf privatem Grund oder im öffentlichen
            Raum steht, vermeidet hier die größte Überraschung.
          </p>
        </section>

        <section className="border border-gray-200 rounded-lg p-5 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Was das für Ihre Anfrage bedeutet</h2>
          <p>
            Eine seriöse Zahl kommt nicht aus einer Tabelle, sondern erst, wenn diese fünf Punkte auf dem
            Tisch liegen. Nennen Sie bei der Anfrage Einsatzort, Last, Höhe und Ausladung sowie die Lage vor
            Ort, also Zufahrt und eine mögliche Sperrung. Dann gibt Ihnen ein Anbieter rasch eine belastbare
            Indikation, statt eines Pauschalpreises, der ohnehin nicht passt. Wenn Sie zur ersten Orientierung
            dennoch Richtwerte suchen, finden Sie diese in unserer Übersicht{' '}
            <Link href="/ratgeber/was-kostet-ein-kran" className="text-blue-600 hover:underline">
              „Was kostet ein Kran?“
            </Link>.
          </p>
        </section>

      </div>

      {/* Anbieter finden CTA */}
      <section className="mt-10 bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Belastbares Angebot für Ihren Einsatz?
        </h2>
        <p className="text-[14px] text-gray-500 mb-5 max-w-xl mx-auto">
          Beschreiben Sie Ihren Hub und vergleichen Sie {anbieterCount}+ Kranvermieter in {COUNTRY_LABEL}.
          Sie erhalten passende Angebote von Betrieben in Ihrer Nähe, kostenlos und unverbindlich.
        </p>
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
          <Link href="/ratgeber/was-kostet-ein-kran" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Was kostet ein Kran? (Richtwerte)</Link>
          <Link href="/kran-mieten-preise" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Aktuelle Mietpreise aller Krantypen</Link>
          <Link href="/ratgeber/welchen-kran-brauche-ich" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Welchen Kran brauche ich?</Link>
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
              { '@type': 'ListItem', position: 3, name: 'Was beeinflusst den Kranpreis?' },
            ],
          }),
        }}
      />
    </div>
  )
}
