"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";
import siteData from "@/data/site-data.json";

const startups = siteData.startups;

const Featured = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      className="bg-black px-4 md:px-8 lg:px-12 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className={`text-2xl md:text-3xl font-oswald text-white/80 mb-4 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
          >
            Featured <span className="text-[#00d5ff]">Startups</span>
          </h2>
          <p
            className={`text-white/50 font-oswald max-w-2xl mx-auto transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            Companies that pitched at SF Playground and secured funding from top
            investors.
          </p>
        </div>

        {/* Startups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {startups.map((startup, index) => (
            <div
              key={startup.name}
              className={`group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-[#00d5ff]/30 transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* Logo - clickable link when website exists */}
              <div className="relative w-20 h-20 rounded-lg overflow-hidden mb-4">
                {startup.website ? (
                  <a
                    href={startup.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative w-full h-full cursor-pointer"
                  >
                    <Image
                      src={startup.logo}
                      alt={startup.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </a>
                ) : (
                  <Image
                    src={startup.logo}
                    alt={startup.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                )}
              </div>

              {/* Card content - links to success story */}
              <Link
                href={`/success-stories/${startup.slug}`}
                className="block cursor-pointer"
              >
                {/* Category Badge */}
                <span className="inline-block text-xs text-[#00d5ff] bg-[#00d5ff]/10 px-2 py-1 rounded-full mb-3">
                  {startup.category}
                </span>

                {/* Info */}
                <h3 className="text-white font-oswald text-xl mb-2 group-hover:text-[#00d5ff] transition-colors duration-300 flex items-center gap-2">
                  {startup.name}
                  <ExternalLinkIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-white/50 text-sm mb-4 line-clamp-3">
                  {startup.description}
                </p>

                {/* Raised */}
                <div className="pt-4 border-t border-white/10">
                  <span className="text-[#00d5ff] font-oswald font-bold text-sm">
                    {startup.raised}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;


