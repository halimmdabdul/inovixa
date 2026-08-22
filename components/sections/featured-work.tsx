import { getCaseStudies } from "@/lib/case-studies";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CaseStudyCard } from "@/components/cards/case-study-card";
import { Button } from "@/components/ui/button";

export async function FeaturedWork() {
  const caseStudies = await getCaseStudies();
  const featured = caseStudies.slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <Section tone="surface" id="work">
      <SectionHeading
        eyebrow="Design Concepts"
        title="See How We Think Before You Hire Us"
        description="These fictional briefs demonstrate our approach to design, structure, and conversion. They are not presented as client work and contain no invented results."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <CaseStudyCard key={project.slug} project={project} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button href="/work" variant="secondary">
          Explore All Concepts
        </Button>
      </div>
    </Section>
  );
}
