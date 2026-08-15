import { problems } from "@/lib/data/problems";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProblemCard } from "@/components/cards/problem-card";

export function ProblemsSection() {
  return (
    <Section>
      <SectionHeading title="Is Your Website Costing You Customers?" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem) => (
          <ProblemCard key={problem.title} problem={problem} />
        ))}
      </div>
    </Section>
  );
}
