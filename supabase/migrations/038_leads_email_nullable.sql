-- 038_leads_email_nullable.sql
-- Rückruf-anfordern flow (2026-06-10): a callback lead carries a verified
-- E.164 phone but may have no email. Widening change, non-breaking: all
-- existing writers always provide customer_email; the only NULL-producer is
-- the new callback branch in /api/leads which requires a valid phone instead.
-- Readers audited 2026-06-10: lead-response/thanks already guards NULL,
-- lead-response route selects without dereferencing, TS types updated in the
-- same commit (lib/types.ts, lib/queries.ts).
--
-- APPLY: paste into Supabase Studio SQL Editor (never `supabase db push`).

-- FORWARD
ALTER TABLE leads ALTER COLUMN customer_email DROP NOT NULL;

-- Defense-in-depth: a lead must always have at least one contact channel.
-- (email present) OR (phone present). Existing rows all have email, so the
-- constraint validates instantly.
ALTER TABLE leads
  ADD CONSTRAINT leads_contact_channel_check
  CHECK (customer_email IS NOT NULL OR customer_phone IS NOT NULL);

-- ROLLBACK (execute manually if needed; backfill NULLs first or delete
-- callback-only leads, otherwise SET NOT NULL fails):
-- ALTER TABLE leads DROP CONSTRAINT leads_contact_channel_check;
-- ALTER TABLE leads ALTER COLUMN customer_email SET NOT NULL;
