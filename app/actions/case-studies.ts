"use server";

import { updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { caseStudySchema } from "@/lib/validation/case-study";

export interface CaseStudyActionResult {
  success: boolean;
  message: string;
}

/**
 * All three actions run as the signed-in admin's own session — RLS grants
 * authenticated users full access to case_studies (see supabase/schema.sql)
 * — so none of them use the service-role client. Only reachable from
 * /admin/work, which proxy.ts already requires a signed-in session for.
 */
export async function createCaseStudy(values: unknown): Promise<CaseStudyActionResult> {
  const parsed = caseStudySchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  const data = parsed.data;
  const supabase = await createClient();

  const { error } = await supabase.from("case_studies").insert({
    slug: data.slug,
    title: data.title,
    industry: data.industry,
    is_concept: data.isConcept,
    summary: data.summary,
    problem: data.problem,
    before: data.before,
    solution: data.solution,
    design: data.design,
    development: data.development,
    mobile_improvements: data.mobileImprovements,
    performance_improvements: data.performanceImprovements,
    seo_setup: data.seoSetup,
    lead_strategy: data.leadStrategy,
    improvements: data.improvements,
    metrics: data.metrics,
    cover_image_url: data.coverImageUrl || null,
  });

  if (error) {
    if (error.code === "23505") return { success: false, message: "That slug is already in use." };
    return { success: false, message: `Couldn't publish case study: ${error.message}` };
  }

  updateTag("case-studies");
  return { success: true, message: "Case study published." };
}

export async function updateCaseStudy(id: string, values: unknown): Promise<CaseStudyActionResult> {
  if (!id) return { success: false, message: "Missing case study id." };

  const parsed = caseStudySchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  const data = parsed.data;
  const supabase = await createClient();

  const { error } = await supabase
    .from("case_studies")
    .update({
      slug: data.slug,
      title: data.title,
      industry: data.industry,
      is_concept: data.isConcept,
      summary: data.summary,
      problem: data.problem,
      before: data.before,
      solution: data.solution,
      design: data.design,
      development: data.development,
      mobile_improvements: data.mobileImprovements,
      performance_improvements: data.performanceImprovements,
      seo_setup: data.seoSetup,
      lead_strategy: data.leadStrategy,
      improvements: data.improvements,
      metrics: data.metrics,
      cover_image_url: data.coverImageUrl || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") return { success: false, message: "That slug is already in use." };
    return { success: false, message: `Couldn't update case study: ${error.message}` };
  }

  updateTag("case-studies");
  return { success: true, message: "Case study updated." };
}

export async function deleteCaseStudy(id: string): Promise<CaseStudyActionResult> {
  if (!id) return { success: false, message: "Missing case study id." };

  const supabase = await createClient();
  const { error } = await supabase.from("case_studies").delete().eq("id", id);

  if (error) {
    return { success: false, message: `Couldn't delete case study: ${error.message}` };
  }

  updateTag("case-studies");
  return { success: true, message: "Case study deleted." };
}
