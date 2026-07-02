-- 046: persist the advisory lead-qualification badge (computed by Haiku in
-- /api/leads since 2026-06-24, previously only embedded in the owner mail).
-- Read by /admin/leads (service-role). Advisory only — no automated decision
-- is taken from these values (DSGVO Art. 22). qualification_note is the
-- model's one-sentence rationale, data-minimised (no customer PII by design).
--
-- Classification: NON-BREAKING (nullable columns, no defaults needed).
-- RLS: leads already has RLS enabled with service-role-only access for reads;
-- new columns inherit the table policies — no policy changes required.
-- Apply order: paste this in Supabase Studio SQL editor FIRST, then deploy
-- code (code reads/writes best-effort and tolerates missing columns).

-- FORWARD
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS qualification_tier text,
  ADD COLUMN IF NOT EXISTS qualification_b2b boolean,
  ADD COLUMN IF NOT EXISTS qualification_note text;

-- ROLLBACK (execute manually if needed)
-- ALTER TABLE leads
--   DROP COLUMN IF EXISTS qualification_tier,
--   DROP COLUMN IF EXISTS qualification_b2b,
--   DROP COLUMN IF EXISTS qualification_note;
