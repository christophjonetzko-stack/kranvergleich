/**
 * Per-crane-type ratgeber content rendered on /[crane-type] pages.
 * Lets us merge standalone /ratgeber/* articles into the main type pages
 * to consolidate SEO equity.
 */

export interface CraneRatgeberUseCase {
  title: string
  description: string
}

export interface CraneRatgeber {
  /** Things typically included in the daily rental price */
  included: string[]
  /** Additional/optional costs not in the base price */
  extras: string[]
  /** Money-saving tips and planning advice */
  tips: string[]
  /** Optional: typical use cases with project size and price examples */
  useCases?: CraneRatgeberUseCase[]
}

export const craneRatgeber: Record<string, CraneRatgeber> = {
  'autokran-mieten': {
    included: [
      'Ausgebildeter Kranführer (gesetzlich vorgeschrieben)',
      'Auf- und Abbau des Krans',
      '8 Stunden Arbeitszeit',
      'Haftpflichtversicherung',
      'Standardanschlagmittel',
    ],
    extras: [
      'An-/Abfahrt: ca. 2–4€/km',
      'Überstunden: 80–150€/h',
      'Wochenend-Zuschlag: 20–30%',
      'Sondertraversen: nach Aufwand',
      'Straßensperrung / Sondernutzungsgenehmigung: 100–500€',
    ],
    tips: [
      'Mindestmietdauer beträgt bei den meisten Anbietern 4 Stunden — kürzere Einsätze sind selten möglich.',
      'Planen Sie Material und Einbauort vorab — jede Wartestunde kostet 80–150€ extra.',
      'Bei mehrtägigen Einsätzen lohnt sich eine Wochenmiete (15–25% Ersparnis gegenüber Tagesmiete).',
      'Vergleichen Sie 3+ Anbieter — Preise schwanken regional um bis zu 30%.',
      'Frühzeitig buchen (1–2 Wochen Vorlauf) — kurzfristige Buchungen haben Aufpreis.',
    ],
    useCases: [
      {
        title: 'Hausbau & Dachstuhl',
        description: 'Dachstuhl setzen, Fertigteile heben, Betonelemente positionieren. Typisch: 30–50t Autokran, 1 Tag, 500–800€.',
      },
      {
        title: 'Industriemontage',
        description: 'Maschinen, Lüftungsanlagen, Transformatoren einsetzen. Typisch: 50–160t Autokran, 1–2 Tage, 1.000–2.000€/Tag.',
      },
      {
        title: 'Baumfällung & Garten',
        description: 'Schwere Baumstämme heben, Pool einsetzen, Gartenhaus aufstellen. Typisch: 30t Autokran, halber Tag, 400–600€.',
      },
      {
        title: 'Windkraft & Infrastruktur',
        description: 'Windkraftanlagen errichten, Brückenteile setzen, Stahlkonstruktionen montieren. Typisch: 250–500t, mehrere Tage.',
      },
    ],
  },
}

export function getRatgeberForCraneType(slug: string): CraneRatgeber | null {
  return craneRatgeber[slug] ?? null
}
