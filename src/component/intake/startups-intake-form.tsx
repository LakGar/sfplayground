"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useIntakeSubmit } from "./use-intake-submit";
import {
  IntakeFormSection,
  IntakeHoneypot,
  intakeGrid2,
  intakeHelperClass,
  intakeLabelClass,
} from "./intake-form-primitives";

export function StartupsIntakeForm() {
  const [fundraising, setFundraising] = useState("");
  const { isSubmitting, submit } = useIntakeSubmit("startups", {
    onSuccess: () => setFundraising(""),
  });

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        submit(e.currentTarget);
      }}
      noValidate
    >
      <IntakeHoneypot />

      <IntakeFormSection
        title="Company snapshot"
        description="Short and specific beats long decks—we’re looking for clarity on what you build and who it’s for."
      >
        <div className={intakeGrid2}>
          <div>
            <label htmlFor="startupName" className={intakeLabelClass}>
              Company name
            </label>
            <Input id="startupName" name="startupName" required />
          </div>
          <div>
            <label htmlFor="founderName" className={intakeLabelClass}>
              Founder submitting
            </label>
            <Input id="founderName" name="founderName" required placeholder="Name as you’d introduce yourself" />
          </div>
          <div>
            <label htmlFor="email" className={intakeLabelClass}>
              Email
            </label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div>
            <label htmlFor="phone" className={intakeLabelClass}>
              Phone
            </label>
            <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="website" className={intakeLabelClass}>
              Website or product link
            </label>
            <Input id="website" name="website" type="url" required placeholder="https://..." />
          </div>
          <div>
            <label htmlFor="stage" className={intakeLabelClass}>
              Stage
            </label>
            <Input id="stage" name="stage" required placeholder="e.g. Pre-seed, Seed, Series A" />
          </div>
          <div>
            <label htmlFor="industry" className={intakeLabelClass}>
              Category
            </label>
            <Input id="industry" name="industry" required placeholder="e.g. robotics infra, LLM tooling" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="description" className={intakeLabelClass}>
              One-sentence pitch
            </label>
            <Input id="description" name="description" required maxLength={500} placeholder="What you do, for whom, and why it’s hard" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="teamSize" className={intakeLabelClass}>
              Team
            </label>
            <Input id="teamSize" name="teamSize" required placeholder="e.g. 6 full-time, 2 contractors" />
          </div>
        </div>
      </IntakeFormSection>

      <IntakeFormSection title="Fundraising" description="Helps us route you without putting you on the wrong stage.">
        <fieldset className="space-y-3">
          <legend className={intakeLabelClass}>Currently fundraising?</legend>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            {(
              [
                ["yes", "Yes — actively raising"],
                ["no", "Not right now"],
              ] as const
            ).map(([val, label]) => (
              <label
                key={val}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm text-white/90 transition-colors sm:min-w-[10.5rem] ${
                  fundraising === val
                    ? "border-white/45 bg-white/[0.08]"
                    : "border-white/12 bg-white/[0.04] hover:border-white/20"
                }`}
              >
                <input
                  type="radio"
                  name="fundraising"
                  value={val}
                  required
                  checked={fundraising === val}
                  onChange={() => setFundraising(val)}
                  className="size-4 accent-neutral-300"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        {fundraising === "yes" ? (
          <div>
            <label htmlFor="roundAndTarget" className={intakeLabelClass}>
              Round & target raise
            </label>
            <Input
              id="roundAndTarget"
              name="roundAndTarget"
              required={fundraising === "yes"}
              placeholder="e.g. Seed, $3M target"
            />
          </div>
        ) : null}
        {fundraising === "no" ? <input type="hidden" name="roundAndTarget" value="—" /> : null}
      </IntakeFormSection>

      <IntakeFormSection
        title="What you want from SF Playground"
        description="Events, intros, feedback, visibility—we’ll read this closely when we allocate room."
      >
        <div>
          <label htmlFor="lookingFor" className={intakeLabelClass}>
            What would make this worth your time?
          </label>
          <span className={intakeHelperClass}>
            Best for teams building in AI, robotics, frontier tech, and startup infrastructure—but we’re open if the build is exceptional.
          </span>
          <Textarea
            id="lookingFor"
            name="lookingFor"
            required
            rows={4}
            className="mt-2"
            placeholder="e.g. Pitch slot, investor intros, design partners, peer feedback, hiring visibility…"
          />
        </div>
        <div>
          <label htmlFor="anythingElse" className={intakeLabelClass}>
            Anything else
          </label>
          <Textarea id="anythingElse" name="anythingElse" rows={3} placeholder="Optional — traction, notable customers, links…" />
        </div>
      </IntakeFormSection>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto" size="lg">
        {isSubmitting ? "Sending…" : "Submit application"}
      </Button>
    </form>
  );
}
