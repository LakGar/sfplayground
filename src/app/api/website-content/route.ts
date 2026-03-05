import { getWebsiteContent } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = await getWebsiteContent();
    return NextResponse.json(content);
  } catch (err) {
    console.error("Website content fetch error:", err);
    return NextResponse.json({}, { status: 200 });
  }
}
