# Inovixa Digital

Marketing website for Inovixa Digital, an agency that redesigns and builds
websites for local service businesses.

## Project Overview

Built with the Next.js App Router, this site includes:

- Homepage, services, pricing, work, about, blog, contact, and legal pages
- A free website audit funnel (`/audit`) and a contact form (`/contact`),
  both with server-side validation, honeypot spam protection, and a
  Resend-ready email notification pipeline
- A homepage "site checker" tool: visitors submit a URL and get a real,
  automated technical SEO score
- SEO metadata, JSON-LD structured data, `robots.ts`, and `sitemap.ts`
- Marketing content centralized in `lib/data` for easy editing

## Technology Stack

- Next.js (App Router, TypeScript, Server Components)
- Tailwind CSS v4
- React Hook Form + Zod for form validation
- Resend (email) — ready to enable
- Supabase (lead storage) — ready to enable
- Lucide React icons

## Local Development

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values you have:

```bash
cp .env.example .env.local
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Used for canonical URLs, sitemap, and metadata |
| `RESEND_API_KEY` | Optional | Enables email notifications for form submissions |
| `AUDIT_NOTIFICATION_EMAIL` | Optional | Recipient for website audit request notifications |
| `CONTACT_NOTIFICATION_EMAIL` | Optional | Recipient for contact form notifications |
| `NEXT_PUBLIC_GA_ID` | Optional | Enables Google Analytics |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY` | Optional | Enables Supabase lead storage (see `lib/leads.ts`) |

The site runs and forms still work with none of these set — submissions are
simply logged instead of emailed or stored.

## Running the Development Server

```bash
npm run dev
```

## Building for Production

```bash
npm run build
npm run start
```

## Linting

```bash
npm run lint
```

## Deployment

Optimized for deployment on [Vercel](https://vercel.com). Connect the repo,
set the environment variables above in the project settings, and deploy.

## Forms

- `/audit` and `/contact` use React Hook Form + Zod for client-side
  validation and Next.js Server Actions (`app/actions/audit.ts`,
  `app/actions/contact.ts`) for server-side validation, spam checks, and
  email delivery.
- Spam protection: a hidden honeypot field plus a submission-timing check
  (see `lib/validation/spam-check.ts`). No CAPTCHA is required.
- Email delivery uses Resend and only activates once `RESEND_API_KEY` is set
  (`lib/email.ts`).

## Site Checker Tool

The homepage "See Your SEO Score in Seconds" section (`app/actions/site-checker.ts`)
lets a visitor submit a URL and get back a real technical SEO score:

- The submitted URL is fetched server-side with SSRF guards (`lib/seo/fetch-safely.ts`):
  only public hostnames are allowed (private/loopback/link-local IPs and cloud
  metadata addresses are blocked), every redirect hop is re-validated, and
  there's a response size cap and timeout.
- The fetched HTML is scored against 10 real, verifiable technical SEO
  signals (HTTPS, title/meta description, mobile viewport tag, heading
  structure, image alt text, Open Graph tags, canonical URL, response
  speed, and indexability) in `lib/seo/score.ts`. Nothing here is
  fabricated — it's an automated technical scan, and the UI says so.
- A lightweight in-memory rate limiter (`lib/rate-limit.ts`) throttles
  repeated requests per IP, since this endpoint fetches arbitrary URLs.
  It's best-effort per serverless instance; swap in Vercel KV/Upstash for
  real distributed rate limiting in production.

## Analytics

Google Analytics loads only when `NEXT_PUBLIC_GA_ID` is set
(`components/analytics/google-analytics.tsx`). No other analytics providers
are wired up yet.

## SEO

- Metadata is built per-page with `lib/seo/metadata.ts`.
- Structured data (Organization, WebSite, Service, BreadcrumbList, FAQPage,
  Article) lives in `lib/seo/jsonld.ts` and is rendered via
  `components/seo/json-ld.tsx`.
- `app/robots.ts` and `app/sitemap.ts` generate `robots.txt` and
  `sitemap.xml` automatically from the site's route and content data.

## Content Editing

Marketing copy and structured content live in `lib/data/`:

- `services.ts`, `industries.ts`, `pricing.ts`, `process.ts`, `problems.ts`,
  `why-us.ts`, `faqs.ts`, `case-studies.ts`, `blog-posts.ts`,
  `testimonials.ts`

Editing these files updates the corresponding pages without touching
component code. This structure is intentionally CMS-ready — a future
migration to Sanity, Supabase, or another headless CMS only requires
swapping how these files are populated, not the components that render them.

## Future Supabase Setup

Lead storage is stubbed in `lib/leads.ts` against a planned `website_audits`
table. To enable it:

1. Create a Supabase project and the `website_audits` table (see the shape
   documented in `lib/leads.ts`).
2. Install `@supabase/supabase-js`.
3. Set `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
4. Implement the insert call noted in `lib/leads.ts`.

## Notes

- Testimonials are hidden until real client quotes are added to
  `lib/data/testimonials.ts`.
- Work/case studies are currently labeled concept projects for fictional
  businesses. No fabricated metrics are included.
- `/privacy` and `/terms` are general starter templates and should be
  reviewed by a qualified professional before launch.
