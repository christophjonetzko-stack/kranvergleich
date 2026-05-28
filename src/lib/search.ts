import { seoCities } from '@/data/cities-static'
import { COUNTRY, PLZ_REGEX } from '@/lib/country'

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
 * SearchBox (home hero) and CompactSearch (header) so both behave identically 
 * the most important case being that a 5-digit PLZ produces a distance-sorted
 * nationwide listing via ?plz=<code>.
 *
 * Empty craneType means "Egal welcher Typ", falls through to /kranverleih
 * overview (lists all crane types). Added 2026-04-27 because the disabled
 * "Suchen" button blocked users who didn't know which type they needed
 * (project-intent leads, see Mario Wagner's Stahlhalle inquiry).
 *
 * Optional projectDescription is forwarded as a `?project=` query param so the
 * downstream page's lead form (InquiryBar / LeadForm) can prefill its
 * Projektbeschreibung textarea, captures intent at search time so it doesn't
 * get lost when the user clicks through to the listing.
 */
export function resolveSearchTarget(args: {
  craneType: string
  cityQuery: string
  selectedCity: CityHit | null
  projectDescription?: string
}): SearchTarget | null {
  const { craneType, cityQuery, selectedCity, projectDescription } = args
  const typed = cityQuery.trim()
  const project = (projectDescription ?? '').trim()

  // Build a base URL based on craneType + city/PLZ, then tack on ?project=.
  const base = resolveBaseUrl(craneType, typed, selectedCity)
  if (!base) return null

  if (!project) return base
  const sep = base.url.includes('?') ? '&' : '?'
  return { ...base, url: `${base.url}${sep}project=${encodeURIComponent(project)}` }
}

function resolveBaseUrl(
  craneType: string,
  typed: string,
  selectedCity: CityHit | null,
): SearchTarget | null {
  // "Egal welcher Typ" path, fall through to the all-types overview. PLZ /
  // city filtering aren't applied yet (would need /kranverleih to handle
  // searchParams); for now the user lands on the overview and clicks through.
  if (!craneType) {
    return { url: '/kranverleih' }
  }

  if (PLZ_REGEX.test(typed)) {
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
      hint: `Für "${typed}" haben wir noch keine Anbieter. Zeige alle Anbieter ${COUNTRY_WIDE}.`,
    }
  }

  return { url: `/${craneType}` }
}
