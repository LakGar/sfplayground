"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GlareCard } from "@/component/ui/glare-card";
import { useWebsiteContent } from "@/context/WebsiteContentContext";
import { WEBSITE_CONTENT_CONFIG } from "@/data/website-content-keys";

const CARD_KEYS = [
  { title: "about.whatWeDo.card0.title", desc: "about.whatWeDo.card0.description", image: "about.whatWeDo.card0.image" },
  { title: "about.whatWeDo.card1.title", desc: "about.whatWeDo.card1.description", image: "about.whatWeDo.card1.image" },
  { title: "about.whatWeDo.card2.title", desc: "about.whatWeDo.card2.description", image: "about.whatWeDo.card2.image" },
  { title: "about.whatWeDo.card3.title", desc: "about.whatWeDo.card3.description", image: "about.whatWeDo.card3.image" },
] as const;

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop";

function WhatWeDoCardImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  const isExternal = src.startsWith("http://") || src.startsWith("https://");
  const displaySrc = failed ? PLACEHOLDER_IMAGE : src;

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src) return null;

  if (isExternal) {
    return (
      <img
        src={displaySrc}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <Image
      src={displaySrc}
      alt={alt}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-110"
      unoptimized={failed}
      onError={() => setFailed(true)}
    />
  );
}

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { getContent } = useWebsiteContent();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className=" bg-black px-4 md:px-8 lg:px-12 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Top row - Heading and Tagline */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          {/* Heading */}
          <h2
            className={`text-2xl md:text-3xl font-oswald text-white/80 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
            data-editable="about.whatWeDo.heading"
            data-editable-type="text"
          >
            {getContent("about.whatWeDo.heading")}
          </h2>
          {/* Tagline */}
          <div
            className={`lg:text-right lg:max-w-xl transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <span
              className="text-xl md:text-2xl lg:text-3xl font-oswald font-bold text-white"
              data-editable="about.whatWeDo.tagline"
              data-editable-type="text"
            >
              {getContent("about.whatWeDo.tagline")}
            </span>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CARD_KEYS.map((keys, index) => (
            <div
              key={keys.title}
              className={`h-56 md:h-64 lg:h-72 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              <GlareCard className="relative group cursor-pointer">
                <div
                  className="absolute inset-0"
                  data-editable={keys.image}
                  data-editable-type="image"
                >
                  <WhatWeDoCardImage
                    src={getContent(keys.image) || WEBSITE_CONTENT_CONFIG[keys.image]?.default || ""}
                    alt={getContent(keys.title)}
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <h3
                    className="text-white font-oswald text-lg mb-1 group-hover:text-[#19f7ea] transition-colors duration-300"
                    data-editable={keys.title}
                    data-editable-type="text"
                  >
                    {getContent(keys.title)}
                  </h3>
                  <p
                    className="text-white/60 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    data-editable={keys.desc}
                    data-editable-type="text"
                  >
                    {getContent(keys.desc)}
                  </p>
                </div>
              </GlareCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
