-- Adds partial-capture support + project_type segmentation for the cost
-- calculator Priestley/Scorecard reframe (2026-05-20).
--
-- Background: Today the calculator collects all 4 answers + name/email/PLZ in
-- one shot. The 2026-04-29 audit showed 87% of step-4 completions never click
-- submit. Capturing name+email after Q2 (weight) — before they see Q3/Q4 —
-- means the user is in the funnel as a real lead even if they abandon, and
-- we can run an abandon-recovery sequence on them later.
--
-- Classification: NON-BREAKING. Two new columns (one CHECK'd text, one boolean
-- defaulted FALSE). Existing rows backfill cleanly. submitLead callers that
-- don't pass project_type leave it NULL.
--
-- Rollback:
--   DROP INDEX IF EXISTS idx_leads_is_partial;
--   ALTER TABLE leads DROP COLUMN IF EXISTS is_partial;
--   ALTER TABLE leads DROP COLUMN IF EXISTS project_type;

-- 1. project_type — segmentation field from the new Q1 (BLOK C of the
--    Priestley reframe). Orthogonal to crane_type_id: a Neubau project can
--    use an Autokran or a Baukran; the recommendation engine still decides
--    crane_type. This column is for CRM nurture / future segment-aware
--    follow-up campaigns. NULL = pre-instrumentation lead or skipped Q1.
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS project_type TEXT
    CHECK (project_type IN (
      'neubau',
      'sanierung',
      'dachdecker',
      'industrie',
      'einzeltransport'
    ));

COMMENT ON COLUMN leads.project_type IS
  'Segmentation tag from calculator Q1 (Priestley reframe 2026-05-20). NULL when lead came from a path that didn''t ask the question (listing direct, profile page, chatbot).';

-- 2. is_partial — TRUE when row was inserted mid-calculator (after the
--    name+email capture step that follows Q2, before Q3+Q4 + PLZ are
--    collected). When the user finishes, the same row is UPDATEd:
--      is_partial := FALSE
--      duration_days, project_description, city, dsgvo_consent (re-confirmed) ...
--    A row that stays is_partial=TRUE after 24h is the abandon-recovery cohort.
--
--    Orthogonal to status (which tracks dispatch lifecycle:
--    new -> sent -> converted/cancelled). A partial lead has status='new'
--    AND is_partial=TRUE; dispatch logic + the public "leads count" reports
--    must filter WHERE NOT is_partial unless explicitly working on recovery.
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS is_partial BOOLEAN NOT NULL DEFAULT FALSE;

COMMENT ON COLUMN leads.is_partial IS
  'TRUE = calculator started but not finished (name+email captured mid-flow, weight/height/duration/PLZ missing). Dispatch + client-facing reports MUST filter WHERE NOT is_partial unless explicitly running abandon-recovery.';

-- Partial-index — only rows worth visiting (the partial cohort). Keeps the
-- index small (most rows are NOT partial). Dominant query shape:
--   SELECT * FROM leads
--   WHERE is_partial AND created_at > now() - interval '14 days'
--   ORDER BY created_at DESC;
CREATE INDEX IF NOT EXISTS idx_leads_is_partial
  ON leads(created_at DESC)
  WHERE is_partial = TRUE;

-- 3. RLS check — existing policy "Public insert leads" requires
--    dsgvo_consent=true. The BLOK D partial-capture step explicitly collects
--    DSGVO consent (checkbox + Datenschutzerklärung link), so partial inserts
--    satisfy the policy without modification. UPDATEs (partial -> complete)
--    use the service role from /api/leads, which bypasses RLS — same path
--    as the current full-submit flow.
--
--    No policy changes required.
