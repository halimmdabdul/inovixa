import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client that bypasses row-level security. This is
 * how public, unauthenticated form submissions (the audit and contact
 * forms) are allowed to insert into `leads` even though the table's RLS
 * policy only grants SELECT to authenticated admins — the insert path goes
 * through this trusted server-only client instead of a user session.
 *
 * Never import this outside server-only code, and never use it to serve
 * data back to a public request.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) return null;

  return createSupabaseClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
