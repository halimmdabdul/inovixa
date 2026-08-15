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
import type { Industry } from "@/types";

export const industries: Industry[] = [
  {
    slug: "roofing",
    name: "Roofing",
    icon: Home,
    description: "Websites that turn storm damage and repair searches into booked estimates.",
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    icon: Droplets,
    description: "Get found for emergency and same-day plumbing searches.",
  },
  {
    slug: "hvac",
    name: "HVAC",
    icon: ThermometerSun,
    description: "Seasonal-ready websites that convert heating and cooling searches into calls.",
  },
  {
    slug: "dental",
    name: "Dental",
    icon: Stethoscope,
    description: "Modern, trustworthy websites that help patients book appointments online.",
  },
  {
    slug: "auto-repair",
    name: "Auto Repair",
    icon: Car,
    description: "Websites built to earn trust and drive appointment requests.",
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    icon: Sparkles,
    description: "Simple, fast websites that make booking a cleaning easy.",
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    icon: Trees,
    description: "Showcase your work and win more quote requests.",
  },
  {
    slug: "construction",
    name: "Construction",
    icon: Hammer,
    description: "Professional websites that build trust for bigger projects.",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    icon: Building2,
    description: "Modern websites that make agents and listings look their best.",
  },
  {
    slug: "accounting",
    name: "Accounting",
    icon: Calculator,
    description: "Professional, credible websites that help firms win new clients.",
  },
];
