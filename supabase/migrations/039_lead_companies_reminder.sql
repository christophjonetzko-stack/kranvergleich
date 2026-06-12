-- Adds lead_companies.reminder_sent_at — idempotency stamp for the automated
-- firm follow-up (lead-flow Pakiet 1, 2026-06-12 audit). The daily cron
-- (piggybacked on /api/cron/drip-emails — Vercel Hobby caps at 2 cron jobs)
-- re-sends ONE reminder to firms that received a lead 24-96h ago and never
-- clicked accept/decline. This column is what guarantees "one reminder, ever":
-- the picker filters reminder_sent_at IS NULL and stamps it after a
-- successful Resend send.
--
-- Why per (lead, company) and not per lead: a 10-firm Sammelanfrage where
-- 3 firms answered must remind exactly the 7 silent ones.
--
-- Classification: NON-BREAKING. Nullable timestamp; pre-existing rows stay
-- NULL. Rows older than 96h at first deploy are naturally outside the
-- reminder window, so applying this migration does NOT blast historic leads.
--
-- The cron code tolerates this column missing (try/catch around the whole
-- follow-up block), so deploy order vs Studio-apply order doesn't matter;
-- reminders simply start working once the column exists.
--
-- Rollback:
--   ALTER TABLE lead_companies DROP COLUMN IF EXISTS reminder_sent_at;

ALTER TABLE lead_companies
  ADD COLUMN IF NOT EXISTS reminder_sent_at TIMESTAMPTZ;

COMMENT ON COLUMN lead_companies.reminder_sent_at IS
  'When the one-and-only automated firm reminder was sent (lead-followup cron). NULL = not reminded yet (row may still be inside the 24-96h window, already have feedback, or predate the feature). Never reset; one reminder per (lead, company) ever.';
