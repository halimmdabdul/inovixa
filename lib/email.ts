import "server-only";
import { Resend } from "resend";

interface NotificationEmail {
  to: string | undefined;
  subject: string;
  text: string;
}

/**
 * Sends a lead notification email through Resend when RESEND_API_KEY is
 * configured. Silently no-ops otherwise so the site can run and accept leads
 * before email is wired up — leads are never lost, only the notification is skipped.
 */
export async function sendNotificationEmail({ to, subject, text }: NotificationEmail) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || !to) {
    console.info(`[email] Skipped "${subject}" — RESEND_API_KEY or recipient not configured.`);
    return { sent: false as const };
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Inovixa Digital <notifications@inovixadigital.com>",
    to,
    subject,
    text,
  });

  if (error) {
    console.error("[email] Failed to send notification", error);
    return { sent: false as const };
  }

  return { sent: true as const };
}
