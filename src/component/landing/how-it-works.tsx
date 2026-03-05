"use client";
import React, { useEffect, useRef, useState } from "react";
import { Presentation, Vote, Mic, Handshake } from "lucide-react";
import { useWebsiteContent } from "@/context/WebsiteContentContext";

const STEPS = [
  { step: 1, titleKey: "howItWorks.step1.title", descKey: "howItWorks.step1.description", icon: Presentation },
  { step: 2, titleKey: "howItWorks.step2.title", descKey: "howItWorks.step2.description", icon: Vote },
  { step: 3, titleKey: "howItWorks.step3.title", descKey: "howItWorks.step3.description", icon: Mic },
  { step: 4, titleKey: "howItWorks.step4.title", descKey: "howItWorks.step4.description", icon: Handshake },
] as const;

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { getContent } = useWebsiteContent();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-black px-4 md:px-8 lg:px-12 py-16 md:py-20 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-2xl md:text-3xl font-oswald text-white/80 mb-2 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
          data-editable="howItWorks.title"
          data-editable-type="text"
        >
          {getContent("howItWorks.title")}
        </h2>
        <p
          className={`text-white/50 font-oswald text-sm md:text-base mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
          style={{ transitionDelay: "80ms" }}
          data-editable="howItWorks.subtitle"
          data-editable-type="text"
        >
          {getContent("howItWorks.subtitle")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STEPS.map((item, index) => {
            const Icon = item.icon as React.ComponentType<{ className?: string }>;
            return (
              <div
                key={item.step}
                className={`flex flex-col items-center text-center transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${150 + index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-[#19f7ea]/20 border border-[#19f7ea]/40 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#19f7ea]" />
                </div>
                <span className="text-[#19f7ea] font-oswald font-bold text-sm mb-1">
                  Step {item.step}
                </span>
                <h3
                  className="text-white font-oswald text-lg md:text-xl mb-2"
                  data-editable={item.titleKey}
                  data-editable-type="text"
                >
                  {getContent(item.titleKey)}
                </h3>
                <p
                  className="text-white/60 text-sm leading-relaxed"
                  data-editable={item.descKey}
                  data-editable-type="text"
                >
                  {getContent(item.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
