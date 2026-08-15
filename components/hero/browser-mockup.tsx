import { cn } from "@/lib/utils";

/**
 * A CSS-only browser window mockup. `variant="old"` renders a cramped, dated
 * layout; `variant="new"` renders a clean modern layout — used together in
 * the hero and Before/After sections to visually sell the redesign without
 * requiring real screenshots.
 */
export function BrowserMockup({
  variant = "new",
  label,
  className,
}: {
  variant?: "old" | "new";
  label?: string;
  className?: string;
}) {
  const isOld = variant === "old";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border shadow-sm",
        isOld ? "border-slate-300 bg-slate-100" : "border-slate-200 bg-white shadow-lg",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-1.5 border-b px-4 py-3",
          isOld ? "border-slate-300 bg-slate-200" : "border-slate-200 bg-slate-50",
        )}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
        {label ? (
          <span className="ml-3 truncate text-xs font-medium text-slate-500">{label}</span>
        ) : null}
      </div>

      <div className={cn("p-4 sm:p-5", isOld ? "space-y-3" : "space-y-4")}>
        {isOld ? (
          <>
            <div className="h-4 w-2/3 rounded bg-slate-400/70" />
            <div className="h-16 rounded bg-slate-300" />
            <div className="space-y-1.5">
              <div className="h-2.5 w-full rounded bg-slate-300" />
              <div className="h-2.5 w-5/6 rounded bg-slate-300" />
              <div className="h-2.5 w-4/6 rounded bg-slate-300" />
            </div>
            <div className="flex gap-2">
              <div className="h-7 w-20 rounded bg-slate-400" />
              <div className="h-7 w-20 rounded bg-slate-300" />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="h-3 w-24 rounded-full bg-navy/80" />
              <div className="h-8 w-24 rounded-lg bg-brand-blue" />
            </div>
            <div className="h-24 rounded-xl bg-gradient-to-br from-blue-50 to-teal-50" />
            <div className="space-y-2">
              <div className="h-3 w-5/6 rounded-full bg-slate-200" />
              <div className="h-3 w-3/5 rounded-full bg-slate-200" />
            </div>
            <div className="flex gap-2">
              <div className="h-9 w-28 rounded-lg bg-brand-blue" />
              <div className="h-9 w-28 rounded-lg border border-slate-200" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
