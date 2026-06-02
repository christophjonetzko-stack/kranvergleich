import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/faq-section'
import { InlineSammelanfrageForm } from '@/components/inline-sammelanfrage-form'
import { PageEventTracker } from '@/components/page-event-tracker'
import { getSiteStats } from '@/lib/queries'
import { alternatesFor } from '@/lib/alternates'
import { BASE_URL, BRAND_NAME, COUNTRY_LABEL, DATA_LAST_VERIFIED_ISO } from '@/lib/country'
import { OG_IMAGE } from '@/lib/og-image'

export const revalidate = 86400

export const metadata: Metadata = {
  title: { absolute: 'Minikran mit Glassauger mieten: Kosten & Anbieter 2026' },
  description:
    'Minikran mit Glassauger mieten: Glas, Fenster und Fassaden sicher heben. Richtwert ab 250 €/Tag, über 200 Anbieter im Vergleich. Angebot in 24 h.',
  alternates: alternatesFor('/minikran-mit-glassauger-mieten'),
  openGraph: {
    title: 'Minikran mit Glassauger mieten: Glas und Fenster sicher heben',
    description:
      'Minikran mit Glassauger mieten: Glas, Fenster und Fassaden sicher heben. Richtwert ab 250 €/Tag, über 200 Anbieter im Vergleich. Angebot in 24 h.',
    type: 'website',
    url: '/minikran-mit-glassauger-mieten',
    images: [OG_IMAGE],
  },
}

const glassaugerFAQs = [
  {
    question: 'Was kostet ein Minikran mit Glassauger pro Tag?',
    answer:
      'Ein kleiner Selbstfahrer-Minikran liegt bei 250–500 €/Tag, ein stärkerer Spinnenkran für schwere Scheiben eher bei 650–800 € pro Arbeitstag (oft mit Bediener). Der Glassauger als Zubehör kostet je nach Tragkraft rund 65–130 €/Tag (Klassen 350–600 kg), zzgl. 5–8 % Maschinenbruchversicherung. Dazu kommt der Transport mit 150–300 €.',
  },
  {
    question: 'Was kostet ein Glassauger allein zur Miete?',
    answer:
      'Ein einfacher Vakuumheber für 350–600 kg kostet rund 65–130 €/Tag netto, zzgl. Versicherung. Bei mehrtägiger Miete sinkt der Tagessatz: ab etwa fünf Arbeitstagen oft um 15–20 %, Wochenpauschalen liegen je nach Klasse bei 400–600 €. Große Spezialgeräte (Glassworker bis über 1.000 kg) starten bei etwa 250 €/Tag.',
  },
  {
    question: 'Wie schwer darf die Glasscheibe sein?',
    answer:
      'Das hängt vom Glassauger und von der Tragkraft des Krans am Einbauradius ab. Übliche Sauger tragen 150 bis 600 kg, Spezialgeräte über 1.000 kg. Maßgeblich ist immer das Gewicht der schwersten Einzelscheibe, nicht die Summe aller Elemente.',
  },
  {
    question: 'Welcher Minikran hebt eine 700-kg-Scheibe auf 8 Meter?',
    answer:
      'Ein Spinnenkran der oberen Klasse mit etwa 6 bis 8 t Maximaltragkraft. Kleinere Modelle schaffen 700 kg zwar direkt am Mast, aber nicht mehr auf 8 m Ausladung. Die Tragkraft sinkt mit jedem Meter Reichweite deutlich, deshalb zählt der Wert am tatsächlichen Einbauort.',
  },
  {
    question: 'Passt ein Minikran durch eine normale Tür?',
    answer:
      'Viele Spinnenkrane sind unter 1 m breit und fahren durch Standardtüren. Ihr geringes Eigengewicht erlaubt zudem den Einsatz auf Zwischendecken, wo ein schwerer Autokran den Boden überlasten würde.',
  },
  {
    question: 'Brauche ich für den Minikran einen Kranführerschein?',
    answer:
      'Für den selbst bedienten Minikran genügt eine Einweisung durch den Vermieter. Wünschen Sie einen Bediener, stellt der Anbieter ihn. Bei der Glasmontage über bewohnte Bereiche oder in großer Höhe ist ein erfahrener Bediener die sichere Wahl.',
  },
]

const priceRows: Array<{ leistung: string; richtwert: string }> = [
  { leistung: 'Minikran, Selbstfahrer (kleine Klasse)', richtwert: '250–500 €/Tag' },
  { leistung: 'Stärkerer Spinnenkran (ab ~3,5 t, meist mit Bediener)', richtwert: '650–800 €/Arbeitstag' },
  { leistung: 'Glassauger / Vakuumheber (Zubehör, 350–600 kg)', richtwert: 'ca. 65–130 €/Tag, zzgl. 5–8 % Versicherung' },
  { leistung: 'Großer Glassworker (bis über 1.000 kg)', richtwert: 'ab ~250 €/Tag' },
  { leistung: 'Transport (An- und Abfahrt)', richtwert: '150–300 €' },
  { leistung: 'Wochen- / Monatsmiete (Komplettpaket)', richtwert: '1.000–2.500 € / 3.000–7.000 €' },
]

export default async function MinikranGlassaugerPage() {
  const { anbieterCount } = await getSiteStats()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageEventTracker />

      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Minikran mit Glassauger mieten</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Minikran mit Glassauger mieten: Glas und Fenster sicher heben
      </h1>

      {/* Hero CTA → listing with the AI fit-matcher + glass-capable firms */}
      <Link
        href="/minikran-mieten"
        className="mb-6 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800 sm:w-auto"
      >
        Anbieter mit Glassauger anfragen
      </Link>

      {/* Kurzantwort (AEO) */}
      <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-5 max-w-3xl">
        <p className="text-[15px] text-gray-700 leading-relaxed">
          Ein <strong className="text-gray-900">Minikran mit Glassauger</strong> hebt Glasscheiben, Fenster und
          Fassadenelemente präzise, ohne die empfindliche Oberfläche zu beschädigen. Dank seiner schmalen
          Bauweise passt er durch normale Türen und erreicht über das Gebäude hinweg auch enge Innenhöfe.
          Die Miete beginnt in {COUNTRY_LABEL} bei rund 250 €/Tag (ohne Bediener), dazu kommen Transport
          (150–300 €) und der Glassauger als Zubehör. Entscheidend ist die Tragkraft am tatsächlichen
          Ausladungsradius: Eine 700-kg-Scheibe auf 8 m Reichweite verlangt einen Spinnenkran der oberen
          Klasse (bis 8 t), nicht das kleinste Modell.
        </p>
      </div>
      <p className="text-[11px] text-gray-300 mb-8">
        Stand: {DATA_LAST_VERIFIED_ISO} · über 200 Anbieter mit Minikran in {COUNTRY_LABEL}
      </p>

      {/* Wann brauchen Sie */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Wann brauchen Sie einen Minikran mit Glassauger?
        </h2>
        <p className="text-[14px] text-gray-600 leading-relaxed mb-3">
          Überall dort, wo schweres Glas an eine Stelle muss, die von Hand oder mit dem Stapler nicht
          erreichbar ist. Typische Einsätze:
        </p>
        <ul className="space-y-2 text-[14px] text-gray-600 mb-3">
          <li><strong className="text-gray-900">Fenster und Verglasung</strong> im Neubau oder bei der Sanierung, oft in oberen Etagen.</li>
          <li><strong className="text-gray-900">Wintergarten und Terrassendach</strong>, wenn großformatige Scheiben über den Garten gehoben werden.</li>
          <li><strong className="text-gray-900">Fassaden- und Glaselemente</strong> im Objektbau.</li>
          <li><strong className="text-gray-900">Dachfenster und Glasdächer</strong>, bei denen der Kran über die Traufe hinausreichen muss.</li>
          <li><strong className="text-gray-900">Innenräume und Zwischendecken</strong>: Minikrane wiegen wenig und arbeiten dort, wo größere Krane den Boden überlasten würden.</li>
        </ul>
        <p className="text-[14px] text-gray-600 leading-relaxed">
          Der Vorteil gegenüber einem Autokran: Der Minikran kommt durch enge Zufahrten, stützt sich auf
          kleiner Fläche ab und beschädigt weder Pflaster noch Rasen.
        </p>
      </section>

      {/* Tragkraft & Glassauger-Klasse */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Tragkraft und Glassauger-Klasse richtig wählen
        </h2>
        <p className="text-[14px] text-gray-600 leading-relaxed mb-3">
          Hier wird der häufigste Fehler gemacht. Die angegebene Maximaltragkraft eines Krans gilt direkt
          am Mast. Mit jedem Meter Ausladung sinkt sie deutlich. Eine 700-kg-Scheibe, die 8 m weit über ein
          Hausdach gehoben wird, braucht deshalb keinen 1-Tonnen-Minikran, sondern ein kräftiges
          Spinnenkran-Modell. Die größten Geräte am Markt, etwa der Jekko SPX1280 oder der Maeda CC1908,
          heben bis zu rund 8 t am Mast und bewegen so auch große Scheiben sicher auf Distanz.
        </p>
        <p className="text-[14px] text-gray-600 leading-relaxed mb-3">
          Den Glassauger (Vakuumheber) wählen Sie passend zum Gewicht. Gängige Klassen reichen von etwa
          150 kg für einzelne Fenster bis 600 kg für große Fassadenscheiben, Spezialgeräte (Glassworker)
          bis über 1.000 kg. Ein zweikreisiges Vakuumsystem nach EN 13155 ist Pflicht, sobald Personen
          unter der Last arbeiten: Fällt ein Kreis aus, hält der zweite.
        </p>
        <p className="text-[14px] text-gray-600 leading-relaxed">
          Vor der Anfrage sollten Sie drei Werte kennen: Gewicht der schwersten Scheibe, Reichweite bis zum
          Einbauort und Zugang zur Aufstellfläche. Mit diesen Angaben findet der Vermieter das passende
          Modell beim ersten Anlauf.
        </p>
      </section>

      {/* Kosten */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Was kostet ein Minikran mit Glassauger?
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[14px] border-collapse mb-4">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="py-2 pr-4 font-medium text-gray-900">Leistung</th>
                <th className="py-2 font-medium text-gray-900">Richtwert</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {priceRows.map((row) => (
                <tr key={row.leistung} className="border-b border-gray-100 align-top">
                  <td className="py-2 pr-4">{row.leistung}</td>
                  <td className="py-2">{row.richtwert}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[14px] text-gray-600 leading-relaxed">
          Die Preise hängen von Tragkraftklasse, Mietdauer und Anfahrtsweg ab. Wer mehrere Tage mietet,
          zahlt pro Tag spürbar weniger; ab etwa fünf Arbeitstagen sinkt der Tagessatz für den Glassauger
          oft um 15–20 %. Den genauen Endpreis nennt der Anbieter nach Ihrer Anfrage, weil sich Transport
          und Glassauger nach Projekt und Gewichtsklasse richten.
        </p>
      </section>

      {/* Mit oder ohne Bediener */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Mit oder ohne Bediener?</h2>
        <p className="text-[14px] text-gray-600 leading-relaxed">
          Beides ist möglich. Den Minikran selbst zu bedienen spart Kosten und ist für einfache
          Hebevorgänge üblich. Größere Spinnenkrane, wie sie für schwere Scheiben nötig sind, werden
          allerdings meist gleich mit erfahrenem Bediener vermietet. Das hat einen guten Grund: Er kennt
          die Lastkurve seines Krans und das Verhalten des Vakuumhebers am langen Ausleger. Bei der
          Glasmontage über bewohnte Bereiche ist das die sichere Wahl.
        </p>
      </section>

      {/* Glassauger mit/ohne Kran */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Glassauger mieten – mit oder ohne Kran?</h2>
        <p className="text-[14px] text-gray-600 leading-relaxed">
          Nicht jede Aufgabe braucht einen Kran. Für leichte Scheiben auf ebenem Boden genügt ein
          handgeführter Vakuumheber, der ab etwa 65–80 €/Tag zu haben ist. Sobald die Last schwer wird
          oder in die Höhe und über Hindernisse muss, kommen Sie um die Kombination aus Minikran und
          Glassauger nicht herum. Als Faustregel: ab etwa 150 kg Scheibengewicht oder sobald gehoben statt
          nur verschoben wird, ist der Kran die richtige Lösung.
        </p>
      </section>

      {/* FAQ */}
      <div id="faq" className="mb-10 scroll-mt-20">
        <FAQSection faqs={glassaugerFAQs} craneTypeName="Minikran mit Glassauger" />
      </div>

      {/* Anbieter-CTA */}
      <section id="angebot-anfragen" className="mb-10 scroll-mt-20">
        <div className="border-l-4 border-gray-300 bg-gray-50 rounded-r-lg p-5 mb-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Anbieter mit Glassauger vergleichen
          </h2>
          <p className="text-[14px] text-gray-700 leading-relaxed">
            In unserem Verzeichnis finden Sie Minikran-Betriebe mit dokumentiertem Glassauger in mehreren
            Bundesländern, darunter Nordrhein-Westfalen, Hessen, Berlin/Brandenburg und Niedersachsen.
            Beschreiben Sie kurz Ihr Vorhaben (Gewicht, Höhe, Zugang), dann erhalten Sie passende Angebote
            zum Vergleich. Kostenlos, unverbindlich, keine Provision.
          </p>
        </div>
        <InlineSammelanfrageForm />
      </section>

      {/* Cross-links */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">
          Weitere Themen rund um Minikran und Glasmontage
        </h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/minikran-mieten" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1.5 transition-colors">
            Alle Minikran-Anbieter
          </Link>
          <Link href="/kran-mieten-preise" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1.5 transition-colors">
            Kran mieten Preisliste
          </Link>
          <Link href="/kostenrechner" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1.5 transition-colors">
            Kostenrechner
          </Link>
          <Link href="/ratgeber/welchen-kran-brauche-ich" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1.5 transition-colors">
            Welchen Kran brauche ich?
          </Link>
          <Link href="/ratgeber/krantypen" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1.5 transition-colors">
            Krantypen im Überblick
          </Link>
        </div>
      </section>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${BASE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Minikran mit Glassauger mieten' },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Minikran mit Glassauger Vermietung',
            name: `Minikran mit Glassauger mieten: Anbietervergleich ${COUNTRY_LABEL}`,
            description:
              anbieterCount > 0
                ? `Minikran mit Glassauger für Glas-, Fenster- und Fassadenmontage. ${anbieterCount} Kranvermieter in ${COUNTRY_LABEL} im Vergleich, Richtwert ab 250 €/Tag, kostenlos und ohne Provision.`
                : `Minikran mit Glassauger für Glas-, Fenster- und Fassadenmontage. Kranvermieter in ${COUNTRY_LABEL} im Vergleich, Richtwert ab 250 €/Tag, kostenlos und ohne Provision.`,
            provider: { '@type': 'Organization', name: BRAND_NAME, url: BASE_URL },
            areaServed: { '@type': 'Country', name: COUNTRY_LABEL },
            category: 'Kranvermietung',
            dateModified: DATA_LAST_VERIFIED_ISO,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Minikran mit Glassauger mieten: Glas und Fenster sicher heben',
            url: `${BASE_URL}/minikran-mit-glassauger-mieten`,
            description:
              'Minikran mit Glassauger mieten: Glas, Fenster und Fassaden sicher heben. Richtwert ab 250 €/Tag, über 200 Anbieter im Vergleich.',
            inLanguage: 'de',
            isPartOf: { '@type': 'WebSite', name: BRAND_NAME, url: BASE_URL },
            primaryImageOfPage: { '@type': 'ImageObject', url: `${BASE_URL}${OG_IMAGE.url}` },
          }),
        }}
      />
      {/* FAQPage structured data rendered by FAQSection */}
    </div>
  )
}
