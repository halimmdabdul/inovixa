import { whyPoints } from "@/lib/data/why-us";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { whyUsScenes } from "@/components/illustrations/why-us-scenes";

export function WhyInovixa() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Why Inovixa"
        title="Websites Designed for Business Results"
        description="A good-looking website isn't the goal on its own. Every one of these has to be true for a website to actually grow your business."
      />
      <div className="mt-12 flex flex-wrap justify-center gap-6">
        {whyPoints.map((point) => {
          const Scene = whyUsScenes[point.title];
          return (
            <div
              key={point.title}
              className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <div className="aspect-[16/10] overflow-hidden">{Scene ? <Scene /> : null}</div>
              <div className="p-6">
                <h3 className="text-base font-semibold text-navy">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{point.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
