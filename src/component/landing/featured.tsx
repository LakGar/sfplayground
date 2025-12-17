"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ExternalLinkIcon } from "lucide-react";

const startups = [
  {
    name: "NeuralPath AI",
    description: "AI-powered drug discovery platform",
    raised: "$12M Series A",
    logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=200&auto=format&fit=crop",
    category: "AI/ML",
  },
  {
    name: "GreenGrid",
    description: "Smart energy management for buildings",
    raised: "$8M Seed",
    logo: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=200&auto=format&fit=crop",
    category: "CleanTech",
  },
  {
    name: "FinFlow",
    description: "B2B payments infrastructure",
    raised: "$15M Series A",
    logo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=200&auto=format&fit=crop",
    category: "FinTech",
  },
  {
    name: "HealthSync",
    description: "Remote patient monitoring platform",
    raised: "$6M Seed",
    logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=200&auto=format&fit=crop",
    category: "HealthTech",
  },
];

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
            Featured <span className="text-[#feca00]">Startups</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {startups.map((startup, index) => (
            <div
              key={startup.name}
              className={`group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-[#feca00]/30 transition-all duration-500 cursor-pointer ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* Logo */}
              <div className="relative w-16 h-16 rounded-lg overflow-hidden mb-4">
                <Image
                  src={startup.logo}
                  alt={startup.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Category Badge */}
              <span className="inline-block text-xs text-[#feca00] bg-[#feca00]/10 px-2 py-1 rounded-full mb-3">
                {startup.category}
              </span>

              {/* Info */}
              <h3 className="text-white font-oswald text-xl mb-2 group-hover:text-[#feca00] transition-colors duration-300 flex items-center gap-2">
                {startup.name}
                <ExternalLinkIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-white/50 text-sm mb-4">{startup.description}</p>

              {/* Raised */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-[#feca00] font-oswald font-bold">
                  {startup.raised}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;

