import { getSession } from "@/lib/admin-auth";
import {
  getNewsletterDraftById,
  getSubscribers,
  recordNewsletterSend,
} from "@/lib/db";
import { createUnsubscribeToken } from "@/lib/newsletter-unsubscribe";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<li>/gi, "- ")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function withTheme(htmlBody: string, unsubscribeUrl: string): string {
  return `
  <div style="margin:0;padding:24px 12px;background:#05070d;">
    <div style="max-width:620px;margin:0 auto;border:1px solid rgba(255,255,255,.12);border-radius:18px;overflow:hidden;background:#0b1020;">
      <div style="padding:24px 24px 18px;background:linear-gradient(135deg,#111827 0%,#0f172a 40%,#1e293b 100%);border-bottom:1px solid rgba(255,255,255,.08);">
        <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#cbd5e1;">SF Playground</p>
        <h1 style="margin:10px 0 0;font-family:Arial,sans-serif;font-size:22px;line-height:1.2;color:#f8fafc;">Community Update</h1>
      </div>
      <div style="padding:22px 24px;font-family:Arial,sans-serif;color:#e2e8f0;font-size:15px;line-height:1.65;">
        ${htmlBody}
      </div>
      <div style="padding:16px 24px 22px;border-top:1px solid rgba(255,255,255,.08);font-family:Arial,sans-serif;">
        <p style="margin:0 0 8px;color:#94a3b8;font-size:12px;line-height:1.5;">
          You are receiving this because you subscribed to SF Playground updates.
        </p>
        <p style="margin:0;">
          <a href="${unsubscribeUrl}" style="font-size:12px;color:#cbd5e1;text-decoration:underline;">Unsubscribe</a>
        </p>
      </div>
    </div>
  </div>`;
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { draftId, recipientIds } = body as {
      draftId?: number | string;
      recipientIds?: number[];
    };
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
    const allSubscribers = await getSubscribers();
    if (allSubscribers.length === 0) {
      return NextResponse.json(
        { error: "No subscribers to send to" },
        { status: 400 }
      );
    }
    const filteredSubscribers =
      Array.isArray(recipientIds) && recipientIds.length > 0
        ? allSubscribers.filter((s) => recipientIds.includes(s.id))
        : allSubscribers;
    if (filteredSubscribers.length === 0) {
      return NextResponse.json(
        { error: "No matching recipients selected" },
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
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
      "https://sfplayground.com";
    const baseText = htmlToText(draft.body_html);

    let sent = 0;
    const errors: string[] = [];
    for (const sub of filteredSubscribers) {
      try {
        const token = createUnsubscribeToken(sub.email);
        const unsubscribeUrl = `${appUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(
          sub.email
        )}&token=${token}`;
        const htmlWithFooter = withTheme(draft.body_html, unsubscribeUrl);
        await resend.emails.send({
          from: "SF Playground <hello@sfplayground.com>",
          to: sub.email,
          subject: draft.subject,
          html: htmlWithFooter,
          text: `${baseText}\n\nUnsubscribe: ${unsubscribeUrl}`,
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
      message: `Sent to ${sent} of ${filteredSubscribers.length} selected recipients.`,
      sent,
      total: filteredSubscribers.length,
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
