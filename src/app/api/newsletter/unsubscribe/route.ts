import { deleteSubscriberByEmail } from "@/lib/db";
import { verifyUnsubscribeToken } from "@/lib/newsletter-unsubscribe";
import { NextRequest, NextResponse } from "next/server";

function htmlPage({
  title,
  message,
  ok,
}: {
  title: string;
  message: string;
  ok: boolean;
}) {
  const accent = ok ? "#a7f3d0" : "#fecaca";
  const pill = ok ? "Unsubscribed" : "Could not unsubscribe";
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body style="margin:0;background:#030712;color:#f8fafc;font-family:Inter,Arial,sans-serif;">
    <main style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;">
      <section style="width:100%;max-width:560px;background:linear-gradient(160deg,#0b1220,#111827);border:1px solid rgba(255,255,255,.12);border-radius:20px;overflow:hidden;">
        <header style="padding:20px 24px;border-bottom:1px solid rgba(255,255,255,.08);">
          <p style="margin:0 0 10px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#94a3b8;">SF Playground</p>
          <span style="display:inline-block;padding:5px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.16);font-size:12px;color:${accent};">${pill}</span>
        </header>
        <div style="padding:24px;">
          <h1 style="margin:0 0 8px;font-size:26px;line-height:1.2;">${title}</h1>
          <p style="margin:0;color:#cbd5e1;line-height:1.65;">${message}</p>
          <div style="margin-top:18px;">
            <a href="/" style="display:inline-block;padding:10px 14px;border-radius:10px;background:#e2e8f0;color:#0f172a;text-decoration:none;font-weight:600;font-size:14px;">Back to SF Playground</a>
          </div>
        </div>
      </section>
    </main>
  </body>
</html>`;
}

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email") ?? "";
  const token = request.nextUrl.searchParams.get("token") ?? "";

  if (!email || !email.includes("@") || !token) {
    return new NextResponse(
      htmlPage({
        title: "Invalid Unsubscribe Link",
        message:
          "This link is missing information or has been changed. Please use the unsubscribe link directly from your latest email.",
        ok: false,
      }),
      {
        status: 400,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }

  if (!verifyUnsubscribeToken(email, token)) {
    return new NextResponse(
      htmlPage({
        title: "Link Expired or Invalid",
        message:
          "Your unsubscribe token could not be verified. Request a new email and try the unsubscribe link again.",
        ok: false,
      }),
      {
        status: 400,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }

  await deleteSubscriberByEmail(email);
  return new NextResponse(
    htmlPage({
      title: "You're Unsubscribed",
      message:
        "You will no longer receive SF Playground newsletter emails at this address.",
      ok: true,
    }),
    {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
}
