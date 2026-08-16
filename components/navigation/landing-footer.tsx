import Link from "next/link";
import { Logo } from "@/components/navigation/logo";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/constants/site";

export function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white py-8 pb-24 sm:pb-8">
      <Container className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <Logo />
        <p className="text-sm text-slate-500">
          &copy; {year} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-5 text-sm text-slate-500">
          <Link href="/privacy" className="hover:text-navy">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-navy">
            Terms
          </Link>
        </div>
      </Container>
    </footer>
  );
}
