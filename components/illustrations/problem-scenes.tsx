import type { ComponentType } from "react";
import { Gauge, MousePointerClick, Search, Smartphone, TrendingDown, Wand2 } from "lucide-react";
import { IconBadge, SceneFrame } from "@/components/illustrations/scene-frame";

export function OutdatedDesignScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="outdated-bg" from="#F8FAFC" to="#FEE2E2">
        <rect x="90" y="60" width="220" height="140" rx="6" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
        <rect x="90" y="60" width="220" height="24" rx="6" fill="#CBD5E1" />
        <circle cx="106" cy="72" r="4" fill="#94A3B8" />
        <circle cx="120" cy="72" r="4" fill="#94A3B8" />
        <rect x="106" y="98" width="170" height="10" fill="#CBD5E1" />
        <rect x="106" y="118" width="120" height="8" fill="#CBD5E1" />
        <rect x="106" y="136" width="140" height="8" fill="#CBD5E1" />
        <rect x="106" y="154" width="90" height="8" fill="#CBD5E1" />
        <rect x="106" y="172" width="60" height="16" fill="#94A3B8" />
      </SceneFrame>
      <IconBadge icon={Wand2} tone="red" />
    </div>
  );
}

export function SlowLoadingScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="slow-bg" from="#F8FAFC" to="#FEE2E2">
        <rect x="110" y="65" width="180" height="120" rx="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
        <circle cx="200" cy="125" r="30" fill="none" stroke="#E2E8F0" strokeWidth="8" />
        <path d="M200 95a30 30 0 0 1 21 51" fill="none" stroke="#EF4444" strokeWidth="8" strokeLinecap="round" />
      </SceneFrame>
      <IconBadge icon={Gauge} tone="red" />
    </div>
  );
}

export function PoorMobileScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="mobile-bg" from="#F8FAFC" to="#FEE2E2">
        <rect x="150" y="45" width="100" height="170" rx="14" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />
        {/* Content overflowing the frame */}
        <rect x="140" y="80" width="120" height="10" fill="#94A3B8" />
        <rect x="165" y="98" width="130" height="14" fill="#EF4444" opacity="0.7" />
        <rect x="145" y="120" width="115" height="8" fill="#CBD5E1" />
        <rect x="160" y="136" width="100" height="8" fill="#CBD5E1" />
      </SceneFrame>
      <IconBadge icon={Smartphone} tone="red" />
    </div>
  );
}

export function WeakCtaScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="cta-bg" from="#F8FAFC" to="#FEE2E2">
        <rect x="110" y="70" width="180" height="110" rx="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
        <rect x="130" y="92" width="140" height="10" fill="#E2E8F0" />
        <rect x="130" y="110" width="100" height="8" fill="#E2E8F0" />
        <rect
          x="130"
          y="140"
          width="90"
          height="26"
          rx="6"
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="2"
          strokeDasharray="5 5"
        />
      </SceneFrame>
      <IconBadge icon={MousePointerClick} tone="red" />
    </div>
  );
}

export function NotGeneratingLeadsScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="leads-bg" from="#F8FAFC" to="#FEE2E2">
        <line x1="100" y1="185" x2="300" y2="185" stroke="#CBD5E1" strokeWidth="2" />
        <rect x="120" y="110" width="28" height="75" fill="#94A3B8" opacity="0.6" />
        <rect x="170" y="130" width="28" height="55" fill="#94A3B8" opacity="0.7" />
        <rect x="220" y="150" width="28" height="35" fill="#EF4444" opacity="0.8" />
        <rect x="270" y="165" width="28" height="20" fill="#EF4444" />
        <path d="M120 100l60 20 50 15 60 20" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      </SceneFrame>
      <IconBadge icon={TrendingDown} tone="red" />
    </div>
  );
}

export function PoorSearchVisibilityScene() {
  return (
    <div className="relative h-full w-full">
      <SceneFrame gradientId="search-bg" from="#F8FAFC" to="#FEE2E2">
        <g opacity="0.35">
          <rect x="120" y="70" width="160" height="100" rx="6" fill="#E2E8F0" />
          <rect x="136" y="86" width="110" height="8" fill="#CBD5E1" />
          <rect x="136" y="102" width="90" height="8" fill="#CBD5E1" />
          <rect x="136" y="118" width="100" height="8" fill="#CBD5E1" />
        </g>
        <circle cx="255" cy="150" r="26" fill="none" stroke="#EF4444" strokeWidth="6" />
        <line x1="274" y1="169" x2="292" y2="187" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
        <line x1="243" y1="138" x2="267" y2="162" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
      </SceneFrame>
      <IconBadge icon={Search} tone="red" />
    </div>
  );
}

export const problemScenes: Record<string, ComponentType> = {
  "Outdated Design": OutdatedDesignScene,
  "Slow Loading": SlowLoadingScene,
  "Poor Mobile Experience": PoorMobileScene,
  "Weak Calls to Action": WeakCtaScene,
  "Not Generating Leads": NotGeneratingLeadsScene,
  "Poor Search Visibility": PoorSearchVisibilityScene,
};
