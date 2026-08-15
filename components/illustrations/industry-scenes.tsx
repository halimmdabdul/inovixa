import type { ComponentType } from "react";
import {
  Building2,
  Calculator,
  Car,
  Droplets,
  Hammer,
  Home,
  Sparkles,
  Stethoscope,
  ThermometerSun,
  Trees,
} from "lucide-react";
import { IconBadge, SceneFrame } from "@/components/illustrations/scene-frame";

export function RoofingIndustryScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="ind-roofing-bg" from="#F1F5F9" to="#DBEAFE">
        <path d="M130 150L200 95L270 150Z" fill="#2563EB" />
        <rect x="150" y="150" width="100" height="60" fill="#FFFFFF" />
        <rect x="185" y="175" width="30" height="35" fill="#0B1220" opacity="0.7" />
      </SceneFrame>
      <IconBadge icon={Home} tone="blue" size="sm" />
    </div>
  );
}

export function PlumbingIndustryScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="ind-plumbing-bg" from="#F1F5F9" to="#CCFBF1">
        <path
          d="M200 90c-16 22-26 38-26 52a26 26 0 0 0 52 0c0-14-10-30-26-52z"
          fill="#2563EB"
        />
        <rect x="170" y="170" width="16" height="30" rx="4" fill="#94A3B8" transform="rotate(-30 178 185)" />
        <rect x="214" y="170" width="16" height="30" rx="4" fill="#94A3B8" transform="rotate(30 222 185)" />
      </SceneFrame>
      <IconBadge icon={Droplets} tone="teal" size="sm" />
    </div>
  );
}

export function HvacIndustryScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="ind-hvac-bg" from="#F1F5F9" to="#DBEAFE">
        <circle cx="200" cy="125" r="45" fill="#FFFFFF" stroke="#2563EB" strokeWidth="3" />
        <path
          d="M200 125c0-16 12-24 12-24M200 125c16 0 24 12 24 12M200 125c0 16-12 24-12 24M200 125c-16 0-24-12-24-12"
          stroke="#2563EB"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="200" cy="125" r="6" fill="#14B8A6" />
      </SceneFrame>
      <IconBadge icon={ThermometerSun} tone="blue" size="sm" />
    </div>
  );
}

export function DentalIndustryScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="ind-dental-bg" from="#F1F5F9" to="#CCFBF1">
        <path
          d="M200 90c-16 0-25 11-25 26 0 19 8 39 13 49 4 8 8 5 9-2 2-10 4-15 8-15s6 5 8 15c1 7 5 10 9 2 5-10 13-30 13-49 0-15-9-26-25-26-2 0-5 1-8 3-3-2-6-3-8-3z"
          fill="#FFFFFF"
          stroke="#0B1220"
          strokeOpacity="0.08"
          strokeWidth="2"
        />
      </SceneFrame>
      <IconBadge icon={Stethoscope} tone="teal" size="sm" />
    </div>
  );
}

export function AutoRepairIndustryScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="ind-auto-bg" from="#F1F5F9" to="#DBEAFE">
        <rect x="140" y="130" width="120" height="35" rx="10" fill="#2563EB" />
        <path d="M155 130l15-25h60l15 25z" fill="#2563EB" />
        <rect x="172" y="112" width="56" height="18" fill="#DBEAFE" />
        <circle cx="165" cy="168" r="12" fill="#0B1220" />
        <circle cx="235" cy="168" r="12" fill="#0B1220" />
      </SceneFrame>
      <IconBadge icon={Car} tone="blue" size="sm" />
    </div>
  );
}

export function CleaningIndustryScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="ind-cleaning-bg" from="#F1F5F9" to="#CCFBF1">
        <circle cx="170" cy="110" r="10" fill="#14B8A6" opacity="0.8" />
        <circle cx="235" cy="95" r="7" fill="#2563EB" opacity="0.7" />
        <circle cx="245" cy="150" r="14" fill="#14B8A6" opacity="0.6" />
        <path d="M195 90l6 16 16 6-16 6-6 16-6-16-16-6 16-6z" fill="#2563EB" />
      </SceneFrame>
      <IconBadge icon={Sparkles} tone="teal" size="sm" />
    </div>
  );
}

export function LandscapingIndustryScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="ind-landscaping-bg" from="#F1F5F9" to="#CCFBF1">
        <rect x="193" y="150" width="14" height="40" fill="#92400E" opacity="0.6" />
        <circle cx="200" cy="115" r="38" fill="#14B8A6" />
        <circle cx="170" cy="140" r="24" fill="#2563EB" opacity="0.7" />
        <circle cx="232" cy="140" r="24" fill="#2563EB" opacity="0.7" />
      </SceneFrame>
      <IconBadge icon={Trees} tone="teal" size="sm" />
    </div>
  );
}

export function ConstructionIndustryScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="ind-construction-bg" from="#F1F5F9" to="#DBEAFE">
        <rect x="150" y="160" width="100" height="14" rx="3" fill="#94A3B8" />
        <rect x="192" y="90" width="16" height="80" rx="4" fill="#2563EB" transform="rotate(20 200 130)" />
        <circle cx="200" cy="130" r="10" fill="#0B1220" />
      </SceneFrame>
      <IconBadge icon={Hammer} tone="blue" size="sm" />
    </div>
  );
}

export function RealEstateIndustryScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="ind-realestate-bg" from="#F1F5F9" to="#E0E7FF">
        <rect x="160" y="80" width="80" height="100" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
        {[0, 1, 2].map((row) =>
          [0, 1].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={174 + col * 34}
              y={94 + row * 26}
              width="16"
              height="16"
              fill={row === 1 && col === 0 ? "#14B8A6" : "#2563EB"}
              opacity={row === 1 && col === 0 ? 0.9 : 0.5}
            />
          )),
        )}
      </SceneFrame>
      <IconBadge icon={Building2} tone="blue" size="sm" />
    </div>
  );
}

export function AccountingIndustryScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="ind-accounting-bg" from="#F1F5F9" to="#DBEAFE">
        <rect x="150" y="150" width="20" height="35" fill="#94A3B8" />
        <rect x="180" y="130" width="20" height="55" fill="#2563EB" opacity="0.7" />
        <rect x="210" y="110" width="20" height="75" fill="#2563EB" />
        <rect x="240" y="140" width="20" height="45" fill="#14B8A6" />
      </SceneFrame>
      <IconBadge icon={Calculator} tone="teal" size="sm" />
    </div>
  );
}

export const industryScenes: Record<string, ComponentType> = {
  roofing: RoofingIndustryScene,
  plumbing: PlumbingIndustryScene,
  hvac: HvacIndustryScene,
  dental: DentalIndustryScene,
  "auto-repair": AutoRepairIndustryScene,
  cleaning: CleaningIndustryScene,
  landscaping: LandscapingIndustryScene,
  construction: ConstructionIndustryScene,
  "real-estate": RealEstateIndustryScene,
  accounting: AccountingIndustryScene,
};
