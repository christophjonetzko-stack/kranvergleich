-- Per-firm feedback audit trail on lead_companies. Mig 023 added feedback
-- fields to leads (feedback_received_at / feedback_notes / winning_company_id),
-- which captures the lead-level outcome — but every lead fans out to N firms,
-- and each firm replies (or doesn't) independently. The first wave-1 reply
-- (klickrent on lead Kara, 2026-05-12) made the gap obvious: the firm asked
-- for a re-send because they had no record of the original notification, a
-- per-(lead, company) signal that has nowhere to live in the lead-level
-- aggregate without overwriting future replies from other firms.
--
-- Design:
--   feedback_received_at  TIMESTAMPTZ  — when the firm replied (NULL = silent
--                                        so far, the default state for every
--                                        lead_companies row)
--   feedback_notes        TEXT         — free-text summary, prefixed with the
--                                        date for human readability
--   feedback_outcome      TEXT  CHECK   one of:
--     won                — firm closed the deal (mirrors leads.winning_company_id)
--     lost               — firm declined, customer chose elsewhere
--     no_response        — followed up, firm never replied (set after Nx days)
--     asked_for_resend   — firm asked for the lead to be re-sent / requoted
--                          (klickrent pattern — operational, not a sale outcome)
--     wrong_fit          — firm explicitly said the inquiry doesn't fit their
--                          service (e.g. wrong crane class, out-of-region)
--     expired            — lead's preferred_date passed before any firm closed
--     other              — anything that doesn't map; details go to feedback_notes
--
-- Roll-up convention (no constraint, just rule-of-thumb for the manual update
-- pass at end of follow-up cycle):
--   leads.status = 'won'         when any lead_companies.feedback_outcome = 'won'
--   leads.status = 'lost'        when every row is 'lost' or 'wrong_fit'
--   leads.status = 'no_response' when every row is 'no_response' or NULL after window
--   leads.status = 'contacted'   in any other mid-cycle mix
-- Application code can enforce later; for now the aggregate is updated by hand
-- as feedback arrives.
--
-- Classification: NON-BREAKING. All 3 columns nullable; existing rows stay
-- valid; no backfill needed. Application code reading lead_companies keeps
-- working unchanged.

ALTER TABLE lead_companies
  ADD COLUMN feedback_received_at TIMESTAMPTZ;

ALTER TABLE lead_companies
  ADD COLUMN feedback_notes TEXT;

ALTER TABLE lead_companies
  ADD COLUMN feedback_outcome TEXT
    CHECK (feedback_outcome IN (
      'won',
      'lost',
      'no_response',
      'asked_for_resend',
      'wrong_fit',
      'expired',
      'other'
    ));

COMMENT ON COLUMN lead_companies.feedback_received_at IS
  'Timestamp of the firm reply. NULL = silent or no follow-up reply yet.';
COMMENT ON COLUMN lead_companies.feedback_notes IS
  'Human-written summary of the firm reply. Prefix with [date] for chronology.';
COMMENT ON COLUMN lead_companies.feedback_outcome IS
  'Per-firm outcome category. Roll-up to leads.status by hand at end of cycle (see migration header for the convention).';

-- ============================================
-- ROLLBACK (commented — execute manually if needed)
-- ============================================
-- ALTER TABLE lead_companies DROP COLUMN IF EXISTS feedback_outcome;
-- ALTER TABLE lead_companies DROP COLUMN IF EXISTS feedback_notes;
-- ALTER TABLE lead_companies DROP COLUMN IF EXISTS feedback_received_at;
