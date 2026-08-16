import { buildMetadata } from "@/lib/seo/metadata";
import { getServiceBySlug } from "@/lib/data/services";
import { ServiceDetail } from "@/components/marketing/service-detail";
import { CTASection } from "@/components/marketing/cta-section";

const service = getServiceBySlug("local-seo")!;

export const metadata = buildMetadata({
  title: service.name,
  description: service.description,
  path: "/services/local-seo",
});

export default function LocalSeoPage() {
  return (
    <>
      <ServiceDetail service={service} />
      <CTASection
        title="Not sure if this is the right fit?"
        description="Get a free website audit and we'll recommend the best next step for your business."
        secondaryHref="/pricing"
        secondaryLabel="View Pricing"
      />
    </>
  );
}
