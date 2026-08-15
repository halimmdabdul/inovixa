import "server-only";

const hits = new Map<string, number[]>();

/**
 * Best-effort in-memory rate limit keyed by IP. Serverless deployments run
 * multiple isolated instances, so this only throttles requests hitting the
 * same warm instance — not a substitute for a shared store (Vercel KV /
 * Upstash) in production, but it costs nothing and blunts naive abuse on an
 * endpoint that fetches arbitrary URLs and calls a paid API.
 */
export function isRateLimited(key: string, maxRequests = 5, windowMs = 60_000) {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((timestamp) => now - timestamp < windowMs);
  timestamps.push(now);
  hits.set(key, timestamps);
  return timestamps.length > maxRequests;
}
