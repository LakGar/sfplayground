"use client";
import Link from "next/link";
import { useState } from "react";
import NewsletterModal from "@/component/ui/newsletter-modal";
import { SIGNUP_FORM_URL } from "@/data/constants";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/success-stories", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const partnerLinks = [
  { href: "/vcs", label: "VCs" },
  { href: "/speakers", label: "Speakers" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/startups", label: "Startups" },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [isPartnersOpen, setIsPartnersOpen] = useState(false);
  return (
    <div className="absolute top-0 left-0 w-full z-50">
      <div className="animate-nav-slide-in-top relative z-100 mx-auto max-w-6xl px-4 flex items-center justify-between py-4 gap-4">
        {/* logo - black when open (over light panel); row z-100 keeps logo + menu control above mobile overlay */}
        <div className="flex items-start">
          <a
            href="/"
            className={`text-2xl font-bold font-oswald p-0.5 pl-2 transition-colors duration-300 ${
              isOpen ? "text-black" : "text-white"
            }`}
          >
            SFPLAYGROUND
          </a>
        </div>
        <div className="hidden md:block w-0.5 h-6 bg-white rounded-full flex-1 max-w-px" />
        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4 flex-1 w-full">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-white text-md hover:text-white/80 transition-all duration-300 "
            >
              {label}
            </Link>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setIsPartnersOpen(true)}
            onMouseLeave={() => setIsPartnersOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsPartnersOpen((prev) => !prev)}
              className="text-white text-md hover:text-white/80 transition-all duration-300 inline-flex items-center gap-1"
              aria-expanded={isPartnersOpen}
              aria-haspopup="menu"
            >
              Partnerships <span className="text-xs">▾</span>
            </button>
            <div
              className={`absolute left-0 top-full pt-2 w-44 transition-all duration-200 ${
                isPartnersOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-1 pointer-events-none"
              }`}
              role="menu"
            >
              <div className="rounded-xl border border-white/20 bg-black/85 backdrop-blur-md p-2">
                {partnerLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block rounded-lg px-3 py-2 text-sm text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                    onClick={() => setIsPartnersOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex items-center gap-4">
          <a
            href={SIGNUP_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-md px-4 text-white hidden md:flex items-center gap-3 bg-white/10 hover:bg-white/20 'backdrop-blur-sm transition-all duration-300 cursor-pointer group rounded-full p-2
             "
          >
            Register your Startup
          </a>
          {/* Hamburger / X - mobile only */}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center items-center w-12 h-12 rounded-full transition-all duration-300"
          >
            <div className="relative w-5 h-4 flex flex-col justify-center">
              <span
                className={`absolute h-0.5 w-5 rounded-full transition-all duration-300 ${
                  isOpen ? "bg-black rotate-45" : "bg-white top-0"
                }`}
              />
              <span
                className={`h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                  isOpen ? "opacity-0 scale-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 rounded-full transition-all duration-300 ${
                  isOpen ? "bg-black -rotate-45" : "bg-white top-[14px]"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile nav overlay + panel */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Backdrop - click to close */}
        <button
          type="button"
          aria-label="Close menu"
          className="absolute inset-0 bg-black/28 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        {/* Panel: full width minus margin, 3/4 height, white border */}
        <div
          className={`absolute left-4 right-4 top-4 sm:left-8 sm:right-8 sm:top-6 rounded-xl border-2 border-white bg-white/95 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-out ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-4"
          }`}
          style={{ height: "75vh" }}
        >
          <nav className="flex flex-col items-center flex-1 p-8 pt-16 justify-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="text-black text-xl font-medium hover:text-black/70 transition-colors py-2 text-center w-full max-w-xs"
              >
                {label}
              </Link>
            ))}
            <div className="w-full max-w-xs">
              <p className="text-black/60 text-sm mb-2 text-center">
                Partnerships
              </p>
              <div className="rounded-xl border border-black/10 bg-black/3 p-2">
                {partnerLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-3 py-2 text-black text-base text-center hover:bg-black/5 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-sm text-black/55">
              <Link
                href="/startups"
                onClick={() => setIsOpen(false)}
                className="hover:text-black"
              >
                Startups
              </Link>
              <span aria-hidden className="text-black/25">
                ·
              </span>
              <Link
                href="/vcs"
                onClick={() => setIsOpen(false)}
                className="hover:text-black"
              >
                VCs
              </Link>
              <span aria-hidden className="text-black/25">
                ·
              </span>
              <Link
                href="/speakers"
                onClick={() => setIsOpen(false)}
                className="hover:text-black"
              >
                Speakers
              </Link>
            </div>
            <div className=" flex w-full max-w-xs flex-col gap-3 ">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setIsNewsletterOpen(true);
                }}
                className="rounded-full border border-black/15 px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-black/5"
              >
                Newsletter
              </button>
              <a
                href={SIGNUP_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-black px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-black/85"
              >
                Register your Startup
              </a>
            </div>
          </nav>
        </div>
      </div>
      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />
    </div>
  );
};

export default Nav;
