"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2 } from "lucide-react";
import type { TeamMemberRow } from "@/types";
import { addTeamMember, removeTeamMember } from "@/app/actions/team";
import { InputField, TextareaField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TeamManager({ members }: { members: TeamMemberRow[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setStatus(null);

    const result = await addTeamMember({ name, role, email, bio, photoUrl });
    setStatus({ ok: result.success, message: result.message });
    setSaving(false);

    if (result.success) {
      setName("");
      setRole("");
      setEmail("");
      setBio("");
      setPhotoUrl("");
      router.refresh();
    }
  }

  async function onRemove(id: string) {
    setRemovingId(id);
    const result = await removeTeamMember(id);
    setRemovingId(null);
    if (result.success) router.refresh();
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={onSubmit}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <h2 className="text-base font-semibold text-navy">Add a Team Member</h2>
        <p className="text-sm text-slate-500">
          Only add real people. The team section on the site stays hidden until there&rsquo;s at
          least one entry here.
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="Name"
            id="memberName"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <InputField
            label="Role / Title"
            id="memberRole"
            placeholder="e.g. CTO, SEO Specialist"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            required
          />
          <InputField
            label="Email"
            id="memberEmail"
            type="email"
            optional
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <InputField
            label="Photo URL"
            id="memberPhotoUrl"
            optional
            placeholder="https://..."
            value={photoUrl}
            onChange={(event) => setPhotoUrl(event.target.value)}
          />
        </div>

        <TextareaField
          label="Short Bio"
          id="memberBio"
          optional
          rows={3}
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />

        {status ? (
          <p role="alert" className={`text-sm ${status.ok ? "text-brand-teal" : "text-red-600"}`}>
            {status.message}
          </p>
        ) : null}

        <Button type="submit" disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Adding...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add Team Member
            </>
          )}
        </Button>
      </form>

      <div>
        <h2 className="text-base font-semibold text-navy">Current Team ({members.length})</h2>
        {members.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">
            No team members yet — the site&rsquo;s team section is hidden until you add one.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {members.map((member) => (
              <li
                key={member.id}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5"
              >
                {member.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.photo_url}
                    alt={member.name}
                    className="h-12 w-12 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-teal text-sm font-bold text-white">
                    {initials(member.name)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-navy">{member.name}</p>
                  <p className="text-sm text-slate-500">{member.role}</p>
                  {member.email ? (
                    <p className="truncate text-sm text-slate-400">{member.email}</p>
                  ) : null}
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  disabled={removingId === member.id}
                  onClick={() => onRemove(member.id)}
                >
                  {removingId === member.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  )}
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
