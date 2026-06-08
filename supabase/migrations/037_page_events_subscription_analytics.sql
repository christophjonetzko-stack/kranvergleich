-- Register 4 subscription/featured analytics events on the page_events CHECK,
-- as a strict SUPERSET (24 -> 28). Events are registered now; the app starts
-- emitting them later (featured_* in KROK 3, subscription_upsell_* with the
-- upsell UI). Registering the DB CHECK first means a future emit can never hit
-- a 500 (CHECK reject) — and the matching /api/beacon EVENT_TYPES entries are
-- added in the same change set so it can't hit a 400 either.
--
--   +4 NEW events:
--       subscription_upsell_shown      {plan}
--       subscription_upsell_clicked    {plan}
--       featured_impression            {crane_type, plan}
--       featured_click                 {crane_type, plan}
--
-- SOURCE OF THE EXISTING 24: read from PRODUCTION via pg_get_constraintdef(oid)
-- on pg_constraint (NOT reconstructed from migration files — files have lagged
-- prod before). The prod set matched migration 035's 24 values exactly. This
-- migration reproduces those 24 verbatim and adds the 4 above, for 28 total.
--
-- APPLY ORDER (superset rule): apply THIS migration in Studio FIRST (DB -> 28),
-- THEN deploy the code (track.ts + beacon EVENT_TYPES). A DB that is a superset
-- of what the code emits is always safe; code-first would briefly reject.
--
-- Classification: NON-BREAKING. The new CHECK is a strict SUPERSET of the
-- current one — every existing page_events row still satisfies it; no backfill,
-- no data migration. Forward-only, reversible via the ROLLBACK section below.

ALTER TABLE page_events DROP CONSTRAINT IF EXISTS page_events_event_type_check;

ALTER TABLE page_events ADD CONSTRAINT page_events_event_type_check
  CHECK (event_type IN (
    'calculator_form_validation_failed',
    'calculator_lead_submit_attempt',
    'calculator_lead_submit_success',
    'calculator_providers_preview_shown',
    'calculator_recommendation_shown',
    'calculator_step_completed',
    'chatbot_message_sent',
    'chatbot_opened',
    'chatbot_prompt_dismissed',
    'chatbot_prompt_shown',
    'chatbot_recommendation_shown',
    'chatbot_view_providers_clicked',
    'click_city_link',
    'click_type_link',
    'featured_click',                      -- new (035 -> 037)
    'featured_impression',                 -- new (035 -> 037)
    'hero_project_describe_expanded',
    'hero_search_submit',
    'inline_sammelanfrage_submit',
    'listing_ai_match',
    'listing_cta_to_preise_clicked',
    'listing_inquire_all_clicked',
    'listing_inquire_all_submitted',
    'scroll_depth_25',
    'scroll_depth_50',
    'scroll_depth_75',
    'subscription_upsell_clicked',         -- new (035 -> 037)
    'subscription_upsell_shown'            -- new (035 -> 037)
  ));

-- ============================================
-- ROLLBACK (commented — execute manually to revert to the migration-035 set)
-- ============================================
-- Reverts to the 24-value set. Only roll back together with reverting the
-- beacon EVENT_TYPES change, otherwise the app could emit one of the 4 events
-- and 500 on the CHECK again.
-- ALTER TABLE page_events DROP CONSTRAINT IF EXISTS page_events_event_type_check;
-- ALTER TABLE page_events ADD CONSTRAINT page_events_event_type_check
--   CHECK (event_type IN (
--     'calculator_form_validation_failed',
--     'calculator_lead_submit_attempt',
--     'calculator_lead_submit_success',
--     'calculator_providers_preview_shown',
--     'calculator_recommendation_shown',
--     'calculator_step_completed',
--     'chatbot_message_sent',
--     'chatbot_opened',
--     'chatbot_prompt_dismissed',
--     'chatbot_prompt_shown',
--     'chatbot_recommendation_shown',
--     'chatbot_view_providers_clicked',
--     'click_city_link',
--     'click_type_link',
--     'hero_project_describe_expanded',
--     'hero_search_submit',
--     'inline_sammelanfrage_submit',
--     'listing_ai_match',
--     'listing_cta_to_preise_clicked',
--     'listing_inquire_all_clicked',
--     'listing_inquire_all_submitted',
--     'scroll_depth_25',
--     'scroll_depth_50',
--     'scroll_depth_75'
--   ));
