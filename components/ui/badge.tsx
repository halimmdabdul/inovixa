import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "blue",
  className,
}: {
  children: ReactNode;
  tone?: "blue" | "teal" | "navy";
  className?: string;
}) {
  const tones = {
    blue: "bg-blue-50 text-brand-blue-dark",
    teal: "bg-teal-50 text-teal-700",
    navy: "bg-navy text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
