import { z } from "zod";

export const siteCheckerSchema = z.object({
  websiteUrl: z.string().trim().min(1, "Enter your website URL."),
  // Honeypot field: real visitors never fill this in.
  companyWebsite: z.string().max(0).optional().or(z.literal("")),
  // Timestamp of when the form was rendered, used for a submission-timing spam check.
  formRenderedAt: z.number(),
});

export type SiteCheckerValues = z.infer<typeof siteCheckerSchema>;
