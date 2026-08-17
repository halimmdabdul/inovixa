import { z } from "zod";

export const teamMemberSchema = z.object({
  name: z.string().trim().min(1, "Enter a name."),
  role: z.string().trim().min(1, "Enter a role or title."),
  email: z.string().trim().email("Enter a valid email address.").optional().or(z.literal("")),
  bio: z.string().trim().max(500, "Keep the bio under 500 characters.").optional().or(z.literal("")),
  photoUrl: z.string().trim().url("Enter a valid image URL.").optional().or(z.literal("")),
});

export type TeamMemberValues = z.infer<typeof teamMemberSchema>;
