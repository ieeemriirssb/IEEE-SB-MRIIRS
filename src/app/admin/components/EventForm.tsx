"use client";

import { Sparkles, Calendar, Clock, MapPin, Tag } from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import {
  SpeakersBuilder,
  SpeakerItem,
  AgendaBuilder,
  AgendaItem,
  StringListBuilder,
  FaqsBuilder,
  FaqItem,
} from "./ArrayBuilders";

const EVENT_CATEGORIES = [
  "All",
  "Workshop",
  "Hackathon",
  "Seminar",
  "Competition",
  "Social",
  "Technical",
] as const;

const EVENT_STATUSES = [
  "Upcoming",
  "Open",
  "Closing Soon",
  "Full",
  "Completed",
] as const;

interface EventFormProps {
  record: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

export function EventForm({ record, onChange }: EventFormProps) {
  const title = (record.title as string) ?? "";
  const slug = (record.slug as string) ?? "";
  const date = (record.date as string) ?? "";
  const dateLabel = (record.dateLabel as string) ?? (record.datlabel as string) ?? "";
  const time = (record.time as string) ?? "";
  const location = (record.location as string) ?? "";
  const category = (record.category as string) ?? "Workshop";
  const excerpt = (record.excerpt as string) ?? "";
  const description = (record.description as string) ?? "";
  const organizer = (record.organizer as string) ?? "IEEE Student Branch MRIIRS";
  const status = (record.status as string) ?? "Upcoming";
  const image = (record.image as string) ?? "";
  const participants = record.participants !== undefined ? Number(record.participants) : "";
  const past = Boolean(record.past);
  const registrationLink = (record.registrationLink as string) ?? "";

  const speakers = (record.speakers as SpeakerItem[]) ?? [];
  const agenda = (record.agenda as AgendaItem[]) ?? [];
  const requirements = (record.requirements as string[]) ?? [];
  const faqs = (record.faqs as FaqItem[]) ?? [];

  function generateSlug() {
    if (!title) return;
    const generated = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    onChange("slug", generated);
  }

  function formatLabelFromDate() {
    if (!date) return;
    try {
      const parsed = new Date(date);
      if (!isNaN(parsed.getTime())) {
        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const day = parsed.getDate().toString().padStart(2, "0");
        const month = months[parsed.getMonth()];
        const year = parsed.getFullYear();
        onChange("dateLabel", `${day} ${month} ${year}`);
      }
    } catch {
      // ignore
    }
  }

  return (
    <div className="space-y-6">
      {/* 1. Basic Details */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border pb-3">
          <Tag className="h-4 w-4 text-blue-500" /> Event Information
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Event Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => onChange("title", e.target.value)}
              placeholder="e.g. Expert Talk Series 10: Resume Building"
              className="w-full text-sm font-medium px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-muted-foreground">
                Slug (URL Path) *
              </label>
              <button
                type="button"
                onClick={generateSlug}
                className="text-[11px] font-medium text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
              >
                <Sparkles className="h-3 w-3" /> Auto from Title
              </button>
            </div>
            <input
              type="text"
              value={slug}
              onChange={(e) => onChange("slug", e.target.value)}
              placeholder="expert-talk-series-10"
              className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Organizer
            </label>
            <input
              type="text"
              value={organizer}
              onChange={(e) => onChange("organizer", e.target.value)}
              placeholder="IEEE Student Branch MRIIRS"
              className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => onChange("category", e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            >
              {EVENT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => onChange("status", e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            >
              {EVENT_STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 2. Schedule & Location */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border pb-3">
          <Calendar className="h-4 w-4 text-emerald-500" /> Date, Time & Location
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Date (YYYY-MM-DD) *
            </label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  onChange("date", e.target.value);
                  // Also suggest dateLabel if empty
                  if (!dateLabel && e.target.value) {
                    const parts = e.target.value.split("-");
                    if (parts.length === 3) {
                      const d = new Date(e.target.value);
                      const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                      onChange("dateLabel", `${parts[2]} ${months[d.getMonth()]} ${parts[0]}`);
                    }
                  }
                }}
                className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-muted-foreground">
                Date Label (DD MonthName YYYY)
              </label>
              <button
                type="button"
                onClick={formatLabelFromDate}
                className="text-[11px] font-medium text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
              >
                <Sparkles className="h-3 w-3" /> Sync Format
              </button>
            </div>
            <input
              type="text"
              value={dateLabel}
              onChange={(e) => {
                onChange("dateLabel", e.target.value);
                onChange("datlabel", e.target.value);
              }}
              placeholder="e.g. 26 AUG 2026"
              className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" /> Time
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => onChange("time", e.target.value)}
              placeholder="e.g. 2:00 PM - 3:30 PM"
              className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1 flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" /> Location / Venue
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => onChange("location", e.target.value)}
              placeholder="e.g. Audi 1 / Online / MS Teams"
              className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 3. Media Upload */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <ImageUploader
          label="Event Banner / Poster"
          folder="events"
          value={image}
          onChange={(url) => onChange("image", url)}
          helperText="Upload event posters (.png, .jpg, .webp). The image will be automatically placed in public/events/ and linked to this event."
        />
      </div>

      {/* 4. Descriptions */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <div>
          <label className="text-xs font-semibold text-muted-foreground block mb-1">
            Short Excerpt (Displayed on event cards) *
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => onChange("excerpt", e.target.value)}
            rows={2}
            placeholder="A compelling 1-2 sentence summary of this event..."
            className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none leading-relaxed"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground block mb-1">
            Full Event Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => onChange("description", e.target.value)}
            rows={5}
            placeholder="Detailed description of the event, its objectives, topics covered, and key takeaways..."
            className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none leading-relaxed"
          />
        </div>
      </div>

      {/* 5. Speakers & Agenda */}
      <div className="space-y-6 rounded-xl border border-border bg-card p-4 sm:p-5">
        <SpeakersBuilder
          items={speakers}
          onChange={(items) => onChange("speakers", items)}
        />
        <div className="border-t border-border pt-4">
          <AgendaBuilder
            items={agenda}
            onChange={(items) => onChange("agenda", items)}
          />
        </div>
      </div>

      {/* 6. Requirements & FAQs */}
      <div className="space-y-6 rounded-xl border border-border bg-card p-4 sm:p-5">
        <StringListBuilder
          label="Requirements & Prerequisites"
          placeholder="e.g. Basic familiarity with Python / Laptop required"
          addButtonText="Add Requirement"
          items={requirements}
          onChange={(items) => onChange("requirements", items)}
        />
        <div className="border-t border-border pt-4">
          <FaqsBuilder
            items={faqs}
            onChange={(items) => onChange("faqs", items)}
          />
        </div>
      </div>

      {/* 7. Optional Details */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-foreground border-b border-border pb-3">
          Additional & Optional Information
        </h3>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Registered / Total Participants
            </label>
            <input
              type="number"
              value={participants}
              onChange={(e) =>
                onChange("participants", e.target.value === "" ? undefined : Number(e.target.value))
              }
              placeholder="e.g. 120"
              className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Past Event?
            </label>
            <select
              value={String(past)}
              onChange={(e) => onChange("past", e.target.value === "true")}
              className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            >
              <option value="false">No (Upcoming / Active)</option>
              <option value="true">Yes (Past Event)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">
              Registration Link (URL)
            </label>
            <input
              type="text"
              value={registrationLink}
              onChange={(e) => onChange("registrationLink", e.target.value)}
              placeholder="https://forms.gle/... or ticket link"
              className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
