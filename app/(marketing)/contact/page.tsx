import { Mail } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/constants/site";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/forms/contact-form";

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
            looking for, and we&rsquo;ll follow up to discuss next steps.
          </p>
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
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}
