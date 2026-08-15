import "server-only";
import { promises as dns } from "node:dns";
import net from "node:net";

const FETCH_TIMEOUT_MS = 8000;
const MAX_BYTES = 2_000_000;
const MAX_REDIRECTS = 3;
const USER_AGENT = "InovixaSiteChecker/1.0 (+https://inovixadigital.com)";

function isPrivateIPv4(ip: string) {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => Number.isNaN(part))) return true;
  const [a, b] = parts;
  if (a === 10) return true;
  if (a === 127) return true;
  if (a === 0) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 100 && b >= 64 && b <= 127) return true; // carrier-grade NAT
  return false;
}

function isPrivateIPv6(ip: string) {
  const lower = ip.toLowerCase();
  if (lower === "::1" || lower === "::") return true;
  if (lower.startsWith("fe80:")) return true; // link-local
  if (lower.startsWith("fc") || lower.startsWith("fd")) return true; // unique local
  if (lower.startsWith("::ffff:")) {
    const mapped = lower.split(":").pop();
    if (mapped?.includes(".")) return isPrivateIPv4(mapped);
  }
  return false;
}

function isBlockedIp(address: string, family: number) {
  return family === 4 ? isPrivateIPv4(address) : isPrivateIPv6(address);
}

/**
 * Resolves the hostname and rejects anything pointing at a private,
 * loopback, or link-local address (including cloud metadata endpoints like
 * 169.254.169.254). This is a user-submitted URL fetched server-side, so
 * without this check it would be a textbook SSRF vector.
 */
async function assertPublicUrl(rawUrl: string): Promise<URL> {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error("Enter a valid website URL, including https://.");
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Only http and https websites can be checked.");
  }

  const hostname = url.hostname.toLowerCase();
  if (hostname === "localhost" || hostname.endsWith(".local")) {
    throw new Error("That URL can't be checked.");
  }

  const ipFamily = net.isIP(hostname);
  if (ipFamily) {
    if (isBlockedIp(hostname, ipFamily)) {
      throw new Error("That URL can't be checked.");
    }
    return url;
  }

  const records = await dns.lookup(hostname, { all: true });
  if (records.length === 0) {
    throw new Error("That website's address couldn't be resolved.");
  }
  for (const record of records) {
    if (isBlockedIp(record.address, record.family)) {
      throw new Error("That URL can't be checked.");
    }
  }

  return url;
}

export interface FetchedPage {
  html: string;
  finalUrl: string;
  elapsedMs: number;
}

/**
 * Fetches a user-submitted URL with SSRF guards: only public hostnames,
 * every redirect hop re-validated, a hard timeout, and a response size cap
 * so this can't be used to pull down or hang on an arbitrarily large file.
 */
export async function fetchHtmlSafely(rawUrl: string): Promise<FetchedPage> {
  let currentUrl = await assertPublicUrl(rawUrl);

  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const started = Date.now();

    let response: Response;
    try {
      response = await fetch(currentUrl.toString(), {
        redirect: "manual",
        signal: controller.signal,
        headers: { "User-Agent": USER_AGENT },
      });
    } catch {
      throw new Error("We couldn't reach that website. Double-check the URL and try again.");
    } finally {
      clearTimeout(timeout);
    }

    const elapsedMs = Date.now() - started;

    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      if (!location) throw new Error("That website's redirect couldn't be followed.");
      currentUrl = await assertPublicUrl(new URL(location, currentUrl).toString());
      continue;
    }

    if (!response.ok) {
      throw new Error(`That website returned an error (status ${response.status}).`);
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("html") && contentType !== "") {
      throw new Error("That URL doesn't look like a webpage.");
    }

    const reader = response.body?.getReader();
    if (!reader) {
      const html = await response.text();
      return { html, finalUrl: currentUrl.toString(), elapsedMs };
    }

    const chunks: Uint8Array[] = [];
    let received = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      chunks.push(value);
      if (received > MAX_BYTES) {
        await reader.cancel();
        break;
      }
    }
    const html = Buffer.concat(chunks.map((chunk) => Buffer.from(chunk))).toString("utf-8");
    return { html, finalUrl: currentUrl.toString(), elapsedMs };
  }

  throw new Error("That website redirected too many times.");
}
