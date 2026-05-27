"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { INTAKE_SUCCESS_COPY } from "@/lib/intake-success-copy";
import type { IntakeKind } from "@/lib/intake-types";
import {
  getActiveSteps,
  NETWORK_ROLES,
  ROLE_SELECT_STEP,
  type QuestionnaireStep,
} from "@/data/network-page-data";

const EASE = [0.22, 1, 0.36, 1] as const;

const slideVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

function isValidKind(v: string | null): v is IntakeKind {
  return v === "startups" || v === "vcs" || v === "speakers";
}

export default function NetworkQuestionnaire() {
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();
  const [role, setRole] = useState<IntakeKind | "">("");
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [fax, setFax] = useState("");
  const [formStartedAt, setFormStartedAt] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const inRolePhase = !role;
  const activeSteps = role ? getActiveSteps(role, values) : [];
  const current: QuestionnaireStep | undefined = inRolePhase
    ? ROLE_SELECT_STEP
    : activeSteps[step];
  const isLast = !inRolePhase && step === activeSteps.length - 1;

  useEffect(() => {
    setFormStartedAt(Date.now());
    const type = searchParams.get("type");
    if (isValidKind(type)) {
      setRole(type);
      setStep(0);
    }
  }, [searchParams]);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 320);
    return () => clearTimeout(t);
  }, [step, role]);

  const patch = useCallback((field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  function canContinue(): boolean {
    if (!current) return false;

    if (current.inputType === "role") {
      return Boolean(role);
    }

    const value = values[current.field] ?? "";

    if (current.inputType === "textarea") {
      return value.trim().length >= (current.minLength ?? 15);
    }
    if (current.inputType === "chips") {
      return value.trim().length > 0;
    }
    if (current.inputType === "email") {
      return value.includes("@");
    }
    if (current.inputType === "tel" || current.inputType === "url") {
      return value.trim().length > 0;
    }
    return value.trim().length > 0;
  }

  function buildPayload() {
    return {
      type: role,
      ...values,
      fax,
      formStartedAt,
    };
  }

  async function submit() {
    if (!role) return;
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
      setStatus("idle");
    }
  }

  function goNext() {
    if (!canContinue()) return;

    if (inRolePhase) {
      setStep(0);
      return;
    }

    if (isLast) {
      void submit();
      return;
    }

    setStep((s) => s + 1);
  }

  function goBack() {
    if (inRolePhase) return;
    if (step === 0) {
      setRole("");
      setStep(0);
      return;
    }
    setStep((s) => s - 1);
  }

  function advanceChip(field: string, option: string) {
    patch(field, option);
    if (inRolePhase || step >= activeSteps.length - 1) return;
    window.setTimeout(() => setStep((s) => s + 1), 380);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      current?.inputType !== "textarea" &&
      current?.inputType !== "role"
    ) {
      e.preventDefault();
      goNext();
    }
  }

  const successCopy = role ? INTAKE_SUCCESS_COPY[role] : null;

  if (status === "success" && successCopy) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mx-auto flex min-h-[70vh] w-full max-w-xl flex-col justify-center px-4 py-24 md:px-0"
      >
        <p className="text-xs font-medium tracking-[0.2em] text-black/40 uppercase">
          Application received
        </p>
        <h1 className="mt-4 font-oswald text-4xl font-bold leading-tight tracking-tight text-black md:text-5xl">
          {successCopy.headline}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-black/60">{successCopy.body}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          {successCopy.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex rounded-full border border-black/10 bg-white/80 px-6 py-3 text-sm font-medium text-black backdrop-blur-sm transition-opacity hover:opacity-75"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/network"
            className="inline-flex rounded-full bg-[#0c1222] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-85"
          >
            Back to network
          </Link>
        </div>
      </motion.div>
    );
  }

  const showBack = !inRolePhase && (step > 0 || role);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-xl flex-col justify-center px-6 py-20 md:px-0">
      <div className="relative flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={inRolePhase ? "role" : current?.id}
            variants={reduceMotion ? undefined : slideVariants}
            initial={reduceMotion ? false : "enter"}
            animate="center"
            exit={reduceMotion ? undefined : "exit"}
            transition={{ duration: 0.4, ease: EASE }}
            onKeyDown={handleKeyDown}
          >
            <h1 className="font-oswald text-[clamp(1.75rem,4.5vw,2.75rem)] font-bold leading-[1.12] tracking-tight text-black">
              {current?.title}
            </h1>

            <div className="mt-8 md:mt-10">
              {current?.inputType === "role" ? (
                <div className="flex flex-col gap-3">
                  {NETWORK_ROLES.map((r) => {
                    const active = role === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRole(r.id)}
                        className={`w-full border-b py-4 text-left transition-colors ${
                          active
                            ? "border-black text-black"
                            : "border-black/10 text-black/50 hover:border-black/25 hover:text-black/80"
                        }`}
                      >
                        <p className="font-oswald text-lg font-bold tracking-tight md:text-xl">
                          {r.label}
                        </p>
                      </button>
                    );
                  })}
                </div>
              ) : null}

              {current &&
              (current.inputType === "text" ||
                current.inputType === "email" ||
                current.inputType === "tel" ||
                current.inputType === "url") ? (
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  type={
                    current.inputType === "text" ? "text" : current.inputType
                  }
                  value={values[current.field] ?? ""}
                  onChange={(e) => patch(current.field, e.target.value)}
                  placeholder={current.placeholder}
                  className="w-full border-0 border-b border-black/15 bg-transparent pb-4 font-oswald text-2xl font-medium text-black outline-none transition-colors placeholder:text-black/25 focus:border-black md:text-3xl"
                />
              ) : null}

              {current?.inputType === "textarea" ? (
                <textarea
                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                  value={values[current.field] ?? ""}
                  onChange={(e) => patch(current.field, e.target.value)}
                  placeholder={current.placeholder}
                  rows={5}
                  className="w-full resize-none border-0 border-b border-black/15 bg-transparent py-3 text-base leading-relaxed text-black outline-none placeholder:text-black/25 focus:border-black md:text-lg"
                />
              ) : null}

              {current?.inputType === "chips" && current.options ? (
                <div className="flex flex-wrap gap-2.5">
                  {current.options.map((option) => {
                    const active = values[current.field] === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => advanceChip(current.field, option)}
                        className={`rounded-full border px-4 py-2.5 text-sm transition-colors md:text-base ${
                          active
                            ? "border-black bg-black text-white"
                            : "border-black/10 text-black/60 hover:border-black/25"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </motion.div>
        </AnimatePresence>

        <input
          type="text"
          name="fax"
          value={fax}
          onChange={(e) => setFax(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden
        />

        <div className="mt-10 flex items-center justify-end gap-6">
          {showBack ? (
            <button
              type="button"
              onClick={goBack}
              disabled={status === "loading"}
              className="text-sm text-black/35 transition-colors hover:text-black"
            >
              ←
            </button>
          ) : null}
          <button
            type="button"
            onClick={goNext}
            disabled={!canContinue() || status === "loading"}
            className="text-sm font-medium text-black transition-opacity hover:opacity-50 disabled:opacity-30"
          >
            {status === "loading" ? "…" : "→"}
          </button>
        </div>

        {errorMessage ? (
          <p className="mt-6 text-sm text-red-600">{errorMessage}</p>
        ) : null}
      </div>
    </div>
  );
}
