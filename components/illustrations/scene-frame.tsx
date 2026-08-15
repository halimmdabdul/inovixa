import type { ReactNode } from "react";

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
