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
import { caseStudyScenes } from "@/components/illustrations/case-study-scenes";
import { BrowserMockup } from "@/components/hero/browser-mockup";
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
  if (!project) return buildMetadata({ title: "Work", description: "Case study", path: "/work" });

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

function projectDomain(title: string) {
  return `${title.toLowerCase().replace(/[^a-z0-9]+/g, "")}.com`;
}

/**
 * Flavors the "old site" mockup per industry so the before/after comparison
 * feels specific and relatable, without using any real business's actual
 * website — these are original placeholder scenes, not screenshots.
 */
const oldSiteFlavor: Record<string, { bannerText: string; navItems: string[] }> = {
  Roofing: {
    bannerText: "☎ 24-HR Emergency Roof Repair ☎",
    navItems: ["Home", "Roofing", "Repairs", "Storm Damage", "Contact"],
  },
  Dental: {
    bannerText: "★ New Patients Welcome! ★",
    navItems: ["Home", "About", "Services", "Insurance", "Contact"],
  },
  "Real Estate": {
    bannerText: "★ Serving The Area Since 1998 ★",
    navItems: ["Home", "Listings", "Agents", "Sell", "Contact"],
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

  const Scene = caseStudyScenes[project.slug];
  const domain = projectDomain(project.title);
  const flavor = oldSiteFlavor[project.industry];

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

        <div className="mx-auto mt-12 aspect-[16/7] max-w-4xl overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
          {Scene ? <Scene /> : null}
        </div>
      </Section>

      {/* Before / after */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="The Transformation"
          title="From Struggling Site to a Working Website"
          description={`A side-by-side look at ${project.title}'s website before and after the redesign. This is an illustrated concept, not a screenshot of any real business's site.`}
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-2">
          <div>
            <BrowserMockup
              variant="old"
              label={domain}
              oldBannerText={flavor?.bannerText}
              oldNavItems={flavor?.navItems}
            />
            <p className="mt-3 text-center text-sm text-slate-500">Before</p>
          </div>
          <div>
            <BrowserMockup variant="new" label={domain} />
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
                The Challenge
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
          title="Exactly What Changed, and Why It Matters"
          description="A plain-language look at each area we worked on, before and after."
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

      <CTASection title="Ready for a website like this?" />
    </>
  );
}
