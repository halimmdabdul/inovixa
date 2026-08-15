import type { ComponentType } from "react";
import { Gauge, LifeBuoy, Search, Smartphone, Target } from "lucide-react";
import { IconBadge, SceneFrame } from "@/components/illustrations/scene-frame";

export function BuiltForLeadsScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="leads-good-bg" from="#F1F5F9" to="#DBEAFE">
        <circle cx="200" cy="125" r="65" fill="none" stroke="#2563EB" strokeOpacity="0.15" strokeWidth="14" />
        <circle cx="200" cy="125" r="42" fill="none" stroke="#2563EB" strokeOpacity="0.3" strokeWidth="12" />
        <circle cx="200" cy="125" r="20" fill="#2563EB" />
        <path d="M255 70l-45 45" stroke="#14B8A6" strokeWidth="5" strokeLinecap="round" />
        <path d="M255 70l-18 2 -2 18" fill="none" stroke="#14B8A6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </SceneFrame>
      <IconBadge icon={Target} tone="teal" />
    </div>
  );
}

export function MobileFirstScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="mobile-good-bg" from="#F1F5F9" to="#CCFBF1">
        <rect x="155" y="45" width="90" height="160" rx="14" fill="#FFFFFF" stroke="#14B8A6" strokeWidth="3" />
        <rect x="171" y="70" width="58" height="10" rx="2" fill="#2563EB" />
        <rect x="171" y="90" width="58" height="6" rx="2" fill="#DBEAFE" />
        <rect x="171" y="102" width="40" height="6" rx="2" fill="#DBEAFE" />
        <rect x="171" y="122" width="58" height="26" rx="4" fill="#CCFBF1" stroke="#14B8A6" strokeWidth="1.5" />
        <rect x="171" y="158" width="58" height="10" rx="5" fill="#14B8A6" />
      </SceneFrame>
      <IconBadge icon={Smartphone} tone="blue" />
    </div>
  );
}

export function FastByDesignScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="fast-bg" from="#F1F5F9" to="#DBEAFE">
        <circle cx="200" cy="135" r="55" fill="none" stroke="#E2E8F0" strokeWidth="10" />
        <path
          d="M200 135m-55 0a55 55 0 0 1 96-35"
          fill="none"
          stroke="#14B8A6"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path d="M200 135l24-30" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
        <circle cx="200" cy="135" r="7" fill="#2563EB" />
      </SceneFrame>
      <IconBadge icon={Gauge} tone="teal" />
    </div>
  );
}

export function SeoReadyScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="seo-good-bg" from="#F1F5F9" to="#CCFBF1">
        <rect x="110" y="80" width="180" height="30" rx="15" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
        <circle cx="130" cy="95" r="6" fill="none" stroke="#2563EB" strokeWidth="2.5" />
        <line x1="135" y1="100" x2="140" y2="105" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="150" y="91" width="90" height="8" rx="3" fill="#DBEAFE" />
        <path d="M115 165l35-20 30 12 45-30 45 15" fill="none" stroke="#14B8A6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </SceneFrame>
      <IconBadge icon={Search} tone="blue" />
    </div>
  );
}

export function NoHeadachesScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="headaches-bg" from="#F1F5F9" to="#DBEAFE">
        <circle cx="200" cy="125" r="55" fill="none" stroke="#14B8A6" strokeWidth="16" />
        <circle cx="200" cy="125" r="55" fill="none" stroke="#FFFFFF" strokeWidth="16" strokeDasharray="4 22" />
        <circle cx="200" cy="125" r="28" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
        <path d="M188 125l9 9 17-19" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </SceneFrame>
      <IconBadge icon={LifeBuoy} tone="teal" />
    </div>
  );
}

export const whyUsScenes: Record<string, ComponentType> = {
  "Built for Leads": BuiltForLeadsScene,
  "Mobile First": MobileFirstScene,
  "Fast by Design": FastByDesignScene,
  "SEO Ready": SeoReadyScene,
  "No Website Headaches": NoHeadachesScene,
};
