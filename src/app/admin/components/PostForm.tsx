"use client";

import { Sparkles, BookOpen, User, Calendar, Clock, Link as LinkIcon } from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import { BlogContentBuilder, BlogContentItem } from "./ArrayBuilders";

interface PostFormProps {
  record: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

export function PostForm({ record, onChange }: PostFormProps) {
  const title = (record.title as string) ?? "";
  const slug = (record.slug as string) ?? "";
  const author = (record.author as string) ?? "";
  const date = (record.date as string) ?? "";
  const category = (record.category as string) ?? "Leadership";
  const readingTime = (record.readingTime as string) ?? "5 min read";
  const excerpt = (record.excerpt as string) ?? "";
  const image = (record.image as string) ?? "";
  const link = (record.link as string) ?? "";

  const content = (record.content as BlogContentItem[]) ?? [];

  function generateSlug() {
    if (!title) return;
    const generated = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    onChange("slug", generated);
  }

  function setTodayDate() {
    const d = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    onChange("date", `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`);
  }

  return (
    <div className="space-y-6">
      {/* 1. Article Metadata */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border pb-3">
          <BookOpen className="h-4 w-4 text-amber-500" /> Blog Article Information
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Article Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => onChange("title", e.target.value)}
              placeholder="e.g. What IEEE Taught Me Beyond the Classroom"
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
                className="text-[11px] font-medium text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
              >
                <Sparkles className="h-3 w-3" /> Auto from Title
              </button>
            </div>
            <input
              type="text"
              value={slug}
              onChange={(e) => onChange("slug", e.target.value)}
              placeholder="what-ieee-taught-me-beyond-the-classroom"
              className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1 flex items-center gap-1">
              <User className="h-3.5 w-3.5 text-muted-foreground" /> Author *
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => onChange("author", e.target.value)}
              placeholder="e.g. Aamnah Faiyaz"
              className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" /> Date (DD MonthName YYYY) *
              </label>
              <button
                type="button"
                onClick={setTodayDate}
                className="text-[11px] font-medium text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
              >
                Today
              </button>
            </div>
            <input
              type="text"
              value={date}
              onChange={(e) => onChange("date", e.target.value)}
              placeholder="e.g. 5 Sep 2026"
              className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Category *
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => onChange("category", e.target.value)}
              placeholder="e.g. Leadership / AI/ML / Career / Web"
              className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" /> Reading Time *
            </label>
            <input
              type="text"
              value={readingTime}
              onChange={(e) => onChange("readingTime", e.target.value)}
              placeholder="e.g. 5 min read"
              className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1 flex items-center gap-1">
              <LinkIcon className="h-3.5 w-3.5 text-muted-foreground" /> Original / External Blog Link
            </label>
            <input
              type="text"
              value={link}
              onChange={(e) => onChange("link", e.target.value)}
              placeholder="https://linkedin.com/posts/... or blog URL"
              className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Blog Header Image */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <ImageUploader
          label="Featured Article Cover"
          folder="posts"
          value={image}
          onChange={(url) => onChange("image", url)}
          helperText="Upload blog header cover (.png, .jpg, .webp). Automatically stored in public/posts/."
        />
      </div>

      {/* 3. Excerpt */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <label className="text-xs font-semibold text-muted-foreground block mb-1">
          Article Excerpt / Summary *
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => onChange("excerpt", e.target.value)}
          rows={3}
          placeholder="Brief intro displayed on article preview cards..."
          className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none leading-relaxed"
        />
      </div>

      {/* 4. Article Content Sections */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <BlogContentBuilder
          items={content}
          onChange={(items) => onChange("content", items)}
        />
      </div>
    </div>
  );
}
