import { getSession } from "@/lib/admin-auth";
import { upsertNextEvent } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const {
      title,
      date,
      time,
      location,
      hook,
      ctaText,
      imageUrl,
    } = body;
    if (!title || !date || !location || !hook || !ctaText) {
      return NextResponse.json(
        { error: "title, date, location, hook, and ctaText are required" },
        { status: 400 }
      );
    }
    const row = await upsertNextEvent({
      title,
      date,
      time: time ?? null,
      location,
      hook,
      cta_text: ctaText,
      image_url: imageUrl ?? null,
    });
    return NextResponse.json({
      title: row.title,
      date: row.date,
      time: row.time,
      location: row.location,
      hook: row.hook,
      ctaText: row.cta_text,
      imageUrl: row.image_url ?? undefined,
    });
  } catch (err) {
    console.error("Next event update error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update" },
      { status: 500 }
    );
  }
}
