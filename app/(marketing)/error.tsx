"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section className="flex min-h-[60vh] items-center justify-center py-20 text-center">
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          Something Went Wrong
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          An unexpected error occurred. Please try again.
        </p>
        <div className="mt-8">
          <Button onClick={reset}>Try Again</Button>
        </div>
      </div>
    </Section>
  );
}
