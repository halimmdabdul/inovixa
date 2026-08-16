import { siteConfig } from "@/lib/constants/site";
import { founder } from "@/lib/data/founder";
import type { FAQItem } from "@/types";

/**
 * Founder social links are optional (see lib/data/founder.ts) — only include
 * a sameAs entry once a real URL exists, rather than publishing empty or
 * placeholder links in structured data.
 */
function founderSameAs() {
  return [founder.linkedinUrl, founder.githubUrl].filter(Boolean);
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/apple-icon`,
    description: siteConfig.description,
    email: siteConfig.email,
    areaServed: ["US", "GB"],
    priceRange: "$$",
    founder: {
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.title,
      ...(founderSameAs().length > 0 ? { sameAs: founderSameAs() } : {}),
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.email,
      contactType: "customer service",
    },
    ...(founderSameAs().length > 0 ? { sameAs: founderSameAs() } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function faqJsonLd(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function serviceJsonLd(service: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: service.name,
    description: service.description,
    url: `${siteConfig.url}${service.path}`,
    provider: {
      "@type": "ProfessionalService",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: ["US", "GB"],
  };
}

export function articleJsonLd(post: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url: `${siteConfig.url}${post.path}`,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}
