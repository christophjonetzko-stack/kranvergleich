-- Add 'map_click' and 'form_submit' to firm_events.event_type.
--
-- map_click:   user clicked "Route planen" on the profile page to get driving
--              directions to the firm. Per Frey (v4 §10), maps-directions is
--              one of the primary "lead action" signals — high intent, the
--              user is planning a visit.
--
-- form_submit: successful submission of the Angebot/Sammelanfrage form. One
--              row per company in selectedCompanyIds. Fired server-side from
--              /api/leads after the leads row is inserted — guaranteed to
--              fire (not dependent on client beacon) and uses the request IP
--              for the same daily-salted hash as client tracks.
--
-- After this migration, the full set of 'lead action' signals is:
--   profile_view, phone_reveal, phone_click, website_click, map_click, form_submit
-- (email_click is retained in the whitelist but unused in current UI; kept
-- to avoid a second constraint churn when we later wire it.)

ALTER TABLE firm_events DROP CONSTRAINT IF EXISTS firm_events_event_type_check;

ALTER TABLE firm_events ADD CONSTRAINT firm_events_event_type_check
  CHECK (event_type IN (
    'profile_view',
    'phone_reveal',
    'phone_click',
    'email_click',
    'website_click',
    'map_click',
    'form_submit'
  ));
