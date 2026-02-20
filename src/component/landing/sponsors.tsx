"use client";
import React from "react";

const sponsors = [
  "Sequoia Capital",
  "Andreessen Horowitz",
  "Y Combinator",
  "Greylock",
  "Accel",
  "Benchmark",
  "Lightspeed",
  "Index Ventures",
  "Founders Fund",
  "Kleiner Perkins",
  "NEA",
  "General Catalyst",
];

const Sponsors = () => {
  return (
    <div className="bg-black py-12 overflow-hidden">
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

        {/* Scrolling container: each half must be identical width so -50% loop is seamless */}
        <div className="flex animate-scroll w-max">
          {/* First set - min-w-0 + flex keeps segment width equal to content */}
          <div className="flex shrink-0 min-w-0" style={{ width: "max-content" }}>
            {sponsors.map((sponsor, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center justify-center px-12"
              >
                <span className="text-white/40 font-oswald text-xl md:text-2xl whitespace-nowrap hover:text-[#19f7ea] transition-colors duration-300 cursor-pointer">
                  {sponsor}
                </span>
              </div>
            ))}
          </div>
          {/* Duplicate - same width as first so loop has no jump */}
          <div className="flex shrink-0 min-w-0" style={{ width: "max-content" }}>
            {sponsors.map((sponsor, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center justify-center px-12"
              >
                <span className="text-white/40 font-oswald text-xl md:text-2xl whitespace-nowrap hover:text-[#19f7ea] transition-colors duration-300 cursor-pointer">
                  {sponsor}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;

