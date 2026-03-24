import { getBlogPostBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/component/landing-main/nav";
import Footer from "@/component/landing-main/footer";
import { BlogMarkdown } from "@/component/blog/BlogMarkdown";
import { getProxiedImageUrl } from "@/utils/convertDriveImageUrl";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
    },
  };
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug, true);
  if (!post) notFound();

  const published = post.published_at!;
  const src = post.image_url
    ? getProxiedImageUrl(post.image_url, { w: 1600 })
    : null;

  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />

      <article>
        {/* Title band — dark, typeset like the blog index */}
        <header className="relative border-b border-white/[0.08] bg-neutral-950">
          <div className="landing-grain relative">
            <div className="mx-auto max-w-3xl px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pb-20">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-white/45 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-3 w-3" />
                Blog
              </Link>
              <div className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/40">
                  Post
                </p>
                <time
                  dateTime={published.toISOString()}
                  className="text-[10px] tabular-nums uppercase tracking-[0.22em] text-white/38"
                >
                  {formatDate(published)}
                </time>
              </div>
              <h1 className="mt-6 font-oswald text-[clamp(2rem,5.5vw,3.5rem)] font-bold leading-[0.98] tracking-[-0.04em] text-white">
                {post.title}
              </h1>
              {post.excerpt ? (
                <p className="mt-8 border-l-2 border-white/25 pl-5 text-pretty text-base leading-relaxed text-white/55 md:text-lg">
                  {post.excerpt}
                </p>
              ) : null}
            </div>
          </div>
        </header>

        {src ? (
          <figure className="mx-auto max-w-6xl px-0 sm:px-8 lg:px-10">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900 sm:aspect-[2/1]">
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width:1152px) 100vw, 1152px"
                priority
              />
            </div>
          </figure>
        ) : null}

        <div className="relative bg-neutral-950">
          <div className="landing-grain relative border-t border-white/[0.06]">
            <div className="mx-auto max-w-[40rem] px-5 py-16 sm:px-8 md:py-24 lg:px-10">
              <BlogMarkdown content={post.body} />
            </div>
          </div>
        </div>
      </article>

      <section className="bg-black text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:py-14 lg:px-10">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
              SF Playground
            </p>
            <p className="mt-2 font-oswald text-xl font-semibold md:text-2xl">
              More on the blog
            </p>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 border text-black border-white/10 bg-white/80 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-transparent hover:text-white rounded-xl"
          >
            All posts
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
