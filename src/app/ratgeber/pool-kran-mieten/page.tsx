import type { Metadata } from 'next'
import Link from 'next/link'
import { getSiteStats } from '@/lib/queries'
import { COUNTRY_LABEL, BRAND_NAME, BASE_URL } from '@/lib/country'
import { alternatesFor } from '@/lib/alternates'
import { OG_IMAGE } from '@/lib/og-image'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Pool mit Kran über Haus heben: Kosten & Anbieter 2026 | GFK-Pool',
  description:
    'GFK-Pool oder Fertigpool in den Garten heben: Mobilkran 50t ab 700€, bei großer Auslage Autokran ab 1.200€. Krangröße ergibt sich aus Reichweite, nicht nur aus Pool-Gewicht.',
  alternates: alternatesFor('/ratgeber/pool-kran-mieten'),
  openGraph: {
    title: 'Pool mit Kran über Haus heben: Kosten & Anbieter 2026',
    description:
      'GFK-Pool oder Fertigpool in den Garten heben: Mobilkran 50t ab 700€, bei großer Auslage Autokran ab 1.200€. Krangröße ergibt sich aus Reichweite, nicht nur aus Pool-Gewicht.',
    type: 'article',
    url: '/ratgeber/pool-kran-mieten',
      images: [OG_IMAGE],
  },
}

const faqs = [
  {
    question: 'Was kostet ein Kran für einen GFK-Pool über das Haus?',
    answer:
      'Für einen Standard-GFK-Pool 6×3 m (rund 1,5 t) über ein Einfamilienhaus mit normaler Front (8–10 m Auslage) zahlen Sie 600–1.000€ für einen Mobilkran 35–50t. Bei einem 8×4-m-Pool (2,5–3,5 t) und großem Haus mit weiter Auslage sind 1.000–1.800€ realistisch, dann oft Mobilkran 80t oder Autokran 100t. Der Preis hängt überraschend wenig vom Pool-Gewicht ab und stärker von der Reichweite, die der Kran über Haus oder Garage haben muss.',
  },
  {
    question: 'Welche Krangröße brauche ich für einen 8×4-m-Pool?',
    answer:
      'Ein 8×4-m-GFK-Pool wiegt rund 2,5–3,5 t, das schafft theoretisch jeder Mobilkran ab 25t. Entscheidend ist aber nicht das Gewicht, sondern die Auslage: bei einem Standard-Einfamilienhaus mit 10 m Hausbreite und 4 m Tiefgarten brauchen Sie mindestens 14–16 m Reichweite. Dafür sind Mobilkran 50t (Reichweite bis 18 m) oder bei sehr großen Häusern Mobilkran 80t (Reichweite bis 24 m) die richtigen Größen. Pool-Lieferanten geben Ihnen nach Hausplan-Foto in der Regel binnen 24h eine konkrete Empfehlung.',
  },
  {
    question: 'Kann ich den Pool ohne Kran in den Garten bekommen?',
    answer:
      'In den meisten Fällen nein. Ein GFK-Pool ist ein einteiliges Bauteil mit 5–9 m Länge, der passt durch keine Standard-Gartenpforte und nicht durch eine Doppelgarage (max. 4–5 m). Ausnahmen sind: (1) sehr kleine Becken bis 4 m Länge, die durch eine 1,5-m-Gartenpforte schräg durchgeschoben werden können, (2) Eckgrundstücke mit befahrbarem Seitenstreifen, (3) Doppelhäuser mit gemeinsamer Hofeinfahrt. Bei klassischer Reihenhaus- oder EFH-Lage ist der Hub über das Haus die einzige sinnvolle Option. Stahlwand-Aufstellpools können Sie zerlegt anliefern und ohne Kran installieren, aber das ist ein anderes Produkt.',
  },
  {
    question: 'Wie lange dauert der Pool-Hub?',
    answer:
      'Der reine Hub (Pool-Anschlagen  Anheben  Schwenk über Haus  Absetzen in vorbereiteter Baugrube) dauert meist 30–60 Minuten. Mit Vorbereitung, Krantraverse anlegen, Pool absichern und Aufstellplatz prüfen rechnen Sie 1,5–3 Stunden Gesamteinsatz. Der Tag ist damit aber nicht „voll", der Kran ist meist nur einen halben Tag gebucht (3–4 Stunden). Pool-Lieferung und Hub erfolgen oft am gleichen Tag, der Pool wird also direkt vom LKW abgehoben und in die Grube gesetzt.',
  },
  {
    question: 'Brauche ich eine Genehmigung für den Kran-Einsatz?',
    answer:
      'Wenn der Kran komplett auf Ihrem Grundstück steht (Einfahrt, Vorgarten), brauchen Sie keine behördliche Genehmigung. Steht der Kran auf öffentlichem Grund (Bürgersteig, Straße, Parkfläche), brauchen Sie eine Sondernutzungserlaubnis vom Ordnungsamt. Kosten 50–200€, Bearbeitungszeit 1–3 Wochen. Wichtig: Schwenkt der Kranausleger über ein Nachbargrundstück (auch nur kurz mit dem Pool als Last), brauchen Sie die schriftliche Zustimmung des Nachbarn. Sprechen Sie das spätestens 2–3 Wochen vorher an. Für den Pool selbst kann je nach Bundesland und Beckengröße eine Baugenehmigung nötig sein, das klären Sie separat mit Ihrer Gemeinde.',
  },
  {
    question: 'Pool-Lieferung mit Kran, wer organisiert was?',
    answer:
      'In der Praxis gibt es zwei Modelle: (1) Komplettpaket vom Pool-Lieferanten, der Händler liefert per LKW, organisiert Kran und Kranführer, übernimmt Hub und Absetzen in die Baugrube. Sie bezahlen Pool plus Hub-Pauschale (300–800€) im Paket. (2) Trennung. Sie kaufen den Pool, bestellen den Kran selbst über einen lokalen Kran-Anbieter und koordinieren Liefertermin und Hub-Termin synchron. Variante 2 ist bei Standard-Pools meist 100–300€ günstiger, bei Spezial-Konstruktionen lohnt sich aber das Komplettpaket, der Lieferant kennt die Anschlagpunkte und das Hub-Schwerpunkt-Verhalten seines Produkts.',
  },
]

export default async function PoolKranMietenPage() {
  const { anbieterCount } = await getSiteStats()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/ratgeber" className="hover:text-gray-600">Ratgeber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Pool mit Kran heben</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Pool mit Kran über das Haus heben
        <span className="block text-gray-500 text-[18px] lg:text-xl font-normal mt-1">
          GFK-Pool & Fertigpool Kran-Guide 2026
        </span>
      </h1>
      <p className="text-[15px] text-gray-500 mb-4 max-w-3xl">
        Ein GFK-Pool 6×3 m wiegt rund 1,5 t, die Krangröße bestimmt aber nicht das Gewicht,
        sondern die <strong className="text-gray-900">Reichweite</strong>, mit der der Kran
        über Haus oder Garage in den Garten schwenken muss. Für ein Standard-Einfamilienhaus
        reicht meist ein <strong className="text-gray-900">Mobilkran 50t ab 700€</strong>, bei
        weiter Auslage oder großen Pools brauchen Sie einen{' '}
        <strong className="text-gray-900">Mobilkran 80t oder Autokran 100t ab 1.200€</strong>.
      </p>
      <p className="text-[11px] text-gray-300 mb-8">Stand: Mai 2026 · Alle Preise netto, Richtwerte</p>

      {/* TOC */}
      <nav className="mb-8 border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-medium text-gray-900 mb-2">Inhalt</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          <li><a href="#einstieg" className="text-[13px] text-blue-600 hover:underline">1. Warum braucht ein Pool einen Kran?</a></li>
          <li><a href="#krantyp" className="text-[13px] text-blue-600 hover:underline">2. Auslage entscheidet, nicht das Gewicht</a></li>
          <li><a href="#kosten" className="text-[13px] text-blue-600 hover:underline">3. Kosten nach Pool-Größe & Hauslage</a></li>
          <li><a href="#planung" className="text-[13px] text-blue-600 hover:underline">4. Einsatzplanung &amp; Vorbereitung</a></li>
          <li><a href="#ausruestung" className="text-[13px] text-blue-600 hover:underline">5. Krantraverse &amp; Hebegurte</a></li>
          <li><a href="#timing" className="text-[13px] text-blue-600 hover:underline">6. Timing &amp; Wetter-Faktoren</a></li>
          <li><a href="#genehmigungen" className="text-[13px] text-blue-600 hover:underline">7. Genehmigungen für Kran &amp; Pool</a></li>
          <li><a href="#tipps" className="text-[13px] text-blue-600 hover:underline">8. 5 Tipps für Pool-Bauherren</a></li>
          <li><a href="#faq" className="text-[13px] text-blue-600 hover:underline">9. Häufige Fragen</a></li>
        </ul>
      </nav>

      <div className="space-y-10 text-[14px] text-gray-600 leading-relaxed">

        {/* Section 1: Einstieg */}
        <section id="einstieg" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            1. Warum braucht ein Pool einen Kran?
          </h2>
          <p className="mb-3">
            Ein GFK-Pool oder Fertigpool kommt in einem Stück auf einem LKW, typische Längen
            zwischen <strong className="text-gray-900">5 und 9 Metern</strong>, Tiefe meist
            1,2–1,5 m. Diese Maße passen weder durch eine Gartenpforte noch durch eine Doppelgarage.
            Der Pool muss also <strong className="text-gray-900">über das Haus oder über das
            Nachbargrundstück</strong> in den Garten gehoben werden, und dafür brauchen Sie
            einen Mobilkran oder Autokran.
          </p>
          <p className="mb-4">
            Drei Pool-Typen kommen in {COUNTRY_LABEL} regelmäßig per Kran:
          </p>
          <div className="grid gap-3 sm:grid-cols-3 mb-4">
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">
                GFK-Pool / Glasfaserpool
              </p>
              <p className="text-[13px] text-gray-600">
                Der häufigste Fall. Einteiliges GFK-Becken, 5–9 m Länge, 0,5–3,5 t Gewicht.
                Wird zu 90% per Kran in den Garten gehoben, passt sonst durch keinen
                normalen Hauseingang.
              </p>
            </div>
            <div className="border border-gray-200 bg-gray-50/50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">
                Edelstahl-Pool / Premium-Becken
              </p>
              <p className="text-[13px] text-gray-600">
                Hochwertige Variante, ähnliche Maße wie GFK aber meist schwerer (1–4 t).
                Hub identisch zum GFK, Krangröße bleibt nahezu gleich.
              </p>
            </div>
            <div className="border border-gray-200 bg-gray-50/50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">
                Beton-Pool (Fertigteil)
              </p>
              <p className="text-[13px] text-gray-600">
                Vorgefertigter Beton-Kern, deutlich schwerer (3–10 t). Braucht Mobilkran ab 50t
                oder Autokran. Bei Standard-EFH oft Autokran 100t Pflicht.
              </p>
            </div>
          </div>
          <p className="text-[13px] text-gray-500">
            Stahlwand-Aufstellpools (Quick-Up, Frame-Pool) sind ein anderes Produkt, die werden
            zerlegt geliefert und vor Ort aufgebaut. Kein Kran nötig, aber auch nicht im
            Boden eingelassen. Wer einen festen, eingelassenen Pool will, kommt am Kran nicht
            vorbei.
          </p>
        </section>

        {/* Section 2: Welcher Kran (Auslage > Gewicht) */}
        <section id="krantyp" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            2. Auslage entscheidet, nicht das Gewicht
          </h2>
          <p className="mb-3">
            Das ist der wichtigste Punkt beim Pool-Hub und wird oft falsch eingeschätzt: ein
            1,5-t-Pool über ein 10 m breites Haus zu heben braucht nicht den{' '}
            <em>kleinsten</em> Kran, der 1,5 t schafft, sondern den, der mit dieser Last die
            <strong className="text-gray-900"> Reichweite</strong> bedient. Krane verlieren bei
            steigender Auslage massiv an Tragkraft, ein Mobilkran 25t kann am Standfuß 25 t
            heben, aber bei 14 m Reichweite nur noch 1,5–2 t.
          </p>
          <p className="mb-4">
            Hier eine Übersicht für typische Pool-Größen über typische Häuser:
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50 border-b text-left">
                  <th className="py-3 px-4 font-medium text-gray-900">Pool</th>
                  <th className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">Gewicht</th>
                  <th className="py-3 px-4 font-medium text-gray-900">Hauslage</th>
                  <th className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">Auslage</th>
                  <th className="py-3 px-4 font-medium text-gray-900">Krantyp</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">GFK 5×3 m</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">0,8–1,2 t</td>
                  <td className="py-2.5 px-4">EFH 8 m, kleiner Garten</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">10–12 m</td>
                  <td className="py-2.5 px-4"><Link href="/mobilkran-mieten" className="text-blue-600 hover:underline">Mobilkran 35t</Link></td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-4 font-medium text-gray-900">GFK 6×3 m</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">1,2–1,8 t</td>
                  <td className="py-2.5 px-4">EFH 10 m, Standard-Garten</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">14 m</td>
                  <td className="py-2.5 px-4"><Link href="/mobilkran-mieten" className="text-blue-600 hover:underline">Mobilkran 50t</Link></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">GFK 7×3,5 m</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">1,8–2,5 t</td>
                  <td className="py-2.5 px-4">EFH 10–12 m</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">16 m</td>
                  <td className="py-2.5 px-4"><Link href="/mobilkran-mieten" className="text-blue-600 hover:underline">Mobilkran 50t</Link></td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-4 font-medium text-gray-900">GFK 8×4 m</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">2,5–3,5 t</td>
                  <td className="py-2.5 px-4">EFH 10–12 m</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">16–18 m</td>
                  <td className="py-2.5 px-4"><Link href="/mobilkran-mieten" className="text-blue-600 hover:underline">Mobilkran 80t</Link></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">GFK 9×4 m</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">3–4,5 t</td>
                  <td className="py-2.5 px-4">großes EFH oder MFH</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">18–22 m</td>
                  <td className="py-2.5 px-4"><Link href="/autokran-mieten" className="text-blue-600 hover:underline">Autokran 100t</Link></td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium text-gray-900">Beton-Pool 8×4 m</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">5–8 t</td>
                  <td className="py-2.5 px-4">EFH-Lage variabel</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">14–20 m</td>
                  <td className="py-2.5 px-4"><Link href="/autokran-mieten" className="text-blue-600 hover:underline">Autokran 100–200t</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Auslage = horizontale Reichweite zwischen Kran-Standfuß und Pool-Endposition. Sie
            ergibt sich aus Stellplatz vor dem Haus + Hausbreite + Tiefgarten bis zur Pool-Mitte.
            Faustregel: Hausbreite × 1,2 + Tiefgarten = Mindest-Auslage.
          </p>
          <div className="mt-4 bg-amber-50 border border-amber-100 rounded-lg p-4">
            <p className="text-[13px] text-amber-800">
              <strong>Häufiger Fehler:</strong> „Mein Pool wiegt nur 1,5 t, da reicht ein 25t-Kran."
              Falsch, bei 14 m Reichweite kann der 25t-Kran nur noch 1,5 t heben. Mit Sicherheits-Reserve
              brauchen Sie meist die nächst-größere Klasse (50t). Der Pool-Lieferant rechnet das in
              der Regel korrekt durch, fragen Sie vor der Bestellung explizit nach der empfohlenen Krangröße.
            </p>
          </div>
        </section>

        {/* Section 3: Kosten */}
        <section id="kosten" className="scroll-mt-20 border border-gray-200 rounded-lg p-5 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            3. Kosten nach Pool-Größe & Hauslage
          </h2>
          <p className="mb-4">
            Die Krankosten setzen sich aus drei Teilen zusammen: <strong className="text-gray-900">Anfahrtspauschale</strong>{' '}
            (100–250€ je nach Krangröße und Entfernung), <strong className="text-gray-900">Einsatzzeit</strong>{' '}
            (1,5–3 Stunden inklusive, weitere Stunde 80–150€) und <strong className="text-gray-900">Krantraverse
            oder Spezialgurte</strong> (50–150€ extra für Pool-Hub). Hier Richtwerte für die
            häufigsten Szenarien:
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50 border-b text-left">
                  <th className="py-3 px-3 font-medium text-gray-900">Szenario</th>
                  <th className="py-3 px-3 font-medium text-gray-900">Krantyp</th>
                  <th className="py-3 px-3 font-medium text-gray-900 whitespace-nowrap">Einsatz</th>
                  <th className="py-3 px-3 font-medium text-gray-900 whitespace-nowrap">Kran gesamt</th>
                  <th className="py-3 px-3 font-medium text-gray-900 whitespace-nowrap">Mit Krantraverse</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b">
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">5×3 Pool, kleines EFH</td>
                  <td className="py-2.5 px-3">Mobilkran 35t</td>
                  <td className="py-2.5 px-3">2 Std.</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">450–700€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">+ 50–100€</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">6×3 Pool, Standard-EFH</td>
                  <td className="py-2.5 px-3">Mobilkran 50t</td>
                  <td className="py-2.5 px-3">2–3 Std.</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">700–1.100€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">+ 80–120€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">7×3,5 Pool, EFH</td>
                  <td className="py-2.5 px-3">Mobilkran 50t</td>
                  <td className="py-2.5 px-3">2–3 Std.</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">800–1.200€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">+ 100–150€</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">8×4 Pool, EFH</td>
                  <td className="py-2.5 px-3">Mobilkran 80t</td>
                  <td className="py-2.5 px-3">2–3 Std.</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">1.000–1.500€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">+ 100–150€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">9×4 Pool, weite Auslage</td>
                  <td className="py-2.5 px-3">Autokran 100t</td>
                  <td className="py-2.5 px-3">3–4 Std.</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">1.500–2.500€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">+ 150–200€</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">Beton-Pool 8×4</td>
                  <td className="py-2.5 px-3">Autokran 100–200t</td>
                  <td className="py-2.5 px-3">3–5 Std.</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">2.000–4.500€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">+ 200–350€</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-3">
            Alle Preise netto, Richtwerte für Standard-Anfahrt 30–50 km. Bei langen Anfahrten,
            schwierigem Stellplatz oder weiter Auslage über Nachbargrundstück können die Kosten
            20–40% höher liegen. Wenn der Pool-Lieferant eine eigene Hub-Pauschale anbietet,
            vergleichen Sie diese mit dem freien Markt, meist sparen Sie 100–300€ wenn Sie
            den Kran selbst beauftragen.
          </p>
          <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-[13px] text-gray-700">
              <strong className="text-gray-900">Faustregel:</strong> Für einen Standard-GFK-Pool
              6×3 m über ein normales Einfamilienhaus rechnen Sie mit{' '}
              <strong className="text-gray-900">700–1.100€ Kran-Kosten netto</strong>. Das sind
              etwa 5–8% des typischen Pool-Investments (12.000–25.000€), ein vernünftiger
              Anteil, der gegen den Aufwand und die Schadensrisiken bei Eigen-Hub-Versuchen
              spricht.
            </p>
          </div>
          <div className="mt-3 bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-[13px] text-gray-700 mb-2">
              <strong className="text-gray-900">Aus der Praxis, zwei Datenpunkte aus dem Forum:</strong>
            </p>
            <ul className="text-[13px] text-gray-700 space-y-1.5 list-disc pl-5">
              <li>
                Pool 4,5×3 m, ländliche Lage, Autokran 3 Std. inkl. Anfahrt:{' '}
                <strong className="text-gray-900">210€</strong> + ca. 30–40€ Straßensperrung
                (Bericht eines Pool-Eigners im poolpowershop-Forum, Frühjahr 2021).
              </li>
              <li>
                Pool 8×3 m, Pauschal-Angebot 699€ wurde am Einsatztag auf{' '}
                <strong className="text-gray-900">1.700€ nachträglich erhöht</strong>{' '}
                (Zusatzkosten für Kran-Stillstand und Mehraufwand). Lehre: schriftlichen
                Festpreis mit Stillstandsklausel verlangen.
              </li>
            </ul>
            <p className="text-[12px] text-gray-500 mt-2">
              Beide Werte sind regional &amp; zeitlich gebunden, heute liegen ländliche
              Süd-Quotes ca. 25–35% höher als 2021, Großstadt-Tarife (Berlin, München, Hamburg)
              eher 30–50% über den ländlichen Werten.
            </p>
          </div>
        </section>

        {/* Section 4: Einsatzplanung */}
        <section id="planung" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            4. Einsatzplanung & Vorbereitung
          </h2>
          <p className="mb-4">
            Der reine Hub dauert 30–60 Minuten, der Kran ist meist 2–3 Stunden vor Ort. Die
            kritische Vorbereitung passiert aber lange vorher. Hier die typische Reihenfolge:
          </p>
          <div className="space-y-3 mb-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Tag minus 14. Baugrube fertig</p>
              <p className="text-[13px] text-gray-500">
                Die Pool-Grube muss vor dem Liefertermin ausgehoben sein, mit Sandbett oder
                Magerbeton-Sohle. Pool wird direkt vom Kran in die fertige Grube gesetzt, also
                nicht erst zur Seite stellen und später einbauen.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Tag minus 7. Stellplatz prüfen</p>
              <p className="text-[13px] text-gray-500">
                Kran-Standfläche mindestens 4 × 8 m, Bodenbelastbarkeit 12–20 t/m². Bei Asphalt
                meist okay, bei Rasen oder Pflaster mit Lastverteilungsplatten arbeiten. Falls
                Stellfläche auf Straße/Bürgersteig: Sondernutzungserlaubnis schon beantragt?
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Tag minus 3. Nachbarn informieren</p>
              <p className="text-[13px] text-gray-500">
                Wenn Kranausleger über Nachbargrundstück schwenkt, schriftliche Zustimmung
                einholen. Außerdem Nachbarn allgemein über Termin informieren, der Kran blockiert
                oft 1/2 Tag die Straße oder Einfahrt.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Tag des Einsatzes</p>
              <p className="text-[13px] text-gray-500">
                Pool-LKW kommt meist 30–60 Minuten vor dem Kran. Kran wird aufgebaut (15–30 Min.),
                Pool angeschlagen (10–20 Min.), Hub und Absetzen (15–30 Min.), Pool ausrichten
                und zurück-prüfen (30–60 Min.). Insgesamt 2–3 Stunden vor Ort.
              </p>
            </div>
          </div>
          <p className="text-[13px] text-gray-500">
            Die Pool-Lieferung wird in der Regel mit dem Kran-Anbieter synchronisiert, entweder
            durch den Pool-Lieferanten direkt oder durch Sie als Bauherr. Wer beide Termine
            koordiniert, vermeidet den schlechtesten Fall: LKW kommt vorzeitig, Kran ist noch
            nicht da, Pool blockiert die Straße.
          </p>
        </section>

        {/* Section 5: Spezialausrüstung */}
        <section id="ausruestung" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            5. Krantraverse & Hebegurte für Pool
          </h2>
          <p className="mb-4">
            GFK ist relativ druckempfindlich, direkt an zwei Hebegurten angeschlagen, kann der
            Pool-Rand verformen oder kleinste Risse bekommen. Standard ist deshalb eine{' '}
            <strong className="text-gray-900">Krantraverse</strong>, die die Hebegurte parallel
            hält und den Druck verteilt.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Krantraverse / Spreizbalken</p>
              <p className="text-[13px] text-gray-500 mb-1">
                Stahl- oder Aluminium-Balken, der zwischen Kranhaken und Hebegurten sitzt. Hält
                die Gurte parallel, vermeidet Pool-Rand-Verformung. Pflicht für GFK ab 6 m Länge.
              </p>
              <p className="text-[11px] text-gray-400">Aufpreis: 50–150€</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Hebegurte mit Filz / Polyester</p>
              <p className="text-[13px] text-gray-500 mb-1">
                Standard-Hebegurte mit Filz-Auflage am Auflagepunkt. Schützen Pool-Rand vor
                Druckspuren und Mikrokratzern. Bei seriösen Anbietern Standard, bei einzelnen
                Aufpreis.
              </p>
              <p className="text-[11px] text-gray-400">Aufpreis: meist keiner, sonst 30–60€</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Schutzpolster / Anti-Druck-Auflagen</p>
              <p className="text-[13px] text-gray-500 mb-1">
                Aufblasbare oder Schaumstoff-Auflagen zwischen Hebegurt und Pool-Wand. Verteilen
                den Anpressdruck, verhindern lokale Druckstellen. Bei großen Pools (8×4 m+)
                empfehlenswert.
              </p>
              <p className="text-[11px] text-gray-400">Aufpreis: 30–70€</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Pool-spezifische Anschlagpunkte</p>
              <p className="text-[13px] text-gray-500 mb-1">
                Manche Premium-GFK-Hersteller liefern den Pool mit eingebauten Hebeösen, an die
                der Kran direkt anschlagen kann, ohne Hebegurte um den Pool. Das ist die
                schonendste Lösung und meist im Pool-Preis inbegriffen.
              </p>
              <p className="text-[11px] text-gray-400">Aufpreis: 0€ (im Pool inklusive)</p>
            </div>
          </div>
          <div className="mt-4 bg-amber-50 border border-amber-100 rounded-lg p-4">
            <p className="text-[13px] text-amber-800">
              <strong>Wichtig:</strong> Fragen Sie den Pool-Lieferanten vor der Bestellung, welche
              Anschlag-Methode er empfiehlt, und nennen Sie das beim Kran-Anbieter. Manche
              Pool-Hersteller verlangen bei Garantieansprüchen den Nachweis, dass mit Krantraverse
              gearbeitet wurde. Eigeninitiative beim Hub kann die Pool-Garantie kosten.
            </p>
          </div>
        </section>

        {/* Section 6: Timing */}
        <section id="timing" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            6. Timing &amp; Wetter-Faktoren
          </h2>
          <p className="mb-4">
            Pool-Installationen sind in {COUNTRY_LABEL} stark saisonal. Wer im Sommer den Pool
            nutzen will, plant Hub und Einbau in den Frühling, und stößt damit auf die
            ausgebuchten Termine der Kran-Anbieter.
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-lg mb-4">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50 border-b text-left">
                  <th className="py-3 px-4 font-medium text-gray-900">Zeitraum</th>
                  <th className="py-3 px-4 font-medium text-gray-900">Saison</th>
                  <th className="py-3 px-4 font-medium text-gray-900">Empfohlener Vorlauf</th>
                  <th className="py-3 px-4 font-medium text-gray-900">Preisniveau</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">März–April</td>
                  <td className="py-2.5 px-4 text-amber-700">Vor-Saison-Spitze</td>
                  <td className="py-2.5 px-4">4–6 Wochen</td>
                  <td className="py-2.5 px-4 text-amber-700">+10–25%</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Mai–Juni</td>
                  <td className="py-2.5 px-4 text-amber-700">Hauptsaison</td>
                  <td className="py-2.5 px-4">3–5 Wochen</td>
                  <td className="py-2.5 px-4 text-amber-700">Standard bis +15%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Juli–August</td>
                  <td className="py-2.5 px-4">Späte Saison</td>
                  <td className="py-2.5 px-4">2–4 Wochen</td>
                  <td className="py-2.5 px-4 text-gray-500">Standard</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-4 font-medium text-gray-900">September–Oktober</td>
                  <td className="py-2.5 px-4">Nachsaison</td>
                  <td className="py-2.5 px-4">2–3 Wochen</td>
                  <td className="py-2.5 px-4 text-gray-500">Standard, oft Pool-Sonderaktionen</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium text-gray-900">November–Februar</td>
                  <td className="py-2.5 px-4">Winterpause</td>
                  <td className="py-2.5 px-4">1–2 Wochen</td>
                  <td className="py-2.5 px-4 text-gray-500">Niedrigster Preis, aber Frost-Risiko</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mb-3">
            Beim Hub selbst sind drei Wetter-Faktoren kritisch:
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
                  <td className="py-2.5 px-4">&gt; 40 km/h</td>
                  <td className="py-2.5 px-4 text-gray-500">Pool pendelt zu stark, Hub eingestellt</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Frost</td>
                  <td className="py-2.5 px-4">&lt; 0°C im Pool-Material</td>
                  <td className="py-2.5 px-4 text-gray-500">GFK wird sprödet, Riss-Risiko bei Stoß</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium text-gray-900">Starker Regen</td>
                  <td className="py-2.5 px-4">&gt; 5 mm/h</td>
                  <td className="py-2.5 px-4 text-gray-500">Baugrube füllt sich mit Wasser, Sandbett unbrauchbar</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-[13px] text-gray-700">
              <strong className="text-gray-900">Tipp:</strong> Pool-Installationen lohnen sich
              im September–Oktober oft am meisten. Pool-Hersteller geben Saisonende-Rabatte
              (10–20% auf den Pool), Kran-Anbieter haben mehr freie Kapazität, und Sie haben
              den Winter, um die Außenanlage zu finalisieren. Im Frühjahr ist der Pool
              dann einsatzbereit ohne Bau-Stress.
            </p>
          </div>
        </section>

        {/* Section 7: Genehmigungen */}
        <section id="genehmigungen" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            7. Genehmigungen für Kran &amp; Pool
          </h2>
          <p className="mb-4">
            Beim Pool-Bau gibt es zwei getrennte Genehmigungsebenen: eine für den Pool selbst,
            eine für den Kran-Einsatz. Beide klären Sie unabhängig.
          </p>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Pool. Baugenehmigung</p>
              <p className="text-[13px] text-gray-500">
                Je nach Bundesland und Pool-Volumen ist eine Baugenehmigung nötig. Faustregel:
                Becken bis ca. 50 m³ Volumen sind in vielen Bundesländern verfahrensfrei, größere
                Pools brauchen eine Genehmigung. Klären Sie das mit der Bauaufsichtsbehörde Ihrer
                Gemeinde, bevor Sie Pool und Kran buchen, sonst riskieren Sie einen
                Baustopp mitten im Hub-Termin.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Kran auf eigenem Grundstück</p>
              <p className="text-[13px] text-gray-500">
                Steht der Kran komplett auf eigenem Grund, brauchen Sie keine Genehmigung. Prüfen
                Sie nur die Bodenbelastbarkeit (12–20 t/m²) und ob die Stellfläche (mindestens
                4×8 m für Mobilkran 50t, 5×10 m für Autokran 100t) frei ist.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Kran auf öffentlichem Grund</p>
              <p className="text-[13px] text-gray-500">
                Wenn der Kran auf Straße oder Bürgersteig steht, brauchen Sie eine
                Sondernutzungserlaubnis vom Ordnungsamt: 50–200€ Gebühr, 1–3 Wochen
                Bearbeitungszeit. In manchen Städten muss zusätzlich die Halteverbots-Schilder
                72 Std. vorher aufgestellt werden, das ist Teil der Erlaubnis.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Schwenken über Nachbargrundstück</p>
              <p className="text-[13px] text-gray-500">
                Wenn der Kranausleger den Pool über das Grundstück des Nachbarn trägt, brauchen
                Sie die schriftliche Zustimmung des Nachbarn, auch wenn das nur 2–3 Minuten
                dauert. Sprechen Sie das 2–3 Wochen vorher an. Bei verweigerter Zustimmung müssen
                Sie auf einen anderen Stellplatz umplanen, oft auf einen größeren, teureren Kran.
              </p>
            </div>
          </div>
          <p className="text-[13px] text-gray-500 mt-3">
            Detaillierte Hinweise zu allen Stellplatz- und Schwenk-Genehmigungen:{' '}
            <Link href="/ratgeber/kran-aufstellen-genehmigung" className="text-blue-600 hover:underline">
              Kran aufstellen: Genehmigungen im Detail 
            </Link>
          </p>
        </section>

        {/* Section 8: 5 Tipps */}
        <section id="tipps" className="scroll-mt-20 border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            8. 5 Tipps für Pool-Bauherren
          </h2>
          <ol className="space-y-3 text-[14px]">
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">1</span>
              <div>
                <p className="font-medium text-gray-900">Krangröße vom Pool-Lieferanten berechnen lassen</p>
                <p className="text-[13px] text-gray-500">
                  Pool-Hersteller wissen aus Erfahrung, welche Krangröße bei welcher Hauslage
                  funktioniert. Schicken Sie Foto vom Stellplatz + Hausplan, die Empfehlung ist
                  meist konkret und richtig. Vermeiden Sie Eigen-Schätzung mit Mobilkran 25t,
                  weil das oft an der Auslage scheitert.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">2</span>
              <div>
                <p className="font-medium text-gray-900">Kran selbst beauftragen statt Pool-Komplettpaket</p>
                <p className="text-[13px] text-gray-500">
                  Pool-Lieferanten kalkulieren die Hub-Pauschale meist mit 100–300€ Aufschlag auf
                  den Markt-Preis. Wenn Sie den Kran selbst über einen lokalen Anbieter buchen,
                  sparen Sie diesen Aufschlag, und haben einen direkten Ansprechpartner bei
                  Fragen am Einsatztag.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">3</span>
              <div>
                <p className="font-medium text-gray-900">Krantraverse fest mit einplanen</p>
                <p className="text-[13px] text-gray-500">
                  Bei GFK-Pools über 6 m Länge ist die Krantraverse Pflicht, sonst riskieren
                  Sie Pool-Rand-Verformung und Garantie-Verlust. 50–150€ Aufpreis sind im
                  Vergleich zu einer Pool-Reparatur (1.500–8.000€) bedeutungslos.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">4</span>
              <div>
                <p className="font-medium text-gray-900">Nachbar-Zustimmung schriftlich, nicht mündlich</p>
                <p className="text-[13px] text-gray-500">
                  Wenn der Kran über das Nachbargrundstück schwenkt: kurze schriftliche Zustimmung
                  (E-Mail reicht), 2–3 Wochen vorher. Mündliche Zusagen werden manchmal kurz
                  vor dem Termin zurückgezogen, und Sie stehen mit einem unbenutzbaren Kran
                  und Pool-LKW auf der Straße.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">5</span>
              <div>
                <p className="font-medium text-gray-900">Termin im Herbst statt Frühjahr</p>
                <p className="text-[13px] text-gray-500">
                  September–Oktober ist die beste Zeit: Pool-Hersteller geben Saisonende-Rabatte
                  (10–20%), Kran-Anbieter haben kurze Vorlaufzeiten, Wetter-Risiko überschaubar.
                  Im April–Juni warten Sie 4–6 Wochen, zahlen Frühjahrs-Aufschlag und konkurrieren
                  mit der Pool-Hochsaison.
                </p>
              </div>
            </li>
          </ol>
        </section>

        {/* Section 9: FAQ */}
        <section id="faq" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            9. Häufige Fragen zum Pool-Hub mit Kran
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
          Kran für Ihren Pool-Hub finden
        </h2>
        <p className="text-[14px] text-gray-500 mb-5 max-w-lg mx-auto">
          Vergleichen Sie {anbieterCount}+ Kranvermieter in {COUNTRY_LABEL}. Mobilkran 50t für
          Standard-EFH-Hub, Autokran 100t für große Pools oder weite Auslage. Kostenlos Angebote
          bei mehreren Anbietern gleichzeitig anfragen.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          <Link href="/mobilkran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Mobilkran mieten</Link>
          <Link href="/autokran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Autokran mieten</Link>
          <Link href="/minikran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Minikran mieten</Link>
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
          <Link href="/ratgeber/kran-mieten-privatperson" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Kran für Privatpersonen</Link>
          <Link href="/ratgeber/krantypen" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Alle Krantypen im Vergleich</Link>
          <Link href="/kostenrechner" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Kostenrechner</Link>
        </div>
      </section>

      {/* Structured data. FAQPage + Article + BreadcrumbList */}
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
            headline: 'Pool mit Kran über das Haus heben (GFK-Pool & Fertigpool Kran-Guide 2026)',
            description:
              'GFK-Pool oder Fertigpool in den Garten heben: Mobilkran 50t ab 700€, bei großer Auslage Autokran ab 1.200€. Krangröße ergibt sich aus Reichweite, nicht nur aus Pool-Gewicht.',
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
              { '@type': 'ListItem', position: 3, name: 'Pool mit Kran heben' },
            ],
          }),
        }}
      />
    </div>
  )
}
