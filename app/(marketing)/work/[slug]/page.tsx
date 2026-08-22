import { notFound } from "next/navigation";
import { AlertTriangle, Search, Target } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { caseStudies, getCaseStudyBySlug } from "@/lib/data/case-studies";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/marketing/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { BrowserMockup, type NewSiteCopy, type OldSiteCopy } from "@/components/hero/browser-mockup";
import { ImprovementsList } from "@/components/marketing/improvements-list";

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
  if (!project) {
    return buildMetadata({
      title: "Design Concepts",
      description: "Fictional design exercises showing the Inovixa approach.",
      path: "/work",
    });
  }

  return buildMetadata({
    title: `${project.title} Design Concept`,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

function projectDomain(title: string) {
  return `${title.toLowerCase().replace(/[^a-z0-9]+/g, "")}.com`;
}

/**
 * Flavors the before/after mockups with specific, fictional headline and body
 * copy per industry so the comparison feels specific and relatable, without
 * without using any real business's actual website. This is illustrative
 * copy, not a screenshot or a record of completed client work.
 */
const mockupCopy: Record<string, { old: OldSiteCopy; new: NewSiteCopy }> = {
  Roofing: {
    old: {
      bannerText: "☎ 24-HR Emergency Roof Repair ☎",
      navItems: ["Home", "Roofing", "Repairs", "Storm Damage", "Contact"],
      headline: "ABC Roofing Co. - Quality Service",
      paragraphs: [
        "We have been serving the area for many years.",
        "Contact us today for all your roofing needs.",
      ],
      sidebarTitle: "Our Services",
      sidebarText: "Repairs, replacement, inspections.",
    },
    new: {
      brand: "SummitRidge",
      navLinks: ["Services", "Reviews"],
      ctaText: "Get Estimate",
      heroHeadline: "Fast, Reliable Roof Repairs You Can Trust",
      heroSubtext: "Free estimates. Same-week scheduling available.",
      heroButtonText: "Get Free Estimate",
      cards: ["Roof Repair", "Storm Damage", "Free Inspection"],
    },
  },
  Dental: {
    old: {
      bannerText: "★ New Patients Welcome! ★",
      navItems: ["Home", "About", "Services", "Insurance", "Contact"],
      headline: "Welcome To Our Practice",
      paragraphs: [
        "We accept most major insurance plans.",
        "Call our office to schedule your visit.",
      ],
      sidebarTitle: "Office Hours",
      sidebarText: "Mon-Fri, 9am-5pm.",
    },
    new: {
      brand: "Brightview",
      navLinks: ["Services", "Team"],
      ctaText: "Book Now",
      heroHeadline: "Gentle Dental Care for the Whole Family",
      heroSubtext: "New patients welcome. Most insurance accepted.",
      heroButtonText: "Book an Appointment",
      cards: ["Cleanings", "Whitening", "Emergency Care"],
    },
  },
  "Real Estate": {
    old: {
      bannerText: "★ Serving The Area Since 1998 ★",
      navItems: ["Home", "Listings", "Agents", "Sell", "Contact"],
      headline: "Welcome To Our Realty",
      paragraphs: [
        "Browse our current listings below.",
        "Call one of our agents today.",
      ],
      sidebarTitle: "Featured Listing",
      sidebarText: "3 bed, 2 bath home.",
    },
    new: {
      brand: "Harborline",
      navLinks: ["Listings", "Agents"],
      ctaText: "Contact",
      heroHeadline: "Find Your Next Home With Confidence",
      heroSubtext: "Local expertise. Modern, up-to-date listings.",
      heroButtonText: "View Listings",
      cards: ["Buy", "Sell", "Find an Agent"],
    },
  },
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug);

  if (!project) notFound();

  const domain = projectDomain(project.title);
  const copy = mockupCopy[project.industry];

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
      </Section>

      {/* Before / after */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="The Design Exercise"
          title="From a Weak Experience to a Clearer One"
          description={`An illustrated before-and-after concept for ${project.title}. This is not a real business, client engagement, or performance claim.`}
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-2">
          <div>
            <BrowserMockup variant="old" label={domain} oldCopy={copy?.old} />
            <p className="mt-3 text-center text-sm text-slate-500">Before</p>
          </div>
          <div>
            <BrowserMockup variant="new" label={domain} newCopy={copy?.new} />
            <p className="mt-3 text-center text-sm text-slate-500">After</p>
          </div>
        </div>
      </Section>

      {/* The challenge */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="flex items-start gap-4 rounded-2xl border border-red-100 bg-red-50/50 p-6 sm:p-8">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-red-500">
                The Fictional Brief
              </h2>
              <p className="mt-2 text-base leading-relaxed text-slate-700">{project.problem}</p>
              <p className="mt-3 text-base leading-relaxed text-slate-700">{project.before}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* What we improved */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="What We Improved"
          title="What We Would Change, and Why"
          description="A plain-language look at the proposed improvements in this design exercise."
        />
        <div className="mx-auto mt-12 max-w-3xl">
          <ImprovementsList improvements={project.improvements} />
        </div>
      </Section>

      {/* SEO and lead generation */}
      <Section>
        <SectionHeading eyebrow="Growth Strategy" title="Search Visibility &amp; Lead Generation" />
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50">
              <Search className="h-5 w-5 text-brand-teal" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-navy">SEO Setup</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{project.seoSetup}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50">
              <Target className="h-5 w-5 text-brand-teal" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-navy">Lead-Generation Strategy</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{project.leadStrategy}</p>
          </div>
        </div>
      </Section>

      <CTASection title="Want this level of thought applied to your website?" />
    </>
  );
}
