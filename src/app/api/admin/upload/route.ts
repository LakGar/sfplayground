import { getSession } from "@/lib/admin-auth";
import { isFounderAdmin } from "@/lib/admin-access";
import { recordAuditEvent } from "@/lib/admin-audit";
import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

export const dynamic = "force-dynamic";

const MAX_IMAGE_SIZE = 6 * 1024 * 1024; // client compresses large images before upload
const MAX_VIDEO_SIZE = 6 * 1024 * 1024; // use an external video URL for larger videos

const ALLOWED_IMAGE_PREFIX = "image/";
const ALLOWED_VIDEO_PREFIX = "video/";

async function ensureAdminUploadsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS admin_uploads (
      id TEXT PRIMARY KEY,
      filename TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size_bytes INTEGER NOT NULL,
      data_base64 TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isFounderAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file provided or invalid file" },
        { status: 400 }
      );
    }

    const type = (file.type || "").toLowerCase();
    const isImage = type.startsWith(ALLOWED_IMAGE_PREFIX);
    const isVideo = type.startsWith(ALLOWED_VIDEO_PREFIX);
    if (!isImage && !isVideo) {
      return NextResponse.json(
        { error: "Invalid file type. Use an image (JPEG, PNG, WebP, etc.) or video (MP4, WebM)." },
        { status: 400 }
      );
    }

    const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: isVideo
            ? `Video too large. Max ${MAX_VIDEO_SIZE / 1024 / 1024}MB`
            : `Image too large. Max ${MAX_IMAGE_SIZE / 1024 / 1024}MB`,
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const id = randomUUID();
    await ensureAdminUploadsTable();
    await sql`
      INSERT INTO admin_uploads (id, filename, mime_type, size_bytes, data_base64)
      VALUES (${id}, ${file.name || "upload"}, ${type}, ${file.size}, ${buffer.toString("base64")})
    `;

    const url = `/api/admin/upload/${id}`;
    await recordAuditEvent({
      adminId: session.id,
      adminName: session.name,
      action: "file_uploaded",
      targetType: isVideo ? "video" : "image",
      targetId: id,
      details: { name: file.name, size: file.size, type: file.type, url },
    });
    return NextResponse.json({ url });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed" },
      { status: 500 }
    );
  }
}
