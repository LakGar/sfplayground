"use client";

import { motion } from "framer-motion";
import { useState, useEffect, type CSSProperties } from "react";

interface RevealTextProps {
  text?: string;
  textColor?: string;
  overlayColor?: string;
  fontSize?: string;
  fontClassName?: string;
  trackingClass?: string;
  fillImage?: string;
  fillImagePosition?: string;
  letterDelay?: number;
  overlayDelay?: number;
  overlayDuration?: number;
  springDuration?: number;
  letterImages?: string[];
}

export function RevealText({
  text = "STUNNING",
  textColor = "text-white",
  overlayColor = "text-red-500",
  fontSize = "text-[250px]",
  fontClassName = "",
  trackingClass = "tracking-tight",
  fillImage,
  fillImagePosition = "45%",
  letterDelay = 0.08,
  overlayDelay = 0.05,
  overlayDuration = 0.4,
  springDuration = 600,
  letterImages = [],
}: RevealTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showRedText, setShowRedText] = useState(false);
  const useFillImage = Boolean(fillImage);
  const hoverImages =
    letterImages.length > 0
      ? letterImages
      : useFillImage
        ? []
        : [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
          ];

  useEffect(() => {
    const lastLetterDelay = (text.length - 1) * letterDelay;
    const totalDelay = lastLetterDelay * 1000 + springDuration;

    const timer = setTimeout(() => {
      setShowRedText(true);
    }, totalDelay);

    return () => clearTimeout(timer);
  }, [text.length, letterDelay, springDuration]);

  const letters = text.split("");
  const lastIndex = Math.max(letters.length - 1, 1);

  const fillLayerStyle = (index: number): CSSProperties | undefined =>
    useFillImage
      ? {
          backgroundImage: `url("${fillImage}")`,
          backgroundSize: `${letters.length * 100}% auto`,
          backgroundPosition: `${(index / lastIndex) * 100}% ${fillImagePosition}`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
        }
      : undefined;

  return (
    <div className="relative inline-flex justify-center">
      <div className={`flex ${trackingClass}`}>
        {letters.map((letter, index) => {
          const display = letter === " " ? "\u00A0" : letter;

          return (
            <motion.span
              key={`${letter}-${index}`}
              onMouseEnter={() => hoverImages.length > 0 && setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`${fontSize} ${fontClassName} ${trackingClass} relative inline-block ${hoverImages.length > 0 ? "cursor-pointer" : "cursor-default"} ${letter === " " ? "w-[0.35em]" : ""}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: index * letterDelay,
                type: "spring",
                damping: 8,
                stiffness: 200,
                mass: 0.8,
              }}
            >
              {/* In-flow base layer — must not be absolute or the word collapses to 0×0 */}
              <motion.span
                className={
                  useFillImage
                    ? "inline-block bg-no-repeat"
                    : `inline-block ${textColor}`
                }
                style={fillLayerStyle(index)}
                animate={{
                  opacity:
                    hoveredIndex === index && hoverImages.length > 0 ? 0 : 1,
                }}
                transition={{ duration: 0.1 }}
              >
                {display}
              </motion.span>

              {hoverImages.length > 0 ? (
                <motion.span
                  className="pointer-events-none absolute inset-0 text-transparent bg-clip-text bg-cover bg-no-repeat"
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    backgroundPosition:
                      hoveredIndex === index ? "10% center" : "0% center",
                  }}
                  transition={{
                    opacity: { duration: 0.1 },
                    backgroundPosition: { duration: 3, ease: "easeInOut" },
                  }}
                  style={{
                    backgroundImage: `url("${hoverImages[index % hoverImages.length]}")`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {display}
                </motion.span>
              ) : null}

              {showRedText && overlayColor ? (
                <motion.span
                  className={`pointer-events-none absolute inset-0 inline-flex items-center justify-center ${overlayColor}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{
                    delay: index * overlayDelay,
                    duration: overlayDuration,
                    times: [0, 0.1, 0.7, 1],
                    ease: "easeInOut",
                  }}
                >
                  {display}
                </motion.span>
              ) : null}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
