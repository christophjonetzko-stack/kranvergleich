import type { Metadata } from 'next'
import Link from 'next/link'
import { isAdminRequest } from '@/lib/admin-auth'
import { AdminLoginForm } from '@/components/admin-login-form'
import { getLeadsOverview, type LeadOverview, type LeadHealth } from '@/lib/lead-overview'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Leads',
  robots: { index: false, follow: false },
}

const BADGE: Record<LeadHealth, { label: string; cls: string }> = {
  red: { label: '🔴 Handlung', cls: 'bg-red-100 text-red-700' },
  yellow: { label: '🟡 Beobachten', cls: 'bg-amber-100 text-amber-700' },
  green: { label: '🟢 Läuft', cls: 'bg-emerald-100 text-emerald-700' },
  won: { label: '✅ Won', cls: 'bg-blue-100 text-blue-700' },
  lost: { label: '❌ Lost', cls: 'bg-gray-100 text-gray-500' },
}

function fmtDate(iso: string): string {
  const d = new Date(iso)
  return `${String(d.getUTCDate()).padStart(2, '0')}.${String(d.getUTCMonth() + 1).padStart(2, '0')}.`
}

function deadlineCell(l: LeadOverview): { text: string; cls: string } {
  if (!l.preferredDate) return { text: '–', cls: 'text-gray-400' }
  const d = new Date(`${l.preferredDate}T00:00:00Z`)
  const label = `${String(d.getUTCDate()).padStart(2, '0')}.${String(d.getUTCMonth() + 1).padStart(2, '0')}.`
  if (l.daysToDeadline === null) return { text: label, cls: 'text-gray-600' }
  const urgent = l.daysToDeadline < 0 || (l.daysToDeadline <= 7 && l.counts.accepted === 0)
  const suffix = l.daysToDeadline < 0 ? ' (vorbei)' : ` (${l.daysToDeadline}T)`
  return { text: label + suffix, cls: urgent ? 'text-red-600 font-medium' : 'text-gray-600' }
}

type Search = { f?: string; c?: string }

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<Search>
}) {
  if (!(await isAdminRequest())) {
    return <AdminLoginForm />
  }

  const sp = await searchParams
  const f = sp.f ?? 'open'
  const c = sp.c ?? 'all'

  const all = await getLeadsOverview()

  const isOpen = (l: LeadOverview) => l.health !== 'won' && l.health !== 'lost'
  const counts = {
    open: all.filter(isOpen).length,
    attention: all.filter((l) => l.health === 'red' || l.health === 'yellow').length,
    won: all.filter((l) => l.health === 'won').length,
    lost: all.filter((l) => l.health === 'lost').length,
  }

  let rows = all
  if (c === 'DE' || c === 'AT') rows = rows.filter((l) => l.country === c)
  if (f === 'attention') rows = rows.filter((l) => l.health === 'red' || l.health === 'yellow')
  else if (f === 'open') rows = rows.filter(isOpen)
  else if (f === 'won') rows = rows.filter((l) => l.health === 'won')
  else if (f === 'lost') rows = rows.filter((l) => l.health === 'lost')

  const qs = (next: Partial<Search>) => {
    const m = { f, c, ...next }
    const p = new URLSearchParams()
    if (m.f && m.f !== 'open') p.set('f', m.f)
    if (m.c && m.c !== 'all') p.set('c', m.c)
    const s = p.toString()
    return s ? `?${s}` : ''
  }

  const chip = (active: boolean) =>
    `inline-flex items-center rounded-full px-3 py-1 text-[13px] font-medium ${
      active ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-xl font-semibold text-gray-900">Leads</h1>
        <div className="flex flex-wrap gap-3 text-[13px] text-gray-500">
          <span>Offen: <strong className="text-gray-900">{counts.open}</strong></span>
          <span>⚠ Handlung: <strong className="text-red-600">{counts.attention}</strong></span>
          <span>Won: <strong className="text-blue-700">{counts.won}</strong></span>
          <span>Lost: <strong className="text-gray-500">{counts.lost}</strong></span>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Link href={`/admin/leads${qs({ f: 'attention' })}`} className={chip(f === 'attention')}>⚠ Handlungsbedarf</Link>
        <Link href={`/admin/leads${qs({ f: 'open' })}`} className={chip(f === 'open')}>Offen</Link>
        <Link href={`/admin/leads${qs({ f: 'won' })}`} className={chip(f === 'won')}>Won</Link>
        <Link href={`/admin/leads${qs({ f: 'lost' })}`} className={chip(f === 'lost')}>Lost</Link>
        <Link href={`/admin/leads${qs({ f: 'all' })}`} className={chip(f === 'all')}>Alle</Link>
        <span className="mx-1 text-gray-300">|</span>
        <Link href={`/admin/leads${qs({ c: 'all' })}`} className={chip(c === 'all')}>DE+AT</Link>
        <Link href={`/admin/leads${qs({ c: 'DE' })}`} className={chip(c === 'DE')}>DE</Link>
        <Link href={`/admin/leads${qs({ c: 'AT' })}`} className={chip(c === 'AT')}>AT</Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-gray-50 text-[12px] uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Kunde / Ort</th>
              <th className="px-3 py-2">Krantyp</th>
              <th className="px-3 py-2 whitespace-nowrap">Erstellt</th>
              <th className="px-3 py-2 whitespace-nowrap">Termin</th>
              <th className="px-3 py-2 whitespace-nowrap">Firmen</th>
              <th className="px-3 py-2">Hinweis</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length === 0 && (
              <tr><td colSpan={7} className="px-3 py-8 text-center text-gray-400">Keine Leads in dieser Ansicht.</td></tr>
            )}
            {rows.map((l) => {
              const dl = deadlineCell(l)
              return (
                <tr key={l.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2">
                    <span className={`inline-block whitespace-nowrap rounded px-2 py-0.5 text-[12px] font-medium ${BADGE[l.health].cls}`}>
                      {BADGE[l.health].label}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <Link href={`/admin/leads/${l.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                      {l.customerName}
                    </Link>
                    <span className="text-gray-400"> · {l.city ?? '–'}{l.country === 'AT' ? ' (AT)' : ''}</span>
                  </td>
                  <td className="px-3 py-2 text-gray-600">{l.craneType}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-gray-600">{fmtDate(l.createdAt)} <span className="text-gray-400">{l.ageDays}T</span></td>
                  <td className={`px-3 py-2 whitespace-nowrap ${dl.cls}`}>{dl.text}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className="text-emerald-600">✓{l.counts.accepted}</span>{' '}
                    <span className="text-gray-400">✕{l.counts.declined}</span>{' '}
                    <span className="text-amber-600">⏳{l.counts.pending}</span>
                  </td>
                  <td className="px-3 py-2 text-gray-500">{l.hint}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[12px] text-gray-400">
        Read-only Übersicht · sortiert nach Handlungsbedarf, dann neueste · {all.length} Leads geladen.
      </p>
    </div>
  )
}
