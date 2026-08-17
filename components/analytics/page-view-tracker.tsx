"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/app/actions/track-event";

/**
 * Fires a page_view event on first render and on every client-side route
 * change. Renders nothing — mount this once per layout that should count
 * toward "which page do visitors view most" (marketing pages and the
 * get-started landing page, deliberately not /admin itself).
 */
export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent({ eventType: "page_view", path: pathname });
  }, [pathname]);

  return null;
}
