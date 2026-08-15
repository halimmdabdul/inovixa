import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/constants/site";
import { Section } from "@/components/ui/section";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}.`,
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <Section className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          This is a general starter template, not legal advice. Review it with
          a qualified professional and update it to reflect {siteConfig.name}
          &rsquo;s actual data practices before launch.
        </p>

        <div className="prose-content mt-8 space-y-6 text-sm leading-relaxed text-slate-700">
          <section>
            <h2 className="text-lg font-semibold text-navy">Information We Collect</h2>
            <p className="mt-2">
              When you submit a form on this website, such as a website audit
              request or contact form, we collect the information you
              provide, which may include your name, business name, email
              address, phone number, and website URL.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-navy">How We Use Information</h2>
            <p className="mt-2">
              We use the information you provide to respond to your inquiry,
              deliver the services you request, and communicate with you
              about your project.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-navy">Analytics</h2>
            <p className="mt-2">
              We may use tools such as Google Analytics to understand how
              visitors use this website. These tools may use cookies to
              collect anonymized usage data.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-navy">Data Sharing</h2>
            <p className="mt-2">
              We do not sell your personal information. We may share
              information with service providers, such as email or hosting
              providers, solely to operate this website and deliver our
              services.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-navy">Contact</h2>
            <p className="mt-2">
              For questions about this policy, contact us at{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-brand-blue hover:underline">
                {siteConfig.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}
