import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PriceTable } from '@/components/price-table'
import { cranePrices } from '@/data/crane-prices'
import { craneTypes } from '@/data/crane-types'
import { FAQSection } from '@/components/faq-section'

export const metadata: Metadata = {
  title: 'Was kostet ein Kran? Preise & Kosten 2026 — Kran mieten Preisliste',
  description:
    'Kran mieten Preisliste 2026: Tagespreise, Wochenpreise und Monatspreise für alle Krantypen. Autokran ab 500€/Tag, Minikran ab 250€/Tag, Baukran ab 300€/Tag. Jetzt Preise vergleichen.',
  alternates: { canonical: '/kran-mieten-preise' },
  openGraph: {
    title: 'Was kostet ein Kran? Preise & Kosten 2026',
    description:
      'Kran mieten Preisliste 2026: alle Krantypen mit Tages-, Wochen- und Monatspreisen im Überblick.',
    type: 'website',
    url: '/kran-mieten-preise',
  },
}

const costFAQs = [
  {
    question: 'Was kostet ein Kran pro Tag?',
    answer:
      'Die Tagesmiete variiert je nach Krantyp: Anhängerkran ab 150€, Minikran ab 250€, Dachdeckerkran ab 200€, Baukran ab 300€, Autokran ab 500€, Mobilkran ab 600€, Raupenkran ab 800€. Alle Preise netto zzgl. MwSt. Transport und Auf-/Abbau kommen je nach Anbieter hinzu.',
  },
  {
    question: 'Was kostet ein Autokran pro Stunde?',
    answer:
      'Ein Autokran kostet ca. 150–350€ pro Stunde (inkl. Kranführer). Kleine Autokrane (30–50t) liegen bei 150–200€/h, mittlere (50–100t) bei 200–300€/h, große (100t+) bei 300–500€/h. Die Mindestmietdauer beträgt meist 4 Stunden.',
  },
  {
    question: 'Was kostet ein Kran pro Woche?',
    answer:
      'Wochenpreise bieten deutliche Rabatte gegenüber Tagespreisen: Minikran 1.200–2.800€/Woche, Autokran 2.500–10.000€/Woche, Baukran 1.500–8.000€/Woche. Bei längeren Mietzeiten lohnt es sich, nach Monatspreisen zu fragen.',
  },
  {
    question: 'Was kostet ein Kran pro Monat?',
    answer:
      'Monatsmieten sind die günstigste Option pro Tag: Minikran ab 3.500€/Monat, Autokran ab 8.000€/Monat, Baukran ab 4.000€/Monat. Baukrane werden oft für mehrere Monate gemietet — hier sind zusätzliche Rabatte üblich.',
  },
  {
    question: 'Ist der Kranführer im Preis enthalten?',
    answer:
      'Bei Autokranen, Mobilkranen und Raupenkranen ist der Kranführer in der Regel inklusive (gesetzlich vorgeschrieben). Bei Minikranen, Dachdeckerkranen, Anhängerkranen und Ladekranen bedienen Sie den Kran nach Einweisung selbst — oder buchen einen Bediener separat.',
  },
  {
    question: 'Welche Zusatzkosten gibt es beim Kran mieten?',
    answer:
      'Typische Zusatzkosten: Transport (An-/Abfahrt) 150–500€, Montage/Demontage bei Baukranen 3.000–8.000€, Genehmigungen für Straßensperrung je nach Kommune, Versicherung und Sicherheitseinrichtung. Fragen Sie immer nach einem Komplettangebot.',
  },
  {
    question: 'Wie kann ich die Kosten für die Kranmiete senken?',
    answer:
      'Tipps zur Kostenoptimierung: Mehrere Angebote vergleichen (nutzen Sie unsere kostenlose Sammelanfrage), längere Mietdauer wählen (Monatspreise sind pro Tag günstiger), den passenden Krantyp wählen (nicht zu groß), Einsatz gut planen (Wartezeiten vermeiden) und frühzeitig buchen.',
  },
  {
    question: 'Kran mieten oder kaufen — was lohnt sich?',
    answer:
      'Für die meisten Bauunternehmen lohnt sich die Miete. Ein neuer Minikran kostet 50.000–150.000€, ein Autokran 200.000–1.000.000€+. Bei weniger als 100 Einsatztagen pro Jahr ist Mieten fast immer günstiger — keine Wartungskosten, keine Lagerhaltung, keine Kapitalbindung.',
  },
]

export default function KranMietenPreisePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Kran mieten Preise</span>
      </nav>

      {/* H1 */}
      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Was kostet ein Kran? Preise &amp; Kosten 2026
      </h1>
      <p className="text-[15px] text-gray-500 mb-4 max-w-3xl">
        Komplette Preisliste für alle 8 Krantypen in Deutschland: Tagespreise, Wochenpreise und
        Monatspreise im Überblick. Alle Preise sind unverbindliche Richtwerte (netto, zzgl. MwSt.)
        basierend auf Marktrecherche Q1 2026.
      </p>
      <p className="text-[11px] text-gray-300 mb-8">Stand: April 2026</p>

      {/* TOC */}
      <nav className="mb-8 border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-medium text-gray-900 mb-2">Inhalt</p>
        <ul className="flex flex-col gap-1">
          <li><a href="#preistabelle" className="text-[13px] text-blue-600 hover:underline">Preistabelle alle Krantypen</a></li>
          <li><a href="#autokran-stunde" className="text-[13px] text-blue-600 hover:underline">Autokran Preise pro Stunde</a></li>
          <li><a href="#preise-detail" className="text-[13px] text-blue-600 hover:underline">Preise nach Krantyp</a></li>
          <li><a href="#zusatzkosten" className="text-[13px] text-blue-600 hover:underline">Zusatzkosten</a></li>
          <li><a href="#faq" className="text-[13px] text-blue-600 hover:underline">Häufige Fragen zu Kosten</a></li>
        </ul>
      </nav>

      {/* Quick summary cards */}
      <section className="mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-lg font-semibold text-gray-900">ab 150€</p>
            <p className="text-[12px] text-gray-500">Günstigster Kran/Tag</p>
            <p className="text-[11px] text-gray-400">Anhängerkran</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-lg font-semibold text-gray-900">ab 500€</p>
            <p className="text-[12px] text-gray-500">Autokran/Tag</p>
            <p className="text-[11px] text-gray-400">inkl. Kranführer</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-lg font-semibold text-gray-900">ab 250€</p>
            <p className="text-[12px] text-gray-500">Minikran/Tag</p>
            <p className="text-[11px] text-gray-400">ohne Bediener</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-lg font-semibold text-gray-900">ab 300€</p>
            <p className="text-[12px] text-gray-500">Baukran/Tag</p>
            <p className="text-[11px] text-gray-400">+ Montagekosten</p>
          </div>
        </div>
      </section>

      {/* Full price table */}
      <section id="preistabelle" className="mb-10 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Kran mieten Preisliste — alle Krantypen 2026
        </h2>
        <PriceTable showAll />
      </section>

      {/* Autokran hourly prices */}
      <section id="autokran-stunde" className="mb-10 scroll-mt-20 border border-gray-200 rounded-lg p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Autokran Preise pro Stunde
        </h2>
        <p className="text-[14px] text-gray-500 mb-4">
          Autokrane werden häufig stundenweise abgerechnet, besonders bei kurzen Einsätzen.
          Der Stundenpreis beinhaltet immer den Kranführer (gesetzlich vorgeschrieben bei Autokranen).
        </p>
        <div className="grid gap-3 sm:grid-cols-3 text-center">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xl font-semibold text-gray-900">150–200€/h</p>
            <p className="text-[13px] text-gray-500 mt-1">Autokran 30–50t</p>
            <p className="text-[11px] text-gray-400">Einfamilienhaus, Dachstuhl</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xl font-semibold text-gray-900">200–300€/h</p>
            <p className="text-[13px] text-gray-500 mt-1">Autokran 50–100t</p>
            <p className="text-[11px] text-gray-400">Hallenbau, Industriemontage</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xl font-semibold text-gray-900">300–500€/h</p>
            <p className="text-[13px] text-gray-500 mt-1">Autokran 100t+</p>
            <p className="text-[11px] text-gray-400">Schwerlast, Windkraft</p>
          </div>
        </div>
        <p className="text-[12px] text-gray-400 mt-3">
          Mindestmietdauer meist 4 Stunden. An-/Abfahrt wird oft separat berechnet (ca. 2–4€/km).
        </p>
      </section>

      {/* Price details per type with images */}
      <section id="preise-detail" className="mb-10 scroll-mt-20 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Kosten nach Krantyp im Detail
        </h2>
        {cranePrices.map((p) => {
          const ct = craneTypes.find((c) => c.slug === p.craneTypeSlug)
          if (!ct) return null
          return (
            <div key={p.craneTypeSlug} className="border border-gray-200 rounded-lg p-4">
              <div className="flex gap-4 items-start">
                <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0 bg-gray-100 hidden sm:block">
                  <Image src={ct.image} alt={ct.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/${ct.slug}`} className="hover:underline">
                    <h3 className="font-medium text-[15px] text-gray-900 mb-1">
                      {ct.name} mieten — ab {p.dayFrom.toLocaleString('de-DE')}€/Tag
                    </h3>
                  </Link>
                  <p className="text-[13px] text-gray-500 mb-2">{ct.desc}</p>
                  <div className="grid grid-cols-3 gap-2 text-[12px]">
                    <div className="bg-gray-50 rounded p-2">
                      <span className="text-gray-400">Tag</span>
                      <p className="font-medium text-gray-900">{p.dayFrom.toLocaleString('de-DE')}–{p.dayTo.toLocaleString('de-DE')}€</p>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <span className="text-gray-400">Woche</span>
                      <p className="font-medium text-gray-900">{p.weekFrom.toLocaleString('de-DE')}–{p.weekTo.toLocaleString('de-DE')}€</p>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <span className="text-gray-400">Monat</span>
                      <p className="font-medium text-gray-900">{p.monthFrom.toLocaleString('de-DE')}–{p.monthTo.toLocaleString('de-DE')}€</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-2">
                    {p.includesOperator ? 'Kranführer inklusive.' : 'Ohne Kranführer.'} {p.notes}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* Zusatzkosten */}
      <section id="zusatzkosten" className="mb-10 scroll-mt-20 border border-gray-200 rounded-lg p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Zusatzkosten beim Kran mieten
        </h2>
        <div className="space-y-3 text-[14px] text-gray-500">
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span>Transport (An-/Abfahrt)</span>
            <span className="font-medium text-gray-900">150–500€</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span>Baukran Montage/Demontage</span>
            <span className="font-medium text-gray-900">3.000–8.000€</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span>Kranführer (separat, pro Stunde)</span>
            <span className="font-medium text-gray-900">40–60€/h</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span>Straßensperrung / Genehmigung</span>
            <span className="font-medium text-gray-900">100–500€</span>
          </div>
          <div className="flex justify-between">
            <span>Haftpflichtversicherung</span>
            <span className="font-medium text-gray-900">oft inklusive</span>
          </div>
        </div>
      </section>

      {/* Intro text for SEO */}
      <div className="text-[14px] text-gray-500 leading-relaxed mb-10">
        <p>
          Die Kosten für die Kranmiete hängen von mehreren Faktoren ab: Krantyp, Tragkraft,
          Mietdauer, Region und Verfügbarkeit. <strong className="text-gray-900">Auf KranVergleich.de</strong> vergleichen
          Sie die Preise von über 780 Anbietern in ganz Deutschland — kostenlos und unverbindlich.
          Fordern Sie über unsere <Link href="/" className="text-blue-600 hover:underline">Sammelanfrage</Link> Angebote
          von mehreren Firmen gleichzeitig an und sparen Sie Zeit und Geld.
        </p>
      </div>

      {/* FAQ */}
      <div id="faq" className="mb-10 scroll-mt-20">
        <FAQSection faqs={costFAQs} craneTypeName="Kran" />
      </div>

      {/* Cross-links */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Preise nach Krantyp</h2>
        <div className="flex flex-wrap gap-2">
          {craneTypes.map((ct) => (
            <Link
              key={ct.slug}
              href={`/${ct.slug}`}
              className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors"
            >
              {ct.name} Preise
            </Link>
          ))}
        </div>
      </section>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://kranvergleich.de/' },
              { '@type': 'ListItem', position: 2, name: 'Kran mieten Preise' },
            ],
          }),
        }}
      />
      {/* FAQPage structured data is rendered by FAQSection component */}
    </div>
  )
}
