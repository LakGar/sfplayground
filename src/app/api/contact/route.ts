import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { getTeamRecipients, SFPLAYGROUND_FROM } from "@/lib/team-email";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MIN_FORM_FILL_MS = 2500;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore: Map<string, RateLimitEntry> =
  (globalThis as { __contactRateLimitStore?: Map<string, RateLimitEntry> })
    .__contactRateLimitStore ??
  new Map<string, RateLimitEntry>();

if (!(globalThis as { __contactRateLimitStore?: Map<string, RateLimitEntry> }).__contactRateLimitStore) {
  (globalThis as { __contactRateLimitStore?: Map<string, RateLimitEntry> }).__contactRateLimitStore =
    rateLimitStore;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);
  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }
  existing.count += 1;
  rateLimitStore.set(ip, existing);
  return existing.count > RATE_LIMIT_MAX_REQUESTS;
}

function isRealisticName(name: string): boolean {
  const normalized = name.trim().replace(/\s+/g, " ");
  if (normalized.length < 4 || normalized.length > 80) return false;
  const parts = normalized.split(" ").filter(Boolean);
  if (parts.length < 2) return false;
  if (!/^[a-zA-Z][a-zA-Z' -]+$/.test(normalized)) return false;
  if (/(.)\1\1/i.test(normalized)) return false;
  return parts.every((part) => /^[a-zA-Z][a-zA-Z'-]{1,}$/.test(part));
}

function isRealisticMessage(message: string): boolean {
  const trimmed = message.trim();
  if (trimmed.length < 30 || trimmed.length > 2000) return false;
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length < 6) return false;
  if (!/[a-zA-Z]/.test(trimmed)) return false;
  const urlCount = (trimmed.match(/https?:\/\//gi) ?? []).length;
  if (urlCount > 2) return false;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const resend = process.env.RESEND_API_KEY
      ? new Resend(process.env.RESEND_API_KEY)
      : null;

    const body = await request.json();
    const {
      name,
      email,
      phone,
      coachingPlan,
      message,
      website,
      formStartedAt,
    }: {
      name?: string;
      email?: string;
      phone?: string;
      coachingPlan?: string;
      message?: string;
      website?: string;
      formStartedAt?: number | string;
    } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }
    if (website && String(website).trim().length > 0) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    const startedAt = Number(formStartedAt);
    if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FORM_FILL_MS) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    const safeName = name.trim().replace(/\s+/g, " ");
    const safeEmail = email.trim().toLowerCase();
    const safePhone = phone?.trim() ?? "";
    const safeCoachingPlan = coachingPlan?.trim() ?? "";
    const safeMessage = message.trim();

    if (!isRealisticName(safeName)) {
      return NextResponse.json(
        { error: "Please enter your full name (first and last)." },
        { status: 400 },
      );
    }
    if (!isRealisticMessage(safeMessage)) {
      return NextResponse.json(
        { error: "Please provide a detailed message so we can help." },
        { status: 400 },
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 },
      );
    }

    if (resend) {
      const notificationEmail = await resend.emails.send({
        from: SFPLAYGROUND_FROM,
        to: getTeamRecipients(),
        replyTo: safeEmail,
        subject: `New Contact Form: ${safeName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
            <h2 style="color: #ffffff;">New Contact Form Submission</h2>
            <div style="background: #f5f5f5; padding: 18px 20px; border-radius: 8px; margin: 18px 0;">
              <p><strong>Name:</strong> ${safeName}</p>
              <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
              ${safePhone ? `<p><strong>Phone:</strong> ${safePhone}</p>` : ""}
              ${
                safeCoachingPlan
                  ? `<p><strong>Coaching plan:</strong> ${safeCoachingPlan}</p>`
                  : ""
              }
              <p><strong>IP:</strong> ${clientIp}</p>
            </div>
            <div style="background: #f5f5f5; padding: 18px 20px; border-radius: 8px; margin: 18px 0;">
              <h3 style="margin-top: 0;">Message</h3>
              <p style="white-space: pre-wrap; margin-bottom: 0;">${safeMessage}</p>
            </div>
          </div>
        `,
      });

      console.log(
        "Contact notification email sent to team recipients:",
        notificationEmail,
      );

      // Confirmation email to the submitter
      await resend.emails.send({
        from: SFPLAYGROUND_FROM,
        to: safeEmail,
        subject: "Thanks for reaching out to SF Playground",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #ffffff;">Thanks, ${safeName}!</h2>
            <p>We&apos;ve received your message and will get back to you soon.</p>
            <p style="color: #666; font-size: 14px;">
              Best regards,<br />
              The SF Playground Team
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json(
      { message: "Message sent successfully", success: true },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in contact route:", error);
    return NextResponse.json(
      {
        error: "Failed to send message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

