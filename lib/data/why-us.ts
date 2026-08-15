import {
  Gauge,
  LifeBuoy,
  Search,
  Smartphone,
  Target,
} from "lucide-react";
import type { WhyPoint } from "@/types";

export const whyPoints: WhyPoint[] = [
  {
    title: "Built for Leads",
    description:
      "Not just beautiful. Every page should guide users toward calling, booking, or contacting the business.",
    icon: Target,
  },
  {
    title: "Mobile First",
    description: "Designed for the devices customers actually use.",
    icon: Smartphone,
  },
  {
    title: "Fast by Design",
    description: "Performance optimization should be part of every website.",
    icon: Gauge,
  },
  {
    title: "SEO Ready",
    description:
      "Technical SEO foundations should be implemented correctly from day one.",
    icon: Search,
  },
  {
    title: "No Website Headaches",
    description:
      "Offer long-term website hosting, maintenance, updates, and support.",
    icon: LifeBuoy,
  },
];
