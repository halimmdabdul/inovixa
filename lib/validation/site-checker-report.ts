import { z } from "zod";

export const siteCheckerReportSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  websiteUrl: z.string().trim().min(1),
  // Honeypot field: real visitors never fill this in.
  companyWebsite: z.string().max(0).optional().or(z.literal("")),
  // Timestamp of when the form was rendered, used for a submission-timing spam check.
  formRenderedAt: z.number(),
});

export type SiteCheckerReportValues = z.infer<typeof siteCheckerReportSchema>;
