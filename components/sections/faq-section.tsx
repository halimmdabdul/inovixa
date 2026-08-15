import { faqs } from "@/lib/data/faqs";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FAQAccordion } from "@/components/marketing/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { faqJsonLd } from "@/lib/seo/jsonld";

export function FAQSection() {
  return (
    <Section tone="surface" id="faq">
      <JsonLd data={faqJsonLd(faqs)} />
      <SectionHeading title="Frequently Asked Questions" />
      <div className="mx-auto mt-12 max-w-3xl">
        <FAQAccordion items={faqs} />
      </div>
    </Section>
  );
}
