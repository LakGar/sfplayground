"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CalendarIcon, MapPinIcon, UsersIcon, ArrowRightIcon } from "lucide-react";

const events = [
  {
    title: "Pitch Night Vol. 12",
    date: "Jan 15, 2025",
    location: "SF Downtown",
    attendees: 150,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2940&auto=format&fit=crop",
    status: "upcoming",
  },
  {
    title: "VC Roundtable",
    date: "Jan 22, 2025",
    location: "Mission District",
    attendees: 80,
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=2940&auto=format&fit=crop",
    status: "upcoming",
  },
  {
    title: "Founder Mixer",
    date: "Feb 5, 2025",
    location: "SOMA",
    attendees: 200,
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2940&auto=format&fit=crop",
    status: "upcoming",
  },
];

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
              Upcoming <span className="text-[#feca00]">Events</span>
            </h2>
            <p
              className={`text-white/50 font-oswald transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-10"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              Join us for live pitches, networking, and real decisions.
            </p>
          </div>
          <button
            className={`self-start md:self-auto flex items-center gap-2 text-[#feca00] font-oswald hover:gap-4 transition-all duration-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            View All Events <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={event.title}
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
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="absolute top-4 left-4 bg-[#feca00] text-black text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {event.status}
                </span>
              </div>

              {/* Content */}
              <div className="bg-white/5 border border-white/10 border-t-0 rounded-b-lg p-5 group-hover:bg-white/10 transition-colors duration-300">
                <h3 className="text-white font-oswald text-xl mb-3 group-hover:text-[#feca00] transition-colors duration-300">
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
                    <span>{event.attendees} attending</span>
                  </div>
                </div>

                <button className="w-full bg-white/10 text-white py-2 rounded-md font-oswald text-sm hover:bg-[#feca00] hover:text-black transition-all duration-300">
                  RSVP Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;

