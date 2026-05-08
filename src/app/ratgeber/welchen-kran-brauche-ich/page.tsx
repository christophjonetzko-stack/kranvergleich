import type { Metadata } from 'next'
import Link from 'next/link'
import { getSiteStats } from '@/lib/queries'
import { OG_IMAGE } from '@/lib/og-image'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Welchen Kran brauche ich? — Der große Kran-Ratgeber',
  description:
    'Welchen Kran brauche ich? Minikran, Autokran oder Baukran — unser Ratgeber hilft Ihnen, den richtigen Kran für Ihr Projekt zu finden. Mit Empfehlungen nach Einsatzzweck.',
  alternates: { canonical: '/ratgeber/welchen-kran-brauche-ich' },
  openGraph: {
    title: 'Welchen Kran brauche ich? — Der große Kran-Ratgeber',
    description:
      'Welchen Kran brauche ich? Minikran, Autokran oder Baukran — unser Ratgeber hilft Ihnen, den richtigen Kran für Ihr Projekt zu finden.',
    type: 'website',
    url: '/ratgeber/welchen-kran-brauche-ich',
      images: [OG_IMAGE],
  },
}

const scenarios = [
  {
    title: 'Dacharbeiten & Dachsanierung',
    description: 'Material aufs Dach heben: Ziegel, Dämmstoffe, Solarmodule. Einsatz vor Wohnhäusern mit begrenztem Platz.',
    recommendation: 'Dachdeckerkran',
    slug: 'dachdeckerkran-mieten',
    why: 'Kompakt, schnell aufgebaut, erreicht Hakenhöhen bis 30m. Kann an der Straße stehen und Material direkt aufs Dach heben.',
  },
  {
    title: 'Glasmontage & Fenstermontage',
    description: 'Schwere Glasscheiben, Fensterelemente oder Fassadenplatten millimetergenau positionieren.',
    recommendation: 'Minikran mit Glassauger',
    slug: 'minikran-mieten',
    why: 'Minikrane mit Vakuumheber (Glassauger) sind speziell für die präzise Montage schwerer Glaselemente ausgelegt. Passen durch enge Zufahrten.',
  },
  {
    title: 'Enge Baustellen & Innenräume',
    description: 'Heben in Hinterhöfen, Innenhöfen, Fabrikhallen oder durch Türöffnungen.',
    recommendation: 'Minikran',
    slug: 'minikran-mieten',
    why: 'Ab 80cm Durchfahrbreite einsetzbar, elektrisch betrieben (abgasfrei für Innenräume), Tragkraft bis 3t.',
  },
  {
    title: 'Schwerlast & Industriemontage',
    description: 'Lasten über 50 Tonnen: Maschinen, Stahlkonstruktionen, Brückenteile, Windkraftanlagen.',
    recommendation: 'Raupenkran oder Mobilkran',
    slug: 'raupenkran-mieten',
    why: 'Raupenkrane tragen bis 3.000t und arbeiten auf unbefestigtem Untergrund. Mobilkrane bis 1.200t sind flexibler im Transport.',
  },
  {
    title: 'Kurzfristige Hebearbeiten (1–2 Tage)',
    description: 'Einzelne Hebearbeiten: Klimaanlage aufs Dach, Pool in den Garten, Maschine in die Halle.',
    recommendation: 'Autokran',
    slug: 'autokran-mieten',
    why: 'Schnell vor Ort, in 15–30 Min. aufgebaut, Kranführer inklusive. Ideal für Tageseinsätze mit mittleren bis schweren Lasten.',
  },
  {
    title: 'Großbaustelle (3+ Monate)',
    description: 'Dauerhafter Kran für Neubau, Hochbau oder große Sanierungsprojekte.',
    recommendation: 'Baukran (Turmdrehkran)',
    slug: 'baukran-mieten',
    why: 'Monatsmiete ab 4.000€. Deckt die gesamte Baustelle ab. Montage/Demontage 3.000–8.000€ extra, lohnt sich ab 3 Monaten.',
  },
  {
    title: 'Be- und Entladen von LKW',
    description: 'Material vom LKW abladen: Baustoffe, Container, Maschinenteile.',
    recommendation: 'Ladekran',
    slug: 'ladekran-mieten',
    why: 'Auf dem LKW montiert, Tragkraft 1–30t. Oft als Komplettpaket mit Fahrer buchbar.',
  },
  {
    title: 'Kleine Hebearbeiten mit kleinem Budget',
    description: 'Leichte Lasten bis 1,5t heben, Budget unter 200€/Tag.',
    recommendation: 'Anhängerkran',
    slug: 'anhaengerkran-mieten',
    why: 'Günstigste Option ab 150€/Tag. Mit PKW-Anhängerkupplung transportierbar. Ideal für Garten- und Landschaftsbau.',
  },
]

export default async function WelchenKranPage() {
  const { anbieterCount, staedteCount } = await getSiteStats()
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Welchen Kran brauche ich?</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Welchen Kran brauche ich?
      </h1>
      <p className="text-[15px] text-gray-500 mb-8 max-w-3xl">
        Die Wahl des richtigen Krans hängt von Ihrem Projekt ab: Was soll gehoben werden?
        Wie schwer ist die Last? Wie viel Platz haben Sie? Unser Ratgeber hilft Ihnen,
        den passenden Krantyp zu finden.
      </p>

      {/* Scenario cards */}
      <div className="space-y-4 mb-10">
        {scenarios.map((s) => (
          <div key={s.title} className="border border-gray-200 rounded-lg p-5">
            <h2 className="font-medium text-[15px] text-gray-900 mb-1">{s.title}</h2>
            <p className="text-[13px] text-gray-500 mb-3">{s.description}</p>
            <div className="flex items-start gap-3">
              <Link
                href={`/${s.slug}`}
                className="text-[13px] font-medium text-blue-600 hover:text-blue-700 shrink-0"
              >
                {s.recommendation} &rarr;
              </Link>
              <p className="text-[12px] text-gray-400">{s.why}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary table */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Krantypen im Vergleich
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2 px-3 font-medium text-gray-900">Krantyp</th>
                <th className="py-2 px-3 font-medium text-gray-900">Tragkraft</th>
                <th className="py-2 px-3 font-medium text-gray-900">Preis ab</th>
                <th className="py-2 px-3 font-medium text-gray-900">Ideal für</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              <tr className="border-b"><td className="py-2 px-3"><Link href="/minikran-mieten" className="text-blue-600 hover:underline">Minikran</Link></td><td className="py-2 px-3">500–3.000 kg</td><td className="py-2 px-3">250€/Tag</td><td className="py-2 px-3">Enge Baustellen, Innenräume, Glasmontage</td></tr>
              <tr className="border-b"><td className="py-2 px-3"><Link href="/autokran-mieten" className="text-blue-600 hover:underline">Autokran</Link></td><td className="py-2 px-3">10–500 t</td><td className="py-2 px-3">500€/Tag</td><td className="py-2 px-3">Kurzfristige Hebearbeiten, flexibel</td></tr>
              <tr className="border-b"><td className="py-2 px-3"><Link href="/dachdeckerkran-mieten" className="text-blue-600 hover:underline">Dachdeckerkran</Link></td><td className="py-2 px-3">500–2.000 kg</td><td className="py-2 px-3">200€/Tag</td><td className="py-2 px-3">Dacharbeiten, Solaranlagen</td></tr>
              <tr className="border-b"><td className="py-2 px-3"><Link href="/baukran-mieten" className="text-blue-600 hover:underline">Baukran</Link></td><td className="py-2 px-3">1–20 t</td><td className="py-2 px-3">4.000€/Monat</td><td className="py-2 px-3">Großbaustellen, Langzeiteinsatz</td></tr>
              <tr className="border-b"><td className="py-2 px-3"><Link href="/raupenkran-mieten" className="text-blue-600 hover:underline">Raupenkran</Link></td><td className="py-2 px-3">50–3.000 t</td><td className="py-2 px-3">800€/Tag</td><td className="py-2 px-3">Schwerlast, Infrastruktur, Windkraft</td></tr>
              <tr className="border-b"><td className="py-2 px-3"><Link href="/mobilkran-mieten" className="text-blue-600 hover:underline">Mobilkran</Link></td><td className="py-2 px-3">20–1.200 t</td><td className="py-2 px-3">600€/Tag</td><td className="py-2 px-3">Schwerlast, flexibler als Raupenkran</td></tr>
              <tr className="border-b"><td className="py-2 px-3"><Link href="/ladekran-mieten" className="text-blue-600 hover:underline">Ladekran</Link></td><td className="py-2 px-3">1–30 t</td><td className="py-2 px-3">300€/Tag</td><td className="py-2 px-3">Be-/Entladen, LKW-Transport</td></tr>
              <tr><td className="py-2 px-3"><Link href="/anhaengerkran-mieten" className="text-blue-600 hover:underline">Anhängerkran</Link></td><td className="py-2 px-3">bis 1.500 kg</td><td className="py-2 px-3">150€/Tag</td><td className="py-2 px-3">Kleiner Budget, Gartenbau</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Minikran vs. Autokran — der häufigste Vergleich.
          Konsolidiert aus dem ehemaligen /ratgeber/minikran-vs-autokran
          (Google hat die Standalone-Seite nicht indexiert; Inhalt ist hier
          stärker, weil im Authority-Kontext des Eltern-Ratgebers). */}
      <section className="mb-10 border border-gray-200 rounded-lg p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Minikran vs. Autokran — der häufigste Vergleich
        </h2>
        <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
          Minikran und Autokran decken zusammen rund 80 % aller Hebearbeiten auf
          deutschen Baustellen ab — sie sind aber für sehr unterschiedliche
          Einsätze gemacht. Hier die wichtigsten Unterschiede auf einen Blick:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border border-gray-200 rounded-md">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-2.5 px-3 text-left font-medium text-gray-900">Kriterium</th>
                <th className="py-2.5 px-3 text-left font-medium text-blue-600">Minikran</th>
                <th className="py-2.5 px-3 text-left font-medium text-blue-600">Autokran</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b"><td className="py-2 px-3 font-medium text-gray-700">Tragkraft</td><td className="py-2 px-3">500 kg – 3 t</td><td className="py-2 px-3">10 – 500 t</td></tr>
              <tr className="border-b"><td className="py-2 px-3 font-medium text-gray-700">Hubhöhe</td><td className="py-2 px-3">bis ca. 25 m</td><td className="py-2 px-3">bis ca. 80 m</td></tr>
              <tr className="border-b"><td className="py-2 px-3 font-medium text-gray-700">Min. Zufahrt</td><td className="py-2 px-3">ab 80 cm</td><td className="py-2 px-3">ab 3 m (LKW-Breite)</td></tr>
              <tr className="border-b"><td className="py-2 px-3 font-medium text-gray-700">Aufbauzeit</td><td className="py-2 px-3">5–15 Min. (Funkfernbedienung)</td><td className="py-2 px-3">15–30 Min. (Stützen ausfahren)</td></tr>
              <tr className="border-b"><td className="py-2 px-3 font-medium text-gray-700">Bediener nötig?</td><td className="py-2 px-3">Nein — Selbstbedienung nach 30 Min. Einweisung</td><td className="py-2 px-3">Ja — Kranführer im Preis enthalten</td></tr>
              <tr className="border-b"><td className="py-2 px-3 font-medium text-gray-700">Innenraum-tauglich?</td><td className="py-2 px-3">Ja — elektrisch, abgasfrei</td><td className="py-2 px-3">Nein — Diesel-LKW</td></tr>
              <tr className="border-b"><td className="py-2 px-3 font-medium text-gray-700">Tagespreis</td><td className="py-2 px-3">ab 250 € (ohne Bediener)</td><td className="py-2 px-3">ab 500 € (inkl. Kranführer)</td></tr>
              <tr><td className="py-2 px-3 font-medium text-gray-700">Wochenpreis</td><td className="py-2 px-3">ab 1.200 €</td><td className="py-2 px-3">ab 2.500 €</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-[15px] font-semibold text-gray-900 mt-6 mb-2">Wann Minikran besser ist</h3>
        <ul className="text-[14px] text-gray-600 leading-relaxed list-disc pl-5 space-y-1.5 mb-4">
          <li>Der Einsatzort ist eng (Hinterhof, Innenraum, Durchfahrt unter 3 m)</li>
          <li>Die Last wiegt unter 3 Tonnen</li>
          <li>Sie wollen den Kran selbst bedienen (kein Kranführerschein nötig)</li>
          <li>Sie arbeiten in Innenräumen oder auf empfindlichem Untergrund (Rasen, Parkett)</li>
          <li>Glasmontage mit Vakuumheber (sogenannter Spinnenkran-Einsatz)</li>
        </ul>

        <h3 className="text-[15px] font-semibold text-gray-900 mt-4 mb-2">Wann Autokran besser ist</h3>
        <ul className="text-[14px] text-gray-600 leading-relaxed list-disc pl-5 space-y-1.5 mb-4">
          <li>Die Last wiegt über 3 Tonnen</li>
          <li>Sie brauchen Hubhöhen über 25 m</li>
          <li>Es ist ein einzelner, schneller Tageseinsatz (Klimaanlage aufs Dach, Pool in Garten)</li>
          <li>Sie wollen sich nicht selbst um die Bedienung kümmern (Kranführer ist Pflicht und im Preis)</li>
          <li>Die Zufahrt ist breit genug für einen LKW (mindestens 3 m)</li>
        </ul>

        <p className="text-[14px] text-gray-500 leading-relaxed">
          <strong className="text-gray-700">Faustregel:</strong> Bis 3 t und/oder enge Zufahrt &rarr;{' '}
          <Link href="/minikran-mieten" className="text-blue-600 hover:underline">Minikran</Link>.
          Über 3 t oder Tagesgeschäft &rarr;{' '}
          <Link href="/autokran-mieten" className="text-blue-600 hover:underline">Autokran</Link>.
          Bei Glasmontage prüfen Sie zuerst die Zufahrtbreite — die entscheidet stärker als das Gewicht.
        </p>
      </section>

      {/* Echte Anfragen 2026 — worked-examples z 5 anonimizowanych realnych
          leadów z 23.04 - 07.05. Komplement do abstrakcyjnych scenarios u góry.
          Anonimizowane (no Vorname, no PLZ, no firm names) per DSGVO Art. 6. */}
      <section className="mb-10 border border-gray-200 rounded-lg p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Echte Anfragen 2026: 5 anonymisierte Beispiele
        </h2>
        <p className="text-[14px] text-gray-500 leading-relaxed mb-6">
          Theorie ist das eine. Hier sind fünf reale Anfragen der letzten 30 Tage,
          anonymisiert. Jede zeigt, wie aus einem „ich brauche einen Kran" eine
          konkrete Maschinenklasse, ein Preisrahmen und die typischen Stolperstellen
          werden.
        </p>

        {/* Beispiel 1 — Fensterpaletten / Autokran */}
        <article className="mb-7">
          <h3 className="text-[15px] font-semibold text-gray-900 mb-2">
            1. Fensterpaletten aufs Dach: 30-Tonner für 1,5 t auf 22 m Höhe
          </h3>
          <div className="text-[14px] text-gray-600 leading-relaxed space-y-2.5">
            <p><strong className="text-gray-800">Was der Kunde wollte.</strong> Eine Privatperson aus Berlin mit Bauunternehmer-Hintergrund will Fensterpaletten auf das Dach eines Wohnhauses heben. Lasten max. 1,5 t, Hubhöhe rund 22 m, Einsatzdauer ein Tag. Der Kran kann auf dem eigenen Grundstück abstützen.</p>
            <p><strong className="text-gray-800">Welcher Kran tatsächlich passt.</strong> Hier reicht ein Autokran mit 30-40 t Nennhublast. Das klingt überdimensioniert für 1,5 t, ist es aber nicht: Bei 22 m Hubhöhe und einer realistischen Auslage von 8-12 m sinkt die effektive Hublast eines 30-Tonners auf 3-5 t. Rechnet man die Sicherheitsmarge mit ein, bleibt der 30-Tonner die richtige Klasse. Der Bediener ist beim Autokran immer dabei.</p>
            <p><strong className="text-gray-800">Was es kostet (Richtwert, Stand Mai 2026).</strong> Ein Tageseinsatz mit 30-40 t Autokran inkl. Bediener kostet bei typischen SME-Anbietern aus unserem Katalog rund 800-1.400 € netto, dazu Anfahrt 1-3 €/km. Für eine Berliner Adresse mit Anbieter im Stadtgebiet sind 900-1.600 € netto Gesamt realistisch. Richtwerte, keine Festpreise.</p>
            <p><strong className="text-gray-800">Häufige Fehler.</strong> Tonnage am Mast ist nicht gleich Tonnage an der Spitze. Wer denkt „1,5 t, da reicht ein 5-Tonner", verkennt, dass die Tragkraft mit jedem Meter Auslage stark fällt. Bei einem 5-Tonner auf 10 m Auslage bleiben oft nur 1,2 t, ohne jede Sicherheitsmarge. Lieber eine Klasse größer wählen als zu knapp dimensionieren.</p>
            <p>
              <Link href="/autokran-mieten" className="text-blue-600 hover:underline text-[14px]">
                Mehr zu Autokran mieten &rarr;
              </Link>
            </p>
          </div>
        </article>

        {/* Beispiel 2 — Glasscheiben / Minikran z Glassauger */}
        <article className="mb-7">
          <h3 className="text-[15px] font-semibold text-gray-900 mb-2">
            2. Glasscheiben aufs Terrassendach: Minikran mit Glassauger
          </h3>
          <div className="text-[14px] text-gray-600 leading-relaxed space-y-2.5">
            <p><strong className="text-gray-800">Was der Kunde wollte.</strong> Eine Privatperson aus Norddeutschland, selbst Baumaschinist, plant 13 Terrassenscheiben (450 × 80 cm) auf ein Terrassengestell zu legen. Durchfahrt zum Hof: 3 m. Untergrund: fester Rasen. Trotz eigener Maschinenerfahrung wünscht der Kunde einen Bediener.</p>
            <p><strong className="text-gray-800">Welcher Kran tatsächlich passt.</strong> Ein klassischer Fall für einen Minikran mit Glassauger-Anbaugerät. Eine Tragkraft von 1-3 t reicht bei rund 200-300 kg pro Scheibe locker; entscheidender ist die Reichweite von 8-15 m, je nach Gestellposition. Minikrane fahren durch 80-90 cm breite Türen, der 3-m-Durchgang ist also kein Hindernis. Auf festem Rasen halten sie gut, während größere Mobilkrane mit ihren Stützen den Boden durchbrechen würden.</p>
            <p><strong className="text-gray-800">Was es kostet (Richtwert, Stand Mai 2026).</strong> Ein Minikran-Tageseinsatz mit Bediener und Glassauger liegt bei 600-1.200 € netto. Der Aufschlag für den Glassauger macht je nach Modell 150-300 € aus. Bei typischen SME-Anbietern aus unserem Katalog ist das ein Standardpaket. Richtwerte, keine Festpreise.</p>
            <p><strong className="text-gray-800">Häufige Fehler.</strong> Ein Glassauger sieht einfach aus, ist er aber nicht. Eine 200-kg-Scheibe an der Saugplatte zu führen, ohne sie anzukippen oder bei Wind aus der Bahn kommen zu lassen, braucht Übung. Bei Glasmontagen ist der Bediener die wichtigste Investition, nicht der Kran selbst. Zweiter Punkt: Ab Windstärke 4 fällt eine Glasmontage praktisch immer aus, der Termin sollte also mit Wetter-Reserve geplant werden.</p>
            <p>
              <Link href="/minikran-mieten" className="text-blue-600 hover:underline text-[14px]">
                Mehr zu Minikran mieten &rarr;
              </Link>
            </p>
          </div>
        </article>

        {/* Beispiel 3 — Holzrahmenhaus / Mobilkran 45-60t */}
        <article className="mb-7">
          <h3 className="text-[15px] font-semibold text-gray-900 mb-2">
            3. Holzrahmenhaus aufstellen: 45-60-Tonner über mehrere Tage
          </h3>
          <div className="text-[14px] text-gray-600 leading-relaxed space-y-2.5">
            <p><strong className="text-gray-800">Was der Kunde wollte.</strong> Eine Privatperson aus Mittelfranken will ein Holzrahmenhaus auf eine fertige Bodenplatte stellen. Einsatzdauer 4-5 Tage, Hakenlast mindestens 2 t, Bediener inkl., Termin Ende Juni / Anfang Juli 2026.</p>
            <p><strong className="text-gray-800">Welcher Kran tatsächlich passt.</strong> Für Holzrahmenhäuser ist die 45-60 t Mobilkran-Klasse die übliche Wahl. Die geforderten 2 t Hakenlast beziehen sich auf einzelne Wand- und Dachelemente, die der Kran an einer Auslage von 10-15 m sicher heben muss. Ein 45-Tonner liefert in dieser Auslage 2-3 t, also ausreichend, aber nicht reichlich. Die 60-t-Klasse ist die sichere Variante für schwerere Wandelemente oder größere Auslagen. Eine Hubhöhe von 30 m deckt typische Holzhaus-Höhen (max. 7 m First) plus Auslagenanforderung problemlos ab. Ein Bediener ist Pflicht: Ab Klasse 30+ verlangt die BetrSichV einen gültigen Kranführerschein.</p>
            <p><strong className="text-gray-800">Was es kostet (Richtwert, Stand Mai 2026).</strong> Ein 45-60 t Mobilkran für 4-5 Tage inkl. Bediener kostet bei typischen SME-Anbietern aus unserem Katalog 4.800-9.500 € netto. Innerhalb dieser Spanne entscheiden Anfahrt, regionale Preise und ob An- und Abfahrt am gleichen Tag erfolgen oder ob der Kran über Nacht vor Ort bleibt. Bei mehrtägigen Hausaufstellungen wird der Kran meist stationiert, das spart Hin- und Rückfahrkosten.</p>
            <p><strong className="text-gray-800">Häufige Fehler.</strong> An erster Stelle der Wind: Wandelemente eines Holzrahmenhauses haben große Flächen, und ab 6 Bft (rund 40 km/h) fällt der Aufbau aus. Wer den Termin auf einen einzigen Tag legt, riskiert Stillstandskosten. Zweiter Punkt: die tragfähige Aufstellfläche. Ein 45-Tonner stützt sich mit rund 30 t pro Stütze ab. Besteht die Standfläche neben der Bodenplatte aus weichem Erdreich, sind Stützplatten oder eine Bauwegeplatte zwingend.</p>
            <p>
              <Link href="/mobilkran-mieten" className="text-blue-600 hover:underline text-[14px]">
                Mehr zu Mobilkran mieten &rarr;
              </Link>
            </p>
          </div>
        </article>

        {/* Beispiel 4 — Stahlhalle / Mobilkran 50-80t albo Raupenkran */}
        <article className="mb-7">
          <h3 className="text-[15px] font-semibold text-gray-900 mb-2">
            4. Stahlhalle aufrichten: 50-80-Tonner für Sandwich-Elemente
          </h3>
          <div className="text-[14px] text-gray-600 leading-relaxed space-y-2.5">
            <p><strong className="text-gray-800">Was der Kunde wollte.</strong> Ein Bauunternehmer aus Niedersachsen plant eine Stahlhalle 45 × 25 m, max. 6,5 m hoch, Aufbau mit Sandwichelementen. Einsatzdauer max. 4 Tage.</p>
            <p><strong className="text-gray-800">Welcher Kran tatsächlich passt.</strong> Hier zählt nicht die Hubhöhe (6,5 m sind einfach), sondern die Auslage. Eine Halle von 45 × 25 m bedeutet, dass der Kran aus einer Position eine ganze Hallenseite bedienen muss, was Auslagen von 15-25 m verlangt. Sandwichelemente wiegen rund 1 t pro Stück, sind aber großflächig und entsprechend windangriffsanfällig. Mit Sicherheitsmarge auf 20 m Auslage plus Wind-Reserve braucht es einen 50-80 t Mobilkran. Bei unbefestigtem Baustellengrund ist alternativ ein Raupenkran sinnvoll, denn der verteilt das Gewicht über die Kettenfläche statt über vier Punkt-Stützen.</p>
            <p><strong className="text-gray-800">Was es kostet (Richtwert, Stand Mai 2026).</strong> Ein 50-80 t Mobilkran für 4 Tage inkl. Bediener: 5.500-12.000 € netto bei typischen SME-Anbietern aus unserem Katalog. Die Spanne ist groß, denn die obere Klasse (80 t) ist bei voll ausgelasteten Mietparks oft knapp und entsprechend teurer. Frühe Reservierung lohnt sich, vor allem in der Hauptsaison März bis Oktober.</p>
            <p><strong className="text-gray-800">Häufige Fehler.</strong> Sandwichelemente werden gerne unterschätzt. Optisch wirken sie leicht, durch ihre große Fläche sind sie aber extrem windsensibel. Schon bei 30 km/h Wind gerät ein Element am Haken ins Schwingen. Das verlängert nicht nur den Einsatz, sondern erhöht auch das Beschädigungsrisiko jedes einzelnen Elements. Zweiter Punkt: Standfläche prüfen. Bei großen Hallen-Aufbauten steht der Kran oft auf nicht-verdichtetem Baustellenuntergrund. Ohne Stützplatten oder Raupenkran droht Absinken, und bei einem 70-Tonner unter Last ist das ein Notfall.</p>
            <p>
              <Link href="/mobilkran-mieten" className="text-blue-600 hover:underline text-[14px]">
                Mehr zu Mobilkran mieten &rarr;
              </Link>
              <span className="text-gray-400 mx-1.5">·</span>
              <Link href="/raupenkran-mieten" className="text-blue-600 hover:underline text-[14px]">
                Raupenkran mieten &rarr;
              </Link>
            </p>
          </div>
        </article>

        {/* Beispiel 5 — Whirlpool transport / Ladekran */}
        <article>
          <h3 className="text-[15px] font-semibold text-gray-900 mb-2">
            5. Whirlpool transportieren: Ladekran mit Pritsche, kein Mobilkran
          </h3>
          <div className="text-[14px] text-gray-600 leading-relaxed space-y-2.5">
            <p><strong className="text-gray-800">Was der Kunde wollte.</strong> Eine Privatperson aus NRW will einen Whirlpool (2,13 × 2,13 m, 1 m hoch, 400 kg) von Dortmund nach Bocholt transportieren, rund 80 km. Anlieferung über Garten oder Hofzufahrt.</p>
            <p><strong className="text-gray-800">Welcher Kran tatsächlich passt.</strong> Der Kunde hat richtig erkannt: kein Mobilkran, sondern ein Ladekran auf einem LKW mit Pritsche. Die 400 kg sind für jeden Ladekran ab 6 t Klasse mühelos. Entscheidend ist die Reichweite von 6-8 m, um den Whirlpool über Zaun, Hecke oder Carport in den Zielgarten zu setzen. Eine reine Anlieferung mit Hubwagen funktioniert bei Whirlpools meist nicht, denn der Aufstellort liegt selten direkt an der Straße. Der LKW-Fahrer ist gleichzeitig Ladekran-Bediener; ein zweiter Kranführer entfällt.</p>
            <p><strong className="text-gray-800">Was es kostet (Richtwert, Stand Mai 2026).</strong> Ein Ladekran-Einsatz mit Pritsche für 80 km Transport plus 2-3 Stunden vor Ort kostet 600-1.200 € netto. Längere Strecken oder komplexe Anlieferungen (Tor zu schmal, Auslage über mehrere Hecken) erhöhen den Preis. Im SME-Bereich rechnen viele Anbieter mit Tageskostensatz plus km-Pauschale.</p>
            <p><strong className="text-gray-800">Häufige Fehler.</strong> Vorher Maße nehmen. Ein Whirlpool von 2,13 m Breite passt durch viele, aber nicht alle Tore und Hofdurchfahrten. Wer das nicht vor der Buchung misst, riskiert, dass der LKW vor Ort wenden muss, was Zusatzstunden oder eine Stornierung auslöst. Zweiter Punkt: Nicht das Gewicht ist hier das Problem, sondern die Empfindlichkeit der Bodenwanne. Beim Absetzen muss der Untergrund eben sein, sonst verzieht sich die Wanne und der spätere Wasserstand wird schief.</p>
            <p>
              <Link href="/ladekran-mieten" className="text-blue-600 hover:underline text-[14px]">
                Mehr zu Ladekran mieten &rarr;
              </Link>
            </p>
          </div>
        </article>

        <p className="text-[14px] text-gray-500 leading-relaxed mt-6 pt-5 border-t border-gray-100">
          Ihre Anfrage liegt nah an einem dieser Beispiele?{' '}
          <Link href="/kran-mieten-preise" className="text-blue-600 hover:underline">
            Im Kostenrechner
          </Link>{' '}
          geben Sie Krantyp, Standort und Projektdetails ein und erhalten Angebote
          von Anbietern in Ihrer Nähe. Antwort meist innerhalb 24 h.
        </p>
      </section>

      <section className="bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Noch unsicher? Lassen Sie sich kostenlos beraten
        </h2>
        <p className="text-[14px] text-gray-500 mb-5 max-w-xl mx-auto">
          Die meisten Kranvermieter beraten Sie kostenlos und empfehlen den passenden Kran
          für Ihr Projekt. Vergleichen Sie jetzt {anbieterCount}+ Anbieter in {staedteCount}+ Städten.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-semibold rounded-md transition-colors"
        >
          Jetzt Angebote von {anbieterCount}+ Kranvermietern vergleichen
        </Link>
        <p className="text-[12px] text-gray-400 mt-3">Kostenlos & unverbindlich. Keine versteckten Kosten.</p>
      </section>

      {/* FAQPage — converts the 8 scenarios into Q&A pairs so AI agents and
          answer engines can cite the recommendation directly. Google removed
          FAQ rich-result snippets for non-gov sites in 2023, but ChatGPT,
          Claude, Perplexity still parse this format and prefer it for
          definitive single-answer queries like "welcher kran für dacharbeiten". */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: scenarios.map((s) => ({
              '@type': 'Question',
              name: `Welcher Kran für ${s.title}?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: `${s.recommendation}. ${s.why}`,
              },
            })),
          }),
        }}
      />
    </div>
  )
}
