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
