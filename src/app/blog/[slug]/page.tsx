import { getBlogPostBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/component/landing/nav";
import Footer from "@/component/landing/footer";
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

          <div
            className="blog-body text-white/90 font-oswald leading-relaxed [&_a]:text-[#19f7ea] [&_a:hover]:underline [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:mb-1"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </div>
      </article>

      <Footer />
    </div>
  );
}
