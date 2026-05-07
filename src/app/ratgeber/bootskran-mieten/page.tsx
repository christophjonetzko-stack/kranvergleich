import type { Metadata } from 'next'
import Link from 'next/link'
import { getSiteStats } from '@/lib/queries'
import { COUNTRY_LABEL, BRAND_NAME, BASE_URL } from '@/lib/country'
import { alternatesFor } from '@/lib/alternates'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Bootskran mieten: Yacht & Segelboot heben — Kosten & Anbieter 2026',
  description:
    'Yacht oder Segelboot kranen: Mobilkran 50t ab 600€/Einsatz, Autokran 100t für schwere Boote ab 1.200€. Kosten nach Bootslänge, Krantraverse, Saison-Vorlauf und Anbieter im Vergleich.',
  alternates: alternatesFor('/ratgeber/bootskran-mieten'),
  openGraph: {
    title: 'Bootskran mieten: Yacht & Segelboot heben — Kosten & Anbieter 2026',
    description:
      'Yacht oder Segelboot kranen: Mobilkran 50t ab 600€/Einsatz, Autokran 100t für schwere Boote ab 1.200€. Kosten nach Bootslänge, Krantraverse und Saison-Vorlauf.',
    type: 'article',
    url: '/ratgeber/bootskran-mieten',
  },
}

const faqs = [
  {
    question: 'Was kostet ein Bootskran-Einsatz für eine 10-m-Yacht?',
    answer:
      'Für eine typische 10-m-Segelyacht (4–6 t) zahlen Sie 500–900€ pro Einsatz mit einem Mobilkran 35–50t. Der Preis umfasst Anfahrt im Umkreis von 30–50 km, 2–3 Stunden Einsatzzeit inkl. Kranführer und Standard-Hebegurte. Bei einem Hafen mit fester Slip-Anlage rechnen Sie eher mit 250–450€ — dort kommt aber meist nur ein hafeneigener Bootslift zum Einsatz, kein Mobilkran. Krantraverse für empfindliche Hochsee-Yachten oder Mehrrumpfboote kostet 80–150€ extra.',
  },
  {
    question: 'Welcher Kran für Segelboot vs. Motoryacht?',
    answer:
      'Das hängt fast ausschließlich von Länge und Verdrängung ab, nicht vom Bootstyp. Segelboote bis 8 m und Motoryachten bis 7 m wiegen meist unter 3 t — dafür reicht ein Mobilkran 25–35t (400–700€/Einsatz). Segelyachten 9–12 m liegen bei 4–8 t und brauchen einen Mobilkran 50t (600–1.200€). Ab 12 m oder 8 t Verdrängung steigen Sie auf einen Mobilkran 80–100t um (1.000–2.000€). Bei Segelyachten kommt der hohe Mast als Faktor dazu — entweder Sie demaskieren vor dem Hub oder Sie brauchen einen Kran mit deutlich mehr Auslage.',
  },
  {
    question: 'Brauche ich einen Kranführer?',
    answer:
      'Beim Mobilkran und Autokran ist der Kranführer gesetzlich vorgeschrieben (DGUV Vorschrift 52) und im Mietpreis enthalten — Sie übernehmen das Boot nicht selbst. Anders beim Minikran für sehr kleine Boote bis 1,5 t (Schlauchboot, Beiboot, Jolle): da reicht eine 30–60-minütige Einweisung und Sie bedienen den Kran per Funkfernsteuerung. Für eine Yacht ab 5 m Länge ist der Profi-Kranführer aber auch sicherheitstechnisch sinnvoll, weil das Boot beim Anschlagen unter Last verrutschen kann.',
  },
  {
    question: 'Bootslift im Hafen oder Mobilkran — was ist günstiger?',
    answer:
      'Wenn Ihr Hafen einen festen Bootslift hat, ist das fast immer die günstigere Lösung: 200–500€ pro Hub für Boote bis 15 m. Ein Mobilkran-Einsatz kostet 500–1.500€, weil Anfahrt, Stellplatz-Aufbau und Kranführerstunden hinzukommen. Mobilkran lohnt sich, wenn (a) der Hafen keinen Lift hat, (b) der Lift zu klein für Ihre Yacht ist, (c) Sie die Yacht im eigenen Garten überwintern oder (d) Sie ein Boot zwischen zwei nicht angeschlossenen Gewässern transferieren. Bei regelmäßigem Bedarf prüfen Sie auch Saison-Verträge mit kran-affiliierten Marinas — die sind oft 20–30% günstiger als Einzelbuchung.',
  },
  {
    question: 'Kann ich meine Yacht aus dem Garten direkt zu Wasser kranen?',
    answer:
      'Theoretisch ja — bei Booten bis 8 m und 3 t Verdrängung kommt ein Mobilkran 35–50t in fast jeden Vorgarten, sofern Anfahrt und Stellplatz mindestens 4 × 8 m frei sind. Praktisch hängt es von zwei Faktoren ab: (1) Bodenbelastbarkeit — der Kran braucht 12–20 t/m² Tragfähigkeit, das schaffen viele Rasenflächen nur mit Lastverteilungsplatten; (2) Schwenkradius — der Kran muss aus dem Stand das Boot über mindestens 6–10 m Auslage anheben und absetzen. Bei größeren Yachten oder ungünstiger Lage prüfen Sie eine Kran-Trailer-Kombination: das Boot wird mit Mobilkran auf den Bootstrailer gehoben, dort separat zur Slipstelle gefahren, dann am Wasser nochmal gekrant.',
  },
  {
    question: 'Welche Versicherung brauche ich für den Hub?',
    answer:
      'Der Kranbetreiber haftet für Schäden, die durch Bedienungsfehler oder Materialversagen am Kran entstehen — das ist über seine Betriebshaftpflicht abgedeckt (Standard 5–10 Mio. €). Schäden am Boot durch unsachgemäße Anschlagpunkte, falsche Hebegurte oder durch konstruktive Schwächen am Boot selbst sind aber nicht automatisch dabei: dafür brauchen Sie eine Yacht-Kasko mit Hub-Klausel oder eine separate Transportversicherung. Prüfen Sie vor dem Termin, ob Ihre bestehende Yacht-Versicherung Hub-Schäden einschließt — viele Standardpolicen schließen das aus, sind aber gegen Aufpreis (50–150€/Saison) erweiterbar.',
  },
]

export default async function BootskranMietenPage() {
  const { anbieterCount } = await getSiteStats()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/ratgeber" className="hover:text-gray-600">Ratgeber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Bootskran mieten</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Bootskran mieten: Yacht & Segelboot sicher heben
        <span className="block text-gray-500 text-[18px] lg:text-xl font-normal mt-1">
          Bootskran-Guide 2026
        </span>
      </h1>
      <p className="text-[15px] text-gray-500 mb-4 max-w-3xl">
        Für eine 10-m-Yacht mit 4–6 t Verdrängung reicht ein{' '}
        <strong className="text-gray-900">Mobilkran 35–50t ab 500€/Einsatz</strong>. Größere Yachten
        ab 12 m brauchen einen <strong className="text-gray-900">Mobilkran 80–100t ab 1.000€</strong>.
        Dieser Guide zeigt Ihnen die richtige Krangröße nach Bootslänge und Gewicht, was Sondergurte
        und Krantraversen extra kosten und wie Sie den Saison-Vorlauf richtig planen.
      </p>
      <p className="text-[11px] text-gray-300 mb-8">Stand: Mai 2026 · Alle Preise netto, Richtwerte</p>

      {/* TOC */}
      <nav className="mb-8 border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-medium text-gray-900 mb-2">Inhalt</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          <li><a href="#einstieg" className="text-[13px] text-blue-600 hover:underline">1. Wann brauchen Sie einen Bootskran?</a></li>
          <li><a href="#krantyp" className="text-[13px] text-blue-600 hover:underline">2. Welcher Kran für welches Boot?</a></li>
          <li><a href="#kosten" className="text-[13px] text-blue-600 hover:underline">3. Kosten nach Bootslänge & Gewicht</a></li>
          <li><a href="#planung" className="text-[13px] text-blue-600 hover:underline">4. Einsatzplanung & Wetter</a></li>
          <li><a href="#ausruestung" className="text-[13px] text-blue-600 hover:underline">5. Krantraverse & Spezialgurte</a></li>
          <li><a href="#saison" className="text-[13px] text-blue-600 hover:underline">6. Saison-Timing: Krängung & Auswasserung</a></li>
          <li><a href="#genehmigungen" className="text-[13px] text-blue-600 hover:underline">7. Genehmigungen & Versicherung</a></li>
          <li><a href="#tipps" className="text-[13px] text-blue-600 hover:underline">8. 5 Tipps für Bootseigner & Marinas</a></li>
          <li><a href="#faq" className="text-[13px] text-blue-600 hover:underline">9. Häufige Fragen</a></li>
        </ul>
      </nav>

      <div className="space-y-10 text-[14px] text-gray-600 leading-relaxed">

        {/* Section 1: Einstieg */}
        <section id="einstieg" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            1. Wann brauchen Sie einen Bootskran?
          </h2>
          <p className="mb-3">
            Boote werden in Deutschland in vier typischen Situationen gekrant:{' '}
            <strong className="text-gray-900">Frühjahrs-Krängung</strong> (Boot vom Winterlager
            zurück ins Wasser), <strong className="text-gray-900">Herbst-Auswasserung</strong>{' '}
            (Boot aus dem Wasser ins Winterlager), <strong className="text-gray-900">Trailer-zu-Wasser-Transfer</strong>{' '}
            an einem Gewässer ohne Slipstelle und <strong className="text-gray-900">Boots-Übergabe</strong>{' '}
            beim Kauf oder Verkauf. In allen vier Fällen ist die Frage nicht „Kran ja oder nein?",
            sondern „welcher Kran und zu welchem Preis?".
          </p>
          <p className="mb-4">
            Drei Szenarien decken über 90% der Anfragen in {COUNTRY_LABEL} ab:
          </p>
          <div className="grid gap-3 sm:grid-cols-3 mb-4">
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">
                Privater Bootseigner
              </p>
              <p className="text-[13px] text-gray-600">
                Saisonale Krängung am Bodensee, an der Müritz oder an der Ostsee. Typisch:
                8–12-m-Yacht, 1–2 Einsätze pro Jahr, einzelne Buchung.
              </p>
            </div>
            <div className="border border-gray-200 bg-gray-50/50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">
                Marina & Yachtclub
              </p>
              <p className="text-[13px] text-gray-600">
                Sammel-Auswasserung im Oktober oder Sammel-Krängung im April für 20–80
                Mitgliedsboote. Saisonvertrag mit Mobilkran-Anbieter, oft Wochenmiete.
              </p>
            </div>
            <div className="border border-gray-200 bg-gray-50/50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">
                Bootshändler & Werft
              </p>
              <p className="text-[13px] text-gray-600">
                Demo-Boot, Verkaufsübergabe oder Reparatur-Annahme. Einzelhübe, oft kurzfristig
                — Vorlaufzeit 1–3 Tage statt der üblichen 2–4 Wochen in Spitzenzeiten.
              </p>
            </div>
          </div>
          <p className="text-[13px] text-gray-500">
            Ein Hafenkran (fester Bootslift) ist bei regelmäßigem Wassergang günstiger, aber an
            den Hafen gebunden. Mobilkran ist flexibler — und in vielen Binnen-Standorten und
            kleinen Marinas die einzige Option.
          </p>
        </section>

        {/* Section 2: Welcher Kran */}
        <section id="krantyp" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            2. Welcher Kran für welches Boot?
          </h2>
          <p className="mb-4">
            Die Krangröße ergibt sich aus <strong className="text-gray-900">Verdrängung
            (Gewicht)</strong> und <strong className="text-gray-900">Reichweite
            (Hub-Auslage)</strong>. Für die Auslage gilt: zwischen Kran-Standort und
            Bootsmittelpunkt müssen 4–8 m frei bleiben — das wirkt sich stark auf die nötige
            Krangröße aus. Hier eine Übersicht für typische Boote:
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50 border-b text-left">
                  <th className="py-3 px-4 font-medium text-gray-900">Boot</th>
                  <th className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">Länge</th>
                  <th className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">Gewicht</th>
                  <th className="py-3 px-4 font-medium text-gray-900">Empfohlener Krantyp</th>
                  <th className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">Einsatzkosten</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Schlauchboot, Jolle, Beiboot</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">bis 5 m</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">bis 1,5 t</td>
                  <td className="py-2.5 px-4"><Link href="/minikran-mieten" className="text-blue-600 hover:underline">Minikran 8–15t</Link></td>
                  <td className="py-2.5 px-4 whitespace-nowrap">200–400€</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Sportboot, kleine Motoryacht</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">5–8 m</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">1,5–3 t</td>
                  <td className="py-2.5 px-4"><Link href="/mobilkran-mieten" className="text-blue-600 hover:underline">Mobilkran 25–35t</Link></td>
                  <td className="py-2.5 px-4 whitespace-nowrap">350–600€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Mittlere Yacht (Segel oder Motor)</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">8–12 m</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">3–7 t</td>
                  <td className="py-2.5 px-4"><Link href="/mobilkran-mieten" className="text-blue-600 hover:underline">Mobilkran 50t</Link></td>
                  <td className="py-2.5 px-4 whitespace-nowrap">500–1.000€</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Große Yacht, Hochseesegler</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">12–16 m</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">7–15 t</td>
                  <td className="py-2.5 px-4"><Link href="/mobilkran-mieten" className="text-blue-600 hover:underline">Mobilkran 80t</Link> oder <Link href="/autokran-mieten" className="text-blue-600 hover:underline">Autokran 100t</Link></td>
                  <td className="py-2.5 px-4 whitespace-nowrap">1.000–2.000€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Schwere Motoryacht / Stahlyacht</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">16–20 m</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">15–25 t</td>
                  <td className="py-2.5 px-4"><Link href="/autokran-mieten" className="text-blue-600 hover:underline">Autokran 100–200t</Link></td>
                  <td className="py-2.5 px-4 whitespace-nowrap">1.500–3.000€</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium text-gray-900">Sondergröße / Sonderform</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">20 m+</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">25 t+</td>
                  <td className="py-2.5 px-4"><Link href="/autokran-mieten" className="text-blue-600 hover:underline">Autokran 200t+</Link> oder <Link href="/raupenkran-mieten" className="text-blue-600 hover:underline">Raupenkran</Link></td>
                  <td className="py-2.5 px-4 whitespace-nowrap">3.000–8.000€</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Einsatzkosten beziehen sich auf einen kurzen Hub (1–3 Stunden) inklusive Kranführer
            und Anfahrt im Umkreis von 30–50 km. Längere Anfahrt schlägt mit 2–4€/km Aufpreis zu
            Buche, längere Standzeit mit 80–150€/Stunde.
          </p>
        </section>

        {/* Section 3: Kosten */}
        <section id="kosten" className="scroll-mt-20 border border-gray-200 rounded-lg p-5 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            3. Kosten nach Bootslänge & Einsatzart
          </h2>
          <p className="mb-4">
            Die Krankosten für einen Boots-Einsatz setzen sich aus drei Teilen zusammen:{' '}
            <strong className="text-gray-900">Anfahrt</strong> (Pauschale 80–250€ je nach Krangröße
            und Entfernung), <strong className="text-gray-900">Standzeit</strong> (1–3 Stunden
            inklusive, jede weitere Stunde 80–150€) und <strong className="text-gray-900">Krantraverse</strong>{' '}
            oder Spezialgurte (80–250€ extra je nach Bootstyp). Hier Richtwerte für die häufigsten
            Szenarien:
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50 border-b text-left">
                  <th className="py-3 px-3 font-medium text-gray-900">Szenario</th>
                  <th className="py-3 px-3 font-medium text-gray-900">Kran</th>
                  <th className="py-3 px-3 font-medium text-gray-900 whitespace-nowrap">Einsatz-Dauer</th>
                  <th className="py-3 px-3 font-medium text-gray-900 whitespace-nowrap">Kran gesamt</th>
                  <th className="py-3 px-3 font-medium text-gray-900 whitespace-nowrap">+ Krantraverse</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b">
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">Sportboot 6 m vom Trailer</td>
                  <td className="py-2.5 px-3">Mobilkran 25t</td>
                  <td className="py-2.5 px-3">1–2 Std.</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">350–550€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">+ 50–80€</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">Yacht 10 m, einzelne Krängung</td>
                  <td className="py-2.5 px-3">Mobilkran 50t</td>
                  <td className="py-2.5 px-3">2–3 Std.</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">600–950€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">+ 80–150€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">Yacht 14 m, einzeln</td>
                  <td className="py-2.5 px-3">Mobilkran 80t</td>
                  <td className="py-2.5 px-3">2–4 Std.</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">1.100–1.800€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">+ 100–200€</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">Yacht 18 m, schwer</td>
                  <td className="py-2.5 px-3">Autokran 100t</td>
                  <td className="py-2.5 px-3">3–5 Std.</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">1.800–3.000€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">+ 150–250€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">Marina Sammel-Auswasserung</td>
                  <td className="py-2.5 px-3">Mobilkran 50t</td>
                  <td className="py-2.5 px-3">Wochenmiete</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">2.500–5.000€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">inkl.</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">Marina Saisonvertrag (Frühjahr+Herbst)</td>
                  <td className="py-2.5 px-3">Mobilkran 50–80t</td>
                  <td className="py-2.5 px-3">2× Wochenmiete</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">4.500–9.000€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">inkl.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-3">
            Alle Preise netto, Richtwerte für Standard-Anfahrt 30–50 km. Bei Anfahrten über 80 km,
            Wochenend-Einsätzen oder Sondergurten für rahmenfreie Yachten können die Kosten 20–50%
            höher liegen. Wochen- und Saisonverträge mit der Marina sind 20–35% günstiger als die
            Summe der Einzelhübe.
          </p>
          <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-[13px] text-gray-700">
              <strong className="text-gray-900">Faustregel:</strong> Für eine 10-m-Yacht, die jährlich
              zweimal gekrant wird (Krängung + Auswasserung), zahlen Sie bei Einzelbuchung 1.200–1.900€
              pro Jahr. Marinas mit Saisonvertrag verlangen oft 600–1.000€ pro Boot — bei
              regelmäßigem Bedarf rechnet sich der Marina-Vertrag fast immer.
            </p>
          </div>
          <div className="mt-3 bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-[13px] text-gray-700 mb-2">
              <strong className="text-gray-900">Regionaler Hinweis Bodensee &amp; Binnen-Yacht:</strong>{' '}
              Am Bodensee, an der Müritz und in Bayern haben Marinas und Yachtclubs oft eigene
              Saison-Verträge mit lokalen Kran-Anbietern — die Wochen-Pauschale liegt dort 25–40%
              unter Einzelhub-Preisen aus Großstädten. Der Mobilkran-Stundensatz inklusive Kranführer
              startet im Süden in ländlichen Regionen bei rund 80–120€/Std., in Berlin und München
              eher bei 120–180€/Std.
            </p>
            <p className="text-[13px] text-gray-700">
              Anbieter in Ihrer Nähe finden Sie über die Übersicht{' '}
              <Link href="/mobilkran-mieten" className="text-blue-600 hover:underline">
                Mobilkran mieten
              </Link>{' '}
              oder{' '}
              <Link href="/autokran-mieten" className="text-blue-600 hover:underline">
                Autokran mieten
              </Link>{' '}
              — beide Listen lassen sich nach Region filtern.
            </p>
          </div>
        </section>

        {/* Section 4: Einsatzplanung & Wetter */}
        <section id="planung" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            4. Einsatzplanung & Wetter
          </h2>
          <p className="mb-4">
            Ein Boots-Hub dauert in der Regel 1–4 Stunden, je nach Bootsgröße und Zugänglichkeit.
            Der eigentliche Hub (Anschlagen → Anheben → Transfer → Absetzen) ist nach 15–30 Minuten
            erledigt — der Rest sind Vorbereitung, Boot trimmen, Mast und Takelage prüfen,
            Fender und Schutzpolster montieren. Hier die typischen Einsatzdauern:
          </p>
          <div className="space-y-3 mb-5">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Sportboot bis 8 m vom Trailer</p>
              <p className="text-[13px] text-gray-500">
                <strong>Dauer:</strong> 1–2 Stunden. Boot rollt auf Trailer ans Wasser, Kran hebt
                vom Trailer, schwenkt 5–10 m und setzt im Wasser ab. Aufwand minimal.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Yacht 8–12 m, einzelner Hub</p>
              <p className="text-[13px] text-gray-500">
                <strong>Dauer:</strong> 2–3 Stunden inklusive Vorbereitung. Mast meist demontiert
                (außer bei rotierendem Kran mit hoher Auslage), Hebegurte mit Filz oder
                Krantraverse anschlagen, Boot über Bordwand-Schutzpolster heben.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Yacht 12–16 m, Hochsee</p>
              <p className="text-[13px] text-gray-500">
                <strong>Dauer:</strong> 3–4 Stunden. Krantraverse zwingend, Mast oft separat per
                Kleinkran demontiert, Bord-Anschlagpunkte vorher prüfen. Großyachten haben oft
                eingebaute Hub-Augen, die deutlich sicherer sind als Bordwand-Hebegurte.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Marina Sammel-Aktion</p>
              <p className="text-[13px] text-gray-500">
                <strong>Dauer:</strong> 4–7 Tage Wochenmiete für 30–60 Boote. Reihenfolge nach
                Bootsgröße planen — leichte Boote zuerst, schwere zuletzt — und Pufferzeit für
                Wetter einbauen. Pro Tag schaffen Sie 8–14 Boote, je nach Bootsgröße und Hafen-Layout.
              </p>
            </div>
          </div>

          <p className="mb-3">
            Wetter ist beim Boots-Hub kritischer als bei Land-Einsätzen, weil Wind das hängende
            Boot in Schwingung bringt:
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50 border-b text-left">
                  <th className="py-3 px-4 font-medium text-gray-900">Faktor</th>
                  <th className="py-3 px-4 font-medium text-gray-900">Kritische Grenze</th>
                  <th className="py-3 px-4 font-medium text-gray-900">Auswirkung</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Windgeschwindigkeit</td>
                  <td className="py-2.5 px-4">&gt; 30 km/h</td>
                  <td className="py-2.5 px-4 text-gray-500">Boot pendelt zu stark, Kranarbeit eingestellt</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Wellengang am Wasser</td>
                  <td className="py-2.5 px-4">&gt; 0,5 m</td>
                  <td className="py-2.5 px-4 text-gray-500">Absetzen ins Wasser zu unkontrolliert</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Frost</td>
                  <td className="py-2.5 px-4">&lt; −5°C</td>
                  <td className="py-2.5 px-4 text-gray-500">Gel-Coat sprödet, Risiko von Stoßschäden</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Eis im Hafenbecken</td>
                  <td className="py-2.5 px-4">jede Schicht</td>
                  <td className="py-2.5 px-4 text-gray-500">Absetzen ins Wasser nicht möglich, Hub verschoben</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium text-gray-900">Gewitter</td>
                  <td className="py-2.5 px-4">Blitzgefahr</td>
                  <td className="py-2.5 px-4 text-gray-500">Sofort einstellen, Kran absenken, Boot sichern</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Spezialausrüstung */}
        <section id="ausruestung" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            5. Krantraverse & Spezialgurte
          </h2>
          <p className="mb-4">
            Ein Boot direkt mit zwei Hebegurten anzuschlagen, funktioniert nur bei robusten Sport-
            und Schlauchbooten. Für Yachten ist eine <strong className="text-gray-900">Krantraverse
            (Spreizbalken)</strong> oder ein passendes Hebegeschirr Pflicht — sonst drücken die
            Gurte die Bordwände ein. Hier die wichtigsten Optionen:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Krantraverse (Spreizbalken)</p>
              <p className="text-[13px] text-gray-500 mb-1">
                Stahl- oder Aluminiumbalken, der die zwei Hebegurte parallel hält und damit den
                Druck auf die Bordwände vermeidet. Standard für Yachten ab 8 m. Wird meist vom
                Kranvermieter mitgebracht oder über Marina-Lager.
              </p>
              <p className="text-[11px] text-gray-400">Aufpreis: 80–250€ pro Einsatz</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Hebegurte mit Filz / Schutzpolster</p>
              <p className="text-[13px] text-gray-500 mb-1">
                Standard-Polyestergurte mit Filz- oder Gummiauflage an den Auflagepunkten. Schützen
                Gel-Coat und Lackierung vor Druck- und Reibspuren. Bei seriösen Vermietern Standard,
                bei einzelnen Anbietern als Sonderzubehör.
              </p>
              <p className="text-[11px] text-gray-400">Aufpreis: meist keiner, sonst 30–60€</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Kettengeschirr für Kielyacht</p>
              <p className="text-[13px] text-gray-500 mb-1">
                Bei Yachten mit langem Tiefkiel (Hochsee-Segler) reichen Bordwandgurte oft nicht.
                Spezielles Kettengeschirr, das den Kiel umschließt und den Hub-Schwerpunkt
                trifft. Vorab mit dem Kran-Anbieter prüfen.
              </p>
              <p className="text-[11px] text-gray-400">Aufpreis: 100–200€</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Fender-Schutzpolster (Bordwand)</p>
              <p className="text-[13px] text-gray-500 mb-1">
                Aufblasbare oder Schaumstoff-Polster, die zwischen Hebegurt und Bordwand liegen.
                Verteilen den Anpressdruck und verhindern Druckstellen am Gel-Coat. Bei Yachten
                mit empfindlicher Lackierung oder Holz-Bordwand sehr empfehlenswert.
              </p>
              <p className="text-[11px] text-gray-400">Aufpreis: 30–80€</p>
            </div>
          </div>
          <div className="mt-4 bg-amber-50 border border-amber-100 rounded-lg p-4">
            <p className="text-[13px] text-amber-800">
              <strong>Wichtig:</strong> Vor der Buchung prüfen, ob der Kran-Anbieter Krantraverse
              und passende Spezialgurte für Ihre Bootsklasse vorrätig hat. Manche kleinen Anbieter
              haben nur Standard-Hebegurte — bei einer 12-m-Yacht ist das ein Schaden-Risiko.
            </p>
          </div>
        </section>

        {/* Section 6: Saison */}
        <section id="saison" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            6. Saison-Timing: Krängung & Auswasserung
          </h2>
          <p className="mb-4">
            Die Boots-Saison hat zwei Spitzen, in denen Kran-Anbieter monatelang ausgebucht
            sind: <strong className="text-gray-900">Krängung im April–Mai</strong> (Boote zurück
            ins Wasser) und <strong className="text-gray-900">Auswasserung im Oktober–November</strong>{' '}
            (Boote ins Winterlager). Wer in diesen Wochen kurzfristig einen Kran braucht, zahlt
            entweder Aufpreis oder findet keinen Termin.
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-lg mb-4">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50 border-b text-left">
                  <th className="py-3 px-4 font-medium text-gray-900">Zeitraum</th>
                  <th className="py-3 px-4 font-medium text-gray-900">Saison-Status</th>
                  <th className="py-3 px-4 font-medium text-gray-900">Empfohlener Vorlauf</th>
                  <th className="py-3 px-4 font-medium text-gray-900">Preisniveau</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">März bis Mitte April</td>
                  <td className="py-2.5 px-4">Vorsaison Krängung</td>
                  <td className="py-2.5 px-4">2–3 Wochen</td>
                  <td className="py-2.5 px-4 text-gray-500">Standard</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Mitte April – Mitte Mai</td>
                  <td className="py-2.5 px-4 text-amber-700">Krängungs-Spitze</td>
                  <td className="py-2.5 px-4">4–6 Wochen</td>
                  <td className="py-2.5 px-4 text-amber-700">+10–25%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Juni – August</td>
                  <td className="py-2.5 px-4">Sommer-Hauptsaison</td>
                  <td className="py-2.5 px-4">1–2 Wochen</td>
                  <td className="py-2.5 px-4 text-gray-500">Standard</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-4 font-medium text-gray-900">September</td>
                  <td className="py-2.5 px-4">Vorsaison Auswasserung</td>
                  <td className="py-2.5 px-4">2–3 Wochen</td>
                  <td className="py-2.5 px-4 text-gray-500">Standard</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Oktober – Mitte November</td>
                  <td className="py-2.5 px-4 text-amber-700">Auswasserungs-Spitze</td>
                  <td className="py-2.5 px-4">4–6 Wochen</td>
                  <td className="py-2.5 px-4 text-amber-700">+10–25%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium text-gray-900">Mitte November – Februar</td>
                  <td className="py-2.5 px-4">Winterpause (nur Sondereinsätze)</td>
                  <td className="py-2.5 px-4">3–7 Tage</td>
                  <td className="py-2.5 px-4 text-gray-500">Standard, Wetter-Risiko</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-[13px] text-gray-700">
              <strong className="text-gray-900">Tipp:</strong> Ihre Marina hat in der Spitzenzeit oft
              Vorrang bei den Stamm-Kranfirmen. Wenn Sie als Privatperson außerhalb einer Marina
              kranen, fragen Sie schon im Februar (für Krängung) bzw. August (für Auswasserung) den
              Kran-Anbieter an. Spätbuchung kostet im April und Oktober nicht nur Geld, sondern
              auch eine Woche Wartezeit.
            </p>
          </div>
        </section>

        {/* Section 7: Genehmigungen */}
        <section id="genehmigungen" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            7. Genehmigungen & Versicherung
          </h2>
          <p className="mb-4">
            Bei einem Boots-Hub geht es um drei Genehmigungs- und Haftungsebenen: Stellplatz für
            den Kran, Wasser-Zugang am Hub-Punkt und Versicherung für mögliche Schäden am Boot.
          </p>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Marina-Genehmigung</p>
              <p className="text-[13px] text-gray-500">
                Bei einer Marina ist die Stellplatz-Frage in der Regel über das Hafenamt geregelt —
                die Marina koordiniert Kran-Standort und Hub-Reihenfolge. Wenn Sie als Privatperson
                an einer fremden Marina kranen wollen, brauchen Sie meist eine Gastnutzungs-Erlaubnis
                (50–150€) und Termin-Abstimmung mit dem Hafenmeister.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Bundeswasserstraße / öffentliches Gewässer</p>
              <p className="text-[13px] text-gray-500">
                An einer Bundeswasserstraße (Rhein, Donau, Elbe, Mittellandkanal etc.) ist das
                Wasser- und Schifffahrtsamt zuständig. Hub von oder ins Wasser braucht eine
                Genehmigung (Antrag 2–4 Wochen vorher, Gebühr 50–200€). An Binnenseen unter
                Landesverwaltung gilt das jeweilige Wassergesetz des Bundeslandes.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Privates Grundstück / eigener Garten</p>
              <p className="text-[13px] text-gray-500">
                Steht der Kran auf eigenem Grundstück und das Boot wird zwischen Trailer und einem
                Privatgewässer (Teich, kleiner Privat-See, eigener Steg) bewegt, brauchen Sie keine
                behördliche Genehmigung. Prüfen Sie nur Bodenbelastbarkeit (12–20 t/m²) und
                eventuelle Nachbargrundstücke beim Schwenkradius.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Versicherung — Hub-Klausel prüfen</p>
              <p className="text-[13px] text-gray-500">
                Der Kranbetreiber haftet für Bedienungsfehler über seine Betriebshaftpflicht.
                Schäden am Boot durch konstruktive Schwächen (Bordwand-Risse, Kiel-Brüche bei
                falschem Anschlag) deckt das nicht. Prüfen Sie Ihre Yacht-Kasko: Hub-Schäden sind
                bei vielen Standardpolicen ausgeschlossen, aber gegen Aufpreis (50–150€/Saison)
                erweiterbar. Bei Yachten ab 100.000€ Wert ist die Erweiterung praktisch Pflicht.
              </p>
            </div>
          </div>
          <p className="text-[13px] text-gray-500 mt-3">
            Detaillierte Hinweise zu allen Stellplatz- und Schwenk-Genehmigungen bei
            Land-Einsätzen:{' '}
            <Link href="/ratgeber/kran-aufstellen-genehmigung" className="text-blue-600 hover:underline">
              Kran aufstellen: Genehmigungen im Detail &rarr;
            </Link>
          </p>
        </section>

        {/* Section 8: 5 Tipps */}
        <section id="tipps" className="scroll-mt-20 border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            8. 5 Tipps für Bootseigner & Marinas
          </h2>
          <ol className="space-y-3 text-[14px]">
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">1</span>
              <div>
                <p className="font-medium text-gray-900">Bootslänge & Verdrängung exakt angeben — nicht Werft-Schätzung</p>
                <p className="text-[13px] text-gray-500">
                  Eine 10-m-Yacht kann zwischen 3,5 t und 8 t wiegen, je nach Bauart. Der Kran-Anbieter
                  braucht das echte Gewicht aus den Schiffspapieren, nicht eine ungefähre Hersteller-Angabe.
                  Falsche Angabe um 1–2 t kann den Hub kippen.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">2</span>
              <div>
                <p className="font-medium text-gray-900">Krantraverse für Yachten ab 8 m fest mit einplanen</p>
                <p className="text-[13px] text-gray-500">
                  Direkter Bordwand-Kontakt mit Hebegurten verbiegt die Bordwand und beschädigt
                  Gel-Coat. 80–150€ Aufpreis für die Krantraverse sind im Vergleich zu einer
                  Lackierung-Reparatur (1.500–4.000€) trivial.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">3</span>
              <div>
                <p className="font-medium text-gray-900">Saison-Vertrag mit Marina-affiliiertem Kran-Anbieter</p>
                <p className="text-[13px] text-gray-500">
                  Bei zwei Hüben pro Jahr (Krängung + Auswasserung) sparen Sie mit Marina-Saisonvertrag
                  meist 20–30% gegenüber zwei Einzelbuchungen. Außerdem haben Marina-Stammkunden in
                  der Spitzensaison Termin-Vorrang.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">4</span>
              <div>
                <p className="font-medium text-gray-900">Wetter-Puffer in der Saison einplanen</p>
                <p className="text-[13px] text-gray-500">
                  Wind über 30 km/h stoppt jeden Boots-Hub. In der Krängungs- und Auswasserungs-Spitze
                  gibt es im April und Oktober im Schnitt 2–4 Tage pro Woche, an denen das Wetter
                  zu schlecht ist. Buchen Sie 2–3 Tage Puffer ein und einigen Sie sich vor dem
                  Termin auf eine Wetter-Klausel.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">5</span>
              <div>
                <p className="font-medium text-gray-900">Foto-Dokumentation vor und nach dem Hub</p>
                <p className="text-[13px] text-gray-500">
                  Fotografieren Sie den Bootszustand (Bordwand, Kiel, Beschläge) vor dem Hub und
                  direkt nach dem Absetzen. Bei Reklamationen ist die Beweislast eindeutig — und
                  bei seriösen Anbietern erleichtert das die Schadensregulierung. Auf eigene Faust
                  oder mit Marina-Personal als Zeuge.
                </p>
              </div>
            </li>
          </ol>
        </section>

        {/* Section 9: FAQ */}
        <section id="faq" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            9. Häufige Fragen zur Bootskran-Miete
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-gray-200 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-[14px] font-medium text-gray-900 select-none">
                  {faq.question}
                  <svg className="w-4 h-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <p className="px-5 pb-4 text-[14px] text-gray-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

      </div>

      {/* CTA */}
      <section className="mt-10 bg-blue-50 border border-blue-100 rounded-xl p-6 sm:p-8 text-center mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Kran für Ihren Boots-Hub finden
        </h2>
        <p className="text-[14px] text-gray-500 mb-5 max-w-lg mx-auto">
          Vergleichen Sie {anbieterCount}+ Kranvermieter in {COUNTRY_LABEL} — Mobilkran für
          Standard-Yachten, Autokran für schwere Hochsee-Boote. Kostenlos Angebote bei mehreren
          Anbietern gleichzeitig anfragen.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          <Link href="/mobilkran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Mobilkran mieten</Link>
          <Link href="/autokran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Autokran mieten</Link>
          <Link href="/minikran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Minikran mieten</Link>
          <Link href="/raupenkran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Raupenkran mieten</Link>
        </div>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-semibold rounded-md transition-colors"
        >
          Jetzt {anbieterCount}+ Anbieter vergleichen
        </Link>
        <p className="text-[12px] text-gray-400 mt-3">Kostenlos &amp; unverbindlich.</p>
      </section>

      {/* Weiterführende Ratgeber */}
      <section className="mt-10">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Weiterführende Ratgeber</h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/mobilkran-mieten#ratgeber" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Mobilkran Kosten &amp; Tipps</Link>
          <Link href="/autokran-mieten#ratgeber" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Autokran Kosten im Detail</Link>
          <Link href="/kran-mieten-preise" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Alle Mietpreise im Überblick</Link>
          <Link href="/ratgeber/kran-aufstellen-genehmigung" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Kran-Genehmigungen</Link>
          <Link href="/ratgeber/krantypen" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Alle Krantypen im Vergleich</Link>
          <Link href="/ratgeber/welchen-kran-brauche-ich" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Welcher Kran für welches Projekt?</Link>
          <Link href="/kostenrechner" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Kostenrechner</Link>
        </div>
      </section>

      {/* Structured data — FAQPage + Article + BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Bootskran mieten: Yacht & Segelboot heben (Bootskran-Guide 2026)',
            description:
              'Yacht oder Segelboot kranen: Mobilkran 50t ab 600€/Einsatz, Autokran 100t für schwere Boote ab 1.200€. Kosten nach Bootslänge, Krantraverse, Saison-Vorlauf und Anbieter im Vergleich.',
            author: { '@type': 'Organization', name: BRAND_NAME, url: BASE_URL },
            datePublished: '2026-05-06',
            dateModified: '2026-05-06',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://kranvergleich.de/' },
              { '@type': 'ListItem', position: 2, name: 'Ratgeber', item: 'https://kranvergleich.de/ratgeber' },
              { '@type': 'ListItem', position: 3, name: 'Bootskran mieten' },
            ],
          }),
        }}
      />
    </div>
  )
}
