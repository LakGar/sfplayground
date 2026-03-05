import { getSession } from "@/lib/admin-auth";
import { createNewsletterDraft } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { subject, body_html } = body;
    if (!subject || !body_html) {
      return NextResponse.json(
        { error: "subject and body_html are required" },
        { status: 400 }
      );
    }
    const draft = await createNewsletterDraft({ subject, body_html });
    return NextResponse.json(draft);
  } catch (err) {
    console.error("Newsletter draft create error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create draft" },
      { status: 500 }
    );
  }
}
