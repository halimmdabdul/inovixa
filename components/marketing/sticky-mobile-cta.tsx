import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StickyMobileCta({ href = "/audit" }: { href?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur-md sm:hidden">
      <Button href={href} className="w-full">
        Get Your Free Website Audit
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
