-- Add drip_step to track which drip email has been sent
-- 0 = none, 1 = day-1 sent, 2 = day-3 sent, 3 = day-7 sent (complete)
ALTER TABLE newsletter_subscribers ADD COLUMN IF NOT EXISTS drip_step INTEGER NOT NULL DEFAULT 0;
