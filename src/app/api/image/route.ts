import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTS = ["drive.google.com", "www.googleapis.com"];

function isAllowedUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return ALLOWED_HOSTS.some((h) => u.hostname === h || u.hostname.endsWith(`.${h}`));
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }
  if (!isAllowedUrl(url)) {
    return NextResponse.json({ error: "URL not allowed" }, { status: 403 });
  }

  try {
    const res = await fetch(url, {
      headers: { Referer: "" },
      cache: "force-cache",
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Upstream error" }, { status: 502 });
    }
    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    const body = res.body;
    if (!body) {
      return NextResponse.json({ error: "No body" }, { status: 502 });
    }
    return new NextResponse(body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
        "Content-Disposition": "inline",
      },
    });
  } catch (e) {
    console.error("Image proxy error:", e);
    return NextResponse.json({ error: "Proxy error" }, { status: 502 });
  }
}
