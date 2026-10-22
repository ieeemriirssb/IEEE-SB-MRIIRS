"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  Users,
  FolderGit2,
  Trophy,
  Image as ImageIcon,
  BookOpen,
  Plus,
  RefreshCw,
  Search,
  Check,
  AlertTriangle,
  RotateCcw,
  Trash2,
  Layers,
  Code,
} from "lucide-react";
import { EventForm } from "./EventForm";
import { MemberForm } from "./MemberForm";
import { ProjectForm } from "./ProjectForm";
import { GalleryForm } from "./GalleryForm";
import { PostForm } from "./PostForm";
import { AchievementForm } from "./AchievementForm";

type ExprMarker = { __sourceExpression: string };
type RecordData = Record<string, unknown>;
type Sections = Record<string, RecordData[]>;

const SECTION_CONFIG: Record<
  string,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  events: { label: "Events", icon: Calendar },
  team: { label: "Team Members", icon: Users },
  projects: { label: "Projects", icon: FolderGit2 },
  achievements: { label: "Achievements", icon: Trophy },
  gallery: { label: "Gallery", icon: ImageIcon },
  posts: { label: "Blogs & Posts", icon: BookOpen },
};

function isExpr(value: unknown): value is ExprMarker {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    typeof (value as ExprMarker).__sourceExpression === "string"
  );
}

function displayName(record: RecordData, index: number) {
  const candidate =
    record.title ?? record.name ?? record.caption ?? record.slug ?? record.id;
  return typeof candidate === "string" || typeof candidate === "number"
    ? String(candidate)
    : `Record ${index + 1}`;
}

function displaySubtitle(record: RecordData, section: string) {
  if (section === "events") {
    return (record.date as string) || (record.category as string) || (record.status as string) || "";
  }
  if (section === "team") {
    return (record.position as string) || (record.group as string) || "";
  }
  if (section === "projects") {
    return (record.category as string) || "";
  }
  if (section === "gallery") {
    return (record.category as string) || `ID #${record.id}`;
  }
  if (section === "posts") {
    return (record.author as string) || (record.category as string) || (record.date as string) || "";
  }
  if (section === "achievements") {
    return (record.year as string) || "";
  }
  return "";
}

function createDefaultRecord(section: string, records: RecordData[]): RecordData {
  const timestamp = Date.now().toString().slice(-4);
  const today = new Date().toISOString().split("T")[0];
  const d = new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const formattedToday = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;

  if (section === "events") {
    return {
      slug: `new-event-${timestamp}`,
      title: "New Event Title",
      date: today,
      dateLabel: `${d.getDate()} ${months[d.getMonth()].toUpperCase()} ${d.getFullYear()}`,
      time: "2:00 PM - 4:00 PM",
      location: "MRIIRS Campus",
      category: "Workshop",
      excerpt: "Brief summary of the new event.",
      description: "Detailed description of the event agenda, topics, and expectations.",
      organizer: "IEEE Student Branch MRIIRS",
      speakers: [],
      agenda: [],
      requirements: [],
      faqs: [],
      status: "Upcoming",
      image: "",
      participants: 0,
      past: false,
      registrationLink: "",
    };
  }

  if (section === "team") {
    return {
      slug: `new-member-${timestamp}`,
      name: "New Member Name",
      position: "Student Volunteer",
      department: "SCA, MRIIRS",
      group: "Session 2026-27",
      bio: "Active member contributing to IEEE Student Branch MRIIRS initiatives.",
      image: "",
      linkedin: "",
      github: "",
      membershipId: "",
    };
  }

  if (section === "projects") {
    return {
      slug: `new-project-${timestamp}`,
      title: "New Project Title",
      category: "Web Development",
      description: "Brief summary of the project.",
      longDescription: "Detailed breakdown of features, architecture, and outcomes.",
      technologies: [],
      members: [],
      github: "",
      demo: "",
      image: "",
    };
  }

  if (section === "gallery") {
    const maxId = records.reduce((max, r) => Math.max(max, Number(r.id) || 0), 0);
    return {
      id: maxId + 1,
      category: "Events",
      caption: "New Gallery Memory",
      src: "",
      tall: false,
    };
  }

  if (section === "posts") {
    return {
      slug: `new-blog-post-${timestamp}`,
      title: "New Blog Article Title",
      author: "IEEE Member",
      date: formattedToday,
      category: "Leadership",
      readingTime: "4 min read",
      excerpt: "A brief preview excerpt of the article.",
      content: [{ heading: "Introduction", body: "Write your article thoughts here..." }],
      image: "",
      link: "",
    };
  }

  if (section === "achievements") {
    return {
      year: d.getFullYear().toString(),
      title: "New Milestone or Award",
      body: "Description of the milestone or recognition achieved by the student branch.",
    };
  }

  return {};
}

export default function LocalAdminStudio() {
  const [sections, setSections] = useState<Sections>({});
  const [section, setSection] = useState("events");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [record, setRecord] = useState<RecordData | null>(null);
  const [originalRecord, setOriginalRecord] = useState<RecordData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [showRawEditor, setShowRawEditor] = useState(false);

  const records = sections[section] ?? [];
  const sectionKeys = Object.keys(sections);

  // Filter records by search query
  const filteredRecords = useMemo(() => {
    if (!searchQuery.trim()) return records.map((r, i) => ({ record: r, originalIndex: i }));
    const query = searchQuery.toLowerCase();
    return records
      .map((r, i) => ({ record: r, originalIndex: i }))
      .filter(({ record: r, originalIndex: i }) => {
        const name = displayName(r, i).toLowerCase();
        const subtitle = displaySubtitle(r, section).toLowerCase();
        const slug = String(r.slug ?? "").toLowerCase();
        return name.includes(query) || subtitle.includes(query) || slug.includes(query);
      });
  }, [records, searchQuery, section]);

  const changedFields = useMemo(() => {
    if (!record || !originalRecord) return {};
    const changed: RecordData = {};
    for (const [key, value] of Object.entries(record)) {
      if (JSON.stringify(value) !== JSON.stringify(originalRecord[key])) {
        changed[key] = value;
      }
    }
    for (const key of Object.keys(originalRecord)) {
      if (!(key in record)) changed[key] = null;
    }
    return changed;
  }, [record, originalRecord]);

  async function loadData(preferredSection = section) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/local-admin", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to load site data.");
      const loaded = result.sections as Sections;
      for (const [name, items] of Object.entries(loaded)) {
        if (!Array.isArray(items)) throw new Error(`Export "${name}" is not an array.`);
      }
      setSections(loaded);
      const nextSection =
        preferredSection in loaded
          ? preferredSection
          : Object.keys(loaded)[0] ?? "events";
      setSection(nextSection);
      setSelectedIndex(null);
      setRecord(null);
      setOriginalRecord(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load local data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadData("events");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function selectSection(next: string) {
    setSection(next);
    setSearchQuery("");
    setSelectedIndex(null);
    setRecord(null);
    setOriginalRecord(null);
    setNotice("");
    setError("");
  }

  function selectRecord(index: number) {
    const chosen = records[index];
    if (!chosen || Array.isArray(chosen) || typeof chosen !== "object") {
      setError("This record is not an object. It cannot be edited.");
      return;
    }
    const copy = structuredClone(chosen);
    setSelectedIndex(index);
    setRecord(copy);
    setOriginalRecord(structuredClone(copy));
    setNotice("");
    setError("");
  }

  function updateField(key: string, value: unknown) {
    setRecord((current) => (current ? { ...current, [key]: value } : current));
  }

  async function saveRecord() {
    if (selectedIndex === null || !record) return;
    if (Object.keys(changedFields).length === 0) {
      setNotice("No changes to save.");
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/local-admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section,
          index: selectedIndex,
          changes: changedFields,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Save failed.");
      setNotice(`Saved successfully! Backup: ${result.backup}`);
      await loadData(section);
      selectRecord(selectedIndex);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function addRecord() {
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const newRecord = createDefaultRecord(section, records);
      const response = await fetch("/api/local-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, record: newRecord }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not add record.");
      setNotice(`New record added! Backup: ${result.backup}`);

      const latest = await fetch("/api/local-admin", { cache: "no-store" }).then((r) =>
        r.json()
      );
      if (latest.sections) {
        setSections(latest.sections);
        const newIndex = (latest.sections[section]?.length ?? 1) - 1;
        const newData = latest.sections[section]?.[newIndex];
        if (newData) {
          setSelectedIndex(newIndex);
          setRecord(structuredClone(newData));
          setOriginalRecord(structuredClone(newData));
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not add record.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteRecord() {
    if (selectedIndex === null || !record) return;
    const label = displayName(record, selectedIndex);
    if (
      !window.confirm(
        `Are you sure you want to delete "${label}"? This will modify src/data/site.ts directly.`
      )
    ) {
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/local-admin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, index: selectedIndex }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Delete failed.");
      setNotice(`Record deleted! Backup: ${result.backup}`);
      await loadData(section);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background p-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <RefreshCw className="h-5 w-5 animate-spin text-primary" />
          <span>Loading site content data...</span>
        </div>
      </main>
    );
  }

  const currentSectionConfig = SECTION_CONFIG[section] ?? {
    label: section,
    icon: Layers,
  };
  const CurrentIcon = currentSectionConfig.icon;

  return (
    <main className="mx-auto max-w-[1600px] space-y-6 p-4 md:p-8">
      {/* Top Header */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Local Development CMS
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight">
            IEEE SB MRIIRS · Content Dashboard
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Category-optimized editor writing directly to{" "}
            <code className="text-primary font-mono bg-muted px-1.5 py-0.5 rounded">
              src/data/site.ts
            </code>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void loadData(section)}
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-xs font-semibold hover:bg-muted disabled:opacity-50 transition-colors shadow-sm"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${saving ? "animate-spin" : ""}`} />
            Reload Source
          </button>
        </div>
      </header>

      {/* Status Notifications */}
      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 dark:bg-red-950/40 dark:border-red-900 p-4 text-xs font-medium text-red-800 dark:text-red-200"
        >
          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {notice && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 dark:border-emerald-900 p-4 text-xs font-medium text-emerald-900 dark:text-emerald-200"
        >
          <Check className="h-4 w-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>{notice}</span>
        </div>
      )}

      {/* 3-Column Studio Layout */}
      <div className="grid gap-6 lg:grid-cols-[240px_340px_minmax(0,1fr)]">
        {/* Column 1: Category Sections Sidebar */}
        <aside className="rounded-2xl border border-border bg-card p-3.5 h-fit space-y-2">
          <h2 className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Content Categories
          </h2>
          <div className="space-y-1">
            {sectionKeys.map((key) => {
              const cfg = SECTION_CONFIG[key] ?? { label: key, icon: Layers };
              const Icon = cfg.icon;
              const count = sections[key]?.length ?? 0;
              const isSelected = section === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => selectSection(key)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span>{cfg.label}</span>
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-semibold ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Column 2: Records List */}
        <section className="rounded-2xl border border-border bg-card p-4 flex flex-col h-[82vh]">
          <div className="flex items-center justify-between gap-2 border-b border-border pb-3 mb-3">
            <div>
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <CurrentIcon className="h-4 w-4 text-primary" />
                {currentSectionConfig.label}
              </h2>
              <p className="text-[11px] text-muted-foreground">
                {records.length} total entries
              </p>
            </div>
            <button
              type="button"
              onClick={() => void addRecord()}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              <Plus className="h-3.5 w-3.5" /> Add New
            </button>
          </div>

          {/* Search box */}
          <div className="relative mb-3">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${currentSectionConfig.label}...`}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Scrollable list of items */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
            {filteredRecords.length === 0 ? (
              <div className="p-6 text-center text-xs text-muted-foreground">
                {searchQuery ? "No matching records found." : "No records yet. Click '+ Add New' to create one."}
              </div>
            ) : (
              filteredRecords.map(({ record: item, originalIndex }) => {
                const isSelected = selectedIndex === originalIndex;
                const title = displayName(item, originalIndex);
                const subtitle = displaySubtitle(item, section);

                return (
                  <button
                    key={`${section}-${originalIndex}`}
                    type="button"
                    onClick={() => selectRecord(originalIndex)}
                    className={`block w-full text-left rounded-xl p-3 border transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 shadow-sm"
                        : "border-transparent hover:border-border hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="block truncate text-xs font-semibold text-foreground">
                        {title}
                      </span>
                      {Boolean(item.status) && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground flex-shrink-0">
                          {String(item.status)}
                        </span>
                      )}
                    </div>
                    {subtitle && (
                      <span className="mt-1 block truncate text-[11px] text-muted-foreground">
                        {subtitle}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </section>

        {/* Column 3: Category Form Workspace */}
        <section className="rounded-2xl border border-border bg-card p-5 md:p-6 min-h-[82vh] flex flex-col justify-between">
          {!record ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center p-8 text-muted-foreground">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <CurrentIcon className="h-8 w-8 stroke-1 text-primary" />
              </div>
              <h2 className="text-base font-bold text-foreground">Select a record to edit</h2>
              <p className="mt-1.5 max-w-sm text-xs text-muted-foreground leading-relaxed">
                Choose an item from the list on the left to edit its category fields, or click{" "}
                <strong className="text-foreground">&quot;+ Add New&quot;</strong> to create a new {currentSectionConfig.label.toLowerCase()} entry.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Form Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-foreground">
                      Edit {currentSectionConfig.label.replace(/s$/, "")}
                    </h2>
                    {Object.keys(changedFields).length > 0 ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-900">
                        {Object.keys(changedFields).length} unsaved field(s)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                        <Check className="h-3 w-3" /> Synced
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Modifying {displayName(record, selectedIndex ?? 0)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowRawEditor(!showRawEditor)}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground transition-colors"
                    title="Toggle raw TypeScript properties editor"
                  >
                    <Code className="h-3.5 w-3.5" />
                    {showRawEditor ? "Hide Raw" : "Raw Editor"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRecord(originalRecord ? structuredClone(originalRecord) : null);
                      setError("");
                      setNotice("Unsaved edits discarded.");
                    }}
                    disabled={saving || Object.keys(changedFields).length === 0}
                    className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground disabled:opacity-40 transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Discard
                  </button>

                  <button
                    type="button"
                    onClick={() => void deleteRecord()}
                    disabled={saving}
                    className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/40 disabled:opacity-40 transition-colors font-medium"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>

                  <button
                    type="button"
                    onClick={() => void saveRecord()}
                    disabled={saving || Object.keys(changedFields).length === 0}
                    className="inline-flex items-center gap-1.5 text-xs px-4 py-1.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
                  >
                    <Check className="h-3.5 w-3.5" />
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>

              {/* Category-Tailored Form */}
              {section === "events" && (
                <EventForm record={record} onChange={updateField} />
              )}
              {section === "team" && (
                <MemberForm record={record} onChange={updateField} />
              )}
              {section === "projects" && (
                <ProjectForm record={record} onChange={updateField} />
              )}
              {section === "gallery" && (
                <GalleryForm record={record} onChange={updateField} />
              )}
              {section === "posts" && (
                <PostForm record={record} onChange={updateField} />
              )}
              {section === "achievements" && (
                <AchievementForm record={record} onChange={updateField} />
              )}

              {/* Raw JSON / Custom Field Editor */}
              {showRawEditor && (
                <div className="rounded-xl border border-dashed border-border bg-muted/20 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-foreground flex items-center gap-1.5">
                      <Code className="h-3.5 w-3.5 text-primary" /> Advanced / Raw Properties
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      Edit any raw or custom properties directly
                    </span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {Object.entries(record).map(([key, val]) => {
                      const isNested = val !== null && typeof val === "object" && !isExpr(val);
                      const expression = isExpr(val) ? val.__sourceExpression : null;
                      const strVal = expression ?? (val == null ? "" : String(val));

                      return (
                        <div key={key} className={isNested ? "sm:col-span-2" : ""}>
                          <label className="text-[11px] font-mono text-muted-foreground block mb-1">
                            {key}
                          </label>
                          {isNested ? (
                            <textarea
                              value={JSON.stringify(val, null, 2)}
                              onChange={(e) => {
                                try {
                                  updateField(key, JSON.parse(e.target.value));
                                } catch {
                                  // keep typing
                                }
                              }}
                              rows={3}
                              className="w-full text-xs font-mono px-2 py-1 rounded border border-border bg-background"
                            />
                          ) : (
                            <input
                              type="text"
                              value={strVal}
                              onChange={(e) => updateField(key, e.target.value)}
                              className="w-full text-xs font-mono px-2 py-1 rounded border border-border bg-background"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bottom Sticky Action Bar */}
              <div className="sticky bottom-0 bg-card/95 backdrop-blur-sm border-t border-border pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => void saveRecord()}
                  disabled={saving || Object.keys(changedFields).length === 0}
                  className="inline-flex items-center gap-1.5 text-xs px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  <Check className="h-4 w-4" />
                  {saving ? "Saving changes..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
