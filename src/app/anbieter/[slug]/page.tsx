import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getCompanyBySlug } from '@/lib/queries'
import { getCraneTypeNameById } from '@/data/crane-types'

export const revalidate = 86400

const INITIALS_COLORS = [
  'bg-blue-50 text-blue-700',
  'bg-green-50 text-green-700',
  'bg-purple-50 text-purple-700',
  'bg-amber-50 text-amber-700',
  'bg-rose-50 text-rose-700',
  'bg-cyan-50 text-cyan-700',
]

function getInitials(name: string): string {
  return name
    .split(/[\s\-&]+/)
    .filter((w) => w.length > 0 && w[0] === w[0].toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase() || name.slice(0, 2).toUpperCase()
}

function getColorClass(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0
  }
  return INITIALS_COLORS[Math.abs(hash) % INITIALS_COLORS.length]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const company = await getCompanyBySlug(slug)
  if (!company) return {}

  const title = `${company.name} — Kranvermietung ${company.city}`
  const description = `${company.name} in ${company.city}: Kranvermietung mit ${company.google_rating ? `${company.google_rating} Sternen` : 'Top-Bewertungen'}. Angebot anfragen auf KranVergleich.de.`
  const canonical = `/anbieter/${slug}`

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
    },
  }
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const company = await getCompanyBySlug(slug)
  if (!company) notFound()

  const initials = getInitials(company.name)
  const colorClass = getColorClass(company.name)

  const craneTypeNames = company.company_cranes
    .map((c) => getCraneTypeNameById(c.crane_type_id))
    .filter((name, i, arr) => arr.indexOf(name) === i)

  const description = `${company.name} ist ein Kranvermieter in ${company.city}, ${company.state}. ${
    craneTypeNames.length > 0
      ? `Das Unternehmen bietet ${craneTypeNames.join(', ')} zur Miete an und`
      : 'Das Unternehmen'
  } bedient ${company.city} und Umgebung.`

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">{company.name}</span>
      </nav>

      {/* Company Header */}
      <div className="mb-8">
        <div className="flex items-start gap-4">
          {/* Large initials */}
          <div
            className={`w-14 h-14 rounded-lg flex items-center justify-center text-lg font-semibold shrink-0 ${colorClass}`}
          >
            {initials}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h1 className="text-2xl font-semibold text-gray-900">{company.name}</h1>
              {company.is_verified && (
                <span className="text-[11px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded">
                  Verifiziert
                </span>
              )}
              {company.is_premium && (
                <span className="text-[11px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
                  Premium
                </span>
              )}
            </div>
            <p className="text-[14px] text-gray-500">
              {company.address && `${company.address}, `}
              {company.zip && `${company.zip} `}
              {company.city}, {company.state}
            </p>

            {/* Rating */}
            {company.google_rating != null && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-base ${star <= Math.round(company.google_rating!) ? 'text-amber-500' : 'text-gray-300'}`}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-900">{company.google_rating.toFixed(1)}</span>
                <span className="text-[13px] text-gray-400">
                  ({company.google_reviews_count} {company.google_reviews_count === 1 ? 'Google-Bewertung' : 'Google-Bewertungen'})
                </span>
              </div>
            )}

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-2 mt-4">
              {company.phone && (
                <a
                  href={`tel:${company.phone}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-medium rounded-md transition-colors"
                >
                  Anrufen: {company.phone}
                </a>
              )}
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-gray-200 hover:border-gray-300 text-[13px] text-gray-700 rounded-md transition-colors"
                >
                  Website besuchen
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* About */}
        <section className="border border-gray-200 rounded-lg p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">Über das Unternehmen</h2>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            {company.description || description}
          </p>
        </section>

        {/* Crane Fleet */}
        {craneTypeNames.length > 0 && (
          <section className="border border-gray-200 rounded-lg p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Kranflotte</h2>
            <div className="flex flex-wrap gap-2">
              {craneTypeNames.map((typeName) => (
                <span
                  key={typeName}
                  className="text-[13px] bg-gray-100 text-gray-700 px-3 py-1 rounded"
                >
                  {typeName}
                </span>
              ))}
            </div>
            {company.company_cranes.some((c) => c.has_operator || c.has_glass_sucker || c.electric) && (
              <div className="flex flex-wrap gap-2 mt-3">
                {company.company_cranes.some((c) => c.has_operator) && (
                  <span className="text-[12px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded">Mit Kranführer</span>
                )}
                {company.company_cranes.some((c) => c.has_glass_sucker) && (
                  <span className="text-[12px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded">Glassauger</span>
                )}
                {company.company_cranes.some((c) => c.electric) && (
                  <span className="text-[12px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded">Elektro</span>
                )}
              </div>
            )}
          </section>
        )}

        {/* Contact */}
        <section className="border border-gray-200 rounded-lg p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Kontakt</h2>
          <dl className="space-y-2 text-[14px]">
            {company.phone && (
              <div className="flex gap-3">
                <dt className="text-gray-400 w-16 shrink-0">Telefon</dt>
                <dd>
                  <a href={`tel:${company.phone}`} className="text-blue-600 hover:underline">
                    {company.phone}
                  </a>
                </dd>
              </div>
            )}
            {company.email && (
              <div className="flex gap-3">
                <dt className="text-gray-400 w-16 shrink-0">E-Mail</dt>
                <dd>
                  <a href={`mailto:${company.email}`} className="text-blue-600 hover:underline">
                    {company.email}
                  </a>
                </dd>
              </div>
            )}
            {company.website && (
              <div className="flex gap-3">
                <dt className="text-gray-400 w-16 shrink-0">Website</dt>
                <dd>
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {company.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </a>
                </dd>
              </div>
            )}
            {!company.phone && !company.website && (
              <p className="text-gray-400 text-[13px]">Nur per Anfrage erreichbar</p>
            )}
          </dl>
        </section>

        {/* Report entry */}
        <p className="text-[12px] text-gray-300 mt-4">
          Daten falsch oder veraltet?{' '}
          <a
            href={`mailto:impressum@kranvergleich.de?subject=Eintrag%20melden:%20${encodeURIComponent(company.name)}&body=Firma:%20${encodeURIComponent(company.name)}%0AStadt:%20${encodeURIComponent(company.city)}%0A%0ABitte%20beschreiben%20Sie%20das%20Problem:`}
            className="text-gray-400 hover:text-gray-600 underline"
          >
            Diesen Eintrag melden
          </a>
        </p>
      </div>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: company.name,
            description: company.description || description,
            address: {
              '@type': 'PostalAddress',
              streetAddress: company.address,
              addressLocality: company.city,
              addressRegion: company.state,
              postalCode: company.zip,
              addressCountry: 'DE',
            },
            telephone: company.phone,
            email: company.email,
            url: company.website,
            ...(company.google_rating && {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: company.google_rating,
                reviewCount: company.google_reviews_count,
              },
            }),
          }),
        }}
      />
    </div>
  )
}
