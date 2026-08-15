import { buildMetadata } from "@/lib/seo/metadata";
import { services } from "@/lib/data/services";
import { Section } from "@/components/ui/section";
import { ServiceCard } from "@/components/cards/service-card";
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
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>
      <CTASection
        title="Not sure which service fits your business?"
        description="Start with a free website audit and we'll recommend the right next step."
      />
    </>
  );
}
