import { getSession } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const UPLOAD_DIR = "public/uploads";
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

const ALLOWED_IMAGE_PREFIX = "image/";
const ALLOWED_VIDEO_PREFIX = "video/";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    const ext = path.extname(file.name) || (isVideo ? ".mp4" : ".jpg");
    const safeExt = /^.[a-z0-9]+$/i.test(ext) ? ext : isVideo ? ".mp4" : ".jpg";
    const basename = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${safeExt}`;
    const uploadDir = path.join(process.cwd(), UPLOAD_DIR);
    await mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, basename);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);
    const url = `/uploads/${basename}`;
    return NextResponse.json({ url });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed" },
      { status: 500 }
    );
  }
}
