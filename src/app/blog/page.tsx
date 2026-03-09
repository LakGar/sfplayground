import { getBlogPosts } from "@/lib/db";
import Link from "next/link";
import Nav from "@/component/landing/nav";
import Footer from "@/component/landing/footer";
import { convertGoogleDriveImageUrl } from "@/utils/convertDriveImageUrl";
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
          <header className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-oswald font-bold text-white mb-4">
              Blog
            </h1>
            <p className="text-white/60 font-oswald text-xl max-w-xl mx-auto">
              Updates and insights from SF Playground.
            </p>
          </header>

          {posts.length === 0 ? (
            <p className="text-white/50 font-oswald text-center py-16 text-lg">
              No posts yet.
            </p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
              {posts.map((p) => (
                <li key={p.id} className="flex min-h-[320px] md:min-h-[380px]">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group relative flex w-full rounded-2xl border border-white/15 overflow-hidden hover:border-[#19f7ea]/40 transition-all duration-300"
                  >
                    {/* Image as background */}
                    <div className="absolute inset-0 bg-white/5">
                      {p.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={convertGoogleDriveImageUrl(p.image_url)}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <span className="text-white/20 font-oswald text-5xl">
                            SF
                          </span>
                        </div>
                      )}
                      {/* Gradient overlay so text is readable */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    </div>
                    {/* Text on top */}
                    <div className="relative z-10 flex flex-col justify-end p-8 min-h-full">
                      <h2 className="text-2xl md:text-3xl font-oswald font-bold text-white mb-3 group-hover:text-[#19f7ea] transition-colors line-clamp-2 leading-tight">
                        {p.title}
                      </h2>
                      {p.excerpt && (
                        <p className="text-white/80 text-base font-oswald line-clamp-2 mb-4">
                          {p.excerpt}
                        </p>
                      )}
                      <time
                        dateTime={p.created_at.toISOString()}
                        className="text-white/70 text-sm font-oswald"
                      >
                        {new Date(p.created_at).toLocaleDateString("en-US", {
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
