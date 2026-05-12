/**
 * UTM first-touch attribution helper (mig 027, 2026-05-12).
 *
 * Convention: the first inbound URL of a browser-tab session writes its
 * utm_* into sessionStorage.kv_utm; subsequent navigations never overwrite.
 * Someone who clicks a LinkedIn link, browses five pages, and submits a
 * form 20 minutes later gets utm_source = 'linkedin' on the lead even
 * though the last URL had no UTM at all.
 *
 * DSGVO posture: sessionStorage is session-scoped (clears on tab close);
 * §25(2) TDDDG treats it as strictly necessary for the comparison-portal
 * lead flow, no consent banner gating needed. Migration to localStorage
 * (cross-session attribution) would change the legal posture — escalate
 * to legal-check before doing that.
 *
 * All getters are SSR-safe — they return an empty payload during render
 * on the server and only read sessionStorage when called from the
 * browser. Client components must still gate sessionStorage writes to
 * after mount (see UtmCapture).
 */

const STORAGE_KEY = 'kv_utm'

export type UtmPayload = {
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
}

const EMPTY: UtmPayload = {
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  utm_content: null,
}

// Hard cap on each value so a forged URL can't bloat sessionStorage or DB.
// 120 chars covers every realistic campaign name; longer values are
// truncated rather than rejected so reports don't silently lose rows.
const MAX_LEN = 120

function clip(v: string | null): string | null {
  if (!v) return null
  const trimmed = v.trim()
  if (!trimmed) return null
  return trimmed.length > MAX_LEN ? trimmed.slice(0, MAX_LEN) : trimmed
}

/**
 * Parse utm_* params from a URL search string. Returns an empty payload
 * (all-null) if none of the four params are present.
 */
export function parseUtmFromSearch(search: string | null | undefined): UtmPayload {
  if (!search) return EMPTY
  try {
    const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
    const source = clip(params.get('utm_source'))
    const medium = clip(params.get('utm_medium'))
    const campaign = clip(params.get('utm_campaign'))
    const content = clip(params.get('utm_content'))
    if (!source && !medium && !campaign && !content) return EMPTY
    return { utm_source: source, utm_medium: medium, utm_campaign: campaign, utm_content: content }
  } catch {
    return EMPTY
  }
}

/**
 * Read the stored first-touch UTM payload from sessionStorage. Returns
 * EMPTY (all-null) if nothing is stored, on the server, or on parse error.
 * Safe to call from any context — gates internally.
 */
export function getStoredUtm(): UtmPayload {
  if (typeof window === 'undefined') return EMPTY
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<UtmPayload>
    return {
      utm_source: clip(parsed.utm_source ?? null),
      utm_medium: clip(parsed.utm_medium ?? null),
      utm_campaign: clip(parsed.utm_campaign ?? null),
      utm_content: clip(parsed.utm_content ?? null),
    }
  } catch {
    return EMPTY
  }
}

/**
 * Write a first-touch UTM payload IFF none is stored yet. First-touch wins
 * forever within the tab session; this function is a no-op on subsequent
 * calls. Returns true when a fresh write happened, false otherwise.
 */
export function setFirstTouchUtm(payload: UtmPayload): boolean {
  if (typeof window === 'undefined') return false
  try {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return false
    const hasAny =
      payload.utm_source || payload.utm_medium || payload.utm_campaign || payload.utm_content
    if (!hasAny) return false
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    return true
  } catch {
    return false
  }
}
