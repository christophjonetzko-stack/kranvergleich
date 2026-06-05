-- Add the Kostenrechner providers-preview event + backfill 6 events the app
-- emits but the gates rejected (5 missing from the DB CHECK; 1 also missing
-- from the beacon EVENT_TYPES whitelist).
--
-- SOURCE OF THE LIST BELOW: the 17 currently-allowed values were read from
-- PRODUCTION via `pg_get_constraintdef(oid)` on pg_constraint (NOT reconstructed
-- from migration files — files 011/014/022 lagged prod for the listing_* /
-- chatbot_prompt_* events). The prod constraint matched migration 022's 17
-- values exactly. This migration adds 7 values, for 24 total:
--   +1 NEW funnel event:
--       calculator_providers_preview_shown
--   +5 BACKFILL — these are emitted by src/components (and whitelisted in
--      /api/beacon EVENT_TYPES) but were MISSING from the DB CHECK, so every
--      insert of one of them hit the CHECK, threw, and was swallowed as a 500
--      (silently lost). Adding them here stops that data loss:
--       chatbot_prompt_shown
--       chatbot_prompt_dismissed
--       listing_cta_to_preise_clicked
--       listing_inquire_all_clicked
--       listing_inquire_all_submitted
--   +1 BACKFILL (died at the beacon 400 gate, not the DB): listing_ai_match is
--      emitted by src/components/company-list-with-form.tsx after a successful AI
--      match, but was missing from BOTH the beacon EVENT_TYPES whitelist and the
--      DB CHECK, so it was rejected with a 400 before reaching the DB. Added to
--      both gates in this change set:
--       listing_ai_match
--
-- After this migration the DB CHECK set == /api/beacon EVENT_TYPES set == 24,
-- and none of listing_* / chatbot_prompt_* / listing_ai_match is dropped at the
-- 400 (beacon) or 500 (CHECK) gate. The matching beacon EVENT_TYPES entries are
-- added in the same change set.
--
-- Classification: NON-BREAKING. The new CHECK is a strict SUPERSET of the
-- current one — every existing page_events row still satisfies it; no backfill,
-- no data migration. Forward-only, reversible via the ROLLBACK section below.

ALTER TABLE page_events DROP CONSTRAINT IF EXISTS page_events_event_type_check;

ALTER TABLE page_events ADD CONSTRAINT page_events_event_type_check
  CHECK (event_type IN (
    -- Original (migration 011)
    'calculator_step_completed',
    'calculator_recommendation_shown',
    'calculator_lead_submit_attempt',
    'calculator_lead_submit_success',
    'inline_sammelanfrage_submit',
    'scroll_depth_75',
    'click_city_link',
    'click_type_link',
    -- Engagement expansion (migration 014)
    'hero_search_submit',
    'hero_project_describe_expanded',
    'chatbot_opened',
    'chatbot_message_sent',
    'chatbot_recommendation_shown',
    'chatbot_view_providers_clicked',
    'calculator_form_validation_failed',
    -- Scroll-milestone expansion (migration 022)
    'scroll_depth_25',
    'scroll_depth_50',
    -- Backfill: beacon-only events missing from the DB CHECK, were 500ing (035)
    'chatbot_prompt_shown',
    'chatbot_prompt_dismissed',
    'listing_cta_to_preise_clicked',
    'listing_inquire_all_clicked',
    'listing_inquire_all_submitted',
    -- Backfill: emitted in company-list-with-form.tsx but missing from the beacon
    -- EVENT_TYPES whitelist too, so it died at the 400 gate before the DB (035)
    'listing_ai_match',
    -- Providers-preview funnel — Kostenrechner recommendation screen (035)
    'calculator_providers_preview_shown'
  ));

-- ============================================
-- ROLLBACK (commented — execute manually to revert to the migration-022 set)
-- ============================================
-- ALTER TABLE page_events DROP CONSTRAINT IF EXISTS page_events_event_type_check;
-- ALTER TABLE page_events ADD CONSTRAINT page_events_event_type_check
--   CHECK (event_type IN (
--     'calculator_step_completed',
--     'calculator_recommendation_shown',
--     'calculator_lead_submit_attempt',
--     'calculator_lead_submit_success',
--     'inline_sammelanfrage_submit',
--     'scroll_depth_75',
--     'click_city_link',
--     'click_type_link',
--     'hero_search_submit',
--     'hero_project_describe_expanded',
--     'chatbot_opened',
--     'chatbot_message_sent',
--     'chatbot_recommendation_shown',
--     'chatbot_view_providers_clicked',
--     'calculator_form_validation_failed',
--     'scroll_depth_25',
--     'scroll_depth_50'
--   ));
-- NOTE: reverting drops all 7 added values. The 5 backfilled events +
-- providers-preview would 500 again on insert; listing_ai_match would 400 again
-- at the beacon. Only roll back together with reverting the beacon EVENT_TYPES
-- change, otherwise the app keeps emitting events the gates reject.
