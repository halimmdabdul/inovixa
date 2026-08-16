const DEFAULT_SITE_URL = "https://inovixadigital.com";

/**
 * Falls back to the production domain for any value that isn't a usable
 * absolute URL — unset, empty, whitespace, or missing a protocol — so a
 * misconfigured NEXT_PUBLIC_SITE_URL env var (a common Vercel footgun) can
 * never crash metadata generation.
 */
function resolveSiteUrl() {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!candidate) return DEFAULT_SITE_URL;

  try {
    return new URL(candidate).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteConfig = {
  name: "Inovixa Digital",
  shortName: "Inovixa",
  tagline: "Websites Built to Grow Your Business.",
  description:
    "Inovixa Digital designs and modernizes fast, high-performing websites for local businesses that want more calls, bookings, leads, and customers.",
  url: resolveSiteUrl(),
  email: "hello@inovixadigital.com",
  locale: "en_US",
} as const;

export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const footerNav = {
  services: [
    { label: "Website Redesign", href: "/services/website-redesign" },
    { label: "New Websites", href: "/services/website-development" },
    { label: "Local SEO", href: "/services/local-seo" },
    { label: "Website Care", href: "/services/website-maintenance" },
    { label: "Custom Solutions", href: "/services#custom-solutions" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Process", href: "/#how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Website Audit", href: "/audit" },
    { label: "FAQ", href: "/#faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;

export const ctaText = {
  primary: "Get Your Free Website Audit",
  secondary: "View Our Work",
} as const;
