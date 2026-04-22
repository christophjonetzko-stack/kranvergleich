-- GSC page-level statistics from weekly CSV exports.
-- Used by scripts/generate_firm_report.py to pull impressions/clicks/avg
-- position for the `/{crane-type}-mieten/{city}` pages a firm appears on.
CREATE TABLE IF NOT EXISTS gsc_page_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page TEXT NOT NULL,
  clicks INT NOT NULL DEFAULT 0,
  impressions INT NOT NULL DEFAULT 0,
  ctr DECIMAL NOT NULL DEFAULT 0,
  position DECIMAL NOT NULL DEFAULT 0,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  imported_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(page, period_start, period_end)
);

CREATE INDEX IF NOT EXISTS idx_gsc_page_period ON gsc_page_stats (period_end DESC, page);

-- Service-role only (no public / anon access). Scripts using the
-- SUPABASE_SERVICE_ROLE_KEY bypass RLS as usual.
ALTER TABLE gsc_page_stats ENABLE ROW LEVEL SECURITY;
