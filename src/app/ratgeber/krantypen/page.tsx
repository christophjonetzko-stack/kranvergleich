import type { Metadata } from 'next'
import Link from 'next/link'
import { getCraneIcon } from '@/components/crane-icons'
import { cranePrices } from '@/data/crane-prices'
import { getSiteStats } from '@/lib/queries'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Krantypen im Überblick — 8 Typen mit Preisen, Tragkraft & Einsatzgebieten',
  description:
    'Alle Krantypen erklärt: Minikran, Autokran, Dachdeckerkran, Raupenkran, Anhängerkran, Mobilkran, Baukran & Ladekran. Vergleich mit Preisen, Tragkraft, Einsatzgebieten und Tipps zur Auswahl. Krantypen-Übersicht 2026.',
  alternates: { canonical: '/ratgeber/krantypen' },
  openGraph: {
    title: 'Krantypen im Überblick — Alle 8 Krantypen mit Preisen & Vergleich',
    description:
      'Alle Krantypen erklärt: Minikran, Autokran, Baukran & mehr. Preise, Tragkraft und Einsatzgebiete im direkten Vergleich.',
    type: 'article',
    url: '/ratgeber/krantypen',
  },
}

const craneTypeData = [
  {
    slug: 'minikran-mieten',
    name: 'Minikran',
    also: 'Spinnenkran, Spider Crane, Glasmontagekran, kleiner Kran',
    desc: 'Der Minikran ist der kompakteste Krantyp — ideal für enge Baustellen, Innenräume und Hinterhöfe. Dank seiner geringen Durchfahrbreite ab 80 cm passt er durch Türöffnungen und Hallentore. Viele Modelle sind elektrisch betrieben und damit abgasfrei für Inneneinsätze. Mit Glassauger (Vakuumheber) wird er zum Spezialisten für Glasmontage.',
    capacity: '500 kg – 3.000 kg',
    height: '5 – 18 m',
    operator: 'Meist ohne Kranführer (Einweisung reicht)',
    best: 'Glasmontage, Innenräume, enge Zufahrten, Hinterhöfe',
  },
  {
    slug: 'autokran-mieten',
    name: 'Autokran',
    also: 'Kranwagen, Fahrzeugkran, LKW-Kran, Mietkran',
    desc: 'Der Autokran ist der vielseitigste und meistgemietete Krantyp in Deutschland. Er basiert auf einem LKW-Fahrgestell, fährt selbstständig zur Baustelle und ist in 15–30 Minuten einsatzbereit. Der Kranführer ist gesetzlich vorgeschrieben und im Mietpreis enthalten. Ideal für kurze Einsätze von wenigen Stunden bis zu einigen Tagen.',
    capacity: '10 – 500 t',
    height: '10 – 100 m',
    operator: 'Immer mit Kranführer (gesetzlich vorgeschrieben, inklusive)',
    best: 'Kurzfristige Hebearbeiten, Montagen, Baumfällung, Schwertransport',
  },
  {
    slug: 'dachdeckerkran-mieten',
    name: 'Dachdeckerkran',
    also: 'Dachkran, Ziegelkran, Aufzugskran, Dachdecker Kran',
    desc: 'Der Dachdeckerkran (auch Dachkran) ist speziell für Dacharbeiten konstruiert. Er steht an der Straße oder auf dem Gehweg und hebt Material direkt aufs Dach — Ziegel, Dämmstoffe, Solarmodule oder Baumaterial. Der steile Auslegerwinkel ermöglicht das Arbeiten über Dachkanten hinweg. Nach einer Einweisung können Sie den Kran selbst bedienen.',
    capacity: '500 – 2.000 kg',
    height: '15 – 30 m',
    operator: 'Ohne Kranführer (Selbstbedienung nach Einweisung)',
    best: 'Dachsanierung, Solaranlagen, Dachstuhl, Ziegeltransport',
  },
  {
    slug: 'raupenkran-mieten',
    name: 'Raupenkran',
    also: 'Kettenkran, Crawler Crane, Gleiskettenkran',
    desc: 'Der Raupenkran ist der Kraftprotz unter den Krantypen. Sein Raupenfahrwerk verteilt das Gewicht auf eine große Fläche und ermöglicht den Einsatz auf weichem oder unbefestigtem Untergrund. Raupenkrane erreichen Traglasten von bis zu 3.000 Tonnen und werden vor allem im Schwerlastbereich eingesetzt — Windkraftanlagen, Brückenbau, Industriemontage.',
    capacity: '50 – 3.000 t',
    height: '20 – 200 m',
    operator: 'Immer mit Kranführer (inklusive)',
    best: 'Schwerlast, Windkraft, Brückenbau, unbefestigter Untergrund',
  },
  {
    slug: 'anhaengerkran-mieten',
    name: 'Anhängerkran',
    also: 'PKW-Anhänger mit Kran, Trailerkran, Kleinkran',
    desc: 'Der Anhängerkran ist die günstigste und einfachste Kranvariante. Er ist auf einem PKW-Anhänger montiert und lässt sich mit jedem Fahrzeug mit Anhängerkupplung transportieren. Kein Kranführerschein erforderlich — eine kurze Einweisung reicht. Ideal für Handwerker, Garten- und Landschaftsbauer und kleine Hebearbeiten.',
    capacity: 'bis 1.500 kg',
    height: '10 – 25 m',
    operator: 'Ohne Kranführer (Selbstbedienung)',
    best: 'Kleine Budgets, Gartenbau, Dachdecker, Baumaterialtransport',
  },
  {
    slug: 'mobilkran-mieten',
    name: 'Mobilkran',
    also: 'Schwerlastkran, Teleskopkran, mobiler Kran',
    desc: 'Der Mobilkran ist die große Version des Autokrans — mit eigenem Kranfahrgestell statt LKW-Basis. Er erreicht Traglasten von bis zu 1.200 Tonnen und kommt bei Großprojekten zum Einsatz. Im Unterschied zum Raupenkran fährt der Mobilkran auf Rädern und ist schneller transportierbar. Kranführer ist inklusive.',
    capacity: '20 – 1.200 t',
    height: '15 – 150 m',
    operator: 'Immer mit Kranführer (inklusive)',
    best: 'Schwerlastmontagen, Industrieprojekte, dort wo Raupenkran zu aufwändig',
  },
  {
    slug: 'baukran-mieten',
    name: 'Baukran',
    also: 'Turmdrehkran, Baustellenkran, Schnellbaukran, Hochbaukran',
    desc: 'Der Baukran (Turmdrehkran) ist der Klassiker auf Großbaustellen. Er steht fest auf einem Betonfundament und deckt mit seinem drehbaren Ausleger die gesamte Baustelle ab. Die Monatsmiete ist bei Bauzeiten ab 3 Monaten wirtschaftlicher als ein Autokran. Montage und Demontage dauern 1–3 Tage und kosten 3.000–8.000€ extra.',
    capacity: '1 – 20 t',
    height: '20 – 80 m',
    operator: 'Mit Kranführer (Turmdrehkranführer)',
    best: 'Neubau, Hochbau, Sanierungen ab 3 Monaten Bauzeit',
  },
  {
    slug: 'ladekran-mieten',
    name: 'Ladekran',
    also: 'Knickarmkran, Hiab-Kran, LKW-Ladekran, Lastkran',
    desc: 'Der Ladekran ist ein hydraulischer Knickarmkran, der direkt auf einem LKW montiert ist. Er dient vor allem zum Be- und Entladen — Baustoffe, Container, Maschinen. Viele Anbieter vermieten den Ladekran als Komplettpaket mit LKW und Fahrer. Der Knickarm ermöglicht das Arbeiten auch in beengten Verhältnissen.',
    capacity: '1 – 30 t',
    height: '5 – 30 m',
    operator: 'Mit LKW-Fahrer/Kranführer',
    best: 'Be-/Entladearbeiten, Materialtransport, Container',
  },
]

const faqs = [
  {
    q: 'Welche Krantypen gibt es?',
    a: 'In Deutschland werden 8 Krantypen vermietet: Minikran, Autokran, Dachdeckerkran, Raupenkran, Anhängerkran, Mobilkran, Baukran (Turmdrehkran) und Ladekran (LKW-Ladekran). Jeder Typ hat spezifische Traglasten, Einsatzgebiete und Preiskategorien.',
  },
  {
    q: 'Welcher Kran ist der günstigste?',
    a: 'Der Anhängerkran ist mit ab 150€/Tag der günstigste Krantyp. Er eignet sich für leichte Hebearbeiten bis 1.500 kg und kann mit einem PKW-Anhänger transportiert werden. Für größere Lasten ist der Dachdeckerkran (ab 200€/Tag) eine günstige Alternative.',
  },
  {
    q: 'Welcher Kran hat die höchste Tragkraft?',
    a: 'Der Raupenkran erreicht Traglasten von bis zu 3.000 Tonnen — damit ist er der stärkste Krantyp. Mobilkrane schaffen bis zu 1.200 Tonnen, Autokrane bis zu 500 Tonnen. Für die meisten Projekte reichen jedoch Autokrane (10–500t) aus.',
  },
  {
    q: 'Welchen Kran brauche ich für mein Projekt?',
    a: 'Das hängt von Tragkraft, Hubhöhe und Einsatzort ab: Für enge Baustellen → Minikran. Für Dacharbeiten → Dachdeckerkran. Für kurzfristige Hebearbeiten → Autokran. Für Großbaustellen → Baukran. Für Schwerlast → Raupenkran oder Mobilkran. Nutzen Sie unseren Kostenrechner oder fragen Sie direkt bei Anbietern an.',
  },
  {
    q: 'Brauche ich einen Kranführer?',
    a: 'Autokrane, Mobilkrane und Raupenkrane dürfen nur mit zertifiziertem Kranführer betrieben werden — dieser ist im Mietpreis enthalten. Minikrane, Dachdeckerkrane und Anhängerkrane können nach einer Einweisung selbst bedient werden.',
  },
  {
    q: 'Was ist der Unterschied zwischen Autokran und Mobilkran?',
    a: 'Ein Autokran basiert auf einem LKW-Fahrgestell (bis 500t Tragkraft), ein Mobilkran hat ein spezielles Kranfahrgestell (bis 1.200t). Autokrane sind flexibler und günstiger, Mobilkrane leisten mehr bei Schwerlastprojekten.',
  },
]

export default async function KrantypenPage() {
  const { anbieterCount } = await getSiteStats()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/ratgeber/welchen-kran-brauche-ich" className="hover:text-gray-600">Ratgeber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Krantypen</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Krantypen im Überblick — Alle 8 Typen im Vergleich
      </h1>
      <p className="text-[15px] text-gray-500 mb-8 max-w-3xl">
        Welche Krantypen gibt es und welcher ist der richtige für Ihr Projekt?
        Wir erklären alle 8 Krantypen mit Tragkraft, Preisen und Einsatzgebieten —
        vom kompakten Minikran bis zum 3.000-Tonnen-Raupenkran.
      </p>

      <p className="text-[11px] text-gray-300 mb-6">Stand: April 2026 · Preise netto, Richtwerte</p>

      {/* Table of Contents */}
      <nav className="mb-8 border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-medium text-gray-900 mb-2">Inhalt</p>
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-1">
          {craneTypeData.map((ct) => (
            <li key={ct.slug}>
              <a href={`#${ct.name.toLowerCase()}`} className="text-[13px] text-blue-600 hover:underline">
                {ct.name}
              </a>
            </li>
          ))}
          <li>
            <a href="#vergleich" className="text-[13px] text-blue-600 hover:underline">
              Vergleichstabelle
            </a>
          </li>
          <li>
            <a href="#faq" className="text-[13px] text-blue-600 hover:underline">
              Häufige Fragen
            </a>
          </li>
        </ul>
      </nav>

      {/* Crane type sections */}
      <div className="space-y-8 mb-12">
        {craneTypeData.map((ct) => {
          const Icon = getCraneIcon(ct.slug)
          const price = cranePrices.find((p) => p.craneTypeSlug === ct.slug)
          return (
            <section key={ct.slug} id={ct.name.toLowerCase()} className="border border-gray-200 rounded-lg p-5 scroll-mt-20">
              <div className="flex items-start gap-4 mb-3">
                <div className="shrink-0 text-gray-500 hidden sm:block">
                  <Icon className="w-14 h-14" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    <Link href={`/${ct.slug}`} className="hover:text-blue-600">{ct.name}</Link>
                  </h2>
                  <p className="text-[12px] text-gray-400 mb-2">Auch: {ct.also}</p>
                  <p className="text-[14px] text-gray-500 leading-relaxed">{ct.desc}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[13px] mt-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-400 text-[11px] mb-0.5">Tragkraft</p>
                  <p className="font-medium text-gray-900">{ct.capacity}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-400 text-[11px] mb-0.5">Hubhöhe</p>
                  <p className="font-medium text-gray-900">{ct.height}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-400 text-[11px] mb-0.5">Preis ab</p>
                  <p className="font-medium text-blue-600">{price ? `${price.dayFrom}€/Tag` : '—'}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-400 text-[11px] mb-0.5">Kranführer</p>
                  <p className="font-medium text-gray-900">{ct.operator.includes('inklusive') ? 'Inklusive' : 'Optional'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-3 text-[13px]">
                <span className="text-gray-400">Ideal für:</span>
                <span className="text-gray-600">{ct.best}</span>
              </div>

              <div className="mt-3">
                <Link href={`/${ct.slug}`} className="text-[13px] text-blue-600 hover:underline font-medium">
                  {ct.name} mieten — Anbieter & Preise →
                </Link>
              </div>
            </section>
          )
        })}
      </div>

      {/* Comparison table */}
      <section id="vergleich" className="mb-12 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Krantypen-Vergleich: Preis, Tragkraft & Kranführer
        </h2>
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-gray-50 border-b text-left">
                <th className="py-3 px-4 font-medium text-gray-900">Krantyp</th>
                <th className="py-3 px-4 font-medium text-gray-900">Tragkraft</th>
                <th className="py-3 px-4 font-medium text-gray-900">Hubhöhe</th>
                <th className="py-3 px-4 font-medium text-gray-900">Preis/Tag</th>
                <th className="py-3 px-4 font-medium text-gray-900">Kranführer</th>
                <th className="py-3 px-4 font-medium text-gray-900">Ideal für</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {craneTypeData.map((ct) => {
                const price = cranePrices.find((p) => p.craneTypeSlug === ct.slug)
                return (
                  <tr key={ct.slug} className="border-b last:border-0">
                    <td className="py-2.5 px-4">
                      <Link href={`/${ct.slug}`} className="text-blue-600 hover:underline font-medium">
                        {ct.name}
                      </Link>
                    </td>
                    <td className="py-2.5 px-4">{ct.capacity}</td>
                    <td className="py-2.5 px-4">{ct.height}</td>
                    <td className="py-2.5 px-4 font-medium">{price ? `ab ${price.dayFrom}€` : '—'}</td>
                    <td className="py-2.5 px-4">{ct.operator.includes('inklusive') ? 'Inklusive' : 'Optional'}</td>
                    <td className="py-2.5 px-4 text-gray-400">{ct.best}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-gray-400 mt-2">
          Alle Preise netto zzgl. MwSt. Richtwerte basierend auf Marktrecherche Q1 2026.{' '}
          <Link href="/kran-mieten-preise" className="text-blue-600 hover:underline">Ausführliche Preisliste →</Link>
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" className="mb-12 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Häufige Fragen zu Krantypen
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details key={i} className="group border border-gray-200 rounded-lg">
              <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-[14px] font-medium text-gray-900 select-none">
                {faq.q}
                <svg className="w-4 h-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
              </summary>
              <p className="px-5 pb-4 text-[14px] text-gray-600 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-50 border border-blue-100 rounded-xl p-6 sm:p-8 text-center mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Den richtigen Kran gefunden?
        </h2>
        <p className="text-[14px] text-gray-500 mb-5 max-w-lg mx-auto">
          Vergleichen Sie jetzt {anbieterCount}+ Kranvermieter in ganz Deutschland.
          Kostenlos Angebote anfragen — bei einem oder mehreren Anbietern gleichzeitig.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/kostenrechner"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium rounded-lg transition-colors"
          >
            Kostenrechner starten →
          </Link>
          <Link
            href="/ratgeber/welchen-kran-brauche-ich"
            className="px-6 py-3 border border-gray-200 hover:border-gray-300 text-[14px] text-gray-700 font-medium rounded-lg transition-colors"
          >
            Welchen Kran brauche ich?
          </Link>
        </div>
      </section>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
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
            headline: 'Krantypen im Überblick — Alle 8 Typen im Vergleich',
            description: 'Alle Krantypen erklärt: Minikran, Autokran, Dachdeckerkran, Raupenkran, Anhängerkran, Mobilkran, Baukran & Ladekran mit Preisen und Einsatzgebieten.',
            author: { '@type': 'Organization', name: 'KranVergleich.de', url: 'https://kranvergleich.de' },
            datePublished: '2026-04-09',
            dateModified: '2026-04-09',
          }),
        }}
      />
    </div>
  )
}
