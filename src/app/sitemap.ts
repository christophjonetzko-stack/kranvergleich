import type { MetadataRoute } from 'next'
import { getCraneTypes, getCitiesWithMinCompanies } from '@/lib/queries'

// Regenerate at most daily — prevents per-request rebuilds from churning
// lastmod on the dynamic URLs below.
export const revalidate = 86400

// Real content-change dates per path. Bump these when page content changes
// meaningfully — NOT automatically on every deploy. A fresh `new Date()` for
// every URL on every build is a fake signal that Google learns to ignore,
// which deprioritises the whole sitemap.
const TYPE_CONTENT_DATES: Record<string, string> = {
  'autokran-mieten': '2026-04-19', // +3 sections: Tragkraft, Marken, Alternativen
  'mobilkran-mieten': '2026-04-19', // +3 sections: Tragkraft, Marken, Alternativen
  'baukran-mieten': '2026-03-15',
  'dachdeckerkran-mieten': '2026-03-15',
  'minikran-mieten': '2026-03-15',
  'raupenkran-mieten': '2026-03-15',
  'anhaengerkran-mieten': '2026-03-15',
  'ladekran-mieten': '2026-03-15',
}
const DATE_CITY_REFRESH = '2026-04-18' // seoCities expansion + normalize_service_regions
const DATE_HOME = '2026-04-19'          // tile layout + icon redesign
const DATE_KRANVERLEIH = '2026-04-18'   // seoCities expansion
const DATE_KOSTENRECHNER = '2026-03-12'
const DATE_PRICES = '2026-03-20'
const DATE_RATGEBER = '2026-03-01'
const DATE_LEGAL = '2026-01-01'

const toDate = (s: string) => new Date(s)
const maxIsoDate = (a: string, b: string) => (a > b ? a : b)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kranvergleich.de'

  // NOTE: /anbieter/* (674 firm profiles) intentionally excluded from the sitemap.
  // Sampled pages were ~250 words each — thin by Google's quality standards.
  // On a new domain those 674 URLs dragged the site-wide quality signal and
  // blocked crawl of the 400 healthy pages, showing up as "Gefunden – zurzeit
  // nicht indexiert" in GSC. Re-add after each profile has 500+ words of
  // unique content. Pages are still reachable via the company-section widgets.
  const [craneTypes, indexableCities] = await Promise.all([
    getCraneTypes(),
    getCitiesWithMinCompanies('', 3),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: toDate(DATE_HOME), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/kranverleih`, lastModified: toDate(DATE_KRANVERLEIH), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/kran-mieten-preise`, lastModified: toDate(DATE_PRICES), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/kostenrechner`, lastModified: toDate(DATE_KOSTENRECHNER), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/impressum`, lastModified: toDate(DATE_LEGAL), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/datenschutz`, lastModified: toDate(DATE_LEGAL), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const ratgeberArticles: Array<{ slug: string; priority: number }> = [
    { slug: 'was-kostet-ein-kran', priority: 0.8 },
    { slug: 'welchen-kran-brauche-ich', priority: 0.7 },
    { slug: 'minikran-vs-autokran', priority: 0.7 },
    { slug: 'kran-mieten-privatperson', priority: 0.7 },
    { slug: 'kran-mieten-ohne-fuehrerschein', priority: 0.7 },
    { slug: 'kran-mieten-tipps', priority: 0.7 },
    { slug: 'kran-mieten-hausbau', priority: 0.8 },
    { slug: 'solaranlage-kran-mieten', priority: 0.8 },
    { slug: 'kran-aufstellen-genehmigung', priority: 0.7 },
    { slug: 'krantypen', priority: 0.8 },
  ]
  const ratgeberPages: MetadataRoute.Sitemap = ratgeberArticles.map((a) => ({
    url: `${baseUrl}/ratgeber/${a.slug}`,
    lastModified: toDate(DATE_RATGEBER),
    changeFrequency: 'monthly' as const,
    priority: a.priority,
  }))

  // Crane-type landing pages — each gets its own content-change date.
  const craneTypePages: MetadataRoute.Sitemap = craneTypes.map((ct) => ({
    url: `${baseUrl}/${ct.slug}`,
    lastModified: toDate(TYPE_CONTENT_DATES[ct.slug] ?? DATE_CITY_REFRESH),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Programmatic city×type pages. Per-type content date wins over the shared
  // city-data refresh — this spreads the 376 URLs across ~8 distinct dates
  // instead of one mass-refresh signal.
  const cityPages: MetadataRoute.Sitemap = craneTypes.flatMap((ct) => {
    const typeDate = TYPE_CONTENT_DATES[ct.slug] ?? DATE_CITY_REFRESH
    const effectiveDate = maxIsoDate(typeDate, DATE_CITY_REFRESH)
    return indexableCities.map((city) => ({
      url: `${baseUrl}/${ct.slug}/${city.slug}`,
      lastModified: toDate(effectiveDate),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  })

  return [...staticPages, ...ratgeberPages, ...craneTypePages, ...cityPages]
}
