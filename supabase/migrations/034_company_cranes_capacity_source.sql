-- Add capacity_source provenance flag to company_cranes.
-- 2026-05-31. Enables the "routing-default + source flag" initiative: lift lead-routing
-- quality by giving the fit-check (src/app/api/leads/route.ts ~384-402) a usable
-- max_capacity_kg on every crane row, WITHOUT publishing unverified firm-specific
-- specs (UWG risk). max_capacity_kg is shown publicly as JSON-LD "Maximale Tragkraft"
-- on /anbieter/{slug} + advertised in /llms.txt, so estimated values MUST be
-- distinguishable from verified ones and excluded from public display.
--
-- Values:
--   'website'      = a Tragkraft in t/kg stated on the firm's OWN website (verified).
--   'model'        = a specific crane model named on the firm's own site, decoded to
--                    its well-known OEM max Tragkraft (verified).
--   'type_default' = NO firm-published data; a conservative per-type-class default
--                    assigned for ROUTING ONLY. MUST be hidden from public JSON-LD /
--                    llms.txt and never presented as a firm's stated spec.
--   NULL           = legacy / not yet classified.
--
-- Display gate (Phase 3 code change, route.ts + anbieter page):
--   show "Maximale Tragkraft" only when max_capacity_kg IS NOT NULL
--   AND capacity_source <> 'type_default'.
-- Routing (route.ts fit-check) may use ALL non-null values incl. 'type_default'.
--
-- Non-breaking: additive nullable column, no existing-row behaviour change until the
-- Phase 3 code reads it. RLS unchanged (company_cranes policies from 001 cover it).

ALTER TABLE company_cranes
  ADD COLUMN IF NOT EXISTS capacity_source TEXT
  CHECK (capacity_source IN ('website', 'model', 'type_default'));

COMMENT ON COLUMN company_cranes.capacity_source IS
  'Provenance of max_capacity_kg: website|model = verified (public OK); type_default = routing-only estimate (hide from public JSON-LD/llms.txt). NULL = legacy.';

-- Backfill: every currently-populated max_capacity_kg was filled evidence-only
-- (stated kg or named model on the firm''s own site, 2026-05 capacity-enrichment
-- sessions). Mark them verified so the public display gate keeps showing them.
-- website-vs-model is not reconstructable from SQL alone; both are "verified for
-- display", so backfill to 'website' as the conservative verified bucket.
UPDATE company_cranes
SET capacity_source = 'website'
WHERE max_capacity_kg IS NOT NULL
  AND capacity_source IS NULL;

-- Sanity check (run separately after apply):
-- SELECT capacity_source, count(*) FROM company_cranes GROUP BY 1 ORDER BY 1;
-- Expected: 'website' ~= current populated count (~800), rest NULL. Zero 'type_default'
-- until the Phase 2 default-fill script runs.
