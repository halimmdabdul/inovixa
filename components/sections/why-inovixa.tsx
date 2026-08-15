import { whyPoints } from "@/lib/data/why-us";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export function WhyInovixa() {
  return (
    <Section>
      <SectionHeading title="Websites Designed for Business Results" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {whyPoints.map((point) => (
          <div key={point.title} className="text-center sm:text-left">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 sm:mx-0">
              <point.icon className="h-6 w-6 text-brand-blue" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-navy">{point.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{point.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
