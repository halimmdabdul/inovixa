import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { createClient } from "@/lib/supabase/server";
import type { CaseStudyRow } from "@/types";
import { Logo } from "@/components/navigation/logo";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { CaseStudyManager } from "@/components/admin/case-study-manager";

export const metadata = buildMetadata({
  title: "Admin — Work",
  description: "Inovixa Digital admin case study management.",
  path: "/admin/work",
  noIndex: true,
});

export default async function AdminWorkPage() {
  const supabase = await createClient();
  const { data: caseStudies, error } = await supabase
    .from("case_studies")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<CaseStudyRow[]>();

  return (
    <main className="min-h-full flex-1 bg-background">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4 sm:px-8">
          <Logo />
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-slate-500 hover:text-navy">
              View site
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-navy"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to leads
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-navy">Work</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage the case studies shown on the public /work section.
        </p>

        {error ? (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            Couldn&rsquo;t load case studies: {error.message}. If you haven&rsquo;t run the schema
            setup yet, see <code className="rounded bg-red-100 px-1 py-0.5">supabase/schema.sql</code>.
          </div>
        ) : (
          <div className="mt-8">
            <CaseStudyManager caseStudies={caseStudies ?? []} />
          </div>
        )}
      </div>
    </main>
  );
}
