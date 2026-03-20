import Link from "next/link";
import Image from "next/image";
import Nav from "@/component/landing-main/nav";
import Footer from "@/component/landing-main/footer";
import { InnerPageHero } from "@/component/landing-main/inner-page-hero";
import { ArrowRight } from "lucide-react";
import { getProxiedImageUrl } from "@/utils/convertDriveImageUrl";

export type BlogIndexPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  image_url: string | null;
  published_at: string | null;
};

/** Same hero treatment as About (`about-view.tsx`) — fullscreen image + centered type. */
const HERO_IMAGE = {
  src: "/blog-hero.jpg",
  alt: "Dimly lit conference hall with stage lighting and audience seating",
} as const;

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogIndexView({ posts }: { posts: BlogIndexPost[] }) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-black text-white">
      <Nav />

      {/* Same pattern as About hero: InnerPageHero fullscreen + centered stack */}
      <InnerPageHero
        variant="fullscreen"
        background="image"
        image={{ ...HERO_IMAGE, priority: true }}
      >
        <div className="flex flex-col items-center text-center">
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.38em] text-white/45">
            San Francisco · Blog
          </p>
          <h1 className="mx-auto max-w-5xl font-oswald text-[2.75rem] font-bold leading-[0.98] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-[4.75rem]">
            Notes from
            <br />
            <span className="text-white/55">the room</span>
            <br />
            and the floor.
          </h1>
          <p className="mx-auto mt-10 max-w-xl text-pretty text-base leading-relaxed text-white/60 md:text-lg">
            Longer reads on live pitches, crowd signal, and the physical
            series—same voice as the room, on the page.
          </p>
          <div className="mx-auto mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[10px] font-medium uppercase tracking-[0.28em] text-white/35">
            <span>SF Playground</span>
            <span className="hidden sm:inline">·</span>
            <span>Editorial</span>
            <span className="hidden sm:inline">·</span>
            <span>Est. community series</span>
          </div>
        </div>
      </InnerPageHero>

      {/* Index */}
      <section className="border-t border-white/[0.08] bg-black">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20 lg:px-10">
          <div className="flex flex-col gap-2 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/40">
                Archive
              </p>
              <h2 className="mt-2 font-oswald text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
                All posts
              </h2>
            </div>
            <p className="text-sm text-white/45">
              Newest first. Images only when the post has a cover in the CMS.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="py-16 text-center text-sm text-white/40">
              Nothing published yet.
            </p>
          ) : (
            <ul className="divide-y divide-white/[0.08]">
              {posts.map((p, idx) => (
                <li key={p.id}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex flex-col gap-6 rounded-2xl py-10 transition-colors hover:bg-white/[0.03] sm:flex-row sm:items-stretch sm:gap-8 sm:py-12 md:gap-10"
                  >
                    <div className="flex shrink-0 gap-5 sm:w-44 md:w-52">
                      <span className="font-oswald text-3xl font-light tabular-nums leading-none text-white/[0.13] md:text-4xl">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      {p.image_url ? (
                        <div className="relative aspect-[4/3] w-full max-w-[200px] overflow-hidden rounded-xl bg-neutral-900 sm:max-w-none sm:flex-1">
                          <Image
                            src={getProxiedImageUrl(p.image_url)}
                            alt=""
                            fill
                            className="object-cover transition duration-500 group-hover:scale-[1.03]"
                            sizes="200px"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="hidden h-full min-h-[4.5rem] flex-1 border border-dashed border-white/10 sm:block" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        {p.published_at ? (
                          <time
                            dateTime={p.published_at}
                            className="text-[10px] tabular-nums uppercase tracking-[0.22em] text-white/40"
                          >
                            {formatDate(p.published_at)}
                          </time>
                        ) : null}
                        {idx === 0 ? (
                          <span className="bg-white/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/70">
                            Latest
                          </span>
                        ) : null}
                      </div>
                      <h3 className="mt-3 font-oswald text-2xl font-medium leading-[1.1] tracking-[-0.02em] text-white transition-colors group-hover:text-white/85 md:text-3xl">
                        {p.title}
                      </h3>
                      {p.excerpt ? (
                        <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-white/45">
                          {p.excerpt}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex shrink-0 items-center sm:items-end sm:pb-1">
                      <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 transition-colors group-hover:text-white">
                        Open
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
