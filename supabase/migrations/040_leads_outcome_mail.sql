-- Adds leads.outcome_mail_sent_at — idempotency stamp for the customer-side
-- outcome follow-up (lead-flow Pakiet 2, 2026-06-12). The daily cron sends
-- ONE service mail 7-10 days after submission ("Haben Sie ein passendes
-- Angebot erhalten?") with three HMAC-signed one-click answers
-- (got_offer / no_offer / still_open). This column guarantees "one mail,
-- ever, per lead".
--
-- Legal posture (legal-check 2026-06-12, PROCEED WITH CHANGES): lawful basis
-- Art. 6(1)(b) DSGVO — completing the service the customer requested. The
-- mail template is strictly operational (no promo content, no review ask,
-- single mail), which keeps it outside Werbung per BGH VI ZR 225/17 and
-- outside Direktwerbung per §107 TKG-AT. no_offer answers MUST trigger a
-- real rescue action (owner alert) — that is what qualifies the mail as
-- service execution rather than a satisfaction survey.
--
-- Classification: NON-BREAKING. Nullable timestamp; the 7-10 day picker
-- window means historic leads are never blasted retroactively.
--
-- Rollback:
--   ALTER TABLE leads DROP COLUMN IF EXISTS outcome_mail_sent_at;

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS outcome_mail_sent_at TIMESTAMPTZ;

COMMENT ON COLUMN leads.outcome_mail_sent_at IS
  'When the one-and-only customer outcome follow-up mail was sent (lead-followup cron, T+7-10d). NULL = not sent (lead may be outside the window, email-less callback lead, closed, or predate the feature). Never reset.';
