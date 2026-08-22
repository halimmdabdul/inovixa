import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export interface CallBooking {
  scheduledAt: string;
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  message?: string;
}

export type StoreBookingResult =
  | { ok: true }
  | { ok: false; reason: "slot_taken" | "not_configured" | "error" };

/**
 * Inserts a booking. The `call_bookings.scheduled_at` column has a unique
 * constraint, so a concurrent double-booking of the same slot fails here
 * with Postgres error code 23505 rather than silently overwriting it.
 */
export async function storeCallBooking(booking: CallBooking): Promise<StoreBookingResult> {
  const supabase = createAdminClient();

  if (!supabase) {
    console.info("[bookings] Supabase not configured, cannot store booking for:", booking.email);
    return { ok: false, reason: "not_configured" };
  }

  const { error } = await supabase.from("call_bookings").insert({
    scheduled_at: booking.scheduledAt,
    name: booking.name,
    email: booking.email,
    phone: booking.phone || null,
    business_name: booking.businessName || null,
    message: booking.message || null,
    status: "scheduled",
  });

  if (error) {
    if (error.code === "23505") return { ok: false, reason: "slot_taken" };
    console.error("[bookings] Failed to store booking", error);
    return { ok: false, reason: "error" };
  }

  return { ok: true };
}

/**
 * Returns which of the given candidate slots (UTC ISO strings) are already
 * booked. Compares by instant rather than raw string, since Postgres may
 * return timestamptz values in a different ISO format than what was inserted.
 */
export async function getTakenSlots(candidateSlots: string[]): Promise<Set<number>> {
  const supabase = createAdminClient();
  if (!supabase || candidateSlots.length === 0) return new Set();

  const first = candidateSlots[0];
  const last = candidateSlots[candidateSlots.length - 1];

  const { data, error } = await supabase
    .from("call_bookings")
    .select("scheduled_at")
    .neq("status", "cancelled")
    .gte("scheduled_at", first)
    .lte("scheduled_at", last);

  if (error) {
    console.error("[bookings] Failed to load booked slots", error);
    return new Set();
  }

  return new Set((data ?? []).map((row) => new Date(row.scheduled_at).getTime()));
}
