import { getBlogPosts } from "@/lib/db";
import Link from "next/link";
import Nav from "@/component/landing/nav";
import Footer from "@/component/landing/footer";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | SF Playground",
  description:
    "Updates, stories, and insights from SF Playground — live startup pitches and real investor decisions.",
  alternates: {
    canonical: "https://sfplayground.com/blog",
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts(true);
  return (
    <div className="relative overflow-x-hidden bg-black min-h-screen">
      <Nav />

      <div className="pt-24 pb-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <header className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-oswald font-bold text-white mb-3">
              Blog
            </h1>
            <p className="text-white/60 font-oswald text-lg max-w-xl mx-auto">
              Updates and insights from SF Playground.
            </p>
          </header>

          {posts.length === 0 ? (
            <p className="text-white/50 font-oswald text-center py-12">
              No posts yet.
            </p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group block rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-[#19f7ea]/30 hover:bg-white/[0.06] transition-all duration-300"
                  >
                    <div className="relative aspect-video w-full bg-white/5 overflow-hidden">
                      {p.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.image_url}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white/20 font-oswald text-4xl">
                            SF
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-oswald font-bold text-white mb-2 group-hover:text-[#19f7ea] transition-colors line-clamp-2">
                        {p.title}
                      </h2>
                      {p.excerpt && (
                        <p className="text-white/60 text-sm font-oswald line-clamp-2 mb-3">
                          {p.excerpt}
                        </p>
                      )}
                      <time
                        dateTime={p.published_at!.toISOString()}
                        className="text-white/40 text-xs font-oswald"
                      >
                        {new Date(p.published_at!).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
