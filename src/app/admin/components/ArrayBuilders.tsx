"use client";

import { Plus, Trash2, HelpCircle } from "lucide-react";

// ==========================================
// 1. Speakers Builder
// ==========================================
export interface SpeakerItem {
  name: string;
  role: string;
}

export function SpeakersBuilder({
  items,
  onChange,
}: {
  items: SpeakerItem[];
  onChange: (items: SpeakerItem[]) => void;
}) {
  const speakers = Array.isArray(items) ? items : [];

  function addSpeaker() {
    onChange([...speakers, { name: "", role: "" }]);
  }

  function updateSpeaker(index: number, field: "name" | "role", value: string) {
    const next = [...speakers];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  }

  function removeSpeaker(index: number) {
    onChange(speakers.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          Speakers ({speakers.length})
        </label>
        <button
          type="button"
          onClick={addSpeaker}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-md transition-colors"
        >
          <Plus className="h-3.5 w-3.5" /> Add Speaker
        </button>
      </div>

      {speakers.length === 0 ? (
        <p className="text-xs text-muted-foreground italic bg-muted/20 border border-dashed border-border rounded-lg p-3 text-center">
          No speakers added yet. Click &quot;Add Speaker&quot; to add one.
        </p>
      ) : (
        <div className="space-y-2">
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2.5 rounded-lg border border-border bg-card shadow-sm"
            >
              <span className="text-xs font-mono text-muted-foreground w-5 text-center">
                #{index + 1}
              </span>
              <input
                type="text"
                value={speaker.name ?? ""}
                onChange={(e) => updateSpeaker(index, "name", e.target.value)}
                placeholder="Speaker Name (e.g. Dr. John Doe)"
                className="flex-1 text-xs px-2.5 py-1.5 rounded-md border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
              />
              <input
                type="text"
                value={speaker.role ?? ""}
                onChange={(e) => updateSpeaker(index, "role", e.target.value)}
                placeholder="Role / Title (e.g. Professor, AI Researcher)"
                className="flex-1 text-xs px-2.5 py-1.5 rounded-md border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeSpeaker(index)}
                className="p-1.5 text-muted-foreground hover:text-red-500 rounded-md transition-colors"
                title="Remove speaker"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. Agenda Builder
// ==========================================
export interface AgendaItem {
  time: string;
  item: string;
}

export function AgendaBuilder({
  items,
  onChange,
}: {
  items: AgendaItem[];
  onChange: (items: AgendaItem[]) => void;
}) {
  const agenda = Array.isArray(items) ? items : [];

  function addItem() {
    onChange([...agenda, { time: "", item: "" }]);
  }

  function updateItem(index: number, field: "time" | "item", value: string) {
    const next = [...agenda];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  }

  function removeItem(index: number) {
    onChange(agenda.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          Agenda ({agenda.length})
        </label>
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-md transition-colors"
        >
          <Plus className="h-3.5 w-3.5" /> Add Agenda Item
        </button>
      </div>

      {agenda.length === 0 ? (
        <p className="text-xs text-muted-foreground italic bg-muted/20 border border-dashed border-border rounded-lg p-3 text-center">
          No agenda items yet. Click &quot;Add Agenda Item&quot; to define the schedule.
        </p>
      ) : (
        <div className="space-y-2">
          {agenda.map((entry, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2.5 rounded-lg border border-border bg-card shadow-sm"
            >
              <input
                type="text"
                value={entry.time ?? ""}
                onChange={(e) => updateItem(index, "time", e.target.value)}
                placeholder="Time (e.g. 10:00 AM)"
                className="w-32 text-xs px-2.5 py-1.5 rounded-md border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
              />
              <input
                type="text"
                value={entry.item ?? ""}
                onChange={(e) => updateItem(index, "item", e.target.value)}
                placeholder="Activity / Topic description"
                className="flex-1 text-xs px-2.5 py-1.5 rounded-md border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="p-1.5 text-muted-foreground hover:text-red-500 rounded-md transition-colors"
                title="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. String List Builder (Requirements, Tech, Members)
// ==========================================
export function StringListBuilder({
  items,
  onChange,
  label,
  placeholder = "Add an item...",
  addButtonText = "Add Item",
}: {
  items: string[];
  onChange: (items: string[]) => void;
  label: string;
  placeholder?: string;
  addButtonText?: string;
}) {
  const list = Array.isArray(items) ? items : [];

  function addItem() {
    onChange([...list, ""]);
  }

  function updateItem(index: number, value: string) {
    const next = [...list];
    next[index] = value;
    onChange(next);
  }

  function removeItem(index: number) {
    onChange(list.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          {label} ({list.length})
        </label>
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-md transition-colors"
        >
          <Plus className="h-3.5 w-3.5" /> {addButtonText}
        </button>
      </div>

      {list.length === 0 ? (
        <p className="text-xs text-muted-foreground italic bg-muted/20 border border-dashed border-border rounded-lg p-3 text-center">
          No items yet. Click &quot;{addButtonText}&quot; to add.
        </p>
      ) : (
        <div className="space-y-2">
          {list.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground w-5 text-center">
                •
              </span>
              <input
                type="text"
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
                placeholder={placeholder}
                className="flex-1 text-xs px-2.5 py-1.5 rounded-md border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="p-1.5 text-muted-foreground hover:text-red-500 rounded-md transition-colors"
                title="Remove"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. FAQs Builder
// ==========================================
export interface FaqItem {
  q: string;
  a: string;
}

export function FaqsBuilder({
  items,
  onChange,
}: {
  items: FaqItem[];
  onChange: (items: FaqItem[]) => void;
}) {
  const faqs = Array.isArray(items) ? items : [];

  function addFaq() {
    onChange([...faqs, { q: "", a: "" }]);
  }

  function updateFaq(index: number, field: "q" | "a", value: string) {
    const next = [...faqs];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  }

  function removeFaq(index: number) {
    onChange(faqs.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          Frequently Asked Questions ({faqs.length})
        </label>
        <button
          type="button"
          onClick={addFaq}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-md transition-colors"
        >
          <Plus className="h-3.5 w-3.5" /> Add FAQ
        </button>
      </div>

      {faqs.length === 0 ? (
        <p className="text-xs text-muted-foreground italic bg-muted/20 border border-dashed border-border rounded-lg p-3 text-center">
          No FAQs added yet. Click &quot;Add FAQ&quot; to include common questions and answers.
        </p>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-3 rounded-lg border border-border bg-card space-y-2 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                  <HelpCircle className="h-3.5 w-3.5 text-blue-500" /> Question #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeFaq(index)}
                  className="text-xs text-red-500 hover:text-red-700 inline-flex items-center gap-1 font-medium"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove
                </button>
              </div>
              <input
                type="text"
                value={faq.q ?? ""}
                onChange={(e) => updateFaq(index, "q", e.target.value)}
                placeholder="Question (e.g. Who can participate?)"
                className="w-full text-xs font-medium px-2.5 py-1.5 rounded-md border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
              />
              <textarea
                value={faq.a ?? ""}
                onChange={(e) => updateFaq(index, "a", e.target.value)}
                placeholder="Answer..."
                rows={2}
                className="w-full text-xs px-2.5 py-1.5 rounded-md border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 5. Blog Content Sections Builder
// ==========================================
export interface BlogContentItem {
  heading: string;
  body: string;
}

export function BlogContentBuilder({
  items,
  onChange,
}: {
  items: BlogContentItem[];
  onChange: (items: BlogContentItem[]) => void;
}) {
  const sections = Array.isArray(items) ? items : [];

  function addSection() {
    onChange([...sections, { heading: "", body: "" }]);
  }

  function updateSection(index: number, field: "heading" | "body", value: string) {
    const next = [...sections];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  }

  function removeSection(index: number) {
    onChange(sections.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          Article Sections ({sections.length})
        </label>
        <button
          type="button"
          onClick={addSection}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-md transition-colors"
        >
          <Plus className="h-3.5 w-3.5" /> Add Section
        </button>
      </div>

      {sections.length === 0 ? (
        <p className="text-xs text-muted-foreground italic bg-muted/20 border border-dashed border-border rounded-lg p-3 text-center">
          No content sections yet. Add sections to form the blog post body.
        </p>
      ) : (
        <div className="space-y-3">
          {sections.map((section, index) => (
            <div
              key={index}
              className="p-3.5 rounded-lg border border-border bg-card space-y-2.5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-primary">
                  Section #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeSection(index)}
                  className="text-xs text-red-500 hover:text-red-700 inline-flex items-center gap-1 font-medium"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove Section
                </button>
              </div>

              <div>
                <span className="text-[11px] font-medium text-muted-foreground block mb-1">
                  Section Heading
                </span>
                <input
                  type="text"
                  value={section.heading ?? ""}
                  onChange={(e) => updateSection(index, "heading", e.target.value)}
                  placeholder="e.g. Learning to Communicate and Adapt"
                  className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-md border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <span className="text-[11px] font-medium text-muted-foreground block mb-1">
                  Paragraph / Body Text
                </span>
                <textarea
                  value={section.body ?? ""}
                  onChange={(e) => updateSection(index, "body", e.target.value)}
                  placeholder="Write the paragraph or content for this section..."
                  rows={4}
                  className="w-full text-xs leading-relaxed px-2.5 py-1.5 rounded-md border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
