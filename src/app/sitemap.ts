import type { MetadataRoute } from 'next'
import { getCraneTypes, getCitiesWithMinCompanies } from '@/lib/queries'
import type { City } from '@/lib/types'
import { COUNTRY } from '@/lib/country'
import { BRANDS } from '@/data/brands'

// Regenerate at most daily, prevents per-request rebuilds from churning
// lastmod on the dynamic URLs below.
export const revalidate = 86400

// Real content-change dates per path. Bump these when page content changes
// meaningfully. NOT automatically on every deploy. A fresh `new Date()` for
// every URL on every build is a fake signal that Google learns to ignore,
// which deprioritises the whole sitemap.
const TYPE_CONTENT_DATES: Record<string, string> = {
  'autokran-mieten': '2026-04-19', // +3 sections: Tragkraft, Marken, Alternativen
  'mobilkran-mieten': '2026-04-19', // +3 sections: Tragkraft, Marken, Alternativen
  'baukran-mieten': '2026-04-20', // +3 sections: Tragkraftklassen, Marken, Alternativen
  'dachdeckerkran-mieten': '2026-04-20', // +3 sections: Tragkraftklassen, Marken, Alternativen
  'minikran-mieten': '2026-05-15', // +Tragkraftklassen section
  'raupenkran-mieten': '2026-05-15', // +Tragkraftklassen section
  'anhaengerkran-mieten': '2026-05-15', // +Tragkraftklassen section
  'ladekran-mieten': '2026-05-15', // +Tragkraftklassen section
}
const DATE_CITY_REFRESH = '2026-04-18' // seoCities expansion + normalize_service_regions
const DATE_HOME = '2026-04-19'          // tile layout + icon redesign
const DATE_KRANVERLEIH = '2026-04-18'   // seoCities expansion
const DATE_KOSTENRECHNER = '2026-03-12'
const DATE_PRICES = '2026-05-15' // +hero CTA above fold + TOC collapsible on mobile
const DATE_NAEHE = '2026-05-21' // initial publish, geo-intent landing for "kran mieten in der nähe"
const DATE_GLASSAUGER = '2026-06-02' // initial publish, commercial landing for "minikran mit glassauger mieten"
const DATE_PREISREPORT = '2026-06-10' // initial publish, citable data report (link magnet)
const DATE_RATGEBER = '2026-03-01'
const DATE_LEGAL = '2026-01-01'

const toDate = (s: string) => new Date(s)
const maxIsoDate = (a: string, b: string) => (a > b ? a : b)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Country-aware origin so kranvergleich.at builds emit AT URLs while sharing
  // the same code path. getCitiesWithMinCompanies (below) is also country-scoped
  // via queries.ts, so AT sitemap won't list DE city pages.
  const baseUrl = COUNTRY === 'AT' ? 'https://kranvergleich.at' : 'https://kranvergleich.de'

  // NOTE: /anbieter/* (674 firm profiles) intentionally excluded from the sitemap.
  // Sampled pages were ~250 words each, thin by Google's quality standards.
  // On a new domain those 674 URLs dragged the site-wide quality signal and
  // blocked crawl of the 400 healthy pages, showing up as "Gefunden – zurzeit
  // nicht indexiert" in GSC. Re-add after each profile has 500+ words of
  // unique content. Pages are still reachable via the company-section widgets.
  const craneTypes = await getCraneTypes()

  // Per-type indexable cities. Was a single any-type call with min=3, which
  // listed every (type × city) URL whenever the city had ≥3 firms total 
  // even when zero of those firms offered the requested crane type. The
  // page itself then served `noindex` (page.tsx checks companies.length<3),
  // so Google logged the URL as "Excluded by 'noindex' tag" and lost trust
  // in the sitemap. Now each type only lists cities where THAT type has
  // ≥3 firms, matching the page-level threshold exactly.
  const indexableCitiesPerType = new Map<string, City[]>(
    await Promise.all(
      craneTypes.map(
        async (ct) => [ct.id, await getCitiesWithMinCompanies(ct.id, 3)] as const,
      ),
    ),
  )

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: toDate(DATE_HOME), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/kranverleih`, lastModified: toDate(DATE_KRANVERLEIH), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/kran-mieten-preise`, lastModified: toDate(DATE_PRICES), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/kran-mieten-in-der-naehe`, lastModified: toDate(DATE_NAEHE), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/minikran-mit-glassauger-mieten`, lastModified: toDate(DATE_GLASSAUGER), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/kran-preisreport-2026`, lastModified: toDate(DATE_PREISREPORT), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/kostenrechner`, lastModified: toDate(DATE_KOSTENRECHNER), changeFrequency: 'monthly', priority: 0.8 },
    // E-E-A-T entity page (Organization.founder target, Person schema). Was
    // missing from the sitemap entirely (2026-06-12 audit).
    { url: `${baseUrl}/ueber-uns`, lastModified: toDate('2026-05-11'), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/impressum`, lastModified: toDate(DATE_LEGAL), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/datenschutz`, lastModified: toDate(DATE_LEGAL), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const ratgeberArticles: Array<{ slug: string; priority: number; date?: string }> = [
    { slug: 'was-kostet-ein-kran', priority: 0.8 },
    { slug: 'welchen-kran-brauche-ich', priority: 0.7, date: '2026-05-08' },
    { slug: 'kran-mieten-privatperson', priority: 0.7 },
    { slug: 'kran-mieten-ohne-fuehrerschein', priority: 0.7 },
    { slug: 'kran-mieten-tipps', priority: 0.7 },
    { slug: 'kran-mieten-hausbau', priority: 0.8 },
    { slug: 'solaranlage-kran-mieten', priority: 0.8 },
    { slug: 'bootskran-mieten', priority: 0.8, date: '2026-05-06' },
    { slug: 'pool-kran-mieten', priority: 0.8, date: '2026-05-06' },
    { slug: 'whirlpool-kran-mieten', priority: 0.7, date: '2026-05-06' },
    { slug: 'kran-aufstellen-genehmigung', priority: 0.7, date: '2026-05-08' },
    { slug: 'kranarbeiten-kosten', priority: 0.8, date: '2026-06-12' },
    { slug: 'kranpreise-praxis', priority: 0.7, date: '2026-06-22' },
    { slug: 'krantypen', priority: 0.8 },
  ]
  const ratgeberPages: MetadataRoute.Sitemap = ratgeberArticles.map((a) => ({
    url: `${baseUrl}/ratgeber/${a.slug}`,
    lastModified: toDate(a.date ?? DATE_RATGEBER),
    changeFrequency: 'monthly' as const,
    priority: a.priority,
  }))

  // Crane-type landing pages, each gets its own content-change date.
  const craneTypePages: MetadataRoute.Sitemap = craneTypes.map((ct) => ({
    url: `${baseUrl}/${ct.slug}`,
    lastModified: toDate(TYPE_CONTENT_DATES[ct.slug] ?? DATE_CITY_REFRESH),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Programmatic city×type pages. Per-type content date wins over the shared
  // city-data refresh, this spreads the city×type URLs (465 as of 2026-06)
  // across ~8 distinct dates instead of one mass-refresh signal.
  const cityPages: MetadataRoute.Sitemap = craneTypes.flatMap((ct) => {
    const typeDate = TYPE_CONTENT_DATES[ct.slug] ?? DATE_CITY_REFRESH
    const effectiveDate = maxIsoDate(typeDate, DATE_CITY_REFRESH)
    const cities = indexableCitiesPerType.get(ct.id) ?? []
    return cities.map((city) => ({
      url: `${baseUrl}/${ct.slug}/${city.slug}`,
      lastModified: toDate(effectiveDate),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  })

  // Brand pages, /marke/<brand>. Only DE catalog has the brand data
  // populated (LLM extraction ran on DE description_enriched), so don't
  // emit AT brand URLs that would be empty.
  const DATE_BRAND_PAGES = '2026-05-20'  // first ship
  const brandPages: MetadataRoute.Sitemap = COUNTRY === 'DE'
    ? [
        {
          url: `${baseUrl}/marke`,
          lastModified: toDate(DATE_BRAND_PAGES),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        },
        ...BRANDS.map((b) => ({
          url: `${baseUrl}/marke/${b.slug}`,
          lastModified: toDate(DATE_BRAND_PAGES),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        })),
      ]
    : []

  return [...staticPages, ...ratgeberPages, ...craneTypePages, ...cityPages, ...brandPages]
}
