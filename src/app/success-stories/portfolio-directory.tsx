"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export type PortfolioCompany = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  badge: string;
};

function imageNeedsUnoptimized(src: string) {
  return (
    src.includes("drive.google.com") ||
    src.startsWith("/api/") ||
    src.includes("googleusercontent.com")
  );
}

export default function PortfolioDirectory({
  companies,
}: {
  companies: PortfolioCompany[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const set = new Set(companies.map((c) => c.badge));
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [companies]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return companies.filter((c) => {
      if (category !== "all" && c.badge !== category) return false;
      if (!q) return true;
      const blob =
        `${c.title} ${c.tagline} ${c.description} ${c.slug} ${c.badge}`.toLowerCase();
      return blob.includes(q);
    });
  }, [companies, query, category]);

  return (
    <section className=" border-white/[0.08] bg-black">
      {/* Directory toolbar — Founders-directory style */}
      <div className="sticky top-0 z-30 border-b border-white/10 bg-black/68 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-5 md:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by company, sector, or keyword…"
                className="w-full rounded-xl border border-white/15 bg-white/[0.06] py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-white/40"
                aria-label="Search portfolio companies"
              />
            </div>
            <p className="shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              <span className="tabular-nums text-white/70">
                {filtered.length}
              </span>
              <span className="mx-2 text-white/25">/</span>
              {companies.length} companies
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors",
                  category === cat
                    ? "border-white bg-white text-black"
                    : "border-white/20 text-white/55 hover:border-white/40 hover:text-white",
                )}
              >
                {cat === "all" ? "All sectors" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 py-20 text-center">
            <p className="font-oswald text-xl text-white/80 md:text-2xl">
              No companies match
            </p>
            <p className="mt-2 text-sm text-white/45">
              Try another search or sector filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
              className="mt-6 rounded-xl border border-white/25 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/success-stories/${c.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-neutral-950/40 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.03]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 50vw, (max-width: 1280px) 50vw, 33vw"
                      unoptimized={imageNeedsUnoptimized(c.image)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-black/8 to-transparent opacity-95" />
                    <span className="absolute left-3 top-3 rounded-md border border-white/28 bg-black/45 px-2 py-0.5 text-[6px] font-semibold uppercase tracking-[0.14em] text-white/95 backdrop-blur-sm sm:left-3 sm:top-3 sm:px-2.5 sm:py-1  sm:tracking-[0.2em]">
                      {c.badge}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-3 sm:p-5 md:p-6">
                    <h2 className="font-oswald text-base font-semibold leading-snug tracking-[-0.02em] text-white transition-colors group-hover:text-white/90 sm:text-xl md:text-2xl">
                      {c.title}
                    </h2>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/50 sm:mt-2 sm:text-sm">
                      {c.tagline || c.description.slice(0, 120)}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-white/40 transition-colors group-hover:text-white sm:mt-5 sm:gap-2 sm:text-[10px] sm:tracking-[0.22em]">
                      View profile
                      <span
                        aria-hidden
                        className="transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
