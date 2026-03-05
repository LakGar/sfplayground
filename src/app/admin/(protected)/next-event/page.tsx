import { getNextEvent } from "@/lib/db";
import siteData from "@/data/site-data.json";
import { NextEventForm } from "./NextEventForm";

export const dynamic = "force-dynamic";

const fallback = siteData.nextEvent as {
  title: string;
  date: string;
  time: string;
  location: string;
  hook: string;
  ctaText: string;
  imageUrl?: string;
};

export default async function AdminNextEventPage() {
  const row = await getNextEvent();
  const initial = row
    ? {
        title: row.title,
        date: row.date,
        time: row.time ?? "",
        location: row.location,
        hook: row.hook,
        ctaText: row.cta_text,
        imageUrl: row.image_url ?? undefined,
      }
    : { ...fallback, imageUrl: fallback.imageUrl ?? "" };

  return (
    <div>
      <h1 className="text-2xl font-oswald font-bold text-white mb-6">
        Next event
      </h1>
      <p className="text-white/60 text-sm mb-6">
        Edit the block shown under the hero on the homepage.
      </p>
      <NextEventForm initial={initial} />
    </div>
  );
}
