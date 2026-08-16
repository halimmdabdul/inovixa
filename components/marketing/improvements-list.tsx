import { ArrowRight, Check, X } from "lucide-react";
import type { CaseStudyImprovement } from "@/types";

export function ImprovementsList({ improvements }: { improvements: CaseStudyImprovement[] }) {
  return (
    <div className="space-y-5">
      {improvements.map((item) => (
        <div key={item.area} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {item.area}
          </h3>
          <div className="mt-4 grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
            <div className="flex items-start gap-2.5 rounded-xl bg-red-50/60 p-3.5">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
              <p className="text-sm text-slate-700">{item.before}</p>
            </div>
            <ArrowRight
              className="hidden h-4 w-4 shrink-0 rotate-90 text-slate-300 sm:block sm:rotate-0"
              aria-hidden="true"
            />
            <div className="flex items-start gap-2.5 rounded-xl bg-teal-50/60 p-3.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" aria-hidden="true" />
              <p className="text-sm font-medium text-slate-700">{item.after}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
