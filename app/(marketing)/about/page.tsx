import {
  Accessibility,
  Briefcase,
  Eye,
  FileCheck2,
  Gem,
  Handshake,
  LifeBuoy,
  MessageCircle,
  MessageSquareText,
  Puzzle,
  Search,
  Shield,
  Smartphone,
  Sprout,
  Zap,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTASection } from "@/components/marketing/cta-section";
import { FounderSection } from "@/components/sections/founder-section";
import { TeamSection } from "@/components/sections/team-section";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Inovixa Digital is run by a software engineer helping small and local businesses get modern, fast websites without agency overhead or inflated pricing.",
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

const howWeWork = [
  {
    title: "Direct Communication",
    description:
      "You talk directly to the person building your website. No account managers, no hand-offs, no waiting days for a reply.",
    icon: MessageSquareText,
  },
  {
    title: "Fixed Price, No Surprises",
    description:
      "You get a clear, written proposal with an exact price before any work begins.",
    icon: FileCheck2,
  },
  {
    title: "Review Before Launch",
    description:
      "You see and approve the finished website, with room for revisions, before it ever goes live.",
    icon: Eye,
  },
  {
    title: "Support After Launch",
    description:
      "Website Care plans keep your site fast, secure, and updated long after the project ships.",
    icon: LifeBuoy,
  },
];

const technicalExperience = [
  {
    title: "Fast by Design",
    description: "Modern, lightweight code instead of a bloated page builder, so pages load quickly.",
    icon: Zap,
  },
  {
    title: "Mobile-First",
    description: "Every site is designed and tested for the devices your customers actually use.",
    icon: Smartphone,
  },
  {
    title: "Secure by Default",
    description: "HTTPS/SSL and sound security practices on every website, no exceptions.",
    icon: Shield,
  },
  {
    title: "SEO Foundations Built In",
    description: "Proper titles, meta tags, and technical SEO basics from day one, not bolted on later.",
    icon: Search,
  },
  {
    title: "Accessibility Basics",
    description: "Built so more of your customers can actually use your site, not just view it.",
    icon: Accessibility,
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
            About Inovixa
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Built by an Engineer, Not a Sales Team
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Inovixa Digital is run by a single software engineer who
            personally designs, builds, and maintains every website — so you
            always know exactly who&rsquo;s doing the work.
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

      <Section tone="surface">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading eyebrow="The Problem" title="Why Inovixa Exists" />
          <p className="mt-6 text-base leading-relaxed text-slate-600">
            Most small businesses end up choosing between two bad options: a
            cheap template builder that never quite looks right, or a
            traditional agency that charges thousands of dollars, takes
            months to deliver, and hands the project off to a junior team you
            never actually talk to.
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Inovixa Digital exists to be a better alternative: one
            experienced engineer, fixed and published pricing, direct
            communication from the first call to launch day, and a website
            built to actually bring in customers — not just look nice.
          </p>
        </div>
      </Section>

      <FounderSection />

      <TeamSection />

      <Section tone="surface">
        <SectionHeading eyebrow="Working Together" title="How We Work" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howWeWork.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <item.icon className="h-5 w-5 text-brand-blue" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Technical Background" title="Our Technical Experience" />
        <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-slate-600">
          Every Inovixa website is built by a software engineer with 7+ years
          of experience building software and digital products — not
          assembled from a page builder template.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {technicalExperience.map((item) => (
            <div key={item.title} className="text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <item.icon className="h-5 w-5 text-brand-blue" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-navy">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading eyebrow="Our Focus" title="Why Small Businesses" />
          <p className="mt-6 text-base leading-relaxed text-slate-600">
            Small and local businesses are usually an afterthought online —
            too small for enterprise agencies, and often abandoned by
            freelancers right after launch. Inovixa focuses specifically on
            this space: roofers, dentists, plumbers, contractors, and other
            local service businesses that need a website built to bring in
            calls and customers, not just look good in a portfolio.
          </p>
        </div>
      </Section>

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
        title="Let's Work Together"
        description="Get a free website audit or tell us about your project."
        secondaryHref="/contact"
        secondaryLabel="Discuss Your Project"
      />
    </>
  );
}
