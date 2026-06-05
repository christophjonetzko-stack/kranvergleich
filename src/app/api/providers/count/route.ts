import { NextResponse } from 'next/server'
import { getCompaniesForCraneTypeNearLocation } from '@/lib/queries'
import { getCraneTypeIdBySlug } from '@/data/crane-types'
import { MAX_COMPANY_IDS } from '@/lib/dispatch-config'

// Read-only provider-count preview for the Kostenrechner recommendation screen.
//
// Returns the number of firms that the /api/leads auto_select_nearest flow
// WOULD contact for a given crane type + location, plus the radius (km) it had
// to expand to. CRITICAL: this MUST stay in lockstep with the real dispatch so
// the "N Anbieter" promised on the recommendation screen equals the N actually
// contacted on submit. We guarantee that by calling the EXACT same function
// (getCompaniesForCraneTypeNearLocation) with the EXACT same limit (10 =
// MAX_COMPANY_IDS in /api/leads) and returning matches.length — never a raw
// COUNT(*) against the table, which would ignore the email filter, the radius
// expansion, and the 10-firm cap and thus over-promise.
//
// Zero writes, zero PII: the response carries only an integer count, the radius,
// and the resolved location label (e.g. "10115 Berlin"). No firm names, no
// contact data. No lead row is created.

// Single source of truth (lib/dispatch-config), shared with /api/leads.
// Auto-select caps its matches at this limit, so the preview count uses the
// SAME cap to stay equal — without coupling this endpoint to the leads module.
const LIMIT = MAX_COMPANY_IDS

const MAX_INPUT_LEN = 80

/** Accept either the full slug ('autokran-mieten'), the short form ('autokran'),
 *  or a raw crane_type UUID. Returns the crane_type_id or null. */
function resolveCraneTypeId(raw: string): string | null {
  const v = raw.trim()
  if (!v) return null
  // UUID passes straight through (the form sends getCraneTypeIdBySlug(...) but
  // a direct id call must work too).
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v)) return v
  // Full slug first, then try appending the '-mieten' suffix the catalog uses.
  return getCraneTypeIdBySlug(v) ?? getCraneTypeIdBySlug(`${v}-mieten`)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const typeParam = (searchParams.get('type') || '').slice(0, MAX_INPUT_LEN)
  const location = (searchParams.get('plz') || searchParams.get('location') || '').trim().slice(0, MAX_INPUT_LEN)

  const craneTypeId = resolveCraneTypeId(typeParam)
  if (!craneTypeId) {
    return NextResponse.json({ error: 'unknown_crane_type' }, { status: 400 })
  }
  if (!location) {
    return NextResponse.json({ error: 'missing_location' }, { status: 400 })
  }

  try {
    const result = await getCompaniesForCraneTypeNearLocation(craneTypeId, location, { limit: LIMIT })
    // null = location could not be geocoded (foreign/typo PLZ or unknown city).
    // Surface as a neutral zero so the UI degrades gracefully (no "0 Angebote"
    // CTA) instead of erroring.
    if (!result) {
      return NextResponse.json({ count: 0, radius_km: null, resolved_label: null, unresolved: true })
    }
    return NextResponse.json({
      count: result.matches.length,
      radius_km: result.radius_used_km,
      resolved_label: result.resolved_label,
    })
  } catch (err) {
    console.error('[api/providers/count] lookup failed:', err)
    return NextResponse.json({ error: 'lookup_failed' }, { status: 500 })
  }
}
