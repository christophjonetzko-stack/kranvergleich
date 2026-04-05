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
}

export const craneTypes: CraneTypeInfo[] = [
  { slug: 'minikran-mieten', name: 'Minikran', namePlural: 'Minikrane', desc: 'Kompakt, für enge Baustellen & Innenräume', image: '/images/crane-types/minikran.svg', synonyms: ['Spinnenkran', 'Spider Crane', 'Glasmontagekran', 'Kompaktkran'] },
  { slug: 'autokran-mieten', name: 'Autokran', namePlural: 'Autokrane', desc: 'Flexibel, für mittlere bis schwere Lasten', image: '/images/crane-types/autokran.svg', synonyms: ['Kranwagen', 'Fahrzeugkran', 'LKW-Kran', 'Mobilautokran'] },
  { slug: 'dachdeckerkran-mieten', name: 'Dachdeckerkran', namePlural: 'Dachdeckerkrane', desc: 'Schneller Aufbau für Dacharbeiten', image: '/images/crane-types/dachdeckerkran.svg', synonyms: ['Dachkran', 'Aufzugskran', 'Ziegelkran', 'Schrägaufzug'] },
  { slug: 'raupenkran-mieten', name: 'Raupenkran', namePlural: 'Raupenkrane', desc: 'Schweres Gelände, große Traglasten', image: '/images/crane-types/raupenkran.svg', synonyms: ['Kettenkran', 'Crawler Crane', 'Gleiskettenkran'] },
  { slug: 'anhaengerkran-mieten', name: 'Anhängerkran', namePlural: 'Anhängerkrane', desc: 'Günstig & leicht transportierbar', image: '/images/crane-types/anhaengerkran.svg', synonyms: ['Trailerkran', 'Mobilanhängerkran', 'Kleinkran'] },
  { slug: 'mobilkran-mieten', name: 'Mobilkran', namePlural: 'Mobilkrane', desc: 'Hohe Traglasten, schnell einsatzbereit', image: '/images/crane-types/mobilkran.svg', synonyms: ['Schwerlastkran', 'Teleskopkran', 'Kranwagen', 'All-Terrain-Kran'] },
  { slug: 'baukran-mieten', name: 'Baukran', namePlural: 'Baukrane', desc: 'Turmdrehkran für Großbaustellen', image: '/images/crane-types/baukran.svg', synonyms: ['Turmdrehkran', 'Obendreherkran', 'Baukran-Turm', 'Kran für Baustelle'] },
  { slug: 'ladekran-mieten', name: 'Ladekran', namePlural: 'Ladekrane', desc: 'LKW-montiert, für Be- & Entladearbeiten', image: '/images/crane-types/ladekran.svg', synonyms: ['Ladegeschirr', 'Knickarmkran', 'Hiab-Kran', 'LKW-Ladekran'] },
]

export function getCraneTypeName(slug: string): string {
  return craneTypes.find(ct => ct.slug === slug)?.name ?? slug
}

/**
 * UUID → name mapping. Populated at build time from Supabase crane_types table IDs.
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
