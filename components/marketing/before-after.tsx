import { ArrowRight, Check, X } from "lucide-react";
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
    <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-10">
      <div className="rounded-2xl border border-red-100 bg-red-50/40 p-5 sm:p-6">
        <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-600">
          Before
        </span>
        <div className="mt-4">
          <BrowserMockup variant="old" label="oldsite.com" />
        </div>
        <ul className="mt-6 space-y-3">
          {before.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
              <X className="h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="absolute top-1/2 left-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-navy text-white shadow-lg ring-4 ring-background lg:flex"
        aria-hidden="true"
      >
        <ArrowRight className="h-5 w-5" />
      </div>

      <div className="rounded-2xl border border-teal-100 bg-teal-50/40 p-5 sm:p-6 shadow-sm">
        <span className="inline-flex items-center rounded-full bg-brand-teal px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          After
        </span>
        <div className="mt-4">
          <BrowserMockup variant="new" label="yourbusiness.com" />
        </div>
        <ul className="mt-6 space-y-3">
          {after.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
              <Check className="h-4 w-4 shrink-0 text-brand-teal" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
