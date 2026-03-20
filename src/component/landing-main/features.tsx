"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getProxiedImageUrl } from "@/utils/convertDriveImageUrl";

const featureSections = [
  {
    image:
      "https://drive.google.com/thumbnail?id=1q7l0z75Fh7FY7CqF_T0QtDGN4bBq369V&sz=w2000",
    textOne: `SF Playground was built after seeing how many strong Physical AI founders`,
    textTwo: `struggled to gain real visibility, signal, and meaningful investor access.`,
  },
  {
    image:
      "https://drive.google.com/thumbnail?id=1EmPGUJXndScOSNLLDXJTp_0O6EUqUzj8&sz=w2000",
    textOne: `We create live environments where innovation is demonstrated in real time`,
    textTwo: `so founders can generate momentum, conviction, and investor attention.`,
  },
  {
    image:
      "https://drive.google.com/thumbnail?id=1rjtcqz-O2o_0R6JFXv34h9VCx7s8mX36&sz=w2000",
    textOne: `Our model blends technical rigor with crowd-driven validation`,
    textTwo: `helping startups build credibility before capital enters the room.`,
  },
  {
    image:
      "https://drive.google.com/thumbnail?id=1zNi50nX4lS01uDR9ALRtv27BQ4kHD5Jk&sz=w2000",
    textOne: `We bias toward physical demos, real presence, and founder execution`,
    textTwo: `because trust compounds fastest when innovation is experienced live.`,
  },
];

/** ~420px display — 800w Drive thumbs load much faster than w2000 */
function featureImageSrc(raw: string): string {
  return getProxiedImageUrl(raw, { w: 800 });
}

export function Features() {
  const [activeIndex, setActiveIndex] = useState(0);
  const textBlockRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const blocks = textBlockRefs.current.filter(
      (el): el is HTMLDivElement => el !== null,
    );
    if (blocks.length === 0) return;

    const updateActiveFromCenter = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIdx = 0;
      let minDistance = Number.POSITIVE_INFINITY;

      blocks.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const blockCenter = rect.top + rect.height / 2;
        const distance = Math.abs(blockCenter - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveIndex(closestIdx);
    };

    updateActiveFromCenter();
    window.addEventListener("scroll", updateActiveFromCenter, {
      passive: true,
    });
    window.addEventListener("resize", updateActiveFromCenter, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateActiveFromCenter);
      window.removeEventListener("resize", updateActiveFromCenter);
    };
  }, []);

  const active = featureSections[activeIndex];

  return (
    <section className="relative w-full bg-black text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="md:hidden">
        <div className="flex w-full flex-col gap-px bg-white/[0.06]">
          {featureSections.map((s, idx) => (
            <div key={idx} className="bg-black px-4 py-12">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/35">
                {String(idx + 1).padStart(2, "0")}
              </p>
              <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={featureImageSrc(s.image)}
                  alt=""
                  width={800}
                  height={520}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
              </div>
              <p className="text-pretty text-xl font-light leading-snug text-white md:text-2xl">
                {s.textOne} <span className="text-white/45">{s.textTwo}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:block">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="border-b border-white/[0.06] py-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
              Thesis
            </p>
            <p className="mt-3 max-w-xl font-oswald text-2xl font-medium leading-snug tracking-[-0.01em] text-white/90">
              Why we bias toward live demos, physical presence, and rooms that
              compound trust.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-10 lg:gap-14">
            <div className="col-span-7">
              {featureSections.map((item, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    textBlockRefs.current[idx] = el;
                  }}
                  className="flex min-h-screen items-center border-b border-white/[0.06] py-16 last:border-b-0"
                >
                  <div>
                    <span className="font-oswald text-sm tabular-nums text-white/25">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-4 text-pretty text-3xl font-light leading-[1.25] text-white lg:text-[2.15rem] lg:leading-snug">
                      {item.textOne}{" "}
                      <span className="text-white/45">{item.textTwo}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-span-5">
              <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-center justify-center">
                <div className="flex w-full justify-center transition-opacity duration-500">
                  {active ? (
                    <div className="relative w-full max-w-[420px]">
                      <div className="absolute -inset-3 -z-10 bg-white/[0.02]" />
                      <Image
                        src={featureImageSrc(active.image)}
                        alt=""
                        width={800}
                        height={520}
                        className="h-[260px] w-full rounded-xl object-cover md:h-[340px]"
                        sizes="(max-width: 1024px) 90vw, 420px"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
