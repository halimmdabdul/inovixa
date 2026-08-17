import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export function CTASection({
  title,
  description,
  primaryHref = "/audit",
  primaryLabel = "Get Your Free Website Audit",
  secondaryHref,
  secondaryLabel,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
}) {
  return (
    <Section tone="navy" className={cn("relative overflow-hidden", className)}>
      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
        {description ? (
          <p className="mt-4 text-lg leading-relaxed text-slate-300">{description}</p>
        ) : null}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={primaryHref} variant="teal" trackLabel={primaryLabel}>
            {primaryLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          {secondaryHref && secondaryLabel ? (
            <Button href={secondaryHref} variant="outlineLight" trackLabel={secondaryLabel}>
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
