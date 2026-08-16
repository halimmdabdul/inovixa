import { expectations } from "@/lib/data/expectations";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export function ExpectationsSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Our Commitment"
        title="What You Can Expect Working With Us"
      />
      <div className="mt-12 flex flex-wrap justify-center gap-6">
        {expectations.map((item) => (
          <div
            key={item.title}
            className="flex w-full gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <item.icon className="h-5 w-5 text-brand-blue" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-navy">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
