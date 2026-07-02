import { supabase, getServiceSupabase } from './supabase'
import { COUNTRY, PLZ_REGEX, PLZ_PREFIX_REGEX, PLZ_DIGITS, getCompanyIdsInCountry } from './country'
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
 * Used by the Product JSON-LD on /[crane-type] and /[crane-type]/[city] 
 * Google Search Console flagged "missing aggregateRating" on those pages.
 * We aggregate from real Google Maps ratings of the firms offering this
 * crane type (data is authentic, BGH allows aggregated reviews when source
 * is genuine, though we don't surface attribution in the UI, the schema
 * is a machine-readable hint for SERP star snippets, not a user claim).
 *
 * Returns null when fewer than 3 firms have a rating, too small a sample
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
  // floor-to-100, callers must not render a star rating without a real count
  // behind it. Previously this defaulted to a hard-coded 4.2 which leaked as a
  // placeholder ("★ 4,2 (0)") whenever data hadn't been enriched yet.
  avgRating: number | null
  totalReviews: number
}> {
  // Country scoping: companies are filtered through company_regions -> cities.country
  // (handles cross-country firms like Boels. Sitz DE, branches in AT). Cities count
  // uses cities.country directly. Empty country (no AT data yet) short-circuits the
  // company queries to avoid generating an invalid empty `IN ()` against PostgREST.
  const inCountryIds = await getCompanyIdsInCountry()
  const noCompanies = inCountryIds.size === 0

  // After the 2026-05-06 upstream pagination fix, inCountryIds grew from
  // a truncated 536 to the real ~800, large enough that .in('id', list)
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

  // Floor reviews to the nearest 100, round numbers read as curated, not
  // precise-but-stale. Pair the rating to the floored count: if the floor
  // wipes the count to 0, drop the rating too so the trust bar can't show
  // "★ 4,2 (0)", the two fields are surfaced together or not at all.
  const flooredReviews = Math.floor(totalReviews / 100) * 100

  return {
    // firmCount is now a JS-side intersection (always a number, never null),
    // so the old `?? 700` fallback only matters when the entire country has
    // zero firms, which would be a launch-state condition, not normal ops.
    // The 2026-05-06 pagination saga left this number stuck at the fallback
    // because .in('id', 800-uuid-list) pushed the request URL past PostgREST's
    // limit and silently nulled out the count.
    anbieterCount: roundDown10(firmCount > 0 ? firmCount : 700),
    staedteCount: roundDown10(cityCount ?? 40),
    avgRating: flooredReviews > 0 ? avgRating : null,
    totalReviews: flooredReviews,
  }
}

// Live DACH-wide catalog counts for the founder page (/ueber-uns), so the prose
// numbers never drift from the database (the "713/660 stale-number" problem,
// 2026-06-23). Counts active+relevant firms across DE AND AT, because the
// founder page speaks of "Deutschland und Österreich", unlike getSiteStats
// which is COUNTRY-scoped for the per-domain homepage. "Ohne E-Mail" mirrors the
// lead-routing email filter (null or '???' = no deliverable address). Paginated
// because the companies table is past the PostgREST 1000-row truncation risk.
export async function getFounderStats(): Promise<{ totalCount: number; ohneEmailCount: number }> {
  const rows = await selectAllPaginated<{ email: string | null }>(() =>
    supabase.from('companies').select('email').eq('is_active', true).eq('is_relevant', true),
  )
  const ohneEmailCount = rows.filter((r) => {
    const e = (r.email ?? '').trim()
    return e === '' || e === '???'
  }).length
  return { totalCount: rows.length, ohneEmailCount }
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
  // country filter is defensive, slugs are globally unique, but a DE-side admin
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
// --- City-page geo-relevance guards (2026-06-09) --------------------------
// A firm belongs on a city page only if its HQ is within service reach for the
// longest-haul crane type it offers. Mirrors the company_regions data cleanup
// and future-proofs against re-added out-of-range rows. Stable crane_type ids.
export const SHORT_HAUL_TYPE_IDS = new Set([
  '1a7019bd-7fd3-401a-8713-7f6be6fbd827', // Minikran
  'ef7ed422-402e-4553-9c01-661df28c66fc', // Anhängerkran
  '99e6ce74-f707-494e-afc8-31627b3bf41d', // Dachdeckerkran
])
const MID_HAUL_TYPE_IDS = new Set([
  'ab511eea-d464-47b9-8ada-16931dab5078', // Autokran
  'a556dcad-e379-4ac3-8d72-6eed094900d1', // Ladekran
])
const RADIUS_SHORT_KM = 100
const RADIUS_MID_KM = 200
const RADIUS_HEAVY_KM = 350

function firmServiceRadiusKm(cranes: { crane_type_id: string }[] | null | undefined): number {
  const ids = (cranes ?? []).map((c) => c.crane_type_id)
  // Untagged: lenient (heavy) — mirrors prod "demote only on positive evidence".
  if (ids.length === 0) return RADIUS_HEAVY_KM
  if (ids.some((id) => !SHORT_HAUL_TYPE_IDS.has(id) && !MID_HAUL_TYPE_IDS.has(id))) return RADIUS_HEAVY_KM
  if (ids.some((id) => MID_HAUL_TYPE_IDS.has(id))) return RADIUS_MID_KM
  return RADIUS_SHORT_KM
}

// Crane types on which the `national_heavy` flag lifts the distance guard:
// nationwide-MOBILE heavy lifts only. Mobilkran + Raupenkran travel across DE for
// a job. Baukran/MK is assembled on site and stays regional even for a big
// operator (it is "heavy" for the radius guard, but NOT a bundesweit reach type),
// so it is intentionally excluded — light/local types never qualify either.
export const NATIONAL_HEAVY_REACH_TYPE_IDS = new Set([
  '02dc05de-6699-4849-93fb-2b655177bfd9', // Mobilkran
  '0b61b867-53a6-4cf9-afbb-50c610dc4a2a', // Raupenkran
])

// Equirectangular km (same idiom as _computeFirmMatchesFromCoords).
function equirectKm(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const dlat = (aLat - bLat) * 111
  const dlng = (aLng - bLng) * 111 * Math.cos((bLat * Math.PI) / 180)
  return Math.sqrt(dlat * dlat + dlng * dlng)
}

// Collapse a multi-branch holding to one entry: a city searcher doesn't need 11
// Schmidbauer branches, just the nearest. Branch markers strip to a common base;
// firms with no marker group only with exact-name duplicates.
function holdingKey(name: string): string {
  const m = name
    .toLowerCase()
    .match(/^(.*?)\s*(?:[–-]\s*)?(?:niederlassung|standort|filiale|zweigstelle|ndl\.?|nl\.?)\b/)
  return (m ? m[1] : name.toLowerCase()).trim().replace(/[\s,.–-]+$/, '')
}

export async function getCompaniesForCraneAndCity(
  craneTypeId: string,
  cityId: string
): Promise<{ matching: CompanyWithCranes[]; others: CompanyWithCranes[] }> {
  // Get ALL company IDs that serve this city
  const { data: regionData } = await supabase
    .from('company_regions')
    .select('company_id')
    .eq('city_id', cityId)

  if (!regionData || regionData.length === 0) return { matching: [], others: [] }

  const companyIds = [...new Set(regionData.map(r => r.company_id))]

  // Fetch in batches of 50 to stay under PostgREST URL-length limits. Earlier
  // this took only the FIRST 50 ids (companyIds.slice(0, 50)), which silently
  // dropped firms in any city served by >50 companies, including, potentially,
  // the actual crane-type specialists. Now every batch is fetched + merged.
  const BATCH = 50
  const all: CompanyWithCranes[] = []
  for (let i = 0; i < companyIds.length; i += BATCH) {
    const { data, error } = await supabase
      .from('companies')
      .select(`*, company_cranes (*)`)
      .in('id', companyIds.slice(i, i + BATCH))
      .eq('is_active', true)
      .eq('is_relevant', true)
    if (error) throw error
    if (data) all.push(...(data as CompanyWithCranes[]))
  }

  // national_heavy inject: on a HEAVY-type page a verified nationwide heavy-lift
  // operator belongs here even without a company_regions row for this city, so we
  // fetch flagged firms directly and merge them in (dedup by id). Gated on the
  // PAGE's crane type (NATIONAL_HEAVY_REACH_TYPE_IDS), never the firm alone — others
  // are never pulled onto far pages. Only inject a flagged firm that actually
  // offers this crane type, so it lands in `matching` (selectable), mirroring the
  // sitemap counter (getCitiesWithMinCompanies) which counts the same predicate —
  // no company_regions rows needed, listing and sitemap agree by construction.
  const pageGetsNationalReach = NATIONAL_HEAVY_REACH_TYPE_IDS.has(craneTypeId)
  if (pageGetsNationalReach) {
    const seen = new Set(all.map((c) => c.id))
    const { data: nh } = await supabase
      .from('companies')
      .select(`*, company_cranes (*)`)
      .eq('is_active', true)
      .eq('is_relevant', true)
      .eq('national_heavy', true)
    for (const c of (nh ?? []) as CompanyWithCranes[]) {
      if (seen.has(c.id)) continue
      if ((c.company_cranes ?? []).some((cc) => cc.crane_type_id === craneTypeId)) all.push(c)
    }
  }

  // Geo-relevance guard: drop firms whose HQ is beyond their service radius for
  // this city, and collapse multi-branch holdings to the single nearest branch.
  const { data: cityRow } = await supabase.from('cities').select('lat, lng').eq('id', cityId).single()
  let geoed = all
  if (cityRow && cityRow.lat != null && cityRow.lng != null) {
    const cLat = cityRow.lat as number
    const cLng = cityRow.lng as number
    const distOf = (c: CompanyWithCranes) =>
      c.lat == null || c.lng == null ? Number.POSITIVE_INFINITY : equirectKm(c.lat, c.lng, cLat, cLng)
    // Radius guard — firms without coords are kept (don't punish unknowns).
    // national_heavy bypass: an injected flagged firm clears the distance guard on
    // a national-reach heavy page (mirrors the inject + the sitemap counter).
    const within = all.filter(
      (c) =>
        c.lat == null ||
        c.lng == null ||
        (pageGetsNationalReach && c.national_heavy) ||
        distOf(c) <= firmServiceRadiusKm(c.company_cranes),
    )
    // Holding dedup — keep the branch nearest to the city per holding.
    const bestPerHolding = new Map<string, CompanyWithCranes>()
    for (const c of within) {
      const k = holdingKey(c.name)
      const cur = bestPerHolding.get(k)
      if (!cur || distOf(c) < distOf(cur)) bestPerHolding.set(k, c)
    }
    geoed = [...bestPerHolding.values()]
  }

  // Order: premium first, then by Google rating (nulls last).
  geoed.sort((a, b) => {
    if (!!b.is_premium !== !!a.is_premium) return b.is_premium ? 1 : -1
    return (b.google_rating ?? -1) - (a.google_rating ?? -1)
  })

  // Split into selectable (`matching`) vs read-only regional context (`others`):
  // a firm is `others` only when it carries crane-type tags AND none is this
  // type (e.g. Boels, Minikran-only, on an Anhängerkran page). Untagged firms
  // stay selectable — we demote only on positive evidence of a different speciality.
  const matching = geoed.filter((c) => {
    const tags = c.company_cranes ?? []
    return tags.length === 0 || tags.some((cc) => cc.crane_type_id === craneTypeId)
  })
  const others = geoed.filter((c) => {
    const tags = c.company_cranes ?? []
    return tags.length > 0 && !tags.some((cc) => cc.crane_type_id === craneTypeId)
  })
  return { matching, others }
}

/**
 * Get cities that have >= minCompanies for a given crane type.
 * Used for generateStaticParams, only generate pages for cities with enough data.
 */
export async function getCitiesWithMinCompanies(
  craneTypeId: string,
  minCompanies: number = 3
): Promise<City[]> {
  // Count only active+relevant companies, matches page-level noindex threshold,
  // so sitemap (which uses this) does not advertise URLs that will be noindexed.
  // When craneTypeId is non-empty, only firms that actually offer that crane
  // type are counted toward the threshold. Without this filter the sitemap
  // listed e.g. /minikran-mieten/wien (0 AT Minikran firms) which then served
  // a noindex tag. Google sees that as "Excluded by noindex" and erodes
  // trust in the sitemap. The arg used to be `_craneTypeId` (TODO leftover).
  const [allRegions, activeRes] = await Promise.all([
    // company_regions has 2554 rows as of 2026-05-06, must paginate.
    selectAllPaginated<{ company_id: string; city_id: string }>(() =>
      supabase.from('company_regions').select('company_id, city_id'),
    ),
    supabase
      .from('companies')
      .select('id, name, national_heavy')
      .eq('is_active', true)
      .eq('is_relevant', true),
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

  const rows = (activeRes.data ?? []) as { id: string; name: string; national_heavy: boolean }[]

  // Count distinct holdings, not branches, so the sitemap min-3 threshold tracks
  // the holding-deduped city listing (getCompaniesForCraneAndCity).
  const holdingById = new Map<string, string>()
  for (const c of rows) {
    holdingById.set(c.id, holdingKey(c.name))
  }

  const cityCounts = new Map<string, Set<string>>()
  for (const r of allRegions) {
    if (!activeIds.has(r.company_id)) continue
    if (typeFilter && !typeFilter.has(r.company_id)) continue
    if (!cityCounts.has(r.city_id)) cityCounts.set(r.city_id, new Set())
    cityCounts.get(r.city_id)!.add(holdingById.get(r.company_id) ?? r.company_id)
  }

  // national_heavy inject (mirror of getCompaniesForCraneAndCity): on a HEAVY-type
  // page a flagged firm that offers this type counts toward EVERY city that already
  // has any matching membership — exactly the cities where the listing injects it.
  // Set-add is idempotent, so a flagged firm already counted via a real region row
  // isn't double-counted. No flagged firm / non-reach page → loop is a no-op.
  const pageGetsNationalReach = NATIONAL_HEAVY_REACH_TYPE_IDS.has(craneTypeId)
  if (pageGetsNationalReach && typeFilter) {
    const nhHoldings = rows
      .filter((c) => c.national_heavy && typeFilter!.has(c.id))
      .map((c) => holdingById.get(c.id) ?? c.id)
    if (nhHoldings.length) {
      for (const set of cityCounts.values()) for (const h of nhHoldings) set.add(h)
    }
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
 * the homepage SearchBox with a PLZ, nearest firms are the relevant ones.
 */
/** Distinct active-company count per crane_type, keyed by crane_type_id.
 * Used to fill the "Anbieter" column in the home-page crane-type table.
 * One batch query, cheaper than N calls to getCompaniesForCraneType just
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
  // is_relevant, those flags live on the companies row, not company_regions.
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
  // then return the 50 nearest. Only triggers when nearPlz is a valid PLZ for
  // the current country (DE: 5 digits, AT: 4 digits) that resolves to a city
  // in the country-specific PLZ dataset.
  if (nearPlz && PLZ_REGEX.test(nearPlz)) {
    const citiesJson = await getCitiesJson()
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
      // Build PLZcoords map for fallback when company has no lat/lng (~39 firms).
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

/**
 * Get all active+relevant companies that offer the given crane brand
 * (matches against companies.brands_offered TEXT[] via array containment).
 * Used by /marke/<brand> brand listing pages. Brand name must match the
 * canonical spelling stored in the array, see src/data/brands.ts.
 */
export async function getCompaniesByBrand(brand: string): Promise<CompanyWithCranes[]> {
  const { data, error } = await supabase
    .from('companies')
    .select(`*, company_cranes (*)`)
    .contains('brands_offered', [brand])
    .eq('is_active', true)
    .eq('is_relevant', true)
    .order('is_premium', { ascending: false })
    .order('google_rating', { ascending: false })
    .limit(100)

  if (error) throw error
  return data ?? []
}

/** Nearest-firm match record, company plus its distance from the reference PLZ. */
export type FirmMatch = {
  company: CompanyWithCranes
  distance_km: number
}

/**
 * Auto-select up to `limit` nearest active companies offering `craneTypeId`,
 * measured from a 5-digit PLZ. Expands the search radius when the initial 50 km
 * circle has fewer than 3 matches (50  100  unlimited). Used by the cost
 * calculator Sammelanfrage to pre-populate `company_ids` without forcing the
 * user to pick firms from a list, the visitor just wants offers fast.
 *
 * Returns null when the PLZ is not a valid 5-digit code or cannot be geocoded
 * from `german-cities.json`.
 */
type CityRow = { p: string; n: string; s: string; la: number; ln: number }

/** Cache the cities JSON module, it's ~1 MB and loaded once per process.
 *  Named `getCitiesJson` to avoid clashing with the exported `getCities()`
 *  above which returns the Supabase `cities` table rows.
 *
 *  The array is pre-sorted so cities with more PLZ entries come first. That
 *  approximates "bigger city" and stops ambiguous city-name lookups from
 *  resolving to the wrong place, e.g. "Frankfurt" resolves to Frankfurt am
 *  Main (many PLZ) instead of Frankfurt (Oder) (few PLZ). */
let _citiesJsonCache: CityRow[] | null = null
export async function getCitiesJson(): Promise<CityRow[]> {
  if (_citiesJsonCache) return _citiesJsonCache
  // Build-time COUNTRY decides which dataset; the other file is never bundled
  // because Next.js tree-shakes the unreached branch.
  const raw = COUNTRY === 'AT'
    ? ((await import('@/data/austrian-cities.json')).default as CityRow[])
    : ((await import('@/data/german-cities.json')).default as CityRow[])
  const nameFreq = new Map<string, number>()
  for (const c of raw) nameFreq.set(c.n, (nameFreq.get(c.n) ?? 0) + 1)
  _citiesJsonCache = [...raw].sort(
    (a, b) => (nameFreq.get(b.n) ?? 0) - (nameFreq.get(a.n) ?? 0),
  )
  return _citiesJsonCache
}

/**
 * Normalise a German place name so "München", "Muenchen" and "Munchen" all
 * collide. Returns two variants so we can try both (äae transliteration
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

// Freemail / ISP mailbox hosts (DE + AT). Two unrelated SMEs both contacting
// the portal from an @gmx.de address are NOT the same operator, so domain-dedup
// (below) must skip these and fall back to exact-email dedup. Only a firm's OWN
// domain (bkl.de, felbermayr.cc) is a reliable "same operator" signal.
const FREEMAIL_DOMAINS = new Set<string>([
  // DE freemail
  'gmx.de', 'gmx.net', 'gmx.com', 'web.de', 't-online.de', 'freenet.de',
  'mail.de', 'posteo.de', 'gmail.com', 'googlemail.com',
  'yahoo.de', 'yahoo.com', 'outlook.de', 'outlook.com', 'hotmail.de',
  'hotmail.com', 'live.de', 'live.com', 'aol.com', 'aol.de',
  'icloud.com', 'me.com', 'mac.com',
  // AT freemail / ISP
  'gmx.at', 'a1.net', 'aon.at', 'chello.at', 'kabsi.at', 'utanet.at',
  'inode.at', 'liwest.at', 'drei.at', 'magenta.at', 'tele2.at', 'yahoo.at',
  'outlook.at', 'hotmail.at', 'live.at',
])

/** Core: given reference coordinates, rank active firms offering craneTypeId
 *  by distance and expand radius (50  100  150 km hard cap) until ≥3 matches.
 *  Beyond 150 km we return 0 matches so /api/leads fires the 🚨 LEAD OHNE
 *  ANBIETER owner alert, better than silent-forwarding a Berlin lead to a
 *  firm in Aachen. The pre-2026-05-20 logic fell through to unlimited and
 *  could route to firms 300-600 km away (a Schwerlast-Raupenkran on the far
 *  end of the country); the cap forces manual review for those rare cases. */
async function _computeFirmMatchesFromCoords(
  craneTypeId: string,
  refLat: number,
  refLng: number,
  cities: CityRow[],
  limit: number,
): Promise<{ matches: FirmMatch[]; radius_used_km: number }> {
  const minMatches = 3
  // Search radius is type-aware: short-haul equipment (Minikran, Anhängerkran,
  // Dachdeckerkran) is local — nobody hauls a Minikran 150 km, so a tighter cap
  // stops a Graz Minikran job being routed to firms in Linz/Wels (lead
  // b71b1420, 2026-06-21). Mid/heavy types (mobile/crawler cranes that travel
  // for a job) keep the wider tiers unchanged.
  const tryRadii: number[] = SHORT_HAUL_TYPE_IDS.has(craneTypeId)
    ? [40, 80, 120]
    : [50, 100, 150]

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
    // Lead-routing query: drop email-less firms so Kostenrechner auto-select
    // never picks one (Resend has no delivery target, owner-alert noise, no
    // customer value). Catalog/SEO queries (city listings, sitemap, schema
    // offerCount) keep showing them, frontend CTA on CompanyCard already
    // swaps "Angebot anfragen" for the phone CTA. Faza 2 cold-letter pipeline
    // re-activates a firm by populating `email`, no flag needed.
    const { data } = await supabase
      .from('companies')
      .select(`*, company_cranes (*)`)
      .in('id', batch)
      .eq('is_active', true)
      .eq('is_relevant', true)
      .not('email', 'is', null)
      .neq('email', '???')
    if (data) all.push(...data)
  }

  // PLZcoords fallback for the ~39 firms without lat/lng.
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

  // Collapse multi-branch operators down to their NEAREST branch before radius
  // selection. Two levels:
  //   (1) Identical inbox — branches sharing one mailbox (e.g. Felbermayr's 8 AT
  //       branches all on office@felbermayr.cc) would consume several dispatch
  //       slots and hit one inbox with the same lead (lead b71b1420 went to 5
  //       Felbermayr branches).
  //   (2) Same own-domain — branches with PER-BRANCH mailboxes on one corporate
  //       domain (BKL: nuernberg@bkl.de + info@bkl.de) are one operator; the
  //       customer should see the brand once. Freemail/ISP hosts are excluded
  //       (see FREEMAIL_DOMAINS) so two unrelated @gmx.de firms are NOT merged.
  // The list is already distance-sorted, so the first kept per key is the
  // nearest branch. Firms without an email are kept (filtered upstream anyway)
  // so a missing email never silently drops a firm.
  const seenEmails = new Set<string>()
  const seenDomains = new Set<string>()
  const deduped = withDist.filter((m) => {
    const email = (m.company.email ?? '').trim().toLowerCase()
    if (!email) return true
    if (seenEmails.has(email)) return false
    const at = email.lastIndexOf('@')
    const domain = at >= 0 ? email.slice(at + 1) : ''
    if (domain && !FREEMAIL_DOMAINS.has(domain)) {
      if (seenDomains.has(domain)) return false
      seenDomains.add(domain)
    }
    seenEmails.add(email)
    return true
  })

  for (const r of tryRadii) {
    const filtered = deduped.filter(
      (m) => m.distance_km <= r && m.distance_km !== Number.POSITIVE_INFINITY,
    )
    const isLastRadius = r === tryRadii[tryRadii.length - 1]
    if (filtered.length >= minMatches || isLastRadius) {
      const capped = filtered.slice(0, limit)
      return { matches: capped, radius_used_km: r }
    }
  }
  return { matches: [], radius_used_km: 0 }
}

export async function getCompaniesForCraneTypeNearPlz(
  craneTypeId: string,
  plz: string,
  opts?: { limit?: number },
): Promise<{ matches: FirmMatch[]; radius_used_km: number } | null> {
  // PLZ-based search uses the country-specific PLZ dataset (DE: 5 digits in
  // german-cities.json, AT: 4 digits in austrian-cities.json). PLZ_REGEX is
  // resolved at build time per COUNTRY.
  if (!PLZ_REGEX.test(plz)) return null
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
 * (e.g. "10115 Berlin" or "Berlin"), avoids showing the raw user input
 * unchanged, which would be misleading when we did fuzzy matching.
 */
export async function getCompaniesForCraneTypeNearLocation(
  craneTypeId: string,
  location: string,
  opts?: { limit?: number },
): Promise<{ matches: FirmMatch[]; radius_used_km: number; resolved_label: string } | null> {
  // Country-aware: loads the right PLZ dataset (DE 5-digit / AT 4-digit) via
  // getCitiesJson() + uses PLZ_PREFIX_REGEX to extract the leading PLZ. The
  // city-name fallback works identically across both countries.
  const trimmed = location.trim()
  if (!trimmed) return null

  const cities = await getCitiesJson()
  const limit = opts?.limit ?? 10

  // Path 1: extract a leading PLZ from the start of the input. Handles both
  // pure "31275" / "1010" and the very common "31275 Lehrte" / "1010 Wien"
  // form. When a PLZ prefix matches, the remainder is informational, we trust
  // the PLZ for geocoding.
  const plzPrefix = trimmed.match(PLZ_PREFIX_REGEX)
  if (plzPrefix) {
    const plz = plzPrefix[1]
    const plzCity = cities.find((c) => c.p === plz)
    if (!plzCity) return null
    const base = await _computeFirmMatchesFromCoords(craneTypeId, plzCity.la, plzCity.ln, cities, limit)
    return { ...base, resolved_label: `${plz} ${plzCity.n}` }
  }

  // Path 2: city name. Try the input as-is, then fall back to the first
  // segment when the user wrote "Stadt/Ortsteil" or "Stadt, Ortsteil"
  // (e.g. "Lehrte/Ahlten"  "Lehrte"). For each candidate try an exact
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
 * True when the input contains a syntactically valid PLZ token (DE 5-digit /
 * AT 4-digit) but NONE of those tokens resolves to a city in our country
 * dataset. This is the signature of a foreign postal code (e.g. French
 * "57600" Forbach, ~7 km from Saarbrücken) or a typo. The /api/leads
 * auto-select flow uses it to return a "check your PLZ / we only serve DE+AT"
 * message instead of silently saving a 0-firm "LEAD OHNE ANBIETER".
 *
 * Deliberately scoped to PLZ-format tokens only: a pure city-name input with
 * no digits returns false (the city-name fallback path handles those, and a
 * mistyped city is far more likely to be a real reachable place than a foreign
 * 5-digit code). Returns false on any input without a PLZ-shaped token so the
 * existing genuine-coverage-gap behavior (save + manual owner alert) is kept.
 */
export async function isUnresolvedPlz(location: string): Promise<boolean> {
  const trimmed = (location ?? '').trim()
  if (!trimmed) return false
  const tokens = trimmed.match(new RegExp(`\\b\\d{${PLZ_DIGITS}}\\b`, 'g'))
  if (!tokens || tokens.length === 0) return false
  const cities = await getCitiesJson()
  const plzSet = new Set(cities.map((c) => c.p))
  return !tokens.some((t) => plzSet.has(t))
}

/**
 * Get company count per city for a list of cities.
 * Returns a map of cityId  count.
 */
export async function getCompanyCountsPerCity(
  cityIds: string[]
): Promise<Map<string, number>> {
  if (cityIds.length === 0) return new Map()

  // company_regions has >2700 rows; an unpaginated .in('city_id', …) over a
  // large city list would silently truncate at PostgREST's 1000-row cap and
  // undercount cities. Paginate. (Today's callers pass ≤15 cities, but this
  // keeps the function correct if a larger list is ever passed.)
  const allRegions = await selectAllPaginated<{ company_id: string; city_id: string }>(
    () => supabase.from('company_regions').select('company_id, city_id').in('city_id', cityIds),
  )

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
  // NULL on email-less callback leads (Rückruf anfordern, mig 038).
  customer_email: string | null
  project_description: string
  preferred_date: string | null
  duration_days: number | null
  dsgvo_consent: boolean
  company_ids: string[]
  // First page of the visitor session (sanitised in /api/leads). NULL when the
  // browser has sessionStorage disabled or when the lead was placed before
  // SessionEntryRecorder was deployed.
  entry_path?: string | null
  // First-touch UTM (mig 027). NULL when the visitor entered without UTM
  // params or before the capture component was deployed.
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  utm_content?: string | null
  // Auto-select radius (km) used to find the matched firms (mig 031). NULL
  // when auto-select did not run (per-firm InquiryBar flow, NULL crane_type
  // pre-fix, or non-DE country). Expected post-2026-05-20: one of {50,100,150}.
  radius_used_km?: number | null
}) {
  const { company_ids, ...leadData } = formData
  const sb = getServiceSupabase()

  // Insert lead, stamp country from build-time env so the same DB serves both
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
