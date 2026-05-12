import { supabase } from './supabase'

export type Country = 'DE' | 'AT'

// Build-time env decides which country this deployment serves. Both kranvergleich.de
// (NEXT_PUBLIC_COUNTRY=DE or unset) and kranvergleich.at (NEXT_PUBLIC_COUNTRY=AT) build
// from the same repo; this constant gates the queries that select catalog data and the
// inserts that stamp leads/events with their origin country.
export const COUNTRY: Country = (process.env.NEXT_PUBLIC_COUNTRY === 'AT' ? 'AT' : 'DE')

// Country-resolved presentation strings. Centralised so layout, sitemap, robots,
// /api/leads emails, hreflang helpers etc. stay consistent. The `SISTER_*` pair
// holds the OTHER country's values — useful for hreflang alternate URLs.
export const BASE_URL: string = COUNTRY === 'AT' ? 'https://kranvergleich.at' : 'https://kranvergleich.de'
export const SISTER_BASE_URL: string = COUNTRY === 'AT' ? 'https://kranvergleich.de' : 'https://kranvergleich.at'
export const DOMAIN: string = COUNTRY === 'AT' ? 'kranvergleich.at' : 'kranvergleich.de'
export const BRAND_NAME: string = COUNTRY === 'AT' ? 'KranVergleich.at' : 'KranVergleich.de'
export const COUNTRY_LABEL: string = COUNTRY === 'AT' ? 'Österreich' : 'Deutschland'
export const OG_LOCALE: string = COUNTRY === 'AT' ? 'de_AT' : 'de_DE'
// VAT abbreviation: AT uses Umsatzsteuer (USt.) officially; DE uses Mehrwertsteuer (MwSt.) colloquially.
// AT VAT rate is 20%, DE is 19% — currently we don't print the rate, only the label;
// expand to include the rate if/when price-listing copy needs it.
export const TAX_LABEL: string = COUNTRY === 'AT' ? 'USt.' : 'MwSt.'

// Catalog verification date — bumps only on real verification (firm-count change,
// price audit, content rewrite, catalog cleanup migration). Consumed by Product
// and Service JSON-LD as dateModified to signal freshness to Google. Visible
// "Stand:" labels on pages use build-time current month, not this constant.
export const DATA_LAST_VERIFIED_ISO: string = '2026-05-06'

let _companyIdsCache: { ids: Set<string>; expires: number } | null = null
const COMPANY_IDS_TTL_MS = 60_000

/**
 * Set of company IDs reachable in the current COUNTRY through at least one
 * company_regions row pointing to a city with cities.country = COUNTRY.
 *
 * Used to filter catalog-wide company queries (e.g. /autokran-mieten landing,
 * site-stats firm count) so kranvergleich.at lists only firms that actually
 * serve AT cities — including cross-country firms (Boels, BKL) whose Sitz is
 * DE but who maintain AT branches via company_regions to AT cities. We do
 * NOT filter on companies.country directly because that would drop those
 * cross-country firms from the AT site (their Sitz row is companies.country=DE).
 *
 * Cached in-process for 60s — adding/removing a region is rare relative to
 * page-render frequency, and a one-minute lag is acceptable for SEO catalog
 * pages. Cache is per-worker; Next.js spawns multiple, each populates lazily.
 */
export async function getCompanyIdsInCountry(): Promise<Set<string>> {
  const now = Date.now()
  if (_companyIdsCache && _companyIdsCache.expires > now) return _companyIdsCache.ids

  // company_regions has 2554 rows as of 2026-05-06; the default 1000-row PostgREST
  // cap silently truncated this query — the bug masqueraded as a count-side
  // problem (home page Autokran 246 instead of 403) but the actual upstream
  // truncation lives here: ids was incomplete, so every downstream caller that
  // filters by inCountryIds dropped firms whose region rows were past the cap.
  // Paginates the bare company_regions table (no JOIN — JOIN range semantics in
  // PostgREST appear to misbehave for this case) then filters country in JS via
  // the cities table.
  const cityIdsByCountry = await (async () => {
    const { data: cityRows } = await supabase
      .from('cities')
      .select('id')
      .eq('country', COUNTRY)
      .eq('is_active', true)
    return new Set<string>((cityRows ?? []).map((c) => c.id))
  })()

  const allRegions: Array<{ company_id: string; city_id: string }> = []
  const PAGE = 1000
  for (let offset = 0; offset < 100_000; offset += PAGE) {
    const { data: page, error } = await supabase
      .from('company_regions')
      .select('company_id, city_id')
      .range(offset, offset + PAGE - 1)
    if (error) {
      console.error('getCompanyIdsInCountry pagination error:', error)
      break
    }
    if (!page || page.length === 0) break
    allRegions.push(...page)
    if (page.length < PAGE) break
  }
  console.log(`[getCompanyIdsInCountry] paginated ${allRegions.length} company_regions rows for country ${COUNTRY}`)

  const ids = new Set<string>()
  for (const r of allRegions) {
    if (cityIdsByCountry.has(r.city_id)) ids.add(r.company_id)
  }
  _companyIdsCache = { ids, expires: now + COMPANY_IDS_TTL_MS }
  return ids
}
