import { ClipboardCheck, FileText, PhoneCall, Rocket, Search, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface RiskReductionStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const riskReductionSteps: RiskReductionStep[] = [
  {
    number: "01",
    title: "Free Audit",
    description: "We review your current site and what's holding it back — no cost, no commitment.",
    icon: Search,
  },
  {
    number: "02",
    title: "Discovery Call",
    description: "We talk through your goals, timeline, and budget.",
    icon: PhoneCall,
  },
  {
    number: "03",
    title: "Clear Proposal",
    description: "You get an exact price and scope in writing before any work begins.",
    icon: FileText,
  },
  {
    number: "04",
    title: "50% to Start",
    description: "Half the project cost is due to begin work — never the full amount upfront.",
    icon: Wallet,
  },
  {
    number: "05",
    title: "Review Before Launch",
    description: "You review the finished website and request changes before it goes live.",
    icon: ClipboardCheck,
  },
  {
    number: "06",
    title: "Final Payment at Launch",
    description: "The remaining balance is due once you're happy and the site is ready to launch.",
    icon: Rocket,
  },
];
