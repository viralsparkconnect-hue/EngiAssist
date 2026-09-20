-- ============================================================
-- EngiAssist — OPTIONAL hardening for the leads table
-- Run in Supabase → SQL Editor. Safe to re-run.
--
-- 1) Limits what the public form can insert (stops giant/garbage rows).
-- 2) Lets ONLY your admin email read / change leads, instead of
--    any signed-in user.
--
-- BEFORE RUNNING: replace both YOUR_ADMIN_EMAIL values below with the
-- email you use to log in to /dashboard. If you get it wrong you will
-- lose dashboard access until you fix the email and run this again
-- (or run supabase/schema.sql to go back to the original policies).
--
-- This does NOT stop a determined spammer sending many valid-looking
-- leads. For that, add a captcha (e.g. Cloudflare Turnstile) or a
-- rate-limited Edge Function in front of the insert.
-- ============================================================

drop policy if exists "public can insert leads" on public.leads;
create policy "public can insert leads"
  on public.leads for insert
  to anon
  with check (
    char_length(name) between 1 and 120
    and char_length(email) between 3 and 254
    and (phone is null or char_length(phone) <= 20)
    and branch in ('cs','mech','civil','elec','it','chem')
    and (semester is null or char_length(semester) <= 40)
    and (project is null or char_length(project) <= 300)
    and (message is null or char_length(message) <= 2000)
    and (lead_code is null or char_length(lead_code) <= 20)
    and status = 'new'
  );

drop policy if exists "authenticated can read leads" on public.leads;
create policy "authenticated can read leads"
  on public.leads for select
  to authenticated
  using ((auth.jwt() ->> 'email') = 'YOUR_ADMIN_EMAIL');

drop policy if exists "authenticated can update leads" on public.leads;
create policy "authenticated can update leads"
  on public.leads for update
  to authenticated
  using ((auth.jwt() ->> 'email') = 'YOUR_ADMIN_EMAIL')
  with check ((auth.jwt() ->> 'email') = 'YOUR_ADMIN_EMAIL');

drop policy if exists "authenticated can delete leads" on public.leads;
create policy "authenticated can delete leads"
  on public.leads for delete
  to authenticated
  using ((auth.jwt() ->> 'email') = 'YOUR_ADMIN_EMAIL');
