import { Check } from "lucide-react";
import type { Service } from "@/types";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/marketing/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo/jsonld";
import { serviceScenes } from "@/components/illustrations/service-scenes";

export function ServiceDetail({ service }: { service: Service }) {
  const Icon = service.icon;
  const Scene = serviceScenes[service.slug];
  const path = `/services/${service.slug}`;

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

      <Section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
            <Icon className="h-7 w-7 text-brand-blue" aria-hidden="true" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            {service.name}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            {service.longDescription}
          </p>
          <div className="mt-8">
            <Button href="/audit">Get Your Free Website Audit</Button>
          </div>
        </div>

        <div className="mx-auto mt-12 aspect-[16/7] max-w-4xl overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
          {Scene ? <Scene /> : null}
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-navy">What&rsquo;s Included</h2>
            <ul className="mt-6 space-y-3">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-navy">Ideal For</h2>
            <ul className="mt-6 space-y-3">
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

      <CTASection
        title="Not sure if this is the right fit?"
        description="Get a free website audit and we'll recommend the best next step for your business."
        secondaryHref="/pricing"
        secondaryLabel="View Pricing"
      />
    </>
  );
}
