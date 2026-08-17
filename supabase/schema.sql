-- Inovixa Digital — leads table
--
-- Run this once in your Supabase project's SQL Editor
-- (Dashboard -> SQL Editor -> New query -> paste -> Run).
--
-- This table stores submissions from both the /audit and /contact forms.
-- Row-level security is enabled with a SELECT-only policy for signed-in
-- admins. There is deliberately no INSERT policy for the anon/authenticated
-- roles — new leads are written exclusively by the server using the
-- secret key (see lib/supabase/admin.ts), which bypasses RLS. This means a
-- lead can never be inserted directly by a browser, only read by an
-- authenticated admin.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null check (source in ('website_audit', 'contact_form', 'seo_checker')),
  status text not null default 'new'
    check (status in ('new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost')),
  name text not null,
  business_name text not null,
  email text not null,
  phone text,
  website_url text,
  industry text,
  website_goal text,
  website_problem text,
  service_interest text,
  budget text,
  message text
);

alter table public.leads enable row level security;

create policy "Authenticated users can view leads"
  on public.leads
  for select
  to authenticated
  using (true);

-- No insert/update/delete policies are defined, so only the secret key
-- (used server-side in lib/supabase/admin.ts) can write to this table.

create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Migration: run this if your leads table already exists from before the
-- "seo_checker" source was added (the free SEO checker's email-gated full
-- report). Safe to run even if already applied.
alter table public.leads drop constraint if exists leads_source_check;
alter table public.leads add constraint leads_source_check
  check (source in ('website_audit', 'contact_form', 'seo_checker'));

-- Inovixa Digital — site_settings table
--
-- Holds SEO settings editable from /admin/settings instead of requiring an
-- env var change and redeploy: the Google Analytics Measurement ID, and the
-- Google Search Console / Bing Webmaster Tools ownership verification codes.
-- This is a single-row "singleton" table — the `id = true` check constraint
-- makes a second row impossible. The row is publicly readable (these values
-- already end up in public page source; none of them are secret) but only
-- an authenticated admin can update it.

create table if not exists public.site_settings (
  id boolean primary key default true,
  ga_id text,
  google_site_verification text,
  bing_site_verification text,
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id)
);

insert into public.site_settings (id) values (true)
  on conflict (id) do nothing;

alter table public.site_settings enable row level security;

create policy "Anyone can read site settings"
  on public.site_settings
  for select
  to anon, authenticated
  using (true);

create policy "Authenticated users can update site settings"
  on public.site_settings
  for update
  to authenticated
  using (true)
  with check (true);

-- Inovixa Digital — analytics_events table
--
-- Backs the "which page and button do visitors click most" view at
-- /admin/analytics. Deliberately minimal and anonymous: no IP address, no
-- visitor ID, no user agent — just what was viewed/clicked and when. Same
-- write pattern as leads: only the server (via the secret key) can insert,
-- so a browser can never write directly. Only signed-in admins can read.

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_type text not null check (event_type in ('page_view', 'click')),
  path text not null,
  label text
);

alter table public.analytics_events enable row level security;

create policy "Authenticated users can view analytics"
  on public.analytics_events
  for select
  to authenticated
  using (true);

-- No insert policy for anon/authenticated — events are written exclusively
-- by the server using the secret key (see lib/supabase/admin.ts).

create index if not exists analytics_events_created_at_idx on public.analytics_events (created_at desc);
create index if not exists analytics_events_type_path_idx on public.analytics_events (event_type, path);
