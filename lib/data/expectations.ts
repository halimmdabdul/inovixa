import { Handshake, MessageCircle, ShieldCheck, Tag, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Expectation {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const expectations: Expectation[] = [
  {
    title: "A Free Audit First",
    description:
      "You'll know exactly what's wrong with your website and what we'd recommend before you commit to anything.",
    icon: ShieldCheck,
  },
  {
    title: "Transparent, Fixed Pricing",
    description:
      "Package prices are published on this site. No surprise invoices once a project is underway.",
    icon: Tag,
  },
  {
    title: "Direct Communication",
    description:
      "You'll talk directly with the person building your site, not get routed through account managers.",
    icon: MessageCircle,
  },
  {
    title: "Recommendations, Not Upsells",
    description:
      "We tell you what your business actually needs, even if that means a smaller project than you expected.",
    icon: Handshake,
  },
  {
    title: "Support After Launch",
    description:
      "Website Care plans keep your site fast, secure, and updated long after the project ships.",
    icon: Wrench,
  },
];
