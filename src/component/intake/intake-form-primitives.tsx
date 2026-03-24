"use client";

import type { ReactNode } from "react";

export const intakeLabelClass =
  "block text-white/80 text-xs font-medium mb-1.5 uppercase tracking-wider";

export const intakeHelperClass =
  "mt-1.5 block text-xs leading-relaxed text-white/40";

export const intakeGrid2 = "grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5";

export function IntakeHoneypot() {
  return (
    <input
      type="text"
      name="fax"
      autoComplete="off"
      tabIndex={-1}
      className="pointer-events-none absolute left-[-9999px] h-px w-px opacity-0"
      aria-hidden
    />
  );
}

/** Groups fields under a subtle divider — reduces perceived form length. */
export function IntakeFormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-4 border-t border-white/[0.07] pt-6 first:border-0 first:pt-0">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/90">
          {title}
        </h3>
        {description ? (
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-white/45">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}
