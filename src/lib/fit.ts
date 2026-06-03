/**
 * 2D crane fit: load × reach (Last × Reichweite).
 *
 * Why: matching on crane type + at-mast max_capacity alone misses the reach
 * dimension. A crane's capacity drops sharply with working radius (8 t at 3 m
 * → ~1 t at 12 m). Lead Greb (4 t needed at 11 m) was matched to a 2 t crane,
 * which declined → lead lost. This module estimates capacity-at-reach so the
 * pipeline can flag (warn, not auto-drop) firms that likely can't manage the
 * load at the required reach. See Dosc/AI_GEFUEHRTE_SUCHE_PLAN_2026_06_03.md.
 *
 * Coarse + conservative by design — used for WARN-level signals only, never to
 * silently drop a customer-selected firm. The precise version arrives once
 * company_cranes.max_reach_m is enriched (today ~0% populated).
 */

/** 20% safety margin on the required load (mirrors FIT_SAFETY_MARGIN in /api/leads). */
export const REACH_SAFETY_MARGIN = 1.2

export type ReachFitVerdict =
  | 'ok' // reaches + (where checkable) carries the load at that reach
  | 'reach_short' // cannot reach the required distance at all (hard)
  | 'capacity_risk' // reaches, but the load at that reach is likely too high (soft)
  | 'unknown' // not enough data (no weight / no reach / no firm capacity)

export interface ReachFitInput {
  requiredKg: number // 0 = unknown
  requiredReachM: number // 0 = unknown
  firmMaxCapKg: number | null // at-mast max, or null if unknown
  firmMaxReachM: number | null // real reach if known, else null → use type fallback
  typeMaxReachM: number // per-type envelope fallback (crane-types.ts)
}

export interface ReachFitResult {
  verdict: ReachFitVerdict
  reachOk: boolean
  /** Estimated capacity at the required reach (kg), when computable; else null. */
  capAtReachKg: number | null
}

/**
 * Linear derating from at-mast max toward ~25% at the crane's max reach,
 * floored at 15%. Chosen over a 1/r moment model, which is too steep and
 * over-flags even large cranes. Conservative but calibrated so a genuinely
 * capable crane is not flagged (validated on Greb: 2 t crane @ 11 m → flagged;
 * 8 t+ crane @ 11 m → ok).
 */
export function capacityAtReach(maxCapKg: number, requiredReachM: number, effectiveMaxReachM: number): number {
  if (effectiveMaxReachM <= 0 || requiredReachM <= 0) return maxCapKg
  const frac = Math.min(1, requiredReachM / effectiveMaxReachM)
  return maxCapKg * Math.max(0.15, 1 - 0.75 * frac)
}

export function evalReachFit(i: ReachFitInput): ReachFitResult {
  const effReach = i.firmMaxReachM ?? i.typeMaxReachM

  // Reach gate (hard): can the crane physically reach the load?
  if (i.requiredReachM > 0 && effReach > 0 && i.requiredReachM > effReach) {
    return { verdict: 'reach_short', reachOk: false, capAtReachKg: null }
  }

  // Capacity-at-reach (soft): only when we know the job's weight + reach AND
  // the firm's at-mast capacity. Otherwise we don't invent a number.
  if (i.requiredKg > 0 && i.requiredReachM > 0 && i.firmMaxCapKg != null) {
    const cap = capacityAtReach(i.firmMaxCapKg, i.requiredReachM, effReach)
    if (cap < i.requiredKg * REACH_SAFETY_MARGIN) {
      return { verdict: 'capacity_risk', reachOk: true, capAtReachKg: Math.round(cap) }
    }
    return { verdict: 'ok', reachOk: true, capAtReachKg: Math.round(cap) }
  }

  return { verdict: 'unknown', reachOk: true, capAtReachKg: null }
}
