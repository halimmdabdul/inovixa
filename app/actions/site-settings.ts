"use server";

import { updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { siteSettingsSchema } from "@/lib/validation/site-settings";

export interface UpdateSiteSettingsResult {
  success: boolean;
  message: string;
}

/**
 * Updates the singleton site_settings row as the signed-in admin's own
 * session — RLS grants authenticated users UPDATE on this table (see
 * supabase/schema.sql), so this deliberately does NOT use the service-role
 * client. Only reachable from /admin/settings, which proxy.ts already
 * requires a signed-in session for.
 */
export async function updateSiteSettings(values: unknown): Promise<UpdateSiteSettingsResult> {
  const parsed = siteSettingsSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Please check the form and try again." };
  }

  const data = parsed.data;
  const supabase = await createClient();

  const { error } = await supabase
    .from("site_settings")
    .update({
      ga_id: data.gaId || null,
      google_site_verification: data.googleSiteVerification || null,
      bing_site_verification: data.bingSiteVerification || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", true);

  if (error) {
    return { success: false, message: `Couldn't save settings: ${error.message}` };
  }

  updateTag("site-settings");

  return { success: true, message: "Settings saved." };
}
