export const siteConfig = {
  name: "Inovixa Digital",
  shortName: "Inovixa",
  tagline: "Websites Built to Grow Your Business.",
  description:
    "Inovixa Digital designs and modernizes fast, high-performing websites for local businesses that want more calls, bookings, leads, and customers.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://inovixadigital.com",
  email: "hello@inovixadigital.com",
  locale: "en_US",
} as const;

export const primaryNav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
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
