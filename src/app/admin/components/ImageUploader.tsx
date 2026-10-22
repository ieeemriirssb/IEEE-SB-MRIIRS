"use client";

import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, Check, Loader2, X, Link as LinkIcon } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
  folder: "events" | "teamphoto" | "projects" | "gallery" | "posts" | "advisors";
  label?: string;
  helperText?: string;
}

export function ImageUploader({
  value,
  onChange,
  folder,
  label = "Image",
  helperText,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/local-admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload file");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">{label}</label>
        <span className="text-xs text-muted-foreground font-mono">public/{folder}/</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start rounded-xl border border-border bg-card p-4">
        {/* Preview Container */}
        <div className="relative flex-shrink-0 h-28 w-28 sm:h-32 sm:w-32 rounded-lg border border-border bg-muted/40 overflow-hidden flex items-center justify-center group">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt="Preview"
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
              onError={(e) => {
                // Fallback icon on broken image
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-2 text-center text-muted-foreground">
              <ImageIcon className="h-8 w-8 stroke-1 mb-1" />
              <span className="text-[10px]">No image</span>
            </div>
          )}

          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-1 right-1 bg-black/70 hover:bg-black text-white p-1 rounded-full transition-opacity opacity-0 group-hover:opacity-100"
              title="Remove image"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Upload & Path Controls */}
        <div className="flex-1 min-w-0 space-y-2.5 w-full">
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors shadow-sm"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-3.5 w-3.5" />
                  Upload to public/{folder}
                </>
              )}
            </button>

            {value && (
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full font-medium">
                <Check className="h-3 w-3" /> Image linked
              </span>
            )}
          </div>

          <div className="relative">
            <LinkIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={`/${folder}/example.jpg or external image URL`}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary font-mono"
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}
          {helperText && <p className="text-[11px] text-muted-foreground">{helperText}</p>}
        </div>
      </div>
    </div>
  );
}
