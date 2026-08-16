import type { LucideIcon } from "lucide-react";

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  ctaLabel: string;
  features: string[];
  idealFor: string[];
  faqs: FAQItem[];
}

export interface Problem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface WhyPoint {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Industry {
  slug: string;
  name: string;
  icon: LucideIcon;
  description: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  priceSuffix?: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export interface CarePlan {
  id: string;
  name: string;
  price: string;
  priceSuffix: string;
  features: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CaseStudyImprovement {
  area: string;
  before: string;
  after: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  isConcept: boolean;
  summary: string;
  problem: string;
  before: string;
  solution: string;
  design: string;
  development: string;
  mobileImprovements: string;
  performanceImprovements: string;
  seoSetup: string;
  leadStrategy: string;
  improvements: CaseStudyImprovement[];
  metrics?: {
    label: string;
    value: string;
  }[];
  coverImage: string;
}

export interface Testimonial {
  name: string;
  company: string;
  role?: string;
  quote: string;
  image?: string;
}

export interface SeoCheckItem {
  id: string;
  label: string;
  status: "pass" | "warn" | "fail";
  detail: string;
}

export interface SeoCheckResult {
  score: number;
  finalUrl: string;
  checks: SeoCheckItem[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  content: string[];
}
