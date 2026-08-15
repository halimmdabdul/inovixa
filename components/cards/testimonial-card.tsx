import { Quote } from "lucide-react";
import type { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <Quote className="h-6 w-6 text-brand-teal" aria-hidden="true" />
      <blockquote className="mt-4 flex-1 text-base leading-relaxed text-slate-700">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 text-sm">
        <span className="font-semibold text-navy">{testimonial.name}</span>
        <span className="text-slate-500">
          {testimonial.role ? `, ${testimonial.role}` : ""} &mdash; {testimonial.company}
        </span>
      </figcaption>
    </figure>
  );
}
