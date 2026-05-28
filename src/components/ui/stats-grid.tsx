"use client";

import { FadeInView } from "@/components/ui/fade-in-view";
import { StatCountUp } from "@/components/ui/stat-count-up";

export type StatGridItem = {
  value: string;
  label: string;
};

type StatsGridProps = {
  stats: readonly StatGridItem[];
  className?: string;
  itemClassName?: string;
  valueClassName?: string;
  labelClassName?: string;
};

const DEFAULT_GRID_CLASS =
  "grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8";
const DEFAULT_VALUE_CLASS =
  "font-oswald text-[clamp(2.5rem,6vw,4rem)] font-bold leading-none tracking-tight text-black";
const DEFAULT_LABEL_CLASS =
  "mt-3 max-w-[16rem] text-sm leading-relaxed text-black/65 md:text-[0.9375rem]";

export function StatsGrid({
  stats,
  className = DEFAULT_GRID_CLASS,
  itemClassName,
  valueClassName = DEFAULT_VALUE_CLASS,
  labelClassName = DEFAULT_LABEL_CLASS,
}: StatsGridProps) {
  return (
    <ul className={className}>
      {stats.map((stat, index) => (
        <li key={`${stat.value}-${stat.label}`} className={itemClassName}>
          <FadeInView direction="up" delay={index * 0.08}>
            <p className={valueClassName}>
              <StatCountUp value={stat.value} delay={index * 0.1} />
            </p>
            <p className={labelClassName}>{stat.label}</p>
          </FadeInView>
        </li>
      ))}
    </ul>
  );
}
