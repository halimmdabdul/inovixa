"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Loader2, Mail } from "lucide-react";
import type { SeoCheckResult } from "@/types";
import {
  siteCheckerReportSchema,
  type SiteCheckerReportValues,
} from "@/lib/validation/site-checker-report";
import { unlockFullReport } from "@/app/actions/site-checker-report";
import { currentTimestamp } from "@/lib/form-timestamp";
import { scoreTone } from "@/lib/seo/score-tone";
import { InputField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categoryLabels: { key: keyof SeoCheckResult["categories"]; label: string }[] = [
  { key: "seo", label: "SEO" },
  { key: "speed", label: "Speed" },
  { key: "mobile", label: "Mobile" },
];

type FormFields = Omit<SiteCheckerReportValues, "formRenderedAt">;

export function SiteCheckerTeaser({
  seo,
  onUnlocked,
}: {
  seo: SeoCheckResult;
  onUnlocked: () => void;
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [renderedAt] = useState(() => currentTimestamp());

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(siteCheckerReportSchema.omit({ formRenderedAt: true })),
    defaultValues: { email: "", websiteUrl: seo.finalUrl },
  });

  async function onSubmit(values: FormFields) {
    setErrorMessage("");
    const response = await unlockFullReport({ ...values, formRenderedAt: renderedAt });
    if (!response.success) {
      setErrorMessage(response.message ?? "Something went wrong. Please try again.");
      return;
    }
    onUnlocked();
  }

  const overall = scoreTone(seo.score);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Overall Score
        </p>
        <p className={cn("mt-1 text-5xl font-bold", overall.color)}>{seo.score}</p>
        <p className={cn("text-sm font-semibold", overall.color)}>{overall.label}</p>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3">
        {categoryLabels.map(({ key, label }) => {
          const tone = scoreTone(seo.categories[key]);
          return (
            <div
              key={key}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {label}
              </p>
              <p className={cn("mt-1 text-2xl font-bold", tone.color)}>{seo.categories[key]}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
        <div className="flex items-start gap-3">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-navy">
              Want the full report?
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Unlock the full checklist — every issue we found and why it matters — free.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-4">
          <div className="hidden" aria-hidden="true">
            <label htmlFor="checkerReportCompanyWebsite">Leave this field blank</label>
            <input
              id="checkerReportCompanyWebsite"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("companyWebsite")}
            />
          </div>
          <input type="hidden" {...register("websiteUrl")} />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <div className="flex-1">
              <InputField
                label="Email"
                id="checkerReportEmail"
                type="email"
                placeholder="you@business.com"
                error={errors.email?.message}
                className="bg-white"
                {...register("email")}
              />
            </div>
            <Button type="submit" disabled={isSubmitting} className="sm:mt-[1.65rem]">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Unlocking...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Send Full Report
                </>
              )}
            </Button>
          </div>
          {errorMessage ? (
            <p role="alert" className="mt-3 text-sm text-red-600">
              {errorMessage}
            </p>
          ) : null}
          <p className="mt-3 text-xs text-slate-400">
            No spam. Just your free report and, if you&rsquo;d like, a follow-up from a real person.
          </p>
        </form>
      </div>
    </div>
  );
}
