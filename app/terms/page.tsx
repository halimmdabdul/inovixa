import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/constants/site";
import { Section } from "@/components/ui/section";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: `Terms of service for ${siteConfig.name}.`,
  path: "/terms",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <Section className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          This is a general starter template, not legal advice. Review it with
          a qualified professional and update it to reflect {siteConfig.name}
          &rsquo;s actual terms before launch.
        </p>

        <div className="prose-content mt-8 space-y-6 text-sm leading-relaxed text-slate-700">
          <section>
            <h2 className="text-lg font-semibold text-navy">Use of This Website</h2>
            <p className="mt-2">
              By using this website, you agree to use it only for lawful
              purposes and in a way that does not infringe the rights of, or
              restrict or inhibit the use of, this website by anyone else.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-navy">Services</h2>
            <p className="mt-2">
              Any project work, including website design, development, SEO,
              or maintenance, is subject to a separate written agreement
              between {siteConfig.name} and the client outlining scope,
              pricing, and timelines.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-navy">Intellectual Property</h2>
            <p className="mt-2">
              Unless otherwise agreed in writing, content and materials on
              this website remain the property of {siteConfig.name}.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-navy">Limitation of Liability</h2>
            <p className="mt-2">
              This website and its content are provided &ldquo;as is&rdquo;
              without warranties of any kind, to the extent permitted by law.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-navy">Contact</h2>
            <p className="mt-2">
              For questions about these terms, contact us at{" "}
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
