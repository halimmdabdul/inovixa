import type { ComponentType } from "react";
import { Cpu, Megaphone, Palette, Target } from "lucide-react";
import { IconBadge, SceneFrame } from "@/components/illustrations/scene-frame";
import { RedesignScene, LocalSeoScene } from "@/components/illustrations/service-scenes";
import { FastByDesignScene as PerformanceScene } from "@/components/illustrations/why-us-scenes";

export function WebsiteDesignScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="blog-design-bg" from="#F1F5F9" to="#DBEAFE">
        <rect x="110" y="60" width="180" height="130" rx="10" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
        <rect x="110" y="60" width="180" height="22" rx="10" fill="#2563EB" />
        <circle cx="200" cy="140" r="26" fill="#2563EB" opacity="0.15" />
        <circle cx="180" cy="150" r="14" fill="#2563EB" />
        <circle cx="210" cy="130" r="14" fill="#14B8A6" />
        <circle cx="222" cy="158" r="10" fill="#93C5FD" />
      </SceneFrame>
      <IconBadge icon={Palette} tone="blue" />
    </div>
  );
}

export function MarketingScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="blog-marketing-bg" from="#F1F5F9" to="#CCFBF1">
        <rect x="140" y="130" width="90" height="60" fill="#FFFFFF" stroke="#14B8A6" strokeWidth="2" />
        <path d="M140 130l45-30 45 30z" fill="#14B8A6" />
        <rect x="170" y="150" width="20" height="40" fill="#0B1220" opacity="0.6" />
        <path d="M245 110l35-14v52l-35-14z" fill="#2563EB" />
        <path d="M280 96c8 0 8 66 0 66" stroke="#2563EB" strokeWidth="4" fill="none" strokeLinecap="round" />
      </SceneFrame>
      <IconBadge icon={Megaphone} tone="teal" />
    </div>
  );
}

export function ConversionScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="blog-conversion-bg" from="#F1F5F9" to="#DBEAFE">
        <path d="M130 75h140l-45 60v45l-50 20v-65z" fill="#2563EB" opacity="0.85" />
        <circle cx="200" cy="185" r="18" fill="#14B8A6" />
        <path d="M192 185l6 6 12-13" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </SceneFrame>
      <IconBadge icon={Target} tone="teal" />
    </div>
  );
}

export function BusinessTechScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="blog-tech-bg" from="#F1F5F9" to="#DBEAFE">
        <rect x="175" y="100" width="50" height="50" rx="6" fill="#2563EB" />
        <rect x="188" y="113" width="24" height="24" rx="3" fill="white" />
        {[0, 1, 2, 3].map((i) => (
          <line
            key={`h-${i}`}
            x1={185 + i * 12}
            y1={100}
            x2={185 + i * 12}
            y2={85}
            stroke="#2563EB"
            strokeWidth="3"
          />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={`v-${i}`}
            x1={185 + i * 12}
            y1={150}
            x2={185 + i * 12}
            y2={165}
            stroke="#2563EB"
            strokeWidth="3"
          />
        ))}
        <circle cx="140" cy="125" r="6" fill="#14B8A6" />
        <circle cx="260" cy="125" r="6" fill="#14B8A6" />
        <line x1="146" y1="125" x2="175" y2="125" stroke="#14B8A6" strokeWidth="3" />
        <line x1="225" y1="125" x2="254" y2="125" stroke="#14B8A6" strokeWidth="3" />
      </SceneFrame>
      <IconBadge icon={Cpu} tone="blue" />
    </div>
  );
}

export const blogCategoryScenes: Record<string, ComponentType> = {
  "Website Design": WebsiteDesignScene,
  "Website Redesign": RedesignScene,
  "Local SEO": LocalSeoScene,
  "Small Business Marketing": MarketingScene,
  "Website Performance": PerformanceScene,
  "Conversion Optimization": ConversionScene,
  "Business Technology": BusinessTechScene,
};
