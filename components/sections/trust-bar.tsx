import { Gauge, MessageSquareText, Smartphone, Target, TrendingUp } from "lucide-react";
import { Section } from "@/components/ui/section";

const indicators = [
  { label: "Mobile-First Design", icon: Smartphone },
  { label: "SEO-Ready", icon: TrendingUp },
  { label: "Fast Performance", icon: Gauge },
  { label: "Conversion-Focused", icon: Target },
  { label: "Clear Communication", icon: MessageSquareText },
];

export function TrustBar() {
  return (
    <Section tone="surface" className="border-y border-slate-200 py-10 sm:py-12">
      <p className="text-center text-sm font-semibold uppercase tracking-wide text-slate-500">
        Built for Growing Local Businesses
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {indicators.map((indicator) => (
          <div key={indicator.label} className="flex items-center gap-2 text-slate-600">
            <indicator.icon className="h-4 w-4 text-brand-blue" aria-hidden="true" />
            <span className="text-sm font-medium">{indicator.label}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
