import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { promises as dns } from 'node:dns'
import { Resend, type CreateEmailOptions } from 'resend'
import { z } from 'zod'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { signLeadResponse } from '@/lib/lead-response-sig'
import { submitLead, getCompaniesForCraneTypeNearLocation, isUnresolvedPlz, getSiteStats, type FirmMatch } from '@/lib/queries'
import { getServiceSupabase } from '@/lib/supabase'
import { MAX_COMPANY_IDS } from '@/lib/dispatch-config'
import { COUNTRY, BASE_URL, DOMAIN, BRAND_NAME, COUNTRY_LABEL } from '@/lib/country'
import { getCraneTypeNameById, getCraneMaxReachById } from '@/data/crane-types'
import { evalReachFit } from '@/lib/fit'
import { extractAddressPlz } from '@/lib/extract-plz'

// Validation helpers, added 2026-05-12 (Commit 2). Trust stamps in the
// firm-notification mail are always-on and hardcoded; the dispatch logic
// here guarantees they only ever fire for a lead that actually passed the
// stamped check. Anything else is held + alerted, not dispatched with a
// false stamp.
const emailSchema = z.string().email()

async function emailDomainHasMx(email: string): Promise<{ ok: boolean; reason?: string; soft?: boolean }> {
  const at = email.lastIndexOf('@')
  if (at < 0 || at === email.length - 1) return { ok: false, reason: 'missing_domain' }
  const domain = email.slice(at + 1).toLowerCase()
  try {
    const records = await dns.resolveMx(domain)
    if (!records || records.length === 0) return { ok: false, reason: 'no_mx_records' }
    return { ok: true }
  } catch (err) {
    const code = ((err as NodeJS.ErrnoException)?.code || 'unknown').toUpperCase()
    // ENOTFOUND / ENODATA are definitive "domain has no MX" answers from the
    // resolver — hold the lead (typo / dead domain). Everything else
    // (timeout, SERVFAIL, refused) is a resolver problem, not a verdict on
    // the domain: previously these fail-closed and held GOOD leads on a
    // flaky resolver run (2026-06-12 audit, C2). Now: one retry after 1s,
    // then fail-OPEN with a soft flag the owner mail surfaces.
    if (code === 'ENOTFOUND' || code === 'ENODATA') {
      return { ok: false, reason: `dns_${code.toLowerCase()}` }
    }
    try {
      await new Promise((r) => setTimeout(r, 1000))
      const records = await dns.resolveMx(domain)
      if (!records || records.length === 0) return { ok: false, reason: 'no_mx_records' }
      return { ok: true }
    } catch (err2) {
      const code2 = ((err2 as NodeJS.ErrnoException)?.code || 'unknown').toUpperCase()
      if (code2 === 'ENOTFOUND' || code2 === 'ENODATA') {
        return { ok: false, reason: `dns_${code2.toLowerCase()}` }
      }
      console.error(`MX check soft-pass for ${domain}: transient ${code2} after retry`)
      return { ok: true, soft: true, reason: `dns_${code2.toLowerCase()}_transient` }
    }
  }
}

function validatePhoneE164(raw: string | undefined | null): { ok: boolean; e164?: string; reason?: string } {
  const trimmed = (raw || '').trim()
  if (!trimmed) return { ok: true }  // phone is optional; empty stays empty
  const parsed = parsePhoneNumberFromString(trimmed, 'DE')
  if (!parsed) return { ok: false, reason: 'unparseable' }
  if (!parsed.isValid()) return { ok: false, reason: 'invalid_number' }
  return { ok: true, e164: parsed.format('E.164') }
}

// Must match the salt base used by /api/track so a single visitor's events
// hash identically on the same day (enables cross-event user journey queries).
const FIRM_EVENTS_SALT_BASE = 'kranvergleich-firm-events-v1'

// Resend SDK resolves with `{ data, error }` for API failures instead of
// throwing, a bare `.catch()` swallows invalid-key, unverified-domain, and
// rate-limit errors. Always inspect `error` and log it; also wrap the call
// in try/catch for SDK-level throws (network, SDK bugs). Without this,
// Resend failures look identical to success in Vercel logs.
async function sendResendEmail(
  label: string,
  options: CreateEmailOptions,
): Promise<{ ok: boolean; error?: unknown }> {
  try {
    const { error } = await getResend().emails.send(options)
    if (error) {
      console.error(`Resend ${label} error:`, error)
      return { ok: false, error }
    }
    return { ok: true }
  } catch (err) {
    console.error(`Resend ${label} threw:`, err)
    return { ok: false, error: err }
  }
}

// Lazy init, avoid instantiating at module load so builds work without env.
let resendInstance: Resend | null = null
function getResend(): Resend {
  if (!resendInstance) {
    const key = process.env.RESEND_API_KEY
    if (!key) throw new Error('RESEND_API_KEY environment variable is required')
    resendInstance = new Resend(key)
  }
  return resendInstance
}

function getNotificationEmail(): string {
  const email = process.env.NOTIFICATION_EMAIL
  if (!email) throw new Error('NOTIFICATION_EMAIL environment variable is required')
  return email
}

// Non-throwing variant, use inside the request flow so a missing env var
// doesn't short-circuit the whole lead pipeline (firms + customer confirmation
// must still go through). Logs once per missing call for ops visibility.
function getNotificationEmailOrNull(): string | null {
  const email = process.env.NOTIFICATION_EMAIL
  if (!email || !email.trim()) {
    console.error('NOTIFICATION_EMAIL env var missing or empty, owner notification skipped')
    return null
  }
  return email.trim()
}

// --- Input sanitization ---
const MAX_TEXT_LENGTH = 500

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function truncate(str: string, max = MAX_TEXT_LENGTH): string {
  return typeof str === 'string' ? str.slice(0, max) : ''
}

// Both countries send from send.kranvergleich.de. Resend Free plan caps at 1 verified
// domain. Display name puts the founder first (per Priestley/personal-brand framing,
// 2026-05-12), then the per-country brand pulled from BRAND_NAME so AT recipients
// still see a localized "KranVergleich.at" attribution. The sender mailbox stays on
// the verified send.kranvergleich.de subdomain (proven on wave 1 follow-up, 23/23
// delivered). Switch the AT mailbox to send.kranvergleich.at once Pro plan is live.
const FROM_EMAIL = `Christoph Jonetzko · ${BRAND_NAME} <christoph@send.kranvergleich.de>`

// --- Rate limiting: max 5 requests per minute per IP ---
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const ipRequestLog = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = ipRequestLog.get(ip) ?? []
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  recent.push(now)
  ipRequestLog.set(ip, recent)
  // Clean up old entries periodically
  if (ipRequestLog.size > 10_000) {
    for (const [key, val] of ipRequestLog) {
      if (val.every((t) => now - t > RATE_LIMIT_WINDOW_MS)) ipRequestLog.delete(key)
    }
  }
  return recent.length > RATE_LIMIT_MAX
}

export async function POST(request: Request) {
  try {
    // Rate limit by IP, prefer CF-Connecting-IP (Cloudflare sets authoritatively, can't be spoofed)
    const ip =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut.' },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Honeypot: if the hidden field is filled, it's a bot
    if (body.website_url) {
      // Silently accept but do nothing, bots think it worked
      return NextResponse.json({ success: true, id: 'ok' })
    }

    // Dry-run mode: lead is persisted and owner/customer emails fire normally,
    // but firm-facing emails + firm_events + lead_companies.sent_at are all
    // skipped. Used to verify the delivery pipeline without spamming real
    // construction companies with repeated test requests. Guarded to prevent
    // accidental dry-runs from the main UI flow.
    const dryRun = body.dry_run === true

    // Callback flow (Rückruf anfordern, 2026-06-10, mig 038): a lead may
    // arrive with a phone number instead of an email. DSGVO consent is always
    // required; the contact channel is email OR (callback_request + phone).
    // The phone is hard-validated below because it is the only way back to
    // the customer in this flow.
    const isCallbackRequest = body.callback_request === true

    // Validate required fields
    if (!body.dsgvo_consent || (!body.customer_email && !isCallbackRequest)) {
      return NextResponse.json(
        { error: 'E-Mail und DSGVO-Zustimmung sind erforderlich.' },
        { status: 400 }
      )
    }

    // Email format check via zod (replaces the prior bespoke regex). Hard
    // 400 here, a malformed address has no MX path forward and the customer
    // typo is the most likely cause; let them retry on the form.
    if (body.customer_email && !emailSchema.safeParse(body.customer_email).success) {
      return NextResponse.json(
        { error: 'Ungültige E-Mail-Adresse.' },
        { status: 400 }
      )
    }

    // MX + phone gates, added 2026-05-12 (Commit 2). Format check above can
    // pass a typo like gmial.com; MX check verifies the domain actually
    // accepts mail. Phone is optional, but if present must parse to a valid
    // E.164. A FAIL on either does NOT 400 the client (the customer already
    // believes their data is fine); we save the lead, hold dispatch, alert
    // the owner, and tell the customer "wir prüfen und melden uns" so they
    // don't double-submit. Owner decides retry/contact/skip by hand.
    const mxCheck = body.customer_email
      ? await emailDomainHasMx(body.customer_email)
      : { ok: true as const, reason: 'callback_no_email' }
    const phoneCheck = validatePhoneE164(body.customer_phone)
    // Email-less callback lead with a phone that doesn't parse → hard 400.
    // Unlike the soft-hold path below there is no second channel to recover
    // through, and the typo is fixable right now on the form.
    if (isCallbackRequest && !body.customer_email && !phoneCheck.ok) {
      return NextResponse.json(
        { error: 'Bitte geben Sie eine gültige Telefonnummer an.' },
        { status: 400 }
      )
    }
    const validationFailed = !mxCheck.ok || !phoneCheck.ok
    // Transient-resolver soft-pass: lead dispatches normally, but the firm
    // mail's trust stamp drops the Domain-Check claim and the owner mail
    // carries a note (C2, 2026-06-12).
    const mxSoft = mxCheck.ok && mxCheck.soft === true
    const validationReasons: string[] = []
    if (!mxCheck.ok) validationReasons.push(`mx:${mxCheck.reason}`)
    if (!phoneCheck.ok) validationReasons.push(`phone:${phoneCheck.reason}`)
    // When the phone parsed successfully, canonicalise to E.164 so every
    // downstream consumer (firm mail, owner mail, CSV exports, future
    // signal-back loop) sees the same shape.
    if (phoneCheck.ok && phoneCheck.e164) body.customer_phone = phoneCheck.e164

    // AI auto-categorize when crane_type_id is missing but the description
    // has substance (mig A of the 2026-05-20 A+B+C+D sprint). Defense-in-
    // depth after the form-layer C fix (LeadForm requires crane type when
    // craneTypeId prop is missing): catches future forms that forget to set
    // the prop, direct API calls bypassing the UI, and any path where the
    // customer typed enough specs in the description to be classified.
    //
    // Confidence threshold 0.8, below that we leave crane_type_id NULL and
    // fall through to the manual 🚨 LEAD OHNE ANBIETER alert. Better that
    // owner reviews a vague lead than auto-route based on a guess.
    //
    // DSGVO: within original consent. The Datenschutzerklärung promises
    // forwarding to "passende Anbieter"; AI categorization is the system
    // determining which firms are "passend", same logical step as the
    // existing auto_select_nearest based on a user-picked type.
    let aiInferredCraneType = false
    let aiCategorizeReasoning: string | null = null
    if (
      !body.crane_type_id
      && typeof body.project_description === 'string'
      && body.project_description.trim().length >= 20
    ) {
      try {
        const { runCategorize } = await import('@/lib/ai-helper')
        const cat = await runCategorize(body.project_description.trim())
        if (cat.type_slug && cat.confidence >= 0.8) {
          const sb = getServiceSupabase()
          const { data: ct } = await sb
            .from('crane_types')
            .select('id')
            .eq('slug', `${cat.type_slug}-mieten`)
            .maybeSingle()
          if (ct?.id) {
            body.crane_type_id = ct.id
            aiInferredCraneType = true
            aiCategorizeReasoning = cat.reasoning
            console.log(
              `[api/leads] AI inferred crane_type=${cat.type_slug} confidence=${cat.confidence.toFixed(2)} reasoning="${cat.reasoning}"`,
            )
          }
        } else {
          console.log(
            `[api/leads] AI categorize: low confidence (${cat.confidence.toFixed(2)}) for type="${cat.type_slug}", leaving crane_type_id NULL`,
          )
        }
      } catch (err) {
        console.warn('[api/leads] AI categorize failed (non-fatal):', err)
        // Fall through, normal NULL crane_type behavior, owner reviews manually.
      }
    }

    // Auto-select nearest firms when client requests it (cost calculator flow
    //, user doesn't see a firm list, we pick for them based on craneType +
    // location). Skipped when client already supplied `company_ids` explicitly.
    // `location` accepts either a 5-digit PLZ or a city name; `plz` is kept
    // as a backwards-compat alias for older clients still sending that field.
    // On validation fail we hold dispatch entirely, even an explicit
    // client-supplied company_ids list is dropped so no firm receives a
    // mail tied to an unverified contact.
    let companyIds: string[] = validationFailed
      ? []
      : Array.isArray(body.company_ids) ? body.company_ids.slice(0, MAX_COMPANY_IDS) : []
    let autoSelectedRadiusKm: number | null = null
    let autoSelectedResolvedLabel: string | null = null
    let autoSelectedMatches: FirmMatch[] | null = null
    const locationField: string | null =
      (typeof body.location === 'string' && body.location.trim()) ||
      (typeof body.plz === 'string' && body.plz.trim()) ||
      null
    // Prefer a postal code stated in the project description over a free-text
    // city in the "Stadt / PLZ" field. Customers routinely type a nearby big
    // city there while the real Einsatzort (with PLZ) sits only in the
    // description — lead Waldemar 2026-06-09: field "Hamburg", description
    // "23554 Lübeck" → was dispatched to Hamburg. We override only when the
    // field is NOT already a PLZ and the description yields exactly ONE
    // resolvable address PLZ. Ambiguous (≥2 PLZ) or field-PLZ-vs-different-text
    // cases keep the field and raise an owner flag instead of guessing.
    const plzPrefixRe = COUNTRY === 'AT' ? /^\s*\d{4}\b/ : /^\s*\d{5}\b/
    const fieldHasPlz = !!(locationField && plzPrefixRe.test(locationField))
    const descPlzCandidates: string[] = []
    if (typeof body.project_description === 'string') {
      for (const cand of extractAddressPlz(body.project_description, COUNTRY === 'AT' ? 'AT' : 'DE')) {
        if (!descPlzCandidates.includes(cand) && !(await isUnresolvedPlz(cand))) {
          descPlzCandidates.push(cand)
        }
      }
    }
    let locationInput: string | null = locationField
    // Owner-alert payload: set when routing location was auto-corrected from the
    // description, or when the location signals are ambiguous and need a human.
    let standortCorrection:
      | { field: string | null; usedPlz: string | null; ambiguous: string[] }
      | null = null
    if (!fieldHasPlz && descPlzCandidates.length === 1) {
      // Single clear address PLZ in the text beats a free-text city → auto-correct.
      locationInput = descPlzCandidates[0]
      standortCorrection = { field: locationField, usedPlz: descPlzCandidates[0], ambiguous: [] }
    } else if (descPlzCandidates.length >= 2) {
      // Multiple distinct places in the text → don't guess, route by field + flag.
      standortCorrection = { field: locationField, usedPlz: null, ambiguous: descPlzCandidates }
    } else if (
      fieldHasPlz &&
      descPlzCandidates.length === 1 &&
      !(locationField ?? '').includes(descPlzCandidates[0])
    ) {
      // User typed a PLZ but the description names a different one → keep the
      // explicit field PLZ, flag the discrepancy for manual review.
      standortCorrection = { field: locationField, usedPlz: null, ambiguous: descPlzCandidates }
    }
    if (
      !validationFailed &&
      companyIds.length === 0 &&
      body.auto_select_nearest === true &&
      typeof body.crane_type_id === 'string' &&
      locationInput
    ) {
      try {
        const result = await getCompaniesForCraneTypeNearLocation(body.crane_type_id, locationInput, {
          limit: MAX_COMPANY_IDS,
        })
        if (result && result.matches.length > 0) {
          companyIds = result.matches.map((m) => m.company.id)
          autoSelectedRadiusKm = result.radius_used_km
          autoSelectedResolvedLabel = result.resolved_label
          autoSelectedMatches = result.matches
        }
      } catch (err) {
        console.error('auto_select_nearest lookup failed:', err)
        // Fall through, lead still gets saved without company_ids, owner handles manually.
      }
    }

    // Guard: foreign / mistyped PLZ. When the auto-select flow found no firms
    // because the location is a syntactically valid PLZ that maps to no city in
    // our dataset (e.g. French "57600" Forbach, ~7 km from Saarbrücken, or a
    // typo), tell the customer to check their input instead of silently
    // creating a 0-firm "LEAD OHNE ANBIETER" that is lost unless manually
    // rescued (lead 6c7bd92c, 2026-05-29). Fires only on the auto-select flow;
    // explicit /anbieter company_ids and genuine coverage gaps (PLZ resolves
    // but no firm of that type nearby) keep their existing behavior.
    if (
      !validationFailed &&
      body.auto_select_nearest === true &&
      companyIds.length === 0 &&
      locationInput &&
      (await isUnresolvedPlz(locationInput))
    ) {
      return NextResponse.json(
        {
          error:
            `Wir konnten „${locationInput}“ keinem Ort in ${COUNTRY_LABEL} zuordnen. ` +
            `Bitte prüfen Sie Ihre Postleitzahl. Hinweis: Wir vermitteln aktuell ausschließlich ` +
            `Kranbetriebe in Deutschland und Österreich.`,
          code: 'location_unresolved',
        },
        { status: 422 },
      )
    }

    // Truncate text fields
    const city = truncate(body.city || '')
    const customerName = truncate(body.customer_name || '')
    const customerPhone = truncate(body.customer_phone || '', 30)
    // NULL (not '') when the callback flow arrives without an email — the DB
    // column is nullable since mig 038 and downstream display code branches
    // on the null.
    const customerEmail: string | null = body.customer_email
      ? truncate(body.customer_email, 254)
      : null
    const projectDescription = truncate(
      body.project_description || (isCallbackRequest ? 'Rückruf angefordert' : ''),
      2000,
    )
    const preferredDate = truncate(body.preferred_date || '', 20)
    const durationDays = typeof body.duration_days === 'number' ? Math.min(Math.max(0, Math.round(body.duration_days)), 3650) : null

    // Capacity hint extraction, scans the customer's project description for
    // "X t" / "X Tonnen" / "X kg" mentions and raises an owner-side spec-check
    // alert when ≥3t is detected. The 3t threshold covers the boundary between
    // Schnellmontage class (max ~2-2.5t, dominates the catalog for small/medium
    // Bavarian/Franconian firms) and real Turmdrehkran/Obendreher territory
    // needed for Mehrfamilienhaus Neubau projects. Surfaced after lead
    // 54403ab6 (Greb, 4t @ 11m for Mehrfamilienhaus  matched on Baukran tag
    // to Uebel whose Potain HD 21A maxes at 2t @ 12m). Soft alert, not a hard
    // block: company_cranes.max_capacity_kg is only 1.1% populated catalog-wide,
    // so an auto-filter would false-positive constantly. Owner reviews the
    // banner + subject prefix and decides whether to manually reroute via
    // the opt-in pattern (see scripts/send_optin_greb.py).
    const CAPACITY_HINT_THRESHOLD_KG = 3000
    const TONNE_RE = /(\d+(?:[,.]\d+)?)\s*(?:tonnen?|to|t)\b/gi
    const KG_RE = /(\d+(?:[,.]\d+)?)\s*kg\b/gi
    let capacityHintKg = 0
    for (const m of projectDescription.matchAll(TONNE_RE)) {
      const n = parseFloat(m[1].replace(',', '.'))
      if (Number.isFinite(n)) capacityHintKg = Math.max(capacityHintKg, n * 1000)
    }
    for (const m of projectDescription.matchAll(KG_RE)) {
      const n = parseFloat(m[1].replace(',', '.'))
      if (Number.isFinite(n)) capacityHintKg = Math.max(capacityHintKg, n)
    }
    const highSpecAlert = capacityHintKg >= CAPACITY_HINT_THRESHOLD_KG
    const capacityHintFormatted = capacityHintKg >= 1000
      ? `${(capacityHintKg / 1000).toFixed(1).replace(/\.0$/, '')} t`
      : `${Math.round(capacityHintKg)} kg`

    // Reach/height hint: largest metre value the load must span (Auslage OR
    // Hubhöhe). Coarse proxy for the 2D fit (Last × Reichweite). `m²`/`qm` are
    // excluded so "120 m²" doesn't read as 120 m reach. Feeds the owner-side
    // reach flag (lead Greb: 4 t @ 11 m → 2 t firm was undersized at radius).
    const REACH_RE = /(\d+(?:[,.]\d+)?)\s*m(?:tr|eter)?\b(?!\s*²|2|q)/gi
    let reachHintM = 0
    for (const m of projectDescription.matchAll(REACH_RE)) {
      const n = parseFloat(m[1].replace(',', '.'))
      if (Number.isFinite(n) && n <= 120) reachHintM = Math.max(reachHintM, n)
    }
    const typeMaxReachM = body.crane_type_id ? (getCraneMaxReachById(body.crane_type_id) ?? 0) : 0

    // Glass-handling hint: the customer mentions glass / pane / window lifting or
    // a vacuum lifter (Glassauger / Saugnapf). Used to flag selected firms without
    // a documented Glassauger so the owner can add glass-capable specialists
    // (surfaced by lead fd252b30, Werres — a 700 kg pane needing a vacuum lifter).
    const GLASS_RE = /\b(glas|verglas|scheibe|fenster|saugnapf|saugkn(?:ö|oe|o)pf|glassauger|vakuumheb)/i
    const needsGlass = GLASS_RE.test(projectDescription)

    // Fit-check (D of the A+B+C+D auto-recovery sprint). Compare the extracted
    // capacity_hint_kg against each auto-matched firm's company_cranes.max_
    // capacity_kg for the matched crane_type_id. A firm is "undersized" when
    // its declared max is below capacity_hint_kg × 1.2 (20% safety margin 
    // covers minor rounding / mid-class equipment a firm might pull in from
    // partners). Firms whose company_crane row has NULL max_capacity_kg are
    // "unverified" and remain in dispatch (the 1.1% coverage caveat from the
    // Greb 2026-05-19 audit, we can't filter on data we don't have).
    //
    // Conservative: we DO NOT auto-filter undersized firms here (data too
    // sparse to be reliable). Instead the result feeds the owner-notification
    // SPEC CHECK banner so Christoph reviews before firm dispatch happens.
    // Tightening to auto-filter requires raising company_cranes coverage
    // first (separate ops initiative).
    const FIT_SAFETY_MARGIN = 1.2
    const undersizedFirms: Array<{ name: string; max_capacity_kg: number }> = []
    let unverifiedFirmCount = 0
    // Glass fit (listing flow): selected firms with no documented Glassauger when
    // the project needs one. Soft signal — has_glass_sucker coverage is sparse, so
    // a "no glass" firm may simply be undocumented; never auto-dropped, only flagged.
    const noGlassFirms: string[] = []
    let glassCapableCount = 0
    // Reach fit (2D Last × Reichweite, listing flow): firms that cannot reach the
    // required distance (hard) or are likely undersized AT that reach (soft).
    // Coarse warn via lib/fit.ts — owner reviews, never auto-dropped.
    const reachShortFirms: string[] = []
    const capacityRiskFirms: Array<{ name: string; cap_at_reach_kg: number }> = []
    if ((capacityHintKg > 0 || reachHintM > 0) && autoSelectedMatches && body.crane_type_id) {
      const requiredCapacityKg = capacityHintKg * FIT_SAFETY_MARGIN
      for (const m of autoSelectedMatches) {
        const cranesForType = (m.company.company_cranes ?? []).filter(
          (cc: { crane_type_id: string }) => cc.crane_type_id === body.crane_type_id,
        )
        const maxCapKg = cranesForType.reduce<number | null>((acc, cc: { max_capacity_kg: number | null }) => {
          if (cc.max_capacity_kg == null) return acc
          return acc == null ? cc.max_capacity_kg : Math.max(acc, cc.max_capacity_kg)
        }, null)
        if (capacityHintKg > 0) {
          if (maxCapKg == null) unverifiedFirmCount += 1
          else if (maxCapKg < requiredCapacityKg) undersizedFirms.push({ name: m.company.name, max_capacity_kg: maxCapKg })
        }
        if (reachHintM > 0) {
          const firmReach = cranesForType.reduce<number | null>((acc, cc: { max_reach_m: number | null }) => {
            if (cc.max_reach_m == null) return acc
            return acc == null ? cc.max_reach_m : Math.max(acc, cc.max_reach_m)
          }, null)
          const rf = evalReachFit({ requiredKg: capacityHintKg, requiredReachM: reachHintM, firmMaxCapKg: maxCapKg, firmMaxReachM: firmReach, typeMaxReachM })
          if (rf.verdict === 'reach_short') reachShortFirms.push(m.company.name)
          else if (rf.verdict === 'capacity_risk' && rf.capAtReachKg != null) capacityRiskFirms.push({ name: m.company.name, cap_at_reach_kg: rf.capAtReachKg })
        }
      }
    }
    // fitCheckRan / hasUndersizedMatches / glassMismatch are finalised after the
    // listing-flow fit-check in the defensive-filter block below, so the
    // auto-select and listing paths feed the same fit signals.

    // entry_path: client sends the first URL of the session from sessionStorage
    // (see SessionEntryRecorder). Validate against the same regex /api/beacon
    // uses for page_path so junk / open-redirect-style values are dropped.
    const PATH_RE = /^\/[a-z0-9/_.-]{0,120}$/i
    const rawEntry = typeof body.entry_path === 'string' ? body.entry_path : null
    const entryPath = rawEntry && PATH_RE.test(rawEntry) ? rawEntry : null

    // city_context / type_context: slug-like context tags forwarded to the
    // firm_events form_submit rows so reports can answer "this lead came from
    // /autokran-mieten/berlin" without joining back to leads.
    const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,63}$/
    const sanitizeSlug = (v: unknown): string | null =>
      typeof v === 'string' && SLUG_RE.test(v.trim()) ? v.trim() : null
    const cityContext = sanitizeSlug(body.city_context)
    const typeContext = sanitizeSlug(body.type_context)

    // Defensive filter: drop firms BEFORE persisting the lead when they fail
    // any of four gates, irrelevant/inactive (is_relevant=false or is_active=
    // false, hidden from frontend lists and the catalog), email-less (no
    // Resend target), or test-flagged ("(TEST)" suffix in name). Frontend
    // already hides each of these cases (queries.ts adds .eq('is_active',
    // true).eq('is_relevant', true) to every list query; the auto-select
    // path inherits the same filter). This catches stale client state,
    // forged requests, and the case where a firm was hidden after a user
    // already loaded the form, so their submission carries a now-stale ID.
    // The klickrent reply on 2026-05-12 surfaced this exact path for Kara's
    // lead from 2026-04-23.
    const TEST_NAME_RE = /\(test\)/i
    let droppedNoEmail: { id: string; name: string }[] = []
    let droppedIrrelevant: { id: string; name: string; is_active: boolean; is_relevant: boolean }[] = []
    let droppedTestFlagged: { id: string; name: string }[] = []
    if (companyIds.length > 0) {
      const sb = getServiceSupabase()
      const { data: lookup } = await sb
        .from('companies')
        .select('id, name, email, is_active, is_relevant, company_cranes(crane_type_id, max_capacity_kg, max_reach_m, has_glass_sucker)')
        .in('id', companyIds)
      const validIds = new Set<string>()
      type KeptFirm = { name: string; company_cranes: Array<{ crane_type_id: string; max_capacity_kg: number | null; max_reach_m: number | null; has_glass_sucker: boolean | null }> }
      const keptForFit: KeptFirm[] = []
      for (const c of lookup ?? []) {
        if (!c.is_active || !c.is_relevant) {
          droppedIrrelevant.push({ id: c.id, name: c.name, is_active: c.is_active, is_relevant: c.is_relevant })
          continue
        }
        if (TEST_NAME_RE.test(c.name)) {
          droppedTestFlagged.push({ id: c.id, name: c.name })
          continue
        }
        if (c.email && c.email.trim() !== '???') {
          validIds.add(c.id)
          keptForFit.push({ name: c.name, company_cranes: c.company_cranes ?? [] })
        } else droppedNoEmail.push({ id: c.id, name: c.name })
      }
      if (droppedNoEmail.length > 0 || droppedIrrelevant.length > 0 || droppedTestFlagged.length > 0) {
        companyIds = companyIds.filter((id) => validIds.has(id))
      }
      // Listing-flow fit-check (B). The auto-select path already evaluated its
      // matches above; this covers the normal listing / InquiryBar path (explicit
      // company_ids), which previously got NO fit-check at all (leads Werres,
      // Maurer). Conservative, positive-evidence only: NULL capacity = unverified
      // (never undersized), glass-less firm may just be undocumented. Warn the
      // owner, never auto-drop (coverage too sparse to be reliable).
      if (!autoSelectedMatches && body.crane_type_id && (capacityHintKg > 0 || needsGlass || reachHintM > 0)) {
        const requiredCapacityKg = capacityHintKg * FIT_SAFETY_MARGIN
        for (const f of keptForFit) {
          const forType = f.company_cranes.filter((cc) => cc.crane_type_id === body.crane_type_id)
          const maxCapKg = forType.reduce<number | null>((acc, cc) => {
            if (cc.max_capacity_kg == null) return acc
            return acc == null ? cc.max_capacity_kg : Math.max(acc, cc.max_capacity_kg)
          }, null)
          if (capacityHintKg > 0) {
            if (maxCapKg == null) unverifiedFirmCount += 1
            else if (maxCapKg < requiredCapacityKg) undersizedFirms.push({ name: f.name, max_capacity_kg: maxCapKg })
          }
          if (reachHintM > 0) {
            const firmReach = forType.reduce<number | null>((acc, cc) => {
              if (cc.max_reach_m == null) return acc
              return acc == null ? cc.max_reach_m : Math.max(acc, cc.max_reach_m)
            }, null)
            const rf = evalReachFit({ requiredKg: capacityHintKg, requiredReachM: reachHintM, firmMaxCapKg: maxCapKg, firmMaxReachM: firmReach, typeMaxReachM })
            if (rf.verdict === 'reach_short') reachShortFirms.push(f.name)
            else if (rf.verdict === 'capacity_risk' && rf.capAtReachKg != null) capacityRiskFirms.push({ name: f.name, cap_at_reach_kg: rf.capAtReachKg })
          }
          if (needsGlass) {
            if (f.company_cranes.some((cc) => cc.has_glass_sucker === true)) glassCapableCount += 1
            else noGlassFirms.push(f.name)
          }
        }
      }
    }

    const fitCheckRan = (capacityHintKg > 0 || needsGlass || reachHintM > 0) &&
      ((autoSelectedMatches?.length ?? 0) > 0 || companyIds.length > 0)
    const hasUndersizedMatches = undersizedFirms.length > 0
    const glassMismatch = needsGlass && noGlassFirms.length > 0
    const reachMismatch = reachHintM > 0 && (reachShortFirms.length > 0 || capacityRiskFirms.length > 0)

    // UTM attribution (mig 027). Clip every value to 120 chars so a forged
    // URL can't bloat the column. NULL on absence, that's the expected
    // case for organic / direct entry.
    const clipUtm = (v: unknown): string | null => {
      if (typeof v !== 'string') return null
      const trimmed = v.trim()
      if (!trimmed) return null
      return trimmed.length > 120 ? trimmed.slice(0, 120) : trimmed
    }
    const utmSource = clipUtm(body.utm_source)
    const utmMedium = clipUtm(body.utm_medium)
    const utmCampaign = clipUtm(body.utm_campaign)
    const utmContent = clipUtm(body.utm_content)

    const lead = await submitLead({
      crane_type_id: body.crane_type_id || null,
      city,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail,
      project_description: projectDescription,
      preferred_date: preferredDate || null,
      duration_days: durationDays,
      dsgvo_consent: body.dsgvo_consent,
      company_ids: companyIds,
      entry_path: entryPath,
      radius_used_km: autoSelectedRadiusKm,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
    })

    // Escape all user input for HTML emails
    const safeName = escapeHtml(customerName) || '–'
    const safeEmail = customerEmail ? escapeHtml(customerEmail) : '–'
    // Email table cell for firm/owner mails: mailto link when we have an
    // address, otherwise an explicit callback note so the firm knows the
    // phone is the only channel.
    const emailCellHtml = customerEmail
      ? `<a href="mailto:${safeEmail}">${safeEmail}</a>`
      : '– <em>(keine E-Mail, Kunde bittet um Rückruf)</em>'
    const safePhone = escapeHtml(customerPhone) || '–'
    const safeCity = escapeHtml(city) || '–'
    const safeDate = escapeHtml(preferredDate) || '–'
    const safeDesc = escapeHtml(projectDescription)
    const companyCount = companyIds.length

    // Look up crane type name so firm emails can show "Krantyp: Autokran"
    //, the single most important piece of info for a firm to triage a lead.
    let craneTypeName: string | null = null
    if (body.crane_type_id) {
      const sb = getServiceSupabase()
      const { data: ct } = await sb
        .from('crane_types')
        .select('name')
        .eq('id', body.crane_type_id)
        .maybeSingle()
      craneTypeName = ct?.name ?? null
    }
    const safeCraneType = craneTypeName ? escapeHtml(craneTypeName) : null

    // Crane-type mismatch hint: if the customer's project_description mentions a
    // crane type different from the one they picked in the form, surface it to
    // the receiving firm so they don't read the table-vs-body contradiction
    // as a marketing pitch (Kara's 2026-04-23 lead. DB shows Ladekran, project
    // text says "Autokran", was misread by 4K-Vierke Bau as a portal pitch,
    // 2026-05-12 reply). Many of these pairs are colloquial synonyms in the
    // 4-6t Mobilkran segment, but flagging them lets the firm make the call.
    const CRANE_KEYWORDS: Array<[string, RegExp]> = [
      ['Autokran', /\bautokran\b/i],
      ['Mobilkran', /\bmobilkran\b/i],
      ['Ladekran', /\bladekran\b/i],
      ['Minikran', /\bminikran\b/i],
      ['Baukran', /\bbaukran\b/i],
      ['Turmdrehkran', /\bturm(drehkran|kran)\b/i],
      ['Dachdeckerkran', /\bdachdecker(kran)?\b/i],
      ['Raupenkran', /\braupenkran\b/i],
      ['Anhängerkran', /\banh(ä|a)nger(kran)?\b/i],
    ]
    let craneTypeMismatchHint: string | null = null
    if (craneTypeName && projectDescription) {
      for (const [name, regex] of CRANE_KEYWORDS) {
        if (name === craneTypeName) continue
        if (regex.test(projectDescription)) {
          craneTypeMismatchHint = name
          break
        }
      }
    }
    const safeMismatchHint = craneTypeMismatchHint ? escapeHtml(craneTypeMismatchHint) : null

    // Long-rental + mobile-crane → Baukran candidate. A 30+ day continuous rental
    // of an Autokran/Mobilkran is usually far costlier than a Turmdrehkran for
    // the same multi-week job (our own categorize heuristic: ≥30 Tage → baukran).
    // The customer picked the type explicitly, so categorize never ran and the
    // keyword mismatch hint won't catch it (the description rarely says
    // "Baukran"). Soft owner flag only — surfaced by lead dd22ad37 (Bsoul, 30 Tage
    // Autokran für Fertigteil-EFH). Owner clarifies Bautage vs Kran-Tage.
    const LONG_RENTAL_DAYS = 30
    const baukranCandidate =
      typeof durationDays === 'number' &&
      durationDays >= LONG_RENTAL_DAYS &&
      (craneTypeName === 'Autokran' || craneTypeName === 'Mobilkran')

    // Compact "27.04." date for the subject line. date-fns isn't in the stack
    // (verified 2026-05-12) so we format manually. Falls back to null when
    // preferredDate is empty or unparseable; subject builder filters nulls.
    const dateShort = (() => {
      if (!preferredDate) return null
      const d = new Date(preferredDate)
      if (Number.isNaN(d.getTime())) return null
      return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.`
    })()
    const subjectParts = [craneTypeName || 'Kran', city || null, dateShort].filter((p): p is string => Boolean(p))
    const firmSubject = isCallbackRequest
      ? `📞 Rückruf-Anfrage: ${subjectParts.join(' · ')}`
      : `Neue Anfrage: ${subjectParts.join(' · ')}`

    // Dispatch shape for the receiving firm:
    //   - Sammelanfrage: the lead went to >1 supplier in parallel; copy
    //     surfaces the "wer zuerst reagiert, gewinnt" oversubscribed framing.
    //   - Exclusive: single-firm dispatch; copy says "der Kunde hat Sie gewählt".
    // The numeric `otherSuppliersCount` excludes the receiving firm itself,
    // so a 7-firm Sammelanfrage shows "an 6 weitere Anbieter" to each.
    const isSammelanfrage = companyIds.length > 1
    const otherSuppliersCount = Math.max(0, companyIds.length - 1)

    // Catalog size for the "Über KranVergleich.de" mini-pitch. Pulled live so
    // the copy stays honest as the firm count grows (or shrinks after cleanup
    //, mig 017-021 dropped 79 firms on 2026-05-06). Memory
    // feedback_dach_geographic_precision: claim only what the catalog covers
    // (currently DE + AT, zero CH; "DACH" overshoot is a credibility-killer).
    const siteStats = await getSiteStats().catch(() => ({ anbieterCount: 0 }))
    const anbieterCount = siteStats.anbieterCount

    // Founder signature, env-driven so the name can be rotated without a
    // code change once the team grows. Fallbacks keep the mail well-formed
    // even when the Vercel env vars haven't been wired yet (Person schema
    // on /ueber-uns already names Christoph Jonetzko as Gründer, so the
    // default matches that public identity).
    const founderName = process.env.KRANVERGLEICH_FOUNDER_NAME || 'Christoph Jonetzko'
    const founderEmail = process.env.KRANVERGLEICH_FOUNDER_EMAIL || 'christoph@kranvergleich.de'
    const safeFounderName = escapeHtml(founderName)
    const safeFounderEmail = escapeHtml(founderEmail)

    // Fetch selected companies (same shape as before; companyIds is now
    // pre-filtered, so all rows have email, `companiesWithoutEmail` stays
    // for backwards compat with downstream branches but is always empty).
    let selectedCompanies: { id: string; name: string; email: string | null }[] = []
    if (companyIds.length > 0) {
      const sb = getServiceSupabase()
      const { data } = await sb
        .from('companies')
        .select('id, name, email')
        .in('id', companyIds)
      selectedCompanies = data ?? []
    }
    const companiesWithEmail = selectedCompanies.filter((c) => c.email)
    const companiesWithoutEmail = selectedCompanies.filter((c) => !c.email)

    // Log a firm_events row per selected company. Server-side (not a client
    // beacon) because this is the most important conversion signal and must
    // not be lost to navigation/beacon failure. Fire-and-forget, never block
    // the lead response on tracking. See migration 007.
    if (companyIds.length > 0 && !dryRun) {
      const eventDate = new Date().toISOString().slice(0, 10)
      const ipHash = createHash('sha256')
        .update(`${ip}|${eventDate}|${FIRM_EVENTS_SALT_BASE}`)
        .digest('hex')
      const rows = companyIds.map((firmId) => ({
        firm_id: firmId,
        event_type: 'form_submit',
        city_context: cityContext,
        type_context: typeContext,
        ip_hash: ipHash,
        event_date: eventDate,
      }))
      getServiceSupabase()
        .from('firm_events')
        .upsert(rows, {
          onConflict: 'firm_id,ip_hash,event_type,event_date',
          ignoreDuplicates: true,
        })
        .then(({ error }) => {
          if (error) console.error('firm_events form_submit insert error:', error)
        })
    }

    // Per-company email template. Defined before sending so the same HTML is
    // reused by every firm email and (if needed) a retry script.
    //
    // Framing rewritten 2026-05-12: previously opened with "Neue Anfrage über
    // KranVergleich.de" + "ein potenzieller Kunde hat über KranVergleich.de
    // eine Anfrage an Sie gesendet". 4K-Vierke Bau read that as a portal
    // outbound pitch and ignored Kara's real lead from 2026-04-23. New framing
    // leads with the customer's intent (crane type + city + date in the h2),
    // puts the firm's action, "Sie wurden ausgewählt", first, and demotes
    // the portal name to attribution.
    const headlineCity = safeCity !== '–' ? safeCity : null
    const headlineDate = safeDate !== '–' ? safeDate : null
    const headlineBits = [safeCraneType || 'Kran', headlineCity, headlineDate].filter(Boolean)
    const headline = `Kundenanfrage: ${headlineBits.join(' · ')}`
    const buildCompanyEmailHtml = (
      companyName: string,
      ctaUrls: { accept: string; decline: string },
    ) => `
            <div style="font-family:system-ui;max-width:560px;">
              <h2 style="font-size:18px;color:#1a1a1a;">${headline}</h2>
              <p style="color:#4b5563;font-size:14px;line-height:1.6;margin:0 0 6px 0;">
                Sehr geehrtes Team von <strong>${escapeHtml(companyName)}</strong>,
              </p>
              <p style="color:#4b5563;font-size:14px;line-height:1.6;">
                ein Kunde hat Sie auf ${BRAND_NAME} ausgewählt und sucht ein Angebot für sein Projekt:
              </p>
              ${safeDesc ? `<p style="margin:16px 0;padding:12px;background:#f9fafb;border-radius:6px;font-size:14px;line-height:1.5;"><strong>Projektbeschreibung:</strong><br>${safeDesc}</p>` : ''}
              <table style="border-collapse:collapse;font-size:14px;margin:16px 0;width:100%;">
                ${safeCraneType ? `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Krantyp</td><td><strong>${safeCraneType}</strong></td></tr>` : ''}
                <tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Name</td><td><strong>${safeName}</strong></td></tr>
                <tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">E-Mail</td><td>${emailCellHtml}</td></tr>
                ${safePhone !== '–' ? `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Telefon</td><td>${safePhone}</td></tr>` : ''}
                <tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Stadt</td><td>${safeCity}</td></tr>
                ${safeDate !== '–' ? `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Wunschtermin</td><td>${safeDate}</td></tr>` : ''}
                ${durationDays ? `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Mietdauer</td><td>${durationDays} ${durationDays === 1 ? 'Tag' : 'Tage'}</td></tr>` : ''}
              </table>
              <!--
                Trust stamp row, always rendered, never prop-gated. Dispatch
                logic (the MX + phone gates in /api/leads, plus the documented
                DSGVO consent column on leads) guarantees every dispatched
                lead has all three checks passed. Stamp wording is concrete
                (what we actually do), not buzzwordy ("validated").
              -->
              <p style="margin:8px 0 16px 0;padding:8px 0;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;font-size:12px;color:#4b5563;line-height:1.5;">
                <span style="color:#059669;">&#10003;</span> E-Mail-Adresse geprüft (${mxSoft ? 'Format' : 'Format + Domain-Check'})
                &nbsp;&middot;&nbsp;
                <span style="color:#059669;">&#10003;</span> Telefonnummer geprüft (libphonenumber)
                &nbsp;&middot;&nbsp;
                <span style="color:#059669;">&#10003;</span> DSGVO-konforme Einwilligung dokumentiert
              </p>
              ${safeMismatchHint && safeCraneType ? `<p style="margin:8px 0;padding:8px 12px;background:#fffbeb;border:1px solid #fde68a;border-radius:6px;font-size:13px;color:#78350f;">Hinweis: Im Projekttext nennt der Kunde &bdquo;${safeMismatchHint}&ldquo;, bei der Krantyp-Auswahl wurde &bdquo;${safeCraneType}&ldquo; gewählt. In vielen Fällen sind beide Begriffe austauschbar; bei abweichender Tragklasse bitte vor Angebotserstellung nachfragen.</p>` : ''}
              <p style="font-size:14px;color:#4b5563;">Bitte antworten Sie direkt auf diese E-Mail oder kontaktieren Sie den Kunden über die oben genannten Kontaktdaten.</p>
              <!--
                Signal-back loop CTAs (mig 026, 2026-05-12). HMAC-signed
                per-(lead, supplier) so a firm can't react on another firm's
                behalf even if they guess the URL shape. Clicks log to
                lead_responses + roll up into lead_companies.feedback_*.
              -->
              <p style="margin:16px 0 8px 0;font-size:14px;color:#1a1a1a;">
                <strong>Können Sie das Projekt übernehmen?</strong> Ein Klick reicht.
              </p>
              <div style="margin:0 0 16px 0;">
                <a href="${ctaUrls.accept}" style="display:inline-block;padding:10px 16px;background:#059669;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:500;margin-right:8px;margin-bottom:6px;">&#10003; Ja, ich erstelle ein Angebot</a>
                <a href="${ctaUrls.decline}" style="display:inline-block;padding:10px 16px;background:#6b7280;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:500;">&#10005; Nein, nicht passend</a>
              </div>
              ${isSammelanfrage
                ? `<p style="margin:12px 0;font-size:14px;color:#374151;line-height:1.55;"><strong>Diese Anfrage wurde an ${otherSuppliersCount} weitere Anbieter in ${safeCity} gesendet.</strong> Wer zuerst reagiert, hinterlässt den besten Eindruck.</p>`
                : `<p style="margin:12px 0;font-size:14px;color:#374151;line-height:1.55;"><strong>Diese Anfrage wurde exklusiv an Sie weitergeleitet.</strong> Der Kunde hat Ihr Profil ausgewählt.</p>`}
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
              <p style="font-size:13px;color:#4b5563;line-height:1.6;margin:0 0 16px 0;">
                <strong style="color:#1a1a1a;">Über ${BRAND_NAME}</strong><br>
                ${BRAND_NAME} ist die fokussierte Vergleichsplattform für Kranverleih in Deutschland und Österreich. Jede Anfrage prüfen wir manuell, bevor sie an Sie geht. Keine Bots, keine Massenmails. ${anbieterCount > 0 ? `Über ${anbieterCount} geprüfte Kranfirmen aus 16 deutschen und 9 österreichischen Bundesländern sind bereits gelistet.` : `Geprüfte Kranfirmen aus 16 deutschen und 9 österreichischen Bundesländern sind bereits gelistet.`}
              </p>
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
              <p style="font-size:14px;color:#374151;line-height:1.55;margin:0;">
                Mit freundlichen Grüßen<br>
                <strong>${safeFounderName}</strong><br>
                Gründer, ${BRAND_NAME}<br>
                <a href="mailto:${safeFounderEmail}" style="color:#2563eb;">${safeFounderEmail}</a>
              </p>
            </div>
          `

    // Send per-company emails FIRST so the owner notification can report the
    // REAL delivery status per firm (not optimistic labels). Sends are
    // SEQUENTIAL with a 200ms throttle to stay below Resend's 5 req/sec
    // rate limit, the previous Promise.all (verified 2026-04-25, lead
    // 057b86f3) fired 4 firm + owner + customer = 6 calls within ~250ms,
    // and Resend 429'd the customer confirmation (last in the chain) so
    // the user never got the confirmation while firms + owner did. Sequential
    // pacing trades ~1.5s response latency for guaranteed delivery of every
    // email in the pipeline.
    // Dry-run mode returns an empty firmResults so downstream logic keeps
    // working (companyListHtml shows 0 firms; owner/customer still fire).
    const firmResults: { company_id: string; ok: boolean }[] = []
    if (!dryRun) {
      for (const company of companiesWithEmail) {
        // Per-(lead, supplier) HMAC-signed accept / decline links for the
        // signal-back loop (mig 026). Signing here so each firm gets its
        // own unguessable URL; the route handler verifies sig and refuses
        // forged links with a 403 + owner alert.
        const acceptSig = signLeadResponse(lead.id, company.id, 'accept')
        const declineSig = signLeadResponse(lead.id, company.id, 'decline')
        const acceptUrl = `${BASE_URL}/api/lead-response/${lead.id}/${company.id}?action=accept&sig=${acceptSig}`
        const declineUrl = `${BASE_URL}/api/lead-response/${lead.id}/${company.id}?action=decline&sig=${declineSig}`
        const result = await sendResendEmail(`company email (${company.name})`, {
          from: FROM_EMAIL,
          to: company.email!,
          // No replyTo on email-less callback leads; the firm calls back.
          ...(customerEmail ? { replyTo: customerEmail } : {}),
          subject: firmSubject,
          html: buildCompanyEmailHtml(company.name, { accept: acceptUrl, decline: declineUrl }),
        })
        firmResults.push({ company_id: company.id, ok: result.ok })
        await new Promise((r) => setTimeout(r, 200))
      }
    }
    if (dryRun) console.log('[leads] dry_run=true, skipped firm emails for', companyIds.length, 'companies')

    // A5 (2026-06-12): one retry pass for failed firm sends. Most Resend
    // failures here are transient (429 burst, network blip); a single retry
    // after 2s turns "rote Zeile im Owner-Mail + manueller Forward" into a
    // delivered mail. Runs before the sent_at update and the owner mail, so
    // both reflect the post-retry truth. Worst case adds ~2s to the response
    // only when something already failed.
    const failedFirstPass = firmResults.filter((r) => !r.ok)
    if (failedFirstPass.length > 0 && !dryRun) {
      await new Promise((r) => setTimeout(r, 2000))
      for (const fr of failedFirstPass) {
        const company = companiesWithEmail.find((c) => c.id === fr.company_id)
        if (!company) continue
        const acceptSig = signLeadResponse(lead.id, company.id, 'accept')
        const declineSig = signLeadResponse(lead.id, company.id, 'decline')
        const acceptUrl = `${BASE_URL}/api/lead-response/${lead.id}/${company.id}?action=accept&sig=${acceptSig}`
        const declineUrl = `${BASE_URL}/api/lead-response/${lead.id}/${company.id}?action=decline&sig=${declineSig}`
        const retry = await sendResendEmail(`company email retry (${company.name})`, {
          from: FROM_EMAIL,
          to: company.email!,
          ...(customerEmail ? { replyTo: customerEmail } : {}),
          subject: firmSubject,
          html: buildCompanyEmailHtml(company.name, { accept: acceptUrl, decline: declineUrl }),
        })
        if (retry.ok) fr.ok = true
        await new Promise((r) => setTimeout(r, 200))
      }
    }

    // Mark lead_companies.sent_at for successful deliveries. Service role
    // bypasses RLS. One UPDATE with .in() filter handles all successes at once.
    const successCompanyIds = firmResults.filter((r) => r.ok).map((r) => r.company_id)
    if (successCompanyIds.length > 0 && !dryRun) {
      const sb = getServiceSupabase()
      const { error: updateErr } = await sb
        .from('lead_companies')
        .update({ sent_at: new Date().toISOString() })
        .eq('lead_id', lead.id)
        .in('company_id', successCompanyIds)
      if (updateErr) console.error('lead_companies.sent_at update error:', updateErr)
      // Lifecycle (Pakiet 3): a dispatched lead leaves 'new'. Previously
      // every lead stayed 'new' forever unless a script hand-edited it
      // (mig 025 documented the roll-up as "by hand"). Guarded to 'new' so
      // a manually-set status is never overwritten.
      const { error: statusErr } = await sb
        .from('leads')
        .update({ status: 'contacted' })
        .eq('id', lead.id)
        .eq('status', 'new')
      if (statusErr) console.error('leads.status contacted update error:', statusErr)
    }

    // Build owner notification's company list with REAL per-firm delivery
    // status. Distinguishes gesendet / fehlgeschlagen / keine E-Mail / dry-run.
    const companyListHtml = selectedCompanies.length > 0
      ? `<ul style="margin:4px 0 0 0;padding-left:18px;font-size:13px;color:#1a1a1a;">
          ${selectedCompanies
            .map((c) => {
              let status: string
              if (!c.email) {
                status = '<span style="color:#dc2626;">keine E-Mail, manuell weiterleiten</span>'
              } else if (dryRun) {
                status = '<span style="color:#d97706;">🧪 Dry-Run, nicht gesendet (nur Test)</span>'
              } else {
                const r = firmResults.find((fr) => fr.company_id === c.id)
                status = r?.ok
                  ? '<span style="color:#16a34a;">E-Mail gesendet</span>'
                  : '<span style="color:#dc2626;">E-Mail fehlgeschlagen, manuell weiterleiten</span>'
              }
              return `<li style="margin-bottom:2px;"><strong>${escapeHtml(c.name)}</strong>, ${status}</li>`
            })
            .join('')}
        </ul>`
      : '<span style="color:#9ca3af;">keine</span>'

    // Send notification email to owner, wrapped in a null check so a missing
    // NOTIFICATION_EMAIL env var doesn't kill the rest of the flow. Customer
    // confirmation + 200 response must still fire even if the owner side is
    // misconfigured. Track delivery so the response can surface it.
    //
    // When the lead landed without any firm attached (auto_select returned
    // nothing OR the customer skipped the firm picker), promote the subject
    // to a 🚨 alert and prepend a red banner, otherwise this critical case
    // looks identical to a normal lead and gets missed in the inbox. This
    // bug was discovered when Mario Wagner's Stahlhalle lead (2026-04-26)
    // sat for hours with zero firms notified.
    const noFirmsAttached = companyIds.length === 0
    const ownerEmail = getNotificationEmailOrNull()
    let ownerNotificationSent = false
    if (ownerEmail) {
      const alertBanner = validationFailed
        ? `<div style="background:#fef3c7;border:2px solid #d97706;border-radius:8px;padding:14px 18px;margin-bottom:18px;font-family:system-ui;">
            <div style="font-size:15px;font-weight:600;color:#78350f;margin-bottom:6px;">⏸ Lead gehalten. Validation fehlgeschlagen</div>
            <div style="font-size:13px;color:#78350f;line-height:1.5;">
              Dispatch an Anbieter wurde gestoppt. Gründe: <strong>${escapeHtml(validationReasons.join(', '))}</strong>.<br>
              Kunde hat eine Hold-Bestätigung erhalten („wir prüfen und melden uns innerhalb 24h"). Manuell entscheiden: retry, contact, oder skip.
            </div>
          </div>`
        : noFirmsAttached
        ? `<div style="background:#fee2e2;border:2px solid #dc2626;border-radius:8px;padding:14px 18px;margin-bottom:18px;font-family:system-ui;">
            <div style="font-size:15px;font-weight:600;color:#7f1d1d;margin-bottom:6px;">Achtung, keine Anbieter zugeordnet</div>
            <div style="font-size:13px;color:#7f1d1d;line-height:1.5;">
              Dieser Lead konnte keinem Anbieter automatisch zugewiesen werden. Mögliche Ursachen: ungewöhnliche Standort-Eingabe, fehlende Firmen in der Region, oder Kunde hat die Firmenliste übersprungen.<br>
              <strong>Manuelle Weiterleitung erforderlich</strong>, sonst geht der Lead verloren.
            </div>
          </div>`
        : ''
      // Additive to the validationFailed / noFirmsAttached prefixes above 
      // a high-spec lead can land on top of either. Independent banner so the
      // owner sees both signals at once without one overriding the other.
      const specBanner = highSpecAlert
        ? `<div style="background:#fef3c7;border:2px solid #d97706;border-radius:8px;padding:14px 18px;margin-bottom:18px;font-family:system-ui;">
            <div style="font-size:15px;font-weight:600;color:#78350f;margin-bottom:6px;">🟡 SPEC CHECK: Tragkraft ${escapeHtml(capacityHintFormatted)} erwähnt</div>
            <div style="font-size:13px;color:#78350f;line-height:1.5;">
              Im Projekttext nennt der Kunde eine Tragkraft von <strong>${escapeHtml(capacityHintFormatted)}</strong>. Viele Baukran-Firmen im Katalog führen ausschließlich Schnellmontagekrane (max ~2 t), bitte prüfen, ob die zugewiesenen Anbieter diese Spezifikation tatsächlich erfüllen können.<br><br>
              Bei Spec-Mismatch: Opt-in-Mail an den Kunden mit Alternativvorschlägen schicken (Greb-Pattern, <code>scripts/send_optin_greb.py</code> als Template).
            </div>
          </div>`
        : ''
      // AI-inferred crane type banner, fires when /api/leads received
      // crane_type_id=NULL and runCategorize (Sonnet 4.6) classified the
      // project_description with confidence ≥ 0.8. Surfaces the AI's
      // reasoning so owner can sanity-check before any firm dispatch
      // happens. Independent banner alongside spec/validation/noFirms.
      const aiInferredBanner = aiInferredCraneType
        ? `<div style="background:#eff6ff;border:2px solid #2563eb;border-radius:8px;padding:14px 18px;margin-bottom:18px;font-family:system-ui;">
            <div style="font-size:15px;font-weight:600;color:#1e3a8a;margin-bottom:6px;">🤖 Krantyp via AI klassifiziert</div>
            <div style="font-size:13px;color:#1e3a8a;line-height:1.5;">
              Der Kunde hat keinen Krantyp gewählt, aber die Projektbeschreibung war konkret genug. Claude hat klassifiziert:<br>
              <strong>Begründung:</strong> ${escapeHtml(aiCategorizeReasoning ?? '')}<br><br>
              Anbieter wurden auf dieser Basis automatisch ausgewählt. Falls die Klassifizierung falsch aussieht. Lead manuell zurückrouten via opt-in-Mail (Greb-Pattern).
            </div>
          </div>`
        : ''
      // Fit-check banner (D of the auto-recovery sprint), fires when at
      // least one auto-matched firm has declared company_cranes.max_capacity_kg
      // < customer requirement × 1.2. Lists the undersized firms by name + max
      // capacity so owner can choose: dispatch anyway, manually reroute via
      // opt-in to bigger firms, or call customer to clarify. Coverage caveat
      //, most firms in catalog have NULL max_capacity_kg (~1.1% populated),
      // so a clean fit-check is the exception, not the rule. When fit-check
      // ran and ALL firms were unverified (no data), we say so explicitly
      // instead of pretending the routing was confirmed safe.
      const fitCheckBanner = fitCheckRan && hasUndersizedMatches
        ? `<div style="background:#fef2f2;border:2px solid #dc2626;border-radius:8px;padding:14px 18px;margin-bottom:18px;font-family:system-ui;">
            <div style="font-size:15px;font-weight:600;color:#7f1d1d;margin-bottom:6px;">Fit-Check: ${undersizedFirms.length} Anbieter unter Bedarf (${escapeHtml(capacityHintFormatted)})</div>
            <div style="font-size:13px;color:#7f1d1d;line-height:1.5;">
              Folgende Anbieter wurden automatisch zugewiesen, melden aber maximale Tragkraft unter der Kundenanforderung × 1,2 Sicherheitsmarge:
              <ul style="margin:6px 0 0 0;padding-left:18px;">
                ${undersizedFirms
                  .map((f) => `<li><strong>${escapeHtml(f.name)}</strong>, max ${(f.max_capacity_kg / 1000).toFixed(1).replace(/\.0$/, '')} t</li>`)
                  .join('')}
              </ul>
              ${unverifiedFirmCount > 0 ? `<br>Weitere <strong>${unverifiedFirmCount}</strong> Anbieter ohne Capacity-Daten im Katalog, nicht prüfbar, ggf. auch zu klein.<br>` : ''}
              <br>Empfehlung: Lead manuell prüfen vor Versand, bei Spec-Mismatch Opt-in-Mail an den Kunden mit Alternativvorschlägen (Greb/Kohlhaas-Pattern).
            </div>
          </div>`
        : ''
      // Glass-fit banner (B). Fires when the project text implies glass/pane work
      // and at least one selected firm has no documented Glassauger. Soft signal
      // (has_glass_sucker coverage is partial), so it informs rather than blocks.
      const glassBanner = glassMismatch
        ? `<div style="background:#fffbeb;border:2px solid #d97706;border-radius:8px;padding:14px 18px;margin-bottom:18px;font-family:system-ui;">
            <div style="font-size:15px;font-weight:600;color:#78350f;margin-bottom:6px;">🟡 Glas-Bedarf erkannt</div>
            <div style="font-size:13px;color:#78350f;line-height:1.5;">
              Der Projekttext deutet auf Glas-/Scheibenmontage hin (Glassauger/Vakuumheber nötig). Dokumentierter Glassauger bei <strong>${glassCapableCount}</strong> von <strong>${glassCapableCount + noGlassFirms.length}</strong> ausgewählten Anbietern.${noGlassFirms.length > 0 ? ` Ohne dokumentierten Glassauger: ${noGlassFirms.map((n) => escapeHtml(n)).join(', ')} (Daten evtl. unvollständig).` : ''}<br><br>
              Bei Bedarf glas-fähige Spezialisten ergänzen (z. B. Uplifter, Baumo) via Opt-in-Mail.
            </div>
          </div>`
        : ''
      // Reach-fit banner (2D Last × Reichweite). Fires when the project states a
      // reach/height and ≥1 selected firm can't reach it or is likely undersized
      // at that reach. Coarse warn (lib/fit.ts, per-type fallback when firm
      // max_reach_m unknown). Surfaced by lead Greb (4 t @ 11 m → 2 t firm).
      const reachBanner = reachMismatch
        ? `<div style="background:#fef2f2;border:2px solid #dc2626;border-radius:8px;padding:14px 18px;margin-bottom:18px;font-family:system-ui;">
            <div style="font-size:15px;font-weight:600;color:#7f1d1d;margin-bottom:6px;">📐 Reichweite/Last (Bedarf ${reachHintM} m${capacityHintKg > 0 ? `, ${escapeHtml(capacityHintFormatted)}` : ''})</div>
            <div style="font-size:13px;color:#7f1d1d;line-height:1.5;">
              ${reachShortFirms.length > 0 ? `Reichen wahrscheinlich nicht bis ${reachHintM} m: <strong>${reachShortFirms.map((n) => escapeHtml(n)).join(', ')}</strong>.<br>` : ''}
              ${capacityRiskFirms.length > 0 ? `Bei ${reachHintM} m Auslage evtl. zu klein (geschätzte Tragkraft an der Auslage): ${capacityRiskFirms.map((f) => `${escapeHtml(f.name)} ~${(f.cap_at_reach_kg / 1000).toFixed(1).replace(/\.0$/, '')} t`).join(', ')}.<br>` : ''}
              <br>Grobe Schätzung (Tragkraft am Mast ≠ an der Auslage; firmenspezifische Reichweite meist noch nicht erfasst). Vor Versand prüfen, ggf. größere Klasse oder Opt-in.
            </div>
          </div>`
        : ''
      // Long-rental → Baukran-Kandidat-Banner (soft, informativ).
      const baukranBanner = baukranCandidate
        ? `<div style="background:#eff6ff;border:2px solid #2563eb;border-radius:8px;padding:14px 18px;margin-bottom:18px;font-family:system-ui;">
            <div style="font-size:15px;font-weight:600;color:#1e3a8a;margin-bottom:6px;">⏳ Lange Mietdauer (${durationDays} Tage) + ${escapeHtml(craneTypeName ?? '')}</div>
            <div style="font-size:13px;color:#1e3a8a;line-height:1.5;">
              Bei ${durationDays} Tagen ist ein ${escapeHtml(craneTypeName ?? '')} (Tagesmiete) für ein mehrwöchiges Projekt oft deutlich teurer als ein Turmdrehkran (Baukran). Bitte mit dem Kunden klären: 30 <strong>Bautage</strong> (Kran nur an einzelnen Einsatztagen, dann ${escapeHtml(craneTypeName ?? '')} ok) oder 30 <strong>Kran-Tage</strong> durchgehend? Im zweiten Fall lohnt sich meist ein Baukran-Angebot.
            </div>
          </div>`
        : ''
      // Standort-Abgleich banner. Fires when dispatch location was auto-corrected
      // from the project description (field city → Einsatzort PLZ), or when the
      // location signals are ambiguous. The routing already used the safer value;
      // this surfaces it so the owner can verify the Einsatzort before firms act.
      const standortBanner = standortCorrection
        ? standortCorrection.usedPlz
          ? `<div style="background:#fffbeb;border:2px solid #d97706;border-radius:8px;padding:14px 18px;margin-bottom:18px;font-family:system-ui;">
              <div style="font-size:15px;font-weight:600;color:#78350f;margin-bottom:6px;">📍 Einsatzort aus Projekttext übernommen</div>
              <div style="font-size:13px;color:#78350f;line-height:1.5;">
                Auto-Select hat nach <strong>${escapeHtml(standortCorrection.usedPlz)}</strong> (PLZ aus der Projektbeschreibung) geroutet, nicht nach dem Formularfeld „Stadt/PLZ": <strong>${escapeHtml(standortCorrection.field ?? '–')}</strong>. Bitte gegenchecken, ob ${escapeHtml(standortCorrection.usedPlz)} der tatsächliche Einsatzort ist.
              </div>
            </div>`
          : `<div style="background:#fffbeb;border:2px solid #d97706;border-radius:8px;padding:14px 18px;margin-bottom:18px;font-family:system-ui;">
              <div style="font-size:15px;font-weight:600;color:#78350f;margin-bottom:6px;">📍 Standort-Abgleich: bitte prüfen</div>
              <div style="font-size:13px;color:#78350f;line-height:1.5;">
                Im Projekttext stehen mehrere bzw. abweichende Postleitzahlen (${escapeHtml(standortCorrection.ambiguous.join(', '))}). Geroutet wurde nach dem Formularfeld „Stadt/PLZ": <strong>${escapeHtml(standortCorrection.field ?? '–')}</strong>. Bitte den tatsächlichen Einsatzort prüfen, ggf. manuell zurückrouten.
              </div>
            </div>`
        : ''
      // MX soft-pass note (C2): transient resolver failure, lead dispatched
      // normally, deliverability of the customer address unverified.
      const mxSoftBanner = mxSoft
        ? `<div style="background:#fffbeb;border:2px solid #d97706;border-radius:8px;padding:14px 18px;margin-bottom:18px;font-family:system-ui;">
            <div style="font-size:15px;font-weight:600;color:#78350f;margin-bottom:6px;">📭 MX-Check unbestätigt (${escapeHtml(mxCheck.reason ?? 'dns_transient')})</div>
            <div style="font-size:13px;color:#78350f;line-height:1.5;">
              Der DNS-Resolver hat zweimal transient gefehlt (kein definitives „Domain existiert nicht"). Lead wurde NORMAL versendet; die Zustellbarkeit der Kunden-E-Mail ist ungeprüft. Falls Firmen-Antworten bouncen: Kunde ggf. telefonisch erreichen.
            </div>
          </div>`
        : ''
      // R1 (2026-06-12): the three pre-filter anomaly categories used to go
      // out as SEPARATE mails on top of this notification — same signal,
      // 4x inbox noise. Folded into one banner here; content preserved.
      const droppedTotal = droppedNoEmail.length + droppedIrrelevant.length + droppedTestFlagged.length
      const droppedBanner = droppedTotal > 0
        ? `<div style="background:#f3f4f6;border:2px solid #6b7280;border-radius:8px;padding:14px 18px;margin-bottom:18px;font-family:system-ui;">
            <div style="font-size:15px;font-weight:600;color:#374151;margin-bottom:6px;">🐛 Lead-Filter: ${droppedTotal} Firma(en) vor Versand entfernt</div>
            <div style="font-size:13px;color:#374151;line-height:1.5;">
              ${droppedNoEmail.length > 0 ? `<strong>Ohne E-Mail</strong> (kein Resend-Ziel, kein manuelles Weiterleiten nötig, Aktivierung über Faza-2-Briefkampagne): ${droppedNoEmail.map((c) => escapeHtml(c.name)).join(', ')}.<br>` : ''}
              ${droppedIrrelevant.length > 0 ? `<strong>Inaktiv/irrelevant</strong> (is_active/is_relevant=false, deutet auf stale UI-State oder geforgten Request): ${droppedIrrelevant.map((c) => `${escapeHtml(c.name)} (active=${c.is_active}, relevant=${c.is_relevant})`).join(', ')}.<br>` : ''}
              ${droppedTestFlagged.length > 0 ? `<strong>„(TEST)"-markiert</strong> (Namen bereinigen oder Flags senken): ${droppedTestFlagged.map((c) => escapeHtml(c.name)).join(', ')}.<br>` : ''}
              Häufung dieser Banner = Gate prüfen (Form-Cache / Filter-Regress).
            </div>
          </div>`
        : ''
      const subjectPrefix = (validationFailed
        ? '⏸ LEAD GEHALTEN (Validation), '
        : noFirmsAttached
        ? '🚨 LEAD OHNE ANBIETER, '
        : '')
        + (mxSoft ? '📭 MX-UNGEPRÜFT, ' : '')
        + (droppedTotal > 0 ? `🐛 FILTER (${droppedTotal}), ` : '')
        + (highSpecAlert ? `🟡 SPEC CHECK (${capacityHintFormatted}), ` : '')
        + (hasUndersizedMatches ? `FIT-MISMATCH (${undersizedFirms.length}), ` : '')
        + (reachMismatch ? `📐 REICHWEITE (${reachShortFirms.length + capacityRiskFirms.length}), ` : '')
        + (glassMismatch ? `🟡 GLAS (${glassCapableCount}/${glassCapableCount + noGlassFirms.length}), ` : '')
        + (aiInferredCraneType ? '🤖 AI-Krantyp, ' : '')
        + (baukranCandidate ? `⏳ BAUKRAN? (${durationDays}d), ` : '')
        + (standortCorrection ? '📍 STANDORT, ' : '')
      const notifRes = await sendResendEmail('notification', {
        from: FROM_EMAIL,
        to: ownerEmail,
        subject: `${BRAND_NAME} - ${dryRun ? '[DRY-RUN] ' : ''}${subjectPrefix}Neue Anfrage: ${safeName}, ${safeCity}`,
        html: `
          ${alertBanner}
          ${mxSoftBanner}
          ${droppedBanner}
          ${standortBanner}
          ${specBanner}
          ${fitCheckBanner}
          ${reachBanner}
          ${glassBanner}
          ${baukranBanner}
          ${aiInferredBanner}
          <h2>Neue Kranvermietungs-Anfrage</h2>
          <table style="border-collapse:collapse;font-family:system-ui;font-size:14px;">
            ${safeCraneType ? `<tr><td style="padding:4px 12px 4px 0;color:#6b7280;">Krantyp</td><td><strong>${safeCraneType}</strong></td></tr>` : ''}
            <tr><td style="padding:4px 12px 4px 0;color:#6b7280;">Name</td><td><strong>${safeName}</strong></td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#6b7280;">E-Mail</td><td>${emailCellHtml}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#6b7280;">Telefon</td><td>${safePhone}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#6b7280;">Stadt</td><td>${safeCity}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#6b7280;">Wunschtermin</td><td>${safeDate}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#6b7280;">Mietdauer</td><td>${durationDays ? `${durationDays} Tage` : '–'}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#6b7280;vertical-align:top;">Anbieter</td><td>${companyCount} ausgewählt${companyListHtml}</td></tr>
          </table>
          ${safeDesc ? `<p style="margin-top:12px;padding:12px;background:#f9fafb;border-radius:6px;font-size:14px;">${safeDesc}</p>` : ''}
          <p style="margin-top:16px;font-size:12px;color:#9ca3af;">Lead-ID: ${lead.id}</p>
        `,
      })
      ownerNotificationSent = notifRes.ok
    }

    // Send confirmation email to customer. Skipped on email-less callback
    // leads — the firm's phone call IS the confirmation channel there.
    let confirmRes: { ok: boolean } = { ok: false }
    if (customerEmail) confirmRes = await sendResendEmail('confirmation', {
      from: FROM_EMAIL,
      to: customerEmail,
      subject: `Ihre Anfrage bei ${BRAND_NAME}, ${validationFailed ? 'Prüfung läuft' : companyCount > 0 ? `${companyCount} Anbieter kontaktiert` : 'Bestätigung'}`,
      html: `
        <div style="font-family:system-ui;max-width:520px;">
          <h2 style="font-size:18px;">Vielen Dank für Ihre Anfrage!</h2>
          <p style="color:#4b5563;font-size:14px;line-height:1.6;">
            ${safeName !== '–' ? `Hallo ${safeName},` : 'Hallo,'}<br><br>
            ${validationFailed
              ? 'Wir prüfen Ihre Anfrage und melden uns innerhalb von 24 Stunden bei Ihnen. Bitte nicht erneut einsenden, damit wir Doppel-Einträge vermeiden.'
              : companyCount > 0
              ? `Ihre Anfrage wurde an <strong>${companyCount} Anbieter</strong> weitergeleitet. Die Unternehmen werden sich in Kürze bei Ihnen melden.`
              : 'Wir haben Ihre Anfrage erhalten und melden uns in Kürze bei Ihnen.'}
          </p>
          <table style="border-collapse:collapse;font-size:13px;margin:16px 0;">
            ${safeCity !== '–' ? `<tr><td style="padding:3px 10px 3px 0;color:#6b7280;">Stadt</td><td>${safeCity}</td></tr>` : ''}
            ${safeDate !== '–' ? `<tr><td style="padding:3px 10px 3px 0;color:#6b7280;">Wunschtermin</td><td>${safeDate}</td></tr>` : ''}
            ${durationDays ? `<tr><td style="padding:3px 10px 3px 0;color:#6b7280;">Mietdauer</td><td>${durationDays} Tage</td></tr>` : ''}
          </table>
          <p style="font-size:13px;color:#9ca3af;margin-top:24px;">
            ${BRAND_NAME}. Kranvermietung in ${COUNTRY_LABEL} vergleichen<br>
            <a href="${BASE_URL}" style="color:#2563eb;">${DOMAIN}</a>
          </p>
        </div>
      `,
    })

    // Pre-filter anomaly categories (email-less / inactive / test-flagged
    // firms in company_ids) are reported as the 🐛 FILTER banner inside the
    // main owner notification since 2026-06-12 (R1) — they used to be three
    // separate mails carrying the same signal.

    // Anomaly alert: the email's domain has no MX records OR the phone
    // number couldn't be parsed to a valid E.164 form. Either way the lead
    // is held, dispatch was skipped, the customer got the hold-message
    // confirmation, and the owner needs to decide retry / contact / skip
    // by hand. Trust stamps in the firm mail are predicated on these
    // gates passing, so sending without them would be a false signal.
    if (validationFailed && ownerEmail) {
      const reasonRows = validationReasons.map((r) => `<li>${escapeHtml(r)}</li>`).join('')
      await sendResendEmail('validation hold', {
        from: FROM_EMAIL,
        to: ownerEmail,
        subject: `${BRAND_NAME} - ⏸ Lead gehalten. Validation: ${validationReasons.join(', ')}`,
        html: `
            <h3>Anomalie: Lead-Validation fehlgeschlagen</h3>
            <p>Dispatch an Anbieter wurde gestoppt. Der Kunde erhielt eine Hold-Bestätigung („wir prüfen und melden uns innerhalb 24h"). Bitte manuell entscheiden: nachfassen, alternative Kontaktdaten erfragen oder Lead schließen.</p>
            <p><strong>Gründe:</strong></p>
            <ul>${reasonRows}</ul>
            <p>Kundendaten roh (vor Canonicalisation): <strong>${safeName}</strong>, ${safeEmail}, ${safePhone}</p>
            <p style="font-size:12px;color:#9ca3af;">Lead-ID: ${lead.id}</p>
            <p style="font-size:12px;color:#9ca3af;">Reasons-Format: <code>mx:&lt;dns_code&gt;</code> = E-Mail-Domain ohne MX-Eintrag (Tippfehler / tote Domain). <code>phone:unparseable</code> = libphonenumber konnte nichts erkennen. <code>phone:invalid_number</code> = geparst, aber Ziffernfolge passt zu keinem realen Anschluss.</p>
          `,
      })
    }

    // Rich matched_companies for the UI success card (avatars, rating, tags…).
    // Auto-selected path reuses the FirmMatch data we already have in memory
    // (includes distance_km + full company fields + crane types). Manual path
    // falls back to the lighter `selectedCompanies` lookup used for emails.
    const matchedCompaniesForClient = autoSelectedMatches
      ? autoSelectedMatches.map((m) => ({
          id: m.company.id,
          name: m.company.name,
          slug: m.company.slug,
          city: m.company.city,
          distance_km: Math.round(m.distance_km),
          google_rating: m.company.google_rating,
          google_reviews_count: m.company.google_reviews_count,
          is_verified: m.company.is_verified,
          crane_type_names: Array.from(
            new Set(
              (m.company.company_cranes ?? []).map((cc) => getCraneTypeNameById(cc.crane_type_id)),
            ),
          ),
        }))
      : selectedCompanies.map((c) => ({
          id: c.id,
          name: c.name,
          slug: '',
          city: '',
          distance_km: null,
          google_rating: null,
          google_reviews_count: 0,
          is_verified: false,
          crane_type_names: [] as string[],
        }))

    return NextResponse.json({
      success: true,
      id: lead.id,
      matched_companies: matchedCompaniesForClient,
      radius_used_km: autoSelectedRadiusKm,
      resolved_label: autoSelectedResolvedLabel,
      dry_run: dryRun,
      email_delivery: {
        firms_sent: successCompanyIds.length,
        firms_total: companiesWithEmail.length,
        owner_notification: ownerNotificationSent,
        customer_confirmation: confirmRes.ok,
      },
    })
  } catch (err) {
    // Log the failure: a silent catch here masked a 3-week AT outage. The
    // kranvergleich-at deployment was missing LEAD_RESPONSE_SECRET, so
    // signLeadResponse() threw for every AT lead with matched firms, the lead
    // + lead_companies rows persisted but sent_at stayed NULL, and the customer
    // got a 500 with no trace in the logs (lead Stejskal, 2026-05-29, submitted
    // 3x). Always surface the stack so an env/regression in this path is
    // visible in Vercel logs instead of looking like a normal lead.
    console.error('[api/leads] unhandled error, returning 500:', err)
    return NextResponse.json(
      { error: 'Interner Serverfehler. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    )
  }
}
