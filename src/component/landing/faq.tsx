"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { useWebsiteContent } from "@/context/WebsiteContentContext";

const FAQ_INDEXES = [0, 1, 2, 3, 4, 5] as const;

const FAQ = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { getContent } = useWebsiteContent();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
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
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className={`text-5xl text-white mb-4 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
            data-editable="faq.title"
            data-editable-type="text"
          >
            {getContent("faq.title")}
          </h2>
          <p
            className={`text-white/50 text-lg    transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
            style={{ transitionDelay: "100ms" }}
            data-editable="faq.subtitle"
            data-editable-type="text"
          >
            {getContent("faq.subtitle")}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {FAQ_INDEXES.map((i) => (
            <div
              key={i}
              className={` bg-white/5 rounded-lg overflow-hidden transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left bg-white/5 hover:bg-white/10 transition-colors duration-300"
              >
                <span
                  className="text-white     text-lg pr-4"
                  data-editable={`faq.${i}.question`}
                  data-editable-type="text"
                >
                  {getContent(`faq.${i}.question`)}
                </span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-white shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-48" : "max-h-0"
                }`}
              >
                <p
                  className="p-5 text-white/60 text-sm leading-relaxed"
                  data-editable={`faq.${i}.answer`}
                  data-editable-type="text"
                >
                  {getContent(`faq.${i}.answer`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
