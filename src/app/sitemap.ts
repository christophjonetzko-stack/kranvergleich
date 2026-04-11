import type { MetadataRoute } from 'next'
import { getCraneTypes, getCities } from '@/lib/queries'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kranvergleich.de'

  const [craneTypes, cities, companiesResult] = await Promise.all([
    getCraneTypes(),
    getCities(),
    supabase
      .from('companies')
      .select('slug')
      .eq('is_active', true)
      .eq('is_relevant', true),
  ])

  const companies = companiesResult.data ?? []

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/kranverleih`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    { url: `${baseUrl}/ratgeber/was-kostet-ein-kran`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/ratgeber/welchen-kran-brauche-ich`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/ratgeber/minikran-vs-autokran`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/ratgeber/kran-mieten-privatperson`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/ratgeber/kran-mieten-ohne-fuehrerschein`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/ratgeber/kran-mieten-tipps`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/ratgeber/kran-mieten-hausbau`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/ratgeber/kran-aufstellen-genehmigung`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/ratgeber/krantypen`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    {
      url: `${baseUrl}/kostenrechner`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kran-mieten-preise`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  // Crane type landing pages
  const craneTypePages: MetadataRoute.Sitemap = craneTypes.map((ct) => ({
    url: `${baseUrl}/${ct.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Programmatic SEO pages: crane-type x city
  const cityPages: MetadataRoute.Sitemap = craneTypes.flatMap((ct) =>
    cities.map((city) => ({
      url: `${baseUrl}/${ct.slug}/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  )

  // Company pages
  const companyPages: MetadataRoute.Sitemap = companies.map((c) => ({
    url: `${baseUrl}/anbieter/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...staticPages, ...craneTypePages, ...cityPages, ...companyPages]
}
