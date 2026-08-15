import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  businessName: z.string().trim().min(2, "Enter your business name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().optional().or(z.literal("")),
  websiteUrl: z.string().trim().optional().or(z.literal("")),
  serviceInterest: z.string().trim().min(1, "Select a service you're interested in."),
  budget: z.string().trim().min(1, "Select an estimated budget."),
  projectDetails: z.string().trim().min(10, "Tell us a bit more about your project."),
  // Honeypot field: real visitors never fill this in.
  companyWebsite: z.string().max(0).optional().or(z.literal("")),
  // Timestamp of when the form was rendered, used for a submission-timing spam check.
  formRenderedAt: z.number(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const serviceInterestOptions = [
  "Website Redesign",
  "New Website",
  "Local SEO",
  "Website Maintenance",
  "Web Application",
  "Automation",
  "Other",
] as const;

export const budgetOptions = [
  "Under $1,000",
  "$1,000-$2,000",
  "$2,000-$5,000",
  "$5,000-$10,000",
  "$10,000+",
  "Not sure",
] as const;
