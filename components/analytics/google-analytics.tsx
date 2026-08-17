import Script from "next/script";
import { getSiteSettings } from "@/lib/settings";

/**
 * Renders nothing when no GA ID is set (in /admin/settings or
 * NEXT_PUBLIC_GA_ID), so the site works fully without analytics configured.
 */
export async function GoogleAnalytics() {
  const { gaId } = await getSiteSettings();

  if (!gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
