import { supabase, getServiceSupabase } from './supabase'
import { COUNTRY, getCompanyIdsInCountry } from './country'
import type { CraneType, City, Company, CompanyWithCranes } from './types'

// ============================================
// STATS (for trust bar / dynamic counts)
// ============================================

function roundDown10(n: number): number {
  return Math.floor(n / 10) * 10
}

// PostgREST silently caps a single .select() at 1000 rows. Tables that crossed
// that line (company_cranes 2023, company_regions 2554 as of 2026-05-06) silently
// truncated home-page Anbieter counts (172 vs real 403 for Autokran) and
// sitemap city completeness. Any unfiltered or weakly-filtered select on a
// growing table MUST go through this paginator.
async function selectAllPaginated<T>(
  query: () => { range: (start: number, end: number) => PromiseLike<{ data: T[] | null }> },
): Promise<T[]> {
  const PAGE = 1000
  const all: T[] = []
  let offset = 0
  // Hard ceiling avoids a runaway loop on a malformed query.
  while (offset < 100_000) {
    const { data } = await query().range(offset, offset + PAGE - 1)
    if (!data || data.length === 0) break
    all.push(...data)
    if (data.length < PAGE) break
    offset += PAGE
  }
  return all
}

/**
 * Weighted-average AggregateRating from a set of companies' Google ratings.
 *
 * Used by the Product JSON-LD on /[crane-type] and /[crane-type]/[city] —
 * Google Search Console flagged "missing aggregateRating" on those pages.
 * We aggregate from real Google Maps ratings of the firms offering this
 * crane type (data is authentic, BGH allows aggregated reviews when source
 * is genuine — though we don't surface attribution in the UI, the schema
 * is a machine-readable hint for SERP star snippets, not a user claim).
 *
 * Returns null when fewer than 3 firms have a rating — too small a sample
 * lets a single 5★ review swing the weighted average and Google may flag
 * the schema as unreliable. Caller must omit AggregateRating from the
 * JSON-LD when this returns null.
 */
export function computeAggregateRating(
  companies: { google_rating?: number | null; google_reviews_count?: number | null }[],
): { ratingValue: number; reviewCount: number } | null {
  const rated = companies.filter(
    (c) =>
      typeof c.google_rating === 'number' && c.google_rating > 0 &&
      typeof c.google_reviews_count === 'number' && c.google_reviews_count > 0,
  )
  if (rated.length < 3) return null
  const totalReviews = rated.reduce((s, c) => s + (c.google_reviews_count ?? 0), 0)
  if (totalReviews === 0) return null
  const weightedSum = rated.reduce(
    (s, c) => s + (c.google_rating ?? 0) * (c.google_reviews_count ?? 0),
    0,
  )
  const ratingValue = Math.round((weightedSum / totalReviews) * 10) / 10
  return { ratingValue, reviewCount: totalReviews }
}

export async function getSiteStats(): Promise<{
  anbieterCount: number
  staedteCount: number
  // null when the rated-firm sample is empty or rounds to 0 reviews after the
  // floor-to-100 — callers must not render a star rating without a real count
  // behind it. Previously this defaulted to a hard-coded 4.2 which leaked as a
  // placeholder ("★ 4,2 (0)") whenever data hadn't been enriched yet.
  avgRating: number | null
  totalReviews: number
}> {
  // Country scoping: companies are filtered through company_regions -> cities.country
  // (handles cross-country firms like Boels — Sitz DE, branches in AT). Cities count
  // uses cities.country directly. Empty country (no AT data yet) short-circuits the
  // company queries to avoid generating an invalid empty `IN ()` against PostgREST.
  const inCountryIds = await getCompanyIdsInCountry()
  const noCompanies = inCountryIds.size === 0

  // After the 2026-05-06 upstream pagination fix, inCountryIds grew from
  // a truncated 536 to the real ~800 — large enough that .in('id', list)
  // pushed the request URL past PostgREST's length limit and the count
  // query started returning null, falling back to the hard-coded 700.
  // Fetch the full active+relevant company set without an IN-list (small,
  // ~700 rows even at full catalog) and intersect in JS.
  const [activeRelevantRes, ratingRes, cityCountRes] = await Promise.all([
    noCompanies
      ? Promise.resolve({ data: [] as Array<{ id: string }> })
      : supabase.from('companies').select('id').eq('is_active', true).eq('is_relevant', true),
    noCompanies
      ? Promise.resolve({
          data: [] as Array<{ id: string; google_rating: number | null; google_reviews_count: number | null }>,
        })
      : supabase
          .from('companies')
          .select('id, google_rating, google_reviews_count')
          .eq('is_active', true)
          .eq('is_relevant', true)
          .not('google_rating', 'is', null),
    supabase.from('cities').select('*', { count: 'exact', head: true }).eq('country', COUNTRY).eq('is_active', true),
  ])
  const cityCount = cityCountRes.count

  const activeRelevantIds = new Set<string>((activeRelevantRes.data ?? []).map((c) => c.id))
  let firmCount = 0
  for (const id of inCountryIds) if (activeRelevantIds.has(id)) firmCount += 1

  const ratingData = (ratingRes.data ?? []).filter((r) => inCountryIds.has(r.id))

  let avgRating: number | null = null
  let totalReviews = 0
  if (ratingData && ratingData.length > 0) {
    const sum = ratingData.reduce((acc, r) => acc + (r.google_rating ?? 0), 0)
    avgRating = Math.round((sum / ratingData.length) * 10) / 10
    totalReviews = ratingData.reduce((acc, r) => acc + (r.google_reviews_count ?? 0), 0)
  }

  // Floor reviews to the nearest 100 — round numbers read as curated, not
  // precise-but-stale. Pair the rating to the floored count: if the floor
  // wipes the count to 0, drop the rating too so the trust bar can't show
  // "★ 4,2 (0)" — the two fields are surfaced together or not at all.
  const flooredReviews = Math.floor(totalReviews / 100) * 100

  return {
    // firmCount is now a JS-side intersection (always a number, never null),
    // so the old `?? 700` fallback only matters when the entire country has
    // zero firms — which would be a launch-state condition, not normal ops.
    // The 2026-05-06 pagination saga left this number stuck at the fallback
    // because .in('id', 800-uuid-list) pushed the request URL past PostgREST's
    // limit and silently nulled out the count.
    anbieterCount: roundDown10(firmCount > 0 ? firmCount : 700),
    staedteCount: roundDown10(cityCount ?? 40),
    avgRating: flooredReviews > 0 ? avgRating : null,
    totalReviews: flooredReviews,
  }
}

// ============================================
// CRANE TYPES
// ============================================

export async function getCraneTypes(): Promise<CraneType[]> {
  const { data, error } = await supabase
    .from('crane_types')
    .select('*')
    .order('sort_order')

  if (error) throw error
  return data ?? []
}

export async function getCraneTypeBySlug(slug: string): Promise<CraneType | null> {
  const { data, error } = await supabase
    .from('crane_types')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data
}

// ============================================
// CITIES
// ============================================

export async function getCities(): Promise<City[]> {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('country', COUNTRY)
    .eq('is_active', true)
    .order('population', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getCityBySlug(slug: string): Promise<City | null> {
  // country filter is defensive — slugs are globally unique, but a DE-side admin
  // accidentally adding an AT-named city without country='AT' would otherwise
  // leak across deployments.
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('slug', slug)
    .eq('country', COUNTRY)
    .eq('is_active', true)
    .single()

  if (error) return null
  return data
}

// ============================================
// COMPANIES
// ============================================

export async function getCompanyBySlug(slug: string): Promise<CompanyWithCranes | null> {
  const { data, error } = await supabase
    .from('companies')
    .select(`
      *,
      company_cranes (*)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .eq('is_relevant', true)
    .single()

  if (error) return null
  return data
}

/**
 * Get other companies in the same city (for cross-linking on company profile).
 */
export async function getOtherCompaniesInCity(
  city: string,
  excludeSlug: string,
  limit: number = 6
): Promise<{ name: string; slug: string; google_rating: number | null }[]> {
  const inCountryIds = [...(await getCompanyIdsInCountry())]
  if (inCountryIds.length === 0) return []

  const { data } = await supabase
    .from('companies')
    .select('name, slug, google_rating')
    .in('id', inCountryIds)
    .eq('city', city)
    .eq('is_active', true)
    .eq('is_relevant', true)
    .neq('slug', excludeSlug)
    .order('google_rating', { ascending: false })
    .limit(limit)

  return data ?? []
}

/**
 * Get companies for a crane type in a city.
 * Uses company_regions to match city, and company_cranes to match crane type.
 */
export async function getCompaniesForCraneAndCity(
  craneTypeId: string,
  cityId: string
): Promise<CompanyWithCranes[]> {
  // Get ALL company IDs that serve this city
  const { data: regionData } = await supabase
    .from('company_regions')
    .select('company_id')
    .eq('city_id', cityId)

  if (!regionData || regionData.length === 0) return []

  const companyIds = [...new Set(regionData.map(r => r.company_id))]

  // Fetch in batches of 50 to avoid URL length limits
  const batchSize = 50
  const firstBatch = companyIds.slice(0, batchSize)

  const { data, error } = await supabase
    .from('companies')
    .select(`
      *,
      company_cranes (*)
    `)
    .in('id', firstBatch)
    .eq('is_active', true)
    .eq('is_relevant', true)
    .order('is_premium', { ascending: false })
    .order('google_rating', { ascending: false })

  if (error) throw error
  const all = data ?? []

  // Sort: companies with matching crane type first, then the rest
  const withType = all.filter((c) =>
    c.company_cranes?.some((cc: any) => cc.crane_type_id === craneTypeId)
  )
  const withoutType = all.filter(
    (c) => !c.company_cranes?.some((cc: any) => cc.crane_type_id === craneTypeId)
  )
  return [...withType, ...withoutType]
}

/**
 * Get cities that have >= minCompanies for a given crane type.
 * Used for generateStaticParams — only generate pages for cities with enough data.
 */
export async function getCitiesWithMinCompanies(
  craneTypeId: string,
  minCompanies: number = 3
): Promise<City[]> {
  // Count only active+relevant companies — matches page-level noindex threshold,
  // so sitemap (which uses this) does not advertise URLs that will be noindexed.
  // When craneTypeId is non-empty, only firms that actually offer that crane
  // type are counted toward the threshold. Without this filter the sitemap
  // listed e.g. /minikran-mieten/wien (0 AT Minikran firms) which then served
  // a noindex tag — Google sees that as "Excluded by noindex" and erodes
  // trust in the sitemap. The arg used to be `_craneTypeId` (TODO leftover).
  const [allRegions, activeRes] = await Promise.all([
    // company_regions has 2554 rows as of 2026-05-06 — must paginate.
    selectAllPaginated<{ company_id: string; city_id: string }>(() =>
      supabase.from('company_regions').select('company_id, city_id'),
    ),
    supabase.from('companies').select('id').eq('is_active', true).eq('is_relevant', true),
  ])

  let typeFilter: Set<string> | null = null
  if (craneTypeId) {
    const { data } = await supabase
      .from('company_cranes')
      .select('company_id')
      .eq('crane_type_id', craneTypeId)
    typeFilter = new Set((data ?? []).map((c) => c.company_id))
  }

  const activeIds = new Set((activeRes.data ?? []).map(c => c.id))
  if (allRegions.length === 0 || activeIds.size === 0) return []

  const cityCounts = new Map<string, Set<string>>()
  for (const r of allRegions) {
    if (!activeIds.has(r.company_id)) continue
    if (typeFilter && !typeFilter.has(r.company_id)) continue
    if (!cityCounts.has(r.city_id)) cityCounts.set(r.city_id, new Set())
    cityCounts.get(r.city_id)!.add(r.company_id)
  }

  const qualifyingCityIds = [...cityCounts.entries()]
    .filter(([, companies]) => companies.size >= minCompanies)
    .map(([cityId]) => cityId)

  if (qualifyingCityIds.length === 0) return []

  const { data: cities } = await supabase
    .from('cities')
    .select('*')
    .in('id', qualifyingCityIds)
    .eq('country', COUNTRY)
    .eq('is_active', true)
    .order('population', { ascending: false })

  return cities ?? []
}

/**
 * Get top companies that offer a given crane type (for landing page).
 * Limited to 50 to avoid URL length issues with Supabase REST API.
 *
 * When `nearPlz` is provided, sort by geodistance from that PLZ first, then
 * take the 50 nearest (instead of top-rated). Used when user lands here via
 * the homepage SearchBox with a PLZ — nearest firms are the relevant ones.
 */
/** Distinct active-company count per crane_type, keyed by crane_type_id.
 * Used to fill the "Anbieter" column in the home-page crane-type table.
 * One batch query — cheaper than N calls to getCompaniesForCraneType just
 * to read .length. */
export async function getCompanyCountsPerCraneType(): Promise<Map<string, number>> {
  const inCountryIds = await getCompanyIdsInCountry()
  if (inCountryIds.size === 0) return new Map()

  // company_cranes has 2023 rows as of 2026-05-06; the default 1000-row cap
  // silently truncated home-page counts. Pagination of the bare table avoids
  // the resource-embedding JOIN range bug that masked earlier fix attempts.
  const data: Array<{ crane_type_id: string; company_id: string }> = []
  const PAGE = 1000
  for (let offset = 0; offset < 100_000; offset += PAGE) {
    const { data: page, error } = await supabase
      .from('company_cranes')
      .select('crane_type_id, company_id')
      .range(offset, offset + PAGE - 1)
    if (error) {
      console.error('getCompanyCountsPerCraneType pagination error:', error)
      break
    }
    if (!page || page.length === 0) break
    data.push(...page)
    if (page.length < PAGE) break
  }
  console.log(`[getCompanyCountsPerCraneType] paginated ${data.length} rows of company_cranes`)

  // inCountryIds covers DE/AT region membership but NOT companies.is_active /
  // is_relevant — those flags live on the companies row, not company_regions.
  // Intersect now so the home-page Anbieter count excludes deactivated firms
  // (614e560 dropped the SQL-level filter to dodge the JOIN range bug, so
  // active+relevant filtering must happen here in JS instead).
  const { data: activeRows } = await supabase
    .from('companies')
    .select('id')
    .eq('is_active', true)
    .eq('is_relevant', true)
  const activeIds = new Set<string>((activeRows ?? []).map((c) => c.id))

  const perType = new Map<string, Set<string>>()
  for (const row of data) {
    if (!inCountryIds.has(row.company_id)) continue
    if (!activeIds.has(row.company_id)) continue
    const set = perType.get(row.crane_type_id) ?? new Set<string>()
    set.add(row.company_id)
    perType.set(row.crane_type_id, set)
  }
  const out = new Map<string, number>()
  for (const [k, v] of perType) out.set(k, v.size)
  return out
}

export async function getCompaniesForCraneType(
  craneTypeId: string,
  nearPlz?: string
): Promise<CompanyWithCranes[]> {
  const inCountryIds = await getCompanyIdsInCountry()
  if (inCountryIds.size === 0) return []

  const { data: craneData } = await supabase
    .from('company_cranes')
    .select('company_id')
    .eq('crane_type_id', craneTypeId)

  if (!craneData || craneData.length === 0) return []

  const companyIds = [...new Set(craneData.map(c => c.company_id))].filter((id) => inCountryIds.has(id))
  if (companyIds.length === 0) return []
  const limit = 50

  // PLZ-near path: load ALL matching companies (in batches), sort by distance,
  // then return the 50 nearest. Only triggers when nearPlz is a valid 5-digit
  // code that resolves to a city in german-cities.json.
  if (nearPlz && /^\d{5}$/.test(nearPlz)) {
    const citiesJson = (await import('@/data/german-cities.json')).default as Array<{
      p: string; n: string; s: string; la: number; ln: number
    }>
    const plzCity = citiesJson.find((c) => c.p === nearPlz)

    if (plzCity) {
      const refLat = plzCity.la
      const refLng = plzCity.ln
      const batchSize = 100
      const all: CompanyWithCranes[] = []
      for (let i = 0; i < companyIds.length; i += batchSize) {
        const batch = companyIds.slice(i, i + batchSize)
        const { data } = await supabase
          .from('companies')
          .select(`*, company_cranes (*)`)
          .in('id', batch)
          .eq('is_active', true)
          .eq('is_relevant', true)
        if (data) all.push(...data)
      }
      // Build PLZ→coords map for fallback when company has no lat/lng (~39 firms).
      // First match on 5-digit zip; if that fails use the leading 2 digits.
      const plzMap = new Map<string, { la: number; ln: number }>()
      const plz2Map = new Map<string, { la: number; ln: number }>()
      for (const c of citiesJson) {
        if (!plzMap.has(c.p)) plzMap.set(c.p, { la: c.la, ln: c.ln })
        const p2 = c.p.slice(0, 2)
        if (!plz2Map.has(p2)) plz2Map.set(p2, { la: c.la, ln: c.ln })
      }

      // Haversine-ish distance (flat-earth approximation is fine for ranking)
      const withDist = all.map((c) => {
        let lat = c.lat
        let lng = c.lng
        if (lat == null || lng == null) {
          const fallback = (c.zip && plzMap.get(c.zip)) || (c.zip && plz2Map.get(c.zip.slice(0, 2)))
          if (fallback) { lat = fallback.la; lng = fallback.ln }
        }
        if (lat == null || lng == null) return { c, dist: Number.POSITIVE_INFINITY }
        const dlat = (lat - refLat) * 111
        const dlng = (lng - refLng) * 111 * Math.cos((refLat * Math.PI) / 180)
        return { c, dist: Math.sqrt(dlat * dlat + dlng * dlng) }
      })
      withDist.sort((a, b) => a.dist - b.dist)
      return withDist.slice(0, limit).map((x) => x.c)
    }
  }

  // Default path: top-rated first batch (existing behaviour for SEO pages).
  const firstBatch = companyIds.slice(0, limit)
  const { data, error } = await supabase
    .from('companies')
    .select(`
      *,
      company_cranes (*)
    `)
    .in('id', firstBatch)
    .eq('is_active', true)
    .eq('is_relevant', true)
    .order('google_rating', { ascending: false })

  if (error) throw error
  return data ?? []
}

/** Nearest-firm match record — company plus its distance from the reference PLZ. */
export type FirmMatch = {
  company: CompanyWithCranes
  distance_km: number
}

/**
 * Auto-select up to `limit` nearest active companies offering `craneTypeId`,
 * measured from a 5-digit PLZ. Expands the search radius when the initial 50 km
 * circle has fewer than 3 matches (50 → 100 → unlimited). Used by the cost
 * calculator Sammelanfrage to pre-populate `company_ids` without forcing the
 * user to pick firms from a list — the visitor just wants offers fast.
 *
 * Returns null when the PLZ is not a valid 5-digit code or cannot be geocoded
 * from `german-cities.json`.
 */
type CityRow = { p: string; n: string; s: string; la: number; ln: number }

/** Cache the cities JSON module — it's ~1 MB and loaded once per process.
 *  Named `getCitiesJson` to avoid clashing with the exported `getCities()`
 *  above which returns the Supabase `cities` table rows.
 *
 *  The array is pre-sorted so cities with more PLZ entries come first. That
 *  approximates "bigger city" and stops ambiguous city-name lookups from
 *  resolving to the wrong place — e.g. "Frankfurt" resolves to Frankfurt am
 *  Main (many PLZ) instead of Frankfurt (Oder) (few PLZ). */
let _citiesJsonCache: CityRow[] | null = null
async function getCitiesJson(): Promise<CityRow[]> {
  if (_citiesJsonCache) return _citiesJsonCache
  const raw = (await import('@/data/german-cities.json')).default as CityRow[]
  const nameFreq = new Map<string, number>()
  for (const c of raw) nameFreq.set(c.n, (nameFreq.get(c.n) ?? 0) + 1)
  _citiesJsonCache = [...raw].sort(
    (a, b) => (nameFreq.get(b.n) ?? 0) - (nameFreq.get(a.n) ?? 0),
  )
  return _citiesJsonCache
}

/**
 * Normalise a German place name so "München", "Muenchen" and "Munchen" all
 * collide. Returns two variants so we can try both (ä→ae transliteration
 * covers correct spelling, pure diacritic strip covers sloppy spelling).
 */
function normalizeCityName(s: string): { withAe: string; diacriticStripped: string } {
  const lower = s.toLowerCase().trim().replace(/\s+/g, ' ')
  const withAe = lower
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
  const diacriticStripped = lower
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .replace(/ß/g, 'ss')
  return { withAe, diacriticStripped }
}

/** Core: given reference coordinates, rank active firms offering craneTypeId
 *  by distance and expand radius (50 → 100 → unlimited) until ≥3 matches. */
async function _computeFirmMatchesFromCoords(
  craneTypeId: string,
  refLat: number,
  refLng: number,
  cities: CityRow[],
  limit: number,
): Promise<{ matches: FirmMatch[]; radius_used_km: number }> {
  const minMatches = 3
  const tryRadii: number[] = [50, 100, Number.POSITIVE_INFINITY]

  const { data: craneData } = await supabase
    .from('company_cranes')
    .select('company_id')
    .eq('crane_type_id', craneTypeId)
  if (!craneData || craneData.length === 0) return { matches: [], radius_used_km: 0 }

  const companyIds = [...new Set(craneData.map((c) => c.company_id))]
  const batchSize = 100
  const all: CompanyWithCranes[] = []
  for (let i = 0; i < companyIds.length; i += batchSize) {
    const batch = companyIds.slice(i, i + batchSize)
    const { data } = await supabase
      .from('companies')
      .select(`*, company_cranes (*)`)
      .in('id', batch)
      .eq('is_active', true)
      .eq('is_relevant', true)
    if (data) all.push(...data)
  }

  // PLZ→coords fallback for the ~39 firms without lat/lng.
  const plzMap = new Map<string, { la: number; ln: number }>()
  const plz2Map = new Map<string, { la: number; ln: number }>()
  for (const c of cities) {
    if (!plzMap.has(c.p)) plzMap.set(c.p, { la: c.la, ln: c.ln })
    const p2 = c.p.slice(0, 2)
    if (!plz2Map.has(p2)) plz2Map.set(p2, { la: c.la, ln: c.ln })
  }

  const withDist: FirmMatch[] = all.map((c) => {
    let lat = c.lat
    let lng = c.lng
    if (lat == null || lng == null) {
      const fallback = (c.zip && plzMap.get(c.zip)) || (c.zip && plz2Map.get(c.zip.slice(0, 2)))
      if (fallback) { lat = fallback.la; lng = fallback.ln }
    }
    if (lat == null || lng == null) return { company: c, distance_km: Number.POSITIVE_INFINITY }
    const dlat = (lat - refLat) * 111
    const dlng = (lng - refLng) * 111 * Math.cos((refLat * Math.PI) / 180)
    return { company: c, distance_km: Math.sqrt(dlat * dlat + dlng * dlng) }
  })
  withDist.sort((a, b) => a.distance_km - b.distance_km)

  for (const r of tryRadii) {
    const filtered = withDist.filter(
      (m) => m.distance_km <= r && m.distance_km !== Number.POSITIVE_INFINITY,
    )
    const isLastRadius = r === tryRadii[tryRadii.length - 1]
    if (filtered.length >= minMatches || isLastRadius) {
      const capped = filtered.slice(0, limit)
      // Honest radius: when we fell through to unlimited, report the farthest
      // matched firm's distance (rounded up) instead of "∞".
      const farthest = capped[capped.length - 1]?.distance_km ?? 0
      const radius_used_km = r === Number.POSITIVE_INFINITY ? Math.ceil(farthest) : r
      return { matches: capped, radius_used_km }
    }
  }
  return { matches: [], radius_used_km: 0 }
}

export async function getCompaniesForCraneTypeNearPlz(
  craneTypeId: string,
  plz: string,
  opts?: { limit?: number },
): Promise<{ matches: FirmMatch[]; radius_used_km: number } | null> {
  // PLZ-based search uses german-cities.json (5-digit DE codes only). Until the
  // AT counterpart (austrian-cities.json with 4-digit codes) ships, the function
  // is DE-only — AT users hitting it get null and the UI falls back to the city-list path.
  if (COUNTRY !== 'DE') return null
  if (!/^\d{5}$/.test(plz)) return null
  const cities = await getCitiesJson()
  const plzCity = cities.find((c) => c.p === plz)
  if (!plzCity) return null
  return _computeFirmMatchesFromCoords(craneTypeId, plzCity.la, plzCity.ln, cities, opts?.limit ?? 10)
}

/**
 * Same as getCompaniesForCraneTypeNearPlz but accepts either a 5-digit PLZ
 * OR a German city name (umlaut-tolerant: München / Muenchen / Munchen all
 * match). Added for the Kostenrechner form where construction-site visitors
 * often know the city but not the exact zip code.
 *
 * Returns `resolved_label` so the UI can confirm what we actually matched
 * (e.g. "10115 Berlin" or "Berlin") — avoids showing the raw user input
 * unchanged, which would be misleading when we did fuzzy matching.
 */
export async function getCompaniesForCraneTypeNearLocation(
  craneTypeId: string,
  location: string,
  opts?: { limit?: number },
): Promise<{ matches: FirmMatch[]; radius_used_km: number; resolved_label: string } | null> {
  // Same DE-only gate as getCompaniesForCraneTypeNearPlz — uses german-cities.json
  // for PLZ + city-name lookup. AT counterpart pending.
  if (COUNTRY !== 'DE') return null
  const trimmed = location.trim()
  if (!trimmed) return null

  const cities = await getCitiesJson()
  const limit = opts?.limit ?? 10

  // Path 1: extract a 5-digit PLZ from the start of the input. Handles both
  // pure "31275" and the very common "31275 Lehrte" / "31275 Lehrte/Ahlten"
  // form (a German address habit; the placeholder "z.B. 10115 oder Berlin"
  // doesn't forbid it). When a PLZ prefix matches, the remainder is
  // informational — we trust the PLZ for geocoding.
  const plzPrefix = trimmed.match(/^(\d{5})\b/)
  if (plzPrefix) {
    const plz = plzPrefix[1]
    const plzCity = cities.find((c) => c.p === plz)
    if (!plzCity) return null
    const base = await _computeFirmMatchesFromCoords(craneTypeId, plzCity.la, plzCity.ln, cities, limit)
    return { ...base, resolved_label: `${plz} ${plzCity.n}` }
  }

  // Path 2: city name. Try the input as-is, then fall back to the first
  // segment when the user wrote "Stadt/Ortsteil" or "Stadt, Ortsteil"
  // (e.g. "Lehrte/Ahlten" → "Lehrte"). For each candidate try an exact
  // umlaut-transliterated match, then a diacritic-stripped match, then a
  // startsWith match.
  const head = trimmed.split(/[/,]/)[0].trim()
  const candidates = head && head !== trimmed ? [trimmed, head] : [trimmed]
  let cityMatch: CityRow | undefined
  for (const cand of candidates) {
    const needle = normalizeCityName(cand)
    cityMatch = cities.find((c) => {
      const h = normalizeCityName(c.n)
      return h.withAe === needle.withAe || h.diacriticStripped === needle.diacriticStripped
    })
    if (!cityMatch) {
      cityMatch = cities.find((c) => {
        const h = normalizeCityName(c.n)
        return h.withAe.startsWith(needle.withAe) || h.diacriticStripped.startsWith(needle.diacriticStripped)
      })
    }
    if (cityMatch) break
  }
  if (!cityMatch) return null

  const base = await _computeFirmMatchesFromCoords(craneTypeId, cityMatch.la, cityMatch.ln, cities, limit)
  return { ...base, resolved_label: cityMatch.n }
}

/**
 * Get company count per city for a list of cities.
 * Returns a map of cityId → count.
 */
export async function getCompanyCountsPerCity(
  cityIds: string[]
): Promise<Map<string, number>> {
  if (cityIds.length === 0) return new Map()

  const { data: allRegions } = await supabase
    .from('company_regions')
    .select('company_id, city_id')
    .in('city_id', cityIds)

  const counts = new Map<string, number>()
  if (!allRegions) return counts

  const cityCompanies = new Map<string, Set<string>>()
  for (const r of allRegions) {
    if (!cityCompanies.has(r.city_id)) cityCompanies.set(r.city_id, new Set())
    cityCompanies.get(r.city_id)!.add(r.company_id)
  }
  for (const [cityId, companies] of cityCompanies) {
    counts.set(cityId, companies.size)
  }

  return counts
}

// ============================================
// LEADS
// ============================================

export async function submitLead(formData: {
  crane_type_id: string
  city: string
  customer_name: string
  customer_phone: string
  customer_email: string
  project_description: string
  preferred_date: string | null
  duration_days: number | null
  dsgvo_consent: boolean
  company_ids: string[]
  // First page of the visitor session (sanitised in /api/leads). NULL when the
  // browser has sessionStorage disabled or when the lead was placed before
  // SessionEntryRecorder was deployed.
  entry_path?: string | null
}) {
  const { company_ids, ...leadData } = formData
  const sb = getServiceSupabase()

  // Insert lead — stamp country from build-time env so the same DB serves both
  // kranvergleich.de (country='DE') and kranvergleich.at (country='AT'); admin
  // dashboards and AT-routing logic split the pipeline by this column.
  const { data: lead, error: leadError } = await sb
    .from('leads')
    .insert({ ...leadData, country: COUNTRY })
    .select('id')
    .single()

  if (leadError) throw leadError

  // Insert lead_companies
  if (company_ids.length > 0 && lead) {
    const { error: lcError } = await sb
      .from('lead_companies')
      .insert(
        company_ids.map(companyId => ({
          lead_id: lead.id,
          company_id: companyId,
        }))
      )

    if (lcError) throw lcError
  }

  return lead
}
