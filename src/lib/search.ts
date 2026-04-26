import { seoCities } from '@/data/cities-static'
import { COUNTRY } from '@/lib/country'

const COUNTRY_WIDE = COUNTRY === 'AT' ? 'österreichweit' : 'deutschlandweit'

interface CityHit {
  name: string
  plz: string
}

export interface SearchTarget {
  url: string
  hint?: string
}

/** Resolve the target URL for a crane-type + city/PLZ query. Shared by
 * SearchBox (home hero) and CompactSearch (header) so both behave identically —
 * the most important case being that a 5-digit PLZ produces a distance-sorted
 * nationwide listing via ?plz=<code>. Returns null when craneType is empty. */
export function resolveSearchTarget(args: {
  craneType: string
  cityQuery: string
  selectedCity: CityHit | null
}): SearchTarget | null {
  const { craneType, cityQuery, selectedCity } = args
  if (!craneType) return null

  const typed = cityQuery.trim()

  if (/^\d{5}$/.test(typed)) {
    return { url: `/${craneType}?plz=${typed}` }
  }

  if (selectedCity) {
    const seoCity = seoCities.find(
      (c) => c.name.toLowerCase() === selectedCity.name.toLowerCase()
    )
    if (seoCity) return { url: `/${craneType}/${seoCity.slug}` }
    return { url: `/${craneType}?plz=${selectedCity.plz}` }
  }

  if (typed) {
    const seoCity = seoCities.find((c) => c.name.toLowerCase() === typed.toLowerCase())
    if (seoCity) return { url: `/${craneType}/${seoCity.slug}` }
    return {
      url: `/${craneType}`,
      hint: `Für "${cityQuery}" haben wir noch keine Anbieter. Zeige alle Anbieter ${COUNTRY_WIDE}.`,
    }
  }

  return { url: `/${craneType}` }
}
