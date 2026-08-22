const WORDS_PER_MINUTE = 200;

/** Computed from content length instead of stored, so it's always accurate
 * and admins never have to estimate or update it by hand. */
export function estimateReadingTime(content: string) {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

/** Splits the stored plain-text article body into paragraphs at blank lines. */
export function splitParagraphs(content: string) {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}
