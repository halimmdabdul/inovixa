const WORDS_PER_MINUTE = 200;
// Separate patterns rather than one shared `g`-flagged regex: RegExp.test()
// on a global-flagged regex mutates lastIndex across calls, which would
// make repeated calls on the same input alternate between true and false.
const HTML_TAG_PATTERN_GLOBAL = /<[a-z][\s\S]*?>/gi;
const HTML_TAG_PATTERN = /<[a-z][\s\S]*?>/i;

/** Rough tag strip for word-counting purposes only — not a security
 * boundary. Sanitization for storage/rendering happens in lib/sanitize-html.ts. */
function stripTags(content: string) {
  return content.replace(HTML_TAG_PATTERN_GLOBAL, " ");
}

/** Computed from content length instead of stored, so it's always accurate
 * and admins never have to estimate or update it by hand. */
export function estimateReadingTime(content: string) {
  const wordCount = stripTags(content).trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

/** True once a post's content has been through the rich text editor (which
 * always produces at least one HTML tag) rather than the older plain-text
 * format, where paragraphs were separated by blank lines. */
export function isHtmlContent(content: string) {
  return HTML_TAG_PATTERN.test(content);
}

/** Splits legacy plain-text article bodies into paragraphs at blank lines. */
export function splitParagraphs(content: string) {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function escapeHtml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Converts a legacy plain-text post body into the `<p>`-wrapped HTML the
 * rich text editor expects, so opening an old post for editing still shows
 * one paragraph per blank-line-separated block instead of collapsing the
 * whole article into a single paragraph (which is what Tiptap would do if
 * handed the raw plain text as-is, since blank lines aren't HTML). Content
 * that's already HTML is returned unchanged. */
export function toEditableHtml(content: string) {
  if (isHtmlContent(content)) return content;
  return splitParagraphs(content)
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
}
