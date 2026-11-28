-- huseyinsade.dev — Supabase schema.
-- Run once in Supabase → SQL Editor. Safe to re-run.
--
-- The site talks to Supabase from the browser with the *publishable* key, so
-- every table has Row Level Security on and only the access below is allowed.
-- Anything else (reading messages, changing the status) is done from the
-- Supabase dashboard, which bypasses RLS.

-- ---------- Contact messages ----------
-- Visitors can only INSERT. Nobody can read them with the publishable key.
create table if not exists public.messages (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null check (char_length(name) between 1 and 100),
  email      text not null check (char_length(email) between 3 and 200 and email like '%_@_%'),
  message    text not null check (char_length(message) between 1 and 4000),
  lang       text check (lang in ('en', 'tr', 'de')),
  read       boolean not null default false
);

alter table public.messages enable row level security;

drop policy if exists "Visitors can send messages" on public.messages;
create policy "Visitors can send messages"
  on public.messages for insert
  to anon, authenticated
  with check (read = false);

revoke all on public.messages from anon, authenticated;
grant insert (name, email, message, lang) on public.messages to anon, authenticated;

create index if not exists messages_created_at_idx on public.messages (created_at desc);

-- ---------- Site status (single row) ----------
-- Read by the site to show "Open to new projects" in the hero.
-- Change it in Table Editor → site_status → available.
create table if not exists public.site_status (
  id         smallint primary key default 1 check (id = 1),
  available  boolean not null default true,
  updated_at timestamptz not null default now()
);

insert into public.site_status (id) values (1) on conflict (id) do nothing;

alter table public.site_status enable row level security;

drop policy if exists "Anyone can read the status" on public.site_status;
create policy "Anyone can read the status"
  on public.site_status for select
  to anon, authenticated
  using (true);

revoke all on public.site_status from anon, authenticated;
grant select (id, available, updated_at) on public.site_status to anon, authenticated;

create or replace function public.touch_updated_at() returns trigger
  language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists site_status_touch on public.site_status;
create trigger site_status_touch before update on public.site_status
  for each row execute function public.touch_updated_at();
