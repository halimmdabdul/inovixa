import type { CaseStudy } from "@/types";

/**
 * All current projects are labeled concept projects for fictional businesses.
 * They demonstrate our design and development approach only — never present
 * them as real clients, and never attach fabricated metrics to them.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "summit-ridge-roofing",
    title: "Summit Ridge Roofing",
    industry: "Roofing",
    isConcept: true,
    summary:
      "A concept redesign turning a slow, text-heavy roofing site into a fast, mobile-first website built to book estimates.",
    problem:
      "The original concept site was slow, difficult to read on mobile, and gave visitors no clear way to request an estimate.",
    before:
      "A cluttered homepage with small text, no clear service pages, and a contact form buried at the bottom of the site.",
    solution:
      "A modern one-page-to-multi-page structure that leads visitors straight to services, service areas, and a simple estimate request form.",
    design:
      "Clean navy and white palette with bold imagery placeholders, large tap-friendly buttons, and clear service categories.",
    development:
      "Rebuilt with a component-based architecture, optimized images, and semantic HTML for fast, accessible rendering.",
    mobileImprovements:
      "Redesigned navigation, larger touch targets, and a sticky call button for mobile visitors.",
    performanceImprovements:
      "Optimized images and minimal JavaScript for fast loading on mobile connections.",
    seoSetup:
      "Structured service pages, local business schema, and optimized titles and descriptions for local roofing searches.",
    leadStrategy:
      "A prominent estimate request form and click-to-call button placed above the fold on every page.",
    improvements: [
      {
        area: "Homepage first impression",
        before: "A wall of small text with no clear starting point for visitors.",
        after: "One clear headline and a button to request an estimate, visible immediately.",
      },
      {
        area: "Requesting an estimate",
        before: "The contact form was buried at the very bottom of the page.",
        after: "An estimate form and phone number are visible on every page.",
      },
      {
        area: "Mobile experience",
        before: "Text too small to read comfortably and buttons too small to tap.",
        after: "Larger text and tap-friendly buttons designed for browsing on a phone.",
      },
      {
        area: "Finding services",
        before: "Roofing services were listed together in one long paragraph.",
        after: "Repair, replacement, and storm damage each get their own clear page.",
      },
      {
        area: "Page speed",
        before: "Slow to load, especially over a mobile connection.",
        after: "Optimized images and minimal code for fast loading on any connection.",
      },
      {
        area: "Being found in search",
        before: "No SEO structure, making it hard for Google to understand the site.",
        after: "Structured pages and local business info to help nearby searches find it.",
      },
    ],
    coverImage: "/images/work/summit-ridge-roofing.svg",
  },
  {
    slug: "brightview-dental",
    title: "Brightview Dental",
    industry: "Dental",
    isConcept: true,
    summary:
      "A concept website designed to help a dental clinic build trust online and make booking an appointment effortless.",
    problem:
      "The original concept practice had no website, relying only on a directory listing and word of mouth referrals.",
    before:
      "No dedicated website. Patients had no way to learn about services or request an appointment online.",
    solution:
      "A warm, professional website introducing the practice, services, and team, with a simple appointment request form.",
    design:
      "A calm, trustworthy design using soft neutrals with the Inovixa blue accent for calls to action.",
    development:
      "Built with reusable service and team components to make future updates simple.",
    mobileImprovements:
      "Mobile-first layout with a persistent call and booking button.",
    performanceImprovements:
      "Optimized fonts and images for fast load times on mobile networks.",
    seoSetup:
      "Local SEO foundations, service-specific pages, and structured data for a professional service.",
    leadStrategy:
      "Clear appointment request CTA repeated across every service page.",
    improvements: [
      {
        area: "Online presence",
        before: "No website — just a directory listing and word of mouth.",
        after: "A dedicated site introducing the practice, team, and services.",
      },
      {
        area: "Booking an appointment",
        before: "No way to request an appointment online.",
        after: "A simple appointment request form visible on every page.",
      },
      {
        area: "Mobile experience",
        before: "Nothing to browse on mobile — there was no site at all.",
        after: "A mobile-first layout with a persistent call and booking button.",
      },
      {
        area: "Search visibility",
        before: "Invisible in local search results for nearby patients.",
        after: "Local SEO foundations so the practice shows up in relevant searches.",
      },
      {
        area: "Building trust",
        before: "No photos, team information, or service details anywhere online.",
        after: "Team bios, service pages, and a calm, professional design.",
      },
    ],
    coverImage: "/images/work/brightview-dental.svg",
  },
  {
    slug: "harborline-realty",
    title: "Harborline Realty",
    industry: "Real Estate",
    isConcept: true,
    summary:
      "A concept redesign giving a small real estate team a modern, credible online presence to match larger competitors.",
    problem:
      "The original concept site looked outdated compared to national real estate platforms and lacked a clear agent contact path.",
    before:
      "Dated design, slow-loading listing pages, and no clear way to contact an individual agent.",
    solution:
      "A modern listings and agent-profile structure with clear contact paths for every property.",
    design:
      "A premium, editorial-style layout with generous whitespace and a confident typographic hierarchy.",
    development:
      "Modular listing and agent card components built for easy content updates.",
    mobileImprovements:
      "Fully responsive listing grids and simplified mobile filtering.",
    performanceImprovements:
      "Lazy-loaded imagery and optimized layout to reduce load time on listing-heavy pages.",
    seoSetup:
      "Structured data for real estate listings and location-based on-page SEO.",
    leadStrategy:
      "Inquiry forms on every listing and agent profile, with a clear path to schedule a viewing.",
    improvements: [
      {
        area: "First impression",
        before: "A dated design that looked years behind bigger real estate platforms.",
        after: "A premium, modern layout that competes with national sites.",
      },
      {
        area: "Finding an agent",
        before: "No clear way to contact the specific agent behind a listing.",
        after: "Every listing links to a dedicated agent profile with contact info.",
      },
      {
        area: "Browsing listings",
        before: "Slow-loading listing pages, especially with several photos.",
        after: "Lazy-loaded images keep listing pages fast even with more photos.",
      },
      {
        area: "Mobile experience",
        before: "Listings were hard to browse and filter on a phone.",
        after: "A fully responsive listing grid with simplified mobile filtering.",
      },
      {
        area: "Requesting a viewing",
        before: "No inquiry path on individual listing pages.",
        after: "An inquiry form on every listing and agent profile.",
      },
    ],
    coverImage: "/images/work/harborline-realty.svg",
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((project) => project.slug === slug);
}
