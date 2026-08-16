import { buildMetadata } from "@/lib/seo/metadata";
import { getServiceBySlug } from "@/lib/data/services";
import { ServiceDetail } from "@/components/marketing/service-detail";
import { CTASection } from "@/components/marketing/cta-section";

const service = getServiceBySlug("website-redesign")!;

export const metadata = buildMetadata({
  title: service.name,
  description: service.description,
  path: "/services/website-redesign",
});

export default function WebsiteRedesignPage() {
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
