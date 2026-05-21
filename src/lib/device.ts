// Coarse User-Agent  device classification for the analytics pipeline.
// Server-side helper: raw UA is NOT stored in firm_events / page_events
// (DSGVO minimisation), only this 3-bucket label.
//
// We deliberately avoid a full UA-parser dependency: the call sites are
// /api/beacon and /api/track which run on every event write, and we only
// need to split mobile / tablet / desktop for the hero-search audit. A
// regex-based heuristic is good enough for that grain and adds 0 bytes
// to the runtime.

export type DeviceClass = 'mobile' | 'tablet' | 'desktop' | 'bot' | 'unknown'

const BOT_RE = /(bot|crawl|spider|headless|fetch|monitor|scan|wget|curl|python-requests|preview|scraper|google-inspectiontool|facebookexternalhit|slurp|baiduspider)/i
// Tablet-first: iPad/Android-tablet UAs include the word "Mobile" in some
// variants but should not bucket as phone. Match tablet markers before
// general "Mobile" to avoid that miscategorisation.
const TABLET_RE = /(ipad|android(?!.*mobile)|tablet|kindle|silk|playbook)/i
const MOBILE_RE = /(mobile|iphone|ipod|android.*mobile|blackberry|iemobile|opera mini|windows phone)/i

export function classifyUserAgent(ua: string | null | undefined): DeviceClass {
  if (!ua) return 'unknown'
  const s = ua.trim()
  if (s.length === 0 || s.length > 1024) return 'unknown'
  if (BOT_RE.test(s)) return 'bot'
  if (TABLET_RE.test(s)) return 'tablet'
  if (MOBILE_RE.test(s)) return 'mobile'
  return 'desktop'
}
