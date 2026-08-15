"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  budgetOptions,
  contactFormSchema,
  serviceInterestOptions,
  type ContactFormValues,
} from "@/lib/validation/contact";
import { submitContactRequest } from "@/app/contact/actions";
import { currentTimestamp } from "@/lib/form-timestamp";
import { InputField, SelectField, TextareaField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";

type FormFields = Omit<ContactFormValues, "formRenderedAt">;

export function ContactForm() {
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
    resolver: zodResolver(contactFormSchema.omit({ formRenderedAt: true })),
    defaultValues: {
      companyWebsite: "",
    },
  });

  async function onSubmit(values: FormFields) {
    setStatus("idle");
    const result = await submitContactRequest({
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
        <h3 className="mt-4 text-xl font-semibold text-navy">Message sent</h3>
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
        <label htmlFor="contactCompanyWebsite">Leave this field blank</label>
        <input
          id="contactCompanyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("companyWebsite")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <InputField
          label="Name"
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
          label="Email"
          id="email"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <InputField
          label="Phone"
          id="phone"
          type="tel"
          optional
          error={errors.phone?.message}
          {...register("phone")}
        />
        <InputField
          label="Website URL"
          id="websiteUrl"
          optional
          error={errors.websiteUrl?.message}
          {...register("websiteUrl")}
        />
        <SelectField
          label="Service interested in"
          id="serviceInterest"
          options={serviceInterestOptions}
          error={errors.serviceInterest?.message}
          {...register("serviceInterest")}
        />
      </div>

      <SelectField
        label="Estimated budget"
        id="budget"
        options={budgetOptions}
        error={errors.budget?.message}
        {...register("budget")}
      />

      <TextareaField
        label="Project details"
        id="projectDetails"
        placeholder="Tell us about your business and what you're looking for."
        rows={5}
        error={errors.projectDetails?.message}
        {...register("projectDetails")}
      />

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
          "Send Message"
        )}
      </Button>
    </form>
  );
}
