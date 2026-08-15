import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
        <Icon className="h-6 w-6 text-brand-blue" aria-hidden="true" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-navy">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {service.description}
      </p>
      <Link
        href={`/services/${service.slug}`}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark"
      >
        {service.ctaLabel}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
