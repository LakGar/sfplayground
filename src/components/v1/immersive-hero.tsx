"use client";

import { useEffect, useRef } from "react";
import "./immersive-hero-v2.css";

declare global {
  interface Window {
    initializeSFPlaygroundTour?: (root: HTMLElement) => (() => void) | undefined;
  }
}

const scripts = new Map<string, Promise<void>>();
function loadScript(src: string) {
  let promise = scripts.get(src);
  if (!promise) {
    promise = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => {
        scripts.delete(src);
        script.remove();
        reject(new Error(`Could not load ${src}`));
      };
      document.head.appendChild(script);
    });
    scripts.set(src, promise);
  }
  return promise;
}

export default function ImmersiveHero({ markup }: { markup: string }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;
    async function initialize() {
      await loadScript("/v1-experience/media-config.js");
      await loadScript("/v1-experience/vendor/hls-1.7.3.min.js");
      await loadScript("/v1-experience/tour-controller.js?v=5");
      if (!cancelled && root.current) {
        dispose = window.initializeSFPlaygroundTour?.(root.current);
      }
    }
    initialize().catch(() => {
      // The poster and opening caption remain usable if media cannot load.
    });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);
  return <div ref={root} className="v1-hero" dangerouslySetInnerHTML={{ __html: markup }} />;
}
