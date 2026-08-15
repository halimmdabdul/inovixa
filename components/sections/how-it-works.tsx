import { processSteps } from "@/lib/data/process";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export function HowItWorks() {
  return (
    <Section tone="surface" id="how-it-works">
      <SectionHeading title="A Simple Process From Idea to Launch" />
      <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {processSteps.map((step) => (
          <div key={step.number} className="flex gap-4">
            <span className="text-3xl font-bold text-slate-200">{step.number}</span>
            <div>
              <h3 className="text-base font-semibold text-navy">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
