import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import {
  INTAKE_UPLOAD_CONFIG,
  isAllowedIntakeUpload,
  type IntakeUploadCategory,
} from "@/lib/intake-upload-config";

export const dynamic = "force-dynamic";

const UPLOAD_DIR = "public/uploads/intake";
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 25;

type RateLimitEntry = { count: number; resetAt: number };

const rateLimitStore: Map<string, RateLimitEntry> =
  (globalThis as { __intakeUploadRateLimit?: Map<string, RateLimitEntry> })
    .__intakeUploadRateLimit ?? new Map();

if (!(globalThis as { __intakeUploadRateLimit?: Map<string, RateLimitEntry> })
  .__intakeUploadRateLimit) {
  (globalThis as { __intakeUploadRateLimit?: Map<string, RateLimitEntry> })
    .__intakeUploadRateLimit = rateLimitStore;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);
  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  existing.count += 1;
  rateLimitStore.set(ip, existing);
  return existing.count > RATE_LIMIT_MAX;
}

function parseCategory(raw: FormDataEntryValue | null): IntakeUploadCategory {
  const value = typeof raw === "string" ? raw : "logo";
  return value === "document" ? "document" : "logo";
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many uploads. Please try again later." },
        { status: 429 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const category = parseCategory(formData.get("category"));

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const config = INTAKE_UPLOAD_CONFIG[category];
    const type = (file.type || "").toLowerCase();

    if (!isAllowedIntakeUpload(category, type, file.name)) {
      return NextResponse.json(
        {
          error:
            category === "logo"
              ? "Logo must be an image (PNG, JPG, or WebP)."
              : "Use a PDF, PowerPoint, Word doc, or text file.",
        },
        { status: 400 },
      );
    }

    if (file.size > config.maxBytes) {
      return NextResponse.json(
        {
          error: `File must be ${config.maxBytes / 1024 / 1024}MB or smaller.`,
        },
        { status: 400 },
      );
    }

    const ext = path.extname(file.name).toLowerCase();
    const safeExt = config.extensions.includes(ext)
      ? ext
      : category === "logo"
        ? ".png"
        : ".pdf";
    const basename = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${safeExt}`;
    const uploadDir = path.join(process.cwd(), UPLOAD_DIR);
    await mkdir(uploadDir, { recursive: true });
    await writeFile(
      path.join(uploadDir, basename),
      Buffer.from(await file.arrayBuffer()),
    );

    return NextResponse.json({
      url: `/uploads/intake/${basename}`,
      fileName: file.name,
    });
  } catch (error) {
    console.error("Intake upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 },
    );
  }
}
