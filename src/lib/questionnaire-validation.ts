import type { QuestionnaireStep } from "@/data/network-page-data";

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

type ValidatableStep = Pick<
  QuestionnaireStep,
  | "inputType"
  | "field"
  | "minLength"
  | "minWords"
  | "maxWords"
  | "title"
  | "optional"
>;

export function getStepValidationError(
  step: ValidatableStep,
  value: string,
  options?: { roleSelected?: boolean },
): string | null {
  if (step.inputType === "role") {
    return options?.roleSelected ? null : "Choose a path to continue.";
  }

  const trimmed = value.trim();

  if (step.inputType === "logo") {
    if (!trimmed) {
      return "Upload your logo to continue (PNG, JPG, or WebP, max 5MB).";
    }
    return null;
  }

  if (step.inputType === "document") {
    if (step.optional || trimmed) return null;
    return step.field === "pitchDeckUrl"
      ? "Upload your pitch deck to continue (PDF or PowerPoint, max 15MB)."
      : "Upload a file to continue (PDF, PPT, or DOC, max 15MB).";
  }

  if (step.inputType === "email") {
    if (!trimmed) return "Enter your email address.";
    if (!trimmed.includes("@") || !trimmed.includes(".")) {
      return "Enter a valid email address.";
    }
    return null;
  }

  if (step.inputType === "tel" || step.inputType === "url") {
    if (!trimmed) {
      return step.inputType === "url"
        ? "Add a link so we can learn more."
        : "Enter a phone number (or type “N/A” if you prefer email only).";
    }
    return null;
  }

  if (step.inputType === "chips") {
    return trimmed ? null : "Select an option to continue.";
  }

  if (step.inputType === "text" || step.inputType === "textarea") {
    if (!trimmed) return "This field is required.";

    const words = countWords(trimmed);
    const minWords =
      step.minWords ??
      (step.minLength ? Math.max(1, Math.ceil(step.minLength / 5)) : 0);
    const maxWords = step.maxWords;

    if (minWords > 0 && words < minWords) {
      return `Please write at least ${minWords} words (you have ${words}).`;
    }
    if (maxWords && words > maxWords) {
      return `Please keep it under ${maxWords} words (you have ${words}).`;
    }

    if (step.minLength && trimmed.length < step.minLength) {
      return `Please enter at least ${step.minLength} characters.`;
    }

    return null;
  }

  return trimmed ? null : "This field is required.";
}

export type SponsorQuestionnaireStep = {
  field: string;
  inputType:
    | "text"
    | "email"
    | "textarea"
    | "chips"
    | "multi-chips"
    | "logo"
    | "document";
  minWords?: number;
  optional?: boolean;
};

export function getSponsorStepValidationError(
  step: SponsorQuestionnaireStep,
  form: {
    companyName: string;
    contactName: string;
    email: string;
    companyType: string;
    sponsorshipBudgetRange: string;
    interestedIn: string[];
    goals: string;
    logoUrl: string;
    additionalInfoFileUrl: string;
  },
): string | null {
  if (step.inputType === "logo") {
    return form.logoUrl.trim()
      ? null
      : "Upload your company logo to continue (PNG, JPG, or WebP, max 5MB).";
  }

  if (step.inputType === "document") {
    if (step.optional || form.additionalInfoFileUrl.trim()) return null;
    return null;
  }

  if (step.inputType === "multi-chips") {
    return form.interestedIn.length > 0
      ? null
      : "Select at least one program to continue.";
  }

  if (step.inputType === "chips") {
    const value =
      step.field === "companyType" ? form.companyType : form.sponsorshipBudgetRange;
    return value.trim() ? null : "Select an option to continue.";
  }

  if (step.inputType === "textarea") {
    const trimmed = form.goals.trim();
    if (!trimmed) return "This field is required.";
    const words = countWords(trimmed);
    const minWords = step.minWords ?? 4;
    if (words < minWords) {
      return `Please write at least ${minWords} words (you have ${words}).`;
    }
    return null;
  }

  if (step.inputType === "email") {
    if (!form.email.trim()) return "Enter your email address.";
    if (!form.email.includes("@")) return "Enter a valid email address.";
    return null;
  }

  const value = String(
    form[step.field as keyof typeof form] ?? "",
  ).trim();
  if (!value) return "This field is required.";
  return null;
}
