import { buildMetadata } from "@/lib/seo/metadata";
import { getServiceBySlug } from "@/lib/data/services";
import { ServiceDetail } from "@/components/marketing/service-detail";

const service = getServiceBySlug("website-development")!;

export const metadata = buildMetadata({
  title: service.name,
  description: service.description,
  path: "/services/website-development",
});

export default function WebsiteDevelopmentPage() {
  return <ServiceDetail service={service} />;
}
