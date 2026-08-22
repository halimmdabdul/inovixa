import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import type { Service } from "@/types";
import { serviceScenes } from "@/components/illustrations/service-scenes";
import { cn } from "@/lib/utils";

export function ServiceFeatureRow({
  service,
  reversed = false,
}: {
  service: Service;
  reversed?: boolean;
}) {
  const Scene = serviceScenes[service.slug];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 shadow-sm",
          reversed && "lg:order-2",
        )}
      >
        {service.imageUrl ? (
          <Image src={service.imageUrl} alt="" fill className="object-cover" />
        ) : Scene ? (
          <Scene />
        ) : null}
      </div>
      <div className={reversed ? "lg:order-1" : undefined}>
        <h3 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">{service.name}</h3>
        <p className="mt-3 text-base leading-relaxed text-slate-600">{service.longDescription}</p>
        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
        <Link
          href={`/services/${service.slug}`}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark"
        >
          {service.ctaLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
