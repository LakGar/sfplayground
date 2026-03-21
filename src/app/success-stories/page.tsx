import Nav from "@/component/landing-main/nav";
import Footer from "@/component/landing-main/footer";
import { InnerPageHero } from "@/component/landing-main/inner-page-hero";
import type { Metadata } from "next";
import siteData from "@/data/site-data.json";
import { getSuccessStories } from "@/lib/db";
import {
  convertGoogleDriveImageUrl,
  getProxiedImageUrl,
  isGoogleDriveImageUrl,
} from "@/utils/convertDriveImageUrl";
import PortfolioDirectory, {
  type PortfolioCompany,
} from "./portfolio-directory";

export const metadata: Metadata = {
  title: "Portfolio | SF Playground",
  description:
    "Companies that pitched at SF Playground—searchable profiles, sectors, and outcomes from the floor.",
  alternates: {
    canonical: "https://sfplayground.com/success-stories",
  },
  openGraph: {
    title: "Portfolio | SF Playground",
    description:
      "Founders and startups from our live pitch room—search by name or sector.",
    url: "https://sfplayground.com/success-stories",
  },
};

export const dynamic = "force-dynamic";

const HERO_IMAGE = {
  src: "/showcase.jpg",
  alt: "Dimly lit venue — portfolio hero",
} as const;

type RawStory = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
};

/** Sector badge from copy (no extra DB column). Order: most specific first. */
function inferBadge(story: RawStory): string {
  const blob =
    `${story.title} ${story.tagline} ${story.description}`.toLowerCase();
  if (
    /robot|construction|rebar|humanoid|physical ai|job site|infra\b/.test(blob)
  ) {
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
  return "Portfolio";
}

function normalizeImageUrl(url: string): string {
  if (!url?.trim()) return "/logo.png";
  if (url.startsWith("/")) return url;
  const converted = convertGoogleDriveImageUrl(url, { w: 800 });
  if (isGoogleDriveImageUrl(converted)) return getProxiedImageUrl(url, { w: 800 });
  return converted;
}

function staticToRaw(
  raw: {
    slug: string;
    title: string;
    tagline: string;
    image: string;
    productSummary?: string;
  }[],
): RawStory[] {
  return raw.map((s) => ({
    slug: s.slug,
    title: s.title,
    tagline: s.tagline,
    image: s.image,
    description: s.productSummary ?? "",
  }));
}

function toPortfolioCompany(s: RawStory): PortfolioCompany {
  return {
    slug: s.slug,
    title: s.title,
    tagline: s.tagline,
    description: s.description,
    image: normalizeImageUrl(s.image),
    badge: inferBadge(s),
  };
}

export default async function SuccessStoriesPage() {
  let raw: RawStory[] = staticToRaw(
    siteData.successStories as Parameters<typeof staticToRaw>[0],
  );
  try {
    const dbStories = await getSuccessStories();
    if (dbStories.length > 0) {
      raw = dbStories.map((s) => ({
        slug: s.slug,
        title: s.title,
        tagline: s.tagline ?? "",
        description: s.description,
        image: s.image ?? "",
      }));
    }
  } catch {
    // fallback JSON
  }

  const companies = raw.map(toPortfolioCompany);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-black text-white">
      <Nav />

      <InnerPageHero
        variant="fullscreen"
        background="image"
        image={{ ...HERO_IMAGE, priority: true }}
      >
        <div className="flex flex-col items-center text-center">
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.38em] text-white/45">
            San Francisco · Portfolio
          </p>
          <h1 className="mx-auto max-w-5xl font-oswald text-[2.75rem] font-bold leading-[0.98] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-[4.75rem]">
            Companies
            <br />
            <span className="text-white/55">from our floor</span>
          </h1>
          <p className="mx-auto mt-10 max-w-xl text-pretty text-base leading-relaxed text-white/60 md:text-lg">
            Founders who demoed live at SF Playground—filter by sector or search
            by name. Every profile links to the full story.
          </p>
          <div className="mx-auto mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[10px] font-medium uppercase tracking-[0.28em] text-white/35">
            <span>Live pitch alumni</span>
            <span className="hidden sm:inline">·</span>
            <span>Searchable directory</span>
            <span className="hidden sm:inline">·</span>
            <span>SF builders</span>
          </div>
        </div>
      </InnerPageHero>

      <PortfolioDirectory companies={companies} />

      <Footer />
    </div>
  );
}
