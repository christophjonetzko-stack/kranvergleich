/**
 * Static crane type definitions used across the app.
 * Must stay in sync with crane_types table in Supabase.
 */
export interface CraneTypeInfo {
  slug: string
  name: string
  namePlural: string
  desc: string
  image: string
  synonyms: string[]
  /** Typical max working reach/height envelope (m) for this crane class.
   *  Coarse Richtwert, used as the fallback in the 2D fit (Last × Reichweite)
   *  when a firm's real company_cranes.max_reach_m is unknown (~0% populated).
   *  See Dosc/AI_GEFUEHRTE_SUCHE_PLAN_2026_06_03.md. Routing-only, not displayed. */
  maxReachM: number
}

export const craneTypes: CraneTypeInfo[] = [
  { slug: 'minikran-mieten', name: 'Minikran', namePlural: 'Minikrane', desc: 'Kompakt, für enge Baustellen & Innenräume', image: '/images/crane-types/minikran.webp', synonyms: ['Spinnenkran', 'Spider Crane', 'Glasmontagekran', 'Raupen-Minikran', 'kleiner Kran', 'Miniraupenkran'], maxReachM: 18 },
  { slug: 'autokran-mieten', name: 'Autokran', namePlural: 'Autokrane', desc: 'Flexibel, für mittlere bis schwere Lasten', image: '/images/crane-types/autokran.webp', synonyms: ['Kranwagen', 'Fahrzeugkran', 'LKW-Kran', 'Auto mit Kran', 'Mietkran'], maxReachM: 44 },
  { slug: 'dachdeckerkran-mieten', name: 'Dachdeckerkran', namePlural: 'Dachdeckerkrane', desc: 'Schneller Aufbau für Dacharbeiten', image: '/images/crane-types/dachdeckerkran.webp', synonyms: ['Dachkran', 'Aufzugskran', 'Ziegelkran', 'Schrägaufzug', 'Dachdecker Kran', 'Dachdecker-LKW-Kran'], maxReachM: 25 },
  { slug: 'raupenkran-mieten', name: 'Raupenkran', namePlural: 'Raupenkrane', desc: 'Schweres Gelände, große Traglasten', image: '/images/crane-types/raupenkran.webp', synonyms: ['Kettenkran', 'Crawler Crane', 'Gleiskettenkran', 'Raupen-Minikran', 'mobiler Raupenkran'], maxReachM: 90 },
  { slug: 'anhaengerkran-mieten', name: 'Anhängerkran', namePlural: 'Anhängerkrane', desc: 'Günstig & leicht transportierbar', image: '/images/crane-types/anhaengerkran.webp', synonyms: ['PKW-Anhänger mit Kran', 'Trailerkran', 'Mobilanhängerkran', 'Kleinkran'], maxReachM: 10 },
  { slug: 'mobilkran-mieten', name: 'Mobilkran', namePlural: 'Mobilkrane', desc: 'Hohe Traglasten, schnell einsatzbereit', image: '/images/crane-types/mobilkran.webp', synonyms: ['Schwerlastkran', 'Teleskopkran', 'Telekran', 'Mobilbaukran', 'mobiler Kran', 'Hebekran'], maxReachM: 70 },
  { slug: 'baukran-mieten', name: 'Baukran', namePlural: 'Baukrane', desc: 'Turmdrehkran für Großbaustellen', image: '/images/crane-types/baukran.webp', synonyms: ['Turmdrehkran', 'Baustellenkran', 'Schnellbaukran', 'Hochbaukran', 'Mobilbaukran', 'Faltkran'], maxReachM: 55 },
  { slug: 'ladekran-mieten', name: 'Ladekran', namePlural: 'Ladekrane', desc: 'LKW-montiert, für Be- & Entladearbeiten', image: '/images/crane-types/ladekran.webp', synonyms: ['Knickarmkran', 'Hiab-Kran', 'LKW-Ladekran', 'Lastkran'], maxReachM: 20 },
]

export function getCraneTypeName(slug: string): string {
  return craneTypes.find(ct => ct.slug === slug)?.name ?? slug
}

/**
 * UUID  name mapping. Populated at build time from Supabase crane_types table IDs.
 */
const CRANE_TYPE_ID_MAP: Record<string, string> = {
  '1a7019bd-7fd3-401a-8713-7f6be6fbd827': 'Minikran',
  'ab511eea-d464-47b9-8ada-16931dab5078': 'Autokran',
  '99e6ce74-f707-494e-afc8-31627b3bf41d': 'Dachdeckerkran',
  '0b61b867-53a6-4cf9-afbb-50c610dc4a2a': 'Raupenkran',
  'ef7ed422-402e-4553-9c01-661df28c66fc': 'Anhängerkran',
  '02dc05de-6699-4849-93fb-2b655177bfd9': 'Mobilkran',
  'f1f86ce7-14b8-48ce-9004-5db8dde53949': 'Baukran',
  'a556dcad-e379-4ac3-8d72-6eed094900d1': 'Ladekran',
}

export function getCraneTypeNameById(id: string): string {
  return CRANE_TYPE_ID_MAP[id] ?? id
}

/** Per-type reach envelope (m) by crane_type_id (Supabase UUID). Fallback for
 *  the 2D fit when a firm's real max_reach_m is unknown. Null for unknown ids. */
export function getCraneMaxReachById(id: string): number | null {
  const name = CRANE_TYPE_ID_MAP[id]
  if (!name) return null
  return craneTypes.find((ct) => ct.name === name)?.maxReachM ?? null
}

/** slug (e.g. 'minikran-mieten')  UUID. Reverse of the slugnameid chain. */
const SLUG_TO_ID: Record<string, string> = Object.fromEntries(
  craneTypes.map((ct) => {
    const entry = Object.entries(CRANE_TYPE_ID_MAP).find(([, name]) => name === ct.name)
    return [ct.slug, entry?.[0] ?? '']
  }),
)

export function getCraneTypeIdBySlug(slug: string): string | null {
  return SLUG_TO_ID[slug] || null
}
