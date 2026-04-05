import type { Metadata } from 'next'
import Link from 'next/link'
import { getSiteStats } from '@/lib/queries'

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
    </div>
  )
}
