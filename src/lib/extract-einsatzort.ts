// Einsatzort city-name extraction from free-text project descriptions.
//
// Why: the profile single-pick "auch an weitere passende Anbieter in der Nähe"
// extension (fanout #3) anchored the nearest-firm search at the CHOSEN firm's
// city, not at the actual Einsatzort. When the customer picks a firm in city A
// but the job site is in city B (lead Codur 2026-06-26: pick Zülpich, job
// "Treppenturm-Aufbau in Aachen auf der Jülicherstraße 202"), the extension
// broadened around the wrong place. The PLZ extractor (extract-plz.ts) only
// catches a *postal code* in the text — Codur's description named a city, no
// PLZ — so nothing corrected the anchor. This helper recovers a city name.
//
// Companion to extractAddressPlz: the PLZ path wins when a postal code is
// present; this fills the gap when only a city name is stated.
//
// Conservative by design (a misrouted dispatch is worse than no reroute):
//  - EXACT normalized match against the gazetteer only — never startsWith, so
//    "Jülicherstraße" never matches "Jülich" and street adjectives ("Aachener
//    Straße") never match "Aachen" (the adjective form doesn't equal the name).
//  - A city is only ACCEPTED when it sits next to a location cue ("in Aachen",
//    "Baustelle Bergisch Gladbach", "Einsatzort: …") within a small window,
//    so an incidental capitalised word that happens to be a town is ignored.
//  - If TWO OR MORE distinct gazetteer cities appear anywhere in the text, we
//    refuse to guess and return { ambiguous } so the caller flags it for a
//    human instead of silently routing to one of them.
//
// The returned name is a canonical gazetteer name; the caller hands it to
// getCompaniesForCraneTypeNearLocation, which re-resolves it authoritatively.

/** Minimal city shape this helper needs — structurally compatible with the
 *  CityRow used in queries.ts (`{ p, n, s, la, ln }`). Only the name matters. */
export type GazetteerCity = { n: string }

export type EinsatzortMatch =
  | { city: string } //            exactly one anchored city (canonical name)
  | { ambiguous: string[] } //     ≥2 distinct cities named — do not guess

// Location cues that mark the following token(s) as a place reference. Kept
// deliberately small and high-precision. A bare 4–5 digit PLZ token also acts
// as a cue ("… , 50674 Köln"), even though the PLZ path usually wins first.
const CUE_WORDS = new Set([
  'in', 'im', 'nach', 'bei', 'beim', 'zu', 'zur', 'aus', 'vor',
  'ort', 'einsatzort', 'einsatzadresse', 'einsatzstelle', 'standort',
  'baustelle', 'objekt', 'adresse', 'anschrift', 'plz', 'lieferung',
  'montage', 'aufstellung', 'aufbau', 'abladestelle', 'lieferadresse',
])

const CUE_WINDOW = 2 // how many tokens before the city name we scan for a cue
const MAX_NGRAM = 4 // "Mülheim an der Ruhr"

function norm(s: string): { withAe: string; stripped: string } {
  // Mirrors normalizeCityName() in queries.ts so an extracted candidate
  // resolves identically downstream.
  const lower = s.toLowerCase().trim().replace(/\s+/g, ' ')
  const withAe = lower.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
  const stripped = lower.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss')
  return { withAe, stripped }
}

/** Strip surrounding punctuation from a raw token, keep inner letters/digits. */
function clean(tok: string): string {
  return tok.replace(/^[^\p{L}\p{N}]+/u, '').replace(/[^\p{L}\p{N}]+$/u, '')
}

const isPlzTok = (t: string) => /^\d{4,5}$/.test(t)

/**
 * Extract a single Einsatzort city from a free-text description.
 * @param text  project description
 * @param cities gazetteer rows (pre-sorted bigger-city-first, as getCitiesJson returns)
 */
export function extractEinsatzortCity(
  text: string,
  cities: ReadonlyArray<GazetteerCity>,
): EinsatzortMatch | null {
  if (!text || !text.trim()) return null

  // Build lookup: normalized name → canonical name. Gazetteer is pre-sorted so
  // the first (bigger) city wins a shared name (Frankfurt am Main over Oder).
  const byAe = new Map<string, string>()
  const byStripped = new Map<string, string>()
  for (const c of cities) {
    const k = norm(c.n)
    if (!byAe.has(k.withAe)) byAe.set(k.withAe, c.n)
    if (!byStripped.has(k.stripped)) byStripped.set(k.stripped, c.n)
  }

  const rawTokens = text.split(/\s+/)
  const tokens = rawTokens.map(clean)

  const allCities = new Set<string>() //      any exact match, anywhere
  const anchoredCities = new Set<string>() // exact match next to a location cue

  let i = 0
  while (i < tokens.length) {
    if (!tokens[i]) {
      i++
      continue
    }
    // Try the longest n-gram first so "Bergisch Gladbach" beats "Bergisch".
    let matched: { canonical: string; span: number } | null = null
    for (let n = Math.min(MAX_NGRAM, tokens.length - i); n >= 1; n--) {
      const parts = tokens.slice(i, i + n).filter(Boolean)
      if (parts.length < n) continue
      const phrase = parts.join(' ')
      // A leading token that is purely a street/number fragment can't start a city.
      if (/^\d/.test(phrase)) continue
      const k = norm(phrase)
      const canonical = byAe.get(k.withAe) ?? byStripped.get(k.stripped)
      if (canonical) {
        matched = { canonical, span: n }
        break
      }
    }
    if (!matched) {
      i++
      continue
    }
    allCities.add(matched.canonical)
    // Anchored? scan up to CUE_WINDOW non-empty tokens before position i.
    let anchored = false
    let seen = 0
    for (let j = i - 1; j >= 0 && seen < CUE_WINDOW; j--) {
      const t = tokens[j]
      if (!t) continue
      seen++
      const low = t.toLowerCase()
      if (CUE_WORDS.has(low) || isPlzTok(t)) {
        anchored = true
        break
      }
    }
    if (anchored) anchoredCities.add(matched.canonical)
    i += matched.span // consume the whole matched n-gram
  }

  if (allCities.size >= 2) return { ambiguous: [...allCities] }
  if (anchoredCities.size === 1) return { city: [...anchoredCities][0] }
  return null
}
