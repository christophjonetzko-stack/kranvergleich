-- Outreach tracking for backlinks and firm premium-listing sales.
-- Feeds the 3-month monetization plan (maj-lipiec 2026): every cold email gets
-- a row so we can measure reply / win rate per template and per campaign_type.
--
-- Scope:
--   backlink     — link-insertion / resource-page / broken-link outreach to 3rd-party domains
--   firm_sales   — cold pitch to firms in the catalog to buy Premium Listings (Faza 3)
--   firm_upgrade — follow-up to firms that replied but haven't paid yet

CREATE TABLE IF NOT EXISTS outreach_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_type TEXT NOT NULL CHECK (campaign_type IN ('backlink', 'firm_sales', 'firm_upgrade')),

  -- Target (one of these two will be populated depending on campaign_type)
  target_domain TEXT,                -- for backlink campaigns
  firm_id UUID REFERENCES companies(id) ON DELETE SET NULL,  -- for firm_sales / firm_upgrade

  target_contact_name TEXT,
  target_contact_email TEXT,

  -- Content
  template_id TEXT,                  -- free-text key like "backlink_link_insertion_v1"
  subject TEXT,
  body_preview TEXT,                 -- first ~200 chars for context, not the full body

  -- Lifecycle
  status TEXT NOT NULL DEFAULT 'queued'
    CHECK (status IN ('queued', 'sent', 'replied', 'won', 'lost', 'bounced')),
  sent_at TIMESTAMPTZ,
  replied_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,           -- when moved to won/lost

  -- Freeform notes — e.g. "Replied asking for pricing", "Got DR38 link on baublatt.de"
  notes TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Status dashboards will filter by campaign_type + status
CREATE INDEX IF NOT EXISTS idx_outreach_type_status ON outreach_campaigns(campaign_type, status);

-- Avoid accidental duplicate sends to same domain within a campaign_type
CREATE UNIQUE INDEX IF NOT EXISTS idx_outreach_backlink_domain
  ON outreach_campaigns(campaign_type, target_domain)
  WHERE campaign_type = 'backlink' AND target_domain IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_outreach_firm
  ON outreach_campaigns(campaign_type, firm_id)
  WHERE firm_id IS NOT NULL;

-- RLS: service role only (no public / anon access). Matches existing pattern
-- from migration 002 (newsletter_subscribers) and 005 (firm_events).
ALTER TABLE outreach_campaigns ENABLE ROW LEVEL SECURITY;

-- Trigger to keep updated_at current on status changes
CREATE OR REPLACE FUNCTION outreach_campaigns_set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_outreach_campaigns_updated_at ON outreach_campaigns;
CREATE TRIGGER trg_outreach_campaigns_updated_at
  BEFORE UPDATE ON outreach_campaigns
  FOR EACH ROW
  EXECUTE FUNCTION outreach_campaigns_set_updated_at();
