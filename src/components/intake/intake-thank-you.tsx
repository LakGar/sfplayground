"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { isIntakeKind } from "@/data/intake-thank-you-pages";
import type { IntakeKind } from "@/lib/intake-types";
import {
  clearIntakeThankYou,
  formatFirstName,
  personalizeThankYouPage,
  readIntakeThankYou,
  type IntakeThankYouStored,
  type PersonalizedThankYou,
} from "@/lib/intake-thank-you-personalize";

const EASE = [0.22, 1, 0.36, 1] as const;

function CheckIcon({ accent }: { accent: string }) {
  return (
    <div
      className="flex h-14 w-14 items-center justify-center rounded-full"
      style={{ backgroundColor: `${accent}18` }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-7 w-7"
        style={{ color: accent }}
        aria-hidden
      >
        <path
          d="M20 6L9 17l-5-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function IntakeThankYouContent({
  kind,
  page,
  name,
}: {
  kind: IntakeKind;
  page: PersonalizedThankYou;
  name: string;
}) {
  const reduceMotion = useReducedMotion();
  const first = formatFirstName(name);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EASE }}
      className="mx-auto w-full max-w-2xl px-4 py-24 md:px-0 md:py-28"
    >
      <CheckIcon accent={page.accent} />

      <p className="mt-6 text-xs font-medium tracking-[0.2em] text-black/40 uppercase">
        {page.eyebrow}
      </p>
      <h1 className="mt-3 font-oswald text-4xl font-bold leading-tight tracking-tight text-black md:text-5xl">
        {page.headline}
      </h1>
      <p className="mt-2 font-oswald text-xl font-medium text-black/70 md:text-2xl">
        {page.subheadline}
      </p>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-black/60">
        {page.body}
      </p>

      {first ? (
        <p className="mt-4 text-sm text-black/45">
          We saved your details under the name you provided
          {name.trim() !== first ? ` (${name.trim()})` : ""}.
        </p>
      ) : null}

      <ol className="mt-10 space-y-4 border-t border-black/[0.06] pt-10">
        {page.steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-oswald text-sm font-bold text-white"
              style={{ backgroundColor: page.accent }}
            >
              {index + 1}
            </span>
            <div>
              <p className="font-medium text-black">{step.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-black/55">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          href={page.primaryCta.href}
          className="inline-flex rounded-full px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: page.accent }}
          {...(page.primaryCta.href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {page.primaryCta.label}
        </Link>
        <Link
          href={page.secondaryCta.href}
          className="inline-flex rounded-full border border-black/10 bg-white/80 px-6 py-3 text-sm font-medium text-black backdrop-blur-sm transition-opacity hover:opacity-75"
          {...(page.secondaryCta.href.startsWith("http") ||
          page.secondaryCta.href.startsWith("mailto")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {page.secondaryCta.label}
        </Link>
      </div>

      <p className="mt-8 text-xs text-black/35">
        {kind} application ·{" "}
        <Link href="/" className="underline-offset-2 hover:underline">
          sfplayground.com
        </Link>
      </p>
    </motion.div>
  );
}

export function IntakeThankYouFromParam({
  typeParam,
  nameParam,
  backHref,
  backLabel,
}: {
  typeParam: string | null;
  nameParam?: string | null;
  backHref: string;
  backLabel: string;
}) {
  const [stored] = useState<IntakeThankYouStored | null>(() => {
    const nextStored = readIntakeThankYou();
    clearIntakeThankYou();
    return nextStored;
  });

  const resolvedName = stored?.name || nameParam?.trim() || "";
  const kind =
    typeParam && isIntakeKind(typeParam)
      ? typeParam
      : stored?.kind && isIntakeKind(stored.kind)
        ? stored.kind
        : null;

  const page = useMemo(() => {
    if (!kind || !isIntakeKind(kind)) return null;
    return personalizeThankYouPage(kind, resolvedName);
  }, [kind, resolvedName]);

  if (!kind || !page) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-black/60">We couldn’t find that confirmation page.</p>
        <Link
          href={backHref}
          className="mt-6 inline-block text-sm font-medium text-black underline-offset-2 hover:underline"
        >
          {backLabel}
        </Link>
      </div>
    );
  }

  return <IntakeThankYouContent kind={kind} page={page} name={resolvedName} />;
}
