import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client for the admin login form. Uses the public
 * anon key only — safe to expose to the client, since row-level security on
 * every table controls what an authenticated session can actually read.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
