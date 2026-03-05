import { getSession } from "@/lib/admin-auth";
import {
  getNewsletterDraftById,
  getSubscribers,
  recordNewsletterSend,
} from "@/lib/db";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { draftId } = body;
    if (!draftId) {
      return NextResponse.json(
        { error: "draftId is required" },
        { status: 400 }
      );
    }
    const draft = await getNewsletterDraftById(Number(draftId));
    if (!draft) {
      return NextResponse.json(
        { error: "Draft not found" },
        { status: 404 }
      );
    }
    const subscribers = await getSubscribers();
    if (subscribers.length === 0) {
      return NextResponse.json(
        { error: "No subscribers to send to" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "RESEND_API_KEY is not configured" },
        { status: 503 }
      );
    }
    const resend = new Resend(apiKey);

    let sent = 0;
    const errors: string[] = [];
    for (const sub of subscribers) {
      try {
        await resend.emails.send({
          from: "SF Playground <hello@sfplayground.com>",
          to: sub.email,
          subject: draft.subject,
          html: draft.body_html,
        });
        sent++;
      } catch (err) {
        errors.push(
          `${sub.email}: ${err instanceof Error ? err.message : "Unknown error"}`
        );
      }
    }

    await recordNewsletterSend(draft.id, sent);

    return NextResponse.json({
      message: `Sent to ${sent} of ${subscribers.length} subscribers.`,
      sent,
      total: subscribers.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err) {
    console.error("Newsletter send error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to send" },
      { status: 500 }
    );
  }
}
