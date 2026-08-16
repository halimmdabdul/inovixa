import { buildMetadata } from "@/lib/seo/metadata";
import { carePlans, pricingPlans } from "@/lib/data/pricing";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { PricingCard } from "@/components/cards/pricing-card";
import { CTASection } from "@/components/marketing/cta-section";
import { RiskReductionSection } from "@/components/sections/risk-reduction-section";

export const metadata = buildMetadata({
  title: "Pricing",
  description:
    "Simple, transparent pricing for website design, redesign, and ongoing website care plans.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <Section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Simple, Transparent Website Packages
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Three packages designed for different stages of growth.
          </p>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          Final pricing depends on project requirements.
        </p>
      </Section>

      <RiskReductionSection />

      <Section>
        <SectionHeading
          eyebrow="Website Care"
          title="Monthly Website Care Plans"
          description="Keep your website fast, secure, and improving after launch."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {carePlans.map((plan) => (
            <div key={plan.id} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-blue">
                {plan.name}
              </h3>
              <p className="mt-3 text-3xl font-bold text-navy">
                {plan.price}
                <span className="text-base font-medium text-slate-500">{plan.priceSuffix}</span>
              </p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-sm text-slate-600">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        title="Not sure which package fits your business?"
        description="Get a free website audit and we'll recommend the right package for your goals."
      />
    </>
  );
}
