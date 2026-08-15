import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

export function Section({
  children,
  className,
  containerClassName,
  id,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  tone?: "default" | "surface" | "navy";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        tone === "surface" && "bg-surface",
        tone === "navy" && "bg-navy text-white",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
