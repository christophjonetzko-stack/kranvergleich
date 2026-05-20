-- 032_companies_brands_offered.sql
-- 2026-05-20 — add TEXT[] column for crane brands a firm RENTS (not just services).
-- Source: Claude LLM extraction from description_enriched (scripts/extract_brands_from_descriptions.py).
-- Why: company_cranes.brand has 0.77% coverage; description_enriched has the brand info
-- in unstructured text but with rental-vs-service ambiguity that simple regex can't resolve.
-- LLM extraction populates this column so brand listing pages (/marke/<brand>) can query
-- "WHERE 'Liebherr' = ANY(brands_offered)" without runtime regex.

ALTER TABLE companies
  ADD COLUMN IF NOT EXISTS brands_offered TEXT[] DEFAULT NULL;

COMMENT ON COLUMN companies.brands_offered IS
  'Crane brand names the firm rents/operates (not just services). LLM-extracted from description_enriched. Multi-value, normalized (e.g. ["Liebherr", "Potain"]). Used for /marke/<brand> brand listing pages and structured brand filter.';

-- GIN index for fast ANY-match queries on the array
CREATE INDEX IF NOT EXISTS idx_companies_brands_offered
  ON companies USING GIN (brands_offered);
