import { CalendarCheck, Mail } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/constants/site";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/forms/contact-form";
import { Button } from "@/components/ui/button";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Tell us about your project. Get in touch with Inovixa Digital to discuss a new website, redesign, local SEO, or website care plan.",
  path: "/contact",
});

export default function ContactPage() {
  // On this page specifically, falling back to "/contact" would be a
  // self-link to the page the visitor is already on — send them to the form
  // below instead until a real scheduler URL is configured.
  const talkCallHref = siteConfig.isBookingCallExternal ? siteConfig.bookingCallUrl : "#contact-form";

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

          <div className="mt-8 rounded-2xl border border-slate-200 bg-surface p-6">
            <h2 className="text-base font-semibold text-navy">Prefer to Talk?</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              Skip the form and book a free 15-minute call to talk through your
              website in real time.
            </p>
            <Button
              href={talkCallHref}
              external={siteConfig.isBookingCallExternal}
              variant="secondary"
              className="mt-4"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Book a Free 15-Minute Website Strategy Call
            </Button>
          </div>
        </div>

        <div id="contact-form">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
