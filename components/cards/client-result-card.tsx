import { Quote } from "lucide-react";
import type { ClientResult } from "@/types";

export function ClientResultCard({ result }: { result: ClientResult }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-blue">
        {result.industry}
      </span>

      <dl className="mt-5 space-y-3 text-sm">
        <div>
          <dt className="font-semibold text-navy">Before</dt>
          <dd className="mt-0.5 leading-relaxed text-slate-600">{result.before}</dd>
        </div>
        <div>
          <dt className="font-semibold text-navy">What We Changed</dt>
          <dd className="mt-0.5 leading-relaxed text-slate-600">{result.whatWeChanged}</dd>
        </div>
        <div>
          <dt className="font-semibold text-navy">Result</dt>
          <dd className="mt-0.5 leading-relaxed text-slate-600">{result.result}</dd>
        </div>
      </dl>

      <figure className="mt-5 border-t border-slate-100 pt-5">
        <Quote className="h-5 w-5 text-brand-teal" aria-hidden="true" />
        <blockquote className="mt-3 text-sm leading-relaxed text-slate-700">
          &ldquo;{result.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-3 text-sm">
          <span className="font-semibold text-navy">{result.clientName}</span>
          <span className="text-slate-500"> &mdash; {result.business}</span>
        </figcaption>
      </figure>
    </div>
  );
}
