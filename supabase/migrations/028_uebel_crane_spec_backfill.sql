-- Backfill Fa. Uebel crane specs derived from existing notes field.
-- 2026-05-19. Surfaced by lead 54403ab6 (Corinna Greb, 4t @ 11m for Mehrfamilienhaus):
-- Uebel was matched by Baukran type tag but their actual fleet is Schnellmontage
-- (Potain HD 21A: 2000kg @ 12m, 500kg tip @ 25m boom). Customer needs 4t @ 11m =
-- 2× our spec. The notes already document this; max_reach_m + max_height_m were
-- just never populated.
--
-- Source values come straight from the existing company_cranes.notes for both
-- rows (Baukran-tagged + Dachdeckerkran-tagged, same physical crane registered
-- under two type slots). No new claims — this is data normalization.
--
-- Why 25m for max_reach_m: Potain HD 21A spec sheet = 25m boom; load curve
-- 500kg at jib tip (25m), 2000kg at 12m radius. 25m is the conventional
-- max-reach value used for filter-by-reach SEO queries on the listing pages.
--
-- max_height_m left null — Schnellmontage hook height varies with foot pad
-- + mast extension config; notes don't lock a single number and we'd rather
-- show null than overclaim.

UPDATE company_cranes
SET max_reach_m = 25
WHERE company_id = 'f392ffee-9f51-4f44-88a4-6cb9ec512aef'
  AND model = 'HD 21A'
  AND max_reach_m IS NULL;

-- Sanity check (run separately after the UPDATE):
-- SELECT id, crane_type_id, brand, model, max_capacity_kg, max_reach_m, max_height_m
-- FROM company_cranes WHERE company_id = 'f392ffee-9f51-4f44-88a4-6cb9ec512aef';
-- Expected: 2 rows, both showing max_reach_m=25 (Baukran + Dachdeckerkran slots
-- of the same physical Potain HD 21A).
