-- Migration: Add enrichment fields for Crawl4AI pipeline
-- Run this in Supabase SQL Editor before running the enrichment script

-- Company-level enrichment tracking
ALTER TABLE companies ADD COLUMN IF NOT EXISTS website_crawled BOOLEAN DEFAULT FALSE;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS crawl_date TIMESTAMPTZ;

-- Per-company pricing (Kubełek 2 — killer feature)
ALTER TABLE companies ADD COLUMN IF NOT EXISTS price_day_from INTEGER;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS price_day_to INTEGER;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS price_week_from INTEGER;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS price_week_to INTEGER;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS price_month_from INTEGER;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS price_month_to INTEGER;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS price_note TEXT;

-- Service radius
ALTER TABLE companies ADD COLUMN IF NOT EXISTS service_radius_km INTEGER;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS service_regions TEXT[];  -- e.g. {"Berlin", "Brandenburg", "Potsdam"}

-- Opening hours
ALTER TABLE companies ADD COLUMN IF NOT EXISTS opening_hours TEXT;

-- Enriched description from website
ALTER TABLE companies ADD COLUMN IF NOT EXISTS description_enriched TEXT;

-- Index for crawl queue
CREATE INDEX IF NOT EXISTS idx_companies_crawl_queue
ON companies (website_crawled, is_active)
WHERE website IS NOT NULL;
