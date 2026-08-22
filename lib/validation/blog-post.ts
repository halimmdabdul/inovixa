import { z } from "zod";

export const blogCategories = [
  "Website Design",
  "Website Redesign",
  "Local SEO",
  "Small Business Marketing",
  "Website Performance",
  "Conversion Optimization",
  "Business Technology",
] as const;

export const blogPostSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Enter a URL slug.")
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only."),
  title: z.string().trim().min(1, "Enter a title."),
  excerpt: z.string().trim().min(1, "Enter a short excerpt.").max(300, "Keep the excerpt under 300 characters."),
  category: z.enum(blogCategories, { message: "Select a category." }),
  content: z.string().trim().min(1, "Enter the article content."),
  publishedAt: z.string().trim().min(1, "Select a publish date."),
});

export type BlogPostValues = z.infer<typeof blogPostSchema>;
