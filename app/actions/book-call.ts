"use server";

import { headers } from "next/headers";
import { bookCallSchema } from "@/lib/validation/book-call";
import { isLikelySpam } from "@/lib/validation/spam-check";
import { isRateLimited } from "@/lib/rate-limit";
import {
  BUSINESS_TIMEZONE,
  getSlotsForDate,
  isDateWithinBookingWindow,
  isSlotBookable,
  isValidOpenSlot,
} from "@/lib/booking/availability";
import { getTakenSlots, storeCallBooking } from "@/lib/bookings";
import { sendNotificationEmail } from "@/lib/email";

/** Open slots (UTC ISO strings) for one calendar date, already booked ones excluded. */
export async function getAvailableCallSlots(dateStr: string): Promise<string[]> {
  const ip = await getClientIp();
  if (isRateLimited(`book-call-slots:${ip}`, 30, 60_000)) return [];

  if (!isDateWithinBookingWindow(dateStr)) return [];

  const candidates = getSlotsForDate(dateStr).filter(isSlotBookable);
  if (candidates.length === 0) return [];

  const taken = await getTakenSlots(candidates);
  return candidates.filter((slot) => !taken.has(new Date(slot).getTime()));
}

export interface BookCallResult {
  success: boolean;
  message: string;
}

async function getClientIp() {
  const headersList = await headers();
  return headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function submitCallBooking(values: unknown): Promise<BookCallResult> {
  const parsed = bookCallSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Please check the form for errors and try again." };
  }

  const data = parsed.data;

  if (isLikelySpam(data)) {
    return { success: true, message: "Call requested! We'll send a confirmation email shortly." };
  }

  const ip = await getClientIp();
  if (isRateLimited(`book-call:${ip}`, 5, 60_000)) {
    return { success: false, message: "Too many requests. Please try again in a minute." };
  }

  if (!isValidOpenSlot(data.slot)) {
    return {
      success: false,
      message: "That time is no longer available. Please pick another time.",
    };
  }

  const result = await storeCallBooking({
    scheduledAt: data.slot,
    name: data.name,
    email: data.email,
    phone: data.phone || undefined,
    businessName: data.businessName || undefined,
    message: data.message || undefined,
  });

  if (!result.ok) {
    if (result.reason === "slot_taken") {
      return {
        success: false,
        message: "That time was just booked by someone else. Please pick another time.",
      };
    }
    if (result.reason === "not_configured") {
      return {
        success: false,
        message:
          "Online booking isn't fully set up yet. Please use the contact form instead and we'll reach out to schedule.",
      };
    }
    return { success: false, message: "Something went wrong. Please try again or use the contact form." };
  }

  const formattedTime = new Date(data.slot).toLocaleString("en-US", {
    timeZone: BUSINESS_TIMEZONE,
    dateStyle: "full",
    timeStyle: "short",
  });

  await sendNotificationEmail({
    to: process.env.CONTACT_NOTIFICATION_EMAIL,
    subject: `New 15-minute call booked: ${data.name}`,
    text: [
      `Name: ${data.name}`,
      `Business: ${data.businessName || "Not provided"}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "Not provided"}`,
      `Time: ${formattedTime} (${BUSINESS_TIMEZONE})`,
      `Message: ${data.message || "Not provided"}`,
    ].join("\n"),
  });

  await sendNotificationEmail({
    to: data.email,
    subject: "Your call with Inovixa Digital is confirmed",
    text: [
      `Hi ${data.name},`,
      "",
      `Your 15-minute call is confirmed for ${formattedTime} (${BUSINESS_TIMEZONE}).`,
      "",
      "We'll be in touch with a call link before the scheduled time.",
      "",
      "— Inovixa Digital",
    ].join("\n"),
  });

  return {
    success: true,
    message: "Your call is booked! Check your email for confirmation details.",
  };
}
