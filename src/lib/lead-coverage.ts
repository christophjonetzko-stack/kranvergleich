import { getServiceSupabase } from '@/lib/supabase'
import { SHORT_HAUL_TYPE_IDS, NATIONAL_HEAVY_REACH_TYPE_IDS } from '@/lib/queries'

/**
 * Top-up candidate finder for the panel (Faza 2b-ii). Given a lead, returns
 * firms that offer the lead's crane type, lie within radius, are active +
 * relevant + have an email, are NOT already on the lead, deduped by inbox and
 * sorted by distance. The admin picks via checkboxes — no auto-radius cut, a
 * human decides who to add. Read-only.
 *
 * Radius mirrors the production dispatch ladder caps in queries.ts
 * (_computeFirmMatchesFromCoords): short-haul types 120 km, mid/heavy 150 km.
 * On Mobilkran/Raupenkran leads, `national_heavy` firms are additionally
 * offered regardless of distance (same INJECT rule as the city pages) — the
 * distance column lets the human judge; they never crowd out local candidates.
 */

export interface TopupCandidate {
  companyId: string
  name: string
  email: string
  distanceKm: number
  nationalHeavy?: boolean
}

interface CityRow {
  p: string
  n: string
  la: number
  ln: number
}

const MAX_KM_SHORT_HAUL = 120
const MAX_KM_DEFAULT = 150
const MAX_CANDIDATES = 12

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]/g, '')
}

async function loadCities(country: string): Promise<CityRow[]> {
  // Country-aware dynamic import (same pattern as queries.ts / api/cities):
  // tree-shakes the unused country's dataset out of the bundle.
  const mod = country === 'AT'
    ? await import('@/data/austrian-cities.json')
    : await import('@/data/german-cities.json')
  return mod.default as CityRow[]
}

function resolveCoords(city: string | null, rows: CityRow[]): { la: number; ln: number } | null {
  if (!city) return null
  const trimmed = city.trim()
  // PLZ first (city field is often just a postal code).
  const plzMatch = /^\d{4,5}/.exec(trimmed)
  if (plzMatch) {
    const hit = rows.find((r) => r.p === plzMatch[0])
    if (hit) return { la: hit.la, ln: hit.ln }
  }
  const needle = normalize(trimmed)
  if (!needle) return null
  const exact = rows.find((r) => normalize(r.n) === needle)
  if (exact) return { la: exact.la, ln: exact.ln }
  const starts = rows.find((r) => normalize(r.n).startsWith(needle))
  return starts ? { la: starts.la, ln: starts.ln } : null
}

function distKm(la: number, ln: number, refLa: number, refLn: number): number {
  const dLa = (la - refLa) * 111
  const dLn = (ln - refLn) * 111 * Math.cos((refLa * Math.PI) / 180)
  return Math.round(Math.sqrt(dLa * dLa + dLn * dLn))
}

export async function getTopupCandidates(leadId: string): Promise<TopupCandidate[]> {
  const sb = getServiceSupabase()

  const { data: leadRows } = await sb
    .from('leads')
    .select('crane_type_id, city, country')
    .eq('id', leadId)
    .limit(1)
  const lead = leadRows?.[0]
  if (!lead?.crane_type_id) return []

  const country = ((lead.country as string) ?? 'DE').toUpperCase()
  const cities = await loadCities(country)
  const ref = resolveCoords(lead.city as string | null, cities)
  if (!ref) return []

  const { data: alreadyRows } = await sb.from('lead_companies').select('company_id').eq('lead_id', leadId)
  const already = new Set((alreadyRows ?? []).map((r) => r.company_id as string))

  const { data: ccRows } = await sb.from('company_cranes').select('company_id').eq('crane_type_id', lead.crane_type_id)
  const offerIds = [...new Set((ccRows ?? []).map((r) => r.company_id as string))].filter((id) => !already.has(id))
  if (offerIds.length === 0) return []

  const { data: comps } = await sb
    .from('companies')
    .select('id, name, email, lat, lng, is_active, is_relevant, national_heavy')
    .in('id', offerIds)

  const maxKm = SHORT_HAUL_TYPE_IDS.has(lead.crane_type_id as string) ? MAX_KM_SHORT_HAUL : MAX_KM_DEFAULT
  const injectNationalHeavy = NATIONAL_HEAVY_REACH_TYPE_IDS.has(lead.crane_type_id as string)

  const seenEmail = new Set<string>()
  const local: TopupCandidate[] = []
  const injected: TopupCandidate[] = []
  for (const c of comps ?? []) {
    if (!c.is_active || !c.is_relevant) continue
    const email = ((c.email as string | null) ?? '').trim()
    if (!email || email === '???') continue
    if (c.lat == null || c.lng == null) continue
    const d = distKm(c.lat as number, c.lng as number, ref.la, ref.ln)
    const isNationalReach = injectNationalHeavy && c.national_heavy === true
    if (d > maxKm && !isNationalReach) continue
    const key = email.toLowerCase()
    if (seenEmail.has(key)) continue
    seenEmail.add(key)
    const cand: TopupCandidate = {
      companyId: c.id as string,
      name: c.name as string,
      email,
      distanceKm: d,
      ...(isNationalReach && d > maxKm ? { nationalHeavy: true } : {}),
    }
    if (cand.nationalHeavy) injected.push(cand)
    else local.push(cand)
  }
  local.sort((a, b) => a.distanceKm - b.distanceKm)
  injected.sort((a, b) => a.distanceKm - b.distanceKm)
  // Cap applies to local candidates; injected national-heavy firms are always
  // appended so a Raupenkran lead still shows the bundesweit operators.
  return [...local.slice(0, MAX_CANDIDATES), ...injected]
}
