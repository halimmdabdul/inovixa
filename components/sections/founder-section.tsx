import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { founder } from "@/lib/data/founder";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkedInIcon, GitHubIcon } from "@/components/icons/brand-icons";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function FounderSection({ tone }: { tone?: "surface" }) {
  return (
    <Section tone={tone}>
      <SectionHeading eyebrow="Who's Behind Inovixa" title="Meet the Founder" />
      <div className="mx-auto mt-12 max-w-3xl">
        <div className="flex flex-col items-center gap-8 rounded-2xl border border-slate-200 bg-white p-8 text-center sm:flex-row sm:text-left">
          {founder.photoUrl ? (
            <Image
              src={founder.photoUrl}
              alt={founder.name}
              width={140}
              height={140}
              className="h-32 w-32 shrink-0 rounded-2xl object-cover sm:h-36 sm:w-36"
            />
          ) : (
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-teal text-4xl font-bold text-white sm:h-36 sm:w-36">
              {initials(founder.name)}
            </div>
          )}

          <div>
            <h3 className="text-xl font-bold text-navy">{founder.name}</h3>
            <p className="text-sm font-semibold text-brand-blue">{founder.title}</p>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-slate-500 sm:justify-start">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {founder.location}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{founder.bio}</p>

            <div className="mt-5 flex items-center justify-center gap-3 sm:justify-start">
              {founder.linkedinUrl ? (
                <a
                  href={founder.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${founder.name} on LinkedIn`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-brand-blue hover:text-brand-blue"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </a>
              ) : null}
              {founder.githubUrl ? (
                <a
                  href={founder.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${founder.name} on GitHub`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-brand-blue hover:text-brand-blue"
                >
                  <GitHubIcon className="h-4 w-4" />
                </a>
              ) : null}
              <a
                href={`mailto:${founder.email}`}
                aria-label={`Email ${founder.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-brand-blue hover:text-brand-blue"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
