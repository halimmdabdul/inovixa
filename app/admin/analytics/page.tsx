import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { createClient } from "@/lib/supabase/server";
import { currentTimestamp } from "@/lib/form-timestamp";
import { AnalyticsRankedList } from "@/components/admin/analytics-ranked-list";
import { Logo } from "@/components/navigation/logo";
import { SignOutButton } from "@/components/admin/sign-out-button";

export const metadata = buildMetadata({
  title: "Admin — Analytics",
  description: "Inovixa Digital admin analytics.",
  path: "/admin/analytics",
  noIndex: true,
});

const WINDOW_DAYS = 30;

function rankCounts(rows: { key: string }[], limit = 12) {
  const counts = new Map<string, number>();
  for (const row of rows) {
    counts.set(row.key, (counts.get(row.key) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export default async function AdminAnalyticsPage() {
  const supabase = await createClient();
  const since = new Date(currentTimestamp() - WINDOW_DAYS * 24 * 60 * 60 * 1000).toISOString();

  const { data: events, error } = await supabase
    .from("analytics_events")
    .select("event_type, path, label")
    .gte("created_at", since)
    .limit(20000);

  const pageViews = (events ?? []).filter((event) => event.event_type === "page_view");
  const clicks = (events ?? []).filter((event) => event.event_type === "click");

  const topPages = rankCounts(pageViews.map((event) => ({ key: event.path })));
  const topClicks = rankCounts(
    clicks.map((event) => ({ key: event.label || event.path })),
  );

  return (
    <main className="min-h-full flex-1 bg-background">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <Logo />
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-slate-500 hover:text-navy">
              View site
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-navy"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to leads
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-navy">Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">
          Last {WINDOW_DAYS} days &mdash; {pageViews.length} page view{pageViews.length === 1 ? "" : "s"},{" "}
          {clicks.length} tracked click{clicks.length === 1 ? "" : "s"}.
        </p>

        {error ? (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            Couldn&rsquo;t load analytics: {error.message}. If you haven&rsquo;t run the schema setup
            yet, see <code className="rounded bg-red-100 px-1 py-0.5">supabase/schema.sql</code>.
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <AnalyticsRankedList
              title="Most Visited Pages"
              emptyMessage="No page views recorded yet."
              items={topPages}
            />
            <AnalyticsRankedList
              title="Most Clicked Buttons"
              emptyMessage="No button clicks recorded yet."
              items={topClicks}
            />
          </div>
        )}
      </div>
    </main>
  );
}
