-- Lead feedback loop — replace the original 4-value status enum (new/sent/
-- converted/cancelled, mig 001) with the lifecycle that actually fits the
-- comparison-portal model, and add 3 columns to record outcome details:
--
--   new          submitted, no firm has reached out yet
--   contacted    at least one firm has contacted the customer
--   won          a firm closed the deal (winning_company_id set)
--   lost         customer chose a non-listed firm or self-served
--   no_response  customer never replied after the follow-up window
--
-- The original 'sent' / 'converted' / 'cancelled' values are unused at
-- 2026-05-12: all 25 rows in the table (5 real, 20 test) sit on 'new', so
-- the CHECK constraint can be swapped without backfilling any value. The
-- DEFAULT 'new' set in mig 001 is preserved by leaving the column
-- definition untouched — no ALTER COLUMN ... SET DEFAULT needed. Existing
-- application code that inserts leads without a status keeps working.
--
-- Classification: NON-BREAKING for data (no row violates the new CHECK);
-- writers that were previously emitting 'sent'/'converted'/'cancelled' would
-- start failing, but nothing in /api/leads writes those values today, and
-- a grep over src/ confirms no other path mutates leads.status.
--
-- The 3 new columns are nullable so existing 'new' rows stay valid; only
-- rows that transition through the feedback loop pick up values.

-- 1. Status workflow swap
ALTER TABLE leads
  DROP CONSTRAINT IF EXISTS leads_status_check;

ALTER TABLE leads
  ADD CONSTRAINT leads_status_check
  CHECK (status IN ('new', 'contacted', 'won', 'lost', 'no_response'));

-- 2. Outcome tracking columns
ALTER TABLE leads
  ADD COLUMN feedback_received_at TIMESTAMPTZ;

ALTER TABLE leads
  ADD COLUMN feedback_notes TEXT;

ALTER TABLE leads
  ADD COLUMN winning_company_id UUID REFERENCES companies(id);

-- 3. Column documentation (visible in Studio + introspection tools)
COMMENT ON COLUMN leads.status IS
  'Lead lifecycle: new → contacted → won/lost/no_response. Workflow set 2026-05-12 (mig 023).';
COMMENT ON COLUMN leads.feedback_received_at IS
  'Timestamp when feedback was received from firm or customer. NULL before any feedback.';
COMMENT ON COLUMN leads.feedback_notes IS
  'Free-text notes about the feedback (who responded, what they said).';
COMMENT ON COLUMN leads.winning_company_id IS
  'FK to companies — set only when status = won. NULL otherwise.';

-- ============================================
-- ROLLBACK (commented — execute manually if needed)
-- ============================================
-- ALTER TABLE leads DROP COLUMN IF EXISTS winning_company_id;
-- ALTER TABLE leads DROP COLUMN IF EXISTS feedback_notes;
-- ALTER TABLE leads DROP COLUMN IF EXISTS feedback_received_at;
-- ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_status_check;
-- ALTER TABLE leads ADD CONSTRAINT leads_status_check
--   CHECK (status IN ('new', 'sent', 'converted', 'cancelled'));
-- If any rows hold a status outside the original 4 values, update them
-- to 'new' (or another original value) first — the rollback constraint
-- will otherwise fail on the existing data.
