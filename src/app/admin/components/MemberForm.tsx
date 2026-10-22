"use client";

import { Sparkles, User, Briefcase, GraduationCap, Users } from "lucide-react";
import { ImageUploader } from "./ImageUploader";

const POPULAR_GROUPS = [
  "Session 2026-27",
  "Session 2025-26",
  "Faculty Coordinators",
  "Advisory Board",
  "Technical Team",
  "Design & Media Team",
  "Event Management Team",
  "Outreach Team",
];

interface MemberFormProps {
  record: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

export function MemberForm({ record, onChange }: MemberFormProps) {
  const name = (record.name as string) ?? "";
  const slug = (record.slug as string) ?? "";
  const position = (record.position as string) ?? "";
  const department = (record.department as string) ?? "SCA, MRIIRS";
  const group = (record.group as string) ?? "Session 2026-27";
  const bio = (record.bio as string) ?? "";
  const image = (record.image as string) ?? "";
  const linkedin = (record.linkedin as string) ?? "";
  const github = (record.github as string) ?? "";
  const membershipId = (record.membershipId as string) ?? "";

  function generateSlug() {
    if (!name) return;
    const generated = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    onChange("slug", generated);
  }

  return (
    <div className="space-y-6">
      {/* 1. Personal & Position Info */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border pb-3">
          <User className="h-4 w-4 text-blue-500" /> Member Details
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="e.g. Aamnah Faiyaz"
              className="w-full text-sm font-medium px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-muted-foreground">
                Slug (URL Identifier) *
              </label>
              <button
                type="button"
                onClick={generateSlug}
                className="text-[11px] font-medium text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
              >
                <Sparkles className="h-3 w-3" /> Auto from Name
              </button>
            </div>
            <input
              type="text"
              value={slug}
              onChange={(e) => onChange("slug", e.target.value)}
              placeholder="aamnah-faiyaz"
              className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1 flex items-center gap-1">
              <Briefcase className="h-3.5 w-3.5 text-muted-foreground" /> Position / Role *
            </label>
            <input
              type="text"
              value={position}
              onChange={(e) => onChange("position", e.target.value)}
              placeholder="e.g. President / Vice President / Secretary / Webmaster"
              className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1 flex items-center gap-1">
              <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" /> Department / Institute *
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => onChange("department", e.target.value)}
              placeholder="e.g. SCA, MRIIRS"
              className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-muted-foreground block mb-1 flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-muted-foreground" /> Session / Team Group *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={group}
                onChange={(e) => onChange("group", e.target.value)}
                placeholder="e.g. Session 2026-27"
                className="flex-1 text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
              />
              <select
                value=""
                onChange={(e) => {
                  if (e.target.value) onChange("group", e.target.value);
                }}
                className="text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
              >
                <option value="">Presets...</option>
                {POPULAR_GROUPS.map((grp) => (
                  <option key={grp} value={grp}>
                    {grp}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Photo Upload */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <ImageUploader
          label="Profile Photo"
          folder="teamphoto"
          value={image}
          onChange={(url) => onChange("image", url)}
          helperText="Upload member portrait (.png, .jpg, .webp). Saved directly to public/teamphoto/."
        />
      </div>

      {/* 3. Biography */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <label className="text-xs font-semibold text-muted-foreground block mb-1">
          Biography / Profile Summary *
        </label>
        <textarea
          value={bio}
          onChange={(e) => onChange("bio", e.target.value)}
          rows={4}
          placeholder="Brief summary of their role, contribution, and responsibilities within IEEE Student Branch MRIIRS..."
          className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none leading-relaxed"
        />
      </div>

      {/* 4. Optional Social Links & Membership */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-foreground border-b border-border pb-3">
          Optional Links & Membership Info
        </h3>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              LinkedIn Profile URL
            </label>
            <input
              type="text"
              value={linkedin}
              onChange={(e) => onChange("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              GitHub Profile URL
            </label>
            <input
              type="text"
              value={github}
              onChange={(e) => onChange("github", e.target.value)}
              placeholder="https://github.com/username"
              className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              IEEE Membership ID
            </label>
            <input
              type="text"
              value={membershipId}
              onChange={(e) => onChange("membershipId", e.target.value)}
              placeholder="e.g. 101238190"
              className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
