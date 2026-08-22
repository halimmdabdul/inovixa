import "server-only";
import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import type { CaseStudy, CaseStudyRow } from "@/types";

function toCaseStudy(row: CaseStudyRow): CaseStudy {
  return {
    slug: row.slug,
    title: row.title,
    industry: row.industry,
    isConcept: row.is_concept,
    summary: row.summary,
    problem: row.problem,
    before: row.before,
    solution: row.solution,
    design: row.design,
    development: row.development,
    mobileImprovements: row.mobile_improvements,
    performanceImprovements: row.performance_improvements,
    seoSetup: row.seo_setup,
    leadStrategy: row.lead_strategy,
    improvements: row.improvements,
    metrics: row.metrics,
    coverImageUrl: row.cover_image_url,
  };
}

/**
 * Reads case studies for the public /work section. Returns an empty array
 * whenever Supabase isn't configured or the table hasn't been migrated yet
 * (see lib/team.ts for the same pattern).
 */
async function fetchCaseStudies(): Promise<CaseStudy[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<CaseStudyRow[]>();

  if (error) {
    console.info("[case-studies] Couldn't read case_studies:", error.message);
    return [];
  }

  return (data ?? []).map(toCaseStudy);
}

export const getCaseStudies = unstable_cache(fetchCaseStudies, ["case-studies"], {
  tags: ["case-studies"],
});

export async function getCaseStudyBySlug(slug: string) {
  const studies = await getCaseStudies();
  return studies.find((study) => study.slug === slug);
}
