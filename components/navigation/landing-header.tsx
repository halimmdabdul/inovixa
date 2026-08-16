import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/navigation/logo";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <Container>
        <div className="flex h-20 items-center justify-between py-3">
          <Logo />
          <Button href="#audit-form" size="sm">
            Get Your Free Audit
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </header>
  );
}
