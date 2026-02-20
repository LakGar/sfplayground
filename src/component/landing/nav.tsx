"use client";
import React, { useState } from "react";
import Link from "next/link";
import NewsletterModal from "@/component/ui/newsletter-modal";
import { SIGNUP_FORM_URL } from "@/data/constants";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="w-full px-4 md:px-8 py-4 flex items-center bg-linear-to-b from-black/50 to-transparent via-black/20 backdrop-blur-sm">
        {/* logo */}
        <Link
          href="/"
          className="flex items-center animate-slide-in-left flex-1 overflow-hidden"
        ><h1 className="text-4xl font-bold font-oswald text-[#19f7ea] flex items-center gap-2">
            <span className="text-[#19f7ea]">SF</span>

            <span className="text-white">LAYGROUND</span>
          </h1>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center justify-center gap-10">
          <Link
            className="text-white font-semibold cursor-pointer hover:scale-110 transition-all duration-300 animate-fade-in-down"
            style={{ animationDelay: "0.3s" }}
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-white font-semibold cursor-pointer hover:scale-110 transition-all duration-300 animate-fade-in-down"
            style={{ animationDelay: "0.4s" }}
            href="/about"
          >
            About
          </Link>
          <Link
            className="text-white font-semibold cursor-pointer hover:scale-110 transition-all duration-300 animate-fade-in-down"
            style={{ animationDelay: "0.5s" }}
            href="/success-stories"
          >
            Success Stories
          </Link>
          <Link
            className="text-white font-semibold cursor-pointer hover:scale-110 transition-all duration-300 animate-fade-in-down"
            style={{ animationDelay: "0.6s" }}
            href="/#events"
          >
            Events
          </Link>
          <a
            className="text-white font-semibold cursor-pointer hover:scale-110 transition-all duration-300 animate-fade-in-down"
            style={{ animationDelay: "0.65s" }}
            href={SIGNUP_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get on the list
          </a>
        </div>

        <div className="hidden lg:flex flex-1 justify-end">
          <button
            onClick={() => setIsNewsletterModalOpen(true)}
            className="text-black text-sm bg-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200 transition-all duration-300 animate-fade-in-down font-oswald"
            style={{ animationDelay: "0.7s" }}
          >
            Subscribe
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white p-2 animate-fade-in-down relative w-6 h-6"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`absolute left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-1"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
          />
          <span
            className={`absolute left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-1"
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/95 backdrop-blur-sm transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Mobile header with logo and close */}
        <div className="w-full px-4 py-4 flex items-center justify-between">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <h1 className="text-2xl font-bold font-oswald text-[#19f7ea]">
              SF<span className="text-white">PLAYGROUND</span>
            </h1>
          </Link>
          <button
            className="text-white p-2 relative w-6 h-6"
            onClick={() => setIsOpen(false)}
          >
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-white rotate-45" />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-white -rotate-45" />
          </button>
        </div>
        {/* Mobile links */}
        <div className="flex flex-col items-center justify-center gap-8 h-[calc(100%-72px)]">
          <Link
            className="text-white  hover:text-[#19f7ea] transition-colors"
            href="/"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            className="text-white hover:text-[#19f7ea] transition-colors"
            href="/about"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            className="text-white  hover:text-[#19f7ea] transition-colors"
            href="/success-stories"
            onClick={() => setIsOpen(false)}
          >
            Success Stories
          </Link>
          <Link
            className="text-white hover:text-[#19f7ea] transition-colors"
            href="/#events"
            onClick={() => setIsOpen(false)}
          >
            Events
          </Link>
          <a
            href={SIGNUP_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#19f7ea] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Get on the list
          </a>
          <button
            onClick={() => {
              setIsNewsletterModalOpen(true);
              setIsOpen(false);
            }}
            className="text-black bg-white px-4 py-2 rounded-md hover:bg-gray-200 transition-all duration-300 font-oswald"
          >
            Subscribe
          </button>
        </div>
      </div>
      <NewsletterModal
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
      />
    </div>
  );
};

export default Nav;
