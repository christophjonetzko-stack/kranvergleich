import type { Metadata } from 'next'
import { isAdminRequest } from '@/lib/admin-auth'
import { getPendingVerificationQueue } from '@/lib/path4'
import { AdminLoginForm } from '@/components/admin-login-form'
import { AdminVerifyButton } from '@/components/admin-verify-button'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Path 4 — Verifizierung',
  robots: { index: false, follow: false },
}

function euro(cents: number | null): string {
  if (cents == null) return '—'
  return (cents / 100).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
}

function dateDE(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default async function AdminPath4Page() {
  if (!(await isAdminRequest())) {
    return <AdminLoginForm />
  }

  const queue = await getPendingVerificationQueue()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-xl font-semibold text-gray-900 mb-1">Path 4 — Verifizierungs-Warteschlange</h1>
      <p className="text-[14px] text-gray-500 mb-6">
        {queue.length === 0
          ? 'Keine offenen Verifizierungen.'
          : `${queue.length} Firma(en) warten auf Prüfung von Impressum, Website und Telefon.`}
      </p>

      <ul className="space-y-3">
        {queue.map((firm) => (
          <li key={firm.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="min-w-0">
                <p className="font-medium text-[15px] text-gray-900 truncate">{firm.name}</p>
                <p className="text-[12px] text-gray-500">
                  Bezahlt {dateDE(firm.tier_purchased_at)} · {euro(firm.tier_amount_cents)}
                </p>
              </div>
              <AdminVerifyButton companyId={firm.id} companyName={firm.name} />
            </div>

            {/* Quick links for the manual check (Impressum + Website + Telefon). */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px]">
              <a href={`/anbieter/${firm.slug}`} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                Profil
              </a>
              {firm.website ? (
                <a href={firm.website} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                  Website
                </a>
              ) : (
                <span className="text-gray-400">keine Website</span>
              )}
              {firm.phone ? (
                <a href={`tel:${firm.phone}`} className="text-blue-700 hover:underline">
                  {firm.phone}
                </a>
              ) : (
                <span className="text-gray-400">kein Telefon</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
