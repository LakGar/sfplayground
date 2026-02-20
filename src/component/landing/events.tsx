"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, MapPinIcon, UsersIcon, ArrowRightIcon } from "lucide-react";
import siteData from "@/data/site-data.json";

const events = siteData.events;

const Events = () => {
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
      className="min-h-screen bg-black px-4 md:px-8 lg:px-12 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-12">
          <div>
            <h2
              className={`text-2xl md:text-3xl font-oswald text-white/80 mb-2 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-10"
              }`}
            >
              Previous <span className="text-[#19f7ea]">Events</span>
            </h2>
            <p
              className={`text-white/50 font-oswald transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-10"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              Relive the energy and excitement from our past events.
            </p>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <Link
              key={event.title}
              href={`/events/${event.slug}`}
              className={`group cursor-pointer transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 md:h-56 rounded-t-lg overflow-hidden">
                <Image
                  src={event.coverImage}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="absolute top-4 left-4 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase backdrop-blur-sm">
                  {event.status}
                </span>
              </div>

              {/* Content */}
              <div className="bg-white/5 border border-white/10 border-t-0 rounded-b-lg p-5 group-hover:bg-white/10 transition-colors duration-300">
                <h3 className="text-white font-oswald text-xl mb-3 group-hover:text-[#19f7ea] transition-colors duration-300">
                  {event.title}
                </h3>

                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <UsersIcon className="w-4 h-4" />
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>

                <div className="w-full bg-white/10 text-white py-2 rounded-md font-oswald text-sm group-hover:bg-[#19f7ea] group-hover:text-black transition-all duration-300 text-center flex items-center justify-center gap-2">
                  View Gallery <ArrowRightIcon className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;

