"use server";

import { updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { serviceSchema } from "@/lib/validation/service";

export interface ServiceActionResult {
  success: boolean;
  message: string;
}

/**
 * Runs as the signed-in admin's own session — RLS grants authenticated
 * users UPDATE only on services, not insert/delete (see supabase/schema.sql
 * for why: the four rows are fixed 1:1 to routes in
 * app/(marketing)/services/). Only reachable from /admin/services, which
 * proxy.ts already requires a signed-in session for.
 */
export async function updateService(id: string, values: unknown): Promise<ServiceActionResult> {
  if (!id) return { success: false, message: "Missing service id." };

  const parsed = serviceSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  const data = parsed.data;
  const supabase = await createClient();

  const { error } = await supabase
    .from("services")
    .update({
      name: data.name,
      short_name: data.shortName,
      description: data.description,
      long_description: data.longDescription,
      cta_label: data.ctaLabel,
      features: data.features,
      ideal_for: data.idealFor,
      faqs: data.faqs,
      image_url: data.imageUrl || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return { success: false, message: `Couldn't update service: ${error.message}` };
  }

  updateTag("services");
  return { success: true, message: "Service updated." };
}
