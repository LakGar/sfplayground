import { getNextEvent } from "@/lib/db";
import { NextResponse } from "next/server";
import siteData from "@/data/site-data.json";

const fallback = siteData.nextEvent as {
  title: string;
  date: string;
  time: string;
  location: string;
  hook: string;
  ctaText: string;
};

export async function GET() {
  try {
    const row = await getNextEvent();
    if (row) {
      return NextResponse.json({
        title: row.title,
        date: row.date,
        time: row.time,
        location: row.location,
        hook: row.hook,
        ctaText: row.cta_text,
        imageUrl: row.image_url ?? undefined,
      });
    }
  } catch (err) {
    console.error("Next event fetch error:", err);
  }
  return NextResponse.json({
    title: fallback.title,
    date: fallback.date,
    time: fallback.time ?? "",
    location: fallback.location,
    hook: fallback.hook,
    ctaText: fallback.ctaText,
    imageUrl: undefined,
  });
}
