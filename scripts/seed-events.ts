/**
 * Seed the events table from src/data/site-data.json.
 * Run from project root: npx tsx scripts/seed-events.ts
 * Requires POSTGRES_URL (or .env.local) to be set.
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { createEvent, getEventBySlug } from "../src/lib/db";

// Load .env.local so POSTGRES_URL is set
function loadEnvLocal() {
  try {
    const envPath = resolve(process.cwd(), ".env.local");
    const content = readFileSync(envPath, "utf8");
    content.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const idx = trimmed.indexOf("=");
        if (idx > 0) {
          const key = trimmed.slice(0, idx).trim();
          let value = trimmed.slice(idx + 1).trim();
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))
            value = value.slice(1, -1);
          process.env[key] = value;
        }
      }
    });
  } catch {
    // .env.local optional if env already set
  }
}

loadEnvLocal();

type SiteEvent = {
  slug: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  status: string;
  coverImage: string;
  description: string;
  images: string[];
};

async function main() {
  const path = resolve(process.cwd(), "src/data/site-data.json");
  const json = readFileSync(path, "utf8");
  const data = JSON.parse(json) as { events: SiteEvent[] };
  const events = data.events ?? [];

  if (events.length === 0) {
    console.log("No events in site-data.json");
    process.exit(0);
  }

  let created = 0;
  let skipped = 0;

  for (const e of events) {
    const existing = await getEventBySlug(e.slug);
    if (existing) {
      console.log("Skip (exists):", e.slug);
      skipped++;
      continue;
    }
    await createEvent({
      slug: e.slug,
      title: e.title,
      date: e.date,
      location: e.location,
      attendees: e.attendees ?? 0,
      status: e.status ?? "past",
      cover_image: e.coverImage ?? null,
      description: e.description,
      images: Array.isArray(e.images) ? e.images : [],
    });
    console.log("Created:", e.slug, "(" + (e.images?.length ?? 0) + " images)");
    created++;
  }

  console.log("\nDone. Created:", created, "Skipped:", skipped);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
