-- Firm-level engagement events (on-site activity per company).
-- Used for Phase-2 sales outreach: "Your profile got N views this month,
-- X people tried to call, Y people clicked your website." Extends the
-- GSC-level proof (gsc_page_stats, migration 004) into what happens
-- AFTER a user lands on our site.
--
-- DSGVO / TDDDG design:
--   - No cookies, no localStorage, no fingerprint, no cross-site tracking.
--   - IP is hashed with SHA-256 + daily salt (Plausible/Umami pattern).
--     The same IP on the same day collapses to one hash via the unique
--     dedup index below; next day, a new salt means the hash changes,
--     so the same visitor is not linkable across days.
--   - No user identifier stored beyond this anonymized daily hash.
--   - Legal basis: Art. 6(1)(f) DSGVO (legitimate interest — aggregate
--     statistics on service usage, disclosed in Datenschutzerklärung §9).
--   - TDDDG §25 does not apply: no access to terminal equipment
--     (cookies / localStorage / etc.); logging is pure server-side from
--     HTTP request headers only.

CREATE TABLE IF NOT EXISTS firm_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firm_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN (
    'profile_view',
    'phone_click',
    'email_click',
    'website_click'
  )),
  -- Optional context: which city/type page the user came from. Helps the
  -- firm report say "12 people searching for Autokran in Berlin clicked
  -- your phone" instead of just "12 phone clicks".
  city_context TEXT,
  type_context TEXT,
  -- SHA-256(ip || daily_salt || event_date). Non-reversible, non-linkable
  -- across days. Enables refresh-spam dedup via the unique index below.
  ip_hash TEXT NOT NULL,
  event_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Dedup: one (firm × ip × event_type × day) = one row. A user refreshing
-- a profile page 10x in a day counts as one profile_view.
CREATE UNIQUE INDEX IF NOT EXISTS idx_firm_events_dedup
  ON firm_events (firm_id, ip_hash, event_type, event_date);

-- Report-time access pattern: "events for firm X in last N days".
CREATE INDEX IF NOT EXISTS idx_firm_events_firm_date
  ON firm_events (firm_id, event_date DESC);

-- RLS: no public access. Only the service role (used by /api/track and
-- generate_firm_report.py) may read or write.
ALTER TABLE firm_events ENABLE ROW LEVEL SECURITY;
