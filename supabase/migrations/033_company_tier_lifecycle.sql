-- Path 4 (Listing fee one-shot) — lifecycle metadata for the existing
-- `companies.is_premium` BOOLEAN flag (added in 001_initial_schema, never
-- used until now). Migration adds 4 audit/lifecycle columns; the actual
-- premium-vs-free distinction stays on the existing is_premium flag so we
-- don't have to rewire the listing sort, profile page UI, or queries.ts
-- ORDER BY clauses that already use it.
--
-- New columns:
--   tier_purchased_at      TIMESTAMPTZ  when Stripe checkout completed,
--                                       NULL for free tier
--   tier_verified_at       TIMESTAMPTZ  when Christoph confirmed Impressum
--                                       + website live + phone reachable
--                                       (manual check, ~10 min per firm).
--                                       NULL = pending verification, blocks
--                                       the public "Verified" badge.
--   tier_stripe_session_id TEXT         Stripe Checkout Session id of the
--                                       payment, audit trail + refund handle
--   tier_amount_cents      INTEGER      Price paid in cents (€99 = 9900,
--                                       €149 = 14900). Keeps the price
--                                       history accurate when we move from
--                                       launch (€99) to standard (€149).
--
-- Activation rule (enforced at application layer, NOT a DB constraint, so
-- a refund or rollback can flip is_premium=false without touching the
-- audit columns):
--   is_premium = true     iff   tier_purchased_at IS NOT NULL
--                          AND  tier_verified_at  IS NOT NULL
--
-- Pending-verification queue is a plain SELECT, no separate table:
--   SELECT id, name FROM companies
--    WHERE tier_purchased_at IS NOT NULL
--      AND tier_verified_at  IS NULL
--    ORDER BY tier_purchased_at ASC;
--
-- Classification: NON-BREAKING. All 4 columns nullable; existing rows
-- stay valid; no backfill needed. Application code reading the existing
-- is_premium flag keeps working unchanged.

ALTER TABLE companies
  ADD COLUMN tier_purchased_at TIMESTAMPTZ;

ALTER TABLE companies
  ADD COLUMN tier_verified_at TIMESTAMPTZ;

ALTER TABLE companies
  ADD COLUMN tier_stripe_session_id TEXT;

ALTER TABLE companies
  ADD COLUMN tier_amount_cents INTEGER
    CHECK (tier_amount_cents IS NULL OR tier_amount_cents > 0);

COMMENT ON COLUMN companies.tier_purchased_at IS
  'When Stripe checkout completed; NULL for free tier. Activates is_premium together with tier_verified_at.';
COMMENT ON COLUMN companies.tier_verified_at IS
  'When Christoph confirmed Impressum + website live + phone reachable. NULL = pending verification queue.';
COMMENT ON COLUMN companies.tier_stripe_session_id IS
  'Stripe Checkout Session id (cs_...), audit trail + refund handle.';
COMMENT ON COLUMN companies.tier_amount_cents IS
  'Price paid in cents. Launch €99 = 9900, standard €149 = 14900.';

-- Partial index on the pending-verification queue. Tiny right now (0 rows)
-- but the queue query runs on every admin dashboard render once Path 4
-- ships, so a 1-column index pays for itself even at scale 20-50.
CREATE INDEX idx_companies_tier_verification_pending
  ON companies (tier_purchased_at ASC)
  WHERE tier_purchased_at IS NOT NULL AND tier_verified_at IS NULL;

-- ============================================
-- ROLLBACK (commented — execute manually if needed)
-- ============================================
-- DROP INDEX IF EXISTS idx_companies_tier_verification_pending;
-- ALTER TABLE companies DROP COLUMN IF EXISTS tier_amount_cents;
-- ALTER TABLE companies DROP COLUMN IF EXISTS tier_stripe_session_id;
-- ALTER TABLE companies DROP COLUMN IF EXISTS tier_verified_at;
-- ALTER TABLE companies DROP COLUMN IF EXISTS tier_purchased_at;
