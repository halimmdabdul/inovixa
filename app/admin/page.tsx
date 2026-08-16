import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { createClient } from "@/lib/supabase/server";
import { Logo } from "@/components/navigation/logo";
import { Badge } from "@/components/ui/badge";
import { SignOutButton } from "@/components/admin/sign-out-button";

export const metadata = buildMetadata({
  title: "Admin — Leads",
  description: "Inovixa Digital admin dashboard.",
  path: "/admin",
  noIndex: true,
});

interface LeadRow {
  id: string;
  created_at: string;
  source: "website_audit" | "contact_form";
  status: string;
  name: string;
  business_name: string;
  email: string;
  phone: string | null;
  website_url: string | null;
  industry: string | null;
  website_goal: string | null;
  website_problem: string | null;
  service_interest: string | null;
  budget: string | null;
  message: string | null;
}

const sourceLabel: Record<LeadRow["source"], string> = {
  website_audit: "Website Audit",
  contact_form: "Contact Form",
};

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
        ) : !leads || leads.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
            No leads yet. New audit and contact form submissions will show up here.
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {leads.map((lead) => (
              <li key={lead.id} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="blue">{sourceLabel[lead.source]}</Badge>
                  <Badge tone="navy">{lead.status}</Badge>
                  <span className="ml-auto text-xs text-slate-400">
                    {new Date(lead.created_at).toLocaleString()}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-lg font-semibold text-navy">{lead.business_name}</h2>
                  <span className="text-sm text-slate-500">{lead.name}</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-slate-600">
                  <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 hover:text-navy">
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                    {lead.email}
                  </a>
                  {lead.phone ? (
                    <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 hover:text-navy">
                      <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                      {lead.phone}
                    </a>
                  ) : null}
                  {lead.website_url ? (
                    <span className="text-slate-500">{lead.website_url}</span>
                  ) : null}
                </div>

                <dl className="mt-4 grid gap-3 border-t border-slate-100 pt-4 text-sm sm:grid-cols-2">
                  {lead.industry ? (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Industry
                      </dt>
                      <dd className="mt-0.5 text-slate-700">{lead.industry}</dd>
                    </div>
                  ) : null}
                  {lead.website_goal ? (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Main Goal
                      </dt>
                      <dd className="mt-0.5 text-slate-700">{lead.website_goal}</dd>
                    </div>
                  ) : null}
                  {lead.website_problem ? (
                    <div className="sm:col-span-2">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Biggest Challenge
                      </dt>
                      <dd className="mt-0.5 text-slate-700">{lead.website_problem}</dd>
                    </div>
                  ) : null}
                  {lead.service_interest ? (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Service Interested In
                      </dt>
                      <dd className="mt-0.5 text-slate-700">{lead.service_interest}</dd>
                    </div>
                  ) : null}
                  {lead.budget ? (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Budget
                      </dt>
                      <dd className="mt-0.5 text-slate-700">{lead.budget}</dd>
                    </div>
                  ) : null}
                  {lead.message ? (
                    <div className="sm:col-span-2">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Message
                      </dt>
                      <dd className="mt-0.5 text-slate-700">{lead.message}</dd>
                    </div>
                  ) : null}
                </dl>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
