-- Add context jsonb to newsletter_subscribers
-- Stores Kostenrechner inputs (answers) + derived result per subscriber.
-- Populated by /api/send-result on the first upsert; later calls keep the
-- original context (email is unique, onConflict does not overwrite).
-- Nullable: existing rows (homepage newsletter, pre-kostenrechner capture) keep NULL.
ALTER TABLE newsletter_subscribers
  ADD COLUMN IF NOT EXISTS context JSONB;
