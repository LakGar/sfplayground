"use client";

import Link from "next/link";
import { toast } from "sonner";
import type { IntakeKind } from "@/lib/intake-types";
import { INTAKE_SUCCESS_COPY } from "@/lib/intake-success-copy";

export function showIntakeSuccessToast(kind: IntakeKind) {
  const { headline, body, links } = INTAKE_SUCCESS_COPY[kind];

  toast.success(headline, {
    description: (
      <div className="mt-1 space-y-3">
        <p className="text-sm leading-relaxed opacity-95">{body}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-white/10 pt-3 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-medium text-white underline-offset-4 hover:underline"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    ),
    duration: 12_000,
  });
}

export function showIntakeErrorToast(message: string) {
  toast.error("Something went wrong", {
    description: message,
    duration: 10_000,
  });
}
