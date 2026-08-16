"use server";

import { auditFormSchema } from "@/lib/validation/audit";
import { isLikelySpam } from "@/lib/validation/spam-check";
import { sendNotificationEmail } from "@/lib/email";
import { storeLead } from "@/lib/leads";

export interface AuditSubmissionResult {
  success: boolean;
  message: string;
}

export async function submitAuditRequest(
  values: unknown,
): Promise<AuditSubmissionResult> {
  const parsed = auditFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check the form for errors and try again.",
    };
  }

  const data = parsed.data;

  // Spam submissions still return a generic success message so bots gain no
  // signal, but they're skipped before storage and notification.
  if (isLikelySpam(data)) {
    return {
      success: true,
      message: "Thanks! We'll review your website and follow up shortly.",
    };
  }

  await storeLead({
    name: data.name,
    businessName: data.businessName,
    email: data.businessEmail,
    phone: data.phone || undefined,
    websiteUrl: data.websiteUrl,
    industry: data.industry,
    websiteGoal: data.websiteGoal,
    websiteProblem: data.websiteProblem,
    message: data.message || undefined,
    status: "new",
    source: "website_audit",
  });

  await sendNotificationEmail({
    to: process.env.AUDIT_NOTIFICATION_EMAIL,
    subject: `New website audit request: ${data.businessName}`,
    text: [
      `Name: ${data.name}`,
      `Business: ${data.businessName}`,
      `Email: ${data.businessEmail}`,
      `Phone: ${data.phone || "Not provided"}`,
      `Website: ${data.websiteUrl}`,
      `Industry: ${data.industry}`,
      `Goal: ${data.websiteGoal}`,
      `Biggest challenge: ${data.websiteProblem}`,
      `Message: ${data.message || "None"}`,
    ].join("\n"),
  });

  return {
    success: true,
    message: "Thanks! We'll review your website and follow up shortly.",
  };
}
