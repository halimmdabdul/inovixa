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
  // Newer Supabase projects call this the "Secret key" (SUPABASE_SECRET_KEY);
  // older projects still label it "service_role". Either works here.
  const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !secretKey) return null;

  return createSupabaseClient(url, secretKey, {
    auth: { persistSession: false },
  });
}
