import { services } from "@/lib/data/services";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/cards/service-card";

const customSolutions = [
  "Web applications",
  "Business automation",
  "Mobile applications",
  "CRM integrations",
  "AI integrations",
  "Internal dashboards",
];

export function ServicesSection() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Services"
        title="Everything Your Website Needs to Perform"
        description="We focus on the fundamentals that turn a website into a growth tool for your business."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>

      <div
        id="custom-solutions"
        className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8 sm:p-10"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-navy">Need Something More Custom?</h3>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-600">
              We can also help with:
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-600 sm:grid-cols-3">
            {customSolutions.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
