import { z } from "zod";

export const siteSettingsSchema = z.object({
  gaId: z.string().trim().optional().or(z.literal("")),
  googleSiteVerification: z.string().trim().optional().or(z.literal("")),
  bingSiteVerification: z.string().trim().optional().or(z.literal("")),
});

export type SiteSettingsValues = z.infer<typeof siteSettingsSchema>;
