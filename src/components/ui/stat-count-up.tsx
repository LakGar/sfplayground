"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { parseStatValue } from "@/lib/parse-stat-value";

const EASE = [0.22, 1, 0.36, 1] as const;

type StatCountUpProps = {
  /** Display string such as `50K+`, `#1`, or `26`. Parsed when numeric parts are present. */
  value?: string;
  end?: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
  className?: string;
};

export function StatCountUp({
  value,
  end: endProp,
  prefix: prefixProp = "",
  suffix: suffixProp = "",
  delay = 0,
  className,
}: StatCountUpProps) {
  const parsed = value ? parseStatValue(value) : null;
  const prefix = parsed?.prefix ?? prefixProp;
  const end = parsed?.end ?? endProp ?? 0;
  const suffix = parsed?.suffix ?? suffixProp;
  const isStatic = parsed?.static ?? false;

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const reduceMotion = useReducedMotion();
  const [animatedValue, setAnimatedValue] = useState(0);

  const displayValue =
    isStatic || reduceMotion ? end : animatedValue;
  const formattedValue = Number.isInteger(end)
    ? Math.round(displayValue)
    : Math.round(displayValue * 10) / 10;

  useEffect(() => {
    if (isStatic || reduceMotion || !inView) return;

    let controls: ReturnType<typeof animate> | undefined;
    const timeout = window.setTimeout(() => {
      controls = animate(0, end, {
        duration: 1.15,
        ease: EASE,
        onUpdate: (latest) => setAnimatedValue(latest),
      });
    }, delay * 1000);

    return () => {
      window.clearTimeout(timeout);
      controls?.stop();
    };
  }, [inView, end, delay, reduceMotion, isStatic]);

  if (isStatic && value) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}
