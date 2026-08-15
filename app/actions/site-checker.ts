"use server";

import { headers } from "next/headers";
import { siteCheckerSchema } from "@/lib/validation/site-checker";
import { isLikelySpam } from "@/lib/validation/spam-check";
import { isRateLimited } from "@/lib/rate-limit";
import { fetchHtmlSafely } from "@/lib/seo/fetch-safely";
import { scoreSeo } from "@/lib/seo/score";
import { findNearbyBusinesses } from "@/lib/places";
import type { NearbyBusiness, SeoCheckResult } from "@/types";

export interface SiteCheckupResult {
  success: boolean;
  message?: string;
  seo?: SeoCheckResult;
  nearbyBusinesses?: NearbyBusiness[];
  nearbyAvailable?: boolean;
}

export async function runSiteCheckup(values: unknown): Promise<SiteCheckupResult> {
  const parsed = siteCheckerSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  const data = parsed.data;

  if (isLikelySpam(data)) {
    return { success: false, message: "Please try again." };
  }

  const requestHeaders = await headers();
  const clientIp = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(`site-checkup:${clientIp}`)) {
    return {
      success: false,
      message: "You've hit the limit for checks right now. Please try again in a minute.",
    };
  }

  let seo: SeoCheckResult;
  try {
    const { html, finalUrl, elapsedMs } = await fetchHtmlSafely(data.websiteUrl);
    seo = scoreSeo(html, finalUrl, elapsedMs);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "We couldn't check that website. Please try again.";
    return { success: false, message };
  }

  const { available, results } = await findNearbyBusinesses(`${data.industry} in ${data.location}`);

  return {
    success: true,
    seo,
    nearbyBusinesses: results,
    nearbyAvailable: available,
  };
}
