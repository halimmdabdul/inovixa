import { Briefcase, Gem, Handshake, MessageCircle, Puzzle, Sprout } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTASection } from "@/components/marketing/cta-section";
import { FounderSection } from "@/components/sections/founder-section";

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
    icon: MessageCircle,
  },
  {
    title: "Quality over shortcuts",
    description: "We build things properly the first time, not just quickly.",
    icon: Gem,
  },
  {
    title: "Business-first thinking",
    description: "Every decision is judged by whether it helps your business grow.",
    icon: Briefcase,
  },
  {
    title: "Long-term partnerships",
    description: "We aim to keep working with businesses well past launch day.",
    icon: Handshake,
  },
  {
    title: "Simple solutions",
    description: "We avoid unnecessary complexity that makes websites harder to manage.",
    icon: Puzzle,
  },
  {
    title: "Continuous improvement",
    description: "A website should keep getting better, not sit untouched after launch.",
    icon: Sprout,
  },
];

const facts = ["Remote-first", "Fixed, published pricing", "USA, UK & beyond"];

export default function AboutPage() {
  return (
    <>
      <Section className="relative overflow-hidden py-16 sm:py-20">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-blue/10 to-brand-teal/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
            About Inovixa Digital
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Better Websites for Better Businesses
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Inovixa Digital helps small and growing businesses improve their
            digital presence through modern websites, better user
            experiences, strong technical foundations, and practical digital
            solutions.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {facts.map((fact) => (
              <span
                key={fact}
                className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm"
              >
                {fact}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <FounderSection tone="surface" />

      <Section>
        <SectionHeading eyebrow="Our Principles" title="What We Value" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <value.icon className="h-5 w-5 text-brand-blue" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-navy">{value.title}</h3>
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
