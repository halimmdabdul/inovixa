import { testimonials } from "@/lib/data/testimonials";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { TestimonialCard } from "@/components/cards/testimonial-card";

export function TestimonialsSection() {
  if (testimonials.length === 0) return null;

  return (
    <Section>
      <SectionHeading eyebrow="Testimonials" title="What Clients Say" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.name} testimonial={testimonial} />
        ))}
      </div>
    </Section>
  );
}
