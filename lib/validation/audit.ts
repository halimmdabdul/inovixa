import { z } from "zod";

export const auditFormSchema = z.object({
  websiteUrl: z
    .string()
    .trim()
    .min(1, "Enter your current website URL, or \"none\" if you don't have one yet."),
  name: z.string().trim().min(2, "Enter your full name."),
  businessName: z.string().trim().min(2, "Enter your business name."),
  businessEmail: z.string().trim().email("Enter a valid business email."),
  phone: z.string().trim().optional().or(z.literal("")),
  industry: z.string().trim().min(1, "Select your industry."),
  websiteGoal: z.string().trim().min(1, "Select your main website goal."),
  websiteProblem: z
    .string()
    .trim()
    .min(1, "Tell us about your biggest website challenge."),
  message: z.string().trim().optional().or(z.literal("")),
  consent: z.literal(true, {
    error: "Please confirm you agree to be contacted about your audit.",
  }),
  // Honeypot field: real visitors never fill this in.
  companyWebsite: z.string().max(0).optional().or(z.literal("")),
  // Timestamp of when the form was rendered, used for a submission-timing spam check.
  formRenderedAt: z.number(),
});

export type AuditFormValues = z.infer<typeof auditFormSchema>;

export const industryOptions = [
  "Roofing",
  "Plumbing",
  "HVAC",
  "Dental",
  "Auto Repair",
  "Cleaning",
  "Landscaping",
  "Construction",
  "Real Estate",
  "Accounting",
  "Other",
] as const;

export const websiteGoalOptions = [
  "Get more calls",
  "Get more form submissions / quote requests",
  "Get more bookings",
  "Look more professional online",
  "Improve search visibility",
  "Not sure yet",
] as const;
