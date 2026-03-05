import { getSession } from "@/lib/admin-auth";
import { getSuccessStoryById, updateSuccessStory, deleteSuccessStory } from "@/lib/db";
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
  const storyId = Number(id);
  if (!Number.isInteger(storyId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const story = await getSuccessStoryById(storyId);
  if (!story) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(story);
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
  const storyId = Number(id);
  if (!Number.isInteger(storyId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  try {
    const body = await request.json();
    const story = await updateSuccessStory(storyId, {
      slug: body.slug,
      title: body.title,
      tagline: body.tagline,
      description: body.description,
      image: body.image,
      challenge: body.challenge,
      challenge_points: body.challenge_points,
      our_role: body.our_role,
      role_points: body.role_points,
      experience: body.experience,
      impact: body.impact,
      impact_points: body.impact_points,
      founder_quote: body.founder_quote,
      attendee_quote: body.attendee_quote,
      founder_quote2: body.founder_quote2,
      why_matters: body.why_matters,
    });
    if (!story) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(story);
  } catch (err) {
    console.error("Success story update error:", err);
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
  const storyId = Number(id);
  if (!Number.isInteger(storyId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const ok = await deleteSuccessStory(storyId);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
