-- 042_companies_national_heavy.sql
-- 2026-06-16 — per-firm flag that lifts the city-page distance geo-guard ONLY for
-- heavy crane types (Mobilkran/Raupenkran/Baukran — anything not SHORT/MID haul)
-- of flagged firms. Lets a genuine nationwide heavy-lift operator (e.g. Steil
-- Kranarbeiten, HQ Trier, fleet to 750t) appear on big-city Großgeräte city×type
-- pages it really serves, WITHOUT leaking its light/local types (Minikran, Autokran)
-- onto far pages. Read in src/lib/queries.ts (getCompaniesForCraneAndCity listing
-- guard + getCitiesWithMinCompanies sitemap counter — both national_heavy-aware so
-- sitemap count tracks the radius-guarded listing, no thin-page desync).
--
-- Non-breaking: NOT NULL with DEFAULT false → all existing rows auto-fill false,
-- inject/bypass never fires until a firm is explicitly flagged, so the new code is
-- behaviourally identical until then. ORDER MATTERS: getCitiesWithMinCompanies reads
-- national_heavy via an EXPLICIT named select, so this migration MUST be applied to a
-- DB before the new code runs against it (column absent → PostgREST error → empty
-- sitemap). Correct sequence: apply 042 → deploy code → flip a firm's flag.
-- Premium tie-in: "bundesweite Sichtbarkeit für Schwerlast-Flotte" — grant ONLY on
-- verified real capability (is_verified heavy fleet), never on payment alone (UWG §5).

-- FORWARD
ALTER TABLE companies
  ADD COLUMN IF NOT EXISTS national_heavy BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN companies.national_heavy IS
  'When true, the city-page distance geo-guard is lifted for this firm''s HEAVY crane types only (not SHORT/MID haul), so a verified nationwide heavy-lift operator shows on far big-city Großgeräte pages. Gate on real capability, never payment alone (UWG). Read in src/lib/queries.ts.';

-- ROLLBACK (execute manually if needed)
-- ALTER TABLE companies DROP COLUMN IF EXISTS national_heavy;
