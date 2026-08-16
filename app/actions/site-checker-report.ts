"use server";

import { headers } from "next/headers";
import { siteCheckerReportSchema } from "@/lib/validation/site-checker-report";
import { isLikelySpam } from "@/lib/validation/spam-check";
import { isRateLimited } from "@/lib/rate-limit";
import { sendNotificationEmail } from "@/lib/email";
import { storeLead } from "@/lib/leads";

export interface UnlockReportResult {
  success: boolean;
  message?: string;
}

export async function unlockFullReport(values: unknown): Promise<UnlockReportResult> {
  const parsed = siteCheckerReportSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  const data = parsed.data;

  if (isLikelySpam(data)) {
    // Spam submissions still unlock the report client-side so bots gain no
    // signal, but they're skipped before storage and notification.
    return { success: true };
  }

  const requestHeaders = await headers();
  const clientIp = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(`site-checker-report:${clientIp}`)) {
    return {
      success: false,
      message: "You've hit the limit for now. Please try again in a minute.",
    };
  }

  const hostname = (() => {
    try {
      return new URL(data.websiteUrl).hostname;
    } catch {
      return data.websiteUrl;
    }
  })();

  await storeLead({
    name: data.email.split("@")[0],
    businessName: hostname,
    email: data.email,
    websiteUrl: data.websiteUrl,
    status: "new",
    source: "seo_checker",
  });

  await sendNotificationEmail({
    to: process.env.AUDIT_NOTIFICATION_EMAIL,
    subject: `New SEO checker lead: ${hostname}`,
    text: [
      `Email: ${data.email}`,
      `Website checked: ${data.websiteUrl}`,
      "",
      "This visitor unlocked their full free SEO report. Follow up to offer a free 15-minute website review.",
    ].join("\n"),
  });

  return { success: true };
}
