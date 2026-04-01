import type { Metadata } from 'next'
import Link from 'next/link'
import { PriceTable } from '@/components/price-table'
import { craneTypes } from '@/data/crane-types'
import { cranePrices } from '@/data/crane-prices'

export const metadata: Metadata = {
  title: 'Kranmiete — Was kostet ein Kran? Preise & Anbieter im Vergleich',
  description:
    'Kranmiete in Deutschland: Was kostet ein Kran pro Tag, Woche oder Monat? Preisübersicht für Minikran, Autokran, Baukran und mehr. Jetzt vergleichen.',
}

export default function KranmietePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Kranmiete</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Kranmiete — Was kostet ein Kran?
      </h1>
      <p className="text-[15px] text-gray-500 mb-8 max-w-3xl">
        Was kostet die Kranmiete pro Tag, Woche oder Monat? Hier finden Sie eine Preisübersicht
        für alle Krantypen in Deutschland — vom günstigen Anhängerkran bis zum schweren
        Raupenkran. Alle Preise sind Richtwerte (netto, zzgl. MwSt.).
      </p>

      {/* Full price table */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Kran mieten: Preisübersicht 2026
        </h2>
        <PriceTable showAll />
      </section>

      {/* Price details per type */}
      <section className="mb-10 space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Kranmiete nach Krantyp
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
              <p className="text-[13px] text-gray-500 mb-2">{ct.desc}</p>
              <div className="flex flex-wrap gap-3 text-[12px] text-gray-400">
                <span>Tagespreis: {p.dayFrom.toLocaleString('de-DE')}–{p.dayTo.toLocaleString('de-DE')}€</span>
                <span>Wochenpreis: {p.weekFrom.toLocaleString('de-DE')}–{p.weekTo.toLocaleString('de-DE')}€</span>
                <span>Monatspreis: {p.monthFrom.toLocaleString('de-DE')}–{p.monthTo.toLocaleString('de-DE')}€</span>
                <span>{p.includesOperator ? 'Kranführer inklusive' : 'Ohne Kranführer'}</span>
              </div>
              <p className="text-[12px] text-gray-400 mt-1">{p.notes}</p>
            </div>
          )
        })}
      </section>

      {/* SEO text */}
      <section className="text-[14px] text-gray-500 leading-relaxed">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Kranmiete — Kosten und Tipps
        </h2>
        <p className="mb-3">
          Die Kosten für eine Kranmiete hängen von mehreren Faktoren ab: Krantyp, Tragkraft,
          Einsatzdauer und Standort. Generell gilt: Je größer der Kran und je länger die
          Mietdauer, desto höher die Kosten — aber Wochen- und Monatsmieten bieten oft bessere
          Tagessätze als Einzeltage.
        </p>
        <p>
          Bei Autokranen und Mobilkranen ist der Kranführer in der Regel im Mietpreis enthalten.
          Bei Minikranen, Dachdeckerkranen und Baukranen wird der Bediener separat gebucht oder
          Sie bedienen den Kran nach Einweisung selbst. Transportkosten (Anlieferung und Abholung)
          kommen bei den meisten Krantypen noch dazu.
        </p>
      </section>
    </div>
  )
}
