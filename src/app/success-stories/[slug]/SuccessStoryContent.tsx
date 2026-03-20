"use client";

import Link from "next/link";
import { ArrowLeft, Quote } from "lucide-react";
import Nav from "@/component/landing-main/nav";
import Footer from "@/component/landing-main/footer";
import { InnerPageHero } from "@/component/landing-main/inner-page-hero";
import { SIGNUP_FORM_URL } from "@/data/constants";
import {
  convertGoogleDriveImageUrl,
  getProxiedImageUrl,
  isGoogleDriveImageUrl,
} from "@/utils/convertDriveImageUrl";
import { cn } from "@/lib/utils";

function hasContent(s: string | null | undefined): boolean {
  return typeof s === "string" && s.trim().length > 0;
}

function cleanPoints(points: string[] | undefined): string[] {
  return (points ?? []).map((p) => p.trim()).filter(Boolean);
}

function storyImageSrc(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";

  // Only proxy/show Google Drive images (Next/image + our `/api/image` proxy
  // are restricted). For other URLs, we treat it as "no image".
  const converted = convertGoogleDriveImageUrl(trimmed);
  return isGoogleDriveImageUrl(converted) ? getProxiedImageUrl(trimmed) : "";
}

function inferHeroBadge(story: SuccessStoryData): string | null {
  const blob = `${story.title} ${story.tagline} ${story.description} ${story.challenge} ${story.ourRole}`
    .toLowerCase();

  if (/robot|construction|rebar|humanoid|physical ai|job site|infra\b/.test(blob)) {
    return "Robotics & infra";
  }
  if (/pet|wearable|consumer|pov camera|storytelling app/.test(blob)) {
    return "Consumer";
  }
  if (/\bai\b|ml\b|llm|machine learning|neural|model/.test(blob)) {
    return "AI & ML";
  }
  if (/b2b|saas|enterprise|platform/.test(blob)) {
    return "B2B";
  }
  return null;
}

export type SuccessStoryData = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  challenge: string;
  challengePoints: string[];
  ourRole: string;
  rolePoints: string[];
  experience: string;
  impact: string;
  impactPoints: string[];
  founderQuote: string;
  attendeeQuote: string;
  founderQuote2: string;
  whyMatters: string;
};

function SectionCard({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "scroll-mt-28 mb-12 border-t border-white/10 pt-12",
        className,
      )}
    >
      <h2 className="font-oswald text-2xl font-medium tracking-tight text-white md:text-3xl">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-white/80">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="space-y-3">
      {items.map((point, i) => (
        <li
          key={i}
          className="flex gap-3 text-base leading-relaxed text-white/75"
        >
          <span
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/50"
            aria-hidden
          />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}

function QuoteStrip({
  quote,
  attribution,
}: {
  quote: string;
  attribution: string;
}) {
  return (
    <figure className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
      <Quote
        className="absolute right-4 top-4 h-16 w-16 -rotate-12 text-white/[0.06] md:h-20 md:w-20"
        aria-hidden
      />
      <blockquote className="relative text-lg font-light leading-relaxed text-white/90 md:text-xl">
        <p className="italic">&ldquo;{quote}&rdquo;</p>
      </blockquote>
      <figcaption className="relative mt-4 text-sm font-medium tracking-wide text-white/55">
        {attribution}
      </figcaption>
    </figure>
  );
}

export function SuccessStoryContent({ story }: { story: SuccessStoryData }) {
  const challengePoints = cleanPoints(story.challengePoints);
  const rolePoints = cleanPoints(story.rolePoints);
  const impactPoints = cleanPoints(story.impactPoints);

  const hasDescription = hasContent(story.description);
  const hasImage = hasContent(story.image) && storyImageSrc(story.image).length > 0;
  const heroBadge = inferHeroBadge(story);
  const hasChallenge =
    hasContent(story.challenge) || challengePoints.length > 0;
  const hasOurRole = hasContent(story.ourRole) || rolePoints.length > 0;
  const hasExperience = hasContent(story.experience);
  const hasImpact = hasContent(story.impact) || impactPoints.length > 0;
  const hasFounderQuote = hasContent(story.founderQuote);
  const hasAttendeeQuote = hasContent(story.attendeeQuote);
  const hasFounderQuote2 = hasContent(story.founderQuote2);
  const hasAnyQuote = hasFounderQuote || hasAttendeeQuote || hasFounderQuote2;
  const hasWhyMatters = hasContent(story.whyMatters);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#060606] text-white">
      <Nav />
      <InnerPageHero
        className="min-h-[440px] md:min-h-[500px]"
        scrimClassName="absolute inset-0 z-[5] bg-gradient-to-b from-black/80 via-black/65 to-black/90"
        contentWrapperClassName="!text-left px-1 pt-8 pb-14 md:pt-12 md:pb-16"
      >
        <Link
          href="/success-stories"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/65 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Portfolio
        </Link>

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-4xl">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75 backdrop-blur-md">
                Pitch Playoffs 002
              </span>
              {heroBadge ? (
                <span className="inline-flex items-center rounded-full bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  {heroBadge}
                </span>
              ) : null}
            </div>

            <h1 className="mb-4 font-oswald text-4xl font-medium leading-[1.05] text-white md:text-6xl lg:text-7xl">
              {story.title}
            </h1>
            {hasContent(story.tagline) ? (
              <p className="max-w-2xl text-xl font-light leading-snug text-white/75 md:text-2xl">
                {story.tagline}
              </p>
            ) : null}
          </div>

          {hasImage ? (
            <div className="w-full md:w-[380px]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  In the room
                </p>
                <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-xl bg-black/40">
                  <img
                    src={storyImageSrc(story.image)}
                    alt={`${story.title} — showcase`}
                    className="h-full w-full object-contain p-4"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </InnerPageHero>

      <div className="relative border-t border-white/10 bg-[#060606] px-4 pb-20 pt-10 md:px-8 md:pt-14">
        <div className="mx-auto max-w-3xl">
          {hasDescription ? (
            <header className="space-y-5">
              <p className="text-lg leading-relaxed text-white/82 md:text-xl">
                {story.description}
              </p>
              <p className="border-l-2 border-white/25 pl-4 text-sm leading-relaxed text-white/50">
                {story.title} was showcased at SF Playground—one of the most
                voted startups on the floor.
              </p>
            </header>
          ) : null}

          {/* Startup image moved into the hero for a cleaner, less repetitive layout. */}

          {hasChallenge ? (
            <SectionCard title="The challenge">
              {hasContent(story.challenge) ? (
                <p className="text-lg leading-relaxed">{story.challenge}</p>
              ) : null}
              <BulletList items={challengePoints} />
            </SectionCard>
          ) : null}

          {hasOurRole ? (
            <SectionCard title="Our role">
              {hasContent(story.ourRole) ? (
                <p className="text-lg leading-relaxed">{story.ourRole}</p>
              ) : null}
              <BulletList items={rolePoints} />
            </SectionCard>
          ) : null}

          {hasExperience ? (
            <SectionCard title="The experience">
              <div className="whitespace-pre-line text-lg leading-relaxed">
                {story.experience}
              </div>
            </SectionCard>
          ) : null}

          {hasImpact ? (
            <SectionCard title="The impact">
              {hasContent(story.impact) ? (
                <p className="text-lg leading-relaxed">{story.impact}</p>
              ) : null}
              <p className="text-base text-white/55">
                {story.title} left with real connections and momentum—not just
                a pitch slot.
              </p>
              <BulletList items={impactPoints} />
            </SectionCard>
          ) : null}

          {hasAnyQuote ? (
            <SectionCard title="Founder & Attendee Feedback">
              <div className="grid gap-4 md:grid-cols-2">
                {hasFounderQuote ? (
                  <QuoteStrip
                    quote={story.founderQuote}
                    attribution={`— ${story.title} team`}
                  />
                ) : null}
                {hasAttendeeQuote ? (
                  <QuoteStrip
                    quote={story.attendeeQuote}
                    attribution="— Event attendee"
                  />
                ) : null}
                {hasFounderQuote2 ? (
                  <QuoteStrip
                    quote={story.founderQuote2}
                    attribution="— Startup founder"
                  />
                ) : null}
              </div>
            </SectionCard>
          ) : null}

          {hasWhyMatters ? (
            <SectionCard title="Why this matters">
              <div className="whitespace-pre-line text-lg leading-relaxed">
                {story.whyMatters}
              </div>
            </SectionCard>
          ) : null}

          <div className="mt-16 border-t border-white/10 pt-8 text-center">
            <h3 className="mb-3 font-oswald text-2xl text-white md:text-3xl">
              Ready to write your success story?
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm text-white/55">
              Pitch live, get voted, and leave with introductions that turn into
              momentum.
            </p>
            <a
              href={SIGNUP_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-xl bg-white px-8 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Get on the list
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
