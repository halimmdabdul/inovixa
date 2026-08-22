import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { BrowserMockup } from "@/components/hero/browser-mockup";
import { TrustPointsSlider } from "@/components/hero/trust-points-slider";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-background">
      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            A Better Website Should Make Your Business Easier to Trust.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            Inovixa designs and modernizes fast, clear websites that help local
            businesses explain their value and make the next step easy for customers.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/audit" size="md" trackLabel="Hero: Get Your Free Website Audit">
              Get Your Free Website Audit
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/work" variant="secondary" size="md" trackLabel="Hero: View Our Work">
              Explore Design Concepts
            </Button>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            No obligation. Get practical recommendations for improving your website.
          </p>
          <TrustPointsSlider />
        </div>

        <div className="relative">
          <div className="hidden sm:block sm:-rotate-3 sm:opacity-70">
            <BrowserMockup variant="old" label="old-site.com" className="max-w-sm" />
          </div>
          <div className="sm:absolute sm:-bottom-8 sm:right-0 sm:w-full sm:max-w-sm">
            <BrowserMockup variant="new" label="yourbusiness.com" />
          </div>
        </div>
      </Container>
    </section>
  );
}
