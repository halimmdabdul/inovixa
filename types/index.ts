import type { LucideIcon } from "lucide-react";

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  ctaLabel: string;
  features: string[];
  idealFor: string[];
  faqs: FAQItem[];
  imageUrl: string | null;
}

export interface ServiceRow {
  id: string;
  created_at: string;
  updated_at: string;
  slug: string;
  name: string;
  short_name: string;
  description: string;
  long_description: string;
  cta_label: string;
  features: string[];
  ideal_for: string[];
  faqs: FAQItem[];
  image_url: string | null;
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

export interface CaseStudyMetric {
  label: string;
  value: string;
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
  metrics: CaseStudyMetric[];
  coverImageUrl: string | null;
}

export interface CaseStudyRow {
  id: string;
  created_at: string;
  updated_at: string;
  slug: string;
  title: string;
  industry: string;
  is_concept: boolean;
  summary: string;
  problem: string;
  before: string;
  solution: string;
  design: string;
  development: string;
  mobile_improvements: string;
  performance_improvements: string;
  seo_setup: string;
  lead_strategy: string;
  improvements: CaseStudyImprovement[];
  metrics: CaseStudyMetric[];
  cover_image_url: string | null;
}

export interface ClientResult {
  clientName: string;
  business: string;
  industry: string;
  before: string;
  whatWeChanged: string;
  result: string;
  quote: string;
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
  categories: {
    seo: number;
    speed: number;
    mobile: number;
  };
}

export type LeadSource = "website_audit" | "contact_form" | "seo_checker";

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal_sent"
  | "won"
  | "lost";

export interface LeadRow {
  id: string;
  created_at: string;
  source: LeadSource;
  status: LeadStatus;
  name: string;
  business_name: string;
  email: string;
  phone: string | null;
  website_url: string | null;
  industry: string | null;
  website_goal: string | null;
  website_problem: string | null;
  service_interest: string | null;
  budget: string | null;
  message: string | null;
}

export type BookingStatus = "scheduled" | "completed" | "cancelled" | "no_show";

export interface CallBookingRow {
  id: string;
  created_at: string;
  scheduled_at: string;
  name: string;
  email: string;
  phone: string | null;
  business_name: string | null;
  message: string | null;
  status: BookingStatus;
}

export interface TeamMemberRow {
  id: string;
  created_at: string;
  name: string;
  role: string;
  email: string | null;
  bio: string | null;
  photo_url: string | null;
  display_order: number;
}

export type BlogCategory =
  | "Website Design"
  | "Website Redesign"
  | "Local SEO"
  | "Small Business Marketing"
  | "Website Performance"
  | "Conversion Optimization"
  | "Business Technology";

export interface BlogPostRow {
  id: string;
  created_at: string;
  updated_at: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  content: string;
  published_at: string;
  cover_image_url: string | null;
}
