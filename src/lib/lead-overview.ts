import { getServiceSupabase } from '@/lib/supabase'

/**
 * Read-only lead overview for the /admin/leads panel (Faza 1).
 *
 * Consolidates what the owner currently reads across scattered emails
 * (signal-backs ANGENOMMEN/ABGELEHNT, owner-digest, lifecycle alerts) into one
 * queryable view. Joins leads + lead_companies (+ companies) + lead_responses
 * + crane_types in JS — the volume is small (low hundreds of leads).
 *
 * Health is computed, not stored: it mirrors the alert logic so the panel's
 * "Handlungsbedarf" filter is the owner's daily TODO list. Pure read — no writes.
 */

export type LeadHealth = 'won' | 'lost' | 'red' | 'yellow' | 'green'
export type CustomerOutcome = 'got_offer' | 'no_offer' | null

export interface FirmStatus {
  companyId: string
  name: string
  email: string | null
  sentAt: string | null
  response: 'accept' | 'decline' | null
  respondedAt: string | null
  feedbackOutcome: string | null
}

export interface LeadCounts {
  dispatched: number
  accepted: number
  declined: number
  pending: number
}

export interface LeadOverview {
  id: string
  createdAt: string
  customerName: string
  city: string | null
  country: string
  status: string
  craneType: string
  preferredDate: string | null
  ageDays: number
  daysToDeadline: number | null
  counts: LeadCounts
  health: LeadHealth
  hint: string
  customerOutcome: CustomerOutcome
}

export interface LeadDetail extends LeadOverview {
  customerEmail: string | null
  customerPhone: string | null
  projectDescription: string | null
  durationDays: number | null
  entryPath: string | null
  feedbackNotes: string | null
  winningCompanyId: string | null
  winningCompanyName: string | null
  firms: FirmStatus[]
}

const DAY_MS = 86_400_000

function daysSince(iso: string): number {
  return Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / DAY_MS))
}

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null
  const t = new Date(`${dateStr}T00:00:00Z`).getTime()
  if (Number.isNaN(t)) return null
  return Math.ceil((t - Date.now()) / DAY_MS)
}

function parseOutcome(notes: string | null): CustomerOutcome {
  if (!notes) return null
  if (/got_offer/i.test(notes)) return 'got_offer'
  if (/no_offer/i.test(notes)) return 'no_offer'
  return null
}

/**
 * Compute the health badge + a short hint. Order matters: closed states first,
 * then the red triggers (mirror the owner-alert conditions), then yellow.
 */
function computeHealth(
  status: string,
  counts: LeadCounts,
  outcome: CustomerOutcome,
  ageDays: number,
  daysToDeadline: number | null,
): { health: LeadHealth; hint: string } {
  if (status === 'won') return { health: 'won', hint: 'Gewonnen' }
  if (status === 'lost') return { health: 'lost', hint: 'Verloren' }

  const { dispatched, accepted, declined, pending } = counts
  const reacted = accepted + declined

  if (outcome === 'got_offer') return { health: 'red', hint: 'Kunde: Angebot erhalten → WON prüfen' }
  if (outcome === 'no_offer') return { health: 'red', hint: 'Kunde: kein Angebot → nachfassen/reroute' }
  if (dispatched === 0) return { health: 'red', hint: 'keine Firma zugeordnet' }
  if (reacted === 0 && ageDays >= 3) return { health: 'red', hint: `${ageDays} T ohne jede Reaktion` }
  if (daysToDeadline !== null && daysToDeadline < 0 && accepted === 0)
    return { health: 'red', hint: 'Termin verstrichen, keine Zusage' }
  if (daysToDeadline !== null && daysToDeadline <= 7 && accepted === 0)
    return { health: 'red', hint: `Termin in ${daysToDeadline} T, keine Zusage` }

  if (accepted > 0) return { health: 'yellow', hint: `${accepted} Zusage(n), Abschluss prüfen` }
  if (dispatched <= 1) return { health: 'yellow', hint: 'nur 1 Firma — Fanout dünn' }
  if (daysToDeadline !== null && daysToDeadline <= 14)
    return { health: 'yellow', hint: `Termin in ${daysToDeadline} T` }
  if (pending === dispatched) return { health: 'green', hint: 'frisch, warten' }
  return { health: 'green', hint: 'läuft' }
}

interface RawLead {
  id: string
  created_at: string
  customer_name: string | null
  customer_email: string | null
  customer_phone: string | null
  city: string | null
  country: string | null
  status: string | null
  crane_type_id: string | null
  preferred_date: string | null
  duration_days: number | null
  entry_path: string | null
  project_description: string | null
  feedback_notes: string | null
  winning_company_id: string | null
}

function buildOverview(l: RawLead, firms: FirmStatus[], craneName: string): LeadOverview {
  const counts: LeadCounts = {
    dispatched: firms.length,
    accepted: firms.filter((f) => f.response === 'accept').length,
    declined: firms.filter((f) => f.response === 'decline').length,
    pending: firms.filter((f) => f.response === null).length,
  }
  const outcome = parseOutcome(l.feedback_notes)
  const ageDays = daysSince(l.created_at)
  const daysToDeadline = daysUntil(l.preferred_date)
  const { health, hint } = computeHealth(l.status ?? 'new', counts, outcome, ageDays, daysToDeadline)
  return {
    id: l.id,
    createdAt: l.created_at,
    customerName: (l.customer_name ?? '–').trim() || '–',
    city: l.city,
    country: (l.country ?? 'DE').toUpperCase(),
    status: l.status ?? 'new',
    craneType: craneName,
    preferredDate: l.preferred_date,
    ageDays,
    daysToDeadline,
    counts,
    health,
    hint,
    customerOutcome: outcome,
  }
}

// Sort: needs-attention first (red, yellow), then open green, then closed; within
// a bucket, newest first. Keeps the daily TODO at the top by default.
const HEALTH_RANK: Record<LeadHealth, number> = { red: 0, yellow: 1, green: 2, won: 3, lost: 3 }

async function fetchFirmsByLead(
  sb: ReturnType<typeof getServiceSupabase>,
  leadIds: string[],
): Promise<Map<string, FirmStatus[]>> {
  const byLead = new Map<string, FirmStatus[]>()
  if (leadIds.length === 0) return byLead

  const [{ data: lcs }, { data: responses }] = await Promise.all([
    sb
      .from('lead_companies')
      .select('lead_id, company_id, sent_at, feedback_outcome, companies(name, email)')
      .in('lead_id', leadIds),
    sb.from('lead_responses').select('lead_id, supplier_id, action, responded_at').in('lead_id', leadIds),
  ])

  // Latest response per (lead, supplier).
  const respMap = new Map<string, { action: 'accept' | 'decline'; respondedAt: string }>()
  for (const r of responses ?? []) {
    const key = `${r.lead_id}:${r.supplier_id}`
    const prev = respMap.get(key)
    if (!prev || (r.responded_at ?? '') > prev.respondedAt) {
      respMap.set(key, { action: r.action as 'accept' | 'decline', respondedAt: r.responded_at ?? '' })
    }
  }

  for (const lc of lcs ?? []) {
    // supabase types the embedded relation as array|object depending on inference.
    const company = Array.isArray(lc.companies) ? lc.companies[0] : lc.companies
    const resp = respMap.get(`${lc.lead_id}:${lc.company_id}`)
    const row: FirmStatus = {
      companyId: lc.company_id,
      name: company?.name ?? '(unbekannt)',
      email: company?.email ?? null,
      sentAt: lc.sent_at,
      response: resp?.action ?? null,
      respondedAt: resp?.respondedAt ?? null,
      feedbackOutcome: lc.feedback_outcome ?? null,
    }
    const arr = byLead.get(lc.lead_id) ?? []
    arr.push(row)
    byLead.set(lc.lead_id, arr)
  }
  return byLead
}

export async function getLeadsOverview(): Promise<LeadOverview[]> {
  const sb = getServiceSupabase()
  const { data: leads, error } = await sb
    .from('leads')
    .select(
      'id, created_at, customer_name, city, country, status, crane_type_id, preferred_date, feedback_notes',
    )
    .eq('is_test', false)
    .order('created_at', { ascending: false })
    .limit(300)
  if (error || !leads) {
    console.error('[lead-overview] leads fetch failed:', error)
    return []
  }

  const craneTypes = await fetchCraneTypes(sb)
  const firmsByLead = await fetchFirmsByLead(sb, leads.map((l) => l.id))

  const out = leads.map((l) =>
    buildOverview(l as RawLead, firmsByLead.get(l.id) ?? [], craneTypes.get(l.crane_type_id ?? '') ?? 'Kran'),
  )
  out.sort((a, b) => {
    const r = HEALTH_RANK[a.health] - HEALTH_RANK[b.health]
    if (r !== 0) return r
    return b.createdAt.localeCompare(a.createdAt)
  })
  return out
}

export async function getLeadDetail(id: string): Promise<LeadDetail | null> {
  const sb = getServiceSupabase()
  const { data: rows, error } = await sb
    .from('leads')
    .select(
      'id, created_at, customer_name, customer_email, customer_phone, city, country, status, crane_type_id, preferred_date, duration_days, entry_path, project_description, feedback_notes, winning_company_id',
    )
    .eq('id', id)
    .limit(1)
  if (error || !rows || rows.length === 0) return null
  const l = rows[0] as RawLead & {
    customer_email: string | null
    customer_phone: string | null
    duration_days: number | null
    entry_path: string | null
    project_description: string | null
    winning_company_id: string | null
  }

  const craneTypes = await fetchCraneTypes(sb)
  const firmsByLead = await fetchFirmsByLead(sb, [id])
  const firms = (firmsByLead.get(id) ?? []).sort((a, b) => {
    const rank = (f: FirmStatus) => (f.response === 'accept' ? 0 : f.response === 'decline' ? 1 : 2)
    return rank(a) - rank(b)
  })
  const base = buildOverview(l, firms, craneTypes.get(l.crane_type_id ?? '') ?? 'Kran')
  const winning = l.winning_company_id ? firms.find((f) => f.companyId === l.winning_company_id) : null

  return {
    ...base,
    customerEmail: l.customer_email,
    customerPhone: l.customer_phone,
    projectDescription: l.project_description,
    durationDays: l.duration_days,
    entryPath: l.entry_path,
    feedbackNotes: l.feedback_notes,
    winningCompanyId: l.winning_company_id,
    winningCompanyName: winning?.name ?? null,
    firms,
  }
}

async function fetchCraneTypes(
  sb: ReturnType<typeof getServiceSupabase>,
): Promise<Map<string, string>> {
  const { data } = await sb.from('crane_types').select('id, name')
  return new Map((data ?? []).map((c) => [c.id as string, c.name as string]))
}
