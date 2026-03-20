"use client";
import { Badge } from "@/components/ui/badge-1";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export const SuccessStories = () => {
  const stories = [
    {
      placement: "1st Place",
      variant: "turbo" as const,
      title: "PetPin AI",
      description:
        "Building AI-powered physical monitoring systems that improve pet safety through real-time tracking, behavioral intelligence, and connected hardware.",
      bullets: [
        "Real-time pet location and activity monitoring",
        "AI-driven behavioral and safety insights",
        "Hardware + software integrated pet safety system",
        "Designed to improve awareness and peace of mind for pet owners",
      ],
      imageSrc:
        "https://www.petpin.ai/_next/image?url=%2Fimages%2Fsection-2-beyond-tracking%2F1.png&w=828&q=90",
    },
    {
      placement: "2nd Place",
      variant: "turbo" as const,
      title: "HEAL",
      description:
        "A trusted continuous-care platform connecting patients, caregivers, and clinicians between visits through continuous support, adherence intelligence, and connected care.",
      bullets: [
        "Real-time emotional support between appointments",
        "Medication adherence intelligence with connected tracking",
        "Patients, caregivers, and clinicians stay aligned in one care loop",
        "Built to improve follow-through, visibility, and between-visit support",
      ],
      imageSrc: "/heal.png",
    },
    {
      placement: "3rd Place",
      variant: "turbo" as const,
      title: "AutoGenBots",
      description:
        "Building AI agent infrastructure that helps businesses automate workflows, decision-making, and operational processes through intelligent autonomous systems.",
      bullets: [
        "AI agents designed to automate complex business workflows",
        "Focused on operational efficiency and intelligent execution",
        "Infrastructure for deploying and managing autonomous systems",
        "Built to enable scalable AI-driven automation across industries",
      ],
      imageSrc: "/autogenbot.jpg",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFloat, setActiveFloat] = useState(0);
  /** Sticky stacking only works when cards are ~one viewport tall; disable on mobile to avoid overlap. */
  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsMdUp(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      if (!window.matchMedia("(min-width: 768px)").matches) {
        setActiveFloat(0);
        return;
      }

      const vh = window.innerHeight || 1;
      const topDoc = el.getBoundingClientRect().top + window.scrollY;
      const y = window.scrollY - topDoc;
      const rawFloat = y / vh;
      setActiveFloat(Math.min(stories.length - 1, Math.max(0, rawFloat)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [stories.length]);

  return (
    <section className="w-full py-20 bg-[#f2f2f2]/10 text-black">
      <h2 className="text-5xl mb-4 transition-all duration-700 text-center">
        Event Winners
      </h2>

      {/* 3 sticky screens so the user scrolls through each winner */}
      <div
        ref={containerRef}
        className="relative flex flex-col gap-12 p-4 md:gap-16"
      >
        {stories.map((s, idx) => (
          <div
            key={s.title}
            className={`flex items-center justify-center rounded-3xl ${
              isMdUp
                ? "sticky top-0 transition-transform duration-500 ease-out will-change-transform"
                : "relative"
            }`}
            style={
              isMdUp
                ? {
                    transform: `scale(${(() => {
                      const dist = Math.abs(activeFloat - idx);
                      const threshold = 0.9;
                      const t = Math.max(0, 1 - dist / threshold);
                      const base = 0.985;
                      const peak = 1.03;
                      const scale = base + (peak - base) * t;
                      return scale.toFixed(3);
                    })()})`,
                  }
                : undefined
            }
          >
            <div className="flex w-full max-w-5xl flex-col items-center gap-10 rounded-3xl bg-white p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_25px_80px_rgba(0,0,0,0.08)] md:flex-row md:items-center md:p-4">
              <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.01),0_18px_60px_rgba(0,0,0,0.02)] md:h-[min(65vh,680px)] md:w-[48%]">
                <Image
                  src={s.imageSrc}
                  alt={`${s.title} cover`}
                  fill
                  className="object-cover z-0"
                  sizes="(max-width: 768px) 100vw, 50vw h-[200px] md:h-[500px] aspect-square md:aspect-1.9"
                />
              </div>

              <div className="md:w-[52%] h-full w-full flex flex-col items-start justify-center gap-4">
                <Badge variant={s.variant}>{s.placement}</Badge>
                <h1 className="text-4xl md:text-5xl font-light tracking-wide">
                  {s.title}
                </h1>
                <p className="text-black/70 text-base md:text-lg leading-relaxed">
                  {s.description}
                </p>

                <ul className="text-black/60 text-sm md:text-base flex flex-col gap-2 list-disc pl-5">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>

                <div className="flex items-center gap-3 bg-black/5 text-black rounded-full p-2 w-fit hover:bg-white/90 transition-all duration-300 cursor-pointer group">
                  <p className="text-md pl-4 font-medium text-black">
                    Read Story
                  </p>
                  <div className="flex items-center justify-center bg-black rounded-full p-2">
                    <ArrowRight className="w-4 h-4 text-white -rotate-35 group-hover:rotate-0 transition-all duration-300" />
                  </div>
                </div>

                <div className="pt-2 text-white/40 text-xs md:text-sm">
                  Scroll to see the next winner
                  {idx < stories.length - 1 ? " →" : ""}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
