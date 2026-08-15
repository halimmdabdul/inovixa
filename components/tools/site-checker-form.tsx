"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ScanSearch } from "lucide-react";
import {
  industryOptions,
  siteCheckerSchema,
  type SiteCheckerValues,
} from "@/lib/validation/site-checker";
import { runSiteCheckup, type SiteCheckupResult } from "@/app/actions/site-checker";
import { currentTimestamp } from "@/lib/form-timestamp";
import { InputField, SelectField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { SiteCheckerResults } from "@/components/tools/site-checker-results";

type FormFields = Omit<SiteCheckerValues, "formRenderedAt">;

export function SiteCheckerForm() {
  const [result, setResult] = useState<SiteCheckupResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedIndustry, setSubmittedIndustry] = useState("");
  const [submittedLocation, setSubmittedLocation] = useState("");

  // Captured once on first render for the submission-timing spam check — see
  // lib/validation/spam-check.ts. A lazy initializer runs exactly once, so
  // this doesn't reset on unrelated re-renders.
  const [renderedAt] = useState(() => currentTimestamp());

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormFields>({
    resolver: zodResolver(siteCheckerSchema.omit({ formRenderedAt: true })),
    defaultValues: { companyWebsite: "" },
  });

  async function onSubmit(values: FormFields) {
    setErrorMessage("");
    const response = await runSiteCheckup({ ...values, formRenderedAt: renderedAt });
    if (!response.success) {
      setErrorMessage(response.message ?? "Something went wrong. Please try again.");
      return;
    }
    setSubmittedIndustry(values.industry);
    setSubmittedLocation(values.location);
    setResult(response);
  }

  if (result?.success && result.seo) {
    return (
      <SiteCheckerResults
        seo={result.seo}
        nearbyBusinesses={result.nearbyBusinesses ?? []}
        nearbyAvailable={result.nearbyAvailable ?? false}
        industry={submittedIndustry}
        location={submittedLocation}
        onReset={() => {
          setResult(null);
          reset({ companyWebsite: "" });
        }}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="checkerCompanyWebsite">Leave this field blank</label>
        <input
          id="checkerCompanyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("companyWebsite")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <InputField
            label="Website URL"
            id="checkerWebsiteUrl"
            placeholder="https://yourbusiness.com"
            error={errors.websiteUrl?.message}
            {...register("websiteUrl")}
          />
        </div>
        <SelectField
          label="Industry"
          id="checkerIndustry"
          options={industryOptions}
          error={errors.industry?.message}
          {...register("industry")}
        />
        <InputField
          label="City or ZIP code"
          id="checkerLocation"
          placeholder="e.g. Austin, TX"
          error={errors.location?.message}
          {...register("location")}
        />
      </div>

      {errorMessage ? (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {errorMessage}
        </p>
      ) : null}

      <Button type="submit" disabled={isSubmitting} className="mt-6 w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Scanning your website...
          </>
        ) : (
          <>
            <ScanSearch className="h-4 w-4" aria-hidden="true" />
            Run My Free Website Checkup
          </>
        )}
      </Button>
      <p className="mt-3 text-center text-xs text-slate-400">
        Free, instant, and automated. No account needed.
      </p>
    </form>
  );
}
