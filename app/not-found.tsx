import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

/**
 * Next.js only falls back to a route group's not-found.tsx for paths that
 * partially match that group's routing tree. A completely unmatched path
 * (e.g. a typo'd URL with no matching segment at all) resolves here instead,
 * so this renders its own Navbar/Footer rather than relying on the
 * (marketing) group layout to wrap it.
 */
export default function NotFound() {
  return (
    <>
      <Navbar />
      <Section className="flex min-h-[60vh] items-center justify-center py-20 text-center">
        <div className="mx-auto max-w-md">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue">404</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            This Page Took a Wrong Turn
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            The page you&rsquo;re looking for doesn&rsquo;t exist or may have
            moved.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/">Back to Home</Button>
            <Button href="/audit" variant="secondary">
              Get a Free Website Audit
            </Button>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
}
