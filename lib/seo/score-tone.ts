export function scoreTone(score: number) {
  if (score >= 80) return { label: "Good", color: "text-brand-teal" };
  if (score >= 50) return { label: "Needs Work", color: "text-amber-500" };
  return { label: "Poor", color: "text-red-500" };
}
