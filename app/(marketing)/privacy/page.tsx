import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/constants/site";
import { Section } from "@/components/ui/section";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects personal information.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Section className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-slate-500">Effective August 19, 2026</p>
        <p className="mt-6 text-base leading-relaxed text-slate-700">
          This policy explains what information Inovixa Digital collects through
          this website, why it is used, and the choices available to you.
        </p>

        <div className="prose-content mt-10 space-y-8 text-sm leading-relaxed text-slate-700">
          <section>
            <h2 className="text-lg font-semibold text-navy">Who is responsible for your information</h2>
            <p className="mt-2">
              Inovixa Digital is a founder-led digital services business based in Japan.
              For privacy questions or requests, email{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-brand-blue hover:underline">
                {siteConfig.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">Information we collect</h2>
            <p className="mt-2">
              When you submit a contact, website audit, or SEO report form, we
              collect the details you enter. Depending on the form, this can
              include your name, business name, email, phone number, website
              address, budget range, goals, and message.
            </p>
            <p className="mt-2">
              The site also records limited interaction data, such as pages
              viewed and buttons clicked. This first-party tracking does not
              store an IP address, user ID, or browser user-agent string. If
              Google Analytics is enabled, Google may also process device and
              usage information according to its own policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">How we use information</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Respond to inquiries and deliver requested audits or reports.</li>
              <li>Discuss, quote, and manage potential or active projects.</li>
              <li>Operate, secure, measure, and improve this website.</li>
              <li>Meet legal, accounting, or fraud-prevention obligations.</li>
            </ul>
            <p className="mt-2">
              We do not sell or rent personal information, and submitting a form
              does not subscribe you to a marketing mailing list.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">Service providers and transfers</h2>
            <p className="mt-2">
              Information may be processed by service providers used to run the
              site, including Supabase for database hosting, Resend for email
              delivery, the website hosting provider, and Google Analytics when
              enabled. These providers may process data outside your country.
              Information may also be disclosed when required by law or to
              protect the security and rights of Inovixa Digital or others.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">Retention and security</h2>
            <p className="mt-2">
              Inquiry and project information is kept only as long as reasonably
              needed to respond, maintain business records, resolve disputes, and
              meet legal obligations. Reasonable technical and organizational
              safeguards are used, but no online system can be guaranteed fully secure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">Your choices</h2>
            <p className="mt-2">
              You may ask to access, correct, or delete personal information held
              about you, or object to certain uses, subject to applicable law and
              record-keeping requirements. Send requests to{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-brand-blue hover:underline">
                {siteConfig.email}
              </a>
              . You can also limit optional analytics through your browser or device settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">Changes to this policy</h2>
            <p className="mt-2">
              This policy may be updated as the website or data practices change.
              The effective date above will be revised when material changes are published.
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}
