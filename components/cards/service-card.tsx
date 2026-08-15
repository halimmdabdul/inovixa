import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types";
import { serviceScenes } from "@/components/illustrations/service-scenes";

export function ServiceCard({ service }: { service: Service }) {
  const Scene = serviceScenes[service.slug];

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="aspect-[16/10] overflow-hidden">{Scene ? <Scene /> : null}</div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-navy">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
          {service.description}
        </p>
        <Link
          href={`/services/${service.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark"
        >
          {service.ctaLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
