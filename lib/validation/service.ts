import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().trim().min(1, "Enter a name."),
  shortName: z.string().trim().min(1, "Enter a short name."),
  description: z.string().trim().min(1, "Enter a short description.").max(200, "Keep it under 200 characters."),
  longDescription: z.string().trim().min(1, "Enter a longer description."),
  ctaLabel: z.string().trim().min(1, "Enter a call-to-action label."),
  features: z.array(z.string().trim().min(1)).min(1, "Add at least one feature."),
  idealFor: z.array(z.string().trim().min(1)).min(1, 'Add at least one "ideal for" point.'),
  faqs: z
    .array(
      z.object({
        question: z.string().trim().min(1, "Enter a question."),
        answer: z.string().trim().min(1, "Enter an answer."),
      }),
    )
    .min(1, "Add at least one FAQ."),
  imageUrl: z.string().trim().url("Enter a valid image URL.").optional().or(z.literal("")),
});

export type ServiceValues = z.infer<typeof serviceSchema>;
