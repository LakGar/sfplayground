"use client";

import { RevealText } from "@/components/ui/reveal-text";
import { motion } from "framer-motion";
import { HERO_TITLE_LETTER_IMAGES } from "@/data/hero-title-letter-images";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const fadeUpTransition = (delay: number) => ({
  delay,
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
});

export default function RevealTitle() {
  return (
        <div className="flex flex-1 flex-col items-center justify-center px-4 pb-26 pt-28 text-center md:px-8 md:pb-10 md:pt-32">
          <h1 className="leading-[0.92]">
            <RevealText
              text="SFPLAYGROUND"
              textColor="text-black"
              letterImages={[...HERO_TITLE_LETTER_IMAGES]}
              overlayColor="text-red-500"
              fontSize="text-[clamp(2.75rem,14vw,12.5rem)]"
              fontClassName="font-oswald font-bold"
              trackingClass="tracking-[-0.04em]"
              letterDelay={0.08}
              overlayDelay={0.05}
              overlayDuration={0.4}
              springDuration={600}
            />
          </h1>
          <motion.p
            className="mt-4 max-w-4xl font-oswald text-[clamp(0.875rem,2.5vw,1.75rem)] font-medium leading-snug tracking-wide text-black/80 md:mt-5"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0.85)}
          >
            Live <i className="text-red-500/60">experiences</i> built for{" "}
            <b>Founders</b>, <b>Investors</b>, and <b>Customers</b>.
          </motion.p>
        </div>
  );
}
