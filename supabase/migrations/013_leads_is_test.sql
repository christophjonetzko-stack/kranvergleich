-- Mark known test leads (owner's own QA data) so client-facing reports filter them out.
-- At audit time 2026-04-29: 23 leads in DB, 18 of which were test data, 3 real
-- (Kara/Mario/Mathias) + 1 spam (ysQ@hju.com kept as-is, status='new').
-- A new column lets reports JOIN-filter without hardcoding emails everywhere.
--
-- Classification: NON-BREAKING. New column with NOT NULL DEFAULT FALSE so existing
-- rows auto-fill. No code references is_test yet; firm_reports + outreach pipelines
-- will start filtering once they read this column.
--
-- lead_companies has no test flag — reports JOIN leads.is_test through lead_id, so
-- no parallel column is needed there. Existing dispatch rows for test leads stay
-- intact for audit history; they simply get filtered out by the JOIN.
--
-- firm_events.form_submit cannot be retroactively flagged (no lead_id link, only
-- daily-salted ip_hash per DSGVO design). Reports must caveat form_submit counts
-- as "includes pre-2026-04-29 test traffic" until enough real volume dilutes it.
--
-- Rollback:
--   DROP INDEX IF EXISTS idx_leads_is_test;
--   ALTER TABLE leads DROP COLUMN IF EXISTS is_test;

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS is_test BOOLEAN NOT NULL DEFAULT FALSE;

COMMENT ON COLUMN leads.is_test IS
  'TRUE = owner-generated QA / test entry; client-facing reports must filter WHERE NOT is_test.';

-- Index covers the dominant report query shape: WHERE is_test = false ORDER BY created_at DESC.
-- Default FALSE means most rows hit this index path; statistics will favor it naturally.
CREATE INDEX IF NOT EXISTS idx_leads_is_test
  ON leads(is_test, created_at DESC);

-- Backfill: 18 test leads identified by email pattern during 2026-04-29 audit.
--   tipsforevervibrant@gmail.com — 14 automated "Thomas Müller" submissions
--   nxpech@gmail.com             — 3 owner alias submissions
--   christoph.jonetzko@gmail.com — 1 explicit "TEST - Claude Code" submission
-- Real leads kept FALSE: info@hanseatichaus.de (Kara), mario.wagner@htp.com (Mario),
-- Mathias-Stralsund@t-online.de (Mathias), ysQ@hju.com (low-quality but not confirmed test).
UPDATE leads
SET is_test = TRUE
WHERE customer_email IN (
  'tipsforevervibrant@gmail.com',
  'nxpech@gmail.com',
  'christoph.jonetzko@gmail.com'
);
