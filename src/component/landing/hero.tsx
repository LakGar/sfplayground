"use client";
import React from "react";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative h-screen flex justify-center items-center p-4 md:p-8 lg:p-12 overflow-hidden">
      {/* background video */}
      <video
        src="/hero.mp4"
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      {/* overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-black/10 to-black via-black/20" />
      {/* content */}
      <div className="relative z-10">
        {/* hero heading */}
        <h1 className="text-4xl md:text-6xl lg:text-8xl md:w-3/5 font-oswald text-white mb-4 animate-fade-in-down">
          Where Startups Get Tested by
          <span className="text-[#feca00] font-bold"> Real </span>
          Capital
        </h1>
        {/* hero description */}
        <p
          className="text-white/50 text-md md:text-lg lg:text-xl font-oswald animate-fade-in-down"
          style={{ animationDelay: "0.2s" }}
        >
          Live pitch battles. Top founders. Active VCs. Real decisions.
        </p>

        {/* hero buttons*/}
        <div
          className="flex gap-4 mt-4 md:hidden animate-fade-in-down"
          style={{ animationDelay: "0.4s" }}
        >
          <button className="bg-white text-black px-4 py-1 rounded-md text-sm md:text-base lg:text-lg">
            Apply Now
          </button>
          <button className="text-white border border-white px-4 py-2 text-sm md:text-base lg:text-lg rounded-md">
            Request an Invite
          </button>
        </div>

        {/* hero highlights */}
        <div className="md:flex gap-6 mt-8 items-center justify-between">
          {/* Images */}
          <div className="flex gap-4">
            <div
              className="hidden lg:block relative w-48 h-48 lg:w-56 lg:h-56 rounded-md overflow-hidden group cursor-pointer border border-white/20 animate-slide-in-left"
              style={{ animationDelay: "0.5s" }}
            >
              <Image
                src="/hero-highlight1.jpg"
                alt="hero highlight 1"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <p className="text-white text-sm font-oswald mb-2 line-clamp-2">
                  Live pitch battles with top VCs and industry experts...
                </p>
                <button className="cursor-pointer bg-white/30 text-white px-3 py-1 rounded-md text-xs self-end">
                  View Event
                </button>
              </div>
            </div>
            <div
              className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-md overflow-hidden group cursor-pointer border border-white/20 animate-slide-in-left"
              style={{ animationDelay: "0.6s" }}
            >
              <Image
                src="/hero-highlight2.jpg"
                alt="hero highlight 2"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <p className="text-white text-sm font-oswald mb-2 line-clamp-2">
                  Top founders showcase night with networking...
                </p>
                <button className="cursor-pointer bg-white/30 text-white px-3 py-1 rounded-md text-xs self-end">
                  View Event
                </button>
              </div>
            </div>
          </div>
          {/* Apply section */}
          <div
            className="hidden md:flex flex-col gap-4 max-w-xs animate-fade-in-down"
            style={{ animationDelay: "0.7s" }}
          >
            <p className="text-white/70 text-sm lg:text-base">
              Apply to pitch your startup live and receive real-time feedback
              from investors who deploy capital.
            </p>
            <div className="flex gap-3">
              <button className="cursor-pointer bg-white text-black px-4 py-2 rounded-md text-sm lg:text-base flex items-center gap-2 hover:bg-gray-200 transition-all duration-300">
                Apply to Pitch Now <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
