import "server-only";
import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import type { TeamMemberRow } from "@/types";

/**
 * Reads team members for the public "Meet the Team" section. Returns an
 * empty array whenever Supabase isn't configured or the table has no rows
 * yet — the section that renders this list stays hidden until an admin
 * adds someone real via /admin/team.
 */
async function fetchTeamMembers(): Promise<TeamMemberRow[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true })
    .returns<TeamMemberRow[]>();

  if (error) {
    console.info("[team] Couldn't read team_members:", error.message);
    return [];
  }

  return data ?? [];
}

export const getTeamMembers = unstable_cache(fetchTeamMembers, ["team-members"], {
  tags: ["team-members"],
});
