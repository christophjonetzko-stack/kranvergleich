import type { Metadata } from 'next'
import Link from 'next/link'
import { isAdminRequest } from '@/lib/admin-auth'
import { AdminLoginForm } from '@/components/admin-login-form'
import { getLeadDetail, type FirmStatus, type LeadHealth } from '@/lib/lead-overview'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Lead-Detail',
  robots: { index: false, follow: false },
}

const BADGE: Record<LeadHealth, { label: string; cls: string }> = {
  red: { label: '🔴 Handlung', cls: 'bg-red-100 text-red-700' },
  yellow: { label: '🟡 Beobachten', cls: 'bg-amber-100 text-amber-700' },
  green: { label: '🟢 Läuft', cls: 'bg-emerald-100 text-emerald-700' },
  won: { label: '✅ Won', cls: 'bg-blue-100 text-blue-700' },
  lost: { label: '❌ Lost', cls: 'bg-gray-100 text-gray-500' },
}

function ts(iso: string | null): string {
  if (!iso) return '–'
  const d = new Date(iso)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${p(d.getUTCDate())}.${p(d.getUTCMonth() + 1)}. ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}`
}

function firmBadge(f: FirmStatus): { label: string; cls: string } {
  if (f.response === 'accept') return { label: '✅ ANGENOMMEN', cls: 'text-emerald-700' }
  if (f.response === 'decline') return { label: '❌ ABGELEHNT', cls: 'text-gray-500' }
  return { label: '⏳ keine Reaktion', cls: 'text-amber-600' }
}

export default async function AdminLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  if (!(await isAdminRequest())) {
    return <AdminLoginForm />
  }

  const { id } = await params
  const lead = await getLeadDetail(id)

  if (!lead) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link href="/admin/leads" className="text-[13px] text-blue-600 hover:underline">← Zurück zur Liste</Link>
        <p className="mt-6 text-gray-500">Lead nicht gefunden.</p>
      </div>
    )
  }

  const b = BADGE[lead.health]
  const phone = lead.customerPhone && lead.customerPhone.trim() ? lead.customerPhone : null

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link href="/admin/leads" className="text-[13px] text-blue-600 hover:underline">← Zurück zur Liste</Link>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold text-gray-900">
          {lead.customerName} · {lead.city ?? '–'} · {lead.craneType}
        </h1>
        <span className={`rounded px-2 py-1 text-[13px] font-medium ${b.cls}`}>{b.label}</span>
      </div>
      <p className="mt-1 text-[13px] text-gray-500">{lead.hint}</p>

      {/* Kunde */}
      <section className="mt-5 rounded-lg border border-gray-200 p-4">
        <h2 className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-gray-400">Kunde</h2>
        <dl className="grid grid-cols-[110px_1fr] gap-y-1 text-[14px]">
          <dt className="text-gray-500">E-Mail</dt>
          <dd>{lead.customerEmail ? <a className="text-blue-600 hover:underline" href={`mailto:${lead.customerEmail}`}>{lead.customerEmail}</a> : '–'}</dd>
          <dt className="text-gray-500">Telefon</dt>
          <dd>{phone ? <a className="text-blue-600 hover:underline" href={`tel:${phone}`}>{phone}</a> : '–'}</dd>
          <dt className="text-gray-500">Ort / Land</dt>
          <dd>{lead.city ?? '–'} · {lead.country}</dd>
          <dt className="text-gray-500">Wunschtermin</dt>
          <dd>{lead.preferredDate ?? '–'}{lead.daysToDeadline !== null ? ` (${lead.daysToDeadline < 0 ? 'vorbei' : `in ${lead.daysToDeadline} T`})` : ''}{lead.durationDays ? ` · ${lead.durationDays} Tag(e)` : ''}</dd>
        </dl>
        {lead.projectDescription && (
          <p className="mt-3 whitespace-pre-line rounded bg-gray-50 p-3 text-[14px] leading-relaxed text-gray-700">
            {lead.projectDescription}
          </p>
        )}
      </section>

      {/* Firmen */}
      <section className="mt-4 rounded-lg border border-gray-200 p-4">
        <h2 className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-gray-400">
          Firmen — {lead.counts.dispatched} angeschrieben · ✓{lead.counts.accepted} Zusagen · ✕{lead.counts.declined} Absagen · ⏳{lead.counts.pending} offen
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <tbody className="divide-y divide-gray-100">
              {lead.firms.map((f) => {
                const fb = firmBadge(f)
                const isWinner = f.companyId === lead.winningCompanyId
                return (
                  <tr key={f.companyId} className={isWinner ? 'bg-blue-50' : ''}>
                    <td className={`py-2 pr-3 whitespace-nowrap font-medium ${fb.cls}`}>{fb.label}</td>
                    <td className="py-2 pr-3">
                      {f.name}{isWinner ? <span className="ml-1 text-blue-700">★ Gewinner</span> : ''}
                      {f.email ? <span className="block text-[12px] text-gray-400">{f.email}</span> : null}
                    </td>
                    <td className="py-2 pr-3 whitespace-nowrap text-gray-500">
                      {f.response ? ts(f.respondedAt) : `gesendet ${ts(f.sentAt)}`}
                    </td>
                  </tr>
                )
              })}
              {lead.firms.length === 0 && (
                <tr><td className="py-3 text-gray-400">Keine Firma zugeordnet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Notizen */}
      {lead.feedbackNotes && (
        <section className="mt-4 rounded-lg border border-gray-200 p-4">
          <h2 className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-gray-400">Verlauf / Notizen</h2>
          <p className="whitespace-pre-line text-[13px] leading-relaxed text-gray-700">{lead.feedbackNotes}</p>
        </section>
      )}

      <p className="mt-4 text-[12px] text-gray-400">
        Lead-ID: {lead.id} · erstellt {new Date(lead.createdAt).toISOString().slice(0, 10)} (vor {lead.ageDays} T) · entry_path {lead.entryPath ?? '–'}
      </p>
      <p className="mt-1 text-[12px] text-gray-400">Read-only (Faza 1). Aktionen (WON/LOST, Dispatch, Nachfassen) folgen in Faza 2.</p>
    </div>
  )
}
