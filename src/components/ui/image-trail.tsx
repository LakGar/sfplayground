"use client";

import { Children, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimationSequence,
  motion,
  Target,
  Transition,
  useAnimate,
  useAnimationFrame,
} from "framer-motion";
import { v4 as uuidv4 } from "uuid";

import { useMouseVector } from "@/hooks/use-mouse-vector";

type TrailSegment = [Target, Transition];

type TrailAnimationSequence = TrailSegment[];

interface ImageTrailProps {
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLElement | null>;
  /** Regions where trail images should not spawn (e.g. hero title). */
  excludeRefs?: React.RefObject<HTMLElement | null>[];
  /** Extra padding (px) around each excluded region. */
  excludePadding?: number;
  newOnTop?: boolean;
  rotationRange?: number;
  animationSequence?: TrailAnimationSequence;
  /** Minimum milliseconds between trail images. */
  interval?: number;
  /** Minimum mouse travel (px) before spawning the next image. */
  minDistance?: number;
}

interface TrailItemData {
  id: string;
  x: number;
  y: number;
  rotation: number;
  animationSequence: TrailAnimationSequence;
  scale: number;
  child: React.ReactNode;
}

function isInsideExcludeZone(
  x: number,
  y: number,
  container: HTMLElement,
  excludeRefs: React.RefObject<HTMLElement | null>[],
  padding: number,
) {
  const containerRect = container.getBoundingClientRect();

  for (const ref of excludeRefs) {
    const el = ref.current;
    if (!el) continue;

    const rect = el.getBoundingClientRect();
    const left = rect.left - containerRect.left - padding;
    const top = rect.top - containerRect.top - padding;
    const right = left + rect.width + padding * 2;
    const bottom = top + rect.height + padding * 2;

    if (x >= left && x <= right && y >= top && y <= bottom) {
      return true;
    }
  }

  return false;
}

const ImageTrail = ({
  children,
  newOnTop = true,
  rotationRange = 15,
  containerRef,
  excludeRefs = [],
  excludePadding = 16,
  animationSequence = [
    [{ scale: 1.2 }, { duration: 0.1, ease: "circOut" }],
    [{ scale: 0 }, { duration: 0.5, ease: "circIn" }],
  ],
  interval = 100,
  minDistance = 0,
}: ImageTrailProps) => {
  const [trail, setTrail] = useState<TrailItemData[]>([]);
  const lastAddedTimeRef = useRef<number>(0);
  const lastSpawnPosRef = useRef({ x: 0, y: 0 });
  const { position: mousePosition } = useMouseVector(containerRef);
  const currentIndexRef = useRef(0);
  const childrenArray = useMemo(() => Children.toArray(children), [children]);

  const addToTrail = useCallback(
    (mousePos: { x: number; y: number }) => {
      if (childrenArray.length === 0) return;

      const newItem: TrailItemData = {
        id: uuidv4(),
        x: mousePos.x,
        y: mousePos.y,
        rotation: (Math.random() - 0.5) * rotationRange * 2,
        animationSequence,
        scale: 1,
        child: childrenArray[currentIndexRef.current],
      };

      currentIndexRef.current =
        (currentIndexRef.current + 1) % childrenArray.length;

      setTrail((current) =>
        newOnTop ? [...current, newItem] : [newItem, ...current],
      );
    },
    [childrenArray, rotationRange, animationSequence, newOnTop],
  );

  const removeFromTrail = useCallback((itemId: string) => {
    setTrail((current) => current.filter((item) => item.id !== itemId));
  }, []);

  useAnimationFrame((time) => {
    const container = containerRef?.current;
    if (
      container &&
      excludeRefs.length > 0 &&
      isInsideExcludeZone(
        mousePosition.x,
        mousePosition.y,
        container,
        excludeRefs,
        excludePadding,
      )
    ) {
      return;
    }

    const dx = mousePosition.x - lastSpawnPosRef.current.x;
    const dy = mousePosition.y - lastSpawnPosRef.current.y;
    const distance = Math.hypot(dx, dy);

    if (minDistance > 0 && distance < minDistance) {
      return;
    }

    if (time - lastAddedTimeRef.current < interval) {
      return;
    }

    lastAddedTimeRef.current = time;
    lastSpawnPosRef.current = mousePosition;
    addToTrail(mousePosition);
  });

  return (
    <div className="pointer-events-none relative h-full w-full">
      {trail.map((item) => (
        <TrailItem key={item.id} item={item} onComplete={removeFromTrail} />
      ))}
    </div>
  );
};

interface TrailItemProps {
  item: TrailItemData;
  onComplete: (id: string) => void;
}

const TrailItem = ({ item, onComplete }: TrailItemProps) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const sequence = item.animationSequence.map((segment: TrailSegment) => [
      scope.current,
      ...segment,
    ]);

    void animate(sequence as AnimationSequence).then(() => {
      onComplete(item.id);
    });
  }, [animate, item.animationSequence, item.id, onComplete, scope]);

  return (
    <motion.div
      ref={scope}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      initial={{ scale: 0.92, opacity: 0 }}
      style={{
        left: item.x,
        top: item.y,
        rotate: item.rotation,
      }}
    >
      {item.child}
    </motion.div>
  );
};

export { ImageTrail };
