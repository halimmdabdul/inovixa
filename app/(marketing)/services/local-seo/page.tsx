import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { getServiceBySlug } from "@/lib/services";
import { ServiceDetail } from "@/components/marketing/service-detail";
import { CTASection } from "@/components/marketing/cta-section";

export async function generateMetadata() {
  const service = await getServiceBySlug("local-seo");
  if (!service) return buildMetadata({ title: "Services", description: "Services", path: "/services" });

  return buildMetadata({
    title: service.name,
    description: service.description,
    path: "/services/local-seo",
  });
}

export default async function LocalSeoPage() {
  const service = await getServiceBySlug("local-seo");
  if (!service) notFound();

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
