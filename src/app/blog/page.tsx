import Image from "next/image";
import Link from "next/link";

import { getBlogPosts } from "@/lib/db";

export const metadata = {
  title: "Blog | SFPLAYGROUND",
  description: "Published SFPLAYGROUND essays, updates, and founder stories.",
};

export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  const posts = await getBlogPosts(true);

  return (
    <main className="min-h-svh bg-background">
      <section className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-16">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="SFPlayground"
            width={44}
            height={44}
            className="rounded-md object-contain"
          />
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">SFPlayground Blog</h1>
            <p className="text-muted-foreground">Published updates from the founder community.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              className="group overflow-hidden rounded-lg border bg-card transition hover:border-foreground/30"
            >
              {post.image_url ? (
                <div className="relative aspect-[16/9] bg-muted">
                  <Image src={post.image_url} alt="" fill className="object-cover" />
                </div>
              ) : null}
              <div className="grid gap-2 p-5">
                <p className="text-xs text-muted-foreground">
                  {post.published_at?.toLocaleDateString() ?? "Published"}
                </p>
                <h2 className="text-xl font-semibold group-hover:underline">{post.title}</h2>
                {post.excerpt ? <p className="text-sm text-muted-foreground">{post.excerpt}</p> : null}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

