import { CalendarCheck, CheckCircle2, Mail } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/constants/site";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/forms/contact-form";
import { BookCallLink } from "@/components/marketing/book-call-link";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Tell us about your project. Get in touch with Inovixa Digital to discuss a new website, redesign, local SEO, or website care plan.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section className="py-16 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Tell Us About Your Project
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Share a few details about your business and what you&rsquo;re
            looking for. Your message goes directly to Halim, the founder and
            engineer who would work on your project.
          </p>
          <ul className="mt-7 space-y-3 text-sm text-slate-700">
            {[
              "No sales team or automated sales sequence",
              "No obligation to proceed after the first conversation",
              "Scope, deliverables, price, and payment schedule confirmed in writing",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-2.5 text-sm text-slate-600">
            <Mail className="h-4 w-4 text-brand-blue" aria-hidden="true" />
            <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-blue">
              {siteConfig.email}
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Prefer a full website review first? Try our{" "}
            <a href="/audit" className="font-medium text-brand-blue hover:underline">
              free website audit
            </a>{" "}
            instead.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-surface p-6">
            <h2 className="text-base font-semibold text-navy">Prefer to Talk?</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              Skip the form and book a free 15-minute call to talk through your
              website in real time.
            </p>
            <BookCallLink className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-base font-semibold text-navy transition-colors duration-150 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2">
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Book a Free 15-Minute Website Strategy Call
            </BookCallLink>
          </div>
        </div>

        <div id="contact-form">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
