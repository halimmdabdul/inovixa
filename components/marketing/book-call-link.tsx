"use client";

import type { ReactNode } from "react";
import { useBookCall } from "@/components/marketing/book-call-provider";

export function BookCallLink({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const openBookCall = useBookCall();

  function handleClick() {
    openBookCall();
    onClick?.();
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
