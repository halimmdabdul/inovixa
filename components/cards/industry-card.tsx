import type { Industry } from "@/types";
import { industryScenes } from "@/components/illustrations/industry-scenes";

export function IndustryCard({ industry }: { industry: Industry }) {
  const Scene = industryScenes[industry.slug];

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-center shadow-sm transition-shadow hover:shadow-md">
      <div className="aspect-[4/3] overflow-hidden">{Scene ? <Scene /> : null}</div>
      <div className="p-5">
        <h3 className="text-base font-semibold text-navy">{industry.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{industry.description}</p>
      </div>
    </div>
  );
}
