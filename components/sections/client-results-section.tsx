import { clientResults } from "@/lib/data/client-results";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ClientResultCard } from "@/components/cards/client-result-card";

export function ClientResultsSection() {
  if (clientResults.length === 0) return null;

  return (
    <Section id="results">
      <SectionHeading eyebrow="Recent Client Results" title="Real Projects, Real Outcomes" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {clientResults.map((result) => (
          <ClientResultCard key={result.clientName} result={result} />
        ))}
      </div>
    </Section>
  );
}
