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

  const { data } = await supabase
    .from('company_regions')
    .select('company_id, cities!inner(country, is_active)')
    .eq('cities.country', COUNTRY)
    .eq('cities.is_active', true)

  const ids = new Set<string>((data ?? []).map((r: { company_id: string }) => r.company_id))
  _companyIdsCache = { ids, expires: now + COMPANY_IDS_TTL_MS }
  return ids
}
