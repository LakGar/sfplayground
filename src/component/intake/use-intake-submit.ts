"use client";

import { useCallback, useRef, useState } from "react";
import type { IntakeKind } from "@/lib/intake-types";
import { showIntakeErrorToast, showIntakeSuccessToast } from "./intake-submit-toasts";

type UseIntakeSubmitOptions = {
  /** e.g. reset local React state after `form.reset()` (controlled fields). */
  onSuccess?: () => void;
};

export function useIntakeSubmit(kind: IntakeKind, options?: UseIntakeSubmitOptions) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const startedRef = useRef(Date.now());
  const lastSubmitAt = useRef(0);
  const onSuccessRef = useRef(options?.onSuccess);
  onSuccessRef.current = options?.onSuccess;

  const resetStartTime = useCallback(() => {
    startedRef.current = Date.now();
  }, []);

  const submit = useCallback(
    async (form: HTMLFormElement) => {
      const now = Date.now();
      if (isSubmitting) return;
      if (now - lastSubmitAt.current < 1200) return;
      lastSubmitAt.current = now;

      setIsSubmitting(true);

      const fd = new FormData(form);
      const payload: Record<string, unknown> = {
        type: kind,
        formStartedAt: startedRef.current,
      };
      const keys = new Set<string>();
      for (const k of fd.keys()) keys.add(k);
      for (const k of keys) {
        const all = fd.getAll(k);
        const strings = all.filter((x): x is string => typeof x === "string");
        if (strings.length === 0) continue;
        payload[k] = strings.length === 1 ? strings[0]! : strings.join(", ");
      }

      try {
        const response = await fetch("/api/intake", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        let result: { success?: boolean; error?: string } | null = null;
        const raw = await response.text();
        if (raw) {
          try {
            result = JSON.parse(raw) as { success?: boolean; error?: string };
          } catch {
            result = null;
          }
        }

        if (response.ok && result?.success) {
          form.reset();
          resetStartTime();
          onSuccessRef.current?.();
          showIntakeSuccessToast(kind);
        } else {
          showIntakeErrorToast(
            result?.error || `Something went wrong (${response.status}). Please try again.`,
          );
        }
      } catch {
        showIntakeErrorToast("Network error. Please check your connection and try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, kind, resetStartTime],
  );

  return {
    isSubmitting,
    submit,
    resetStartTime,
  };
}
