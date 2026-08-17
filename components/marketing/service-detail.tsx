import Link from "next/link";
import { ArrowRight, Check, ChevronRight, ShieldCheck } from "lucide-react";
import type { Service } from "@/types";
import { services } from "@/lib/data/services";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { FAQAccordion } from "@/components/marketing/faq-accordion";
import { ServiceCard } from "@/components/cards/service-card";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo/jsonld";
import { serviceScenes } from "@/components/illustrations/service-scenes";

export function ServiceDetail({ service }: { service: Service }) {
  const Scene = serviceScenes[service.slug];
  const path = `/services/${service.slug}`;
  const relatedServices = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: service.name,
          description: service.longDescription,
          path,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path },
        ])}
      />
      <JsonLd data={faqJsonLd(service.faqs)} />

      <Section className="py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-1.5 text-sm text-slate-500">
            <li>
              <Link href="/" className="hover:text-navy">
                Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" aria-hidden="true" />
            <li>
              <Link href="/services" className="hover:text-navy">
                Services
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" aria-hidden="true" />
            <li className="font-medium text-navy">{service.name}</li>
          </ol>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
              {service.shortName}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              {service.name}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              {service.longDescription}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/audit">
                Get Your Free Website Audit
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href="/pricing" variant="secondary">
                View Pricing
              </Button>
            </div>
            <Link
              href="/pricing#risk"
              className="mt-4 flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-blue"
            >
              <ShieldCheck className="h-4 w-4 text-brand-teal" aria-hidden="true" />
              50% to start, 50% at launch — no surprise invoices
            </Link>
          </div>

          <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            {Scene ? <Scene /> : null}
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-8">
            <h2 className="text-2xl font-semibold text-navy">What&rsquo;s Included</h2>
            <ul className="mt-6 space-y-3.5">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-8">
            <h2 className="text-2xl font-semibold text-navy">Ideal For</h2>
            <ul className="mt-6 space-y-3.5">
              {service.idealFor.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Common Questions" title={`${service.shortName} FAQ`} />
        <div className="mx-auto mt-12 max-w-3xl">
          <FAQAccordion items={service.faqs} />
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Explore More" title="Other Ways We Can Help" />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {relatedServices.map((related) => (
            <ServiceCard key={related.slug} service={related} />
          ))}
        </div>
      </Section>
    </>
  );
}
