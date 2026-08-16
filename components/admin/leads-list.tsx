"use client";

import { useMemo, useState } from "react";
import { Mail, Phone, Search } from "lucide-react";
import type { LeadRow, LeadSource, LeadStatus } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const sourceLabel: Record<LeadSource, string> = {
  website_audit: "Website Audit",
  contact_form: "Contact Form",
};

const sourceFilters: { value: LeadSource | "all"; label: string }[] = [
  { value: "all", label: "All Sources" },
  { value: "website_audit", label: "Website Audit" },
  { value: "contact_form", label: "Contact Form" },
];

const statusFilters: { value: LeadStatus | "all"; label: string }[] = [
  { value: "all", label: "All Statuses" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "proposal_sent", label: "Proposal Sent" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
];

const statusTone: Record<LeadStatus, string> = {
  new: "bg-blue-50 text-brand-blue-dark",
  contacted: "bg-amber-50 text-amber-700",
  qualified: "bg-teal-50 text-teal-700",
  proposal_sent: "bg-purple-50 text-purple-700",
  won: "bg-green-50 text-green-700",
  lost: "bg-slate-100 text-slate-500",
};

export function LeadsList({ leads }: { leads: LeadRow[] }) {
  const [search, setSearch] = useState("");
  const [source, setSource] = useState<LeadSource | "all">("all");
  const [status, setStatus] = useState<LeadStatus | "all">("all");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return leads.filter((lead) => {
      if (source !== "all" && lead.source !== source) return false;
      if (status !== "all" && lead.status !== status) return false;
      if (query) {
        const haystack = `${lead.name} ${lead.business_name} ${lead.email}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [leads, search, source, status]);

  return (
    <div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, business, or email"
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {sourceFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setSource(filter.value)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                source === filter.value
                  ? "border-brand-blue bg-brand-blue text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as LeadStatus | "all")}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
        >
          {statusFilters.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-3 text-xs text-slate-400">
        Showing {filtered.length} of {leads.length} lead{leads.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
          {leads.length === 0
            ? "No leads yet. New audit and contact form submissions will show up here."
            : "No leads match your filters."}
        </div>
      ) : (
        <ul className="mt-4 space-y-4">
          {filtered.map((lead) => (
            <li key={lead.id} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="blue">{sourceLabel[lead.source]}</Badge>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize",
                    statusTone[lead.status],
                  )}
                >
                  {lead.status.replace("_", " ")}
                </span>
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
                {lead.website_url ? <span className="text-slate-500">{lead.website_url}</span> : null}
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
  );
}
