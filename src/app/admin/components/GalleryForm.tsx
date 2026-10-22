"use client";

import { Image as ImageIcon, Hash, LayoutGrid } from "lucide-react";
import { ImageUploader } from "./ImageUploader";

const GALLERY_CATEGORIES = [
  "All",
  "Events",
  "Workshops",
  "Hackathons",
  "Team",
  "Competitions",
  "Community",
] as const;

interface GalleryFormProps {
  record: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

export function GalleryForm({ record, onChange }: GalleryFormProps) {
  const id = record.id !== undefined ? Number(record.id) : 1;
  const category = (record.category as string) ?? "Events";
  const caption = (record.caption as string) ?? "";
  const src = (record.src as string) ?? (record.image as string) ?? "";
  const tall = Boolean(record.tall);

  return (
    <div className="space-y-6">
      {/* 1. Gallery Item Information */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border pb-3">
          <ImageIcon className="h-4 w-4 text-emerald-500" /> Gallery Item
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1 flex items-center gap-1">
              <Hash className="h-3.5 w-3.5 text-muted-foreground" /> Item ID (Autoincremented) *
            </label>
            <input
              type="number"
              value={id}
              onChange={(e) => onChange("id", Number(e.target.value) || 1)}
              className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
            <span className="text-[11px] text-muted-foreground mt-1 block">
              Auto-assigned on creation.
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1 flex items-center gap-1">
              <LayoutGrid className="h-3.5 w-3.5 text-muted-foreground" /> Category *
            </label>
            <select
              value={category}
              onChange={(e) => onChange("category", e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            >
              {GALLERY_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Caption / Event Name *
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => onChange("caption", e.target.value)}
              placeholder="e.g. Orientation Day / PowerBI Workshop"
              className="w-full text-sm font-medium px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Photo Upload */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <ImageUploader
          label="Gallery Photo"
          folder="gallery"
          value={src}
          onChange={(url) => {
            onChange("src", url);
            onChange("image", url);
          }}
          helperText="Upload event photo (.png, .jpg, .webp). Automatically saved to public/gallery/ and referenced as /gallery/<filename>."
        />
      </div>

      {/* 3. Aspect Ratio / Tall Setting */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-foreground border-b border-border pb-3">
          Display Layout
        </h3>

        <div className="max-w-xs">
          <label className="text-xs font-semibold text-muted-foreground block mb-1">
            Tall Aspect Ratio (3:4 portrait)
          </label>
          <select
            value={String(tall)}
            onChange={(e) => onChange("tall", e.target.value === "true")}
            className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
          >
            <option value="false">Standard (4:3 Landscape)</option>
            <option value="true">Tall (3:4 Portrait)</option>
          </select>
          <span className="text-[11px] text-muted-foreground mt-1 block">
            Used by the gallery masonry grid layout.
          </span>
        </div>
      </div>
    </div>
  );
}
