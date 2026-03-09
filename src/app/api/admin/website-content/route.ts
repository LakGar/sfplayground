import { getSession } from "@/lib/admin-auth";
import { getWebsiteContent, setWebsiteContent } from "@/lib/db";
import { WEBSITE_CONTENT_CONFIG } from "@/data/website-content-keys";
import { convertGoogleDriveImageUrl } from "@/utils/convertDriveImageUrl";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const content = await getWebsiteContent();
    return NextResponse.json(content);
  } catch (err) {
    console.error("Website content fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    if (typeof body !== "object" || body === null) {
      return NextResponse.json(
        { error: "Body must be an object of key-value pairs" },
        { status: 400 }
      );
    }
    const updates: Record<string, string> = {};
    for (const [key, value] of Object.entries(body)) {
      if (typeof key !== "string" || typeof value !== "string") continue;
      const isImageKey = WEBSITE_CONTENT_CONFIG[key]?.type === "image";
      updates[key] = isImageKey ? convertGoogleDriveImageUrl(value) : value;
    }
    await setWebsiteContent(updates);
    const content = await getWebsiteContent();
    return NextResponse.json(content);
  } catch (err) {
    console.error("Website content update error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update" },
      { status: 500 }
    );
  }
}
