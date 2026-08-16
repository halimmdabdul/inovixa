import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { LeadSource, LeadStatus } from "@/types";

export type { LeadSource, LeadStatus };

/**
 * Shared shape for the `leads` table, covering both the audit and contact
 * funnels. Fields that only apply to one funnel are left undefined for the
 * other rather than using two separate tables, so the admin dashboard can
 * show one unified list.
 */
export interface Lead {
  name: string;
  businessName: string;
  email: string;
  phone?: string;
  websiteUrl?: string;
  industry?: string;
  websiteGoal?: string;
  websiteProblem?: string;
  serviceInterest?: string;
  budget?: string;
  message?: string;
  status: LeadStatus;
  source: LeadSource;
}

/**
 * Persists a lead to Supabase once it's configured. Until
 * NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY are set, this only
 * logs the attempt — forms still work end to end without Supabase, since
 * the audit/contact server actions also send an email notification
 * independently of this call. See supabase/schema.sql for the table
 * definition this insert expects.
 */
export async function storeLead(lead: Lead) {
  const supabase = createAdminClient();

  if (!supabase) {
    console.info("[leads] Supabase not configured, skipping storage for lead:", lead.email);
    return { stored: false as const };
  }

  const { error } = await supabase.from("leads").insert({
    name: lead.name,
    business_name: lead.businessName,
    email: lead.email,
    phone: lead.phone || null,
    website_url: lead.websiteUrl || null,
    industry: lead.industry || null,
    website_goal: lead.websiteGoal || null,
    website_problem: lead.websiteProblem || null,
    service_interest: lead.serviceInterest || null,
    budget: lead.budget || null,
    message: lead.message || null,
    status: lead.status,
    source: lead.source,
  });

  if (error) {
    console.error("[leads] Failed to store lead", error);
    return { stored: false as const };
  }

  return { stored: true as const };
}
