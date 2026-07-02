-- Provider subscriptions (supply-side monetisation): Basis / Premium / Pro.
-- Greenfield table — the single source of truth for a company's `plan`. Sells
-- VISIBILITY, never lead access: the recipient set (auto_select_nearest +
-- .slice(0,10)) is untouched by anything here.
--
-- Relationship to the existing flags:
--   - companies.is_premium  -> from now on a PROJECTION of this table, kept in
--     sync by the trigger below. It stays the field the listing sort + the
--     "Anzeige"/"Empfohlen" badge read, so no query or component is rewired by
--     this migration. is_premium is the ONLY column the trigger writes.
--   - companies.is_verified -> NOT TOUCHED. It is an import data-quality flag
--     (433 DE firms carry the green "Verifiziert" pill); it is NOT a paid perk
--     and is fully outside the subscription model. The trigger never writes it.
--   - companies.tier_* (Path 4 one-shot) -> left intact but frozen (0 buyers,
--     no new CTA). This table does not read or alter them.
--
-- Pricing lives in Stripe, never here: no amount/currency columns. The app
-- reads only `plan` from the subscription row. Prices are €49 (Premium) /
-- €149 (Pro) / €29 (Gründerpreis) net + 19% USt via Stripe Tax — all in Stripe.
--
-- No backfill: absence of a row == 'basis', and companies.is_premium already
-- defaults to false, so existing firms are consistent without inserting rows.
--
-- Classification: NON-BREAKING. New table + new trigger only; no existing
-- column, constraint, or row is modified at apply time. Forward-only,
-- reversible via the ROLLBACK section at the bottom.

-- ============================================
-- TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- One subscription row per firm (UNIQUE). ON DELETE CASCADE: removing a
  -- company drops its subscription with it.
  company_id             UUID NOT NULL UNIQUE REFERENCES companies(id) ON DELETE CASCADE,
  plan                   TEXT NOT NULL DEFAULT 'basis'
                           CHECK (plan IN ('basis', 'premium', 'pro')),
  plan_status            TEXT NOT NULL DEFAULT 'active'
                           CHECK (plan_status IN ('active', 'trialing', 'past_due', 'canceled')),
  -- Stripe linkage (NULL until the firm checks out). No price/amount here —
  -- the price object lives in Stripe; the app only needs `plan`.
  stripe_customer_id     TEXT,
  stripe_subscription_id TEXT,
  current_period_end     TIMESTAMPTZ,
  -- Pro "Empfohlen" slot eligibility window (used by the later KROK 3 slot
  -- query, not by this migration). NULL = no active featured window.
  featured_until         TIMESTAMPTZ,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Partial index: the KROK 3 slot query filters on a live featured window.
CREATE INDEX IF NOT EXISTS idx_subscriptions_featured_until
  ON subscriptions (featured_until)
  WHERE featured_until IS NOT NULL;

-- ============================================
-- PROJECTION TRIGGER: companies.is_premium = derived from plan
-- ============================================
-- is_premium = TRUE  iff  a subscription exists for the firm with
--   plan IN ('premium','pro')  AND  plan_status IN ('active','trialing','past_due').
--
-- past_due DELIBERATELY KEEPS premium: a failed invoice opens a dunning grace
-- window — we don't yank visibility the moment a card declines. Only 'canceled'
-- (set by the webhook after Stripe's retries are exhausted / the period ends)
-- drops is_premium. 'basis' plan never grants premium regardless of status.
--
-- The trigger is the SINGLE enforcement point: whoever writes the subscription
-- row (Stripe webhook, admin script, manual Studio edit) gets is_premium kept
-- correct automatically. is_verified is never written here.
CREATE OR REPLACE FUNCTION sync_company_is_premium()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  UPDATE companies c
     SET is_premium = EXISTS (
       SELECT 1 FROM subscriptions s
        WHERE s.company_id = c.id
          AND s.plan IN ('premium', 'pro')
          AND s.plan_status IN ('active', 'trialing', 'past_due')
     )
   WHERE c.id = COALESCE(NEW.company_id, OLD.company_id);
  RETURN NULL; -- AFTER trigger: return value ignored.
END;
$$;

-- No DELETE in the event list: subs are never row-deleted (cancel = UPDATE
-- plan_status='canceled'). The only real DELETE is the ON DELETE CASCADE when
-- a company is removed — firing the trigger then would UPDATE the very row
-- being deleted in the same statement (risk of "tuple already modified" /
-- breaking the company delete). DELETE backs no flow, so it is excluded.
DROP TRIGGER IF EXISTS trg_sync_is_premium ON subscriptions;
CREATE TRIGGER trg_sync_is_premium
  AFTER INSERT OR UPDATE OF plan, plan_status ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION sync_company_is_premium();

-- ============================================
-- updated_at maintenance (mirrors migration 009 pattern)
-- ============================================
CREATE OR REPLACE FUNCTION subscriptions_set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER trg_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION subscriptions_set_updated_at();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
-- No public access. RLS enabled with NO policy => anon/authenticated roles get
-- zero rows; only the service-role client (Stripe webhook, server routes,
-- admin scripts) reads or writes. Matches page_events (011) / outreach_campaigns
-- (009). Billing state must never be exposed to the anon key.
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- ONE-TIME RECONCILIATION
-- ============================================
-- This migration makes is_premium a PROJECTION of subscriptions, so the
-- invariant "is_premium == has an active premium/pro sub" must hold for EVERY
-- row, not just newly-written ones — then app code can trust is_premium
-- unconditionally. subscriptions is empty at apply time, so NOT EXISTS is
-- always true and this zeroes any stray is_premium=true. Safe: confirmed 0
-- active-premium firms and 0 Path 4 purchases, so nothing legitimate is lost.
UPDATE companies c SET is_premium = false
 WHERE c.is_premium = true
   AND NOT EXISTS (
     SELECT 1 FROM subscriptions s
      WHERE s.company_id = c.id
        AND s.plan IN ('premium', 'pro')
        AND s.plan_status IN ('active', 'trialing', 'past_due')
   );

-- ============================================
-- ROLLBACK (commented — execute manually if needed)
-- ============================================
-- DROP TRIGGER IF EXISTS trg_subscriptions_updated_at ON subscriptions;
-- DROP FUNCTION IF EXISTS subscriptions_set_updated_at();
-- DROP TRIGGER IF EXISTS trg_sync_is_premium ON subscriptions;
-- DROP FUNCTION IF EXISTS sync_company_is_premium();
-- DROP INDEX IF EXISTS idx_subscriptions_featured_until;
-- DROP TABLE IF EXISTS subscriptions;
-- NOTE: dropping the table leaves companies.is_premium at its last projected
-- value (no row to project from). If any firm was premium at rollback time,
-- reset manually:  UPDATE companies SET is_premium = false WHERE is_premium;
