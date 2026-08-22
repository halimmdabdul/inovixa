import { z } from "zod";

export const caseStudySchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Enter a URL slug.")
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only."),
  title: z.string().trim().min(1, "Enter a title."),
  industry: z.string().trim().min(1, "Enter an industry."),
  isConcept: z.boolean(),
  summary: z.string().trim().min(1, "Enter a summary."),
  problem: z.string().trim().min(1, "Describe the problem."),
  before: z.string().trim().min(1, "Describe the site before."),
  solution: z.string().trim().min(1, "Describe the solution."),
  design: z.string().trim().min(1, "Describe the design approach."),
  development: z.string().trim().min(1, "Describe the development approach."),
  mobileImprovements: z.string().trim().min(1, "Describe the mobile improvements."),
  performanceImprovements: z.string().trim().min(1, "Describe the performance improvements."),
  seoSetup: z.string().trim().min(1, "Describe the SEO setup."),
  leadStrategy: z.string().trim().min(1, "Describe the lead-generation strategy."),
  improvements: z
    .array(
      z.object({
        area: z.string().trim().min(1, "Enter an area."),
        before: z.string().trim().min(1, "Enter the before state."),
        after: z.string().trim().min(1, "Enter the after state."),
      }),
    )
    .min(1, "Add at least one improvement."),
  metrics: z
    .array(
      z.object({
        label: z.string().trim().min(1, "Enter a label."),
        value: z.string().trim().min(1, "Enter a value."),
      }),
    )
    .default([]),
  coverImageUrl: z.string().trim().url("Enter a valid image URL.").optional().or(z.literal("")),
});

export type CaseStudyValues = z.infer<typeof caseStudySchema>;
