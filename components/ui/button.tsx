"use client";

import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/app/actions/track-event";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary: "bg-brand-blue text-white hover:bg-brand-blue-dark",
  secondary:
    "bg-white text-navy border border-slate-200 hover:bg-slate-50",
  outlineLight:
    "border border-white/30 text-white hover:bg-white/10",
  teal: "bg-brand-teal text-white hover:bg-teal-600",
} as const;

const sizes = {
  md: "px-6 py-3.5 text-base",
  sm: "px-5 py-2.5 text-sm",
} as const;

type CommonProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  /**
   * When set, records a click event (visible at /admin/analytics) with this
   * label. Optional and opt-in — not every button needs to be tracked, just
   * the CTAs worth knowing the click-through rate of.
   */
  trackLabel?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: () => void;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "primary", size = "md", className, trackLabel } = props;
  const classes = cn(baseStyles, variants[variant], sizes[size], className);
  const pathname = usePathname();

  function track() {
    if (trackLabel) trackEvent({ eventType: "click", path: pathname, label: trackLabel });
  }

  if ("href" in props && props.href) {
    const { href, external, onClick } = props;
    const handleLinkClick = () => {
      track();
      onClick?.();
    };
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleLinkClick}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={handleLinkClick}>
        {children}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { href: _href, variant: _v, size: _s, className: _c, trackLabel: _t, onClick, ...buttonProps } =
    props as ButtonAsButton;

  function handleButtonClick(event: MouseEvent<HTMLButtonElement>) {
    track();
    onClick?.(event);
  }

  return (
    <button className={classes} onClick={handleButtonClick} {...buttonProps}>
      {children}
    </button>
  );
}
