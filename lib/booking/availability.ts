/**
 * Business hours for the "Book a 15-Min Call" scheduler. All slot
 * generation happens in this timezone regardless of where the visitor is —
 * their browser only ever displays the resulting instants in local time.
 */
export const BUSINESS_TIMEZONE = "America/New_York";
export const SLOT_DURATION_MINUTES = 15;
export const BOOKING_WINDOW_DAYS = 21;
export const MIN_NOTICE_HOURS = 2;

const OPEN_HOUR = 9;
const CLOSE_HOUR = 18;

function getTimeZoneOffsetMinutes(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
    .formatToParts(date)
    .reduce<Record<string, string>>((acc, part) => {
      if (part.type !== "literal") acc[part.type] = part.value;
      return acc;
    }, {});

  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  );
  return (asUtc - date.getTime()) / 60_000;
}

/**
 * Converts a wall-clock time in `timeZone` (e.g. "09:00" on "2026-08-25" in
 * America/New_York) to the equivalent UTC instant, correctly accounting for
 * DST by computing the zone's actual offset at that instant rather than
 * assuming a fixed one.
 */
function zonedWallTimeToUtc(dateStr: string, hour: number, minute: number, timeZone: string): Date {
  const guess = new Date(
    `${dateStr}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00.000Z`,
  );
  const offsetMinutes = getTimeZoneOffsetMinutes(guess, timeZone);
  return new Date(guess.getTime() - offsetMinutes * 60_000);
}

/** All slot start times, as UTC ISO strings, for one calendar date's business hours. */
export function getSlotsForDate(dateStr: string): string[] {
  const slots: string[] = [];
  for (let minutes = OPEN_HOUR * 60; minutes < CLOSE_HOUR * 60; minutes += SLOT_DURATION_MINUTES) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    slots.push(zonedWallTimeToUtc(dateStr, hour, minute, BUSINESS_TIMEZONE).toISOString());
  }
  return slots;
}

export function isDateWithinBookingWindow(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;

  const today = new Date();
  const startOfToday = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const target = new Date(`${dateStr}T00:00:00.000Z`).getTime();
  const diffDays = (target - startOfToday) / (24 * 60 * 60 * 1000);

  return diffDays >= 0 && diffDays <= BOOKING_WINDOW_DAYS;
}

export function isSlotBookable(isoSlot: string): boolean {
  const slotTime = new Date(isoSlot).getTime();
  if (Number.isNaN(slotTime)) return false;
  return slotTime >= Date.now() + MIN_NOTICE_HOURS * 60 * 60 * 1000;
}

function getDateStrInZone(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const lookup = Object.fromEntries(
    parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]),
  );
  return `${lookup.year}-${lookup.month}-${lookup.day}`;
}

/**
 * Re-derives whether a submitted slot is a legitimate, still-bookable slot
 * by regenerating that business day's candidate slots server-side, rather
 * than trusting whatever the client claims it fetched earlier.
 */
export function isValidOpenSlot(isoSlot: string): boolean {
  const date = new Date(isoSlot);
  if (Number.isNaN(date.getTime())) return false;
  if (!isSlotBookable(isoSlot)) return false;

  const dateStr = getDateStrInZone(date, BUSINESS_TIMEZONE);
  if (!isDateWithinBookingWindow(dateStr)) return false;

  return getSlotsForDate(dateStr).includes(isoSlot);
}
