import { buildMetadata } from "@/lib/seo/metadata";
import { Hero } from "@/components/hero/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { ProblemsSection } from "@/components/sections/problems-section";
import { BeforeAfterSection } from "@/components/sections/before-after-section";
import { ServicesSection } from "@/components/sections/services-section";
import { FeaturedWork } from "@/components/sections/featured-work";
import { WhyInovixa } from "@/components/sections/why-inovixa";
import { HowItWorks } from "@/components/sections/how-it-works";
import { IndustriesSection } from "@/components/sections/industries-section";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { ExpectationsSection } from "@/components/sections/expectations-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/marketing/cta-section";
import { SiteCheckerSection } from "@/components/sections/site-checker-section";
import { ClientResultsSection } from "@/components/sections/client-results-section";

export const metadata = buildMetadata({
  title: "Websites Built to Grow Your Business",
  description:
    "Inovixa Digital designs and modernizes fast, high-performing websites for local businesses that want more calls, bookings, leads, and customers.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProblemsSection />
      <SiteCheckerSection />
      <BeforeAfterSection />
      <ServicesSection />
      <FeaturedWork />
      <ClientResultsSection />
      <CTASection
        title="Want a clear plan for your website?"
        secondaryHref="/pricing"
        secondaryLabel="See Pricing"
      />
      <WhyInovixa />
      <HowItWorks />
      <IndustriesSection />
      <PricingPreview />
      <ExpectationsSection />
      <FAQSection />
      <CTASection
        title="Ready for a website that works as hard as you do?"
        description="Get a free, no-obligation website audit with practical recommendations for clarity, performance, search visibility, and conversion."
        secondaryHref="/contact"
        secondaryLabel="Discuss Your Project"
      />
    </>
  );
}
