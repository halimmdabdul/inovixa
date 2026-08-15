import type { Industry } from "@/types";

export function IndustryCard({ industry }: { industry: Industry }) {
  const Icon = industry.icon;

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">
        <Icon className="h-6 w-6 text-brand-teal" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-navy">{industry.name}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{industry.description}</p>
    </div>
  );
}
