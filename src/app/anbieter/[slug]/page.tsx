import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getCompanyBySlug, getOtherCompaniesInCity, getCraneTypes } from '@/lib/queries'
import { getCraneTypeNameById } from '@/data/crane-types'
import { getCraneIconByName } from '@/components/crane-icons'
import { CompanyMapWrapper } from '@/components/company-map-wrapper'
import { LeadForm } from '@/components/lead-form'

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

  const [otherCompanies, allCraneTypes] = await Promise.all([
    getOtherCompaniesInCity(company.city, slug),
    getCraneTypes(),
  ])

  const initials = getInitials(company.name)
  const colorClass = getColorClass(company.name)

  const craneTypeNames = company.company_cranes
    .map((c) => getCraneTypeNameById(c.crane_type_id))
    .filter((name, i, arr) => arr.indexOf(name) === i)

  // Reference prices for crane types in this company's fleet (fallback when no own prices)
  const craneTypeIds = company.company_cranes.map((c) => c.crane_type_id)
  const fleetCraneTypes = allCraneTypes.filter((ct) => craneTypeIds.includes(ct.id))

  // DSGVO: only show generic business emails, not personal ones (jan.kowalski@firma.de = personal data)
  const genericPrefixes = ['info', 'kontakt', 'contact', 'office', 'mail', 'post', 'anfrage', 'service', 'vermietung', 'kran', 'buero', 'zentrale']
  const displayEmail = company.email && genericPrefixes.some((p) => company.email!.toLowerCase().startsWith(p + '@'))
    ? company.email
    : null

  // Form is usable only when the company has a real email (delivery target for Resend).
  // `???` is a legacy placeholder used during manual enrichment to mark "skipped" —
  // treat it the same as NULL so we never submit a form that can't be delivered.
  const canInquire = !!company.email && company.email.trim() !== '???'

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
                  Anzeige
                </span>
              )}
            </div>
            <p className="text-[14px] text-gray-500">
              {company.address
                ? `${company.address}, ${company.state}`
                : `${company.zip ? `${company.zip} ` : ''}${company.city}, ${company.state}`}
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

            {/* CTA buttons — primary: Angebot anfragen (revenue) OR Anrufen (no-email firms),
                secondary: Website, tertiary: Anrufen (when form is primary) */}
            <div className="flex flex-wrap gap-2 mt-4">
              {canInquire ? (
                <a
                  href="#anfrage"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-medium rounded-md transition-colors"
                >
                  Angebot anfragen
                </a>
              ) : company.phone ? (
                <a
                  href={`tel:${company.phone}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-medium rounded-md transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
                  Rufen Sie an: {company.phone}
                </a>
              ) : null}
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
              {canInquire && company.phone && (
                <a
                  href={`tel:${company.phone}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-100 hover:border-gray-200 text-[13px] text-gray-600 rounded-md transition-colors"
                >
                  Anrufen: {company.phone}
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
            <div className="flex flex-wrap gap-3">
              {craneTypeNames.map((typeName) => {
                const Icon = getCraneIconByName(typeName)
                return (
                  <div
                    key={typeName}
                    className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
                  >
                    <Icon className="w-8 h-8 shrink-0" />
                    <span className="text-[13px] font-medium text-gray-700">{typeName}</span>
                  </div>
                )
              })}
            </div>
            {company.company_cranes.some((c) => c.has_glass_sucker || c.electric) && (
              <div className="flex flex-wrap gap-2 mt-3">
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

        {/* Pricing — own prices or reference prices from crane types */}
        {company.price_day_from ? (
          <section className="border border-gray-200 rounded-lg p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Preise</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {company.price_day_from && (
                <div className="bg-gray-50 rounded-md p-3">
                  <p className="text-[11px] text-gray-400 mb-0.5">Tagespreis</p>
                  <p className="text-[15px] font-medium text-gray-900">
                    {company.price_day_from.toLocaleString('de-DE')}€
                    {company.price_day_to && company.price_day_to !== company.price_day_from && (
                      <> – {company.price_day_to.toLocaleString('de-DE')}€</>
                    )}
                  </p>
                </div>
              )}
              {company.price_week_from && (
                <div className="bg-gray-50 rounded-md p-3">
                  <p className="text-[11px] text-gray-400 mb-0.5">Wochenpreis</p>
                  <p className="text-[15px] font-medium text-gray-900">
                    {company.price_week_from.toLocaleString('de-DE')}€
                    {company.price_week_to && company.price_week_to !== company.price_week_from && (
                      <> – {company.price_week_to.toLocaleString('de-DE')}€</>
                    )}
                  </p>
                </div>
              )}
              {company.price_month_from && (
                <div className="bg-gray-50 rounded-md p-3">
                  <p className="text-[11px] text-gray-400 mb-0.5">Monatspreis</p>
                  <p className="text-[15px] font-medium text-gray-900">
                    {company.price_month_from.toLocaleString('de-DE')}€
                    {company.price_month_to && company.price_month_to !== company.price_month_from && (
                      <> – {company.price_month_to.toLocaleString('de-DE')}€</>
                    )}
                  </p>
                </div>
              )}
            </div>
            {company.price_note && (
              <p className="text-[12px] text-gray-500 mt-2">{company.price_note}</p>
            )}
            <p className="text-[11px] text-gray-400 mt-1">Alle Preise Richtwerte, netto. Verbindliches Angebot auf Anfrage.</p>
          </section>
        ) : fleetCraneTypes.length > 0 && (
          <section className="border border-gray-200 rounded-lg p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Orientierungspreise</h2>
            <p className="text-[13px] text-gray-500 mb-3">
              Geschätzte Tagespreise für die Krantypen dieser Firma — basierend auf dem Marktdurchschnitt 2026:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {fleetCraneTypes.map((ct) => (
                <div key={ct.id} className="flex items-center justify-between bg-amber-50 border border-amber-100 rounded-md px-3 py-2">
                  <span className="text-[13px] font-medium text-gray-900">{ct.name}</span>
                  <span className="text-[13px] text-amber-700 font-medium">
                    {ct.price_day_from?.toLocaleString('de-DE')}€ – {ct.price_day_to?.toLocaleString('de-DE')}€/Tag
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-amber-600 mt-2">
              ⓘ Richtwerte (netto) — keine Preise des Anbieters. Verbindliche Preise direkt beim Anbieter anfragen.
            </p>
          </section>
        )}

        {/* Contact */}
        <section className="border border-gray-200 rounded-lg p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Kontakt</h2>
          <div className="flex flex-col gap-2">
            {canInquire ? (
              <a
                href="#anfrage"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-medium rounded-md transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                Angebot anfragen
              </a>
            ) : company.phone ? (
              <a
                href={`tel:${company.phone}`}
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-medium rounded-md transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
                Rufen Sie an: {company.phone}
              </a>
            ) : null}
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-gray-200 hover:border-gray-300 text-[13px] text-gray-700 font-medium rounded-md transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" /></svg>
                Website besuchen
              </a>
            )}
            {!canInquire && !company.phone && (
              <p className="text-[13px] text-gray-500">
                Keine Kontaktdaten verfügbar. Bitte besuchen Sie die Website des Anbieters.
              </p>
            )}
          </div>
        </section>

        {/* Service badges */}
        {(() => {
          const badges: { icon: string; label: string; color: string }[] = []
          // Crane types that can be self-operated after instruction (Einweisung)
          const selfOperatedTypes = new Set(['Minikran', 'Dachdeckerkran', 'Anhängerkran'])

          const hasSelfOperated = craneTypeNames.some((name) => selfOperatedTypes.has(name))

          if (hasSelfOperated) {
            badges.push({ icon: 'self', label: 'Selbstbedienung nach Einweisung möglich', color: 'bg-gray-50 text-gray-600 border-gray-200' })
          }
          if (company.company_cranes.some((c) => c.has_glass_sucker)) {
            badges.push({ icon: 'glass', label: 'Glassauger verfügbar', color: 'bg-blue-50 text-blue-700 border-blue-200' })
          }
          if (company.company_cranes.some((c) => c.electric)) {
            badges.push({ icon: 'electric', label: 'Elektrokran verfügbar', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' })
          }
          if (company.service_radius_km) {
            badges.push({ icon: 'radius', label: `Einsatzradius: ${company.service_radius_km} km`, color: 'bg-purple-50 text-purple-700 border-purple-200' })
          }
          if (!badges.length) return null
          return (
            <section className="border border-gray-200 rounded-lg p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">Auf einen Blick</h2>
              <div className="flex flex-wrap gap-2">
                {badges.map((b) => (
                  <span key={b.label} className={`inline-flex items-center gap-1.5 text-[12px] font-medium border rounded-full px-3 py-1.5 ${b.color}`}>
                    {b.icon === 'self' && (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" /></svg>
                    )}
                    {b.icon === 'glass' && (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859" /></svg>
                    )}
                    {b.icon === 'electric' && (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>
                    )}
                    {b.icon === 'radius' && (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                    )}
                    {b.label}
                  </span>
                ))}
              </div>
            </section>
          )
        })()}

        {/* Opening hours */}
        {company.opening_hours && (
          <section className="border border-gray-200 rounded-lg p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Öffnungszeiten</h2>
            <div className="space-y-1">
              {company.opening_hours.split(/\s*\|\s*/).map((line, i) => (
                <p key={i} className="text-[14px] text-gray-700">{line.trim()}</p>
              ))}
            </div>
          </section>
        )}

        {/* Service area */}
        {(company.service_regions?.length || company.service_radius_km) && (
          <section className="border border-gray-200 rounded-lg p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Einsatzgebiet</h2>
            {company.service_radius_km && (
              <p className="text-[14px] text-gray-500 mb-2">
                Lieferung im Umkreis von {company.service_radius_km} km
              </p>
            )}
            {company.service_regions && company.service_regions.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {company.service_regions.map((region) => (
                  <span
                    key={region}
                    className="text-[12px] bg-gray-100 text-gray-700 rounded-full px-3 py-1"
                  >
                    {region}
                  </span>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Location map */}
        {company.lat != null && company.lng != null && (
          <section className="border border-gray-200 rounded-lg p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Standort</h2>
            <CompanyMapWrapper
              companies={[{
                name: company.name,
                slug: company.slug,
                lat: company.lat,
                lng: company.lng,
                city: company.city,
                google_rating: company.google_rating,
              }]}
              centerLat={company.lat}
              centerLng={company.lng}
            />
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${company.lat},${company.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-3 text-[13px] text-blue-600 hover:underline"
            >
              Route planen &rarr;
            </a>
          </section>
        )}

        {/* Inquiry form — only rendered when the firm has an email (Resend delivery target).
            Firms without email: the header CTA already points to tel: instead, so no fallback here. */}
        {canInquire && (
          <section id="anfrage" className="scroll-mt-20">
            <LeadForm
              cityName={company.city}
              companies={[company]}
              selectedCompanyIds={[company.id]}
            />
          </section>
        )}

        {/* Opt-out / data correction — DSGVO Art. 17 */}
        <div className="border border-gray-100 rounded-lg p-4 mt-4">
          <p className="text-[13px] text-gray-500">
            Sind Ihre Daten nicht korrekt oder möchten Sie Ihren Eintrag ändern oder entfernen?
            Kontaktieren Sie uns:{' '}
            <a
              href={`mailto:datenschutz@kranvergleich.de?subject=${encodeURIComponent(`Eintrag ändern/entfernen: ${company.name}`)}&body=${encodeURIComponent(`Firma: ${company.name}\nStadt: ${company.city}\n\nIch möchte:\n☐ Daten korrigieren\n☐ Eintrag vollständig entfernen\n\nBeschreibung:`)}`}
              className="text-blue-600 hover:underline"
            >
              datenschutz@kranvergleich.de
            </a>
          </p>
          <p className="text-[11px] text-gray-400 mt-1">
            Wir bearbeiten Ihre Anfrage innerhalb von 7 Werktagen.
          </p>
        </div>
      </div>

      {/* Other companies in same city */}
      {otherCompanies.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">
            Andere Anbieter in {company.city}
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherCompanies.map((other) => (
              <Link
                key={other.slug}
                href={`/anbieter/${other.slug}`}
                className="inline-flex items-center gap-1.5 text-[13px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1.5 transition-colors"
              >
                {other.name}
                {other.google_rating != null && (
                  <span className="text-[11px] text-gray-400">
                    &#9733; {other.google_rating.toFixed(1)}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

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
            ...(displayEmail && { email: displayEmail }),
            ...(company.website && { url: company.website }),
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
