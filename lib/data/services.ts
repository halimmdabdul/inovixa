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
    faqs: [
      {
        question: "How do I know if I need a redesign or a new website?",
        answer:
          "If you already have a website but it looks outdated, loads slowly, or isn't generating leads, a redesign is usually the right fit. If you have no website at all, our New Business Websites service is the better starting point.",
      },
      {
        question: "Will I lose my current content and search rankings?",
        answer:
          "We carry over your existing content and structure where it makes sense, and follow SEO best practices during the transition to protect the search visibility you already have.",
      },
      {
        question: "How long does a redesign take?",
        answer:
          "Timelines depend on scope, content readiness, and how quickly feedback comes back. We'll give you a realistic estimate after understanding your project during discovery.",
      },
      {
        question: "Can I keep my current domain and hosting?",
        answer:
          "In most cases, yes. We can work with your existing domain and hosting, or help you move to something more reliable if needed.",
      },
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
    faqs: [
      {
        question: "I don't have any content yet — can you still help?",
        answer:
          "Yes. We can help guide what content you need and write supporting copy where necessary.",
      },
      {
        question: "How fast can I get a website live?",
        answer:
          "Timelines depend on scope and how quickly content and feedback come together. We'll give you a realistic estimate during discovery.",
      },
      {
        question: "Do I need a logo before we start?",
        answer:
          "It helps, but it's not required. We can work with a simple text-based logo initially and update it later.",
      },
      {
        question: "What do I need to provide to get started?",
        answer:
          "Basic business information, a sense of your services and service area, and any existing branding or content you'd like included.",
      },
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
    faqs: [
      {
        question: "How long does local SEO take to show results?",
        answer:
          "Local SEO is an ongoing process rather than a one-time fix. Most businesses see meaningful movement over the following months, not days.",
      },
      {
        question: "Do I need a new website for local SEO to work?",
        answer:
          "No. Local SEO can improve an existing website, though a well-structured site makes the foundations stronger.",
      },
      {
        question: "What's included in local SEO setup?",
        answer:
          "Google Business Profile support, on-page SEO improvements, local content optimization, and search visibility monitoring.",
      },
      {
        question: "Can you guarantee a #1 ranking?",
        answer:
          "No one can honestly guarantee a specific ranking position. We focus on strengthening the foundations that improve your visibility over time.",
      },
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
    faqs: [
      {
        question: "What happens if I don't have a care plan?",
        answer:
          "Your site will still work, but hosting, backups, and updates become your responsibility.",
      },
      {
        question: "Do you handle hosting migration?",
        answer: "Yes, we can move your site to reliable hosting as part of getting started.",
      },
      {
        question: "What counts as a \"small content change\"?",
        answer:
          "Things like updating text, swapping a photo, or adjusting your hours or contact info.",
      },
      {
        question: "Do you monitor my site for security issues?",
        answer: "Yes, security and uptime monitoring are included so problems get caught early.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
