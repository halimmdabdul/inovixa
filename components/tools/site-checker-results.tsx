import { AlertTriangle, CalendarCheck, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import type { SeoCheckResult } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { scoreTone } from "@/lib/seo/score-tone";

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

export function SiteCheckerResults({
  seo,
  onReset,
}: {
  seo: SeoCheckResult;
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

      <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center sm:p-8">
        <p className="text-base font-semibold text-navy">
          Want us to explain how to fix these issues?
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" trackLabel="SEO Checker: Book a Free 15-Minute Website Strategy Call">
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Book a Free 15-Minute Website Strategy Call
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
