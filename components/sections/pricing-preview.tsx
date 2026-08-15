import { pricingPlans } from "@/lib/data/pricing";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { PricingCard } from "@/components/cards/pricing-card";
import { Button } from "@/components/ui/button";

export function PricingPreview() {
  return (
    <Section tone="surface" id="pricing">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple, Transparent Website Packages"
        description="Three packages designed for different stages of growth. Final pricing depends on project requirements."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button href="/pricing" variant="secondary">
          See Full Pricing Details
        </Button>
      </div>
    </Section>
  );
}
