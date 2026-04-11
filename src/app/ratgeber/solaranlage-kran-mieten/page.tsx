import type { Metadata } from 'next'
import Link from 'next/link'
import { getSiteStats } from '@/lib/queries'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Solaranlage montieren: Welcher Kran für PV-Module? Kosten & Planung 2026',
  description:
    'PV-Module aufs Dach heben: Dachdeckerkran ab 200€/Tag für Standard-Einfamilienhäuser, Autokran für große Anlagen. Kosten pro kWp, Zeitplanung und Spezialausrüstung im Überblick.',
  alternates: { canonical: '/ratgeber/solaranlage-kran-mieten' },
  openGraph: {
    title: 'Solaranlage montieren: Welcher Kran für PV-Module? Kosten & Planung 2026',
    description:
      'PV-Module aufs Dach heben: Dachdeckerkran ab 200€/Tag für Standard-Einfamilienhäuser, Autokran für große Anlagen. Kosten pro kWp, Zeitplanung und Spezialausrüstung.',
    type: 'article',
    url: '/ratgeber/solaranlage-kran-mieten',
  },
}

const faqs = [
  {
    question: 'Was kostet ein Kran für eine PV-Anlage?',
    answer:
      'Für eine Standard-Einfamilienhaus-Anlage (10 kWp / ca. 20–25 Module) liegen die Krankosten bei 350–600€ für 1–2 Tage Dachdeckerkran-Miete. Bei größeren Anlagen (15–30 kWp) rechnen Sie mit 600–1.500€, bei Gewerbe-Anlagen (100 kWp+) zwischen 3.000€ und 8.000€. Pro kWp liegen die Krankosten im Durchschnitt bei 30–50€. Wochenmiete spart 15–30% gegenüber Einzeltagen.',
  },
  {
    question: 'Welcher Kran für Solaranlage am Einfamilienhaus?',
    answer:
      'Für die meisten Einfamilienhäuser mit Satteldach bis etwa 15 m Firsthöhe ist der Dachdeckerkran (ab 200€/Tag) die beste Wahl. Er passt in enge Zufahrten, ist 60–70% günstiger als ein Autokran und kann ohne Kranführerschein bedient werden. Einen Autokran brauchen Sie nur bei sehr hohen Dächern (über 25 m), großen Flachdächern mit weiter Ausladung oder wenn der Dachdeckerkran aus Platzgründen nicht aufgestellt werden kann.',
  },
  {
    question: 'Wie lange dauert die Kran-Miete für eine PV-Installation?',
    answer:
      'Die Einsatzdauer hängt von der Anlagengröße und Dachkomplexität ab: Kleinanlage bis 6 kWp meist ein halber Tag, Standard-EFH (10 kWp) 1 Tag, größere Anlage (15 kWp) 1–2 Tage, 30 kWp rund 2–3 Tage, Gewerbe-Anlagen ab 50 kWp meist 3–7 Tage oder Wochenmiete. Der Kran wird hauptsächlich für den Modultransport aufs Dach benötigt — die eigentliche Montage der Module dauert anschließend deutlich länger.',
  },
  {
    question: 'Kann ich PV-Module ohne Kran aufs Dach heben?',
    answer:
      'Theoretisch ja — bei kleinen Anlagen (unter 6 kWp) auf einem einstöckigen Gebäude können 2–3 Personen die Module über ein Gerüst oder eine Leiter tragen. Praktisch ist das aber langsam, riskant und bei modernen Modulen (20–25 kg pro Stück, oft sperrig mit 1,7–2 m Länge) unwirtschaftlich. Ab 10 Modulen oder bei Arbeitshöhen über 6 m ist ein Dachdeckerkran (ab 200€/Tag) praktisch immer die sinnvollere Lösung — er spart Zeit, Sicherheit und Transportschäden.',
  },
  {
    question: 'Brauche ich einen Kranführer für die PV-Montage?',
    answer:
      'Für den Dachdeckerkran, der bei den meisten PV-Installationen zum Einsatz kommt, brauchen Sie keinen Kranführer. Eine 30–60-minütige Einweisung durch den Vermieter (gemäß DGUV Vorschrift 52) reicht aus, Sie bedienen den Kran per Funkfernsteuerung vom Boden. Nur beim Autokran ist der Kranführer gesetzlich vorgeschrieben und im Mietpreis enthalten — dann wird die Montage aber auch deutlich professioneller und schneller.',
  },
  {
    question: 'Welche Spezialausrüstung brauche ich für PV-Module?',
    answer:
      'Je nach Modultyp gibt es unterschiedliche Hebeoptionen: (1) Standard-Module mit Rahmen werden meist mit Plattenhebern oder Tragegurten gehoben (im Kranpreis inklusive). (2) Rahmenlose (frameless) Module erfordern einen Vakuum-Heber oder Glassauger (50–120€/Tag extra). (3) Bei vielen Modulen gleichzeitig lohnen Spezialgreifer oder Modultransport-Gestelle (5–15 Module pro Hub). Fragen Sie den Kranvermieter vor der Buchung nach passendem Zubehör.',
  },
]

export default async function SolaranlageKranMietenPage() {
  const { anbieterCount } = await getSiteStats()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/ratgeber" className="hover:text-gray-600">Ratgeber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Solaranlage montieren mit Kran</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Solaranlage montieren: Welcher Kran für PV-Module?
        <span className="block text-gray-500 text-[18px] lg:text-xl font-normal mt-1">
          PV-Kran-Guide 2026
        </span>
      </h1>
      <p className="text-[15px] text-gray-500 mb-4 max-w-3xl">
        Für eine typische 10-kWp-Photovoltaik-Anlage auf einem Einfamilienhaus reicht ein{' '}
        <strong className="text-gray-900">Dachdeckerkran ab 200€/Tag</strong> — 60–70% günstiger
        als ein Autokran. Bei großen Gewerbedächern oder sehr hohen Gebäuden kommt ein{' '}
        <strong className="text-gray-900">Autokran ab 500€/Tag</strong> zum Einsatz. Dieser Guide
        zeigt Ihnen, welcher Kran zu Ihrer Anlagengröße passt, wie viel das kostet und worauf
        Sie bei der Planung achten müssen.
      </p>
      <p className="text-[11px] text-gray-300 mb-8">Stand: April 2026 · Alle Preise netto, Richtwerte</p>

      {/* TOC */}
      <nav className="mb-8 border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-medium text-gray-900 mb-2">Inhalt</p>
        <ul className="flex flex-col gap-1">
          <li><a href="#einstieg" className="text-[13px] text-blue-600 hover:underline">1. Wie kommen PV-Module aufs Dach?</a></li>
          <li><a href="#krantyp" className="text-[13px] text-blue-600 hover:underline">2. Welcher Kran für welches Dach?</a></li>
          <li><a href="#kosten" className="text-[13px] text-blue-600 hover:underline">3. Kosten pro kWp-Anlagengröße</a></li>
          <li><a href="#planung" className="text-[13px] text-blue-600 hover:underline">4. Einsatzplanung: Dauer nach Anlagengröße</a></li>
          <li><a href="#ausruestung" className="text-[13px] text-blue-600 hover:underline">5. Spezialausrüstung für PV-Module</a></li>
          <li><a href="#timing" className="text-[13px] text-blue-600 hover:underline">6. Timing &amp; Wetter-Faktoren</a></li>
          <li><a href="#genehmigungen" className="text-[13px] text-blue-600 hover:underline">7. Genehmigungen bei PV-Montage</a></li>
          <li><a href="#tipps" className="text-[13px] text-blue-600 hover:underline">8. 5 Tipps für PV-Installer &amp; Bauherren</a></li>
          <li><a href="#faq" className="text-[13px] text-blue-600 hover:underline">9. Häufige Fragen</a></li>
        </ul>
      </nav>

      <div className="space-y-10 text-[14px] text-gray-600 leading-relaxed">

        {/* Section 1: Einstieg */}
        <section id="einstieg" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            1. Wie kommen PV-Module aufs Dach?
          </h2>
          <p className="mb-3">
            Eine durchschnittliche Photovoltaik-Anlage auf einem Einfamilienhaus besteht aus{' '}
            <strong className="text-gray-900">20–25 Modulen mit je 20–25 kg</strong> bei Abmessungen
            von rund 1,7 × 1,1 m. Das sind insgesamt 400–600 kg Material, das auf eine Höhe von
            8–15 Metern gebracht werden muss — plus Unterkonstruktion, Wechselrichter und Kabel.
          </p>
          <p className="mb-4">
            Ein Kran ist bei jeder Anlage ab etwa 10 Modulen die sicherste und wirtschaftlichste
            Option. Zwei Haupttypen kommen zum Einsatz:
          </p>
          <div className="grid gap-3 sm:grid-cols-2 mb-4">
            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">
                <Link href="/dachdeckerkran-mieten" className="hover:text-blue-600">
                  Dachdeckerkran (Empfehlung)
                </Link>
              </p>
              <p className="text-[13px] text-gray-600 mb-2">
                Ab 200€/Tag, ohne Kranführer. Ideal für Einfamilienhäuser und
                Mehrfamilienhäuser bis ca. 15 m Hakenhöhe. Passt in enge Wohnstraßen.
              </p>
              <ul className="text-[12px] text-gray-600 space-y-0.5">
                <li>✓ Deutlich günstiger als Autokran</li>
                <li>✓ Kein Kranführerschein nötig</li>
                <li>✓ Kompakter Stellplatz (2,5 × 6 m)</li>
              </ul>
            </div>
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">
                <Link href="/autokran-mieten" className="hover:text-blue-600">
                  Autokran
                </Link>
              </p>
              <p className="text-[13px] text-gray-600 mb-2">
                Ab 500€/Tag inklusive Kranführer. Für hohe Dächer, große Gewerbedächer
                oder wenn der Dachdeckerkran aus Platz- oder Höhengründen nicht reicht.
              </p>
              <ul className="text-[12px] text-gray-600 space-y-0.5">
                <li>✓ Kranführer im Preis enthalten</li>
                <li>✓ Höhen bis 80 m erreichbar</li>
                <li>✓ Schnell einsatzbereit (15–30 Min.)</li>
              </ul>
            </div>
          </div>
          <p className="text-[13px] text-gray-500">
            Für die meisten privaten PV-Anlagen ist der Dachdeckerkran die richtige Wahl —
            und 3–5× günstiger als ein Autokran-Einsatz.
          </p>
        </section>

        {/* Section 2: Welcher Kran für welches Dach */}
        <section id="krantyp" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            2. Welcher Kran für welches Dach?
          </h2>
          <p className="mb-4">
            Die richtige Kranwahl hängt vor allem von <strong className="text-gray-900">Dachhöhe
            und Gebäudetyp</strong> ab. Hier eine Übersicht:
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50 border-b text-left">
                  <th className="py-3 px-4 font-medium text-gray-900">Dach / Gebäude</th>
                  <th className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">Firsthöhe</th>
                  <th className="py-3 px-4 font-medium text-gray-900">Empfohlener Krantyp</th>
                  <th className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">Tageskosten</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">EFH Satteldach, 1 Vollgeschoss</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">bis 8 m</td>
                  <td className="py-2.5 px-4"><Link href="/dachdeckerkran-mieten" className="text-blue-600 hover:underline">Dachdeckerkran</Link></td>
                  <td className="py-2.5 px-4 whitespace-nowrap">200–350€</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-4 font-medium text-gray-900">EFH, 2 Vollgeschosse</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">10–15 m</td>
                  <td className="py-2.5 px-4"><Link href="/dachdeckerkran-mieten" className="text-blue-600 hover:underline">Dachdeckerkran</Link></td>
                  <td className="py-2.5 px-4 whitespace-nowrap">250–450€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Mehrfamilienhaus, 3–5 Stockwerke</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">15–25 m</td>
                  <td className="py-2.5 px-4"><Link href="/dachdeckerkran-mieten" className="text-blue-600 hover:underline">Dachdeckerkran</Link> (am Limit) oder <Link href="/autokran-mieten" className="text-blue-600 hover:underline">Autokran</Link></td>
                  <td className="py-2.5 px-4 whitespace-nowrap">350–800€</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Gewerbedach / Halle</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">8–15 m</td>
                  <td className="py-2.5 px-4"><Link href="/autokran-mieten" className="text-blue-600 hover:underline">Autokran 30–50t</Link></td>
                  <td className="py-2.5 px-4 whitespace-nowrap">500–1.000€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Gewerbedach mit weiter Ausladung</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">15–25 m</td>
                  <td className="py-2.5 px-4"><Link href="/autokran-mieten" className="text-blue-600 hover:underline">Autokran 50–80t</Link></td>
                  <td className="py-2.5 px-4 whitespace-nowrap">800–1.500€</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium text-gray-900">Hochhaus / Industrie</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">25–40 m+</td>
                  <td className="py-2.5 px-4"><Link href="/autokran-mieten" className="text-blue-600 hover:underline">Autokran 80t+</Link></td>
                  <td className="py-2.5 px-4 whitespace-nowrap">1.200–2.500€</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Dachdeckerkrane erreichen Hakenhöhen bis etwa 30 m — theoretisch reichen sie also
            auch für 3–5-stöckige Mehrfamilienhäuser, allerdings wird die Ausladung knapp.
            Im Zweifel beim Vermieter nachfragen und Dachlage exakt beschreiben.
          </p>
        </section>

        {/* Section 3: Kosten */}
        <section id="kosten" className="scroll-mt-20 border border-gray-200 rounded-lg p-5 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            3. Kosten pro kWp-Anlagengröße
          </h2>
          <p className="mb-4">
            Die Krankosten für eine PV-Installation hängen hauptsächlich von der Anlagengröße
            und der daraus resultierenden Einsatzdauer ab. Hier Richtwerte für typische
            Anlagen mit Dachdeckerkran:
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50 border-b text-left">
                  <th className="py-3 px-3 font-medium text-gray-900 whitespace-nowrap">Anlage</th>
                  <th className="py-3 px-3 font-medium text-gray-900">Module (ca.)</th>
                  <th className="py-3 px-3 font-medium text-gray-900">Kran-Einsatz</th>
                  <th className="py-3 px-3 font-medium text-gray-900 whitespace-nowrap">Kran-Kosten gesamt</th>
                  <th className="py-3 px-3 font-medium text-gray-900 whitespace-nowrap">Pro kWp</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b">
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">6 kWp (klein)</td>
                  <td className="py-2.5 px-3">12–15 Module</td>
                  <td className="py-2.5 px-3">Halber bis 1 Tag DD-Kran</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">150–300€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">25–50€</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">10 kWp (Standard EFH)</td>
                  <td className="py-2.5 px-3">20–25 Module</td>
                  <td className="py-2.5 px-3">1–2 Tage DD-Kran</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">350–600€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">35–60€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">15 kWp (groß EFH)</td>
                  <td className="py-2.5 px-3">30–37 Module</td>
                  <td className="py-2.5 px-3">2 Tage DD-Kran</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">500–800€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">33–53€</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">30 kWp (kleines Gewerbe)</td>
                  <td className="py-2.5 px-3">60–75 Module</td>
                  <td className="py-2.5 px-3">DD-Kran Wochenmiete oder Autokran 1–2 Tage</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">800–1.500€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">27–50€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">50 kWp (Gewerbe)</td>
                  <td className="py-2.5 px-3">100–125 Module</td>
                  <td className="py-2.5 px-3">Autokran 2–3 Tage oder DD-Kran Wochenmiete</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">1.500–3.000€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">30–60€</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-gray-900 whitespace-nowrap">100 kWp (Gewerbe groß)</td>
                  <td className="py-2.5 px-3">200–250 Module</td>
                  <td className="py-2.5 px-3">Autokran 3–5 Tage oder DD-Kran 2 Wochen</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">3.000–8.000€</td>
                  <td className="py-2.5 px-3 whitespace-nowrap text-gray-700">30–80€</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-3">
            Alle Preise netto, Richtwerte für Standard-Satteldächer. Bei schwierigen Dachlagen,
            weiter Ausladung oder komplexer Logistik können die Kosten um 20–40% höher liegen.
            Wochenmiete spart 15–30% gegenüber Einzeltagen.
          </p>
          <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-[13px] text-gray-700">
              <strong className="text-gray-900">Faustregel:</strong> Die Krankosten machen meist{' '}
              <strong className="text-gray-900">1–3% der Gesamtkosten einer PV-Anlage</strong>{' '}
              aus — ein minimaler Aufwand, der gegenüber manuellem Tragen Zeit, Sicherheit und
              potentielle Transportschäden spart.
            </p>
          </div>
        </section>

        {/* Section 4: Einsatzplanung */}
        <section id="planung" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            4. Einsatzplanung: Dauer nach Anlagengröße
          </h2>
          <p className="mb-4">
            Der Kran wird bei einer PV-Installation vor allem für den{' '}
            <strong className="text-gray-900">Modultransport aufs Dach</strong> benötigt — die
            eigentliche Montage (Unterkonstruktion schrauben, Module befestigen, Verkabelung)
            dauert anschließend deutlich länger und braucht keinen Kran mehr. Planen Sie die
            Kranmiete daher gezielt für die Hebetage:
          </p>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">5–10 kWp (Einfamilienhaus klein)</p>
              <p className="text-[13px] text-gray-500">
                <strong>Kran-Dauer:</strong> Halber Tag bis 1 Tag. Typisch werden alle Module
                am ersten Tag aufs Dach gebracht, dann arbeiten 2 Monteure die folgenden 2–4 Tage
                ohne Kran weiter.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">10–15 kWp (Standard EFH)</p>
              <p className="text-[13px] text-gray-500">
                <strong>Kran-Dauer:</strong> 1–2 Tage. Eine gute Lösung ist oft: Tag 1 Module
                und Unterkonstruktion aufs Dach, danach 3–5 Tage Montage ohne Kran.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">15–30 kWp (großes EFH / kleines Gewerbe)</p>
              <p className="text-[13px] text-gray-500">
                <strong>Kran-Dauer:</strong> 2–3 Tage. Bei mehreren Dachseiten oder komplexer
                Geometrie kann sich eine Wochenmiete lohnen (1.000–2.500€ Dachdeckerkran statt
                3–4 Einzeltage).
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">30–100 kWp (Gewerbe)</p>
              <p className="text-[13px] text-gray-500">
                <strong>Kran-Dauer:</strong> 3–7 Tage. Bei Flachdächern wird oft der Autokran
                für schnellen Modultransport eingesetzt, bei Satteldächern der Dachdeckerkran
                im Wochenmietmodus. Planen Sie Pufferzeit für Wetter ein.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">100 kWp+ (Gewerbe groß)</p>
              <p className="text-[13px] text-gray-500">
                <strong>Kran-Dauer:</strong> Mehrere Wochen, oft Kombination Autokran + Dachdeckerkran.
                Bei Solarparks auf Dächern lohnt sich die Monatsmiete eines Dachdeckerkrans
                (3.000–7.000€/Monat).
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Spezialausrüstung */}
        <section id="ausruestung" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            5. Spezialausrüstung für PV-Module
          </h2>
          <p className="mb-4">
            PV-Module sind empfindlich und sperrig — Kratzer, Mikrorisse oder unsachgemäße
            Handhabung können Leistung und Garantie beeinträchtigen. Für sicheren Transport
            aufs Dach gibt es spezialisierte Hebeausrüstung:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Standard-Plattenheber mit Gurten</p>
              <p className="text-[13px] text-gray-500 mb-1">
                Für Module mit Aluminiumrahmen (Standard). Meist im Kranpreis enthalten. Module
                werden einzeln oder zu 2–3 Stück pro Hub transportiert.
              </p>
              <p className="text-[11px] text-gray-400">Aufpreis: meist keiner</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Vakuum-Heber / Glassauger</p>
              <p className="text-[13px] text-gray-500 mb-1">
                Ideal für rahmenlose (frameless) Module und Doppelglas-Module. Hebt das Modul
                saugend an der Glasoberfläche, ohne Kratzerrisiko. Besonders schonend.
              </p>
              <p className="text-[11px] text-gray-400">Aufpreis: 50–120€/Tag</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Modultransport-Gestelle</p>
              <p className="text-[13px] text-gray-500 mb-1">
                Spezielle Stahlrahmen, in die 5–15 Module gleichzeitig gepackt werden. Spart
                bei großen Anlagen deutlich Hebezeit — statt 25 Einzelhübe nur 3–5 Gestell-Hübe.
              </p>
              <p className="text-[11px] text-gray-400">Aufpreis: 30–80€/Tag</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Anti-Kratzer-Schutz</p>
              <p className="text-[13px] text-gray-500 mb-1">
                Filz- oder Gummiauflagen an den Hebegurten verhindern Oberflächenschäden. Bei
                seriösen Vermietern Standard, aber vor der Buchung unbedingt nachfragen.
              </p>
              <p className="text-[11px] text-gray-400">Aufpreis: meist keiner</p>
            </div>
          </div>
          <div className="mt-4 bg-amber-50 border border-amber-100 rounded-lg p-4">
            <p className="text-[13px] text-amber-800">
              <strong>Wichtig:</strong> Fragen Sie vor der Buchung explizit, welches Hebezubehör
              verfügbar ist — gerade bei frameless-Modulen ist ein Vakuum-Heber entscheidend,
              und nicht jeder Vermieter hat ihn im Sortiment.
            </p>
          </div>
        </section>

        {/* Section 6: Timing */}
        <section id="timing" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            6. Timing &amp; Wetter-Faktoren
          </h2>
          <p className="mb-4">
            PV-Montage ist stark wetterabhängig. Neben dem richtigen Kran-Termin müssen Sie
            auch Wind, Regen und Temperaturen einkalkulieren:
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-lg mb-4">
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
                  <td className="py-2.5 px-4">&gt; 50 km/h</td>
                  <td className="py-2.5 px-4 text-gray-500">Kranarbeit muss eingestellt werden — Module zu sperrig</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Starker Regen</td>
                  <td className="py-2.5 px-4">&gt; 5 mm/h</td>
                  <td className="py-2.5 px-4 text-gray-500">Rutschgefahr auf dem Dach, Einsatz sollte pausiert werden</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Gewitter</td>
                  <td className="py-2.5 px-4">Blitzgefahr</td>
                  <td className="py-2.5 px-4 text-gray-500">Sofortiges Einstellen der Arbeiten, Kran absenken</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Temperatur</td>
                  <td className="py-2.5 px-4">&lt; −5°C</td>
                  <td className="py-2.5 px-4 text-gray-500">Module werden bruchempfindlich, Hydraulik langsamer</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium text-gray-900">Schnee / Eis auf Dach</td>
                  <td className="py-2.5 px-4">jede Menge</td>
                  <td className="py-2.5 px-4 text-gray-500">Absturzgefahr, Dach erst räumen, dann Montage</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-[13px] text-gray-700">
              <strong className="text-gray-900">Solar-Hochsaison:</strong> April–Oktober ist die
              PV-Installation am häufigsten. Dachdeckerkrane brauchen dann 1–2 Wochen Vorlauf,
              Autokrane 2–4 Wochen. In der Nebensaison (November–März) sind Krane kurzfristig
              verfügbar, aber Wetter-Ausfälle sind häufig — planen Sie 1–2 Puffertage ein.
            </p>
          </div>
        </section>

        {/* Section 7: Genehmigungen */}
        <section id="genehmigungen" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            7. Genehmigungen bei PV-Montage
          </h2>
          <p className="mb-4">
            Bei der PV-Installation geht es um zwei Genehmigungsebenen: (1) die PV-Anlage selbst
            (Netzanmeldung, ggf. Baurecht), (2) der Kran-Einsatz. Für die PV-Anlage sind je nach
            Bundesland und Größe unterschiedliche Schritte nötig — das klären Sie mit Ihrem
            Installateur. Für den Kran gelten folgende Regeln:
          </p>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Eigenes Grundstück</p>
              <p className="text-[13px] text-gray-500">
                Steht der Kran vollständig auf Ihrem eigenen Grundstück (Einfahrt, Garten),
                brauchen Sie in der Regel keine Genehmigung. Bitte prüfen Sie trotzdem die
                Bodenbelastbarkeit — der Dachdeckerkran braucht stabilen Untergrund.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Öffentlicher Straßenraum / Gehweg</p>
              <p className="text-[13px] text-gray-500">
                Wenn der Kran auf öffentlichem Grund steht (Straße, Bürgersteig, Parkfläche),
                brauchen Sie eine Sondernutzungserlaubnis vom Ordnungsamt. Kosten: 50–200€.
                Beantragen Sie sie 1–3 Wochen vor dem Einsatz.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Schwenken über Nachbargrundstück</p>
              <p className="text-[13px] text-gray-500">
                Wenn der Kranausleger über ein Nachbargrundstück schwenkt (auch nur kurz mit
                dem Modulpaket), brauchen Sie die schriftliche Zustimmung des Nachbarn.
                Sprechen Sie rechtzeitig — spätestens 2–3 Wochen vorher.
              </p>
            </div>
          </div>
          <p className="text-[13px] text-gray-500 mt-3">
            Ausführliche Informationen zu allen Kran-Genehmigungen:{' '}
            <Link href="/ratgeber/kran-aufstellen-genehmigung" className="text-blue-600 hover:underline">
              Kran aufstellen: Genehmigungen im Detail &rarr;
            </Link>
          </p>
        </section>

        {/* Section 8: Tipps */}
        <section id="tipps" className="scroll-mt-20 border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            8. 5 Tipps für PV-Installer &amp; Bauherren
          </h2>
          <ol className="space-y-3 text-[14px]">
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">1</span>
              <div>
                <p className="font-medium text-gray-900">Dachdeckerkran zuerst prüfen — 3–5× günstiger als Autokran</p>
                <p className="text-[13px] text-gray-500">
                  Für Standard-Einfamilienhäuser ist der Dachdeckerkran (ab 200€/Tag) fast
                  immer die bessere Wahl. Nur wenn Dachhöhe oder Platzverhältnisse ihn
                  ausschließen, auf Autokran umsteigen.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">2</span>
              <div>
                <p className="font-medium text-gray-900">Wochenmiete bei Anlagen ab 15 kWp</p>
                <p className="text-[13px] text-gray-500">
                  Ab 2–3 Einsatztagen lohnt sich die Wochenmiete fast immer — 15–30% Ersparnis
                  gegenüber Einzeltagen. Auch wenn Sie den Kran nicht jeden Tag brauchen, ist
                  eine durchgehende Wochenmiete oft günstiger.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">3</span>
              <div>
                <p className="font-medium text-gray-900">Modullieferung und Kran synchron planen</p>
                <p className="text-[13px] text-gray-500">
                  PV-Module werden meist in Paletten à 30+ Stück geliefert. Koordinieren Sie
                  Lieferant und Kranvermieter, damit die Module nicht tagelang auf der Straße
                  stehen — oder der Kran auf die Lieferung wartet.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">4</span>
              <div>
                <p className="font-medium text-gray-900">Spezialausrüstung (Vakuumheber) nachfragen</p>
                <p className="text-[13px] text-gray-500">
                  Bei rahmenlosen Modulen ist der Vakuum-Heber (50–120€/Tag extra) eine gute
                  Investition — schont die Oberfläche und verhindert Garantieprobleme durch
                  Mikrorisse.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">5</span>
              <div>
                <p className="font-medium text-gray-900">Dachtragfähigkeit vor Montage prüfen</p>
                <p className="text-[13px] text-gray-500">
                  Eine 10-kWp-Anlage wiegt mit Unterkonstruktion rund 600–800 kg verteilt auf
                  25–40 m² Dachfläche. Bei Altbauten oder ungewissem Zustand des Dachs vorher
                  ein Statiker-Gutachten einholen — die meisten Dächer halten es aber problemlos.
                </p>
              </div>
            </li>
          </ol>
        </section>

        {/* Section 9: FAQ */}
        <section id="faq" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            9. Häufige Fragen zur Kran-Miete für Solaranlagen
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

      {/* Section 10: CTA */}
      <section className="mt-10 bg-blue-50 border border-blue-100 rounded-xl p-6 sm:p-8 text-center mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Kran für Ihre PV-Montage finden
        </h2>
        <p className="text-[14px] text-gray-500 mb-5 max-w-lg mx-auto">
          Vergleichen Sie {anbieterCount}+ Kranvermieter in ganz Deutschland — Dachdeckerkran
          für Standard-EFH-Anlagen, Autokran für große Gewerbedächer. Kostenlos Angebote bei
          mehreren Anbietern gleichzeitig anfragen.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          <Link href="/dachdeckerkran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Dachdeckerkran mieten</Link>
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
          <Link href="/dachdeckerkran-mieten#ratgeber" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Dachdeckerkran Kosten &amp; Tipps</Link>
          <Link href="/autokran-mieten#ratgeber" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Autokran Kosten im Detail</Link>
          <Link href="/kran-mieten-preise" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Alle Mietpreise im Überblick</Link>
          <Link href="/ratgeber/kran-mieten-hausbau" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Kran für den Hausbau</Link>
          <Link href="/ratgeber/kran-aufstellen-genehmigung" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Kran-Genehmigungen</Link>
          <Link href="/ratgeber/krantypen" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Alle Krantypen im Vergleich</Link>
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
            headline: 'Solaranlage montieren: Welcher Kran für PV-Module? (PV-Kran-Guide 2026)',
            description:
              'PV-Module aufs Dach heben: Dachdeckerkran ab 200€/Tag für Standard-Einfamilienhäuser, Autokran für große Anlagen. Kosten pro kWp, Zeitplanung und Spezialausrüstung im Überblick.',
            author: { '@type': 'Organization', name: 'KranVergleich.de', url: 'https://kranvergleich.de' },
            datePublished: '2026-04-11',
            dateModified: '2026-04-11',
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
              { '@type': 'ListItem', position: 3, name: 'Solaranlage montieren mit Kran' },
            ],
          }),
        }}
      />
    </div>
  )
}
