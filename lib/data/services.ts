import { Globe, RefreshCw, Search, ShieldCheck } from "lucide-react";
import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "website-redesign",
    name: "Website Redesign",
    shortName: "Website Redesign",
    description:
      "Modernize outdated websites with better design, UX, speed, SEO foundations, and lead generation.",
    longDescription:
      "If your website looks dated, loads slowly, or simply isn't bringing in customers anymore, a redesign gives your business a modern, fast, mobile-friendly website built to turn visitors into leads.",
    icon: RefreshCw,
    ctaLabel: "Learn About Website Redesign",
    features: [
      "Modern, professional design",
      "Mobile-first rebuild",
      "Faster loading speed",
      "Improved navigation and messaging",
      "SEO-friendly structure",
      "Stronger calls to action",
    ],
    idealFor: [
      "Businesses with a website older than 3-4 years",
      "Sites that look outdated compared to competitors",
      "Websites that get traffic but few leads",
    ],
  },
  {
    slug: "website-development",
    name: "New Business Websites",
    shortName: "New Websites",
    description:
      "Professional websites for businesses that currently have no website or need a completely new digital presence.",
    longDescription:
      "Starting from scratch, we build a professional, fast, mobile-first website designed to establish trust and generate calls, bookings, and leads from day one.",
    icon: Globe,
    ctaLabel: "Build My Website",
    features: [
      "Custom-designed pages",
      "Mobile-first responsive build",
      "Contact and quote forms",
      "Google Maps and business info",
      "Basic on-page SEO setup",
      "Launch and analytics setup",
    ],
    idealFor: [
      "Businesses with no website yet",
      "New businesses building a first impression",
      "Businesses replacing a Facebook-only presence",
    ],
  },
  {
    slug: "local-seo",
    name: "Local SEO",
    shortName: "Local SEO",
    description:
      "Improve visibility for customers searching for local services.",
    longDescription:
      "Being found matters as much as looking good. We improve your technical SEO foundations and local search presence so nearby customers can find your business when they search.",
    icon: Search,
    ctaLabel: "Explore Local SEO",
    features: [
      "Local SEO foundations",
      "Google Business Profile support",
      "On-page SEO improvements",
      "Search visibility monitoring",
      "Content optimization",
      "Monthly growth reporting",
    ],
    idealFor: [
      "Businesses that rely on local customers",
      "Businesses invisible in local search results",
      "Businesses ready to grow beyond word of mouth",
    ],
  },
  {
    slug: "website-maintenance",
    name: "Website Care",
    shortName: "Website Care",
    description:
      "Ongoing hosting, updates, backups, security monitoring, and website improvements.",
    longDescription:
      "A website is never really \"done.\" Our Website Care plans keep your site fast, secure, and up to date, so you can focus on running your business instead of worrying about hosting or updates.",
    icon: ShieldCheck,
    ctaLabel: "View Website Care",
    features: [
      "Reliable hosting",
      "Regular backups",
      "Security monitoring",
      "Software and plugin updates",
      "Uptime monitoring",
      "Small content changes included",
    ],
    idealFor: [
      "Businesses that want peace of mind",
      "Owners who don't want to manage hosting themselves",
      "Sites that need ongoing improvements",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
