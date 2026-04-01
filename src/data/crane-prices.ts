/**
 * Statische Preiswidegabeln per Krantyp.
 * Basiert auf Marktrecherche (Branchendurchschnitt DE, Stand Q1 2026).
 * Nicht per Firma, sondern als Orientierung für Nutzer.
 */
export interface CranePriceRange {
  craneTypeSlug: string
  dayFrom: number
  dayTo: number
  weekFrom: number
  weekTo: number
  monthFrom: number
  monthTo: number
  includesOperator: boolean
  notes: string
}

export const cranePrices: CranePriceRange[] = [
  {
    craneTypeSlug: 'minikran-mieten',
    dayFrom: 250,
    dayTo: 500,
    weekFrom: 1200,
    weekTo: 2800,
    monthFrom: 3500,
    monthTo: 8000,
    includesOperator: false,
    notes: 'Preis ohne Kranführer. Transport (Anlieferung + Abholung) ab ca. 150–300€ extra.',
  },
  {
    craneTypeSlug: 'autokran-mieten',
    dayFrom: 500,
    dayTo: 2000,
    weekFrom: 2500,
    weekTo: 10000,
    monthFrom: 8000,
    monthTo: 35000,
    includesOperator: true,
    notes: 'Preis inkl. Kranführer (Pflicht bei Autokranen). Einsatzzeit meist 8h/Tag.',
  },
  {
    craneTypeSlug: 'dachdeckerkran-mieten',
    dayFrom: 200,
    dayTo: 450,
    weekFrom: 1000,
    weekTo: 2500,
    monthFrom: 3000,
    monthTo: 7000,
    includesOperator: false,
    notes: 'Preis ohne Bediener. Einweisung meist inklusive. LKW-Aufbau oder Anhänger.',
  },
  {
    craneTypeSlug: 'raupenkran-mieten',
    dayFrom: 800,
    dayTo: 5000,
    weekFrom: 4000,
    weekTo: 25000,
    monthFrom: 12000,
    monthTo: 80000,
    includesOperator: true,
    notes: 'Preis inkl. Kranführer. Stark abhängig von Tragkraft (50t–3.000t).',
  },
  {
    craneTypeSlug: 'anhaengerkran-mieten',
    dayFrom: 150,
    dayTo: 350,
    weekFrom: 700,
    weekTo: 1800,
    monthFrom: 2000,
    monthTo: 5000,
    includesOperator: false,
    notes: 'Günstiger Einstieg. Leicht transportierbar mit PKW-Anhängerkupplung.',
  },
  {
    craneTypeSlug: 'mobilkran-mieten',
    dayFrom: 600,
    dayTo: 3000,
    weekFrom: 3000,
    weekTo: 15000,
    monthFrom: 10000,
    monthTo: 50000,
    includesOperator: true,
    notes: 'Preis inkl. Kranführer. Traglasten von 20t bis 1.200t möglich.',
  },
  {
    craneTypeSlug: 'baukran-mieten',
    dayFrom: 300,
    dayTo: 1500,
    weekFrom: 1500,
    weekTo: 8000,
    monthFrom: 4000,
    monthTo: 25000,
    includesOperator: false,
    notes: 'Turmdrehkran (Baukran). Montage/Demontage ab ca. 3.000–8.000€ extra.',
  },
  {
    craneTypeSlug: 'ladekran-mieten',
    dayFrom: 300,
    dayTo: 800,
    weekFrom: 1500,
    weekTo: 4000,
    monthFrom: 4000,
    monthTo: 12000,
    includesOperator: false,
    notes: 'LKW-Ladekran. Preis ohne Bediener. Oft als LKW-Komplettpaket mit Fahrer buchbar.',
  },
]

export function getPriceForCraneType(slug: string): CranePriceRange | undefined {
  return cranePrices.find(p => p.craneTypeSlug === slug)
}
