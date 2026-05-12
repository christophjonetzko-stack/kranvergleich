-- Add two new scroll-depth milestone events to page_events whitelist so we
-- can measure a 3-step scroll funnel (25% / 50% / 75%) instead of a single
-- terminal 75% flag.
--
-- Context: the H3-test re-order on /kran-mieten-preise (kostenrechner now sits
-- above preistabelle, 2026-05-12) needs finer-grained drop-off data to tell us
-- whether visitors actually SEE the kostenrechner section. The single 75%
-- milestone was too coarse: in the 14-day baseline window (2026-04-29..05-12)
-- only 13 of 84 GSC clicks fired scroll_depth_75 because the page is ~1085
-- LOC tall — most engaged sessions started the calculator (which sat at ~18%
-- of page height) and never reached 75%. With 25% and 50% we can see who
-- actually scrolled into the calculator zone vs. who bounced near the top.
--
-- The application-layer whitelist in /api/beacon/route.ts and the emitter in
-- src/components/page-event-tracker.tsx are updated in the same commit so the
-- new event types flow end-to-end the moment this migration applies.
--
-- Classification: NON-BREAKING. Swapping a CHECK list with a superset is safe
-- for existing rows; no data backfill needed. Forward-only, but reversible by
-- restoring the previous CHECK definition from migration 014 (rollback at
-- the bottom of this file).
--
-- The full enumeration below mirrors migrations 011 + 014 + this addition, so
-- the constraint can be reasoned about by reading a single file.

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
    -- Scroll-milestone expansion (this migration, 022)
    'scroll_depth_25',
    'scroll_depth_50'
  ));

-- ============================================
-- ROLLBACK (commented — execute manually to revert to the migration-014 set)
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
--     'calculator_form_validation_failed'
--   ));
-- Any scroll_depth_25 / scroll_depth_50 rows written between forward and
-- rollback would then FAIL the recreated constraint — drop or convert them
-- first if rollback is needed.
