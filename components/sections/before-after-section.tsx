import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { BeforeAfter } from "@/components/marketing/before-after";

export function BeforeAfterSection() {
  return (
    <Section tone="surface">
      <SectionHeading
        eyebrow="The Transformation"
        title="From Outdated to Outstanding"
        description="The same business, reimagined. Here's what changes when your website gets redesigned the right way."
      />
      <div className="mt-12">
        <BeforeAfter />
      </div>
    </Section>
  );
}
