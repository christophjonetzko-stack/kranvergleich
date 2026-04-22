-- Hotfix for Supabase linter (2026-04-19):
-- 1. gsc_page_stats missed ENABLE ROW LEVEL SECURITY in migration 004
-- 2. outreach_campaigns_set_updated_at() missed SET search_path in migration 009

ALTER TABLE public.gsc_page_stats ENABLE ROW LEVEL SECURITY;
ALTER FUNCTION public.outreach_campaigns_set_updated_at() SET search_path = public, pg_temp;
