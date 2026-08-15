import "server-only";
import * as cheerio from "cheerio";
import type { SeoCheckItem, SeoCheckResult } from "@/types";

const POINTS_PER_CHECK = 10;

function addCheck(
  checks: SeoCheckItem[],
  id: string,
  label: string,
  status: SeoCheckItem["status"],
  detail: string,
) {
  checks.push({ id, label, status, detail });
}

const statusPoints: Record<SeoCheckItem["status"], number> = {
  pass: POINTS_PER_CHECK,
  warn: POINTS_PER_CHECK / 2,
  fail: 0,
};

/**
 * Scores real, verifiable technical SEO signals from the fetched HTML. This
 * is an automated technical scan, not a substitute for a full audit — it
 * can't measure rankings, backlinks, or real-world Core Web Vitals, and the
 * results UI says so.
 */
export function scoreSeo(html: string, finalUrl: string, elapsedMs: number): SeoCheckResult {
  const $ = cheerio.load(html);
  const checks: SeoCheckItem[] = [];

  // HTTPS
  const isHttps = finalUrl.startsWith("https://");
  addCheck(
    checks,
    "https",
    "HTTPS Connection",
    isHttps ? "pass" : "fail",
    isHttps
      ? "Your site loads securely over HTTPS."
      : "Your site isn't served over HTTPS, which browsers flag as \"Not Secure.\"",
  );

  // Title tag
  const title = $("title").first().text().trim();
  addCheck(
    checks,
    "title",
    "Page Title",
    !title ? "fail" : title.length >= 10 && title.length <= 60 ? "pass" : "warn",
    !title
      ? "No <title> tag was found."
      : title.length >= 10 && title.length <= 60
        ? `Title is a good length (${title.length} characters).`
        : `Title is ${title.length} characters — aim for roughly 10-60.`,
  );

  // Meta description
  const description = $('meta[name="description"]').attr("content")?.trim() ?? "";
  addCheck(
    checks,
    "description",
    "Meta Description",
    !description ? "fail" : description.length >= 50 && description.length <= 160 ? "pass" : "warn",
    !description
      ? "No meta description was found."
      : description.length >= 50 && description.length <= 160
        ? `Description is a good length (${description.length} characters).`
        : `Description is ${description.length} characters — aim for roughly 50-160.`,
  );

  // Viewport / mobile
  const hasViewport = $('meta[name="viewport"]').length > 0;
  addCheck(
    checks,
    "viewport",
    "Mobile Viewport Tag",
    hasViewport ? "pass" : "fail",
    hasViewport
      ? "A mobile viewport tag is present."
      : "No mobile viewport tag was found, which usually means a poor mobile experience.",
  );

  // Heading structure
  const h1Count = $("h1").length;
  addCheck(
    checks,
    "headings",
    "Heading Structure",
    h1Count === 1 ? "pass" : "warn",
    h1Count === 0
      ? "No H1 heading was found on the page."
      : h1Count === 1
        ? "The page has exactly one H1 heading."
        : `The page has ${h1Count} H1 headings — ideally there's just one.`,
  );

  // Image alt text
  const images = $("img");
  const totalImages = images.length;
  const imagesWithAlt = images.filter((_, el) => Boolean($(el).attr("alt")?.trim())).length;
  const altRatio = totalImages === 0 ? 1 : imagesWithAlt / totalImages;
  addCheck(
    checks,
    "alt-text",
    "Image Alt Text",
    altRatio >= 0.9 ? "pass" : altRatio >= 0.5 ? "warn" : "fail",
    totalImages === 0
      ? "No images were found on the page."
      : `${imagesWithAlt} of ${totalImages} images have alt text.`,
  );

  // Open Graph
  const hasOgTitle = $('meta[property="og:title"]').length > 0;
  const hasOgDescription = $('meta[property="og:description"]').length > 0;
  const hasOgImage = $('meta[property="og:image"]').length > 0;
  const ogCount = [hasOgTitle, hasOgDescription, hasOgImage].filter(Boolean).length;
  addCheck(
    checks,
    "open-graph",
    "Social Share Tags",
    ogCount === 3 ? "pass" : ogCount > 0 ? "warn" : "fail",
    ogCount === 3
      ? "Open Graph tags are set up for social sharing."
      : ogCount > 0
        ? "Some Open Graph tags are present, but not all of title, description, and image."
        : "No Open Graph tags were found, so shared links may look plain on social media.",
  );

  // Canonical URL
  const hasCanonical = $('link[rel="canonical"]').length > 0;
  addCheck(
    checks,
    "canonical",
    "Canonical URL",
    hasCanonical ? "pass" : "warn",
    hasCanonical
      ? "A canonical URL is set."
      : "No canonical URL tag was found.",
  );

  // Page speed proxy
  const sizeKb = Buffer.byteLength(html, "utf-8") / 1024;
  const speedStatus: SeoCheckItem["status"] =
    elapsedMs < 1200 && sizeKb < 500 ? "pass" : elapsedMs < 3000 && sizeKb < 1500 ? "warn" : "fail";
  addCheck(
    checks,
    "speed",
    "Page Load Speed",
    speedStatus,
    `The page took about ${(elapsedMs / 1000).toFixed(1)}s to respond and is roughly ${Math.round(sizeKb)}KB of HTML.`,
  );

  // Indexability
  const robotsMeta = $('meta[name="robots"]').attr("content")?.toLowerCase() ?? "";
  const isBlockedFromIndexing = robotsMeta.includes("noindex");
  addCheck(
    checks,
    "indexing",
    "Search Engine Indexing",
    isBlockedFromIndexing ? "fail" : "pass",
    isBlockedFromIndexing
      ? "This page has a \"noindex\" tag, telling search engines not to show it in results."
      : "Nothing is blocking this page from being indexed.",
  );

  const score = Math.round(
    checks.reduce((total, check) => total + statusPoints[check.status], 0),
  );

  return { score, finalUrl, checks };
}
