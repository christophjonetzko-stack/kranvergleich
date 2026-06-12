import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/faq-section'
import { getSiteStats } from '@/lib/queries'
import { BRAND_NAME, TAX_LABEL } from '@/lib/country'

export const revalidate = 86400

// Targets the service-intent cluster the catalog pages miss: "kranhub kosten"
// (GSC pos 6 with zero on-site coverage), "kranarbeiten kosten/preise",
// "kraneinsatz kosten" (2026-06-12 SEO audit). All price figures below are
// the documented editorial bands from /kran-mieten-preise; the per-Hub
// numbers are arithmetic on those bands (4h minimum x hourly rate + travel),
// no new price claims.
export const metadata: Metadata = {
  title: { absolute: 'Kranarbeiten Kosten 2026: Was kostet ein Kranhub?' },
  description:
    'Kranarbeiten kosten 150–500€ pro Stunde inkl. Kranführer. Ein einzelner Kranhub kostet praktisch 750–1.200€ (Mindestabnahme + Anfahrt). Alle Stundensätze, Hub-Preise & Spartipps.',
  alternates: { canonical: '/ratgeber/kranarbeiten-kosten' },
}

const faqs = [
  {
    question: 'Was kostet ein Kranhub?',
    answer:
      'Ein einzelner Kranhub kostet in der Praxis 750–1.200€. Der Hub selbst dauert oft nur Minuten, bezahlt wird aber die Mindestabnahme von meist 4 Stunden (bei einem 30–50-Tonnen-Autokran 150–200€/h, also 600–800€) plus Anfahrt (150–400€). Wer mehrere Hübe auf denselben Termin legt, zahlt pro Hub deutlich weniger.',
  },
  {
    question: 'Was kostet eine Kranstunde?',
    answer:
      'Eine Kranstunde kostet je nach Tragklasse 150–500€ inklusive Kranführer: 30–50 Tonnen 150–200€/h, 50–100 Tonnen 200–300€/h, über 100 Tonnen 300–500€/h. Die Mindestabnahme liegt bei den meisten Anbietern bei 4 Stunden.',
  },
  {
    question: 'Was kosten Kranarbeiten mit Bediener?',
    answer:
      'Bei Autokran, Mobilkran und Raupenkran ist der Kranführer gesetzlich vorgeschrieben und im Stundensatz enthalten. Bei Selbstfahrer-Geräten wie Minikran oder Dachdeckerkran kostet ein separat gebuchter Bediener 50–80€ pro Stunde oder 400–650€ pro Tag.',
  },
  {
    question: 'Warum gibt es eine Mindestabnahme von 4 Stunden?',
    answer:
      'Der Anbieter kalkuliert den halben Tag als blockiert: Anfahrt, Aufbau der Stützen, der eigentliche Einsatz, Abbau und Rückfahrt. Ein Kran, der für einen 20-Minuten-Hub gebucht ist, kann an diesem Vormittag keinen zweiten Kunden bedienen. Die Mindestabnahme deckt genau diese Blockzeit ab.',
  },
  {
    question: 'Lohnt sich ein Pauschalpreis pro Hub?',
    answer:
      'Bei planbaren Standard-Hüben (etwa Möbel über den Balkon oder eine Klimaanlage aufs Dach) bieten manche Betriebe Pauschalen an. Vergleichen Sie die Pauschale immer mit der Rechnung aus Mindestabnahme plus Anfahrt: liegt sie darunter und sind Rüstzeit sowie Anfahrt eingeschlossen, fahren Sie damit gut.',
  },
  {
    question: 'Was kostet ein Kraneinsatz am Wochenende?',
    answer:
      'Für Samstag- und Sonntagseinsätze verlangen viele Betriebe einen Zuschlag, die Höhe legt jeder Anbieter selbst fest. Wenn Ihr Termin flexibel ist, sparen Sie mit einem Werktag fast immer Geld. Holen Sie für Wochenendarbeiten in jedem Fall mehrere Angebote ein.',
  },
]

export default async function KranarbeitenKostenPage() {
  const { anbieterCount } = await getSiteStats()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/ratgeber" className="hover:text-gray-600">Ratgeber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Kranarbeiten Kosten</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Kranarbeiten: Was kostet ein Kranhub?
      </h1>
      <p className="text-[15px] text-gray-500 mb-4 max-w-3xl">
        Sie brauchen keinen Kran für eine Woche, sondern nur für einen einzigen Hebevorgang?
        Hier erfahren Sie, was Kranarbeiten pro Stunde kosten, warum ein einzelner Kranhub
        selten unter 750€ zu haben ist und wie Sie die Fixkosten klein halten.
      </p>
      <p className="text-[11px] text-gray-300 mb-8">Stand: Juni 2026</p>

      {/* TOC */}
      <nav className="mb-8 border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-medium text-gray-900 mb-2">Inhalt</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          <li><a href="#was-ist-kranhub" className="text-[13px] text-blue-600 hover:underline">Was ist ein Kranhub?</a></li>
          <li><a href="#kosten-pro-hub" className="text-[13px] text-blue-600 hover:underline">Kosten pro Kranhub</a></li>
          <li><a href="#stundensaetze" className="text-[13px] text-blue-600 hover:underline">Stundensätze für Kranarbeiten</a></li>
          <li><a href="#preisfaktoren" className="text-[13px] text-blue-600 hover:underline">Was den Preis bestimmt</a></li>
          <li><a href="#sparen" className="text-[13px] text-blue-600 hover:underline">So senken Sie die Kosten</a></li>
          <li><a href="#faq" className="text-[13px] text-blue-600 hover:underline">Häufige Fragen</a></li>
        </ul>
      </nav>

      <div className="space-y-10 text-[14px] text-gray-600 leading-relaxed">

        <section id="was-ist-kranhub" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Was ist ein Kranhub?</h2>
          <p className="mb-4">
            Ein <strong className="text-gray-900">Kranhub</strong> ist ein einzelner Hebevorgang:
            Der Kran nimmt eine Last auf, schwenkt sie an die Zielposition und setzt sie ab.
            Typische Beispiele sind die Klimaanlage aufs Dach, der Stahlträger in den Rohbau,
            das Klavier über den Balkon oder die Dachstuhl-Elemente vom LKW aufs Haus.
            Der Hub selbst dauert oft nur 10 bis 30 Minuten.
          </p>
          <p>
            Genau darin liegt die Besonderheit bei den Kosten: Bezahlt wird nicht der Hub,
            sondern der <strong className="text-gray-900">Einsatz</strong>. Anfahrt, Aufstellen
            der Stützen, der Hub, Abbau und Rückfahrt blockieren den Kran samt Kranführer für
            einen halben Tag, und so rechnen die Betriebe auch ab.
          </p>
        </section>

        <section id="kosten-pro-hub" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Kosten pro Kranhub: die ehrliche Rechnung</h2>
          <p className="mb-4">
            Für einen einzelnen Hub mit einem 30–50-Tonnen-Autokran, der häufigsten Klasse für
            Haus- und Montagearbeiten, sieht die Rechnung so aus:
          </p>
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Posten</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Kosten</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-t">
                  <td className="py-3 px-4">Mindestabnahme 4 Stunden (150–200€/h, inkl. Kranführer)</td>
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-gray-900">600–800€</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4">An- und Abfahrt (ca. 2–4€/km)</td>
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-gray-900">150–400€</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4 font-medium text-gray-900">Gesamt für einen Hub</td>
                  <td className="py-3 px-4 whitespace-nowrap font-semibold text-gray-900">750–1.200€</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4">
            Alle Werte netto, zzgl. {TAX_LABEL} Schwerere Lasten oder große Auslagen verlangen
            eine höhere Tragklasse, dann steigt der Stundensatz entsprechend (siehe Tabelle unten).
            Braucht der Kran einen Stellplatz auf der Straße, kommt die{' '}
            <Link href="/ratgeber/kran-aufstellen-genehmigung" className="text-blue-600 hover:underline">
              Genehmigung für das Aufstellen
            </Link>{' '}
            hinzu (typisch 150–500€ je nach Kommune).
          </p>
          <p>
            Entscheidend ist die Bündelung: Zwei oder drei Hübe am selben Termin teilen sich
            Anfahrt und Rüstzeit. Der zweite Hub kostet dann nur noch die zusätzliche Kranzeit,
            nicht noch einmal den ganzen Sockel.
          </p>
        </section>

        <section id="stundensaetze" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Stundensätze für Kranarbeiten nach Tragklasse</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Tragklasse</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Stundensatz</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Kranführer</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Typische Arbeiten</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-t">
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-gray-900">Autokran 30–50 t</td>
                  <td className="py-3 px-4 whitespace-nowrap">150–200€/h</td>
                  <td className="py-3 px-4">inklusive</td>
                  <td className="py-3 px-4">Dachstuhl, Klimaanlage, Fertiggarage, Möbel</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-gray-900">Autokran 50–100 t</td>
                  <td className="py-3 px-4 whitespace-nowrap">200–300€/h</td>
                  <td className="py-3 px-4">inklusive</td>
                  <td className="py-3 px-4">Stahlträger, Betonfertigteile, Hallenbau</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-gray-900">Mobilkran 100 t+</td>
                  <td className="py-3 px-4 whitespace-nowrap">300–500€/h</td>
                  <td className="py-3 px-4">inklusive</td>
                  <td className="py-3 px-4">Industriemontage, Brückenteile, Windkraft</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-gray-900">Bediener für Selbstfahrer-Krane</td>
                  <td className="py-3 px-4 whitespace-nowrap">50–80€/h</td>
                  <td className="py-3 px-4">separat gebucht</td>
                  <td className="py-3 px-4">Minikran, Dachdeckerkran, Anhängerkran</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Bei Autokran, Mobilkran und Raupenkran ist der Kranführer gesetzlich vorgeschrieben
            und immer im Satz enthalten. Die vollständigen Tages-, Wochen- und Monatspreise aller
            8 Krantypen finden Sie in der{' '}
            <Link href="/kran-mieten-preise" className="text-blue-600 hover:underline">
              Kran mieten Preisliste 2026
            </Link>.
          </p>
        </section>

        <section id="preisfaktoren" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Was den Preis eines Kraneinsatzes bestimmt</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-gray-900">Tragkraft und Auslage:</strong> Nicht das Gewicht
              allein zählt, sondern Gewicht <em>bei</em> Entfernung. 500 kg über ein Haus hinweg
              auf 30 Meter verlangen einen größeren Kran als 2 Tonnen direkt neben dem Fahrzeug.
            </li>
            <li>
              <strong className="text-gray-900">Anfahrtsweg:</strong> 2–4€ pro Kilometer summieren
              sich. Ein Anbieter aus der Region schlägt einen entfernten Billiganbieter fast immer.
            </li>
            <li>
              <strong className="text-gray-900">Stellplatz und Genehmigung:</strong> Steht der Kran
              auf öffentlicher Straße, brauchen Sie eine Sondernutzungserlaubnis samt Vorlauf von
              2 bis 4 Wochen.
            </li>
            <li>
              <strong className="text-gray-900">Rüstzeit:</strong> Enge Zufahrten, Hanglage oder
              aufwendige Abstützung verlängern den Einsatz, und damit die abgerechneten Stunden.
            </li>
            <li>
              <strong className="text-gray-900">Termin:</strong> Werktags ist günstiger als am
              Wochenende, planbar ist günstiger als kurzfristig.
            </li>
          </ul>
        </section>

        <section id="sparen" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">So senken Sie die Kosten pro Hub</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong className="text-gray-900">Hübe bündeln:</strong> Alles, was an diesem Tag
              gehoben werden muss, auf einen Termin legen. Auch Nachbarn fragen, geteilte Anfahrt
              ist gesparte Anfahrt.
            </li>
            <li>
              <strong className="text-gray-900">Anbieter aus der Nähe wählen:</strong> Die Anfahrt
              ist beim Einzelhub der zweitgrößte Posten.
            </li>
            <li>
              <strong className="text-gray-900">Last und Entfernung vorab klären:</strong> Wer dem
              Anbieter Gewicht, Hubhöhe und Abstand nennt, bekommt die passende (nicht die
              überdimensionierte) Tragklasse angeboten.
            </li>
            <li>
              <strong className="text-gray-900">Mehrere Angebote vergleichen:</strong> Die Spannen
              in der Tabelle oben sind real, zwischen dem günstigsten und dem teuersten Angebot
              für denselben Hub liegen oft mehrere hundert Euro.
            </li>
          </ol>
        </section>
      </div>

      {/* FAQ */}
      <div id="faq" className="mt-10 scroll-mt-20">
        <FAQSection faqs={faqs} craneTypeName="Kran" />
      </div>

      {/* CTA */}
      <section className="mt-10 bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Kranarbeiten anfragen und Preise vergleichen
        </h2>
        <p className="text-[14px] text-gray-500 mb-5 max-w-xl mx-auto">
          Beschreiben Sie Ihren Hub einmal und erhalten Sie Angebote von passenden Betrieben aus
          Ihrer Region, aus über {anbieterCount} Kranvermietern auf {BRAND_NAME}.
        </p>
        <Link
          href="/kostenrechner"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-semibold rounded-md transition-colors"
        >
          Kostenlos Angebote anfragen
        </Link>
        <p className="text-[12px] text-gray-400 mt-3">Kostenlos & unverbindlich.</p>
      </section>
    </div>
  )
}
