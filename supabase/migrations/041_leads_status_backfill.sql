-- One-off data backfill (lead-flow Pakiet 3, 2026-06-12): historic leads that
-- were successfully dispatched to firms but still carry status='new', because
-- /api/leads never set a status after dispatch (the mig-025 roll-up convention
-- was "by hand" and only a few leads were hand-edited). From this date the
-- API sets 'contacted' itself; this aligns the history so reports stop
-- counting dispatched leads as untouched.
--
-- Deliberately narrow: only 'new' → 'contacted', only where at least one
-- firm mail was actually delivered (sent_at). Hand-set statuses (won/lost/
-- no_response/contacted) are untouched. Test leads are aligned too — status
-- reports already filter is_test, and a dispatched test lead being
-- 'contacted' is simply true.
--
-- Classification: DATA-ONLY, idempotent (re-running matches zero rows).
--
-- Rollback: not meaningfully reversible (the pre-state was wrong, not
-- different); restore from the weekly DB backup if ever needed.

UPDATE leads
SET status = 'contacted'
WHERE status = 'new'
  AND id IN (SELECT lead_id FROM lead_companies WHERE sent_at IS NOT NULL);
