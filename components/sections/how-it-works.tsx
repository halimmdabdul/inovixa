import { processSteps } from "@/lib/data/process";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function HowItWorks() {
  return (
    <Section tone="surface" id="how-it-works">
      <SectionHeading
        eyebrow="Process"
        title="A Simple Process From Idea to Launch"
        description="Every project follows the same clear path, from first conversation to ongoing growth."
      />
      <ol className="relative mx-auto mt-14 max-w-2xl">
        <div
          className="absolute left-5 top-5 bottom-5 w-px bg-slate-200"
          aria-hidden="true"
        />
        {processSteps.map((step, index) => {
          const isGrowthPhase = index >= 4;
          const Icon = step.icon;

          return (
            <li key={step.number} className="relative flex gap-5 pb-10 last:pb-0 sm:gap-6">
              <div
                className={cn(
                  "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-sm ring-4 ring-surface",
                  isGrowthPhase ? "bg-brand-teal" : "bg-brand-blue",
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="flex-1 rounded-xl border border-slate-200 bg-slate-50 p-5">
                <span
                  className={cn(
                    "text-xs font-semibold uppercase tracking-wide",
                    isGrowthPhase ? "text-teal-700" : "text-brand-blue",
                  )}
                >
                  Step {step.number}
                </span>
                <h3 className="mt-1 text-lg font-semibold text-navy">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
