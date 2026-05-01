// Client-side helper for firing page-scope engagement events to /api/beacon.
//
// Fire-and-forget contract. `navigator.sendBeacon` is preferred so events land
// even when the user navigates away or closes the tab immediately (form submit,
// link click). Falls back to `fetch({ keepalive: true })` for browsers without
// Beacon support. Silently no-ops during SSR and under `?dryrun=1` so debug
// test sessions don't pollute the analytics table.

export type PageEventType =
  | 'calculator_step_completed'
  | 'calculator_recommendation_shown'
  | 'calculator_lead_submit_attempt'
  | 'calculator_lead_submit_success'
  | 'calculator_form_validation_failed'
  | 'inline_sammelanfrage_submit'
  | 'scroll_depth_75'
  | 'click_city_link'
  | 'click_type_link'
  | 'hero_search_submit'
  | 'hero_project_describe_expanded'
  | 'chatbot_opened'
  | 'chatbot_message_sent'
  | 'chatbot_recommendation_shown'
  | 'chatbot_view_providers_clicked'

export function trackPageEvent(
  eventType: PageEventType,
  context?: Record<string, string | number | boolean>,
): void {
  if (typeof window === 'undefined') return
  // Skip in dry-run mode so debug submits don't inflate analytics.
  if (new URLSearchParams(window.location.search).get('dryrun') === '1') return

  const body = JSON.stringify({
    event_type: eventType,
    page_path: window.location.pathname,
    context: context ?? null,
  })

  try {
    // Try sendBeacon first — it's designed to survive page navigation. If the
    // browser rejects it (returns false: queue full, payload too large,
    // disabled-by-settings), fall through to fetch with keepalive so we still
    // land the event before the page unloads.
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/json' })
      if (navigator.sendBeacon('/api/beacon', blob)) return
    }
    fetch('/api/beacon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {})
  } catch {
    // Never let tracking errors leak into the user flow.
  }
}
