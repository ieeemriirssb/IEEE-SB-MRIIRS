"use client";

import { Sparkles, FolderGit2, Code2, Users, ExternalLink } from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import { StringListBuilder } from "./ArrayBuilders";

const PROJECT_CATEGORIES = [
  "All",
  "AI/ML",
  "Web Development",
  "IoT",
  "Robotics",
  "Blockchain",
  "Cybersecurity",
  "Research",
] as const;

interface ProjectFormProps {
  record: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

export function ProjectForm({ record, onChange }: ProjectFormProps) {
  const title = (record.title as string) ?? "";
  const slug = (record.slug as string) ?? "";
  const category = (record.category as string) ?? "Web Development";
  const description = (record.description as string) ?? "";
  const longDescription = (record.longDescription as string) ?? "";
  const github = (record.github as string) ?? "";
  const demo = (record.demo as string) ?? "";
  const image = (record.image as string) ?? "";

  const technologies = (record.technologies as string[]) ?? [];
  const members = (record.members as string[]) ?? [];

  function generateSlug() {
    if (!title) return;
    const generated = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    onChange("slug", generated);
  }

  return (
    <div className="space-y-6">
      {/* 1. Project Overview */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border pb-3">
          <FolderGit2 className="h-4 w-4 text-purple-500" /> Project Details
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Project Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => onChange("title", e.target.value)}
              placeholder="e.g. Campus Sphere - Full-Stack Student Community Platform"
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
                className="text-[11px] font-medium text-purple-600 hover:text-purple-700 inline-flex items-center gap-1"
              >
                <Sparkles className="h-3 w-3" /> Auto from Title
              </button>
            </div>
            <input
              type="text"
              value={slug}
              onChange={(e) => onChange("slug", e.target.value)}
              placeholder="campus-sphere"
              className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => onChange("category", e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            >
              {PROJECT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 2. Media Upload */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <ImageUploader
          label="Project Cover / Screenshot"
          folder="projects"
          value={image}
          onChange={(url) => onChange("image", url)}
          helperText="Upload project banner or UI screenshot (.png, .jpg, .webp). Saved directly to public/projects/."
        />
      </div>

      {/* 3. Descriptions */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <div>
          <label className="text-xs font-semibold text-muted-foreground block mb-1">
            Short Description (Card view) *
          </label>
          <textarea
            value={description}
            onChange={(e) => onChange("description", e.target.value)}
            rows={2}
            placeholder="A quick summary of what this project does and problems it solves..."
            className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none leading-relaxed"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground block mb-1">
            Detailed Long Description *
          </label>
          <textarea
            value={longDescription}
            onChange={(e) => onChange("longDescription", e.target.value)}
            rows={5}
            placeholder="Full architecture, features, modules, outcomes, and technical overview..."
            className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none leading-relaxed"
          />
        </div>
      </div>

      {/* 4. Technologies & Members */}
      <div className="space-y-6 rounded-xl border border-border bg-card p-4 sm:p-5">
        <StringListBuilder
          label="Technologies Used"
          placeholder="e.g. Next.js, TypeScript, PostgreSQL, TailwindCSS"
          addButtonText="Add Technology"
          items={technologies}
          onChange={(items) => onChange("technologies", items)}
        />
        <div className="border-t border-border pt-4">
          <StringListBuilder
            label="Contributing Members"
            placeholder="e.g. Aamnah Faiyaz, Himani Singhal"
            addButtonText="Add Member"
            items={members}
            onChange={(items) => onChange("members", items)}
          />
        </div>
      </div>

      {/* 5. Links */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-foreground border-b border-border pb-3">
          Repository & Live Demo Links
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1 flex items-center gap-1">
              <Code2 className="h-3.5 w-3.5 text-muted-foreground" /> GitHub Repository Link *
            </label>
            <input
              type="text"
              value={github}
              onChange={(e) => onChange("github", e.target.value)}
              placeholder="https://github.com/organization/project"
              className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1 flex items-center gap-1">
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" /> Live Demo URL (Optional)
            </label>
            <input
              type="text"
              value={demo}
              onChange={(e) => onChange("demo", e.target.value)}
              placeholder="https://myproject.vercel.app"
              className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
