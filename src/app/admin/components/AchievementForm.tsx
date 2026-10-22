"use client";

import { Trophy, Calendar } from "lucide-react";

interface AchievementFormProps {
  record: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

export function AchievementForm({ record, onChange }: AchievementFormProps) {
  const year = (record.year as string) ?? new Date().getFullYear().toString();
  const title = (record.title as string) ?? "";
  const body = (record.body as string) ?? "";

  return (
    <div className="space-y-6">
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border pb-3">
          <Trophy className="h-4 w-4 text-amber-500" /> Achievement Milestone
        </h3>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1 flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" /> Year *
            </label>
            <input
              type="text"
              value={year}
              onChange={(e) => onChange("year", e.target.value)}
              placeholder="e.g. 2026"
              className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Achievement Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => onChange("title", e.target.value)}
              placeholder="e.g. IEEE YP Delhi Summit 1.0 — Organizing Partner"
              className="w-full text-sm font-medium px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Description / Impact Summary *
            </label>
            <textarea
              value={body}
              onChange={(e) => onChange("body", e.target.value)}
              rows={4}
              placeholder="Details about the award, participation numbers, impact, or branch involvement..."
              className="w-full text-xs leading-relaxed px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
