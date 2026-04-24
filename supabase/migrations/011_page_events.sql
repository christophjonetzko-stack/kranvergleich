-- Page-level engagement events. Complements firm_events (migration 005) with
-- events that are NOT tied to a specific firm — calculator step-by-step
-- funnel, scroll depth milestones, navigation clicks on content pages. Used
-- by the Phase-B analytics pipeline to understand where visitors drop off
-- and which pillar-page patterns convert.
--
-- DSGVO / TDDDG design: identical to firm_events (migration 005).
--   - No cookies, no localStorage, no fingerprint, no cross-site tracking.
--   - IP is SHA-256 hashed with a daily-rotating salt (Plausible pattern).
--     The same IP on the same day collapses to the same hash; next day, a
--     new salt means the same visitor is not linkable across days.
--   - No user identifier stored beyond the anonymised daily hash.
--   - Legal basis: Art. 6(1)(f) DSGVO (legitimate interest — aggregate
--     usage statistics, disclosed in Datenschutzerklärung §9).
--   - TDDDG §25 does not apply: no access to terminal equipment, purely
--     server-side logging from request headers.

CREATE TABLE IF NOT EXISTS page_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL CHECK (event_type IN (
    'calculator_step_completed',
    'calculator_recommendation_shown',
    'calculator_lead_submit_attempt',
    'calculator_lead_submit_success',
    'inline_sammelanfrage_submit',
    'scroll_depth_75',
    'click_city_link',
    'click_type_link'
  )),
  page_path TEXT NOT NULL,
  -- Event-specific context. Shape varies per event_type, whitelisted server-side
  -- in /api/track-page. Examples:
  --   calculator_step_completed:        {"step": 1, "value": "dach"}
  --   calculator_recommendation_shown:  {"crane_type": "dachdeckerkran"}
  --   calculator_lead_submit_success:   {"matched_count": 10, "radius_km": 50,
  --                                      "project_details_filled": true,
  --                                      "project_details_length": 42}
  --   click_city_link:                  {"city": "berlin", "crane_type": "autokran"}
  --   click_type_link:                  {"crane_type": "minikran"}
  context JSONB,
  ip_hash TEXT NOT NULL,
  event_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Reporting indexes. No unique dedup on purpose — client-side has a simple
-- once-per-visit guard for scroll milestones, and GROUP BY at query time
-- handles cross-visit rollups. Keeps the table append-only and cheap to write.
CREATE INDEX IF NOT EXISTS idx_page_events_type_date
  ON page_events (event_type, event_date DESC);
CREATE INDEX IF NOT EXISTS idx_page_events_path_date
  ON page_events (page_path, event_date DESC);

-- RLS: no public access. Only the service role (via /api/track-page and
-- reporting scripts) may read or write.
ALTER TABLE page_events ENABLE ROW LEVEL SECURITY;
