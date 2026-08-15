import Link from "next/link";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/navigation/logo-mark";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 rounded-sm"
      aria-label="Inovixa Digital home"
    >
      <LogoMark size={34} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-xl font-extrabold tracking-tight sm:text-2xl",
            inverted ? "text-white" : "text-navy",
          )}
        >
          INOVIXA
        </span>
        <span
          className={cn(
            "text-[0.65rem] font-semibold tracking-[0.3em]",
            inverted ? "text-brand-teal" : "text-brand-blue",
          )}
        >
          DIGITAL
        </span>
      </span>
    </Link>
  );
}
