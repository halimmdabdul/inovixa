import { Check } from "lucide-react";
import type { PricingPlan } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border p-8",
        plan.highlighted
          ? "border-brand-blue bg-navy text-white shadow-lg lg:-translate-y-3"
          : "border-slate-200 bg-white shadow-sm",
      )}
    >
      {plan.highlighted ? (
        <span className="mb-4 inline-flex w-fit items-center rounded-full bg-brand-teal px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          Most Popular
        </span>
      ) : null}
      <h3
        className={cn(
          "text-sm font-semibold uppercase tracking-wide",
          plan.highlighted ? "text-brand-teal" : "text-brand-blue",
        )}
      >
        {plan.name}
      </h3>
      <p className={cn("mt-3 text-4xl font-bold", plan.highlighted ? "text-white" : "text-navy")}>
        {plan.price}
      </p>
      <p className={cn("mt-3 text-sm leading-relaxed", plan.highlighted ? "text-slate-300" : "text-slate-600")}>
        {plan.description}
      </p>
      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <Check
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0",
                plan.highlighted ? "text-brand-teal" : "text-brand-blue",
              )}
              aria-hidden="true"
            />
            <span className={plan.highlighted ? "text-slate-200" : "text-slate-700"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <Button
        href="/contact"
        variant={plan.highlighted ? "teal" : "secondary"}
        className="mt-8 w-full"
      >
        {plan.cta}
      </Button>
    </div>
  );
}
