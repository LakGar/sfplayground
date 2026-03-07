import { getBlogPostBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/component/landing/nav";
import Footer from "@/component/landing/footer";
import { BlogMarkdown } from "@/component/blog/BlogMarkdown";
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
    <div className="relative overflow-x-hidden bg-black min-h-screen">
      <Nav />

      <article className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 md:px-8 lg:px-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#19f7ea] font-oswald text-sm mb-10 transition-colors"
          >
            ← Blog
          </Link>

          {post.image_url && (
            <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-10 bg-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image_url}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-oswald font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            <time
              dateTime={post.published_at!.toISOString()}
              className="text-white/50 text-sm font-oswald"
            >
              {new Date(post.published_at!).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </header>

          <BlogMarkdown content={post.body} />
        </div>
      </article>

      <Footer />
    </div>
  );
}
