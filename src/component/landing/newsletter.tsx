"use client";
import React, { useEffect, useRef, useState } from "react";
import { SendIcon } from "lucide-react";

const Newsletter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
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
      className="bg-black px-4 md:px-8 lg:px-12 py-16 md:py-24"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            {/* Text */}
            <div
              className={`flex-1 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-oswald font-bold text-white mb-2">
                Stay in the <span className="text-[#feca00]">Loop</span>
              </h3>
              <p className="text-white/60 font-oswald">
                Get exclusive updates on upcoming events, featured startups, and
                investor insights delivered to your inbox.
              </p>
            </div>

            {/* Form */}
            <div
              className={`flex-1 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 rounded-md px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#feca00] transition-colors duration-300"
                />
                <button className="bg-[#feca00] text-black px-6 py-3 rounded-md text-lg hover:bg-white transition-colors duration-300 flex items-center gap-2">
                  <SendIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Subscribe</span>
                </button>
              </div>
              <p className="text-white/40 text-xs mt-2">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
