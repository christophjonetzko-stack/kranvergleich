import type { Metadata } from 'next'
import Link from 'next/link'
import { PriceTable } from '@/components/price-table'
import { cranePrices } from '@/data/crane-prices'
import { craneTypes } from '@/data/crane-types'
import { FAQSection } from '@/components/faq-section'

export const metadata: Metadata = {
  title: 'Kran mieten Preisliste 2026 — Was kostet ein Kran pro Tag?',
  description:
    'Kran mieten Preisliste 2026: Tagespreise, Wochenpreise und Monatspreise für Minikran, Autokran, Baukran, Raupenkran und mehr. Autokran Preise pro Stunde ab ca. 150€.',
}

const priceFAQs = [
  {
    question: 'Was kostet ein Kran pro Tag?',
    answer:
      'Die Tagesmiete variiert je nach Krantyp: Anhängerkran ab 150€, Minikran ab 250€, Autokran ab 500€, Raupenkran ab 800€. Alle Preise netto zzgl. MwSt.',
  },
  {
    question: 'Was kostet ein Autokran pro Stunde?',
    answer:
      'Ein Autokran kostet ca. 150–350€ pro Stunde (inkl. Kranführer). Der Stundenpreis hängt von der Tragkraft ab: kleine Autokrane (30–50t) liegen bei ca. 150–200€/h, große Autokrane (100t+) bei 250–350€/h. Die Mindestmietdauer beträgt meist 4 Stunden.',
  },
  {
    question: 'Was kostet ein Kran pro Monat?',
    answer:
      'Monatsmieten bieten den günstigsten Tagessatz: Minikran ab 3.500€/Monat, Autokran ab 8.000€/Monat, Baukran ab 4.000€/Monat. Bei längerer Mietdauer sind Rabatte üblich.',
  },
  {
    question: 'Ist der Kranführer im Preis enthalten?',
    answer:
      'Bei Autokranen und Mobilkranen ist der Kranführer in der Regel inklusive (gesetzliche Pflicht). Bei Minikranen, Dachdeckerkranen und Baukranen wird der Bediener separat gebucht oder Sie bedienen den Kran nach Einweisung selbst.',
  },
  {
    question: 'Welche Zusatzkosten gibt es?',
    answer:
      'Typische Zusatzkosten: Transport (An-/Abfahrt) 150–500€, Montage/Demontage bei Baukranen 3.000–8.000€, Genehmigungen für Straßensperrung je nach Kommune. Fragen Sie immer nach einem Komplettangebot.',
  },
]

export default function PreislistePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Preisliste</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Kran mieten Preisliste 2026 — Was kostet ein Kran pro Tag?
      </h1>
      <p className="text-[15px] text-gray-500 mb-8 max-w-3xl">
        Übersicht aller Krantypen mit Tagespreisen, Wochenpreisen und Monatspreisen.
        Alle Preise sind unverbindliche Richtwerte (netto, zzgl. MwSt.) und können je nach
        Region, Tragkraft und Verfügbarkeit variieren.
      </p>

      {/* Full price table */}
      <section className="mb-10">
        <PriceTable showAll />
      </section>

      {/* Autokran Preise pro Stunde — dedicated section for keyword */}
      <section className="mb-10 border border-gray-200 rounded-lg p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Autokran Preise pro Stunde
        </h2>
        <p className="text-[14px] text-gray-500 mb-3">
          Autokrane werden häufig stundenweise abgerechnet. Der Stundenpreis beinhaltet den
          Kranführer (gesetzlich vorgeschrieben).
        </p>
        <div className="grid gap-3 sm:grid-cols-3 text-center">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-lg font-semibold text-gray-900">150–200€/h</p>
            <p className="text-[12px] text-gray-400">Autokran 30–50t</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-lg font-semibold text-gray-900">200–300€/h</p>
            <p className="text-[12px] text-gray-400">Autokran 50–100t</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-lg font-semibold text-gray-900">300–500€/h</p>
            <p className="text-[12px] text-gray-400">Autokran 100t+</p>
          </div>
        </div>
        <p className="text-[12px] text-gray-400 mt-3">
          Mindestmietdauer meist 4 Stunden. An-/Abfahrt wird oft separat berechnet.
        </p>
      </section>

      {/* Price details per type */}
      <section className="mb-10 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Preisliste nach Krantyp
        </h2>
        {cranePrices.map((p) => {
          const ct = craneTypes.find((c) => c.slug === p.craneTypeSlug)
          if (!ct) return null
          return (
            <div key={p.craneTypeSlug} className="border border-gray-200 rounded-lg p-4">
              <Link href={`/${ct.slug}`} className="hover:underline">
                <h3 className="font-medium text-[15px] text-gray-900 mb-1">
                  {ct.name} mieten — ab {p.dayFrom.toLocaleString('de-DE')}€/Tag
                </h3>
              </Link>
              <div className="flex flex-wrap gap-3 text-[12px] text-gray-400 mt-1">
                <span>Tag: {p.dayFrom.toLocaleString('de-DE')}–{p.dayTo.toLocaleString('de-DE')}€</span>
                <span>Woche: {p.weekFrom.toLocaleString('de-DE')}–{p.weekTo.toLocaleString('de-DE')}€</span>
                <span>Monat: {p.monthFrom.toLocaleString('de-DE')}–{p.monthTo.toLocaleString('de-DE')}€</span>
                <span>{p.includesOperator ? 'Kranführer inkl.' : 'Ohne Kranführer'}</span>
              </div>
            </div>
          )
        })}
      </section>

      {/* FAQ */}
      <FAQSection faqs={priceFAQs} craneTypeName="Kran" />
    </div>
  )
}
