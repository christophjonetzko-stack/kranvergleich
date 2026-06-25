-- 044: customer single-firm opt-in mail stamp (fanout-fulfillment #4, 2026-06-25)
--
-- One-shot idempotency for the cron that asks the customer of a SINGLE-firm,
-- unanswered lead whether we may forward the request to more nearby firms
-- (Greb pattern; single-firm leads convert ~2x worse — fanout audit 2026-06-25).
-- Mirrors outcome_mail_sent_at (mig 040). Nullable, no backfill: existing leads
-- simply never receive the (now historical) opt-in mail.
--
-- Non-breaking: additive nullable column. Only the lead-followup cron reads it,
-- guarded by try/catch + an error-log fallback, so deploying the code before
-- this migration is applied is safe (the job just logs and skips).
--
-- RLS: leads already has RLS enabled; the cron uses the service role (bypasses
-- RLS). No public SELECT exposes this column. No new policy required.

ALTER TABLE leads ADD COLUMN IF NOT EXISTS customer_optin_sent_at timestamptz;

COMMENT ON COLUMN leads.customer_optin_sent_at IS
  'When the automated single-firm customer opt-in mail (Greb pattern) was sent by the cron. One per lead, NULL = not sent.';

-- ROLLBACK:
-- ALTER TABLE leads DROP COLUMN IF EXISTS customer_optin_sent_at;
