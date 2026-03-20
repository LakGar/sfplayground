import { getBlogPosts } from "@/lib/db";
import type { Metadata } from "next";
import BlogIndexView, { type BlogIndexPost } from "./blog-index-view";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | SF Playground",
  description:
    "Updates, stories, and insights from SF Playground — live startup pitches and real investor decisions.",
  alternates: {
    canonical: "https://sfplayground.com/blog",
  },
};

function serializePosts(
  posts: Awaited<ReturnType<typeof getBlogPosts>>,
): BlogIndexPost[] {
  return posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    image_url: p.image_url,
    published_at: p.published_at?.toISOString() ?? null,
  }));
}

export default async function BlogPage() {
  const posts = await getBlogPosts(true);
  return <BlogIndexView posts={serializePosts(posts)} />;
}
