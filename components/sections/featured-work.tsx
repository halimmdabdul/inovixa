import { caseStudies } from "@/lib/data/case-studies";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CaseStudyCard } from "@/components/cards/case-study-card";
import { Button } from "@/components/ui/button";

export function FeaturedWork() {
  const featured = caseStudies.slice(0, 3);

  return (
    <Section tone="surface" id="work">
      <SectionHeading
        eyebrow="Featured Work"
        title="A Look at Our Design Approach"
        description="Concept projects that show how we approach design, structure, and conversion for local service businesses."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <CaseStudyCard key={project.slug} project={project} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button href="/work" variant="secondary">
          View All Work
        </Button>
      </div>
    </Section>
  );
}
