import { getSession } from "@/lib/admin-auth";
import { createSuccessStory, getSuccessStories } from "@/lib/db";
import { convertGoogleDriveImageUrl } from "@/utils/convertDriveImageUrl";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const stories = await getSuccessStories();
  return NextResponse.json(stories);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const slug = body.slug?.trim().toLowerCase().replace(/\s+/g, "-");
    if (!slug || !body.title || !body.description) {
      return NextResponse.json(
        { error: "slug, title, and description are required" },
        { status: 400 }
      );
    }
    const story = await createSuccessStory({
      slug,
      title: body.title,
      tagline: body.tagline ?? null,
      description: body.description,
      image: body.image ? convertGoogleDriveImageUrl(body.image) : null,
      challenge: body.challenge ?? null,
      challenge_points: body.challenge_points ?? [],
      our_role: body.our_role ?? null,
      role_points: body.role_points ?? [],
      experience: body.experience ?? null,
      impact: body.impact ?? null,
      impact_points: body.impact_points ?? [],
      founder_quote: body.founder_quote ?? null,
      attendee_quote: body.attendee_quote ?? null,
      founder_quote2: body.founder_quote2 ?? null,
      why_matters: body.why_matters ?? null,
    });
    return NextResponse.json(story);
  } catch (err) {
    console.error("Success story create error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create" },
      { status: 500 }
    );
  }
}
