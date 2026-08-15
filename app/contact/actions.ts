"use server";

import { contactFormSchema } from "@/lib/validation/contact";
import { isLikelySpam } from "@/lib/validation/spam-check";
import { sendNotificationEmail } from "@/lib/email";

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
}

export async function submitContactRequest(
  values: unknown,
): Promise<ContactSubmissionResult> {
  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check the form for errors and try again.",
    };
  }

  const data = parsed.data;

  if (isLikelySpam(data)) {
    return {
      success: true,
      message: "Thanks for reaching out! We'll get back to you shortly.",
    };
  }

  await sendNotificationEmail({
    to: process.env.CONTACT_NOTIFICATION_EMAIL,
    subject: `New project inquiry: ${data.businessName}`,
    text: [
      `Name: ${data.name}`,
      `Business: ${data.businessName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "Not provided"}`,
      `Website: ${data.websiteUrl || "Not provided"}`,
      `Service: ${data.serviceInterest}`,
      `Budget: ${data.budget}`,
      `Project details: ${data.projectDetails}`,
    ].join("\n"),
  });

  return {
    success: true,
    message: "Thanks for reaching out! We'll get back to you shortly.",
  };
}
