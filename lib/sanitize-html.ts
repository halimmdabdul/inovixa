import "server-only";
import * as cheerio from "cheerio";

const ALLOWED_TAGS = new Set([
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "h2",
  "h3",
  "h4",
  "ul",
  "ol",
  "li",
  "blockquote",
  "a",
  "code",
  "pre",
]);

const ALLOWED_ATTRS: Record<string, string[]> = {
  a: ["href", "target", "rel"],
};

/**
 * Strips the article-content HTML produced by the admin rich text editor
 * (components/admin/rich-text-editor.tsx) down to a small, safe allowlist
 * before it's stored — this runs server-side in the blog server actions so
 * stored content can never carry a script, event handler, or javascript:
 * link, regardless of what the editor sent or whether a row was edited
 * directly in the database.
 */
export function sanitizeArticleHtml(html: string): string {
  const $ = cheerio.load(html, null, false);

  $("script, style, iframe, object, embed").remove();

  // Repeat until stable: unwrapping a disallowed tag can expose another
  // disallowed tag that was nested inside it.
  let changed = true;
  while (changed) {
    changed = false;
    $("*").each((_, el) => {
      if (el.type !== "tag") return;
      const tag = el.tagName?.toLowerCase();
      if (tag && !ALLOWED_TAGS.has(tag)) {
        $(el).replaceWith($(el).contents());
        changed = true;
      }
    });
  }

  $("*").each((_, el) => {
    if (el.type !== "tag") return;
    const tag = el.tagName.toLowerCase();
    const allowed = ALLOWED_ATTRS[tag] ?? [];

    for (const attr of Object.keys(el.attribs)) {
      if (!allowed.includes(attr)) $(el).removeAttr(attr);
    }

    if (tag === "a") {
      const href = $(el).attr("href");
      if (href && /^\s*javascript:/i.test(href)) $(el).removeAttr("href");
      $(el).attr("target", "_blank");
      $(el).attr("rel", "noopener noreferrer");
    }
  });

  return $.html();
}
