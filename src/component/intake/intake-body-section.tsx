"use client";

import type { ReactNode } from "react";

export type IntakeValuePoint = {
  title: string;
  body: string;
};

function IntakeValueGrid({ points }: { points: IntakeValuePoint[] }) {
  if (points.length === 0) return null;
  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {points.map((p) => (
        <li
          key={p.title}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 md:px-5 md:py-5"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
            {p.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/45">{p.body}</p>
        </li>
      ))}
    </ul>
  );
}

export function IntakeBodySection({
  whyTitle,
  whyBody,
  valuePoints,
  /** Sparse reassurance above the form card (e.g. manual review). */
  formMicrocopy,
  children,
}: {
  whyTitle: string;
  whyBody: string;
  valuePoints?: IntakeValuePoint[];
  formMicrocopy?: string;
  children: ReactNode;
}) {
  const points = valuePoints ?? [];
  return (
    <section className="relative bg-black px-4 pb-20 pt-12 md:px-8 md:pb-28 md:pt-16 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 border-b border-white/[0.08] pb-10 md:mb-14 md:pb-14">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">{whyTitle}</h2>
          <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-white/55 md:text-lg">
            {whyBody}
          </p>
          {points.length > 0 ? <IntakeValueGrid points={points} /> : null}
        </div>
        {formMicrocopy ? (
          <p className="mb-4 max-w-2xl text-sm leading-relaxed text-white/40 md:mb-5">{formMicrocopy}</p>
        ) : null}
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md md:p-10">
          {children}
        </div>
      </div>
    </section>
  );
}
