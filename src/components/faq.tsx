"use client";

import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";
import { FAQ_ITEMS, type FaqAction } from "@/data/faq-data";

const EASE = [0.22, 1, 0.36, 1] as const;

const actionClassName =
  "mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#0c1222] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85";

function FaqActionButton({ action }: { action: FaqAction }) {
  const content = (
    <>
      {action.label}
      <span aria-hidden>→</span>
    </>
  );

  if (
    action.external ||
    action.href.startsWith("http") ||
    action.href.startsWith("mailto:")
  ) {
    return (
      <a
        href={action.href}
        className={actionClassName}
        {...(action.external || action.href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={action.href} className={actionClassName}>
      {content}
    </Link>
  );
}

function FaqAccordionItem({
  question,
  answer,
  action,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string | ReactNode;
  action: FaqAction;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <motion.div
      className="border-b border-black/[0.08]"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        delay: index * 0.06,
        duration: 0.65,
        ease: EASE,
      }}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-start justify-between gap-6 py-5 text-left md:py-6"
        >
          <span className="text-base font-medium leading-snug text-black/90 transition-colors duration-300 group-hover:text-black md:text-lg">
            {question}
          </span>
          <motion.span
            className="mt-0.5 shrink-0 text-black/35"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            aria-hidden
          >
            <ChevronDown className="h-5 w-5 stroke-[1.75]" />
          </motion.span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <motion.div
            className="faq-answer max-w-2xl pb-5 text-sm leading-relaxed text-black/55 md:pb-6 md:text-[0.95rem] md:leading-7"
            initial={false}
            animate={{
              opacity: isOpen ? 1 : 0,
              y: isOpen ? 0 : -6,
            }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {answer}
            <FaqActionButton action={action} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function FaqHeading() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <h2
        id="faq-heading"
        className="font-oswald text-5xl font-bold tracking-tight text-black md:text-6xl lg:text-7xl"
      >
        FAQ.
      </h2>
    );
  }

  return (
    <motion.h2
      id="faq-heading"
      className="font-oswald text-5xl font-bold tracking-tight text-black md:text-6xl lg:text-7xl"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.75, ease: EASE }}
    >
      FAQ.
    </motion.h2>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className="bg-white px-4 py-16 md:px-8 md:py-24 lg:py-28"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-12 lg:gap-20">
        <div className="md:pt-2">
          <FaqHeading />
        </div>

        <div className="border-t border-black/[0.08]">
          {FAQ_ITEMS.map((item, index) => (
            <FaqAccordionItem
              key={item.question}
              index={index}
              question={item.question}
              answer={item.answer}
              action={item.action}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex((current) => (current === index ? -1 : index))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
