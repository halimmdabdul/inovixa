import type { Problem } from "@/types";

export function ProblemCard({ problem }: { problem: Problem }) {
  const Icon = problem.icon;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
        <Icon className="h-5 w-5 text-red-500" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-navy">{problem.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{problem.description}</p>
    </div>
  );
}
