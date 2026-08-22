import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/constants/site";
import { Logo } from "@/components/navigation/logo";
import { Container } from "@/components/ui/container";

const columns = [
  { title: "Services", items: footerNav.services },
  { title: "Company", items: footerNav.company },
  { title: "Resources", items: footerNav.resources },
  { title: "Legal", items: footerNav.legal },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-navy pb-16 text-slate-300 sm:pb-0">
      <Container className="py-14 sm:py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2">
            <Logo inverted />
            <p className="mt-4 max-w-xs text-sm text-slate-400">{siteConfig.tagline}</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-3 inline-block text-sm text-slate-300 transition-colors hover:text-white"
            >
              {siteConfig.email}
            </a>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Founder-led in Japan. Working remotely with businesses worldwide.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-white">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Clear scope. Published starting prices. No invented results.</p>
        </div>
      </Container>
    </footer>
  );
}
