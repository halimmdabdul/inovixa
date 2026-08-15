import { AlertTriangle, ArrowRight, CheckCircle2, MapPin, RotateCcw, Star, XCircle } from "lucide-react";
import type { NearbyBusiness, SeoCheckResult } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const statusIcon = {
  pass: CheckCircle2,
  warn: AlertTriangle,
  fail: XCircle,
} as const;

const statusColor = {
  pass: "text-brand-teal",
  warn: "text-amber-500",
  fail: "text-red-500",
} as const;

function scoreTone(score: number) {
  if (score >= 80) return { label: "Good", color: "text-brand-teal" };
  if (score >= 50) return { label: "Needs Work", color: "text-amber-500" };
  return { label: "Poor", color: "text-red-500" };
}

export function SiteCheckerResults({
  seo,
  nearbyBusinesses,
  nearbyAvailable,
  industry,
  location,
  onReset,
}: {
  seo: SeoCheckResult;
  nearbyBusinesses: NearbyBusiness[];
  nearbyAvailable: boolean;
  industry: string;
  location: string;
  onReset: () => void;
}) {
  const tone = scoreTone(seo.score);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col items-center gap-4 border-b border-slate-100 pb-6 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Technical SEO Score
            </p>
            <p className="mt-1 truncate text-sm text-slate-500">{seo.finalUrl}</p>
          </div>
          <div className="ml-auto flex items-baseline gap-2">
            <span className={cn("text-5xl font-bold", tone.color)}>{seo.score}</span>
            <span className="text-lg text-slate-400">/100</span>
            <span className={cn("ml-1 text-sm font-semibold", tone.color)}>{tone.label}</span>
          </div>
        </div>

        <ul className="mt-6 space-y-3">
          {seo.checks.map((check) => {
            const Icon = statusIcon[check.status];
            return (
              <li key={check.id} className="flex items-start gap-3">
                <Icon
                  className={cn("mt-0.5 h-4 w-4 shrink-0", statusColor[check.status])}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-medium text-navy">{check.label}</p>
                  <p className="text-sm text-slate-600">{check.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-xs text-slate-400">
          This is an automated technical scan of your homepage. It doesn&rsquo;t measure search
          rankings, backlinks, or real-world Core Web Vitals — a free website audit covers those in
          more depth.
        </p>
      </div>

      {nearbyAvailable && nearbyBusinesses.length > 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-brand-blue" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Other {industry} Businesses Near {location}
            </p>
          </div>
          <ul className="mt-5 space-y-4">
            {nearbyBusinesses.map((business) => (
              <li
                key={`${business.name}-${business.address}`}
                className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-semibold text-navy">{business.name}</p>
                  <p className="text-sm text-slate-500">{business.address}</p>
                </div>
                {business.rating ? (
                  <div className="flex shrink-0 items-center gap-1 text-sm text-slate-600">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                    {business.rating}
                    {business.reviewCount ? (
                      <span className="text-slate-400">({business.reviewCount})</span>
                    ) : null}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-400">Local business data provided by Google.</p>
        </div>
      ) : null}

      <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center sm:p-8">
        <p className="text-sm text-slate-600">
          Want a full professional review, not just an automated scan?
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/audit">
            Get Your Free Website Audit
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button variant="secondary" onClick={onReset} type="button">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Check Another Website
          </Button>
        </div>
      </div>
    </div>
  );
}
