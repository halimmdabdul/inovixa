import "server-only";
import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import type { Service, ServiceRow } from "@/types";

/** The four service routes' fixed display order — independent of whatever
 * order rows happen to come back from the database in. */
const SLUG_ORDER = ["website-redesign", "website-development", "local-seo", "website-maintenance"];

function toService(row: ServiceRow): Service {
  return {
    slug: row.slug,
    name: row.name,
    shortName: row.short_name,
    description: row.description,
    longDescription: row.long_description,
    ctaLabel: row.cta_label,
    features: row.features,
    idealFor: row.ideal_for,
    faqs: row.faqs,
    imageUrl: row.image_url,
  };
}

/**
 * Reads the four services for the public site. Returns an empty array
 * whenever Supabase isn't configured or the table hasn't been migrated yet
 * (see lib/team.ts for the same pattern) — callers must handle that rather
 * than assume a service always exists, since /services and each service's
 * dedicated page depend entirely on this data being present.
 */
async function fetchServices(): Promise<Service[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await supabase.from("services").select("*").returns<ServiceRow[]>();

  if (error) {
    console.info("[services] Couldn't read services:", error.message);
    return [];
  }

  return (data ?? []).map(toService).sort((a, b) => SLUG_ORDER.indexOf(a.slug) - SLUG_ORDER.indexOf(b.slug));
}

export const getServices = unstable_cache(fetchServices, ["services"], {
  tags: ["services"],
});

export async function getServiceBySlug(slug: string) {
  const services = await getServices();
  return services.find((service) => service.slug === slug);
}
