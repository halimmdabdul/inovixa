"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { primaryNav, siteConfig } from "@/lib/constants/site";
import { Button } from "@/components/ui/button";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 bg-navy/40"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-xs flex-col bg-white p-6 shadow-xl">
        <div className="mb-8 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-2 text-navy hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <nav className="flex flex-col gap-1">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="rounded-lg px-3 py-3 text-lg font-medium text-navy hover:bg-slate-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 space-y-3">
          <Button href="/audit" className="w-full" onClick={onClose}>
            Free Website Audit
          </Button>
          <a
            href={siteConfig.bookingCallUrl}
            target={siteConfig.isBookingCallExternal ? "_blank" : undefined}
            rel={siteConfig.isBookingCallExternal ? "noopener noreferrer" : undefined}
            onClick={onClose}
            className="block text-center text-sm font-medium text-slate-600 hover:text-navy"
          >
            Book a 15-Min Call
          </a>
        </div>
      </div>
    </div>
  );
}
