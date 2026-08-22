import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/constants/site";
import { Section } from "@/components/ui/section";

export const metadata = buildMetadata({
  title: "Website Terms",
  description: `Terms for using the ${siteConfig.name} website.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Section className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          Website Terms
        </h1>
        <p className="mt-3 text-sm text-slate-500">Effective August 19, 2026</p>
        <p className="mt-6 text-base leading-relaxed text-slate-700">
          These terms apply to your use of this website. Client projects are
          governed by a separate written proposal or services agreement.
        </p>

        <div className="prose-content mt-10 space-y-8 text-sm leading-relaxed text-slate-700">
          <section>
            <h2 className="text-lg font-semibold text-navy">Using this website</h2>
            <p className="mt-2">
              You may use this site for lawful purposes and to learn about or
              inquire into Inovixa Digital services. Do not interfere with the
              site, attempt unauthorized access, submit malicious material, or
              use its content in a misleading or infringing way.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">Quotes, pricing, and projects</h2>
            <p className="mt-2">
              Published package prices are starting points in US dollars unless
              stated otherwise. Final scope, deliverables, timing, revision limits,
              third-party costs, payment schedule, cancellation terms, and ownership
              are confirmed in writing before project work begins. A form submission,
              audit, or introductory call does not create a client relationship.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">Portfolio transparency</h2>
            <p className="mt-2">
              Projects marked &ldquo;Concept Project&rdquo; use fictional businesses and
              illustrative scenarios. They are demonstrations of design thinking,
              not completed client engagements, testimonials, or claims of measured results.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">No guaranteed outcomes</h2>
            <p className="mt-2">
              Website audits, SEO checks, articles, and recommendations are general
              information based on the material available at the time. Search rankings,
              traffic, leads, sales, security, accessibility compliance, and other
              business outcomes are not guaranteed.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">Intellectual property</h2>
            <p className="mt-2">
              Unless stated otherwise, the site&rsquo;s branding, copy, code, illustrations,
              and other original materials belong to Inovixa Digital. You may not
              reproduce or commercially reuse them without written permission.
              Ownership of client deliverables is handled in the applicable project agreement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">Third-party services</h2>
            <p className="mt-2">
              This site may link to or rely on third-party services. Inovixa Digital
              does not control their availability, content, or privacy practices.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">Availability and liability</h2>
            <p className="mt-2">
              The site is provided on an &ldquo;as available&rdquo; basis. To the extent allowed
              by law, Inovixa Digital is not liable for indirect or consequential loss
              arising solely from use of, or inability to use, this public website.
              Nothing in these terms excludes liability that cannot legally be excluded.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-navy">Contact</h2>
            <p className="mt-2">
              Questions about these terms can be sent to{" "}
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
