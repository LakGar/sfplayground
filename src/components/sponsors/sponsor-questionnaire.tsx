"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  hasClientIntakeDuplicate,
  markClientIntakeDuplicate,
} from "@/lib/intake-duplicate-client";
import { INTAKE_DUPLICATE_MESSAGE } from "@/lib/intake-duplicate-messages";
import { storeIntakeThankYou } from "@/lib/intake-thank-you-personalize";
import { getSponsorStepValidationError } from "@/lib/questionnaire-validation";
import { IntakeFileUpload } from "@/components/questionnaire/intake-file-upload";
import { LogoUploadField } from "@/components/questionnaire/logo-upload-field";
import {
  SPONSOR_QUESTIONNAIRE_STEPS,
  type SponsorFormData,
} from "@/data/sponsors-page-data";

const EASE = [0.22, 1, 0.36, 1] as const;

const INITIAL: SponsorFormData = {
  companyName: "",
  logoUrl: "",
  contactName: "",
  email: "",
  phone: "",
  website: "",
  companyType: "",
  sponsorshipBudgetRange: "",
  interestedIn: [],
  goals: "",
  additionalInfoFileUrl: "",
};

const slideVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function SponsorQuestionnaire() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<SponsorFormData>(INITIAL);
  const [fax, setFax] = useState("");
  const [formStartedAt, setFormStartedAt] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldError, setFieldError] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const current = SPONSOR_QUESTIONNAIRE_STEPS[step];
  const totalSteps = SPONSOR_QUESTIONNAIRE_STEPS.length;
  const isLast = step === totalSteps - 1;
  const showNextControl =
    current?.inputType !== "chips" && current?.inputType !== "multi-chips";

  useEffect(() => {
    setFormStartedAt(Date.now());
  }, []);

  useEffect(() => {
    setFieldError("");
  }, [step, current?.id]);

  useEffect(() => {
    if (current?.inputType === "logo" || current?.inputType === "document") {
      return;
    }
    const t = setTimeout(() => inputRef.current?.focus(), 320);
    return () => clearTimeout(t);
  }, [step, current?.inputType]);

  const patch = useCallback(
    <K extends keyof SponsorFormData>(key: K, value: SponsorFormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setFieldError("");
    },
    [],
  );

  async function checkDuplicateBeforeSubmit(email: string): Promise<boolean> {
    if (hasClientIntakeDuplicate("sponsors", email)) {
      setErrorMessage(INTAKE_DUPLICATE_MESSAGE);
      return true;
    }
    try {
      const res = await fetch("/api/intake/check-duplicate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "sponsors", email: email.trim() }),
      });
      const data = (await res.json().catch(() => null)) as {
        duplicate?: boolean;
        message?: string;
      } | null;
      if (data?.duplicate) {
        markClientIntakeDuplicate("sponsors", email);
        setErrorMessage(data.message ?? INTAKE_DUPLICATE_MESSAGE);
        return true;
      }
    } catch {
      /* proceed */
    }
    return false;
  }

  async function submit() {
    const email = form.email.trim();
    if (await checkDuplicateBeforeSubmit(email)) {
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "sponsors",
          companyName: form.companyName.trim(),
          logoUrl: form.logoUrl.trim(),
          contactName: form.contactName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || "Not provided",
          website: form.website.trim() || "Not provided",
          companyType: form.companyType,
          sponsorshipBudgetRange: form.sponsorshipBudgetRange,
          interestedIn: form.interestedIn.join(", "),
          goals: form.goals.trim(),
          additionalInfoFileUrl: form.additionalInfoFileUrl.trim() || "",
          anythingElse: "",
          fax,
          formStartedAt,
        }),
      });

      const data = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!res.ok) {
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      markClientIntakeDuplicate("sponsors", email);
      storeIntakeThankYou("sponsors", form.contactName);
      router.push("/sponsors/apply/thank-you");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
      setStatus("idle");
    }
  }

  function advanceChip(field: "companyType" | "sponsorshipBudgetRange", value: string) {
    patch(field, value);
    if (step >= totalSteps - 1) return;
    window.setTimeout(() => setStep((s) => s + 1), 380);
  }

  function goNext() {
    if (!current) return;
    const err = getSponsorStepValidationError(current, form);
    if (err) {
      setFieldError(err);
      return;
    }
    setFieldError("");

    if (isLast) {
      void submit();
      return;
    }
    setStep((s) => s + 1);
  }

  function goBack() {
    setFieldError("");
    if (step === 0) return;
    setStep((s) => s - 1);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      current?.inputType !== "textarea" &&
      current?.inputType !== "logo" &&
      current?.inputType !== "document"
    ) {
      e.preventDefault();
      goNext();
    }
  }

  const isOptionalDocument =
    current?.inputType === "document" && current.optional;

  return (
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-xl flex-col justify-center px-6 py-20 md:px-0">
      <div className="relative flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            variants={reduceMotion ? undefined : slideVariants}
            initial={reduceMotion ? false : "enter"}
            animate="center"
            exit={reduceMotion ? undefined : "exit"}
            transition={{ duration: 0.4, ease: EASE }}
            onKeyDown={handleKeyDown}
          >
            <h1 className="font-oswald text-[clamp(1.75rem,4.5vw,2.75rem)] font-bold leading-[1.12] tracking-tight text-black">
              {current.title}
            </h1>
            {current.subtitle ? (
              <p className="mt-3 text-sm text-black/45 md:text-base">{current.subtitle}</p>
            ) : null}

            <div className="mt-8 md:mt-10">
              {current.inputType === "text" || current.inputType === "email" ? (
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  type={current.inputType}
                  value={form[current.field]}
                  onChange={(e) => patch(current.field, e.target.value)}
                  placeholder={current.placeholder}
                  className="w-full border-0 border-b border-black/15 bg-transparent pb-4 font-oswald text-2xl font-medium text-black outline-none transition-colors placeholder:text-black/25 focus:border-black md:text-3xl"
                  autoComplete={
                    current.field === "email"
                      ? "email"
                      : current.field === "companyName"
                        ? "organization"
                        : "name"
                  }
                />
              ) : null}

              {current.inputType === "textarea" ? (
                <textarea
                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                  value={form.goals}
                  onChange={(e) => patch("goals", e.target.value)}
                  placeholder={current.placeholder}
                  rows={5}
                  className="w-full resize-none border-0 border-b border-black/15 bg-transparent py-3 text-base leading-relaxed text-black outline-none placeholder:text-black/25 focus:border-black md:text-lg"
                />
              ) : null}

              {current.inputType === "logo" ? (
                <LogoUploadField
                  value={form.logoUrl}
                  onChange={(url) => patch("logoUrl", url)}
                  label="Choose logo file"
                />
              ) : null}

              {current.inputType === "document" ? (
                <IntakeFileUpload
                  value={form.additionalInfoFileUrl}
                  onChange={(url) => patch("additionalInfoFileUrl", url)}
                  category="document"
                  label="Upload partnership materials"
                />
              ) : null}

              {current.inputType === "chips" && current.options ? (
                <div className="flex flex-wrap gap-2.5">
                  {current.options.map((option) => {
                    const field = current.field as "companyType" | "sponsorshipBudgetRange";
                    const active = form[field] === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => advanceChip(field, option)}
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

              {current.inputType === "multi-chips" && current.options ? (
                <div className="flex flex-wrap gap-2.5">
                  {current.options.map((option) => {
                    const active = form.interestedIn.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          patch(
                            "interestedIn",
                            active
                              ? form.interestedIn.filter((v) => v !== option)
                              : [...form.interestedIn, option],
                          )
                        }
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

            {fieldError ? (
              <p className="mt-4 text-sm text-red-600" role="alert">
                {fieldError}
              </p>
            ) : null}
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
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              disabled={status === "loading"}
              className="text-sm text-black/35 transition-colors hover:text-black"
            >
              ←
            </button>
          ) : null}
          {isOptionalDocument ? (
            <button
              type="button"
              onClick={() => {
                patch("additionalInfoFileUrl", "");
                goNext();
              }}
              disabled={status === "loading"}
              className="text-sm text-black/45 transition-colors hover:text-black"
            >
              Skip
            </button>
          ) : null}
          {showNextControl ? (
            <button
              type="button"
              onClick={goNext}
              disabled={status === "loading"}
              className="rounded-full bg-[#0c1222] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85 disabled:opacity-50"
            >
              {status === "loading" ? "Sending…" : isLast ? "Send" : "Next"}
            </button>
          ) : null}
        </div>

        {errorMessage ? (
          <p className="mt-6 text-sm text-red-600">{errorMessage}</p>
        ) : null}
      </div>
    </div>
  );
}
