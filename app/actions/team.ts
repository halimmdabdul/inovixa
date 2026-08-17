"use server";

import { updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { teamMemberSchema } from "@/lib/validation/team-member";

export interface TeamActionResult {
  success: boolean;
  message: string;
}

/**
 * Both actions run as the signed-in admin's own session — RLS grants
 * authenticated users full access to team_members (see supabase/schema.sql)
 * — so neither uses the service-role client. Only reachable from
 * /admin/team, which proxy.ts already requires a signed-in session for.
 */
export async function addTeamMember(values: unknown): Promise<TeamActionResult> {
  const parsed = teamMemberSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  const data = parsed.data;
  const supabase = await createClient();

  const { error } = await supabase.from("team_members").insert({
    name: data.name,
    role: data.role,
    email: data.email || null,
    bio: data.bio || null,
    photo_url: data.photoUrl || null,
  });

  if (error) {
    return { success: false, message: `Couldn't add team member: ${error.message}` };
  }

  updateTag("team-members");
  return { success: true, message: "Team member added." };
}

export async function removeTeamMember(id: string): Promise<TeamActionResult> {
  if (!id) return { success: false, message: "Missing team member id." };

  const supabase = await createClient();
  const { error } = await supabase.from("team_members").delete().eq("id", id);

  if (error) {
    return { success: false, message: `Couldn't remove team member: ${error.message}` };
  }

  updateTag("team-members");
  return { success: true, message: "Team member removed." };
}
