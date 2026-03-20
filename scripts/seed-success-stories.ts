/**
 * Upsert success_stories from scripts/data/pitch-playoffs-002-success-stories.json
 * (camelCase export shape → DB columns).
 *
 * Run: npm run seed:success-stories
 * Requires POSTGRES_URL in env or .env.local
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import {
  createSuccessStory,
  getSuccessStoryBySlug,
  updateSuccessStory,
} from "../src/lib/db";

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
          if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
          ) {
            value = value.slice(1, -1);
          }
          process.env[key] = value;
        }
      }
    });
  } catch {
    // optional
  }
}

loadEnvLocal();

type RawSuccessStory = {
  slug: string;
  title: string;
  tagline: string | null;
  description: string;
  imageUrl: string | null;
  challenge: string | null;
  challengePoints: string[];
  ourRole: string | null;
  rolePoints: string[];
  experience: string | null;
  impact: string | null;
  impactPoints: string[];
  founderQuote: string | null;
  attendeeQuote: string | null;
  founderQuote2: string | null;
  whyItMatters: string | null;
};

function toPayload(raw: RawSuccessStory) {
  const rawImage = raw.imageUrl;
  const trimmedImage =
    typeof rawImage === "string" ? rawImage.trim() : rawImage;

  // Interpret imageUrl rules:
  // - "" (empty string) => do NOT overwrite DB image (keep admin dashboard)
  // - null => explicitly clear DB image
  // - non-empty string => update DB image
  const shouldUpdateImage =
    trimmedImage === null
      ? true
      : typeof trimmedImage === "string"
        ? trimmedImage.length > 0
        : false;

  const image: string | null =
    trimmedImage === null ? null : trimmedImage && trimmedImage.length > 0 ? trimmedImage : null;

  return {
    slug: raw.slug,
    title: raw.title,
    tagline: raw.tagline,
    description: raw.description,
    image,
    shouldUpdateImage,
    challenge: raw.challenge,
    challenge_points: Array.isArray(raw.challengePoints) ? raw.challengePoints : [],
    our_role: raw.ourRole,
    role_points: Array.isArray(raw.rolePoints) ? raw.rolePoints : [],
    experience: raw.experience,
    impact: raw.impact,
    impact_points: Array.isArray(raw.impactPoints) ? raw.impactPoints : [],
    founder_quote: raw.founderQuote,
    attendee_quote: raw.attendeeQuote,
    founder_quote2: raw.founderQuote2,
    why_matters: raw.whyItMatters,
  };
}

async function main() {
  if (!process.env.POSTGRES_URL) {
    console.error("Missing POSTGRES_URL. Set it or add to .env.local");
    process.exit(1);
  }

  const path = resolve(
    process.cwd(),
    "scripts/data/pitch-playoffs-002-success-stories.json",
  );
  const stories = JSON.parse(readFileSync(path, "utf8")) as RawSuccessStory[];

  if (!Array.isArray(stories) || stories.length === 0) {
    console.log("No stories in JSON");
    process.exit(0);
  }

  let created = 0;
  let updated = 0;

  for (const raw of stories) {
    const p = toPayload(raw);
    const existing = await getSuccessStoryBySlug(p.slug);

    if (existing) {
      const updatePayload = {
        slug: p.slug,
        title: p.title,
        tagline: p.tagline,
        description: p.description,
        ...(p.shouldUpdateImage ? { image: p.image } : {}),
        challenge: p.challenge,
        challenge_points: p.challenge_points,
        our_role: p.our_role,
        role_points: p.role_points,
        experience: p.experience,
        impact: p.impact,
        impact_points: p.impact_points,
        founder_quote: p.founder_quote,
        attendee_quote: p.attendee_quote,
        founder_quote2: p.founder_quote2,
        why_matters: p.why_matters,
      };

      await updateSuccessStory(existing.id, {
        ...updatePayload,
      });
      console.log("Updated:", p.slug);
      updated++;
    } else {
      await createSuccessStory({
        slug: p.slug,
        title: p.title,
        tagline: p.tagline,
        description: p.description,
        image: p.image,
        challenge: p.challenge,
        challenge_points: p.challenge_points,
        our_role: p.our_role,
        role_points: p.role_points,
        experience: p.experience,
        impact: p.impact,
        impact_points: p.impact_points,
        founder_quote: p.founder_quote,
        attendee_quote: p.attendee_quote,
        founder_quote2: p.founder_quote2,
        why_matters: p.why_matters,
      });
      console.log("Created:", p.slug);
      created++;
    }
  }

  console.log(`Done. Created ${created}, updated ${updated}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
