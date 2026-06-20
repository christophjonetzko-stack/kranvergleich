-- Register 4 lead-submit instrumentation events on the page_events CHECK as a
-- strict SUPERSET (28 -> 32). Closes the measurement blind spots found in the
-- 2026-06-20 lead-tool audit:
--   - LeadForm on /anbieter/[slug] fired NO event (onSubmitted only passed by
--     the /kran-mieten-preise inline mount) -> leadform_view + leadform_submit.
--   - RueckrufForm borrowed inline_sammelanfrage_submit, colliding with the
--     inline LeadForm -> own rueckruf_view + rueckruf_submit.
-- (The InquiryBar #3 fix reuses the existing listing_inquire_all_submitted
--  name with a triggered_from context, so it needs NO new CHECK value.)
--
--   +4 NEW events:
--       leadform_view      {crane_type, preselected}
--       leadform_submit    {crane_type, selected_count}
--       rueckruf_view      {crane_type}
--       rueckruf_submit    {crane_type}
--
-- SOURCE OF THE EXISTING 28: migration 037 (verified against prod at the time).
-- This migration reproduces those 28 verbatim and adds the 4 above, for 32.
--
-- APPLY ORDER (superset rule): apply THIS migration in Studio FIRST (DB -> 32),
-- THEN deploy the code (track.ts PageEventType + beacon EVENT_TYPES + the
-- component emits). A DB that is a superset of what the code emits is always
-- safe; code-first would briefly reject (CHECK -> 500 / beacon -> 400).
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
    'featured_click',
    'featured_impression',
    'hero_project_describe_expanded',
    'hero_search_submit',
    'inline_sammelanfrage_submit',
    'leadform_submit',                     -- new (037 -> 043)
    'leadform_view',                       -- new (037 -> 043)
    'listing_ai_match',
    'listing_cta_to_preise_clicked',
    'listing_inquire_all_clicked',
    'listing_inquire_all_submitted',
    'rueckruf_submit',                     -- new (037 -> 043)
    'rueckruf_view',                       -- new (037 -> 043)
    'scroll_depth_25',
    'scroll_depth_50',
    'scroll_depth_75',
    'subscription_upsell_clicked',
    'subscription_upsell_shown'
  ));

-- ============================================
-- ROLLBACK (commented — execute manually to revert to the migration-037 set)
-- ============================================
-- Reverts to the 28-value set. Only roll back together with reverting the
-- track.ts / beacon EVENT_TYPES change, otherwise the app could emit one of the
-- 4 new events and 500 on the CHECK again.
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
--     'featured_click',
--     'featured_impression',
--     'hero_project_describe_expanded',
--     'hero_search_submit',
--     'inline_sammelanfrage_submit',
--     'listing_ai_match',
--     'listing_cta_to_preise_clicked',
--     'listing_inquire_all_clicked',
--     'listing_inquire_all_submitted',
--     'scroll_depth_25',
--     'scroll_depth_50',
--     'scroll_depth_75',
--     'subscription_upsell_clicked',
--     'subscription_upsell_shown'
--   ));
