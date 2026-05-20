-- Adds leads.radius_used_km — the auto-select radius the dispatch pipeline
-- actually used to find the firms for this lead. Persisted at INSERT time
-- so reports can answer "how many leads required >100 km expansion in the
-- last 30 days?" — a direct signal for catalog coverage gaps (e.g. the
-- 2026-05-20 Westerwald gap that produced the Kohlhaas LEAD OHNE ANBIETER).
--
-- Companion to the same-day queries.ts change that caps radius expansion
-- at a hard 150 km (was Number.POSITIVE_INFINITY). Beyond 150 km the
-- pipeline returns 0 matches and the 🚨 owner alert fires — better than
-- silent-forwarding a Berlin lead to a firm in Aachen.
--
-- Classification: NON-BREAKING. Nullable integer; pre-existing rows stay
-- NULL (no retro-fill — radius wasn't always reported by the function).
-- submitLead callers that don't auto-select (per-firm InquiryBar flow,
-- chatbot routing) leave the column NULL too, which is correct: there
-- was no auto-select radius to report.
--
-- Rollback:
--   ALTER TABLE leads DROP COLUMN IF EXISTS radius_used_km;

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS radius_used_km INT;

COMMENT ON COLUMN leads.radius_used_km IS
  'Auto-select radius (km) that found the matched firms. NULL when auto-select did not run (per-firm flow, NULL crane_type_id, AT country, or pre-instrumentation lead). Values 50/100/150 expected under the post-2026-05-20 capped policy; older rows may show arbitrary integers from the pre-cap unlimited branch.';
