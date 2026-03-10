import Link from "next/link";
import Nav from "@/component/landing/nav";
import Footer from "@/component/landing/footer";
import { getSuccessStoryBySlug } from "@/lib/db";
import siteData from "@/data/site-data.json";
import { SuccessStoryContent, type SuccessStoryData } from "./SuccessStoryContent";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

/** Shape of success story entries in site-data.json (fewer fields than full SuccessStoryData) */
type StaticSuccessStory = {
  slug: string;
  title: string;
  tagline: string;
  image: string;
  productSummary?: string;
  showcasedAtEvent?: string;
  howEventHelped?: string;
};

function mapStaticToStory(s: StaticSuccessStory): SuccessStoryData {
  return {
    slug: s.slug,
    title: s.title,
    tagline: s.tagline,
    image: s.image,
    description: s.productSummary ?? "",
    challenge: "",
    challengePoints: [],
    ourRole: "",
    rolePoints: [],
    experience: s.showcasedAtEvent ?? "",
    impact: s.howEventHelped ?? "",
    impactPoints: [],
    founderQuote: "",
    attendeeQuote: "",
    founderQuote2: "",
    whyMatters: "",
  };
}

function mapDbToStory(row: {
  slug: string;
  title: string;
  tagline: string | null;
  description: string;
  image: string | null;
  challenge: string | null;
  challenge_points: string[];
  our_role: string | null;
  role_points: string[];
  experience: string | null;
  impact: string | null;
  impact_points: string[];
  founder_quote: string | null;
  attendee_quote: string | null;
  founder_quote2: string | null;
  why_matters: string | null;
}): SuccessStoryData {
  return {
    slug: row.slug,
    title: row.title,
    tagline: row.tagline ?? "",
    description: row.description,
    image: row.image ?? "",
    challenge: row.challenge ?? "",
    challengePoints: row.challenge_points ?? [],
    ourRole: row.our_role ?? "",
    rolePoints: row.role_points ?? [],
    experience: row.experience ?? "",
    impact: row.impact ?? "",
    impactPoints: row.impact_points ?? [],
    founderQuote: row.founder_quote ?? "",
    attendeeQuote: row.attendee_quote ?? "",
    founderQuote2: row.founder_quote2 ?? "",
    whyMatters: row.why_matters ?? "",
  };
}

const staticBySlug: Record<string, SuccessStoryData> = Object.fromEntries(
  (siteData.successStories as StaticSuccessStory[]).map((s) => [s.slug, mapStaticToStory(s)])
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase().trim();
  const dbStory = await getSuccessStoryBySlug(normalizedSlug);
  const story = dbStory
    ? mapDbToStory(dbStory)
    : staticBySlug[normalizedSlug];
  if (!story) {
    return { title: "Story Not Found | SF Playground" };
  }
  return {
    title: `${story.title} | SF Playground Success Stories`,
    description: story.tagline || story.description,
  };
}

export default async function SuccessStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase().trim();
  const dbStory = await getSuccessStoryBySlug(normalizedSlug);
  const staticStory = staticBySlug[normalizedSlug];
  const story: SuccessStoryData | null = dbStory
    ? mapDbToStory(dbStory)
    : staticStory ?? null;

  if (!story) {
    return (
      <div className="relative overflow-x-hidden bg-black min-h-screen">
        <Nav />
        <div className="pt-24 pb-16 px-4 md:px-8 lg:px-12 text-center">
          <h1 className="text-4xl font-oswald text-white mb-4">
            Story Not Found
          </h1>
          <Link
            href="/success-stories"
            className="text-[#19f7ea] hover:underline font-oswald"
          >
            Back to Success Stories
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return <SuccessStoryContent story={story} />;
}
