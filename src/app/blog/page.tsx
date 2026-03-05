import { getBlogPosts } from "@/lib/db";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | SF Playground",
  description:
    "Updates, stories, and insights from SF Playground — live startup pitches and real investor decisions.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts(true);
  return (
    <div className="min-h-screen bg-black px-4 md:px-8 lg:px-12 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-oswald font-bold text-white mb-2">
          Blog
        </h1>
        <p className="text-white/60 font-oswald mb-10">
          Updates and insights from SF Playground.
        </p>
        {posts.length === 0 ? (
          <p className="text-white/50 font-oswald">No posts yet.</p>
        ) : (
          <ul className="space-y-6">
            {posts.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="block rounded-lg border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors"
                >
                  <h2 className="text-xl font-oswald font-bold text-white mb-2">
                    {p.title}
                  </h2>
                  {p.excerpt && (
                    <p className="text-white/60 text-sm font-oswald line-clamp-2 mb-2">
                      {p.excerpt}
                    </p>
                  )}
                  <time
                    dateTime={p.published_at!.toISOString()}
                    className="text-white/40 text-xs font-oswald"
                  >
                    {new Date(p.published_at!).toLocaleDateString()}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
