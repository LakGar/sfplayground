"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BbbHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bbb-hero" aria-label="Built Beyond Borders">
      <div className="bbb-hero-inner">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="bbb-hero-eyebrow"
        >
          SFPLAYGROUND presents
        </motion.p>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06, ease: EASE }}
          className="bbb-hero-title"
        >
          <span className="bbb-hero-title-blue">Built Beyond</span>
          <span className="bbb-hero-title-red"> Borders</span>
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
          className="bbb-hero-lead"
        >
          Visa 2 Venture Week — a new chapter for immigrant founders in San
          Francisco. Details coming soon.
        </motion.p>
      </div>
    </section>
  );
}
