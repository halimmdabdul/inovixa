export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="36" height="36" rx="10" fill="url(#inovixa-mark-gradient)" />
      <circle cx="18" cy="10.5" r="3.4" fill="#14B8A6" />
      <rect x="14.6" y="16.6" width="6.8" height="12.6" rx="3.4" fill="white" />
      <defs>
        <linearGradient
          id="inovixa-mark-gradient"
          x1="0"
          y1="0"
          x2="36"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
