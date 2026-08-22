import { Code2, Gauge, Smartphone, Target, TrendingUp } from "lucide-react";
import { Section } from "@/components/ui/section";

const indicators = [
  { label: "Mobile-First Design", icon: Smartphone, tone: "blue" },
  { label: "SEO-Ready", icon: TrendingUp, tone: "teal" },
  { label: "Fast Performance", icon: Gauge, tone: "blue" },
  { label: "Conversion-Focused", icon: Target, tone: "teal" },
  { label: "7+ Years Building Software", icon: Code2, tone: "blue" },
] as const;

export function TrustBar() {
  return (
    <Section tone="surface" className="border-y border-slate-200 py-12 sm:py-14">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
        Included in Every Website Build
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {indicators.map((indicator) => (
          <div
            key={indicator.label}
            className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white py-2 pl-2.5 pr-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <span
              className={
                "flex h-7 w-7 items-center justify-center rounded-full " +
                (indicator.tone === "teal" ? "bg-teal-50" : "bg-blue-50")
              }
            >
              <indicator.icon
                className={
                  "h-3.5 w-3.5 " + (indicator.tone === "teal" ? "text-brand-teal" : "text-brand-blue")
                }
                aria-hidden="true"
              />
            </span>
            <span className="text-sm font-medium text-slate-700">{indicator.label}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
