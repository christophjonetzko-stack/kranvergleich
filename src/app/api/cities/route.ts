import { NextResponse } from 'next/server'
import { COUNTRY } from '@/lib/country'

interface CityEntry {
  p: string  // PLZ (DE: 5 digits, AT: 4 digits)
  n: string  // name
  s: string  // state (Bundesland)
  la: number // latitude
  ln: number // longitude
}

interface IndexedCity extends CityEntry {
  _lower: string
  _plz: string
}

// The raw PLZ dataset mixes real places with "Großempfänger"-PLZ — dedicated
// postcodes for large organisations (insurers, banks, authorities, Deutsche Post
// nodes) whose "Ort" field is the org name, e.g. "AachenMünchener Versicherung AG".
// In a city autocomplete these are pure noise (typing "münch" surfaced a dozen
// insurance entries before "München"). Drop them at index-build time so they never
// reach the listing or PLZ resolution.
const ORG_RE =
  /(GmbH|mbH|Aktiengesellschaft|\bAG\b|\bKG\b|\bSE\b|\beG\b|\bIKK\b|\bAOK\b|\bBZ\b|Versicherung|Lebensvers|Sparkasse|Volksbank|Raiffeisenbank|Bundesbank|Hypothekenbank|Postbank|PSD Bank|\bBank\b|Rentenversicherung|Berufsgenossenschaft|Berufsförderung|Landesamt|Landesbetrieb|Agentur für Arbeit|Bundesagentur|Erzbistum|Erzbisch|Bistum|Ordinariat|Generalvikariat|Galeria|Kaufhof|Verlag|Postfach|Großkunde|Großempf|Großannahme|Finanzamt|Hauptzollamt|Zollamt|Deutsche Post|Deutsche Bundesbank|Deutsche Renten|Zustellst|Briefzentrum|Postzentrum|\bZSP\b|Direktion|Hauptverwaltung|Bezirksverwaltung|Bezirksregierung|Regionaldirektion|Knappschaft|Universität|Hochschule|\bRWTH\b|Klinikum|Kreisverwaltung|StädteRegion|Amtsgericht|Landgericht|Oberlandesgericht|Staatsanwaltschaft|Generalstaatsanw|Versorgungsamt|Ordnungsamt|Magistrat|Oberbürgermeister|Rundfunk|Industrie- und Handelskammer|Handwerkskammer|RheinEnergie|Stadtwerke|Wasserbetriebe|Anstalt des|Rewe|Generali|Allianz|Schadenservice|Service-Center|Feuerwehr|Brauerei|Stiftung|Schenker|\bDHL\b|Hermes)/i

function isOrgEntry(name: string): boolean {
  if (ORG_RE.test(name)) return true
  if (/\s-[^-]{2,}-/.test(name)) return true // "... -Der Magistrat-" style appendage
  if (/^Stadt\s+\S+\s+\S+/.test(name)) return true // "Stadt Frankfurt am ..." (real "Stadt Wehlen" = 2 words survives)
  return false
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Lazy-init so the country-specific PLZ dataset is loaded once per worker.
// Build-time COUNTRY decides which dataset; the other branch is tree-shaken.
let _index: IndexedCity[] | null = null
async function getIndexedCities(): Promise<IndexedCity[]> {
  if (_index) return _index
  const raw = COUNTRY === 'AT'
    ? ((await import('@/data/austrian-cities.json')).default as CityEntry[])
    : ((await import('@/data/german-cities.json')).default as CityEntry[])
  _index = raw
    .filter((c) => !isOrgEntry(c.n))
    .map((c) => ({
      ...c,
      _lower: c.n.toLowerCase(),
      _plz: c.p,
    }))
  return _index
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = (searchParams.get('q') || '').trim()

  if (query.length < 3) {
    return NextResponse.json([])
  }

  const q = query.toLowerCase()
  const isPlzSearch = /^\d+$/.test(query)
  const cities = await getIndexedCities()

  let matched: IndexedCity[]
  if (isPlzSearch) {
    matched = cities.filter((c) => c._plz.startsWith(query))
  } else {
    // Word-prefix match: the query must start the name or a word inside it (after
    // space, hyphen, slash or "("). This finds "Köln" and "Bad Reichenhall" (via
    // "reichenhall") but not places that merely contain the letters mid-word.
    const wp = new RegExp(`(^|[\\s(\\-/])${escapeRegExp(q)}`)
    matched = cities.filter((c) => wp.test(c._lower))
    // Rank: full-name prefix first ("München" before "Garching bei München"),
    // then shorter names (the bare city before its districts), then alphabetical.
    matched.sort((a, b) => {
      const ap = a._lower.startsWith(q) ? 0 : 1
      const bp = b._lower.startsWith(q) ? 0 : 1
      if (ap !== bp) return ap - bp
      if (a.n.length !== b.n.length) return a.n.length - b.n.length
      return a._lower.localeCompare(b._lower)
    })
  }

  // Dedupe by name + state so one city's many PLZ collapse to a single row,
  // while genuinely distinct same-name towns in different states are kept.
  const seen = new Set<string>()
  const results: Array<{ plz: string; name: string; state: string; lat: number; lng: number; label: string }> = []
  for (const c of matched) {
    const key = `${c._lower}|${c.s}`
    if (seen.has(key)) continue
    seen.add(key)
    results.push({ plz: c.p, name: c.n, state: c.s, lat: c.la, lng: c.ln, label: `${c.p} ${c.n}` })
    if (results.length >= 15) break
  }

  return NextResponse.json(results)
}
