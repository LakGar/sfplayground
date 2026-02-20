"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GlareCard } from "@/component/ui/glare-card";

const cards = [
  {
    title: "Live Pitches",
    image:
      "https://drive.google.com/uc?export=view&id=1N91BEb6QIa1nZEipkl0DPI-4RnieS0zg",
    description: "Watch founders pitch in real-time",
  },
  {
    title: "Social Proof",
    image:
      "https://drive.google.com/thumbnail?id=1zNi50nX4lS01uDR9ALRtv27BQ4kHD5Jk&sz=w1200",
    description: "Receive votes from builders and investors",
  },
  {
    title: "VC Feedback",
    image:
      "https://drive.google.com/uc?export=view&id=1EmPGUJXndScOSNLLDXJTp_0O6EUqUzj8",
    description: "Get direct insights from investors",
  },
  {
    title: "Networking",
    image:
      "https://drive.google.com/uc?export=view&id=1rjtcqz-O2o_0R6JFXv34h9VCx7s8mX36",
    description: "Connect with industry leaders",
  },
];

const About = () => {
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
          >
            What We <span className="text-[#00d5ff]">Do</span>
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
            <span className="text-xl md:text-2xl lg:text-3xl font-oswald font-bold text-white">
              An SF-based platform for Live startup pitches and real investor
              decisions.
            </span>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className={`h-56 md:h-64 lg:h-72 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              <GlareCard className="relative group cursor-pointer">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <h3 className="text-white font-oswald text-lg mb-1 group-hover:text-[#00d5ff] transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-white/60 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {card.description}
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
