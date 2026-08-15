import { industries } from "@/lib/data/industries";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { IndustryCard } from "@/components/cards/industry-card";

export function IndustriesSection() {
  return (
    <Section>
      <SectionHeading title="Websites for Local Service Businesses" />
      <div className="mt-12 grid gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {industries.map((industry) => (
          <IndustryCard key={industry.slug} industry={industry} />
        ))}
      </div>
    </Section>
  );
}
