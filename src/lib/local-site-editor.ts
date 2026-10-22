import path from "node:path";

export const SITE_DATA_FILE = path.join(
  process.cwd(),
  "src",
  "data",
  "site.ts",
);

export const EDITABLE_SECTIONS = [
  "events",
  "team",
  "projects",
  "achievements",
  "gallery",
  "posts",
] as const;

export type EditableSection = (typeof EDITABLE_SECTIONS)[number];

export const SECTION_LABELS: Record<EditableSection, string> = {
  events: "Events",
  team: "Team Members",
  projects: "Projects",
  achievements: "Achievements",
  gallery: "Gallery",
  posts: "Blogs",
};

export function isEditableSection(value: unknown): value is EditableSection {
  return (
    typeof value === "string" &&
    (EDITABLE_SECTIONS as readonly string[]).includes(value)
  );
}
