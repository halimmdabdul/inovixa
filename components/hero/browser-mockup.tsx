import { Lock, MapPin, Phone, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OldSiteCopy {
  bannerText?: string;
  navItems?: string[];
  headline?: string;
  paragraphs?: string[];
  sidebarTitle?: string;
  sidebarText?: string;
}

export interface NewSiteCopy {
  brand?: string;
  navLinks?: string[];
  ctaText?: string;
  heroHeadline?: string;
  heroSubtext?: string;
  heroButtonText?: string;
  cards?: string[];
}

const defaultOldCopy: Required<OldSiteCopy> = {
  bannerText: "★ Family Owned Since 1998 ★",
  navItems: ["Home", "About", "Services", "Photos", "Contact"],
  headline: "Welcome To Our Business",
  paragraphs: [
    "We have proudly served customers in this area for many years.",
    "Please contact us today for more information or a free quote.",
  ],
  sidebarTitle: "About Us",
  sidebarText: "Family owned and operated.",
};

const defaultNewCopy: Required<NewSiteCopy> = {
  brand: "YourBusiness",
  navLinks: ["Services", "About"],
  ctaText: "Contact",
  heroHeadline: "Grow Your Business With a Website That Works",
  heroSubtext: "Fast, modern, and built to convert visitors into customers.",
  heroButtonText: "Get Started",
  cards: ["Service One", "Service Two", "Service Three"],
};

/**
 * A CSS/SVG-only browser window mockup rendered with real (if generic)
 * headline and body copy rather than abstract skeleton bars, so it reads as
 * an actual webpage layout. `variant="old"` renders a cramped, dated
 * mid-2000s small-business style; `variant="new"` renders a clean modern
 * layout — used together in the hero and Before/After sections since no
 * real client screenshots exist to show, and using a real business's actual
 * site without permission isn't something this project will do.
 */
export function BrowserMockup({
  variant = "new",
  label,
  oldCopy,
  newCopy,
  className,
}: {
  variant?: "old" | "new";
  label?: string;
  oldCopy?: OldSiteCopy;
  newCopy?: NewSiteCopy;
  className?: string;
}) {
  const isOld = variant === "old";
  const resolvedOld = { ...defaultOldCopy, ...oldCopy };
  const resolvedNew = { ...defaultNewCopy, ...newCopy };

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

      {isOld ? <OldSiteContent copy={resolvedOld} /> : <NewSiteContent copy={resolvedNew} />}
    </div>
  );
}

function OldSiteContent({ copy }: { copy: Required<OldSiteCopy> }) {
  return (
    <div className="space-y-2.5 bg-[#ECE9E2] p-3.5 font-serif">
      {/* Marquee-style banner */}
      <div className="flex items-center justify-between bg-[#C0392B] px-2.5 py-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wide text-yellow-300">
          {copy.bannerText}
        </span>
        <span className="hidden text-[10px] font-bold text-white sm:inline">Call Now!</span>
      </div>

      {/* Cluttered nav row */}
      <div className="flex flex-wrap gap-1">
        {copy.navItems.map((item) => (
          <span
            key={item}
            className="border border-slate-400 bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-blue-800 underline"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Headline */}
      <p className="text-[13px] font-bold leading-tight text-slate-800">{copy.headline}</p>

      {/* Body table-ish layout */}
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 space-y-1.5 border border-slate-400 bg-white p-2">
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-[9px] leading-snug text-slate-600">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="space-y-1 border border-slate-400 bg-slate-100 p-2">
          <p className="text-[9px] font-bold text-slate-700">{copy.sidebarTitle}</p>
          <p className="text-[8px] leading-snug text-slate-600">{copy.sidebarText}</p>
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

function NewSiteContent({ copy }: { copy: Required<NewSiteCopy> }) {
  return (
    <div className="bg-white">
      {/* Nav */}
      <div className="flex items-center justify-between px-4 pt-3.5">
        <span className="truncate text-[11px] font-bold text-navy">{copy.brand}</span>
        <div className="flex items-center gap-2.5">
          {copy.navLinks.map((link) => (
            <span key={link} className="hidden text-[9px] font-medium text-slate-500 sm:block">
              {link}
            </span>
          ))}
          <span className="rounded-md bg-brand-blue px-2.5 py-1 text-[9px] font-semibold text-white">
            {copy.ctaText}
          </span>
        </div>
      </div>

      {/* Hero photo block */}
      <div className="relative mx-4 mt-3.5 overflow-hidden rounded-xl bg-gradient-to-br from-brand-blue to-brand-teal p-3.5">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
        />
        <p className="relative text-[13px] font-bold leading-tight text-white">{copy.heroHeadline}</p>
        <p className="relative mt-1.5 text-[9px] leading-snug text-white/85">{copy.heroSubtext}</p>
        <span className="relative mt-2.5 inline-block rounded-md bg-white px-2.5 py-1 text-[9px] font-semibold text-navy">
          {copy.heroButtonText}
        </span>
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
        {copy.cards.map((card) => (
          <div key={card} className="rounded-lg border border-slate-100 bg-slate-50 p-2">
            <div className="h-5 w-5 rounded-md bg-blue-100" />
            <p className="mt-1.5 text-[8px] font-semibold leading-tight text-slate-700">{card}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
