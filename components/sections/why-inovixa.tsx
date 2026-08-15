import { whyPoints } from "@/lib/data/why-us";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export function WhyInovixa() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Why Inovixa"
        title="Websites Designed for Business Results"
        description="A good-looking website isn't the goal on its own. Every one of these has to be true for a website to actually grow your business."
      />
      <div className="mt-12 flex flex-wrap justify-center gap-6">
        {whyPoints.map((point) => (
          <div
            key={point.title}
            className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <point.icon className="h-6 w-6 text-brand-blue" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-base font-semibold text-navy">{point.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{point.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
