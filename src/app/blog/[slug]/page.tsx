import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { getBlogPostBySlug, getBlogPosts } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug, true);
  if (!post) return { title: "Blog | SFPLAYGROUND" };

  return {
    title: `${post.title} | SFPLAYGROUND`,
    description: post.excerpt ?? undefined,
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts(true);
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug, true);
  if (!post) notFound();

  return (
    <main className="min-h-svh bg-background">
      <article className="mx-auto max-w-3xl px-6 py-12">
        <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
          Back to blog
        </Link>
        <div className="mt-8 grid gap-4">
          <p className="text-sm text-muted-foreground">
            {post.published_at?.toLocaleDateString() ?? "Published"}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">{post.title}</h1>
          {post.excerpt ? <p className="text-lg text-muted-foreground">{post.excerpt}</p> : null}
        </div>
        {post.image_url ? (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg border bg-muted">
            <Image src={post.image_url} alt="" fill className="object-cover" priority />
          </div>
        ) : null}
        <div className="mt-8 space-y-5 text-base leading-8 [&_a]:underline [&_blockquote]:border-l [&_blockquote]:pl-4 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_h2]:pt-6 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:pt-4 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:ml-5 [&_ol]:list-decimal [&_pre]:overflow-auto [&_pre]:rounded-lg [&_pre]:bg-muted [&_pre]:p-4 [&_ul]:list-disc">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}

