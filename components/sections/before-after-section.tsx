import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { BeforeAfter } from "@/components/marketing/before-after";

export function BeforeAfterSection() {
  return (
    <Section tone="surface">
      <SectionHeading title="From Outdated to Outstanding" />
      <div className="mt-12">
        <BeforeAfter />
      </div>
    </Section>
  );
}
