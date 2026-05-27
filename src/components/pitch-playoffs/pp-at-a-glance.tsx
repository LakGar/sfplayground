"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PP_GLANCE } from "@/data/pitch-playoffs-page-data";
import {
  PPRevealItem,
  PPRevealStagger,
} from "@/components/pitch-playoffs/pp-reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

function GlanceCountUp({
  end,
  prefix = "",
  suffix = "",
  delay = 0,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);
  const displayValue = reduceMotion ? end : value;

  useEffect(() => {
    if (reduceMotion || !inView) return;

    let controls: ReturnType<typeof animate> | undefined;
    const timeout = window.setTimeout(() => {
      controls = animate(0, end, {
        duration: 1.15,
        ease: EASE,
        onUpdate: (latest) => setValue(Math.round(latest)),
      });
    }, delay * 1000);

    return () => {
      window.clearTimeout(timeout);
      controls?.stop();
    };
  }, [inView, end, delay, reduceMotion]);

  return (
    <span ref={ref} className="pp-glance-value-inner">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

export default function PPAtAGlance() {
  return (
    <section className="pp-glance" aria-label="At a glance">
      <div className="pp-container pp-glance-inner">
        <PPRevealStagger className="pp-glance-stats" stagger={0.12}>
          {PP_GLANCE.stats.map((stat, index) => (
            <PPRevealItem key={stat.label}>
              <div className="pp-glance-stat">
                <p className="pp-glance-value">
                  <GlanceCountUp
                    end={stat.end}
                    prefix={"prefix" in stat ? stat.prefix : ""}
                    suffix={"suffix" in stat ? stat.suffix : ""}
                    delay={index * 0.12}
                  />
                </p>
                <p className="pp-glance-stat-label">{stat.label}</p>
              </div>
            </PPRevealItem>
          ))}
        </PPRevealStagger>
      </div>
    </section>
  );
}
