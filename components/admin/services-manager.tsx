"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import type { ServiceRow } from "@/types";
import { updateService } from "@/app/actions/services";
import { InputField, TextareaField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";

interface FaqDraft {
  question: string;
  answer: string;
}

interface FormState {
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  ctaLabel: string;
  featuresText: string;
  idealForText: string;
  faqs: FaqDraft[];
}

function toFormState(service: ServiceRow): FormState {
  return {
    name: service.name,
    shortName: service.short_name,
    description: service.description,
    longDescription: service.long_description,
    ctaLabel: service.cta_label,
    featuresText: service.features.join("\n"),
    idealForText: service.ideal_for.join("\n"),
    faqs: service.faqs.length > 0 ? service.faqs.map((faq) => ({ ...faq })) : [{ question: "", answer: "" }],
  };
}

function linesToList(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function ServiceEditor({ service, onCancel, onSaved }: { service: ServiceRow; onCancel: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<FormState>(() => toFormState(service));
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);

  function updateFaq(index: number, field: keyof FaqDraft, value: string) {
    setForm((current) => ({
      ...current,
      faqs: current.faqs.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq)),
    }));
  }

  function addFaq() {
    setForm((current) => ({ ...current, faqs: [...current.faqs, { question: "", answer: "" }] }));
  }

  function removeFaq(index: number) {
    setForm((current) => ({ ...current, faqs: current.faqs.filter((_, i) => i !== index) }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setStatus(null);

    const result = await updateService(service.id, {
      name: form.name,
      shortName: form.shortName,
      description: form.description,
      longDescription: form.longDescription,
      ctaLabel: form.ctaLabel,
      features: linesToList(form.featuresText),
      idealFor: linesToList(form.idealForText),
      faqs: form.faqs,
    });

    setStatus({ ok: result.success, message: result.message });
    setSaving(false);
    if (result.success) onSaved();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-2xl border border-brand-blue/30 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-navy">Editing: {service.name}</h3>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-navy"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
          Cancel
        </button>
      </div>

      <p className="text-xs text-slate-500">
        URL: /services/{service.slug} — the slug can&rsquo;t be changed here since it&rsquo;s tied to
        this page&rsquo;s route in the codebase.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <InputField
          label="Name"
          id={`svc-name-${service.id}`}
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          required
        />
        <InputField
          label="Short name"
          id={`svc-shortname-${service.id}`}
          value={form.shortName}
          onChange={(event) => setForm((current) => ({ ...current, shortName: event.target.value }))}
          required
        />
      </div>

      <TextareaField
        label="Short description (used on cards)"
        id={`svc-description-${service.id}`}
        rows={2}
        value={form.description}
        onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
        required
      />

      <TextareaField
        label="Long description (used on the service page)"
        id={`svc-longdescription-${service.id}`}
        rows={4}
        value={form.longDescription}
        onChange={(event) => setForm((current) => ({ ...current, longDescription: event.target.value }))}
        required
      />

      <InputField
        label="Call-to-action label"
        id={`svc-cta-${service.id}`}
        value={form.ctaLabel}
        onChange={(event) => setForm((current) => ({ ...current, ctaLabel: event.target.value }))}
        required
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <TextareaField
            label="Features"
            id={`svc-features-${service.id}`}
            rows={6}
            value={form.featuresText}
            onChange={(event) => setForm((current) => ({ ...current, featuresText: event.target.value }))}
            required
          />
          <p className="mt-1.5 text-xs text-slate-500">One feature per line.</p>
        </div>
        <div>
          <TextareaField
            label="Ideal for"
            id={`svc-idealfor-${service.id}`}
            rows={6}
            value={form.idealForText}
            onChange={(event) => setForm((current) => ({ ...current, idealForText: event.target.value }))}
            required
          />
          <p className="mt-1.5 text-xs text-slate-500">One point per line.</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">FAQs</p>
          <button
            type="button"
            onClick={addFaq}
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-blue hover:underline"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            Add FAQ
          </button>
        </div>
        <div className="mt-3 space-y-4">
          {form.faqs.map((faq, index) => (
            <div key={index} className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-3">
                  <InputField
                    label="Question"
                    id={`svc-faq-q-${service.id}-${index}`}
                    value={faq.question}
                    onChange={(event) => updateFaq(index, "question", event.target.value)}
                    required
                  />
                  <TextareaField
                    label="Answer"
                    id={`svc-faq-a-${service.id}-${index}`}
                    rows={2}
                    value={faq.answer}
                    onChange={(event) => updateFaq(index, "answer", event.target.value)}
                    required
                  />
                </div>
                {form.faqs.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    aria-label="Remove FAQ"
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {status ? (
        <p role="alert" className={`text-sm ${status.ok ? "text-brand-teal" : "text-red-600"}`}>
          {status.message}
        </p>
      ) : null}

      <Button type="submit" disabled={saving}>
        {saving ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </form>
  );
}

export function ServicesManager({ services }: { services: ServiceRow[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);

  function onSaved() {
    setEditingId(null);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {services.map((service) =>
        editingId === service.id ? (
          <ServiceEditor
            key={service.id}
            service={service}
            onCancel={() => setEditingId(null)}
            onSaved={onSaved}
          />
        ) : (
          <div
            key={service.id}
            className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="min-w-0">
              <p className="font-semibold text-navy">{service.name}</p>
              <p className="truncate text-sm text-slate-500">/services/{service.slug}</p>
            </div>
            <Button type="button" variant="secondary" size="sm" onClick={() => setEditingId(service.id)}>
              <Pencil className="h-4 w-4" aria-hidden="true" />
              Edit
            </Button>
          </div>
        ),
      )}
    </div>
  );
}
