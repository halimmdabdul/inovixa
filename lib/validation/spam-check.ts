const MIN_SUBMISSION_SECONDS = 3;

/**
 * A form is treated as spam if the honeypot field was filled in (bots tend to
 * fill every field) or if it was submitted faster than a human reasonably could.
 */
export function isLikelySpam(values: {
  companyWebsite?: string;
  formRenderedAt: number;
}) {
  if (values.companyWebsite) return true;

  const elapsedSeconds = (Date.now() - values.formRenderedAt) / 1000;
  if (elapsedSeconds < MIN_SUBMISSION_SECONDS) return true;

  return false;
}
