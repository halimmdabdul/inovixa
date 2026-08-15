import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/types";
import { Badge } from "@/components/ui/badge";
import { caseStudyScenes } from "@/components/illustrations/case-study-scenes";

export function CaseStudyCard({ project }: { project: CaseStudy }) {
  const Scene = caseStudyScenes[project.slug];

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="aspect-[16/10] overflow-hidden">
        {Scene ? <Scene /> : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2">
          <Badge tone="blue">{project.industry}</Badge>
          {project.isConcept ? <Badge tone="navy">Concept Project</Badge> : null}
        </div>
        <h3 className="mt-3 text-lg font-semibold text-navy">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{project.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue">
          View case study
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
