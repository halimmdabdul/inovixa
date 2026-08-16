import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { WebsiteAuditForm } from "@/components/forms/website-audit-form";

const trustPoints = [
  "No obligation, no sales pressure",
  "Practical recommendations you can actually use",
  "Takes about a minute to request",
];

export function LandingHero() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-background">
      <Container className="grid items-start gap-12 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Free Website Audit
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-[3.1rem] lg:leading-[1.1]">
            Get More Calls, Bookings, and Customers From Your Website
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            Request a free, no-obligation website audit. We&rsquo;ll show you
            exactly what&rsquo;s costing you customers and how to fix it.
          </p>
          <ul className="mt-7 space-y-3">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-teal" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div id="audit-form" className="scroll-mt-24">
          <WebsiteAuditForm />
        </div>
      </Container>
    </section>
  );
}
