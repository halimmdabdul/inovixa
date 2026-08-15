import { Lock, MapPin, Phone, Star } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A CSS/SVG-only browser window mockup. `variant="old"` renders a cramped,
 * dated layout in the style of a mid-2000s small-business site; `variant="new"`
 * renders a clean modern layout — used together in the hero and Before/After
 * sections to visually sell the redesign without real screenshots, since no
 * real client work exists yet to show.
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
        isOld ? "border-slate-300 bg-[#ECE9E2] shadow-none" : "border-slate-200 bg-white shadow-lg",
        className,
      )}
    >
      {/* Browser chrome */}
      <div
        className={cn(
          "flex items-center gap-2.5 border-b px-3.5 py-2.5",
          isOld ? "border-slate-300 bg-slate-200" : "border-slate-200 bg-slate-50",
        )}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <div
          className={cn(
            "ml-2 flex flex-1 items-center gap-1.5 truncate rounded-md px-2.5 py-1 text-[11px] font-medium",
            isOld ? "bg-white/70 text-slate-500" : "bg-white text-slate-500",
          )}
        >
          {!isOld ? <Lock className="h-2.5 w-2.5 shrink-0 text-slate-400" aria-hidden="true" /> : null}
          <span className="truncate">{label}</span>
        </div>
      </div>

      {isOld ? <OldSiteContent /> : <NewSiteContent />}
    </div>
  );
}

function OldSiteContent() {
  return (
    <div className="space-y-2.5 bg-[#ECE9E2] p-3.5 font-serif">
      {/* Marquee-style banner */}
      <div className="flex items-center justify-between bg-[#C0392B] px-2.5 py-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wide text-yellow-300">
          ★ Family Owned Since 1998 ★
        </span>
        <span className="hidden text-[10px] font-bold text-white sm:inline">Call Now!</span>
      </div>

      {/* Cluttered nav row */}
      <div className="flex flex-wrap gap-1">
        {["Home", "About", "Services", "Photos", "Contact"].map((item) => (
          <span
            key={item}
            className="border border-slate-400 bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-blue-800 underline"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Title */}
      <div className="h-3 w-3/4 bg-slate-400/60" />

      {/* Body table-ish layout */}
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 space-y-1.5 border border-slate-400 bg-white p-2">
          <div className="h-1.5 w-full bg-slate-300" />
          <div className="h-1.5 w-11/12 bg-slate-300" />
          <div className="h-1.5 w-4/5 bg-slate-300" />
          <div className="h-1.5 w-full bg-slate-300" />
          <div className="h-1.5 w-3/5 bg-slate-300" />
        </div>
        <div className="space-y-1.5 border border-slate-400 bg-slate-100 p-2">
          <div className="h-8 w-full bg-slate-300" />
          <div className="h-1.5 w-full bg-slate-300" />
          <div className="h-1.5 w-4/5 bg-slate-300" />
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="border border-slate-500 bg-slate-300 px-2 py-0.5 text-[9px] font-bold text-slate-700">
          Submit
        </span>
        <span className="text-[8px] text-slate-500">Visitors: 004213</span>
      </div>
    </div>
  );
}

function NewSiteContent() {
  return (
    <div className="bg-white">
      {/* Nav */}
      <div className="flex items-center justify-between px-4 pt-3.5">
        <div className="h-2.5 w-16 rounded-full bg-navy/80" />
        <div className="flex items-center gap-2.5">
          <div className="hidden h-1.5 w-8 rounded-full bg-slate-200 sm:block" />
          <div className="hidden h-1.5 w-8 rounded-full bg-slate-200 sm:block" />
          <div className="h-6 w-16 rounded-md bg-brand-blue" />
        </div>
      </div>

      {/* Hero photo block */}
      <div className="relative mx-4 mt-3.5 h-24 overflow-hidden rounded-xl bg-gradient-to-br from-brand-blue to-brand-teal">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
        />
        <div className="absolute bottom-2.5 left-3 right-3">
          <div className="h-1.5 w-3/5 rounded-full bg-white/90" />
          <div className="mt-1.5 h-4 w-20 rounded-md bg-white" />
        </div>
      </div>

      {/* Trust row */}
      <div className="flex items-center gap-3 px-4 py-3 text-slate-400">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-2.5 w-2.5 fill-amber-400 text-amber-400" aria-hidden="true" />
          ))}
        </div>
        <div className="flex items-center gap-1">
          <Phone className="h-2.5 w-2.5" aria-hidden="true" />
          <div className="h-1.5 w-10 rounded-full bg-slate-200" />
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="h-2.5 w-2.5" aria-hidden="true" />
          <div className="h-1.5 w-10 rounded-full bg-slate-200" />
        </div>
      </div>

      {/* Content cards */}
      <div className="grid grid-cols-3 gap-2 px-4 pb-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-slate-100 bg-slate-50 p-2">
            <div className="h-5 w-5 rounded-md bg-blue-100" />
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-200" />
            <div className="mt-1 h-1.5 w-2/3 rounded-full bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

