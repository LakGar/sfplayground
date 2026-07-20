"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Sponsors", href: "/sponsors" },
  { label: "Join Network", href: "https://luma.com/user/SFPlayground" },
  { label: "Previous Events", href: "/previous-events" },
  { label: "Pitch Playoffs", href: "/pitch-playoffs" },
  { label: "Members Only", href: "/silicon-valley" },
] as const;

const CONTACT_EMAIL = "staff@sfplaygroundai.com";

function ThinPlusIcon({
  open,
  onClick,
  light,
}: {
  open: boolean;
  onClick: () => void;
  light?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className={`relative flex h-[60px] w-[60px] shrink-0 items-center justify-center transition-colors hover:opacity-60 ${
        light ? "text-white" : "text-black"
      }`}
    >
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        aria-hidden
        className="transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: open ? "rotate(405deg)" : "rotate(0deg)" }}
      >
        <line
          x1="30"
          y1="14"
          x2="30"
          y2="46"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <line
          x1="14"
          y1="30"
          x2="46"
          y2="30"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

const linkVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 + i * 0.06,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

type NavProps = {
  /** Transparent bar, no blur — for dark hero sections */
  heroOverlay?: boolean;
};

export default function Nav({ heroOverlay = false }: NavProps) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((o) => !o), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60]">
        <div
          className={
            heroOverlay
              ? "bg-transparent"
              : "bg-white/50 backdrop-blur-sm"
          }
        >
          <div className="mx-auto w-full px-4 py-4 md:px-8">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex shrink-0 items-center overflow-hidden rounded-full"
                onClick={close}
              >
                <Image
                  src="/images/logo.png"
                  alt="SFPLAYGROUND"
                  width={60}
                  height={60}
                  priority
                />
              </Link>
              <ThinPlusIcon
                open={open}
                onClick={toggle}
                light={heroOverlay}
              />
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="menu"
            className="fixed inset-0 z-[55] overflow-hidden bg-white/50 backdrop-blur-sm"
            initial={{ clipPath: "inset(0 0 100% 0 round 0px)" }}
            animate={{ clipPath: "inset(0 0 0% 0 round 0px)" }}
            exit={{ clipPath: "inset(0 0 100% 0 round 0px)" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative z-10 flex h-full min-h-0 flex-col px-6 pb-10 pt-28 md:px-12 md:pt-32">
              <nav
                className="flex flex-1 flex-col justify-center gap-1 md:gap-2"
                aria-label="Main"
              >
                {NAV_LINKS.map((item, i) => (
                  <motion.div
                    key={item.href}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={linkVariants}
                  >
                    <Link
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      onClick={close}
                      className="block font-oswald text-[2.5rem] font-bold leading-[1.05] tracking-tight text-black transition-opacity hover:opacity-45 md:text-[4.5rem] lg:text-[5.5rem]"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="mt-8 shrink-0"
              >
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-block border-b border-black/30 pb-0.5 text-lg tracking-wide text-black/70 transition-colors hover:border-black hover:text-black md:text-base"
                >
                  {CONTACT_EMAIL}
                </a>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
