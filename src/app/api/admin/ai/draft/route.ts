import { getSession } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export type DraftType = "newsletter" | "blog";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey?.trim()) {
    return NextResponse.json(
      { error: "OpenRouter API key not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { type, startingPoint } = body as {
      type?: DraftType;
      startingPoint?: string;
    };

    if (!type || (type !== "newsletter" && type !== "blog")) {
      return NextResponse.json(
        { error: "type must be 'newsletter' or 'blog'" },
        { status: 400 }
      );
    }
    const point = String(startingPoint ?? "").trim();
    if (!point) {
      return NextResponse.json(
        { error: "startingPoint is required" },
        { status: 400 }
      );
    }

    const prompt =
      type === "newsletter"
        ? newsletterPrompt(point)
        : blogPrompt(point);

    const res = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": request.nextUrl.origin,
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 4096,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("OpenRouter error:", res.status, errText);
      return NextResponse.json(
        { error: "AI service unavailable" },
        { status: 502 }
      );
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const raw =
      data.choices?.[0]?.message?.content?.trim() ?? "";

    const parsed = parseJsonBlock(raw);
    if (!parsed) {
      return NextResponse.json(
        { error: "Invalid AI response format" },
        { status: 502 }
      );
    }

    if (type === "newsletter") {
      const subject = parsed.subject ?? "";
      const body_html = parsed.body_html ?? "";
      return NextResponse.json({ subject, body_html });
    }

    const title = parsed.title ?? "";
    const slug = parsed.slug ?? "";
    const excerpt = parsed.excerpt ?? "";
    const bodyContent = parsed.body ?? "";
    return NextResponse.json({ title, slug, excerpt, body: bodyContent });
  } catch (err) {
    console.error("AI draft error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Draft failed" },
      { status: 500 }
    );
  }
}

function newsletterPrompt(startingPoint: string): string {
  return `You are drafting an email newsletter. The author gave this starting point or idea:

"""
${startingPoint}
"""

Respond with a single JSON object only, no markdown or code fence, with exactly these keys:
- "subject": string, compelling email subject line
- "body_html": string, full HTML body of the newsletter (use <p>, <h2>, <ul>, <a> etc.). Keep it concise and scannable.`;
}

function blogPrompt(startingPoint: string): string {
  return `You are drafting a blog post. The author gave this starting point or idea:

"""
${startingPoint}
"""

Respond with a single JSON object only, no markdown or code fence, with exactly these keys:
- "title": string, clear post title
- "slug": string, URL slug (lowercase, hyphens, no spaces)
- "excerpt": string, short summary 1-2 sentences
- "body": string, full post body in markdown (headings, lists, links, code blocks as needed).`;
}

function parseJsonBlock(raw: string): Record<string, string> | null {
  let jsonStr = raw;
  const codeMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeMatch) jsonStr = codeMatch[1].trim();
  try {
    const obj = JSON.parse(jsonStr);
    return obj && typeof obj === "object" ? obj : null;
  } catch {
    return null;
  }
}
