-- Add followup_sent_at to lead_companies so the feedback-loop wave 1
-- (2026-05-12, 23 emails covering Kara / Mario / Mathias Petzel) can stamp
-- per-(lead, company) when the firm got the Wersja-B follow-up mail asking
-- about the original enquiry's status. Mirrors the existing sent_at column
-- semantics: NULL until the follow-up actually flies; non-NULL = sent and
-- excludes the row from a re-send.
--
-- The lead_companies table already records the ORIGINAL notification
-- timestamp in sent_at (mig 001). followup_sent_at is the SECOND wave that
-- happens 14+ days after the original enquiry, intentionally separate so
-- both events can be audited side-by-side. The next wave (Matthias F.
-- 17.05 + Ziegler 21.05) reuses the same column.
--
-- Classification: NON-BREAKING. New nullable column, no backfill needed.
-- All 33 candidate rows (and the 1 skipped sent_at=NULL row) keep
-- followup_sent_at=NULL until the send-script runs.

ALTER TABLE lead_companies
  ADD COLUMN followup_sent_at TIMESTAMPTZ;

COMMENT ON COLUMN lead_companies.followup_sent_at IS
  'Timestamp when the Wersja-B follow-up enquiry mail was sent to companies.email. NULL = never sent / not yet sent. Distinct from sent_at, which records the ORIGINAL lead-notification dispatch.';

-- ============================================
-- ROLLBACK (commented — execute manually if needed)
-- ============================================
-- ALTER TABLE lead_companies DROP COLUMN IF EXISTS followup_sent_at;
