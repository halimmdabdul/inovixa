import { buildMetadata } from "@/lib/seo/metadata";
import { getServiceBySlug } from "@/lib/data/services";
import { ServiceDetail } from "@/components/marketing/service-detail";

const service = getServiceBySlug("website-redesign")!;

export const metadata = buildMetadata({
  title: service.name,
  description: service.description,
  path: "/services/website-redesign",
});

export default function WebsiteRedesignPage() {
  return <ServiceDetail service={service} />;
}
