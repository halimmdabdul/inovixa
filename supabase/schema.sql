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
