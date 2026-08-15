import { z } from "zod";
import { industryOptions } from "@/lib/validation/audit";

export const siteCheckerSchema = z.object({
  websiteUrl: z.string().trim().min(1, "Enter your website URL."),
  industry: z.string().trim().min(1, "Select your industry."),
  location: z.string().trim().min(2, "Enter your city or ZIP code."),
  // Honeypot field: real visitors never fill this in.
  companyWebsite: z.string().max(0).optional().or(z.literal("")),
  // Timestamp of when the form was rendered, used for a submission-timing spam check.
  formRenderedAt: z.number(),
});

export type SiteCheckerValues = z.infer<typeof siteCheckerSchema>;

export { industryOptions };
