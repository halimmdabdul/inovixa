import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export function IconBadge({
  icon: Icon,
  tone = "teal",
  size = "md",
}: {
  icon: LucideIcon;
  tone?: "teal" | "blue" | "red";
  size?: "sm" | "md";
}) {
  const toneClass =
    tone === "teal" ? "bg-brand-teal" : tone === "blue" ? "bg-brand-blue" : "bg-red-500";
  const sizeClass = size === "sm" ? "h-9 w-9" : "h-11 w-11";

  return (
    <div
      className={`absolute bottom-3 right-3 flex items-center justify-center rounded-full shadow-md ${toneClass} ${sizeClass}`}
    >
      <Icon className={size === "sm" ? "h-4 w-4 text-white" : "h-5 w-5 text-white"} aria-hidden="true" />
    </div>
  );
}

/**
 * Shared frame for original flat-vector illustrations used across the site
 * (case studies, services) in place of stock photography or plain icons.
 */
export function SceneFrame({
  gradientId,
  from,
  to,
  viewBox = "0 0 400 250",
  children,
}: {
  gradientId: string;
  from: string;
  to: string;
  viewBox?: string;
  children: ReactNode;
}) {
  const [, , width, height] = viewBox.split(" ");

  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2={width} y2={height} gradientUnits="userSpaceOnUse">
          <stop stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill={`url(#${gradientId})`} />
      {children}
    </svg>
  );
}
