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

-- Inovixa Digital — team_members table
--
-- Backs the "Meet the Team" section, managed entirely from /admin/team.
-- The table starts empty and the public site section stays hidden until an
-- admin adds a real person — nothing here is seeded or fabricated. Publicly
-- readable (it's meant to be shown on the site), but only a signed-in admin
-- can add, edit, or remove entries.

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  role text not null,
  email text,
  bio text,
  photo_url text,
  display_order integer not null default 0
);

alter table public.team_members enable row level security;

create policy "Anyone can read team members"
  on public.team_members
  for select
  to anon, authenticated
  using (true);

create policy "Authenticated users can manage team members"
  on public.team_members
  for all
  to authenticated
  using (true)
  with check (true);

create index if not exists team_members_order_idx on public.team_members (display_order, created_at);

-- Inovixa Digital — blog_posts table
--
-- Backs the public /blog section, managed entirely from /admin/blog instead
-- of the old lib/data/blog-posts.ts static file. `content` stores the raw
-- article body as plain text with blank lines between paragraphs — the site
-- splits it into <p> tags at render time (see lib/blog.ts), so the admin
-- form is just a single textarea instead of a rich text editor. Publicly
-- readable, but only a signed-in admin can add, edit, or remove posts. The
-- category is constrained to the fixed list the site has matching
-- illustrations for (see components/illustrations/blog-scenes.tsx).

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  category text not null check (category in (
    'Website Design', 'Website Redesign', 'Local SEO', 'Small Business Marketing',
    'Website Performance', 'Conversion Optimization', 'Business Technology'
  )),
  content text not null,
  published_at date not null default current_date
);

alter table public.blog_posts enable row level security;

create policy "Anyone can read blog posts"
  on public.blog_posts
  for select
  to anon, authenticated
  using (true);

create policy "Authenticated users can manage blog posts"
  on public.blog_posts
  for all
  to authenticated
  using (true)
  with check (true);

create index if not exists blog_posts_published_at_idx on public.blog_posts (published_at desc);

-- Seeds the table with the site's original 9 launch articles so migrating
-- from the static file to this table doesn't empty the blog. Safe to run
-- more than once — existing slugs are left untouched.
insert into public.blog_posts (slug, title, excerpt, category, content, published_at) values
  ('signs-your-business-website-needs-a-redesign', '7 Signs Your Business Website Needs a Redesign', 'Not sure if it''s time for a new website? Here are the clearest signs your current site is holding your business back.', 'Website Redesign', 'Most business owners know their website feels "off" long before they can explain why. Usually it comes down to a handful of clear warning signs.

1. It looks outdated compared to your competitors. If a visitor can guess your website is more than a few years old just by looking at it, that impression carries over to how they see your business.

2. It''s slow to load, especially on mobile. Customers rarely wait around for a slow page to finish loading. They leave and call the next business instead.

3. It''s hard to use on a phone. If text is too small, buttons are hard to tap, or menus don''t work well on mobile, you''re losing customers before they even see what you offer.

4. There''s no clear way to contact you. Visitors shouldn''t have to search for your phone number or a contact form. It should be obvious on every page.

5. It gets traffic but few leads. If people are visiting but not calling or filling out a form, the site isn''t doing its job.

6. You can''t find your own business in search results. If your website struggles with basic SEO foundations, potential customers may never find it at all.

7. You''re embarrassed to share the link. If you hesitate before sending your own website to a potential customer, that''s usually the clearest sign of all.

If any of these sound familiar, a redesign focused on modern design, speed, and mobile usability can make an immediate difference in how your business is perceived online.', '2025-11-03'),
  ('how-much-should-a-small-business-website-cost', 'How Much Should a Small Business Website Cost?', 'A practical breakdown of what affects website pricing, so you know what to expect before you start a project.', 'Website Design', 'Website pricing varies widely because "a website" can mean very different things depending on the business.

A simple website for a business that needs a professional online presence, a handful of pages, and a contact form typically starts in the $999-$2,000 range.

A more customized website with additional pages, a blog, local SEO foundations, and conversion-focused design usually falls in the $1,800-$3,000 range.

Businesses that need custom functionality, such as booking systems, customer portals, or integrations with other software, should expect costs starting around $3,000 and scaling with complexity.

Beyond the initial build, most businesses also benefit from an ongoing website care plan that covers hosting, backups, security monitoring, and small updates, typically starting around $99 per month.

The most important question isn''t "what''s the cheapest option," but "what will actually generate a return." A website that converts a few extra customers a month often pays for itself many times over.', '2025-11-10'),
  ('why-your-website-gets-traffic-but-no-leads', 'Why Your Website Gets Traffic but No Leads', 'Getting visitors isn''t the same as getting customers. Here''s what usually breaks between the two.', 'Conversion Optimization', 'Traffic is only useful if it leads to action. If your analytics show visitors but your phone isn''t ringing, the issue is usually one of a few common problems.

Weak or unclear calls to action. If visitors don''t immediately understand how to contact you, most won''t look for a way.

Confusing navigation. If people can''t quickly find the information they came for, they leave rather than dig around.

Slow loading pages. Every extra second of load time increases the chance a visitor leaves before the page even finishes loading.

Poor mobile experience. Most local searches happen on phones. A site that''s hard to use on mobile loses the majority of its potential leads immediately.

No trust signals. Visitors want to feel confident they''re contacting a real, professional business before they reach out.

Fixing these issues usually doesn''t require a complete rebuild, but it does require an honest look at how the website is guiding (or failing to guide) visitors toward contacting you.', '2025-11-17'),
  ('website-redesign-checklist-for-small-businesses', 'Website Redesign Checklist for Small Businesses', 'A practical checklist to plan a website redesign that actually improves results, not just appearance.', 'Website Redesign', 'A successful redesign is about more than a new look. Use this checklist to make sure the important things get addressed.

Define your goal. More calls? More form submissions? More bookings? Every design decision should support that goal.

Audit your current content. Keep what works, remove what doesn''t, and identify gaps in your service pages.

Plan your site structure before design begins. Clear navigation makes it easier for visitors and search engines to understand your business.

Prioritize mobile design. Design for phones first, then adapt for larger screens.

Include clear calls to action on every page, not just the homepage.

Set performance goals. Fast loading should be treated as a requirement, not an afterthought.

Plan your SEO foundations, including titles, descriptions, and clean URLs, from the start of the project.

Test thoroughly on real devices before launch, not just in a browser window.', '2025-11-24'),
  ('how-website-speed-affects-customer-experience', 'How Website Speed Affects Customer Experience', 'Speed isn''t just a technical detail. It directly affects how customers perceive your business.', 'Website Performance', 'Website speed shapes a visitor''s first impression before they''ve read a single word of your content.

A slow-loading website signals to visitors, often unconsciously, that a business might be outdated or difficult to work with.

On mobile especially, slow pages lead to high bounce rates. Customers searching for a local service usually have several other options a tap away.

Speed also affects search visibility. Search engines factor performance into how websites are ranked, particularly for mobile searches.

Improving speed usually comes down to a few core practices: optimized images, minimal unnecessary scripts, efficient code, and modern hosting.

Treating performance as a core part of the design process, rather than an afterthought, leads to a noticeably better experience for real customers.', '2025-12-01'),
  ('what-every-local-business-website-should-include', 'What Every Local Business Website Should Include', 'The essential pages and features every local service business website needs to earn trust and generate leads.', 'Small Business Marketing', 'Regardless of industry, most effective local business websites share the same core elements.

A clear homepage headline that explains what you do and who you help.

Dedicated pages for each core service, rather than a single page trying to cover everything.

An easy-to-find contact page with a phone number, address, and simple contact form.

Clear service area information so customers know if you serve their location.

Mobile-friendly design, since most local searches happen on phones.

Basic SEO foundations, including proper titles, descriptions, and structured content.

Real photos where possible, since generic stock imagery can reduce trust.

A clear next step on every page, whether that''s calling, booking, or requesting a quote.', '2025-12-08'),
  ('website-vs-facebook-page-what-does-your-business-need', 'Website vs Facebook Page: What Does Your Business Need?', 'Many small businesses start with only a Facebook page. Here''s why a website matters even if social media works too.', 'Small Business Marketing', 'A Facebook page can be a useful starting point, but it has real limitations as a business''s only online presence.

You don''t control the platform. Design, layout, and features can change at any time, and you''re limited to what the platform allows.

A website builds more credibility. Many customers still expect a real business to have its own website, separate from social media.

Search visibility is limited. A website gives you far more control over how you appear in search results for the services you offer.

A website works better as a long-term asset. It''s a dedicated space you fully control, designed specifically to represent your business and convert visitors into customers.

The two aren''t mutually exclusive. Many businesses use social media to stay connected with customers while relying on their website as the primary place new customers learn about them and get in touch.', '2025-12-15'),
  ('how-to-make-your-website-generate-more-calls', 'How to Make Your Website Generate More Calls', 'Practical, non-technical changes that can help turn more website visitors into phone calls.', 'Conversion Optimization', 'If phone calls are your main goal, your website should be built around making that action as easy as possible.

Put your phone number in the header of every page, not just the contact page.

Use a click-to-call button on mobile so visitors can call with a single tap.

Repeat your call to action after key sections, such as after describing your services.

Keep the path to contacting you short. Don''t make visitors click through several pages to find your number.

Build trust before asking for the call. Clear service descriptions and professional design make visitors more comfortable reaching out.

Small, focused changes like these often make a meaningful difference in how many visitors actually pick up the phone.', '2025-12-22'),
  ('local-seo-basics-for-service-businesses', 'Local SEO Basics for Service Businesses', 'An introduction to the local SEO fundamentals that help nearby customers find your business online.', 'Local SEO', 'Local SEO helps your business show up when nearby customers search for the services you offer.

Start with your Google Business Profile. Keep your business name, address, phone number, and hours accurate and up to date.

Make sure your website clearly states the areas you serve, ideally with dedicated content rather than a single vague mention.

Use consistent business information across your website, directories, and profiles. Inconsistent details can hurt trust and rankings.

Create content around the specific services you offer, rather than relying on a single general services page.

Technical foundations matter too. A fast, mobile-friendly, well-structured website gives search engines fewer reasons to rank you lower.

Local SEO is an ongoing process rather than a one-time task, but getting the foundations right makes every future improvement more effective.', '2026-01-05'),
  ('what-makes-a-good-roofing-company-website', 'What Makes a Good Roofing Company Website?', 'The specific features that help roofing companies turn website visitors into booked estimates.', 'Business Technology', 'Roofing customers often reach out during stressful situations, like storm damage or an active leak. Your website should make getting help feel simple.

Lead with trust. Clear photos of past work, licensing and insurance information, and straightforward service descriptions all help.

Make requesting an estimate effortless, with a short form and a visible phone number on every page.

Highlight your service area clearly, since roofing is inherently a local service.

Explain your services in plain language. Not every customer knows the difference between repair types or material options.

Ensure the site works flawlessly on mobile. Many roofing inquiries happen from a phone, often right after noticing damage.

A roofing website built around these priorities does far more than look professional. It actively helps turn visitors into booked jobs.', '2026-01-12')
on conflict (slug) do nothing;

-- Inovixa Digital — call_bookings table
--
-- Backs the in-house "Book a 15-Min Call" scheduler (no third-party
-- scheduling account required). Same write pattern as leads: only the
-- server can insert, using the secret key, so a browser can never write
-- directly. The `unique (scheduled_at)` constraint is what actually
-- prevents double-booking a slot under concurrent requests — the insert
-- fails at the database level if two people submit the same time within
-- the same race window, and the server action surfaces that as a
-- "no longer available" message instead of silently overwriting it.

create table if not exists public.call_bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  scheduled_at timestamptz not null unique,
  name text not null,
  email text not null,
  phone text,
  business_name text,
  message text,
  status text not null default 'scheduled'
    check (status in ('scheduled', 'completed', 'cancelled', 'no_show'))
);

alter table public.call_bookings enable row level security;

create policy "Authenticated users can view call bookings"
  on public.call_bookings
  for select
  to authenticated
  using (true);

create policy "Authenticated users can update call bookings"
  on public.call_bookings
  for update
  to authenticated
  using (true)
  with check (true);

-- No insert/delete policy for anon/authenticated — bookings are written
-- exclusively by the server using the secret key (see lib/supabase/admin.ts).

create index if not exists call_bookings_scheduled_at_idx on public.call_bookings (scheduled_at);
