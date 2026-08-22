"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import type { CaseStudyRow } from "@/types";
import { createCaseStudy, deleteCaseStudy, updateCaseStudy } from "@/app/actions/case-studies";
import { InputField, TextareaField } from "@/components/ui/form-field";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ImprovementDraft {
  area: string;
  before: string;
  after: string;
}

interface MetricDraft {
  label: string;
  value: string;
}

interface FormState {
  slug: string;
  title: string;
  industry: string;
  isConcept: boolean;
  summary: string;
  problem: string;
  before: string;
  solution: string;
  design: string;
  development: string;
  mobileImprovements: string;
  performanceImprovements: string;
  seoSetup: string;
  leadStrategy: string;
  improvements: ImprovementDraft[];
  metrics: MetricDraft[];
  coverImageUrl: string;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const emptyForm: FormState = {
  slug: "",
  title: "",
  industry: "",
  isConcept: true,
  summary: "",
  problem: "",
  before: "",
  solution: "",
  design: "",
  development: "",
  mobileImprovements: "",
  performanceImprovements: "",
  seoSetup: "",
  leadStrategy: "",
  improvements: [{ area: "", before: "", after: "" }],
  metrics: [],
  coverImageUrl: "",
};

function toFormState(study: CaseStudyRow): FormState {
  return {
    slug: study.slug,
    title: study.title,
    industry: study.industry,
    isConcept: study.is_concept,
    summary: study.summary,
    problem: study.problem,
    before: study.before,
    solution: study.solution,
    design: study.design,
    development: study.development,
    mobileImprovements: study.mobile_improvements,
    performanceImprovements: study.performance_improvements,
    seoSetup: study.seo_setup,
    leadStrategy: study.lead_strategy,
    improvements:
      study.improvements.length > 0 ? study.improvements.map((item) => ({ ...item })) : [{ area: "", before: "", after: "" }],
    metrics: study.metrics.map((item) => ({ ...item })),
    coverImageUrl: study.cover_image_url ?? "",
  };
}

export function CaseStudyManager({ caseStudies }: { caseStudies: CaseStudyRow[] }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);

  function startEdit(study: CaseStudyRow) {
    setEditingId(study.id);
    setSlugTouched(true);
    setStatus(null);
    setForm(toFormState(study));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setSlugTouched(false);
    setStatus(null);
    setForm(emptyForm);
  }

  function onTitleChange(title: string) {
    setForm((current) => ({
      ...current,
      title,
      slug: slugTouched ? current.slug : slugify(title),
    }));
  }

  function updateImprovement(index: number, field: keyof ImprovementDraft, value: string) {
    setForm((current) => ({
      ...current,
      improvements: current.improvements.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }));
  }

  function addImprovement() {
    setForm((current) => ({
      ...current,
      improvements: [...current.improvements, { area: "", before: "", after: "" }],
    }));
  }

  function removeImprovement(index: number) {
    setForm((current) => ({
      ...current,
      improvements: current.improvements.filter((_, i) => i !== index),
    }));
  }

  function updateMetric(index: number, field: keyof MetricDraft, value: string) {
    setForm((current) => ({
      ...current,
      metrics: current.metrics.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }));
  }

  function addMetric() {
    setForm((current) => ({ ...current, metrics: [...current.metrics, { label: "", value: "" }] }));
  }

  function removeMetric(index: number) {
    setForm((current) => ({ ...current, metrics: current.metrics.filter((_, i) => i !== index) }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setStatus(null);

    const result = editingId ? await updateCaseStudy(editingId, form) : await createCaseStudy(form);

    setStatus({ ok: result.success, message: result.message });
    setSaving(false);

    if (result.success) {
      cancelEdit();
      router.refresh();
    }
  }

  async function onDelete(id: string) {
    setDeletingId(id);
    const result = await deleteCaseStudy(id);
    setDeletingId(null);
    if (result.success) {
      if (editingId === id) cancelEdit();
      router.refresh();
    }
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={onSubmit}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-navy">
            {editingId ? "Edit Case Study" : "New Case Study"}
          </h2>
          {editingId ? (
            <button
              type="button"
              onClick={cancelEdit}
              className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-navy"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              Cancel
            </button>
          ) : null}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="Title"
            id="csTitle"
            value={form.title}
            onChange={(event) => onTitleChange(event.target.value)}
            required
          />
          <InputField
            label="Industry"
            id="csIndustry"
            placeholder="e.g. Roofing, Dental, Real Estate"
            value={form.industry}
            onChange={(event) => setForm((current) => ({ ...current, industry: event.target.value }))}
            required
          />
        </div>

        <div>
          <InputField
            label="URL slug"
            id="csSlug"
            value={form.slug}
            onChange={(event) => {
              setSlugTouched(true);
              setForm((current) => ({ ...current, slug: event.target.value }));
            }}
            required
          />
          <p className="mt-1.5 text-xs text-slate-500">
            inovixadigital.com/work/{form.slug || "your-project-slug"}
            {editingId ? " — changing this changes the project's URL." : ""}
          </p>
        </div>

        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={form.isConcept}
            onChange={(event) => setForm((current) => ({ ...current, isConcept: event.target.checked }))}
            className="h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
          />
          Concept project (fictional business, not a real client)
        </label>

        <ImageUploadField
          label="Cover image"
          id="csCoverImage"
          folder="work"
          value={form.coverImageUrl}
          onChange={(url) => setForm((current) => ({ ...current, coverImageUrl: url }))}
        />

        <TextareaField
          label="Summary"
          id="csSummary"
          rows={2}
          value={form.summary}
          onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))}
          required
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <TextareaField
            label="Problem"
            id="csProblem"
            rows={3}
            value={form.problem}
            onChange={(event) => setForm((current) => ({ ...current, problem: event.target.value }))}
            required
          />
          <TextareaField
            label="Before"
            id="csBefore"
            rows={3}
            value={form.before}
            onChange={(event) => setForm((current) => ({ ...current, before: event.target.value }))}
            required
          />
        </div>

        <TextareaField
          label="Solution"
          id="csSolution"
          rows={3}
          value={form.solution}
          onChange={(event) => setForm((current) => ({ ...current, solution: event.target.value }))}
          required
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <TextareaField
            label="Design approach"
            id="csDesign"
            rows={3}
            value={form.design}
            onChange={(event) => setForm((current) => ({ ...current, design: event.target.value }))}
            required
          />
          <TextareaField
            label="Development approach"
            id="csDevelopment"
            rows={3}
            value={form.development}
            onChange={(event) => setForm((current) => ({ ...current, development: event.target.value }))}
            required
          />
          <TextareaField
            label="Mobile improvements"
            id="csMobile"
            rows={3}
            value={form.mobileImprovements}
            onChange={(event) => setForm((current) => ({ ...current, mobileImprovements: event.target.value }))}
            required
          />
          <TextareaField
            label="Performance improvements"
            id="csPerformance"
            rows={3}
            value={form.performanceImprovements}
            onChange={(event) => setForm((current) => ({ ...current, performanceImprovements: event.target.value }))}
            required
          />
          <TextareaField
            label="SEO setup"
            id="csSeo"
            rows={3}
            value={form.seoSetup}
            onChange={(event) => setForm((current) => ({ ...current, seoSetup: event.target.value }))}
            required
          />
          <TextareaField
            label="Lead-generation strategy"
            id="csLeadStrategy"
            rows={3}
            value={form.leadStrategy}
            onChange={(event) => setForm((current) => ({ ...current, leadStrategy: event.target.value }))}
            required
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">What We Improved</p>
            <button
              type="button"
              onClick={addImprovement}
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-blue hover:underline"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              Add row
            </button>
          </div>
          <div className="mt-3 space-y-4">
            {form.improvements.map((item, index) => (
              <div key={index} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-3">
                    <InputField
                      label="Area"
                      id={`csImp-area-${index}`}
                      value={item.area}
                      onChange={(event) => updateImprovement(index, "area", event.target.value)}
                      required
                    />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <TextareaField
                        label="Before"
                        id={`csImp-before-${index}`}
                        rows={2}
                        value={item.before}
                        onChange={(event) => updateImprovement(index, "before", event.target.value)}
                        required
                      />
                      <TextareaField
                        label="After"
                        id={`csImp-after-${index}`}
                        rows={2}
                        value={item.after}
                        onChange={(event) => updateImprovement(index, "after", event.target.value)}
                        required
                      />
                    </div>
                  </div>
                  {form.improvements.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => removeImprovement(index)}
                      aria-label="Remove row"
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

        <div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Results (optional)</p>
              <p className="text-xs text-slate-500">
                Only add real, measured results. Never invent a number.
              </p>
            </div>
            <button
              type="button"
              onClick={addMetric}
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-blue hover:underline"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              Add result
            </button>
          </div>
          {form.metrics.length > 0 ? (
            <div className="mt-3 space-y-3">
              {form.metrics.map((metric, index) => (
                <div key={index} className="flex items-end gap-3 rounded-xl border border-slate-200 p-4">
                  <div className="flex-1">
                    <InputField
                      label="Label"
                      id={`csMetric-label-${index}`}
                      placeholder="e.g. Contact form submissions"
                      value={metric.label}
                      onChange={(event) => updateMetric(index, "label", event.target.value)}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <InputField
                      label="Value"
                      id={`csMetric-value-${index}`}
                      placeholder="e.g. +40%"
                      value={metric.value}
                      onChange={(event) => updateMetric(index, "value", event.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMetric(index)}
                    aria-label="Remove result"
                    className="mb-1 shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          ) : null}
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
              {editingId ? "Saving..." : "Publishing..."}
            </>
          ) : (
            <>
              {editingId ? <Pencil className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
              {editingId ? "Save Changes" : "Publish Case Study"}
            </>
          )}
        </Button>
      </form>

      <div>
        <h2 className="text-base font-semibold text-navy">Case Studies ({caseStudies.length})</h2>
        {caseStudies.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">
            No case studies yet — /work is empty until you publish one.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {caseStudies.map((study) => (
              <li
                key={study.id}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5"
              >
                {study.cover_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={study.cover_image_url}
                    alt=""
                    className="h-14 w-14 shrink-0 rounded-lg border border-slate-200 object-cover"
                  />
                ) : null}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="blue">{study.industry}</Badge>
                    {study.is_concept ? <Badge tone="navy">Concept</Badge> : null}
                  </div>
                  <p className="mt-1.5 truncate font-semibold text-navy">{study.title}</p>
                  <p className="truncate text-sm text-slate-500">/work/{study.slug}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Button type="button" variant="secondary" size="sm" onClick={() => startEdit(study)}>
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={deletingId === study.id}
                    onClick={() => onDelete(study.id)}
                  >
                    {deletingId === study.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    )}
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
