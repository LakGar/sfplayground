import { getBlogPostBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug, true);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} | SF Playground Blog`,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug, true);
  if (!post) notFound();
  return (
    <div className="min-h-screen bg-black px-4 md:px-8 lg:px-12 py-16">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-block text-white/60 hover:text-[#19f7ea] font-oswald text-sm mb-8"
        >
          ← Blog
        </Link>
        <article>
          <h1 className="text-3xl md:text-4xl font-oswald font-bold text-white mb-4">
            {post.title}
          </h1>
          <time
            dateTime={post.published_at!.toISOString()}
            className="block text-white/50 text-sm font-oswald mb-8"
          >
            {new Date(post.published_at!).toLocaleDateString()}
          </time>
          <div
            className="prose prose-invert prose-headings:font-oswald prose-p:text-white/80 prose-a:text-[#19f7ea] max-w-none"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </article>
      </div>
    </div>
  );
}
