-- Signal-back loop event log. Each firm-notification mail now carries two
-- HMAC-signed CTA links — "✅ Ja, ich erstelle ein Angebot" and "❌ Nein,
-- nicht passend". A click hits /api/lead-response/[leadId]/[supplierId],
-- which writes one row here and (for declines) collects a free-text or
-- preset reason on the thanks page.
--
-- Design choice: append-only event log, NOT a state column on lead_companies.
-- mig 025 already has aggregate fields (feedback_outcome / feedback_notes /
-- feedback_received_at) that this table rolls up into via the API handler.
-- Append-only keeps the audit trail intact: a firm that clicks accept then
-- decline (or two suppliers from the same domain race-clicking) lands as
-- two rows, and the lead_companies aggregate reflects "latest wins". The
-- IP + user_agent capture lets the future ranking layer surface anomalies
-- (same IP click-spamming across leads, headless-bot patterns) without
-- needing a separate audit table.
--
-- Classification: NON-BREAKING. New table, no impact on existing rows or
-- queries. Action enum is locked to ('accept', 'decline') for MVP; the
-- reason column carries one of the preset codes ('kapazitaet', 'region',
-- 'krantyp', 'budget', 'sonstiges') or free-text from the textarea
-- (max 500 chars enforced at API layer, not as a column constraint, so
-- the schema stays flexible if the reason vocabulary evolves).
--
-- sig_version SMALLINT lets us rotate LEAD_RESPONSE_SECRET later without
-- losing the audit chain: each row remembers which secret version signed
-- the click that wrote it. Default 1; bump on rotation, keep verifying
-- against the matching version per row.

CREATE TABLE lead_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  supplier_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('accept', 'decline')),
  reason TEXT,
  responded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip INET,
  user_agent TEXT,
  sig_version SMALLINT NOT NULL DEFAULT 1
);

COMMENT ON TABLE lead_responses IS
  'Append-only event log for firm clicks on the accept/decline CTAs embedded in firm-notification mails. Rolls up into lead_companies feedback_* fields via /api/lead-response handlers.';
COMMENT ON COLUMN lead_responses.action IS
  'accept = "Ja, ich erstelle ein Angebot" (engaged, no final outcome yet). decline = "Nein, nicht passend" (maps to lead_companies.feedback_outcome = lost or wrong_fit depending on reason).';
COMMENT ON COLUMN lead_responses.reason IS
  'For decline only. Preset codes: kapazitaet / region / krantyp / budget / sonstiges. sonstiges carries free-text appended after the code (e.g. "sonstiges: zu kurzfristig").';
COMMENT ON COLUMN lead_responses.ip IS
  'Visitor IP captured from x-forwarded-for header. Legal basis: DSGVO Art. 6(1)(f) legitimate interest (anti-abuse + audit). Not joined to firm_events ip_hash — that table uses a daily-rotating salt for anonymity; this table is the firm side, where attribution is the whole point.';
COMMENT ON COLUMN lead_responses.sig_version IS
  'Which version of LEAD_RESPONSE_SECRET signed the click that produced this row. Rotate the secret by bumping this default; old rows stay verifiable against their original version.';

-- Reporting indexes. Lead-side ("which firms responded to this lead?") and
-- supplier-side ("which leads has this firm engaged with?") are the dominant
-- query shapes; the compound covers the per-(lead,supplier) rollup query.
CREATE INDEX idx_lead_responses_lead
  ON lead_responses(lead_id, responded_at DESC);
CREATE INDEX idx_lead_responses_supplier
  ON lead_responses(supplier_id, responded_at DESC);
CREATE INDEX idx_lead_responses_lead_supplier
  ON lead_responses(lead_id, supplier_id, responded_at DESC);

-- RLS: no public access. Only the service role (via /api/lead-response/*
-- handlers and admin reporting scripts) may read or write. Anon role cannot
-- enumerate rows even if the URL signature scheme leaks.
ALTER TABLE lead_responses ENABLE ROW LEVEL SECURITY;

-- ============================================
-- ROLLBACK (commented — execute manually if needed)
-- ============================================
-- DROP TABLE IF EXISTS lead_responses;
-- Indexes and the FK constraints drop automatically with the table.
