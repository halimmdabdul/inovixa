import type { ClientResult } from "@/types";

/**
 * No real clients yet. Keep this array empty in production so the
 * "Recent Client Results" section stays hidden (see
 * components/sections/client-results-section.tsx). Add an entry here only
 * after a project has actually shipped for a real client and that client
 * has given permission to publish their name, business, and quote.
 */
export const clientResults: ClientResult[] = [];
