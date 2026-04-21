-- Add 'phone_reveal' to firm_events.event_type.
--
-- Rationale: users rarely click a visible `tel:` link on desktop (it opens
-- Skype/FaceTime, which most SME users don't have). The new UX gates the
-- phone number behind a "Telefonnummer anzeigen" button — the reveal itself
-- is the highest-intent signal we can capture on desktop.
--
-- Two distinct events now:
--   phone_reveal — user clicked to unmask the phone number
--   phone_click  — user clicked the tel: link after reveal
--
-- The existing dedup index (firm_id, ip_hash, event_type, event_date)
-- already collapses repeats: a visitor who reveals and then clicks tel:
-- on the same day produces exactly 2 rows (one per event_type).

ALTER TABLE firm_events DROP CONSTRAINT IF EXISTS firm_events_event_type_check;

ALTER TABLE firm_events ADD CONSTRAINT firm_events_event_type_check
  CHECK (event_type IN (
    'profile_view',
    'phone_reveal',
    'phone_click',
    'email_click',
    'website_click'
  ));
