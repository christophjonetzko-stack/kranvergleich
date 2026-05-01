-- Add `device` to firm_events and page_events so mobile-vs-desktop conversion
-- splits become possible. Without this, the 2026-05-01 hero-search audit could
-- not answer "is the calculator drop a mobile-form-friction problem or a
-- desktop-DSGVO-friction problem?". User-Agent is parsed server-side (raw UA
-- is NOT stored — DSGVO minimisation) into a coarse 3-bucket label.
--
-- Classification: NON-BREAKING. New nullable column, NULL means "logged before
-- the parser was deployed" — reports MUST treat NULL as a separate bucket, not
-- collapse it into desktop. No backfill: prior rows are genuinely unknown.
--
-- Allowed values are open-ended TEXT (not enum) so the parser can grow
-- ('bot' / 'unknown' / future labels) without a schema migration. /api/beacon
-- and /api/track validate the parser output before write.
--
-- Rollback:
--   ALTER TABLE firm_events DROP COLUMN IF EXISTS device;
--   ALTER TABLE page_events DROP COLUMN IF EXISTS device;

ALTER TABLE firm_events
  ADD COLUMN IF NOT EXISTS device TEXT;

ALTER TABLE page_events
  ADD COLUMN IF NOT EXISTS device TEXT;

COMMENT ON COLUMN firm_events.device IS
  'Coarse device class parsed from User-Agent at ingest: mobile / tablet / desktop / bot / unknown. NULL = pre-parser row.';
COMMENT ON COLUMN page_events.device IS
  'Coarse device class parsed from User-Agent at ingest: mobile / tablet / desktop / bot / unknown. NULL = pre-parser row.';
