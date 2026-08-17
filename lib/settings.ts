import "server-only";
import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";

export interface SiteSettings {
  gaId: string | null;
  googleSiteVerification: string | null;
  bingSiteVerification: string | null;
}

const EMPTY_SETTINGS: SiteSettings = {
  gaId: null,
  googleSiteVerification: null,
  bingSiteVerification: null,
};

/**
 * Reads SEO settings (GA ID, search engine verification codes) from
 * Supabase, falling back to the matching env var for anything unset in the
 * database, and to null if Supabase isn't configured at all. This lets
 * these values be edited from /admin/settings without a redeploy, while env
 * vars still work as a zero-setup default.
 */
async function fetchSiteSettings(): Promise<SiteSettings> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  let dbSettings = EMPTY_SETTINGS;

  if (url && key) {
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { data, error } = await supabase
      .from("site_settings")
      .select("ga_id, google_site_verification, bing_site_verification")
      .eq("id", true)
      .maybeSingle();

    if (error) {
      console.info("[settings] Couldn't read site_settings, falling back to env vars:", error.message);
    } else if (data) {
      dbSettings = {
        gaId: data.ga_id,
        googleSiteVerification: data.google_site_verification,
        bingSiteVerification: data.bing_site_verification,
      };
    }
  }

  return {
    gaId: dbSettings.gaId || process.env.NEXT_PUBLIC_GA_ID || null,
    googleSiteVerification:
      dbSettings.googleSiteVerification || process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || null,
    bingSiteVerification:
      dbSettings.bingSiteVerification || process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || null,
  };
}

export const getSiteSettings = unstable_cache(fetchSiteSettings, ["site-settings"], {
  tags: ["site-settings"],
});
