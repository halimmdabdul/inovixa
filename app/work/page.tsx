import { buildMetadata } from "@/lib/seo/metadata";
import { caseStudies } from "@/lib/data/case-studies";
import { Section } from "@/components/ui/section";
import { CaseStudyCard } from "@/components/cards/case-study-card";
import { CTASection } from "@/components/marketing/cta-section";

export const metadata = buildMetadata({
  title: "Our Work",
  description:
    "Concept projects showing how Inovixa Digital approaches website design, development, and conversion for local service businesses.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <Section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">Our Work</h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            These are concept projects for fictional businesses, created to
            demonstrate our design and development approach. As we complete
            real client projects, they&rsquo;ll be added here.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((project) => (
            <CaseStudyCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>
      <CTASection title="Ready for a website like this?" />
    </>
  );
}
