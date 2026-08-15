import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { caseStudies, getCaseStudyBySlug } from "@/lib/data/case-studies";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/marketing/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { caseStudyScenes } from "@/components/illustrations/case-study-scenes";

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug);
  if (!project) return buildMetadata({ title: "Work", description: "Case study", path: "/work" });

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

const detailRows = (project: NonNullable<ReturnType<typeof getCaseStudyBySlug>>) => [
  { label: "Problem", value: project.problem },
  { label: "Website Before", value: project.before },
  { label: "Our Solution", value: project.solution },
  { label: "Design", value: project.design },
  { label: "Development", value: project.development },
  { label: "Mobile Improvements", value: project.mobileImprovements },
  { label: "Performance Improvements", value: project.performanceImprovements },
  { label: "SEO Setup", value: project.seoSetup },
  { label: "Lead-Generation Strategy", value: project.leadStrategy },
];

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug);

  if (!project) notFound();

  const Scene = caseStudyScenes[project.slug];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: project.title, path: `/work/${project.slug}` },
        ])}
      />

      <Section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2">
            <Badge tone="blue">{project.industry}</Badge>
            {project.isConcept ? <Badge tone="navy">Concept Project</Badge> : null}
          </div>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">{project.summary}</p>
        </div>

        <div className="mx-auto mt-12 aspect-[16/7] max-w-4xl overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
          {Scene ? <Scene /> : null}
        </div>
      </Section>

      <Section tone="surface">
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
          {detailRows(project).map((row) => (
            <div key={row.label} className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {row.label}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{row.value}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CTASection title="Ready for a website like this?" />
    </>
  );
}
