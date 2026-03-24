"use client";

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

export function VcsIntakeForm() {
  const { isSubmitting, submit } = useIntakeSubmit("vcs");

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
        title="Firm & contact"
        description="So we know who to pull into the right room—and how you prefer to engage."
      >
        <div className={intakeGrid2}>
          <div>
            <label htmlFor="firmName" className={intakeLabelClass}>
              Firm or fund name
            </label>
            <Input id="firmName" name="firmName" required />
          </div>
          <div>
            <label htmlFor="investorName" className={intakeLabelClass}>
              Your name
            </label>
            <Input id="investorName" name="investorName" required />
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
              Website
            </label>
            <Input id="website" name="website" type="url" required placeholder="https://..." />
          </div>
        </div>
      </IntakeFormSection>

      <IntakeFormSection
        title="Investment profile"
        description="We match thesis to format—demos, curated intros, or themed evenings."
      >
        <div className={intakeGrid2}>
          <div>
            <label htmlFor="checkSize" className={intakeLabelClass}>
              Typical check size
            </label>
            <Input id="checkSize" name="checkSize" required placeholder="e.g. $250k–$2M lead or co-lead" />
          </div>
          <div>
            <label htmlFor="stageFocus" className={intakeLabelClass}>
              Stage focus
            </label>
            <Input id="stageFocus" name="stageFocus" required placeholder="e.g. Pre-seed — Series A" />
          </div>
          <div>
            <label htmlFor="sectorFocus" className={intakeLabelClass}>
              Sector / theme focus
            </label>
            <Input id="sectorFocus" name="sectorFocus" required placeholder="e.g. AI infra, climate hardware" />
          </div>
          <div>
            <label htmlFor="geographicFocus" className={intakeLabelClass}>
              Geography
            </label>
            <Input id="geographicFocus" name="geographicFocus" required placeholder="e.g. SF/Bay, US, global" />
          </div>
        </div>
      </IntakeFormSection>

      <IntakeFormSection
        title="How you like to show up"
        description="Live signal often beats deck review—we want founders who can take real feedback."
      >
        <div className={intakeGrid2}>
          <div className="sm:col-span-2">
            <label htmlFor="openToJudging" className={intakeLabelClass}>
              Open to judging, panels, or regular attendance?
            </label>
            <span className={intakeHelperClass}>Rough cadence is enough (e.g. quarterly panels, monthly dinners).</span>
            <Input
              id="openToJudging"
              name="openToJudging"
              required
              className="mt-2"
              placeholder="e.g. Yes — 1 event/quarter; happy to judge hardware demos"
            />
          </div>
        </div>
        <div>
          <label htmlFor="startupsToMeet" className={intakeLabelClass}>
            Founders you want to see more of
          </label>
          <Textarea
            id="startupsToMeet"
            name="startupsToMeet"
            required
            rows={4}
            placeholder="Stage, sector, technical bar, proof of traction, geography…"
          />
        </div>
        <div>
          <label htmlFor="anythingElse" className={intakeLabelClass}>
            Anything else
          </label>
          <Textarea id="anythingElse" name="anythingElse" rows={3} placeholder="Optional — portfolio themes, conflicts, intro preferences…" />
        </div>
      </IntakeFormSection>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto" size="lg">
        {isSubmitting ? "Sending…" : "Submit investor intake"}
      </Button>
    </form>
  );
}
