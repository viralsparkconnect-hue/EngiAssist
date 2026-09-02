-- ============================================================
-- EngiAssist — Supabase schema
-- Run this once in your Supabase project's SQL Editor
-- (Dashboard → SQL Editor → New query → paste → Run)
-- ============================================================

-- 1. Leads table (every contact-form submission lands here)
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  branch text not null,
  semester text,
  project text,
  project_status text,                      -- idea | started | partial | almost
  deadline date,
  lead_code text,                           -- friendly ref shown to the student, e.g. EA-482913
  message text,
  status text not null default 'new',       -- new | contacted | closed
  created_at timestamptz not null default now()
);

-- If you already ran this schema before, run this once to add the new columns
-- without losing existing leads:
-- alter table public.leads add column if not exists project_status text;
-- alter table public.leads add column if not exists deadline date;
-- alter table public.leads add column if not exists lead_code text;

-- 2. Lock the table down with Row Level Security
alter table public.leads enable row level security;

-- Anyone (the public website, using the anon key) can INSERT a lead —
-- this is what lets the contact form work without login.
drop policy if exists "public can insert leads" on public.leads;
create policy "public can insert leads"
  on public.leads for insert
  to anon
  with check (true);

-- Only a logged-in user (you, the site owner) can READ leads —
-- this is what powers the /dashboard page.
drop policy if exists "authenticated can read leads" on public.leads;
create policy "authenticated can read leads"
  on public.leads for select
  to authenticated
  using (true);

-- Only a logged-in user can update status (e.g. mark "contacted") or delete.
drop policy if exists "authenticated can update leads" on public.leads;
create policy "authenticated can update leads"
  on public.leads for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "authenticated can delete leads" on public.leads;
create policy "authenticated can delete leads"
  on public.leads for delete
  to authenticated
  using (true);

-- 3. Helpful index for the dashboard's "sort by newest" query
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- ============================================================
-- After running this:
-- Go to Authentication → Users → Add user, and create yourself
-- an email + password. That's the login for /dashboard.
-- ============================================================
