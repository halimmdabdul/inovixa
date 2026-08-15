import { Check, X } from "lucide-react";
import { BrowserMockup } from "@/components/hero/browser-mockup";

const before = [
  "Old design",
  "Slow",
  "Hard to use on mobile",
  "Confusing navigation",
  "Weak CTA",
  "Poor trust signals",
];

const after = [
  "Modern professional design",
  "Fast loading",
  "Mobile-first",
  "Clear navigation",
  "Strong CTA",
  "SEO-ready",
  "Lead-focused",
];

export function BeforeAfter() {
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
      <div>
        <BrowserMockup variant="old" label="Before" />
        <ul className="mt-6 space-y-3">
          {before.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
              <X className="h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <BrowserMockup variant="new" label="After" />
        <ul className="mt-6 space-y-3">
          {after.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
              <Check className="h-4 w-4 shrink-0 text-brand-teal" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
