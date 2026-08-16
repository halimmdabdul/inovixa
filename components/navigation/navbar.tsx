"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { primaryNav, siteConfig } from "@/lib/constants/site";
import { Logo } from "@/components/navigation/logo";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-200",
        scrolled
          ? "border-slate-200 bg-white/80 backdrop-blur-md"
          : "border-transparent bg-white",
      )}
    >
      <Container>
        <div className="flex h-20 items-center justify-between py-3">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-navy"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-4 md:flex">
            <a
              href={siteConfig.bookingCallUrl}
              target={siteConfig.isBookingCallExternal ? "_blank" : undefined}
              rel={siteConfig.isBookingCallExternal ? "noopener noreferrer" : undefined}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-navy"
            >
              Book a 15-Min Call
            </a>
            <Button href="/audit" size="sm">
              Free Website Audit
            </Button>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-navy hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </Container>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
