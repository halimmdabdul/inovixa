import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { createClient } from "@/lib/supabase/server";
import type { LeadRow } from "@/types";
import { Logo } from "@/components/navigation/logo";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { LeadsList } from "@/components/admin/leads-list";

export const metadata = buildMetadata({
  title: "Admin — Leads",
  description: "Inovixa Digital admin dashboard.",
  path: "/admin",
  noIndex: true,
});

export default async function AdminLeadsPage() {
  const supabase = await createClient();
  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<LeadRow[]>();

  return (
    <main className="min-h-full flex-1 bg-background">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <Logo />
          <div className="flex items-center gap-3">
            <Link href="/admin/team" className="text-sm text-slate-500 hover:text-navy">
              Team
            </Link>
            <Link href="/admin/services" className="text-sm text-slate-500 hover:text-navy">
              Services
            </Link>
            <Link href="/admin/blog" className="text-sm text-slate-500 hover:text-navy">
              Blog
            </Link>
            <Link href="/admin/analytics" className="text-sm text-slate-500 hover:text-navy">
              Analytics
            </Link>
            <Link href="/admin/settings" className="text-sm text-slate-500 hover:text-navy">
              SEO Settings
            </Link>
            <Link href="/" className="text-sm text-slate-500 hover:text-navy">
              View site
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <h1 className="text-2xl font-bold text-navy">Leads</h1>
        <p className="mt-1 text-sm text-slate-500">
          {leads?.length ?? 0} lead{leads?.length === 1 ? "" : "s"} from the website audit and
          contact forms.
        </p>

        {error ? (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            Couldn&rsquo;t load leads: {error.message}. If you haven&rsquo;t run the schema setup
            yet, see <code className="rounded bg-red-100 px-1 py-0.5">supabase/schema.sql</code>.
          </div>
        ) : (
          <LeadsList leads={leads ?? []} />
        )}
      </div>
    </main>
  );
}
