-- 045_report_subscribers.sql
-- Demand-signal collection for the Nachfrage-Report (Faza 2, Version A / free).
-- Lawful basis: DSGVO Art. 6(1)(a) consent, obtained via double opt-in.
-- Writes happen ONLY through the service-role API (never the anon/public client).

-- ============================ FORWARD ============================
create table if not exists public.report_subscribers (
  id                uuid primary key default gen_random_uuid(),
  email             text not null,
  city              text,
  status            text not null default 'pending'
                      check (status in ('pending', 'confirmed', 'unsubscribed')),
  confirm_token     text not null unique,
  unsubscribe_token text not null unique,
  source            text,                 -- e.g. 'nachfrage_report_2026'
  consent_ip        text,                 -- double-opt-in proof (Art. 7(1) Nachweispflicht)
  created_at        timestamptz not null default now(),
  confirmed_at      timestamptz,
  unsubscribed_at   timestamptz
);

-- One active (pending|confirmed) subscription per email address.
-- After unsubscribe the row stays (status='unsubscribed') but no longer blocks a re-subscribe.
create unique index if not exists report_subscribers_email_active_uidx
  on public.report_subscribers (lower(email))
  where status in ('pending', 'confirmed');

create index if not exists report_subscribers_confirm_token_idx
  on public.report_subscribers (confirm_token);

create index if not exists report_subscribers_unsub_token_idx
  on public.report_subscribers (unsubscribe_token);

-- RLS: service-role only. No anon/authenticated policy => deny-by-default (table holds PII).
alter table public.report_subscribers enable row level security;

create policy "service_role full access" on public.report_subscribers
  for all
  to service_role
  using (true)
  with check (true);

-- ============================ ROLLBACK ==========================
-- Run manually if the migration must be reverted:
-- drop table if exists public.report_subscribers;
