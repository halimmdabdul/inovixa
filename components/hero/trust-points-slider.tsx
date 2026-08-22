"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const trustPoints = [
  "Work directly with the founder",
  "Written scope and price before work starts",
  "Website packages from $999",
  "No fabricated results or ranking promises",
  "Free website audit before you commit to anything",
  "Care plans keep your site fast and secure after launch",
];

const ROTATE_MS = 2500;

function subscribeToMotionPreference(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getMotionPreference() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerMotionPreference() {
  return false;
}

/**
 * Rotates one trust point at a time instead of a static grid. The rotating
 * view is aria-hidden and paired with a permanent sr-only list so screen
 * reader users get the full, stable set once instead of a live region that
 * would otherwise re-announce every 2.5 seconds indefinitely. Reduced-motion
 * users get the original static grid back instead of any rotation at all.
 */
export function TrustPointsSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    getServerMotionPreference,
  );

  useEffect(() => {
    if (reducedMotion || paused) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % trustPoints.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [reducedMotion, paused]);

  return (
    <div className="mt-7">
      <ul className="sr-only">
        {trustPoints.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {reducedMotion ? (
        <ul aria-hidden="true" className="grid gap-2.5 text-sm text-slate-700 sm:grid-cols-2">
          {trustPoints.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <div
          aria-hidden="true"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="flex min-h-6 items-start gap-2 text-sm text-slate-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" aria-hidden="true" />
            <span key={index} className="animate-fade-in-up">
              {trustPoints[index]}
            </span>
          </div>
          <div className="mt-3 flex gap-1.5">
            {trustPoints.map((item, dotIndex) => (
              <span
                key={item}
                className={cn(
                  "h-1 w-4 rounded-full transition-colors duration-300",
                  dotIndex === index ? "bg-brand-teal" : "bg-slate-200",
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
