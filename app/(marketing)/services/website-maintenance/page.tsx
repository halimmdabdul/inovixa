import { buildMetadata } from "@/lib/seo/metadata";
import { getServiceBySlug } from "@/lib/data/services";
import { ServiceDetail } from "@/components/marketing/service-detail";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTASection } from "@/components/marketing/cta-section";
import { carePlans } from "@/lib/data/pricing";

const service = getServiceBySlug("website-maintenance")!;

export const metadata = buildMetadata({
  title: service.name,
  description: service.description,
  path: "/services/website-maintenance",
});

export default function WebsiteMaintenancePage() {
  return (
    <>
      <ServiceDetail service={service} />
      <Section>
        <SectionHeading
          eyebrow="Website Care Plans"
          title="Ongoing Support for Your Website"
          description="Monthly plans that keep your website fast, secure, and up to date."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {carePlans.map((plan) => (
            <div key={plan.id} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-blue">
                {plan.name}
              </h3>
              <p className="mt-3 text-3xl font-bold text-navy">
                {plan.price}
                <span className="text-base font-medium text-slate-500">{plan.priceSuffix}</span>
              </p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-sm text-slate-600">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
      <CTASection
        title="Not sure if this is the right fit?"
        description="Get a free website audit and we'll recommend the best next step for your business."
        secondaryHref="/pricing"
        secondaryLabel="View Pricing"
      />
    </>
  );
}
