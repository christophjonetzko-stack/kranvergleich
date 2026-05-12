-- UTM attribution columns for first-touch source/medium/campaign tracking
-- across every channel we send traffic from (LinkedIn organic, Reddit, backlinks,
-- future paid ads, email campaigns, etc.). Added 2026-05-12.
--
-- First-touch convention:
--   On every page visit, a client component reads utm_* from the URL query
--   string and stamps them into sessionStorage IFF no UTM is already stored
--   for that session. Sessions never overwrite — someone who clicked a
--   LinkedIn link, browsed five pages, then submitted a form gets
--   utm_source = 'linkedin' on the lead even though their last URL had
--   no UTM. The stamping logic lives in src/lib/utm.ts; the form-submit
--   helpers + /api/beacon reader both pull from sessionStorage.
--
-- DSGVO posture:
--   sessionStorage clears when the browser tab closes — it is NOT a
--   persistent cookie. Most German DPA interpretations treat
--   session-bound technical storage as "strictly necessary" under §25(2)
--   TDDDG (analogous to a session cookie for cart state), no consent
--   banner needed. If we later migrate to localStorage (cross-session
--   attribution), the legal posture changes — escalate to legal-check
--   skill before doing that.
--
-- Schema choice:
--   Free-text TEXT columns. No CHECK constraint — we accept any UTM value
--   the inbound URL carries. The attribution-quality story is fixed at
--   the source side (only put values into URLs that report cleanly);
--   adding a DB-level enum would force a migration every time we launch
--   on a new channel.
--
-- Classification: NON-BREAKING. All eight columns are nullable; existing
-- rows stay valid (their utm_* all read NULL = pre-instrumentation lead /
-- event). No backfill of historic rows — the five wave-1 leads (Kara,
-- Mario, Mathias Petzel, Matthias Falkenberg, Ziegler Frank) keep
-- utm_* = NULL forever; they are simply "pre-UTM era".

-- ============================================
-- 1. leads — first-touch attribution per submission
-- ============================================
ALTER TABLE leads ADD COLUMN utm_source TEXT;
ALTER TABLE leads ADD COLUMN utm_medium TEXT;
ALTER TABLE leads ADD COLUMN utm_campaign TEXT;
ALTER TABLE leads ADD COLUMN utm_content TEXT;

COMMENT ON COLUMN leads.utm_source IS
  'First-touch utm_source captured from sessionStorage at form submit. e.g. "linkedin", "reddit", "kostencheck-de", "google" (when we add paid). NULL = pre-instrumentation or direct/organic entry without UTM.';
COMMENT ON COLUMN leads.utm_medium IS
  'First-touch utm_medium: "organic", "paid", "backlink", "email", "social". Free-text — pick the inbound-URL value the campaign uses, no DB enum.';
COMMENT ON COLUMN leads.utm_campaign IS
  'First-touch utm_campaign: campaign identifier, e.g. "post-20260511-launch-data" or "subreddit-de-launch". Used for per-campaign ROI roll-up.';
COMMENT ON COLUMN leads.utm_content IS
  'Optional creative variant identifier (e.g. "v1" vs "v2" of the same campaign). NULL for the majority of campaigns.';

-- ============================================
-- 2. page_events — per-event UTM stamp
-- ============================================
-- Every tracked event (calculator funnel step, scroll milestone, hero click,
-- chatbot interaction, signal-back loop click) gets the same sessionStorage
-- read at emit time. This means we can report "of N LinkedIn-attributed
-- sessions, how many reached calculator step 1?" without a leads join.
ALTER TABLE page_events ADD COLUMN utm_source TEXT;
ALTER TABLE page_events ADD COLUMN utm_medium TEXT;
ALTER TABLE page_events ADD COLUMN utm_campaign TEXT;
ALTER TABLE page_events ADD COLUMN utm_content TEXT;

COMMENT ON COLUMN page_events.utm_source IS
  'Captured at event emit from sessionStorage.kv_utm.utm_source. Identical convention to leads.utm_source. NULL = pre-instrumentation or no UTM in the entry URL.';
COMMENT ON COLUMN page_events.utm_medium IS
  'Captured at event emit from sessionStorage. See leads.utm_medium for the value convention.';
COMMENT ON COLUMN page_events.utm_campaign IS
  'Captured at event emit from sessionStorage. See leads.utm_campaign.';
COMMENT ON COLUMN page_events.utm_content IS
  'Captured at event emit from sessionStorage. See leads.utm_content.';

-- ============================================
-- 3. Reporting indexes (partial — only attributed rows)
-- ============================================
-- Partial indexes because utm_* will be NULL for the majority of rows
-- (organic / direct entry has no UTM). A full index would bloat with
-- NULL-only entries and report queries always filter "WHERE utm_source
-- IS NOT NULL" anyway.
CREATE INDEX idx_leads_utm_source
  ON leads(utm_source) WHERE utm_source IS NOT NULL;
CREATE INDEX idx_leads_utm_campaign
  ON leads(utm_campaign) WHERE utm_campaign IS NOT NULL;
CREATE INDEX idx_page_events_utm_source_date
  ON page_events(utm_source, event_date DESC) WHERE utm_source IS NOT NULL;

-- ============================================
-- ROLLBACK (commented — execute manually if needed)
-- ============================================
-- DROP INDEX IF EXISTS idx_page_events_utm_source_date;
-- DROP INDEX IF EXISTS idx_leads_utm_campaign;
-- DROP INDEX IF EXISTS idx_leads_utm_source;
-- ALTER TABLE page_events DROP COLUMN IF EXISTS utm_content;
-- ALTER TABLE page_events DROP COLUMN IF EXISTS utm_campaign;
-- ALTER TABLE page_events DROP COLUMN IF EXISTS utm_medium;
-- ALTER TABLE page_events DROP COLUMN IF EXISTS utm_source;
-- ALTER TABLE leads DROP COLUMN IF EXISTS utm_content;
-- ALTER TABLE leads DROP COLUMN IF EXISTS utm_campaign;
-- ALTER TABLE leads DROP COLUMN IF EXISTS utm_medium;
-- ALTER TABLE leads DROP COLUMN IF EXISTS utm_source;
