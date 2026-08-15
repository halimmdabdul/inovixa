import { ClipboardCheck, Compass, PenTool, Rocket, Search, TrendingUp } from "lucide-react";
import type { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Understand the business, customers, competitors, and goals.",
    icon: Search,
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Plan website structure, messaging, conversion flow, and design direction.",
    icon: Compass,
  },
  {
    number: "03",
    title: "Design & Development",
    description: "Build a fast, responsive, modern website.",
    icon: PenTool,
  },
  {
    number: "04",
    title: "Review",
    description: "Client reviews the website and requests revisions.",
    icon: ClipboardCheck,
  },
  {
    number: "05",
    title: "Launch",
    description:
      "Deploy the website, configure analytics, forms, SEO, and tracking.",
    icon: Rocket,
  },
  {
    number: "06",
    title: "Grow",
    description:
      "Provide maintenance, SEO, conversion improvements, and ongoing support.",
    icon: TrendingUp,
  },
];
