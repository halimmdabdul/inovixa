import "server-only";

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal_sent"
  | "won"
  | "lost";

export type LeadSource = "website_audit" | "contact_form";

export interface WebsiteAuditLead {
  name: string;
  businessName: string;
  businessEmail: string;
  phone?: string;
  websiteUrl: string;
  industry: string;
  websiteGoal: string;
  websiteProblem: string;
  message?: string;
  status: LeadStatus;
  source: LeadSource;
}

/**
 * Persists a lead once Supabase is connected. This table shape mirrors the
 * planned `website_audits` schema. Until NEXT_PUBLIC_SUPABASE_URL and
 * SUPABASE_SERVICE_ROLE_KEY are set, leads are only logged and delivered by
 * email (see lib/email.ts) — forms still work end to end without Supabase.
 */
export async function storeLead(lead: WebsiteAuditLead) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.info("[leads] Supabase not configured, skipping storage for lead:", lead.businessEmail);
    return { stored: false as const };
  }

  // Once the @supabase/supabase-js package is added, insert into `website_audits` here:
  // const supabase = createClient(supabaseUrl, serviceRoleKey);
  // await supabase.from("website_audits").insert(lead);

  return { stored: false as const };
}
