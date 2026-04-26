// hreflang helper for pages that exist on BOTH kranvergleich.de and kranvergleich.at.
//
// Use `alternatesFor(path)` in a page's metadata when the same URL path serves the
// equivalent content on both deployments — typical for static pages (home, impressum,
// datenschutz, ratgeber/*, kran-mieten-preise, kostenrechner) and crane-type landing
// pages (/[crane-type] without a city).
//
// DO NOT use it on /[crane-type]/[city] dynamic city pages — those have no
// equivalent across countries (Berlin has no AT counterpart, Wien has no DE one),
// and a cross-country alternate would mislead Google into clustering unrelated pages.
//
// `x-default` follows the kranvergleich.de fallback per Google's recommendation
// for the largest-audience locale.

const ROOT_DE = 'https://kranvergleich.de'
const ROOT_AT = 'https://kranvergleich.at'

export type AlternatesShape = {
  canonical: string
  languages: Record<string, string>
}

export function alternatesFor(path: string): AlternatesShape {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return {
    canonical: normalized,
    languages: {
      'de-DE': `${ROOT_DE}${normalized}`,
      'de-AT': `${ROOT_AT}${normalized}`,
      'x-default': `${ROOT_DE}${normalized}`,
    },
  }
}
