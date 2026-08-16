import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Server-side Supabase client bound to the current request's auth cookies.
 * Use this in Server Components, Server Actions, and Route Handlers so
 * queries run as the signed-in admin and are subject to that user's RLS
 * policies — never use the service-role client (lib/supabase/admin.ts) here.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Called from a Server Component render, which can't set
            // cookies. Proxy.ts refreshes the session on every request, so
            // this is safe to ignore.
          }
        },
      },
    },
  );
}
