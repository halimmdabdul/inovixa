import { buildMetadata } from "@/lib/seo/metadata";
import { LandingHeader } from "@/components/navigation/landing-header";
import { LandingFooter } from "@/components/navigation/landing-footer";
import { LandingHero } from "@/components/sections/landing-hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { ProblemsSection } from "@/components/sections/problems-section";
import { SiteCheckerSection } from "@/components/sections/site-checker-section";
import { BeforeAfterSection } from "@/components/sections/before-after-section";
import { WhyInovixa } from "@/components/sections/why-inovixa";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/marketing/cta-section";
import { StickyMobileCta } from "@/components/marketing/sticky-mobile-cta";

export const metadata = buildMetadata({
  title: "Get Your Free Website Audit",
  description:
    "Request a free, no-obligation website audit and find out exactly what's holding your website back from generating more calls, bookings, and customers.",
  path: "/get-started",
});

export default function GetStartedPage() {
  return (
    <>
      <LandingHeader />
      <main id="main-content" className="flex-1">
        <LandingHero />
        <TrustBar />
        <ProblemsSection />
        <SiteCheckerSection />
        <BeforeAfterSection />
        <WhyInovixa />
        <HowItWorks />
        <PricingPreview />
        <FAQSection />
        <CTASection
          title="Ready to find out what's holding your website back?"
          description="Get your free, no-obligation website audit today."
          primaryHref="#audit-form"
        />
      </main>
      <LandingFooter />
      <StickyMobileCta />
    </>
  );
}
