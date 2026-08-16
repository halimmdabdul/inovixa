import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SiteCheckerForm } from "@/components/tools/site-checker-form";

export function SiteCheckerSection() {
  return (
    <Section tone="surface" id="site-checker">
      <SectionHeading
        eyebrow="Free Tool"
        title="See Your SEO Score in Seconds"
        description="Enter your website to get an instant, automated technical SEO scan."
      />
      <div className="mx-auto mt-12 max-w-2xl">
        <SiteCheckerForm />
      </div>
    </Section>
  );
}
