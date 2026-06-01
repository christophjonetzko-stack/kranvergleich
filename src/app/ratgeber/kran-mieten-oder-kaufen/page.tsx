import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/faq-section'
import { COUNTRY_LABEL, BRAND_NAME } from '@/lib/country'
import { alternatesFor } from '@/lib/alternates'
import { OG_IMAGE } from '@/lib/og-image'

export const revalidate = 86400

export const metadata: Metadata = {
  title: { absolute: 'Kran mieten oder kaufen? Was sich wann lohnt' },
  description: `Kran mieten oder kaufen? Faustregel: unter 100 Einsatztagen pro Jahr ist Mieten günstiger. Anschaffungskosten ab 50.000€ (Minikran) bis 1.000.000€ (Autokran), plus Wartung, Lagerung, Versicherung. Wann lohnt sich Kauf, wann Gebraucht-Kauf, wann Miete, alle Faktoren.`,
  alternates: alternatesFor('/ratgeber/kran-mieten-oder-kaufen'),
  openGraph: {
    title: 'Kran mieten oder kaufen? Wann sich was lohnt. Vergleich 2026',
    description: 'Kran mieten oder kaufen. Faustregel, Anschaffungskosten, versteckte Kosten und Entscheidungshilfe pro Krantyp.',
    type: 'article',
    url: '/ratgeber/kran-mieten-oder-kaufen',
    images: [OG_IMAGE],
  },
}

const faqs = [
  {
    question: 'Kran mieten oder kaufen, was ist günstiger?',
    answer: 'Faustregel: Bei weniger als 100 Einsatztagen pro Jahr ist Mieten in fast allen Fällen günstiger. Ein neuer Autokran 30t kostet 200.000–350.000€ Anschaffung, plus 15–25.000€/Jahr für Wartung, Versicherung, Lagerung und Wertverlust. Bei 80 Einsatztagen jährlich kostet die Miete (500€/Tag × 80) 40.000€, bei Kauf wären die laufenden Kosten allein schon bei der Hälfte, bevor die Anschaffung amortisiert ist. Erst ab 100–150 Einsatztagen wird Kauf wirtschaftlich.',
  },
  {
    question: 'Was kostet ein neuer Kran?',
    answer: 'Anschaffungskosten variieren stark nach Krantyp: Anhängerkran 15.000–40.000€, Dachdeckerkran 40.000–120.000€, Minikran (Spinnenkran) 60.000–180.000€, Ladekran 80.000–250.000€, Autokran 30t 200.000–350.000€, Mobilkran 100t 800.000–1.500.000€, Schwerlast-Mobilkran 500t über 3.000.000€, Baukran (Turmdrehkran) 200.000–800.000€ je nach Höhe und Tragkraft.',
  },
  {
    question: 'Was kostet ein gebrauchter Kran?',
    answer: 'Gebrauchtkrane kosten typischerweise 30–60% weniger als Neukrane bei 8–15 Jahren Alter. Ein gebrauchter Minikran mit 5.000 Betriebsstunden liegt bei 25.000–80.000€. Ein gebrauchter Autokran 30t mit 8–12 Jahren bei 80.000–180.000€. Wichtig beim Gebrauchtkauf: lückenlose Wartungshistorie, aktuelle Hauptuntersuchung (für straßenzugelassene Krane), UVV-Prüfung gültig, und realistische Restnutzungsdauer (Krane laufen 20–30 Jahre, aber Komponenten verschleißen unterschiedlich).',
  },
  {
    question: 'Welche versteckten Kosten gibt es beim Kran-Kauf?',
    answer: 'Neben dem Kaufpreis fallen jährlich an: Vollkaskoversicherung 1.500–4.000€, UVV-Prüfungen 200–600€ jährlich, Wartung 2.000–8.000€ je nach Größe, Lagerung/Halle 1.200–4.000€, Wertverlust 5–10% pro Jahr (linear über 10 Jahre meist 60–80% Gesamtwertverlust), Kranführerkosten falls Sie nicht selbst fahren 40.000–60.000€/Jahr für eine Vollzeitstelle. Summiert ergibt das bei einem Autokran 30t leicht 20.000–35.000€ Fixkosten pro Jahr, unabhängig davon, wie oft der Kran tatsächlich läuft.',
  },
  {
    question: 'Wann lohnt sich Kran-Kauf trotz hoher Kosten?',
    answer: 'Drei Szenarien: (1) Sie haben Dauereinsatz über 100–150 Tage pro Jahr, typisch für Bauunternehmen mit eigenem Fuhrpark oder Großhandwerker (Dachdeckerei mit 5+ Mitarbeitern). (2) Sie brauchen den Kran spontan verfügbar (Bereitschaftsdienst, Reparatureinsätze) und Mietzeiten von 24–48 Stunden Vorlauf passen nicht. (3) Der Kran ist Teil Ihres Kerngeschäfts (Kranvermietung, Schwerlast-Logistik) und Sie können ihn auslasten ODER weitervermieten.',
  },
  {
    question: 'Lohnt sich ein gebrauchter Dachdeckerkran für mein Dachdeckergeschäft?',
    answer: 'Bei einer typischen Dachdeckerei mit 4–8 Mitarbeitern und 60–100 Einsatztagen pro Jahr liegen Sie an der Grenze. Rechnung: Gebrauchter Dachdeckerkran 50.000€ + 4.000€/Jahr Unterhalt + 4.000€/Jahr Wertverlust = ca. 13.000€ Jahresaufwand bei 10 Jahren Nutzung. Bei 80 Miet-Einsatztagen pro Jahr wären das 16.000€ (200€/Tag). Der Kauf ist also etwa 3.000€/Jahr günstiger, aber dafür haben Sie Kapitalbindung, Lagerung und Wartungsaufwand. Viele Dachdecker mieten trotzdem, weil die Variabilität (verschiedene Krantypen je Projekt) und Auslastungsschwankungen das Risiko erhöhen.',
  },
  {
    question: 'Kann ich einen Kran finanzieren oder leasen?',
    answer: 'Ja. Bei Krankauf üblich sind: Bankfinanzierung über 5–8 Jahre mit 3–6% Zinsen, Leasing (3–5 Jahre Laufzeit, monatliche Raten ohne Eigentumserwerb), Mietkauf (Miete zählt anteilig auf den Kaufpreis an). Bei Leasing fallen typischerweise 1.500–6.000€ pro Monat an je nach Krangröße. Leasing ist steuerlich oft attraktiver als Kauf, weil die Raten als Betriebsausgabe sofort absetzbar sind, anders als die Abschreibung beim Kauf (verteilt über 10 Jahre).',
  },
  {
    question: 'Hybrid-Strategie: Kran kaufen UND mieten, wie geht das?',
    answer: 'Für mittlere Betriebe sinnvoll: Eigenen Standardkran kaufen (z.B. einen Dachdeckerkran oder Minikran für 80% der Aufträge), Spezialkrane mieten (Schwerlast-Mobilkran für Großprojekte, Spinnenkran für Glasarbeiten). So decken Sie das Tagesgeschäft mit eigenem Gerät bei optimaler Auslastung ab und greifen für Sonderaufgaben auf Mietkrane zu, ohne den Wertverlust eines selten genutzten Spezialkrans zu tragen.',
  },
]

export default function KranMietenOderKaufenPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/ratgeber/welchen-kran-brauche-ich" className="hover:text-gray-600">Ratgeber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Kran mieten oder kaufen</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Kran mieten oder kaufen? Wann sich was lohnt. Vergleich 2026
      </h1>
      <p className="text-[15px] text-gray-500 mb-4 max-w-3xl">
        Sie überlegen, einen Kran zu kaufen oder zu mieten? Die kurze Antwort: <strong className="text-gray-900">
        Bei unter 100 Einsatztagen pro Jahr ist Mieten in fast allen Fällen günstiger.</strong> Ein neuer Autokran
        kostet schnell 200.000–350.000€, bei nur 50 Einsätzen pro Jahr amortisiert sich das nie. Mieten ist bei
        dieser Auslastung 2–3× günstiger pro tatsächlich genutztem Tag.
      </p>
      <p className="text-[14px] text-gray-500 mb-8 max-w-3xl">
        Dieser Ratgeber zeigt Ihnen die konkrete Rechnung pro Krantyp, welche versteckten Kosten beim Kauf anfallen,
        wann der Kauf eines Gebrauchtkrans Sinn macht und wie eine Hybrid-Strategie (eigener Standardkran +
        gemietete Spezialkrane) für mittlere Betriebe funktioniert.
      </p>

      <div className="space-y-8 text-[14px] text-gray-600 leading-relaxed">

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Die 100-Einsatztage-Regel. Faustregel für Bauunternehmer</h2>
          <p className="mb-3">
            Die Bauindustrie nutzt seit Jahrzehnten eine einfache Faustregel: <strong className="text-gray-900">
            Unter 100 Einsatztagen pro Jahr lohnt sich der Kauf in der Regel nicht.</strong> Der Grund liegt
            in den Fixkosten, ein eigener Kran kostet Sie auch dann Geld, wenn er in der Halle steht. Versicherung,
            UVV-Prüfung, Wertverlust, Wartung und Lagerung summieren sich auf 8–15% des Kaufpreises pro Jahr.
          </p>
          <p className="mb-3">
            Konkretes Beispiel, ein Autokran 30t:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3">
            <p className="font-medium text-gray-900 mb-2">Kauf eines neuen Autokrans 30t</p>
            <ul className="space-y-1 text-[13px]">
              <li>Anschaffung: <strong>280.000€</strong> (Mittelklasse)</li>
              <li>Vollkaskoversicherung: 3.000€/Jahr</li>
              <li>Wartung + UVV-Prüfung: 5.000€/Jahr</li>
              <li>Wertverlust (über 10 Jahre): ~22.000€/Jahr</li>
              <li>Lagerung/Halle: 2.500€/Jahr</li>
              <li>Kranführer (Vollzeit): 50.000€/Jahr</li>
              <li className="font-medium text-gray-900 pt-2 border-t border-gray-300 mt-2">
                = Fixkosten pro Jahr ca. <strong>82.500€</strong> (ohne Kraftstoff, ohne Reparaturen)
              </li>
            </ul>
          </div>
          <p className="mb-3">
            Bei 80 Einsatztagen pro Jahr entspricht das <strong className="text-gray-900">1.030€ pro tatsächlich
            genutztem Tag</strong>, gegenüber 500€/Tag Mietpreis (inkl. Kranführer). Erst ab 165 Einsatztagen
            kommen Sie unter den Miet-Tagessatz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Anschaffungskosten neuer Krane. Übersicht 2026</h2>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Krantyp</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Kauf neu</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Gebraucht (8–15 J.)</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Miete/Tag</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-t"><td className="py-3 px-4 font-medium text-gray-900">Anhängerkran</td><td className="py-3 px-4">15.000–40.000€</td><td className="py-3 px-4">8.000–22.000€</td><td className="py-3 px-4">ab 150€</td></tr>
                <tr className="border-t bg-gray-50"><td className="py-3 px-4 font-medium text-gray-900">Dachdeckerkran</td><td className="py-3 px-4">40.000–120.000€</td><td className="py-3 px-4">20.000–65.000€</td><td className="py-3 px-4">ab 200€</td></tr>
                <tr className="border-t"><td className="py-3 px-4 font-medium text-gray-900">Minikran (Spinnenkran)</td><td className="py-3 px-4">60.000–180.000€</td><td className="py-3 px-4">30.000–95.000€</td><td className="py-3 px-4">ab 250€</td></tr>
                <tr className="border-t bg-gray-50"><td className="py-3 px-4 font-medium text-gray-900">Ladekran (LKW)</td><td className="py-3 px-4">80.000–250.000€</td><td className="py-3 px-4">40.000–130.000€</td><td className="py-3 px-4">ab 300€</td></tr>
                <tr className="border-t"><td className="py-3 px-4 font-medium text-gray-900">Autokran 30–50t</td><td className="py-3 px-4">200.000–400.000€</td><td className="py-3 px-4">100.000–210.000€</td><td className="py-3 px-4">ab 500€</td></tr>
                <tr className="border-t bg-gray-50"><td className="py-3 px-4 font-medium text-gray-900">Mobilkran 80–150t</td><td className="py-3 px-4">600.000–1.200.000€</td><td className="py-3 px-4">280.000–650.000€</td><td className="py-3 px-4">ab 600€</td></tr>
                <tr className="border-t"><td className="py-3 px-4 font-medium text-gray-900">Mobilkran 500t+</td><td className="py-3 px-4">2.500.000–4.000.000€</td><td className="py-3 px-4">1.000.000–2.200.000€</td><td className="py-3 px-4">ab 2.500€</td></tr>
                <tr className="border-t bg-gray-50"><td className="py-3 px-4 font-medium text-gray-900">Baukran (Turmdrehkran)</td><td className="py-3 px-4">200.000–800.000€</td><td className="py-3 px-4">90.000–400.000€</td><td className="py-3 px-4">ab 4.000€/Monat</td></tr>
                <tr className="border-t"><td className="py-3 px-4 font-medium text-gray-900">Raupenkran 100t+</td><td className="py-3 px-4">800.000–2.500.000€</td><td className="py-3 px-4">400.000–1.300.000€</td><td className="py-3 px-4">ab 800€</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Preisspannen sind Marktrichtwerte 2026, netto. Genaue Preise hängen von Hersteller (Liebherr, Tadano, Grove,
            Manitowoc, Sennebogen), Baujahr, Ausstattung und Region ab.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Wann lohnt sich der Kauf eines Krans?</h2>
          <p className="mb-3">
            Drei klare Szenarien sprechen für den Kauf:
          </p>
          <div className="space-y-3 mb-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">1. Dauereinsatz über 100–150 Tage jährlich</p>
              <p className="text-[13px]">
                Typisch für Bauunternehmen mit eigenem Fuhrpark, Großhandwerker (Dachdeckerei mit 5+ Mitarbeitern,
                Stahlbaubetriebe), oder Spezialdienste wie Photovoltaik-Montage mit konstanter Pipeline. Ab dieser
                Auslastung amortisiert sich die Anschaffung in 7–10 Jahren.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">2. Spontane Verfügbarkeit kritisch</p>
              <p className="text-[13px]">
                Wenn Sie regelmäßig kurzfristig einen Kran brauchen, etwa für Bereitschaftsdienste, Reparatureinsätze
                oder Notfälle (Sturmschäden, Industrieausfälle), können Mietzeiten von 24–48 Stunden Vorlauf zu lang
                sein. Eigener Kran bedeutet sofort einsatzbereit.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">3. Kran ist Kerngeschäft</p>
              <p className="text-[13px]">
                Kranvermietungen, Schwerlast-Logistiker, Industriedienstleister mit Kran-Service-Angebot, wer Krane
                weitervermietet oder als Bestandteil einer höhermargigen Dienstleistung einsetzt, muss eigene Geräte
                haben. Auslastung von 200+ Tagen/Jahr ist realistisch und der Kran zahlt sich aus.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Wann lohnt sich Mieten?</h2>
          <p className="mb-3">
            Die meisten Bauunternehmer mieten, und das aus guten Gründen:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-3">
            <li>
              <strong className="text-gray-900">Variabilität der Aufträge:</strong> Heute Dacharbeiten (Dachdeckerkran),
              nächste Woche Glasmontage (Minikran mit Glassauger), in zwei Monaten Schwerlast (Mobilkran 80t).
              Drei verschiedene Krane zu kaufen wäre unwirtschaftlich.
            </li>
            <li>
              <strong className="text-gray-900">Keine Kapitalbindung:</strong> 300.000€ in einen Kran zu investieren
              bindet Mittel, die in Personal, Werkzeug oder neue Standorte fließen könnten. Mietkosten sind sofort
              betrieblich absetzbar und planbar.
            </li>
            <li>
              <strong className="text-gray-900">Kein Wartungsaufwand:</strong> Hauptuntersuchung, UVV-Prüfung,
              hydraulische Wartung, Verschleißteile, beim Mietkran kümmert sich der Vermieter darum. Bei
              Eigentum sind Sie verantwortlich für jeden Schaden und jede Prüfung.
            </li>
            <li>
              <strong className="text-gray-900">Modernes Equipment:</strong> Mietkrane sind oft jünger als
              Eigeneigentum. Kranvermieter erneuern ihren Fuhrpark alle 5–8 Jahre. Sie bekommen aktuelle Technik,
              moderne Funkfernsteuerung und neue Sicherheitsfeatures.
            </li>
            <li>
              <strong className="text-gray-900">Kranführer inklusive:</strong> Bei Autokran, Mobilkran und Raupenkran
              ist der Kranführer im Mietpreis enthalten, gesetzlich vorgeschrieben (DGUV V52). Sie sparen sich
              den Lohn, die Sozialabgaben und Urlaubsvertretung eines eigenen Kranführers (50.000–60.000€/Jahr).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Gebrauchten Kran kaufen, wann macht das Sinn?</h2>
          <p className="mb-3">
            Ein gebrauchter Kran kostet typischerweise 30–60% weniger als ein Neukran bei 8–15 Jahren Alter, und
            kann eine attraktive Option sein, wenn Sie:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-3">
            <li>
              <strong className="text-gray-900">Ausreichend Auslastung haben</strong> (50–100 Tage/Jahr genügen
              wegen geringerer Anschaffung)
            </li>
            <li>
              <strong className="text-gray-900">Wartungstechnisch versiert sind</strong> oder einen Servicepartner
              haben, ältere Krane brauchen mehr Pflege
            </li>
            <li>
              <strong className="text-gray-900">Kein Image-Risiko sehen</strong>, ein 12 Jahre alter Kran wirkt
              auf manchen Baustellen weniger professionell als ein neuer
            </li>
          </ul>
          <p className="mb-3">
            <strong className="text-gray-900">Worauf achten beim Gebrauchtkauf?</strong> Lückenlose Wartungshistorie
            (Wartungsbuch), aktuelle UVV-Prüfung gültig, bei straßenzugelassenen Kranen aktuelle Hauptuntersuchung,
            Sichtprüfung der Hydraulik (Leckagen?), Stahlbau auf Risse, Anschlagmittel (Seile, Ketten) auf
            Verschleißgrenze. Faustregel: <strong className="text-gray-900">Krane laufen 20–30 Jahre</strong> mechanisch,
            aber Hydraulik, Elektrik und Sicherheitssysteme verschleißen früher und müssen ggf. erneuert werden.
          </p>
          <p className="mb-3">
            Anbieter für gebrauchte Krane: Hersteller-eigene Used-Programs (Liebherr, Tadano), spezialisierte
            Händler, Online-Plattformen (Mascus, MachineryZone, TruckScout24). Klaas und Böcker sind die
            dominierenden Hersteller im Dachdeckerkran-Segment in {COUNTRY_LABEL}, gebrauchte Modelle dieser
            Marken haben gute Wiederverkaufswerte.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Hybrid-Strategie: Eigener Standardkran + gemietete Spezialkrane</h2>
          <p className="mb-3">
            Für mittlere Betriebe (Dachdeckerei mit 8 Mitarbeitern, Stahlbau mit eigenem Werkstattbereich, etc.) ist
            oft die <strong className="text-gray-900">Hybrid-Strategie</strong> wirtschaftlich am besten:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3">
            <p className="font-medium text-gray-900 mb-2">Beispielrechnung. Dachdeckerei mit 80 Einsatztagen/Jahr</p>
            <ul className="space-y-1 text-[13px]">
              <li><strong>Eigener Dachdeckerkran</strong> (gebraucht 8 Jahre, 55.000€):
                <ul className="ml-4 mt-1 space-y-0.5">
                  <li>• 50 Einsätze/Jahr Standardaufträge</li>
                  <li>• Jahreskosten: ca. 11.000€ (Wertverlust + Unterhalt + Versicherung)</li>
                  <li>• = 220€ pro Einsatztag (gegenüber 200€ Miete: vergleichbar, aber sofort verfügbar)</li>
                </ul>
              </li>
              <li className="pt-2"><strong>Gemietete Spezialkrane</strong> für die restlichen 30 Einsätze:
                <ul className="ml-4 mt-1 space-y-0.5">
                  <li>• 10× Minikran für Innenmontage (250€/Tag) = 2.500€</li>
                  <li>• 15× Mobilkran für Schwerlast (700€/Tag) = 10.500€</li>
                  <li>• 5× Autokran für Vor-Ort-Einsätze (500€/Tag) = 2.500€</li>
                </ul>
              </li>
              <li className="pt-2 border-t border-gray-300 mt-2">
                Gesamtjahreskosten: <strong className="text-gray-900">26.500€</strong> für 80 Einsätze.
              </li>
            </ul>
          </div>
          <p>
            Im Vergleich: Wenn Sie alle 80 Einsätze mieten würden, lägen Sie bei 25.000–30.000€/Jahr. Wenn Sie alle
            Krane kaufen würden, bei 100.000€+/Jahr. Die Hybrid-Strategie nutzt das Beste aus beiden Welten, eigener
            Kran für das Tagesgeschäft, Miete für Variabilität und Spitzenlasten.
          </p>
        </section>

        <section className="border border-blue-200 bg-blue-50/50 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Fazit: Mieten ist für die meisten der bessere Weg</h2>
          <p className="mb-3">
            Solange Sie nicht regelmäßig über 100 Tage pro Jahr einen Kran brauchen, ist <strong className="text-gray-900">
            Mieten in fast allen Fällen die wirtschaftlichere Wahl</strong>, und sie skaliert mit Ihren Aufträgen,
            statt Fixkosten in Form eines Krans in der Halle zu verursachen. Bei mehr als 150 Einsatztagen oder
            wenn ein Standardkran 80% Ihrer Aufträge abdeckt, lohnt sich Kauf (neu oder gebraucht) oder eine
            Hybrid-Strategie.
          </p>
          <p className="mb-4">
            Wenn Sie sich unsicher sind, ist der schnellste Weg, eine kostenlose Sammelanfrage zu stellen. Sie
            bekommen Angebote von mehreren Vermietern in Ihrer Region und sehen sofort, wie viel das Mieten für
            Ihren konkreten Bedarf kostet. Damit haben Sie eine Vergleichsbasis für die Kauf-Entscheidung.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Link
              href="/kran-mieten-preise"
              className="flex-1 text-center bg-blue-600 text-white text-[14px] font-medium py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Kostenrechner öffnen. Preise vergleichen
            </Link>
            <Link
              href="/kranverleih"
              className="flex-1 text-center border border-gray-300 text-gray-700 text-[14px] font-medium py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Alle Kranverleiher in {COUNTRY_LABEL}
            </Link>
          </div>
        </section>
      </div>

      <div className="mt-10">
        <FAQSection faqs={faqs} craneTypeName="Kran" />
      </div>

      <div className="mt-8 text-[13px] text-gray-500">
        <p>
          Sie planen einen konkreten Einsatz und möchten direkt Preise vergleichen?
          Nutzen Sie die <Link href="/" className="text-blue-600 hover:underline">Sammelanfrage auf {BRAND_NAME}</Link> 
          kostenlos, unverbindlich und in 2 Minuten ausgefüllt.
        </p>
      </div>
    </div>
  )
}
