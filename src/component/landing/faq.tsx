"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "lucide-react";

const faqs = [
  {
    question: "How do I apply to pitch at SF Playground?",
    answer:
      "Simply click the 'Apply to Pitch' button and fill out our application form. We review applications weekly and notify selected founders within 5 business days.",
  },
  {
    question: "What stage startups can apply?",
    answer:
      "We welcome startups from pre-seed to Series A. Whether you're just starting out or have initial traction, if you have a compelling story and vision, we want to hear from you.",
  },
  {
    question: "How long is each pitch?",
    answer:
      "Each founder gets 5 minutes to pitch followed by 5 minutes of Q&A from our panel of VCs. It's fast-paced and designed to simulate real investor meetings.",
  },
  {
    question: "Who are the investors at these events?",
    answer:
      "Our events feature partners and principals from top-tier VC firms including Sequoia, a16z, Greylock, and many more. We also invite active angel investors and strategic corporate VCs.",
  },
  {
    question: "Is there a fee to pitch?",
    answer:
      "No, pitching at SF Playground is completely free. We believe in removing barriers for founders to access capital and feedback.",
  },
  {
    question: "What happens after I pitch?",
    answer:
      "Interested investors can request introductions directly through our platform. We facilitate warm intros and track follow-up meetings to help you close your round.",
  },
];

const FAQ = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className={`text-2xl md:text-3xl font-oswald text-white/80 mb-4 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
          >
            Frequently Asked <span className="text-[#feca00]">Questions</span>
          </h2>
          <p
            className={`text-white/50 font-oswald transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            Everything you need to know about pitching at SF Playground.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border border-white/10 rounded-lg overflow-hidden transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left bg-white/5 hover:bg-white/10 transition-colors duration-300"
              >
                <span className="text-white font-oswald text-lg pr-4">
                  {faq.question}
                </span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-[#feca00] shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-48" : "max-h-0"
                }`}
              >
                <p className="p-5 text-white/60 text-sm leading-relaxed">
                  {faq.answer}
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


