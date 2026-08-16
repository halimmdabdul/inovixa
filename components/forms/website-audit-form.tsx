"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  auditFormSchema,
  industryOptions,
  websiteGoalOptions,
  type AuditFormValues,
} from "@/lib/validation/audit";
import { submitAuditRequest } from "@/app/actions/audit";
import { currentTimestamp } from "@/lib/form-timestamp";
import { InputField, SelectField, TextareaField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";

type FormFields = Omit<AuditFormValues, "formRenderedAt">;

export function WebsiteAuditForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Captured once on first render for the submission-timing spam check — see
  // lib/validation/spam-check.ts. A lazy initializer runs exactly once, so
  // this doesn't reset on unrelated re-renders.
  const [renderedAt, setRenderedAt] = useState(() => currentTimestamp());

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormFields>({
    resolver: zodResolver(auditFormSchema.omit({ formRenderedAt: true })),
    defaultValues: {
      companyWebsite: "",
    },
  });

  async function onSubmit(values: FormFields) {
    setStatus("idle");
    const result = await submitAuditRequest({
      ...values,
      formRenderedAt: renderedAt,
    });
    setStatusMessage(result.message);
    setStatus(result.success ? "success" : "error");
    if (result.success) {
      reset({ companyWebsite: "" });
      setRenderedAt(currentTimestamp());
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-brand-teal" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-semibold text-navy">Request received</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">{statusMessage}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="companyWebsite">Leave this field blank</label>
        <input
          id="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("companyWebsite")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <InputField
          label="Website URL"
          id="websiteUrl"
          placeholder="yourbusiness.com or 'none'"
          error={errors.websiteUrl?.message}
          {...register("websiteUrl")}
        />
        <InputField
          label="Full name"
          id="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <InputField
          label="Business name"
          id="businessName"
          error={errors.businessName?.message}
          {...register("businessName")}
        />
        <InputField
          label="Business email"
          id="businessEmail"
          type="email"
          error={errors.businessEmail?.message}
          {...register("businessEmail")}
        />
        <InputField
          label="Phone number"
          id="phone"
          type="tel"
          optional
          error={errors.phone?.message}
          {...register("phone")}
        />
        <SelectField
          label="Business industry"
          id="industry"
          options={industryOptions}
          error={errors.industry?.message}
          {...register("industry")}
        />
      </div>

      <SelectField
        label="Main website goal"
        id="websiteGoal"
        options={websiteGoalOptions}
        error={errors.websiteGoal?.message}
        {...register("websiteGoal")}
      />

      <TextareaField
        label="Biggest website challenge"
        id="websiteProblem"
        placeholder="What's the main problem with your website today?"
        error={errors.websiteProblem?.message}
        {...register("websiteProblem")}
      />

      <TextareaField
        label="Message"
        id="message"
        optional
        placeholder="Anything else we should know?"
        error={errors.message?.message}
        {...register("message")}
      />

      <div className="flex items-start gap-3">
        <input
          id="consent"
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
          {...register("consent")}
        />
        <label htmlFor="consent" className="text-sm text-slate-600">
          I agree to be contacted by Inovixa Digital about my website audit.
        </label>
      </div>
      {errors.consent?.message ? (
        <p role="alert" className="-mt-3 text-sm text-red-600">
          {errors.consent.message}
        </p>
      ) : null}

      {status === "error" ? (
        <p role="alert" className="text-sm text-red-600">
          {statusMessage}
        </p>
      ) : null}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          "Get Your Free Website Audit"
        )}
      </Button>
    </form>
  );
}
