import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { createClient } from "@/lib/supabase/server";
import type { TeamMemberRow } from "@/types";
import { Logo } from "@/components/navigation/logo";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { TeamManager } from "@/components/admin/team-manager";

export const metadata = buildMetadata({
  title: "Admin — Team",
  description: "Inovixa Digital admin team management.",
  path: "/admin/team",
  noIndex: true,
});

export default async function AdminTeamPage() {
  const supabase = await createClient();
  const { data: members, error } = await supabase
    .from("team_members")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true })
    .returns<TeamMemberRow[]>();

  return (
    <main className="min-h-full flex-1 bg-background">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4 sm:px-8">
          <Logo />
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-slate-500 hover:text-navy">
              View site
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-navy"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to leads
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-navy">Team</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage who shows up in the &ldquo;Meet the Team&rdquo; section on the site.
        </p>

        {error ? (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            Couldn&rsquo;t load team members: {error.message}. If you haven&rsquo;t run the schema
            setup yet, see <code className="rounded bg-red-100 px-1 py-0.5">supabase/schema.sql</code>.
          </div>
        ) : (
          <div className="mt-8">
            <TeamManager members={members ?? []} />
          </div>
        )}
      </div>
    </main>
  );
}
