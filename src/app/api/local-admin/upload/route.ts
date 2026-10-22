import { NextRequest, NextResponse } from "next/server";
import * as fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_FOLDERS = ["events", "teamphoto", "projects", "gallery", "posts", "advisors"] as const;
type AllowedFolder = (typeof ALLOWED_FOLDERS)[number];

function hasLocalAccess(request: NextRequest): boolean {
  if (
    process.env.NODE_ENV === "production" ||
    process.env.ENABLE_LOCAL_SITE_EDITOR !== "true"
  ) return false;

  const hostHeader = request.headers.get("host");
  if (!hostHeader) return false;

  let host: string;
  try {
    host = new URL(`http://${hostHeader}`).hostname.replace(/^\[|\]$/g, "");
  } catch {
    return false;
  }
  if (!["localhost", "127.0.0.1", "::1"].includes(host)) return false;

  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const parsed = new URL(origin);
    const originHost = parsed.hostname.replace(/^\[|\]$/g, "");
    return (
      ["http:", "https:"].includes(parsed.protocol) &&
      ["localhost", "127.0.0.1", "::1"].includes(originHost) &&
      parsed.host === hostHeader
    );
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!hasLocalAccess(request)) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const requestedFolder = (formData.get("folder") as string) || "events";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const folder: AllowedFolder = ALLOWED_FOLDERS.includes(requestedFolder as AllowedFolder)
      ? (requestedFolder as AllowedFolder)
      : "events";

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize file name
    const ext = path.extname(file.name) || ".png";
    const baseName = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 50);

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e4)}`;
    const finalFilename = `${baseName || "upload"}-${uniqueSuffix}${ext}`;

    const targetDir = path.join(process.cwd(), "public", folder);
    await fs.mkdir(targetDir, { recursive: true });

    const targetFilePath = path.join(targetDir, finalFilename);
    await fs.writeFile(targetFilePath, buffer);

    const publicUrl = `/${folder}/${finalFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: finalFilename,
      size: buffer.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload image." },
      { status: 500 }
    );
  }
}
