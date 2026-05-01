-- Expand page_events.event_type to cover the hero/chatbot/calculator-friction
-- gaps surfaced by the 2026-05-01 hero-search-decision audit. The existing
-- whitelist only covered calculator + scroll + city/type-link clicks; with no
-- instrumentation on the hero SearchBox or the floating Kran-Berater chatbot,
-- 87% of "what does the homepage do" was untrackable.
--
-- Classification: NON-BREAKING. Swapping a CHECK list adds tolerated values;
-- existing rows pass unchanged. Server-side whitelist in /api/beacon controls
-- what actually lands, so the DB list is the outer perimeter.
--
-- New event_types added:
--   hero_search_submit               — SearchBox "Anbieter finden" click
--   hero_project_describe_expanded   — "+Projekt beschreiben" accordion open
--   chatbot_opened                   — Kran-Berater bubble first-open per session
--   chatbot_message_sent             — user message fired to /api/ai-helper
--   chatbot_recommendation_shown     — AI returned a ready=true type_slug
--   chatbot_view_providers_clicked   — "Passende Anbieter zeigen" CTA click
--   calculator_form_validation_failed — submit blocked by client-side validation
--                                       (DSGVO unchecked, PLZ too short, ...)
--
-- Rollback:
--   ALTER TABLE page_events DROP CONSTRAINT IF EXISTS page_events_event_type_check;
--   ALTER TABLE page_events ADD CONSTRAINT page_events_event_type_check
--     CHECK (event_type IN (<original 8 values from migration 011>));

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
    -- New (migration 014)
    'hero_search_submit',
    'hero_project_describe_expanded',
    'chatbot_opened',
    'chatbot_message_sent',
    'chatbot_recommendation_shown',
    'chatbot_view_providers_clicked',
    'calculator_form_validation_failed'
  ));
