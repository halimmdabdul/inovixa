import { buildMetadata } from "@/lib/seo/metadata";
import { services } from "@/lib/data/services";
import { Section } from "@/components/ui/section";
import { ServiceFeatureRow } from "@/components/marketing/service-feature-row";
import { CTASection } from "@/components/marketing/cta-section";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Website redesign, new business websites, local SEO, and website care plans for local service businesses.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Websites and Digital Services Built for Growth
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Whether you need a redesign, a brand-new website, better search
            visibility, or ongoing support, we focus on what actually helps
            your business get more customers.
          </p>
        </div>
      </Section>

      <Section tone="surface" className="space-y-16 sm:space-y-20">
        {services.map((service, index) => (
          <ServiceFeatureRow key={service.slug} service={service} reversed={index % 2 === 1} />
        ))}
      </Section>

      <CTASection
        title="Not sure which service fits your business?"
        description="Start with a free website audit and we'll recommend the right next step."
      />
    </>
  );
}
