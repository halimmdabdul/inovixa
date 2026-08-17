import Image from "next/image";
import { Mail } from "lucide-react";
import { getTeamMembers } from "@/lib/team";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export async function TeamSection() {
  const members = await getTeamMembers();
  if (members.length === 0) return null;

  return (
    <Section>
      <SectionHeading eyebrow="The People Behind the Work" title="Meet the Team" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div
            key={member.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
          >
            {member.photo_url ? (
              <Image
                src={member.photo_url}
                alt={member.name}
                width={80}
                height={80}
                className="mx-auto h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-teal text-xl font-bold text-white">
                {initials(member.name)}
              </div>
            )}
            <h3 className="mt-4 text-base font-semibold text-navy">{member.name}</h3>
            <p className="text-sm font-medium text-brand-blue">{member.role}</p>
            {member.bio ? (
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{member.bio}</p>
            ) : null}
            {member.email ? (
              <a
                href={`mailto:${member.email}`}
                aria-label={`Email ${member.name}`}
                className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-brand-blue hover:text-brand-blue"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}
