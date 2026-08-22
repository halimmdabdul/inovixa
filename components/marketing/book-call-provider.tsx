"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { BookCallModal } from "@/components/marketing/book-call-modal";

const BookCallContext = createContext<(() => void) | null>(null);

/**
 * Hosts the single, always-mounted booking <dialog> and exposes a way to
 * open it from anywhere in the tree, so every "Book a Call" CTA opens the
 * same modal instead of each rendering its own.
 */
export function BookCallProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function open() {
    dialogRef.current?.showModal();
  }

  return (
    <BookCallContext.Provider value={open}>
      {children}
      <BookCallModal dialogRef={dialogRef} />
    </BookCallContext.Provider>
  );
}

export function useBookCall() {
  const open = useContext(BookCallContext);
  if (!open) throw new Error("useBookCall must be used within BookCallProvider");
  return open;
}
