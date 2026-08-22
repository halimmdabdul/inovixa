import { z } from "zod";

export const bookCallSchema = z.object({
  slot: z.string().trim().min(1, "Select a time."),
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().optional().or(z.literal("")),
  businessName: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().max(500, "Keep it under 500 characters.").optional().or(z.literal("")),
  // Honeypot field: real visitors never fill this in.
  companyWebsite: z.string().max(0).optional().or(z.literal("")),
  // Timestamp of when the form was rendered, used for a submission-timing spam check.
  formRenderedAt: z.number(),
});

export type BookCallValues = z.infer<typeof bookCallSchema>;
