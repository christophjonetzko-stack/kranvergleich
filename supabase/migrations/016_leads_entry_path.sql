-- Add `entry_path` to leads so reports can attribute conversions to the first
-- URL of the visitor's session — the only signal that distinguishes a deeplink
-- expert (lands directly on /raupenkran-mieten/hamburg, fills form) from a
-- generalist (lands on "/", browses, eventually submits). Without it, the
-- "AI-only homepage vs. classic search" decision is blind to the pSEO traffic
-- that converts without ever touching "/".
--
-- Classification: NON-BREAKING. Nullable TEXT; existing rows stay NULL.
-- Reports must treat NULL as "pre-instrumentation" not "direct entry".
--
-- Population path: client writes the first URL of the session into
-- sessionStorage on /api/beacon's PageEventTracker mount; lead-form / cost-
-- calculator forwards it in the /api/leads body; /api/leads sanitises with the
-- same PAGE_PATH_RE used by /api/beacon and writes here.
--
-- Rollback:
--   ALTER TABLE leads DROP COLUMN IF EXISTS entry_path;

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS entry_path TEXT;

COMMENT ON COLUMN leads.entry_path IS
  'First URL path of the visitor session (sanitised, ≤120 chars). NULL = pre-instrumentation lead. Used to attribute conversions to deeplinks vs. homepage entries.';
