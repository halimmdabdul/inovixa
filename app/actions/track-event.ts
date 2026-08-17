"use server";

import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { isRateLimited } from "@/lib/rate-limit";

type EventType = "page_view" | "click";

/**
 * Records a page view or button click for the /admin/analytics dashboard.
 * Deliberately best-effort and silent: never throws, never blocks the UI it
 * was called from, and no-ops if Supabase isn't configured. This is
 * anonymous, aggregate usage data — no visitor identifier is stored.
 */
export async function trackEvent(input: { eventType: EventType; path: string; label?: string }) {
  if (input.eventType !== "page_view" && input.eventType !== "click") return;
  if (!input.path || input.path.length > 300) return;
  if (input.label && input.label.length > 200) return;

  const requestHeaders = await headers();
  const clientIp = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  // A generous limit — this fires on ordinary navigation/clicks, not a form
  // submission, so it needs a much higher ceiling than the form endpoints.
  if (isRateLimited(`track:${clientIp}`, 120, 60_000)) return;

  const supabase = createAdminClient();
  if (!supabase) return;

  const { error } = await supabase.from("analytics_events").insert({
    event_type: input.eventType,
    path: input.path,
    label: input.label || null,
  });

  if (error) {
    console.info("[analytics] Couldn't record event:", error.message);
  }
}
