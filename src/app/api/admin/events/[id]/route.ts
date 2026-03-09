import { getSession } from "@/lib/admin-auth";
import { getEventById, updateEvent, deleteEvent } from "@/lib/db";
import {
  convertGoogleDriveImageUrl,
  convertGoogleDriveImageUrls,
} from "@/utils/convertDriveImageUrl";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const eventId = Number(id);
  if (!Number.isInteger(eventId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const event = await getEventById(eventId);
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(event);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const eventId = Number(id);
  if (!Number.isInteger(eventId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  try {
    const body = await request.json();
    const coverRaw = body.cover_image ?? body.coverImage;
    const imagesRaw = body.images;
    const event = await updateEvent(eventId, {
      slug: body.slug,
      title: body.title,
      date: body.date,
      location: body.location,
      attendees: body.attendees,
      status: body.status,
      cover_image:
        coverRaw !== undefined
          ? coverRaw
            ? convertGoogleDriveImageUrl(coverRaw)
            : null
          : undefined,
      description: body.description,
      images:
        imagesRaw !== undefined
          ? Array.isArray(imagesRaw)
            ? convertGoogleDriveImageUrls(imagesRaw)
            : []
          : undefined,
    });
    if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(event);
  } catch (err) {
    console.error("Event update error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const eventId = Number(id);
  if (!Number.isInteger(eventId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const ok = await deleteEvent(eventId);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
