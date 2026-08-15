import type { ComponentType } from "react";
import { MapPin, Plus, RefreshCw, ShieldCheck, type LucideIcon } from "lucide-react";
import { SceneFrame } from "@/components/illustrations/scene-frame";

function IconBadge({
  icon: Icon,
  tone = "teal",
}: {
  icon: LucideIcon;
  tone?: "teal" | "blue";
}) {
  return (
    <div
      className={
        "absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full shadow-md " +
        (tone === "teal" ? "bg-brand-teal" : "bg-brand-blue")
      }
    >
      <Icon className="h-5 w-5 text-white" aria-hidden="true" />
    </div>
  );
}

export function RedesignScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="redesign-bg" from="#F1F5F9" to="#DBEAFE">
        {/* Faded old browser, behind */}
        <g opacity="0.55">
          <rect x="55" y="82" width="150" height="104" rx="6" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
          <rect x="55" y="82" width="150" height="22" rx="6" fill="#CBD5E1" />
          <circle cx="67" cy="93" r="3" fill="#94A3B8" />
          <circle cx="78" cy="93" r="3" fill="#94A3B8" />
          <rect x="70" y="118" width="120" height="8" fill="#CBD5E1" />
          <rect x="70" y="134" width="90" height="6" fill="#CBD5E1" />
          <rect x="70" y="148" width="100" height="6" fill="#CBD5E1" />
          <rect x="70" y="162" width="60" height="6" fill="#CBD5E1" />
        </g>
        {/* Crisp new browser, front */}
        <g>
          <rect x="195" y="58" width="175" height="126" rx="10" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
          <rect x="195" y="58" width="175" height="24" rx="10" fill="#2563EB" />
          <circle cx="209" cy="70" r="3" fill="white" fillOpacity="0.85" />
          <circle cx="220" cy="70" r="3" fill="white" fillOpacity="0.85" />
          <rect x="211" y="96" width="135" height="12" rx="3" fill="#DBEAFE" />
          <rect x="211" y="116" width="90" height="16" rx="4" fill="#2563EB" />
          <rect x="211" y="144" width="135" height="8" rx="2" fill="#E2E8F0" />
          <rect x="211" y="158" width="100" height="8" rx="2" fill="#E2E8F0" />
        </g>
      </SceneFrame>
      <IconBadge icon={RefreshCw} tone="teal" />
    </div>
  );
}

export function NewWebsiteScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="new-site-bg" from="#F1F5F9" to="#CCFBF1">
        <circle cx="335" cy="55" r="30" fill="#2563EB" opacity="0.1" />
        <rect x="105" y="55" width="190" height="140" rx="12" fill="#FFFFFF" stroke="#14B8A6" strokeWidth="2" />
        <rect x="105" y="55" width="190" height="26" rx="12" fill="#14B8A6" />
        <circle cx="121" cy="68" r="3.5" fill="white" fillOpacity="0.85" />
        <circle cx="133" cy="68" r="3.5" fill="white" fillOpacity="0.85" />
        {/* Blank canvas dashed rectangle, about to be built */}
        <rect
          x="125"
          y="98"
          width="150"
          height="80"
          rx="6"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <circle cx="200" cy="138" r="18" fill="#DBEAFE" />
        <path d="M200 130v16M192 138h16" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
      </SceneFrame>
      <IconBadge icon={Plus} tone="blue" />
    </div>
  );
}

export function LocalSeoScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="local-seo-bg" from="#F1F5F9" to="#DBEAFE">
        {/* Radiating search rings */}
        <circle cx="170" cy="130" r="80" fill="none" stroke="#2563EB" strokeOpacity="0.12" strokeWidth="2" />
        <circle cx="170" cy="130" r="55" fill="none" stroke="#2563EB" strokeOpacity="0.18" strokeWidth="2" />
        {/* Small nearby business dots */}
        <circle cx="90" cy="80" r="5" fill="#94A3B8" opacity="0.6" />
        <circle cx="260" cy="70" r="5" fill="#94A3B8" opacity="0.6" />
        <circle cx="270" cy="170" r="5" fill="#94A3B8" opacity="0.6" />
        {/* Map pin */}
        <path
          d="M170 78c-24 0-42 18-42 42 0 30 42 72 42 72s42-42 42-72c0-24-18-42-42-42z"
          fill="#2563EB"
        />
        <circle cx="170" cy="120" r="16" fill="#FFFFFF" />
      </SceneFrame>
      <IconBadge icon={MapPin} tone="teal" />
    </div>
  );
}

export function CareScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="care-bg" from="#F1F5F9" to="#CCFBF1">
        <circle cx="90" cy="70" r="24" fill="#2563EB" opacity="0.1" />
        <circle cx="320" cy="180" r="34" fill="#14B8A6" opacity="0.14" />
        {/* Shield */}
        <path
          d="M200 60l58 20v46c0 42-26 68-58 84-32-16-58-42-58-84V80z"
          fill="#FFFFFF"
          stroke="#2563EB"
          strokeWidth="3"
        />
        <path
          d="M200 60l58 20v46c0 42-26 68-58 84z"
          fill="#2563EB"
          opacity="0.08"
        />
        {/* Checkmark */}
        <path
          d="M178 140l16 16 30-34"
          stroke="#2563EB"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </SceneFrame>
      <IconBadge icon={ShieldCheck} tone="teal" />
    </div>
  );
}

export const serviceScenes: Record<string, ComponentType> = {
  "website-redesign": RedesignScene,
  "website-development": NewWebsiteScene,
  "local-seo": LocalSeoScene,
  "website-maintenance": CareScene,
};
