import { CheckCircle2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { Section } from "@/components/ui/section";
import { WebsiteAuditForm } from "@/components/forms/website-audit-form";

export const metadata = buildMetadata({
  title: "Free Website Audit",
  description:
    "Get a practical review of your website's design, mobile experience, performance, SEO foundations, and conversion opportunities. No obligation.",
  path: "/audit",
});

const included = [
  "Design and first-impression review",
  "Mobile usability check",
  "Page speed review",
  "SEO foundation review",
  "Lead-generation and conversion opportunities",
];

export default function AuditPage() {
  return (
    <Section className="py-16 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Find Out What&rsquo;s Holding Your Website Back
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Get a practical review of your website&rsquo;s design, mobile
            experience, performance, SEO foundations, and conversion
            opportunities.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            No obligation. Get practical recommendations for improving your website.
          </p>

          <ul className="mt-8 space-y-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <WebsiteAuditForm />
      </div>
    </Section>
  );
}
