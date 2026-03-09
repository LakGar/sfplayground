import { getSession } from "@/lib/admin-auth";
import { createEvent, getEvents } from "@/lib/db";
import {
  convertGoogleDriveImageUrl,
  convertGoogleDriveImageUrls,
} from "@/utils/convertDriveImageUrl";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const events = await getEvents();
  return NextResponse.json(events);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { slug, title, date, location, attendees, status, cover_image, description, images } = body;
    if (!slug || !title || !date || !location || !description) {
      return NextResponse.json(
        { error: "slug, title, date, location, and description are required" },
        { status: 400 }
      );
    }
    const event = await createEvent({
      slug: String(slug).trim().toLowerCase().replace(/\s+/g, "-"),
      title,
      date,
      location,
      attendees: typeof attendees === "number" ? attendees : 0,
      status: status ?? "past",
      cover_image: cover_image ? convertGoogleDriveImageUrl(cover_image) : null,
      description,
      images: Array.isArray(images) ? convertGoogleDriveImageUrls(images) : [],
    });
    return NextResponse.json(event);
  } catch (err) {
    console.error("Event create error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create" },
      { status: 500 }
    );
  }
}
