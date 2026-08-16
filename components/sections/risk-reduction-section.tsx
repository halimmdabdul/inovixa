import { ShieldCheck } from "lucide-react";
import { riskReductionSteps } from "@/lib/data/risk-reduction";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export function RiskReductionSection() {
  return (
    <Section tone="surface">
      <SectionHeading
        eyebrow="How Payment Works"
        title="A Simple, Low-Risk Process"
        description="You'll always know what you're paying for and when — before any money changes hands."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {riskReductionSteps.map((step) => (
          <div
            key={step.number}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <step.icon className="h-5 w-5 text-brand-blue" aria-hidden="true" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Step {step.number}
              </span>
            </div>
            <h3 className="mt-4 text-base font-semibold text-navy">{step.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-8 flex max-w-2xl items-start gap-3 rounded-2xl border border-brand-teal/20 bg-teal-50 p-5">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" aria-hidden="true" />
        <p className="text-sm font-medium text-navy">
          No surprise fees. Scope and pricing agreed before work begins.
        </p>
      </div>
    </Section>
  );
}
