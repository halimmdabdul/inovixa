import type { ComponentType, ReactNode } from "react";

/**
 * Original flat-vector scene illustrations for the concept case studies.
 * These stand in for real project screenshots (which don't exist, since
 * these are labeled concept projects) without pretending to be photography
 * of an actual business.
 */
function SceneFrame({
  gradientId,
  from,
  to,
  children,
}: {
  gradientId: string;
  from: string;
  to: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 400 250"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="400" y2="250" gradientUnits="userSpaceOnUse">
          <stop stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill={`url(#${gradientId})`} />
      {children}
    </svg>
  );
}

export function RoofingScene() {
  return (
    <SceneFrame gradientId="roofing-bg" from="#F1F5F9" to="#DBEAFE">
      <circle cx="336" cy="52" r="26" fill="#14B8A6" opacity="0.25" />
      <path d="M0 200 Q100 170 200 195 T400 185 V250 H0 Z" fill="#E2E8F0" />
      {/* Roof */}
      <path d="M140 130 L230 62 L320 130 Z" fill="#2563EB" />
      <path d="M140 130 L230 62 L230 82 L162 130 Z" fill="#1D4ED8" />
      {/* Chimney, drawn on top of the roof so it reads as sitting on the slope */}
      <rect x="260" y="52" width="16" height="46" fill="#0B1220" opacity="0.85" />
      {/* House body */}
      <rect x="155" y="130" width="150" height="80" fill="#FFFFFF" />
      <rect x="155" y="130" width="150" height="80" fill="#0B1220" opacity="0.04" />
      {/* Door */}
      <rect x="215" y="164" width="30" height="46" rx="2" fill="#0B1220" opacity="0.75" />
      {/* Windows */}
      <rect x="172" y="150" width="24" height="24" rx="2" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
      <rect x="264" y="150" width="24" height="24" rx="2" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />
      {/* Ground */}
      <rect x="0" y="210" width="400" height="40" fill="#CBD5E1" opacity="0.5" />
    </SceneFrame>
  );
}

export function DentalScene() {
  return (
    <SceneFrame gradientId="dental-bg" from="#F1F5F9" to="#CCFBF1">
      <circle cx="70" cy="60" r="34" fill="#2563EB" opacity="0.12" />
      <circle cx="330" cy="190" r="46" fill="#14B8A6" opacity="0.14" />
      {/* Tooth shape */}
      <path
        d="M200 70c-26 0-40 18-40 42 0 30 12 62 20 78 6 12 12 8 14-4 3-16 6-24 12-24s9 8 12 24c2 12 8 16 14 4 8-16 20-48 20-78 0-24-14-42-40-42-4 0-8 2-12 4-4-2-8-4-12-4z"
        fill="#FFFFFF"
        stroke="#0B1220"
        strokeOpacity="0.08"
        strokeWidth="2"
      />
      {/* Sparkle accents */}
      <path d="M270 90 l6 14 14 6 -14 6 -6 14 -6-14-14-6 14-6z" fill="#14B8A6" opacity="0.8" />
      <circle cx="140" cy="60" r="5" fill="#2563EB" opacity="0.6" />
    </SceneFrame>
  );
}

export function RealEstateScene() {
  return (
    <SceneFrame gradientId="realestate-bg" from="#F1F5F9" to="#E0E7FF">
      <rect x="0" y="205" width="400" height="45" fill="#CBD5E1" opacity="0.5" />
      {/* Background buildings */}
      <rect x="30" y="120" width="46" height="90" fill="#94A3B8" opacity="0.4" />
      <rect x="86" y="90" width="38" height="120" fill="#94A3B8" opacity="0.3" />
      {/* Main building */}
      <rect x="170" y="60" width="120" height="150" fill="#FFFFFF" />
      <rect x="170" y="60" width="120" height="150" fill="#0B1220" opacity="0.03" />
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={186 + col * 32}
            y={78 + row * 32}
            width="18"
            height="18"
            fill={row === 1 && col === 1 ? "#14B8A6" : "#2563EB"}
            opacity={row === 1 && col === 1 ? 0.9 : 0.5}
          />
        )),
      )}
      {/* Door */}
      <rect x="218" y="182" width="24" height="28" fill="#0B1220" opacity="0.8" />
      {/* Sign */}
      <rect x="316" y="150" width="46" height="30" rx="3" fill="#2563EB" />
      <rect x="332" y="180" width="4" height="26" fill="#0B1220" opacity="0.5" />
    </SceneFrame>
  );
}

export const caseStudyScenes: Record<string, ComponentType> = {
  "summit-ridge-roofing": RoofingScene,
  "brightview-dental": DentalScene,
  "harborline-realty": RealEstateScene,
};
