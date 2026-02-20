"use client";
import React from "react";
import { CalendarIcon, MapPinIcon, ArrowRightIcon } from "lucide-react";
import siteData from "@/data/site-data.json";
import { SIGNUP_FORM_URL } from "@/data/constants";

const nextEvent = siteData.nextEvent as {
  title: string;
  date: string;
  time: string;
  location: string;
  hook: string;
  ctaText: string;
};

const NextEvent = () => {
  return (
    <section className="relative bg-black px-4 sm:px-6 md:px-8 lg:px-12 py-10 md:py-14 overflow-hidden">
      {/* Subtle accent glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#19f7ea]/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#19f7ea]/40 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10">
          {/* Badge + title block */}
          <div className="flex flex-col gap-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#19f7ea]/15 border border-[#19f7ea]/30 text-[#19f7ea] text-xs font-oswald font-bold uppercase tracking-widest w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#19f7ea] animate-pulse" />
              Next event
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-oswald font-bold text-white tracking-tight">
              {nextEvent.title}
            </h2>

            {/* Date + location row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/80 text-sm md:text-base font-oswald">
              <span className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10">
                  <CalendarIcon className="w-4 h-4 text-[#19f7ea] shrink-0" />
                </span>
                {nextEvent.date}
                {nextEvent.time && (
                  <span className="text-white/60">· {nextEvent.time}</span>
                )}
              </span>
              <span className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10">
                  <MapPinIcon className="w-4 h-4 text-[#19f7ea] shrink-0" />
                </span>
                {nextEvent.location}
              </span>
            </div>
          </div>

          {/* Hook + CTA */}
          <div className="flex flex-col sm:flex-row lg:flex-col lg:items-end lg:text-right gap-4 lg:min-w-[280px]">
            <p className="text-white/70 text-base md:text-lg font-oswald leading-relaxed lg:max-w-sm">
              {nextEvent.hook}
            </p>
            <a
              href={SIGNUP_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#19f7ea] text-black px-6 py-3.5 rounded-lg font-oswald font-bold text-sm md:text-base hover:bg-white hover:shadow-[0_0_24px_rgba(25,247,234,0.4)] transition-all duration-300 shrink-0 w-full sm:w-auto lg:w-full min-h-[48px] touch-manipulation"
            >
              {nextEvent.ctaText}
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextEvent;
