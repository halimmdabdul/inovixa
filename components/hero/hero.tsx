import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { BrowserMockup } from "@/components/hero/browser-mockup";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-background">
      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            Turn Your Outdated Website Into a Customer-Generating Website.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            We design and modernize fast, high-performing websites for local
            businesses that want more calls, bookings, leads, and customers.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/audit" size="md">
              Get Your Free Website Audit
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/work" variant="secondary" size="md">
              View Our Work
            </Button>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            No obligation. Get practical recommendations for improving your website.
          </p>
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
