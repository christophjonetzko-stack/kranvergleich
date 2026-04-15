import Link from 'next/link'
import type { CompanyWithCranes } from '@/lib/types'
import { getCraneTypeNameById } from '@/data/crane-types'

interface CompanyCardProps {
  company: CompanyWithCranes
  onRequestQuote?: (companyId: string) => void
  /** Fallback reference price label when company has no own price, e.g. "ab 250€/Tag — Richtwert" */
  referencePrice?: string | null
  /** Distance in km from user's PLZ (if provided) */
  distanceKm?: number
}

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

export function CompanyCard({ company, onRequestQuote, referencePrice, distanceKm }: CompanyCardProps) {
  const initials = getInitials(company.name)
  const colorClass = getColorClass(company.name)

  const craneTypeNames = company.company_cranes
    .map((c) => getCraneTypeNameById(c.crane_type_id))
    .filter((name, i, arr) => arr.indexOf(name) === i)

  // Firms without an email cannot receive Resend deliveries — fall back to phone CTA
  // so the user doesn't submit a form that goes nowhere. `???` is a manual-enrichment
  // placeholder meaning "skipped, no email found" — treat it as if NULL.
  const canInquire = !!company.email && company.email.trim() !== '???'

  return (
    <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
      {/* Initials avatar */}
      <div
        className={`w-11 h-11 rounded-lg flex items-center justify-center text-sm font-medium shrink-0 ${colorClass}`}
      >
        {initials}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Line 1: Name + badges */}
        <div className="flex items-center gap-2 mb-0.5 min-w-0">
          <Link href={`/anbieter/${company.slug}`} className="hover:underline min-w-0 flex-1">
            <p className="font-medium text-[15px] text-gray-900 truncate">{company.name}</p>
          </Link>
          {company.is_verified && (
            <span className="text-[11px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded shrink-0 whitespace-nowrap">
              Verifiziert
            </span>
          )}
          {company.is_premium && (
            <span className="text-[11px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded shrink-0 whitespace-nowrap">
              Anzeige
            </span>
          )}
        </div>

        {/* Line 2: Location + distance */}
        <p className="text-[13px] text-gray-500 mb-1.5">
          {company.city}, {company.state}
          {distanceKm != null && (
            <span className="ml-2 inline-flex items-center gap-0.5 text-[12px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {distanceKm} km
            </span>
          )}
        </p>

        {/* Line 3: Rating + crane types */}
        <div className="flex items-center gap-2 flex-wrap">
          {company.google_rating != null && (
            <span className="text-[13px]">
              <span className="text-amber-500">&#9733;</span>{' '}
              <span className="text-gray-900 font-medium">{company.google_rating.toFixed(1)}</span>{' '}
              <span className="text-gray-400">
                ({company.google_reviews_count}{' '}
                {company.google_reviews_count === 1 ? 'Bewertung' : 'Bewertungen'})
              </span>
            </span>
          )}
          {craneTypeNames.map((typeName) => (
            <span
              key={typeName}
              className="text-[12px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
            >
              {typeName}
            </span>
          ))}
          {company.price_day_from ? (
            <span className="text-[12px] text-blue-600 font-medium">
              ab {company.price_day_from.toLocaleString('de-DE')}€/Tag
            </span>
          ) : referencePrice ? (
            <span className="text-[12px] text-amber-600">
              {referencePrice}
            </span>
          ) : (
            <span className="text-[12px] text-gray-400">Preis auf Anfrage</span>
          )}
        </div>

        {/* Line 4: Service area */}
        {(company.service_radius_km || (company.service_regions && company.service_regions.length > 0)) && (
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            <span className="text-[12px] text-gray-400">Einsatzgebiet:</span>
            {company.service_radius_km && (
              <span className="text-[12px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                {company.service_radius_km} km Umkreis
              </span>
            )}
            {company.service_regions && company.service_regions.slice(0, 4).map((region) => (
              <span
                key={region}
                className="text-[12px] bg-gray-50 text-gray-600 px-2 py-0.5 rounded"
              >
                {region}
              </span>
            ))}
            {company.service_regions && company.service_regions.length > 4 && (
              <span className="text-[12px] text-gray-400">
                +{company.service_regions.length - 4} weitere
              </span>
            )}
          </div>
        )}

        {/* Line 5: Price note (firm-provided pricing hint) */}
        {company.price_note && (
          <p
            className="text-[12px] text-gray-500 mt-1.5 line-clamp-1"
            title={company.price_note}
          >
            <span className="text-gray-400">Preishinweis:</span>{' '}
            {company.price_note}
          </p>
        )}
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col gap-1.5 shrink-0 max-sm:hidden">
        {onRequestQuote && canInquire ? (
          <button
            onClick={() => onRequestQuote(company.id)}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-medium rounded-md transition-colors"
          >
            Angebot anfragen
          </button>
        ) : company.phone ? (
          <a
            href={`tel:${company.phone}`}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-medium rounded-md transition-colors text-center whitespace-nowrap"
            aria-label={`Rufen Sie ${company.name} an: ${company.phone}`}
          >
            {company.phone}
          </a>
        ) : null}
        <Link
          href={`/anbieter/${company.slug}`}
          className="px-3.5 py-1.5 border border-gray-200 hover:border-gray-300 text-[12px] text-gray-500 rounded-md text-center transition-colors"
        >
          Profil ansehen
        </Link>
      </div>

      {/* Mobile CTA */}
      <div className="flex flex-col gap-1.5 shrink-0 sm:hidden">
        {onRequestQuote && canInquire ? (
          <button
            onClick={() => onRequestQuote(company.id)}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-medium rounded-md transition-colors"
          >
            Anfragen
          </button>
        ) : company.phone ? (
          <a
            href={`tel:${company.phone}`}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-medium rounded-md transition-colors text-center"
          >
            Anrufen
          </a>
        ) : null}
        <Link
          href={`/anbieter/${company.slug}`}
          className="px-3 py-1.5 border border-gray-200 text-[11px] text-gray-500 rounded-md text-center"
        >
          Profil
        </Link>
      </div>
    </div>
  )
}
