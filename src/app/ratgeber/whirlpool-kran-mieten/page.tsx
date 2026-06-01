import type { Metadata } from 'next'
import Link from 'next/link'
import { getSiteStats } from '@/lib/queries'
import { COUNTRY_LABEL, BRAND_NAME, BASE_URL } from '@/lib/country'
import { alternatesFor } from '@/lib/alternates'
import { OG_IMAGE } from '@/lib/og-image'

export const revalidate = 86400

export const metadata: Metadata = {
  // `absolute` bypasses the layout template (`%s | KranVergleich.de`): the old title
  // base (80 ch) + suffix (19) = 99 ch → truncated/rewritten in SERP (page ranks well,
  // GSC 2026-06). 48 ch, keyword-front + cost hook (matches og:title).
  title: { absolute: 'Whirlpool mit Kran heben: Kosten & Anbieter 2026' },
  description:
    'Whirlpool über Haus oder auf Dachterrasse heben: Mobilkran 35–50t ab 450€, bei Penthouse-Lage Autokran ab 1.200€. Wann Sie wirklich einen Kran brauchen.',
  alternates: alternatesFor('/ratgeber/whirlpool-kran-mieten'),
  openGraph: {
    title: 'Whirlpool mit Kran heben: Kosten & Anbieter 2026',
    description:
      'Whirlpool über Haus oder auf Dachterrasse heben: Mobilkran 35–50t ab 450€, bei Penthouse-Lage Autokran ab 1.200€. Wann Sie wirklich einen Kran brauchen, und wann nicht.',
    type: 'article',
    url: '/ratgeber/whirlpool-kran-mieten',
      images: [OG_IMAGE],
  },
}

const faqs = [
  {
    question: 'Was kostet ein Kran zum Whirlpool heben?',
    answer:
      'Ein Standard-Whirlpool (2×2 m, 350–450 kg leer) über ein normales Einfamilienhaus zu heben kostet 450–800€ mit einem Mobilkran 35–50t. Bei einem Premium-8-Personen-Whirlpool (2,4×2,4 m, 500–700 kg) und mittlerer Auslage liegen Sie bei 600–1.000€. Auf eine Dachterrasse im 3. oder 4. Obergeschoss steigen die Kosten deutlich: 1.200–2.500€ für einen Mobilkran 80t mit 25–35 m Reichweite. Auf eine Penthouse-Terrasse ab 5. Stock ist meist ein Autokran 100t nötig, dort rechnen Sie mit 1.800–3.500€.',
  },
  {
    question: 'Brauche ich überhaupt einen Kran für meinen Whirlpool?',
    answer:
      'Nicht immer. Ein Whirlpool ist mit 2,2–2,4 m Außenmaß deutlich kompakter als ein GFK-Pool, er passt durch eine Doppel-Garage (2,5 m breit), durch eine breite Gartenpforte (ab 2,5 m) und über einen befestigten Seitenweg. Wenn Sie einen direkten, befahrbaren Zugang vom LKW bis zum Aufstellort haben, schiebt der Spa-Lieferant den Whirlpool meist auf Rollen oder einem Spa-Dolly an Ort und Stelle, ohne Kran. Kran wird in vier Situationen Pflicht: (1) Zugang blockiert durch Haus, Garage oder Hecke, (2) Aufstellort auf Dachterrasse oder Balkon, (3) hohe Mauer oder Zaun, der nicht überwunden werden kann, (4) eingelassener Whirlpool im Boden, der mit Becken-Konstruktion gehoben werden muss.',
  },
  {
    question: 'Welche Krangröße brauche ich für einen Whirlpool?',
    answer:
      'Für einen Standard-Whirlpool im Garten reicht meist ein Mobilkran 35t, das Gewicht (350–700 kg) ist unkritisch, kritisch ist die Auslage über das Haus. Bei normaler EFH-Lage (8–10 m Hausbreite, 4 m Tiefgarten) genügen 12–14 m Reichweite, also Mobilkran 35t (Reichweite 16 m) oder 50t (Reichweite 18 m). Bei einer Dachterrasse im 3. Obergeschoss brauchen Sie 18–22 m vertikal plus 6–10 m horizontal, das ist Mobilkran 80t Territorium. Penthouse-Terrasse ab 5. Obergeschoss: Autokran 100t mit Tele-Auslage 35–45 m.',
  },
  {
    question: 'Wie lange dauert der Whirlpool-Hub?',
    answer:
      'Der reine Hub dauert nur 15–30 Minuten. Mit Aufbau, Anschlagen, Hub und Absetzen sind Sie meist 1,5–2,5 Stunden vor Ort. Der Kran wird normalerweise einen halben Tag gebucht (3–4 Stunden), da auch Anfahrt und Abbau hinzukommen. Bei einem Hub auf eine Dachterrasse können sich 2–3 Stunden ergeben, weil das Absetzen exakter sein muss und die Auslage länger braucht zum Fahren. Spa-Lieferung und Kran sollten am gleichen Tag synchron stattfinden, der Whirlpool steht sonst stundenlang auf der Straße.',
  },
  {
    question: 'Whirlpool vom Spa-Händler oder Kran selbst beauftragen?',
    answer:
      'Wenn Sie einen Whirlpool kaufen, bietet der Spa-Händler meist ein Komplettpaket Lieferung-plus-Hub für 400–900€. Das ist bequem, aber 100–250€ teurer als wenn Sie den Kran selbst bei einem lokalen Anbieter buchen (350–700€ für Standard-EFH). Bei einer Dachterrasse oder Penthouse-Lage lohnt sich der lokale Kran-Anbieter doppelt: Der Spa-Händler-Standard-Kran reicht oft nicht aus, eine Sonderbuchung über ihn ist teurer als der direkte Markt-Kontakt. Vergleichen Sie immer beide Wege, bei einem Standard-Garten-Whirlpool ist das Komplettpaket okay, bei Spezialaufgaben fast immer der Eigenauftrag günstiger.',
  },
  {
    question: 'Wer haftet für Schäden am Whirlpool beim Hub?',
    answer:
      'Der Kranbetreiber haftet für Schäden, die durch Bedienungsfehler oder Materialversagen am Kran entstehen, abgedeckt über seine Betriebshaftpflicht (Standard 5–10 Mio. €). Schäden am Whirlpool durch falsche Anschlagpunkte oder ungeeignete Hebegurte sind aber nicht automatisch dabei. Bei hochwertigen Whirlpools (über 10.000€ Wert) prüfen Sie zwei Dinge vor dem Termin: (1) Gibt der Whirlpool-Hersteller Hub-Anweisungen mit Anschlagpunkten? Diese muss der Kran-Anbieter befolgen, sonst Garantie-Verlust. (2) Deckt Ihre Hausrat- oder Spa-Versicherung Hub-Schäden ab? Bei vielen Standardpolicen ist das ausgeschlossen, gegen Aufpreis (50–100€ Einmalprämie) erweiterbar.',
  },
]

export default async function WhirlpoolKranMietenPage() {
  const { anbieterCount } = await getSiteStats()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/ratgeber" className="hover:text-gray-600">Ratgeber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Whirlpool mit Kran heben</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Whirlpool mit Kran heben: Garten oder Dachterrasse
        <span className="block text-gray-500 text-[18px] lg:text-xl font-normal mt-1">
          Whirlpool-Kran-Guide 2026
        </span>
      </h1>
      <p className="text-[15px] text-gray-500 mb-4 max-w-3xl">
        Ein Whirlpool wiegt mit 350–700 kg deutlich weniger als ein Pool, das Gewicht ist hier
        selten das Problem. Entscheidend ist die <strong className="text-gray-900">Zugänglichkeit
        des Aufstellorts</strong>: passt der Whirlpool durch Garage und Gartenpforte (oft ja),
        oder muss er über Haus, Mauer oder auf eine Dachterrasse gehoben werden? Für Standard-EFH
        reicht ein <strong className="text-gray-900">Mobilkran 35–50t ab 450€</strong>, für
        Dachterrasse oder Penthouse <strong className="text-gray-900">Mobilkran 80t oder Autokran
        100t ab 1.200€</strong>.
      </p>
      <p className="text-[11px] text-gray-300 mb-8">Stand: Mai 2026 · Alle Preise netto, Richtwerte</p>

      {/* TOC */}
      <nav className="mb-8 border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-medium text-gray-900 mb-2">Inhalt</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          <li><a href="#einstieg" className="text-[13px] text-blue-600 hover:underline">1. Wann brauchen Sie wirklich einen Kran?</a></li>
          <li><a href="#krantyp" className="text-[13px] text-blue-600 hover:underline">2. Welcher Kran für welchen Aufstellort?</a></li>
          <li><a href="#kosten" className="text-[13px] text-blue-600 hover:underline">3. Kosten nach Whirlpool und Lage</a></li>
          <li><a href="#dachterrasse" className="text-[13px] text-blue-600 hover:underline">4. Sonderfall: Dachterrasse &amp; Penthouse</a></li>
          <li><a href="#planung" className="text-[13px] text-blue-600 hover:underline">5. Einsatzplanung &amp; Vorbereitung</a></li>
          <li><a href="#ausruestung" className="text-[13px] text-blue-600 hover:underline">6. Hebegurte &amp; Spezialausrüstung</a></li>
          <li><a href="#genehmigungen" className="text-[13px] text-blue-600 hover:underline">7. Genehmigungen &amp; Versicherung</a></li>
          <li><a href="#tipps" className="text-[13px] text-blue-600 hover:underline">8. 5 Tipps für Whirlpool-Käufer</a></li>
          <li><a href="#faq" className="text-[13px] text-blue-600 hover:underline">9. Häufige Fragen</a></li>
        </ul>
      </nav>

      <div className="space-y-10 text-[14px] text-gray-600 leading-relaxed">

        {/* Section 1: Einstieg. Wann brauchen Sie wirklich einen Kran? */}
        <section id="einstieg" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            1. Wann brauchen Sie wirklich einen Kran?
          </h2>
          <p className="mb-3">
            Anders als bei einem Pool ist beim Whirlpool die erste Frage: <strong className="text-gray-900">brauchen
            Sie überhaupt einen Kran?</strong> Ein Whirlpool ist mit 2,2–2,4 m Breite ähnlich
            kompakt wie eine breite Couch, er passt durch eine Doppelgarage (Standard 2,5 m), durch
            eine offene Gartenpforte (ab 2,5 m) und über einen befestigten Seitenweg. Spa-Lieferanten
            schieben den Whirlpool dann mit einem Spa-Dolly oder auf Rollen an den Aufstellort 
            ohne Kran-Einsatz.
          </p>
          <p className="mb-4">
            Der Kran wird Pflicht in vier Konstellationen:
          </p>
          <div className="grid gap-3 sm:grid-cols-2 mb-4">
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Hinter-Haus-Garten ohne Zugang</p>
              <p className="text-[13px] text-gray-600">
                Reihenhaus oder freistehendes EFH ohne befahrbaren Seitenweg. Garten nur über
                das Haus erreichbar, also Hub über Dach. Häufigster Fall.
              </p>
            </div>
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Dachterrasse / Penthouse</p>
              <p className="text-[13px] text-gray-600">
                Whirlpool soll auf den 2.–5. Stock einer Dachterrasse oder eines Penthouses. Hub
                vertikal mit hoher Auslage, der Premium-Anwendungsfall.
              </p>
            </div>
            <div className="border border-gray-200 bg-gray-50/50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Hohe Mauer oder Zaun</p>
              <p className="text-[13px] text-gray-600">
                Über 1,8 m hohe Mauer, dichter Hecken-Zaun oder eingebrachter Sichtschutz, der
                den Spa-Dolly-Weg blockiert. Kran ist die einfachste Lösung.
              </p>
            </div>
            <div className="border border-gray-200 bg-gray-50/50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Eingelassener / fest eingebauter Whirlpool</p>
              <p className="text-[13px] text-gray-600">
                Whirlpool wird in den Boden eingelassen oder in eine vorbereitete Holz-Konstruktion
                gehoben. Hier ist der Kran auch bei zugänglichem Garten nötig.
              </p>
            </div>
          </div>
          <p className="text-[13px] text-gray-500">
            Wenn keine dieser vier Konstellationen vorliegt, lohnt sich vor dem Kran-Termin ein
            Vor-Ort-Termin mit dem Spa-Lieferanten. Spart 400–800€, wenn der Spa-Dolly ausreicht.
          </p>
        </section>

        {/* Section 2: Krantyp */}
        <section id="krantyp" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            2. Welcher Kran für welchen Aufstellort?
          </h2>
          <p className="mb-4">
            Beim Whirlpool ist das Gewicht (350–700 kg) selten der limitierende Faktor, fast jeder
            Mobilkran ab 25t schafft das spielend. Entscheidend ist die nötige{' '}
            <strong className="text-gray-900">Auslage und Hubhöhe</strong>: über ein Standard-EFH
            sind 12–16 m Reichweite nötig, auf eine Dachterrasse 20–35 m. Hier eine Übersicht:
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50 border-b text-left">
                  <th className="py-3 px-4 font-medium text-gray-900">Aufstellort</th>
                  <th className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">Hubhöhe</th>
                  <th className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">Auslage</th>
                  <th className="py-3 px-4 font-medium text-gray-900">Krantyp</th>
                  <th className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">Einsatzkosten</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">EFH-Garten, Standardlage</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">8–10 m</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">12–14 m</td>
                  <td className="py-2.5 px-4"><Link href="/mobilkran-mieten" className="text-blue-600 hover:underline">Mobilkran 35t</Link></td>
                  <td className="py-2.5 px-4 whitespace-nowrap">450–700€</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-4 font-medium text-gray-900">EFH-Garten, weite Auslage</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">10–12 m</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">14–18 m</td>
                  <td className="py-2.5 px-4"><Link href="/mobilkran-mieten" className="text-blue-600 hover:underline">Mobilkran 50t</Link></td>
                  <td className="py-2.5 px-4 whitespace-nowrap">600–1.000€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Dachterrasse 1.–2. OG</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">10–14 m</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">14–18 m</td>
                  <td className="py-2.5 px-4"><Link href="/mobilkran-mieten" className="text-blue-600 hover:underline">Mobilkran 50t</Link></td>
                  <td className="py-2.5 px-4 whitespace-nowrap">800–1.300€</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Dachterrasse 3.–4. OG</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">14–22 m</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">18–25 m</td>
                  <td className="py-2.5 px-4"><Link href="/mobilkran-mieten" className="text-blue-600 hover:underline">Mobilkran 80t</Link></td>
                  <td className="py-2.5 px-4 whitespace-nowrap">1.200–2.000€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Penthouse 5.–7. OG</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">22–32 m</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">25–35 m</td>
                  <td className="py-2.5 px-4"><Link href="/autokran-mieten" className="text-blue-600 hover:underline">Autokran 100t</Link></td>
                  <td className="py-2.5 px-4 whitespace-nowrap">1.800–2.800€</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium text-gray-900">Hochhaus 8. OG+</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">32–45 m</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">30–45 m</td>
                  <td className="py-2.5 px-4"><Link href="/autokran-mieten" className="text-blue-600 hover:underline">Autokran 200t+</Link></td>
                  <td className="py-2.5 px-4 whitespace-nowrap">2.500–4.500€</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Hubhöhe = Stockwerk-Höhe + Brüstung + Sicherheits-Reserve. Auslage = horizontaler
            Abstand vom Kran-Standfuß zum Whirlpool-Endposition. Beide Werte liefert der Spa-Händler
            oder ein Vor-Ort-Termin des Kran-Anbieters, nicht aus dem Katalog raten.
          </p>
        </section>

        {/* Section 3: Kosten */}
        <section id="kosten" className="scroll-mt-20 border border-gray-200 rounded-lg p-5 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            3. Kosten nach Whirlpool und Lage
          </h2>
          <p className="mb-4">
            Die Krankosten setzen sich aus drei Teilen zusammen:{' '}
            <strong className="text-gray-900">Anfahrtspauschale</strong> (80–250€ je nach Krangröße),{' '}
            <strong className="text-gray-900">Einsatzzeit</strong> (1,5–2,5 Stunden inklusive,
            jede weitere Stunde 80–150€) und ggf. <strong className="text-gray-900">Sondergurte
            oder Krantraverse</strong> (50–120€ extra). Bei Dachterrassen-Hub kommen oft 30–60€
            für die Halteverbots-Schilder und ein längerer Vorbereitungsaufwand dazu.
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50 border-b text-left">
                  <th className="py-3 px-3 font-medium text-gray-900">Szenario</th>
                  <th className="py-3 px-3 font-medium text-gray-900">Krantyp</th>
                  <th className="py-3 px-3 font-medium text-gray-900 whitespace-nowrap">Einsatz-Dauer</th>
                  <th className="py-3 px-3 font-medium text-gray-900 whitespace-nowrap">Kran gesamt</th>
                  <th className="py-3 px-3 font-medium text-gray-900 whitespace-nowrap">+ Sondergurte</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b">
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">2-4-Pers. Whirlpool, EFH</td>
                  <td className="py-2.5 px-3">Mobilkran 35t</td>
                  <td className="py-2.5 px-3">2 Std.</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">450–700€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">+ 50–80€</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">6-8-Pers. Whirlpool, EFH</td>
                  <td className="py-2.5 px-3">Mobilkran 50t</td>
                  <td className="py-2.5 px-3">2 Std.</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">600–1.000€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">+ 60–100€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">Whirlpool auf Dachterrasse 2. OG</td>
                  <td className="py-2.5 px-3">Mobilkran 50t</td>
                  <td className="py-2.5 px-3">2,5 Std.</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">800–1.300€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">+ 80–120€</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">Whirlpool auf Dachterrasse 4. OG</td>
                  <td className="py-2.5 px-3">Mobilkran 80t</td>
                  <td className="py-2.5 px-3">2,5–3 Std.</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">1.200–2.000€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">+ 80–120€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">Penthouse 6. OG</td>
                  <td className="py-2.5 px-3">Autokran 100t</td>
                  <td className="py-2.5 px-3">3–4 Std.</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">1.800–2.800€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">+ 100–150€</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">Whirlpool-Entfernung (Demontage)</td>
                  <td className="py-2.5 px-3">je nach Lage</td>
                  <td className="py-2.5 px-3">2–3 Std.</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">500–1.500€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">inkl.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-3">
            Alle Preise netto, Richtwerte für Standard-Anfahrt 30–50 km. Bei Penthouse-Lage in
            Innenstädten oft 200–400€ Aufschlag wegen schwieriger Stellplatz-Situation. Bei
            Wochenend-Einsätzen 25–50% Aufschlag.
          </p>
          <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-[13px] text-gray-700">
              <strong className="text-gray-900">Faustregel:</strong> Bei einem Whirlpool-Investment
              von 5.000–15.000€ machen die Kran-Kosten 5–10% aus. Bei Premium-Modellen (15.000–30.000€)
              sinkt der Anteil auf 3–6%. Bei Penthouse-Lage und Autokran-Einsatz kann der Anteil aber
              auf 10–15% steigen, diese Kosten unbedingt in Ihre Whirlpool-Kalkulation einrechnen,
              bevor Sie den Spa kaufen.
            </p>
          </div>
          <div className="mt-3 bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-[13px] text-gray-700 mb-2">
              <strong className="text-gray-900">Markt-Übersicht 2026, was andere Quellen nennen:</strong>
            </p>
            <ul className="text-[13px] text-gray-700 space-y-1.5 list-disc pl-5">
              <li>
                Whirlpool-Transport mit Kraneinsatz (komplettes Paket inkl. Fahrzeug + Hub):{' '}
                <strong className="text-gray-900">800–1.500€</strong> (Quelle: whirlpool-zuhause.de,
                Stand Anfang 2026).
              </li>
              <li>
                Reine Kranmiete (ohne Transport, nur der Hub vor Ort):{' '}
                <strong className="text-gray-900">200–500€/Stunde</strong>, abhängig von Hubhöhe und
                Krangröße (gleiche Quelle).
              </li>
              <li>
                LKW-Entladekran mit kleinerer Tragfähigkeit (bis ca. 1,2 t):{' '}
                <strong className="text-gray-900">120€/Std. + 120€ Anfahrt, Mindestabnahme 2 Std.</strong>{' '}
                (Erfahrungswert aus dem Großraum Berlin).
              </li>
            </ul>
            <p className="text-[12px] text-gray-500 mt-2">
              Diese Werte ergänzen, und bestätigen weitgehend, unsere Tabelle oben.
              Die Eigenkalkulation der Faustregel-Box ist auf den deutschen Marktdurchschnitt
              ausgelegt; lokale Quotes können je nach Region und Saison 20–40% abweichen.
            </p>
          </div>
        </section>

        {/* Section 4: Dachterrasse Sonderfall */}
        <section id="dachterrasse" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            4. Sonderfall: Dachterrasse &amp; Penthouse
          </h2>
          <p className="mb-4">
            Whirlpool auf einer Dachterrasse ist die häufigste Spezial-Anwendung, und auch die
            mit den meisten Stolperfallen. Hier vier kritische Punkte, die Sie vor dem Kran-Termin
            klären müssen:
          </p>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Statik der Dachterrasse</p>
              <p className="text-[13px] text-gray-500">
                Ein Whirlpool wiegt im Betrieb (mit Wasser und Personen) 1,5–2,5 Tonnen. Auf einer
                normalen Dachterrasse ist das viel, die meisten Dachterrassen sind für 200–400 kg/m²
                ausgelegt, ein Whirlpool bringt 600–800 kg/m². Bevor Sie den Whirlpool kaufen,
                lassen Sie die Dachstatik durch einen Statiker prüfen (Kosten 300–800€). Bei Bedarf
                Verstärkung durch Stahlträger oder Lastverteiler.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Brüstung. Höhe und Beschaffenheit</p>
              <p className="text-[13px] text-gray-500">
                Der Kran muss den Whirlpool über die Brüstung schwenken. Bei massiver Mauer-Brüstung
                über 1,2 m brauchen Sie zusätzliche Hubhöhe (oft die nächst-größere Krangröße).
                Bei Glas-Brüstung darf der Whirlpool nicht aufschlagen. Kranführer braucht
                besondere Sorgfalt, was sich in der Einsatzzeit (und damit in den Kosten)
                niederschlägt.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Stellplatz für den Kran</p>
              <p className="text-[13px] text-gray-500">
                Innenstadt-Penthouse-Adressen haben oft keinen 5×10 m Stellplatz vor dem Haus. In
                solchen Fällen muss der Kran auf der Straße abgestellt werden, was eine
                Sondernutzungserlaubnis und Halteverbots-Schilder erfordert. Vorlauf 2–3 Wochen,
                Kosten 100–300€. Bei sehr engen Innenhöfen kann der Hub physikalisch unmöglich sein.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Eigentümergemeinschaft (WEG)</p>
              <p className="text-[13px] text-gray-500">
                Bei einer Dachterrasse, die zur Eigentümergemeinschaft gehört, brauchen Sie
                schriftliche Zustimmung der WEG für den Hub. Der Kran auf öffentlichem Grund vor
                dem Haus ist außerdem oft Diskussionspunkt, sprechen Sie das in der nächsten
                WEG-Versammlung an, möglichst 2–3 Monate vor dem geplanten Termin.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Einsatzplanung */}
        <section id="planung" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            5. Einsatzplanung &amp; Vorbereitung
          </h2>
          <p className="mb-4">
            Der reine Whirlpool-Hub ist schnell, meist 15–30 Minuten zwischen Anschlagen und
            Absetzen. Mit Vorbereitung sind Sie 1,5–2,5 Stunden vor Ort. Bei Dachterrassen-Hub
            kommt 30–60 Minuten Aufwand für Auslage-Justierung dazu.
          </p>
          <div className="space-y-3 mb-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Tag minus 14. Aufstellort vorbereitet</p>
              <p className="text-[13px] text-gray-500">
                Untergrund muss tragfähig und eben sein: Beton-Platte, gepflasterte Fläche, Holz-Deck
                mit Statik-Nachweis. Anschlüsse für Strom (400V/16A für Premium-Modelle) und
                ggf. Wasser bereit. Auf Dachterrassen: Statiker-Gutachten vorliegen.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Tag minus 7. Stellplatz Kran prüfen</p>
              <p className="text-[13px] text-gray-500">
                Mobilkran 35t braucht 4×8 m, Mobilkran 80t bereits 5×10 m, Autokran 100t auch
                5×10 m + zusätzliche Stützfläche. Boden 12–20 t/m² Belastbarkeit. Falls
                Straße/Bürgersteig: Sondernutzungserlaubnis + Halteverbots-Schilder Bestätigung.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Tag minus 3. Spa-Lieferung synchron</p>
              <p className="text-[13px] text-gray-500">
                Spa-Händler liefert meist eigenständig per LKW. Termin synchronisieren:
                LKW eine Stunde vor dem Kran, sodass der Whirlpool direkt vom LKW gehoben werden
                kann. Bei Verspätung blockiert der Whirlpool die Straße, und der Kran tickt
                weiter.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Am Einsatztag</p>
              <p className="text-[13px] text-gray-500">
                Kranaufbau (15–30 Min.), Whirlpool anschlagen (10–15 Min.), Hub und Schwenk
                (15–30 Min.), Absetzen und Ausrichten (15–30 Min.), Kranabbau (10–15 Min.).
                Insgesamt 1,5–2,5 Stunden Standardeinsatz, 2,5–3,5 Stunden bei Dachterrasse.
              </p>
            </div>
          </div>
          <p className="text-[13px] text-gray-500">
            Wetter-Faktoren sind beim Whirlpool entspannter als beim Pool: weniger Gewicht, kompakte
            Form. Aber: Wind über 40 km/h stoppt jeden Hub, Frost unter −5°C ist ungesund für die
            Whirlpool-Hülle (Acryl wird sprödet). Im Winter ist Hub möglich, aber ungewöhnlich 
            die meisten Whirlpool-Hub-Termine liegen März–November.
          </p>
        </section>

        {/* Section 6: Hebegurte */}
        <section id="ausruestung" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            6. Hebegurte &amp; Spezialausrüstung
          </h2>
          <p className="mb-4">
            Der Whirlpool wird am Außenrahmen oder an speziellen Anschlagpunkten (bei Premium-Modellen)
            angeschlagen. Standard sind zwei Hebegurte unterhalb des Whirlpool-Bodens, bei
            empfindlichen Acryl-Schalen mit Filz- oder Schaumstoff-Schutz an den Auflagepunkten.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Standard-Hebegurte mit Filz</p>
              <p className="text-[13px] text-gray-500 mb-1">
                Polyestergurte mit Filz-Auflage. Verteilen den Druck unter dem Whirlpool-Boden,
                schützen die Acryl-Schale vor Druckstellen. Bei meisten Anbietern Standard.
              </p>
              <p className="text-[11px] text-gray-400">Aufpreis: meist keiner</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Krantraverse für Premium-Modelle</p>
              <p className="text-[13px] text-gray-500 mb-1">
                Bei großen 8-Personen-Whirlpools (2,4×2,4 m) hält die Krantraverse die Hebegurte
                parallel und vermeidet seitlichen Druck auf die Schale. Bei Hochpreis-Modellen
                empfehlenswert.
              </p>
              <p className="text-[11px] text-gray-400">Aufpreis: 50–120€</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Spa-Dolly als Alternative</p>
              <p className="text-[13px] text-gray-500 mb-1">
                Wenn Sie nur eine kurze Strecke vom LKW zum Garten überwinden müssen (5–15 m
                befestigter Weg), ist ein Spa-Dolly oft die bessere Lösung als ein Kran. Spa-Lieferanten
                bringen ihn meist mit, Aufpreis 50–150€. Spart Ihnen 400–700€ Kran-Kosten.
              </p>
              <p className="text-[11px] text-gray-400">Aufpreis: 50–150€ (statt Kran)</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Schutzplane / Polster</p>
              <p className="text-[13px] text-gray-500 mb-1">
                Aufblasbare Polster oder Schaumstoff-Stücke zwischen Hebegurt und Whirlpool-Schale.
                Bei besonders empfindlichen Acryl-Oberflächen oder Glanz-Lackierungen sinnvoll.
              </p>
              <p className="text-[11px] text-gray-400">Aufpreis: 30–60€</p>
            </div>
          </div>
          <div className="mt-4 bg-amber-50 border border-amber-100 rounded-lg p-4">
            <p className="text-[13px] text-amber-800">
              <strong>Wichtig:</strong> Manche Premium-Whirlpool-Hersteller (Jacuzzi, Sundance,
              HotSpring) liefern Hub-Anweisungen mit konkreten Anschlagpunkten und schreiben
              Schaden-Protokoll vor. Bei Garantie-Reklamationen müssen Sie nachweisen, dass die
              Anweisungen eingehalten wurden, fragen Sie den Hersteller vor der Bestellung nach
              dem Hub-Protokoll.
            </p>
          </div>
        </section>

        {/* Section 7: Genehmigungen */}
        <section id="genehmigungen" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            7. Genehmigungen &amp; Versicherung
          </h2>
          <p className="mb-4">
            Beim Whirlpool selbst gibt es in den meisten Bundesländern keine Baugenehmigung 
            Whirlpool gilt als verfahrensfreies bauliches Element, sofern er nicht eingelassen
            ist. Bei eingebauten oder eingelassenen Whirlpools kann eine Genehmigung nötig
            werden, das klären Sie mit der Bauaufsichtsbehörde.
          </p>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Kran auf eigenem Grundstück</p>
              <p className="text-[13px] text-gray-500">
                Steht der Kran komplett auf eigenem Grund (Einfahrt, Vorgarten), brauchen Sie
                keine Genehmigung. Prüfen Sie Bodenbelastbarkeit (12–20 t/m²) und ob Stellfläche
                ausreichend frei ist.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Kran auf öffentlichem Grund (Innenstadt-Lage)</p>
              <p className="text-[13px] text-gray-500">
                Bei Penthouse-Lieferungen ist das die Regel. Sondernutzungserlaubnis vom
                Ordnungsamt: 50–200€ Gebühr, 1–3 Wochen Bearbeitungszeit. Halteverbots-Schilder
                müssen oft 72 Std. vorher aufgestellt werden, manche Städte bieten das als Service
                an, Kosten 100–300€.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Schwenken über Nachbargrundstück</p>
              <p className="text-[13px] text-gray-500">
                Wenn der Kranausleger über das Nachbargrundstück schwenkt (auch nur kurz mit
                dem Whirlpool), brauchen Sie schriftliche Zustimmung des Nachbarn. Sprechen Sie
                das 2–3 Wochen vorher an.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Versicherung. Hub-Klausel</p>
              <p className="text-[13px] text-gray-500">
                Bei einem 5.000–10.000€-Whirlpool ist Eigen-Versicherung meist nicht nötig, die
                Betriebshaftpflicht des Kran-Anbieters reicht. Bei Premium-Modellen ab 15.000€
                und Sonderlagen (Penthouse, eingelassener Whirlpool) lohnt sich eine
                Transportversicherung als Einmalprämie 50–150€ über die Hausratversicherung
                oder direkt beim Kran-Anbieter.
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
            8. 5 Tipps für Whirlpool-Käufer
          </h2>
          <ol className="space-y-3 text-[14px]">
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">1</span>
              <div>
                <p className="font-medium text-gray-900">Vor-Ort-Termin mit Spa-Händler, vor der Bestellung</p>
                <p className="text-[13px] text-gray-500">
                  Lassen Sie den Spa-Händler vor der Bestellung den Aufstellort prüfen. Er sagt
                  Ihnen konkret, ob ein Spa-Dolly reicht oder ein Kran nötig ist, und welche
                  Krangröße. Spart Ihnen Annahme-Fehler und unnötige Kosten.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">2</span>
              <div>
                <p className="font-medium text-gray-900">Statik prüfen, bei Dachterrasse zwingend</p>
                <p className="text-[13px] text-gray-500">
                  Ein 6-Personen-Whirlpool im Betrieb wiegt 1,5–2,5 t auf 5 m². Vor dem Kauf
                  Statiker beauftragen (300–800€), bei Bedarf Verstärkung durch Stahlträger.
                  Lieber 800€ jetzt für Statik als später ein durchgebrochener Dachboden.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">3</span>
              <div>
                <p className="font-medium text-gray-900">Kran selbst beauftragen statt Spa-Händler-Komplettpaket</p>
                <p className="text-[13px] text-gray-500">
                  Spa-Händler kalkulieren 100–250€ Aufschlag auf den Kran-Markt-Preis. Bei
                  Standard-EFH-Hub (450–700€) sparen Sie das durch Direkt-Buchung.
                  Bei Penthouse-Hub ist der Spa-Händler-Standard-Kran oft sowieso zu klein 
                  da müssen Sie selbst recherchieren.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">4</span>
              <div>
                <p className="font-medium text-gray-900">WEG-Zustimmung 2–3 Monate vorher einholen</p>
                <p className="text-[13px] text-gray-500">
                  Bei Eigentumswohnung mit Dachterrasse: nächste WEG-Versammlung nutzen, um den
                  Whirlpool-Plan zu besprechen. Schriftliches Protokoll mitnehmen. Mündliche
                  Zusagen werden manchmal vor dem Termin zurückgezogen, und der Kran-Termin
                  fällt mit 600–1.500€ Stornogebühr weg.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">5</span>
              <div>
                <p className="font-medium text-gray-900">Foto-Dokumentation und Hub-Protokoll</p>
                <p className="text-[13px] text-gray-500">
                  Bei Premium-Whirlpools über 10.000€ Wert: vor dem Hub Whirlpool und Aufstellort
                  fotografieren, nach dem Hub nochmal. Bei Garantie-Anspruch ist die Beweislast
                  klar, und der Kran-Anbieter weiß, dass professionell gearbeitet werden muss.
                </p>
              </div>
            </li>
          </ol>
        </section>

        {/* Section 9: FAQ */}
        <section id="faq" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            9. Häufige Fragen zur Whirlpool-Lieferung mit Kran
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
          Kran für Ihren Whirlpool finden
        </h2>
        <p className="text-[14px] text-gray-500 mb-5 max-w-lg mx-auto">
          Vergleichen Sie {anbieterCount}+ Kranvermieter in {COUNTRY_LABEL}. Mobilkran 35–50t für
          Garten-Hub, Mobilkran 80t oder Autokran für Dachterrasse und Penthouse. Kostenlos Angebote
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
          <Link href="/ratgeber/pool-kran-mieten" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Pool mit Kran heben</Link>
          <Link href="/mobilkran-mieten#ratgeber" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Mobilkran Kosten &amp; Tipps</Link>
          <Link href="/autokran-mieten#ratgeber" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Autokran Kosten im Detail</Link>
          <Link href="/kran-mieten-preise" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Alle Mietpreise im Überblick</Link>
          <Link href="/ratgeber/kran-aufstellen-genehmigung" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Kran-Genehmigungen</Link>
          <Link href="/ratgeber/kran-mieten-privatperson" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Kran für Privatpersonen</Link>
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
            headline: 'Whirlpool mit Kran heben: Garten oder Dachterrasse (Whirlpool-Kran-Guide 2026)',
            description:
              'Whirlpool über Haus oder auf Dachterrasse heben: Mobilkran 35–50t ab 450€, bei Penthouse-Lage Autokran ab 1.200€. Wann Sie wirklich einen Kran brauchen, und wann nicht.',
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
              { '@type': 'ListItem', position: 3, name: 'Whirlpool mit Kran heben' },
            ],
          }),
        }}
      />
    </div>
  )
}
