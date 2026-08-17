import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { getSiteSettings } from "@/lib/settings";
import { Logo } from "@/components/navigation/logo";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { SettingsForm } from "@/components/admin/settings-form";

export const metadata = buildMetadata({
  title: "Admin — SEO Settings",
  description: "Inovixa Digital admin SEO settings.",
  path: "/admin/settings",
  noIndex: true,
});

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

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

        <h1 className="mt-4 text-2xl font-bold text-navy">SEO Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Changes here take effect immediately — no code changes or redeploy needed.
        </p>

        <div className="mt-8">
          <SettingsForm settings={settings} />
        </div>
      </div>
    </main>
  );
}
