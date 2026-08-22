import { buildMetadata } from "@/lib/seo/metadata";
import { caseStudies } from "@/lib/data/case-studies";
import { Section } from "@/components/ui/section";
import { CaseStudyCard } from "@/components/cards/case-study-card";
import { CTASection } from "@/components/marketing/cta-section";

export const metadata = buildMetadata({
  title: "Design Concepts",
  description:
    "Concept projects showing how Inovixa Digital approaches website design, development, and conversion for local service businesses.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <Section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Design Concepts, Clearly Labeled
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            These projects use fictional businesses to demonstrate our design
            and development approach. They are not client projects, and none
            of the challenges or outcomes shown here are claimed as real.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Each concept explains the decisions we would make for a real
            project. Verified client work will be added only with permission.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((project) => (
            <CaseStudyCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>
      <CTASection title="Want this level of thought applied to your website?" />
    </>
  );
}
