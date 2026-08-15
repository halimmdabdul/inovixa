import { buildMetadata } from "@/lib/seo/metadata";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTASection } from "@/components/marketing/cta-section";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Inovixa Digital helps small and growing businesses improve their digital presence through modern websites and practical digital solutions.",
  path: "/about",
});

const values = [
  {
    title: "Clear communication",
    description: "You should always know what's happening with your project and why.",
  },
  {
    title: "Quality over shortcuts",
    description: "We build things properly the first time, not just quickly.",
  },
  {
    title: "Business-first thinking",
    description: "Every decision is judged by whether it helps your business grow.",
  },
  {
    title: "Long-term partnerships",
    description: "We aim to keep working with businesses well past launch day.",
  },
  {
    title: "Simple solutions",
    description: "We avoid unnecessary complexity that makes websites harder to manage.",
  },
  {
    title: "Continuous improvement",
    description: "A website should keep getting better, not sit untouched after launch.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Better Websites for Better Businesses
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Inovixa Digital helps small and growing businesses improve their
            digital presence through modern websites, better user
            experiences, strong technical foundations, and practical digital
            solutions.
          </p>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading title="What We Value" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-semibold text-navy">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        title="Ready to work together?"
        description="Get a free website audit or tell us about your project."
        secondaryHref="/contact"
        secondaryLabel="Discuss Your Project"
      />
    </>
  );
}
