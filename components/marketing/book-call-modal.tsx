"use client";

import { useEffect, useState, type MouseEvent, type RefObject } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Clock, Loader2, X } from "lucide-react";
import { getAvailableCallSlots, submitCallBooking } from "@/app/actions/book-call";
import { bookCallSchema, type BookCallValues } from "@/lib/validation/book-call";
import { currentTimestamp } from "@/lib/form-timestamp";
import { InputField, TextareaField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";

const BOOKING_WINDOW_DAYS = 21;

function isoDateNDaysFromToday(n: number) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + n);
  return date.toISOString().slice(0, 10);
}

type Step = "pick-time" | "details" | "success";
type DetailFields = Omit<BookCallValues, "slot" | "formRenderedAt">;

export function BookCallModal({ dialogRef }: { dialogRef: RefObject<HTMLDialogElement | null> }) {
  const [step, setStep] = useState<Step>("pick-time");
  const [date, setDate] = useState(() => isoDateNDaysFromToday(0));
  const [slots, setSlots] = useState<string[]>([]);
  // The date slots were last loaded for — comparing this to `date` (instead
  // of a separate boolean) avoids a synchronous setState at the top of the
  // effect below, which react-hooks/set-state-in-effect flags.
  const [slotsLoadedForDate, setSlotsLoadedForDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [renderedAt, setRenderedAt] = useState(() => currentTimestamp());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DetailFields>({
    resolver: zodResolver(bookCallSchema.omit({ slot: true, formRenderedAt: true })),
    defaultValues: { companyWebsite: "" },
  });

  useEffect(() => {
    let cancelled = false;
    getAvailableCallSlots(date).then((result) => {
      if (!cancelled) {
        setSlots(result);
        setSlotsLoadedForDate(date);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [date]);

  const loadingSlots = slotsLoadedForDate !== date;

  function resetForNextOpen() {
    setStep("pick-time");
    setSelectedSlot(null);
    setSubmitError("");
    setSuccessMessage("");
    setDate(isoDateNDaysFromToday(0));
    reset({ companyWebsite: "" });
    setRenderedAt(currentTimestamp());
  }

  function close() {
    dialogRef.current?.close();
  }

  /** Native <dialog> closes on Escape automatically, but not on a backdrop
   * click — this detects a click landing on the dialog element itself
   * (rather than bubbling up from its content box) to add that behavior. */
  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) close();
  }

  async function onSubmitDetails(values: DetailFields) {
    if (!selectedSlot) return;
    setSubmitError("");

    const result = await submitCallBooking({
      ...values,
      slot: selectedSlot,
      formRenderedAt: renderedAt,
    });

    if (result.success) {
      setSuccessMessage(result.message);
      setStep("success");
    } else {
      setSubmitError(result.message);
      getAvailableCallSlots(date).then(setSlots);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={resetForNextOpen}
      onClick={handleBackdropClick}
      aria-labelledby="book-call-heading"
      className="fixed m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-slate-200 bg-white p-0 shadow-2xl [&::backdrop]:bg-navy/40"
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <h2 id="book-call-heading" className="text-lg font-semibold text-navy">
          Book a Free 15-Minute Call
        </h2>
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
        {step === "success" ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-brand-teal" aria-hidden="true" />
            <h3 className="mt-4 text-lg font-semibold text-navy">Call booked</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{successMessage}</p>
            <Button type="button" variant="secondary" className="mt-6" onClick={close}>
              Close
            </Button>
          </div>
        ) : step === "pick-time" ? (
          <div>
            <label htmlFor="book-call-date" className="mb-1.5 block text-sm font-medium text-foreground">
              Choose a date
            </label>
            <input
              id="book-call-date"
              type="date"
              value={date}
              min={isoDateNDaysFromToday(0)}
              max={isoDateNDaysFromToday(BOOKING_WINDOW_DAYS)}
              onChange={(event) => setDate(event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            />

            <p className="mb-1 mt-5 text-sm font-medium text-foreground">Choose a time</p>
            <p className="mb-3 text-xs text-slate-500">Shown in your local time zone.</p>

            {loadingSlots ? (
              <div className="flex items-center justify-center py-8 text-slate-400">
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              </div>
            ) : slots.length === 0 ? (
              <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                No times available this day. Try another date.
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      setSelectedSlot(slot);
                      setStep("details");
                    }}
                    className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-navy transition-colors hover:border-brand-blue hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                  >
                    {new Date(slot).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmitDetails)} noValidate className="space-y-4">
            <button
              type="button"
              onClick={() => setStep("pick-time")}
              className="text-sm font-medium text-brand-blue hover:underline"
            >
              &larr; Change time
            </button>

            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-3 text-sm text-navy">
              <Clock className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
              {selectedSlot
                ? new Date(selectedSlot).toLocaleString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })
                : null}
            </div>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="bookCallCompanyWebsite">Leave this field blank</label>
              <input
                id="bookCallCompanyWebsite"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("companyWebsite")}
              />
            </div>

            <InputField label="Name" id="bookCallName" error={errors.name?.message} {...register("name")} />
            <InputField
              label="Email"
              id="bookCallEmail"
              type="email"
              error={errors.email?.message}
              {...register("email")}
            />
            <InputField
              label="Phone"
              id="bookCallPhone"
              type="tel"
              optional
              error={errors.phone?.message}
              {...register("phone")}
            />
            <InputField
              label="Business name"
              id="bookCallBusinessName"
              optional
              error={errors.businessName?.message}
              {...register("businessName")}
            />
            <TextareaField
              label="What would you like to talk about?"
              id="bookCallMessage"
              optional
              rows={3}
              error={errors.message?.message}
              {...register("message")}
            />

            {submitError ? (
              <p role="alert" className="text-sm text-red-600">
                {submitError}
              </p>
            ) : null}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Booking...
                </>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </form>
        )}
      </div>
    </dialog>
  );
}
