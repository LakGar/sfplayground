"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type FadeDirection = "up" | "down";

const OFFSET = 40;

interface FadeInViewProps {
  children: ReactNode;
  direction?: FadeDirection;
  delay?: number;
  className?: string;
}

export function FadeInView({
  children,
  direction = "up",
  delay = 0,
  className,
}: FadeInViewProps) {
  const reduceMotion = useReducedMotion();
  const hiddenY = direction === "up" ? OFFSET : -OFFSET;

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: hiddenY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -6% 0px" }}
      transition={{
        delay,
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
