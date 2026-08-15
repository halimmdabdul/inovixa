import type { Problem } from "@/types";
import { problemScenes } from "@/components/illustrations/problem-scenes";

export function ProblemCard({ problem }: { problem: Problem }) {
  const Scene = problemScenes[problem.title];

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="aspect-[16/10] overflow-hidden">{Scene ? <Scene /> : null}</div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-navy">{problem.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{problem.description}</p>
      </div>
    </div>
  );
}
