-- AT expansion (kranvergleich.at) — add country discriminator to country-aware tables.
-- Faza 1 geo-expansion. Default 'DE' for all existing rows; CHECK locked to ('DE','AT')
-- now, extensible via ALTER ... DROP/ADD CONSTRAINT for PL/CH later.
--
-- Design:
--   - cities.country is the SITE-FILTER source of truth. kranvergleich.at queries
--     WHERE cities.country = 'AT'; kranvergleich.de queries WHERE cities.country = 'DE'.
--   - companies.country is Sitz metadata (Impressum format, admin defaults, analytics
--     "firms by country"). It is NOT used to filter the company list per site.
--     Site filtering for companies goes through company_regions -> cities.country JOIN,
--     which supports cross-country firms (Boels, BKL) as one companies row with regions
--     in both countries.
--   - leads / page_events / outreach_campaigns get country stamped at write time so
--     analytics, lead routing, and outreach segmentation can split per market.
--     outreach_campaigns.country is critical because §107 TKG-AT forbids cold B2B email
--     in AT — the application layer + legal-check skill use this column to hard-block
--     AT outreach unless an opt-in / existing-relationship exception applies.
--
-- Classification: NON-BREAKING. NOT NULL with DEFAULT 'DE' auto-fills existing rows.
-- No code change required for queries that don't reference the column.

-- ============================================
-- 1. cities — primary filter (site sourcing)
-- ============================================
ALTER TABLE cities
  ADD COLUMN country TEXT NOT NULL DEFAULT 'DE'
    CHECK (country IN ('DE', 'AT'));

CREATE INDEX idx_cities_country_active ON cities(country)
  WHERE is_active = true;

-- ============================================
-- 2. companies — Sitz metadata (NOT site filter)
-- ============================================
ALTER TABLE companies
  ADD COLUMN country TEXT NOT NULL DEFAULT 'DE'
    CHECK (country IN ('DE', 'AT'));

-- No index — small table; column read in admin form / analytics, not hot-path query.

-- ============================================
-- 3. leads — analytics + AT routing
-- ============================================
ALTER TABLE leads
  ADD COLUMN country TEXT NOT NULL DEFAULT 'DE'
    CHECK (country IN ('DE', 'AT'));

CREATE INDEX idx_leads_country_status ON leads(country, status, created_at DESC);

-- ============================================
-- 4. page_events — per-site analytics
-- ============================================
ALTER TABLE page_events
  ADD COLUMN country TEXT NOT NULL DEFAULT 'DE'
    CHECK (country IN ('DE', 'AT'));

CREATE INDEX idx_page_events_country_date ON page_events(country, event_date DESC);

-- ============================================
-- 5. outreach_campaigns — country segmentation (CRITICAL: §107 TKG-AT gate)
-- ============================================
ALTER TABLE outreach_campaigns
  ADD COLUMN country TEXT NOT NULL DEFAULT 'DE'
    CHECK (country IN ('DE', 'AT'));

CREATE INDEX idx_outreach_country_type ON outreach_campaigns(country, campaign_type, status);

-- ============================================
-- ROLLBACK (commented — execute manually if needed; reverse order of forward)
-- ============================================
-- ALTER TABLE outreach_campaigns DROP COLUMN country;
-- ALTER TABLE page_events DROP COLUMN country;
-- ALTER TABLE leads DROP COLUMN country;
-- ALTER TABLE companies DROP COLUMN country;
-- ALTER TABLE cities DROP COLUMN country;
-- Indexes drop automatically with DROP COLUMN.
