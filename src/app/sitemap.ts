import type { MetadataRoute } from 'next'
import { getCraneTypes, getCities } from '@/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kranvergleich.de'

  const [craneTypes, cities] = await Promise.all([
    getCraneTypes(),
    getCities(),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
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

  // Programmatic SEO pages: crane-type × city
  const cityPages: MetadataRoute.Sitemap = craneTypes.flatMap((ct) =>
    cities.map((city) => ({
      url: `${baseUrl}/${ct.slug}/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  )

  return [...staticPages, ...craneTypePages, ...cityPages]
}
