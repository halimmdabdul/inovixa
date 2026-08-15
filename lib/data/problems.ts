import {
  Gauge,
  MousePointerClick,
  Search,
  Smartphone,
  TrendingDown,
  Wand2,
} from "lucide-react";
import type { Problem } from "@/types";

export const problems: Problem[] = [
  {
    title: "Outdated Design",
    description:
      "Your website looks years behind your competitors and can hurt customer trust.",
    icon: Wand2,
  },
  {
    title: "Slow Loading",
    description: "Potential customers leave when pages take too long to load.",
    icon: Gauge,
  },
  {
    title: "Poor Mobile Experience",
    description:
      "Your customers are browsing from their phones. Your website needs to work perfectly there.",
    icon: Smartphone,
  },
  {
    title: "Weak Calls to Action",
    description:
      "Visitors should immediately understand how to call, book, request a quote, or contact your business.",
    icon: MousePointerClick,
  },
  {
    title: "Not Generating Leads",
    description:
      "Traffic alone is not enough. Your website should help turn visitors into customers.",
    icon: TrendingDown,
  },
  {
    title: "Poor Search Visibility",
    description:
      "Weak website structure can make it harder for search engines and local customers to find you.",
    icon: Search,
  },
];
