import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { StickyMobileCta } from "@/components/marketing/sticky-mobile-cta";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageViewTracker />
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
