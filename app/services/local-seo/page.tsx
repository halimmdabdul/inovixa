import { buildMetadata } from "@/lib/seo/metadata";
import { getServiceBySlug } from "@/lib/data/services";
import { ServiceDetail } from "@/components/marketing/service-detail";

const service = getServiceBySlug("local-seo")!;

export const metadata = buildMetadata({
  title: service.name,
  description: service.description,
  path: "/services/local-seo",
});

export default function LocalSeoPage() {
  return <ServiceDetail service={service} />;
}
