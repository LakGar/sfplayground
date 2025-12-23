"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GlareCard } from "@/component/ui/glare-card";

const cards = [
  {
    title: "Live Pitches",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2940&auto=format&fit=crop",
    description: "Watch founders pitch in real-time",
  },
  {
    title: "VC Feedback",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop",
    description: "Get direct insights from investors",
  },
  {
    title: "Networking",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2940&auto=format&fit=crop",
    description: "Connect with industry leaders",
  },
  {
    title: "Funding",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2940&auto=format&fit=crop",
    description: "Access real capital opportunities",
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
      5005;
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
            What We <span className="text-[#feca00]">Do</span>
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
                  <h3 className="text-white font-oswald text-lg mb-1 group-hover:text-[#feca00] transition-colors duration-300">
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
