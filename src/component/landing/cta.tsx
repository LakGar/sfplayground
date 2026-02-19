"use client";
import React, { useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import ApplyModal from "@/component/ui/apply-modal";

const CTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[60vh] flex items-center justify-center px-4 md:px-8 lg:px-12 py-24"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2832&auto=format&fit=crop')",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black to-black via-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl">
        <h2
          className={`text-3xl md:text-5xl lg:text-6xl font-oswald font-bold text-white mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Ready to Pitch Your <span className="text-[#00d5ff]">Startup?</span>
        </h2>
        <p
          className={`text-white/70 text-lg md:text-xl font-oswald mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          Join hundreds of founders who have pitched live and secured funding
          from top VCs. Your story deserves to be heard.
        </p>
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#00d5ff] text-black px-8 py-3 rounded-md text-lg flex items-center justify-center gap-2 hover:bg-white transition-colors duration-300 font-oswald font-bold"
          >
            Apply to Pitch <ArrowRightIcon className="w-5 h-5" />
          </button>
          <a
            href="/about"
            className="border-2 border-white text-white px-8 py-3 rounded-md text-lg hover:bg-white hover:text-black transition-all duration-300 font-oswald"
          >
            Learn More
          </a>
        </div>
      </div>
      <ApplyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default CTA;
