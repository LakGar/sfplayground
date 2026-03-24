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

const INTEREST_OPTIONS = [
  { value: "Event Sponsorship", label: "Event sponsorship — stage, hospitality, and in-room presence" },
  { value: "Fellowship Sponsorship", label: "Fellowship — support operators in a structured program" },
  { value: "Community Partnership", label: "Community partnership — co-hosting, content, or member value" },
  { value: "Custom Package", label: "Custom package — combine formats for your brand goals" },
];

export function SponsorsIntakeForm() {
  const { isSubmitting, submit } = useIntakeSubmit("sponsors");

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
        title="Company & contact"
        description="We’ll use this to route your inquiry to the right person on our team."
      >
        <div className={intakeGrid2}>
          <div>
            <label htmlFor="companyName" className={intakeLabelClass}>
              Company name
            </label>
            <Input id="companyName" name="companyName" required placeholder="Acme Inc." />
          </div>
          <div>
            <label htmlFor="contactName" className={intakeLabelClass}>
              Primary contact
            </label>
            <Input id="contactName" name="contactName" required placeholder="Jane Doe" />
          </div>
          <div>
            <label htmlFor="email" className={intakeLabelClass}>
              Work email
            </label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div>
            <label htmlFor="phone" className={intakeLabelClass}>
              Phone
            </label>
            <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
            <span className={intakeHelperClass}>For a quick scheduling ping if we’re a fit.</span>
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
        title="Partnership shape"
        description="Rough range and structures help us come back with realistic options—not a binding quote."
      >
        <div className={intakeGrid2}>
          <div>
            <label htmlFor="companyType" className={intakeLabelClass}>
              Company type
            </label>
            <Input id="companyType" name="companyType" required placeholder="e.g. Enterprise brand, devtools, cloud" />
            <span className={intakeHelperClass}>How you show up in market—so we can align narrative and audience.</span>
          </div>
          <div>
            <label htmlFor="sponsorshipBudgetRange" className={intakeLabelClass}>
              Planned sponsorship range
            </label>
            <Input
              id="sponsorshipBudgetRange"
              name="sponsorshipBudgetRange"
              required
              placeholder="e.g. $15–40k for Q3 programs"
            />
            <span className={intakeHelperClass}>Ballpark is enough; we tailor packages to goals and timing.</span>
          </div>
        </div>
      </IntakeFormSection>

      <IntakeFormSection
        title="What you’re interested in"
        description="Select everything that might apply—we’ll consolidate in our reply."
      >
        <fieldset className="space-y-3">
          <legend className="sr-only">Partnership interests</legend>
          <div className="grid gap-3 sm:grid-cols-1">
            {INTEREST_OPTIONS.map((o) => (
              <label
                key={o.value}
                className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white/90 transition-colors hover:border-white/22 md:items-center md:py-3.5"
              >
                <input
                  type="checkbox"
                  name="interestedIn"
                  value={o.value}
                  className="mt-0.5 size-4 shrink-0 accent-neutral-300 md:mt-0"
                />
                <span className="leading-snug">{o.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </IntakeFormSection>

      <IntakeFormSection
        title="Goals & context"
        description="The more concrete you are, the faster we can propose a credible path."
      >
        <div>
          <label htmlFor="goals" className={intakeLabelClass}>
            What does success look like?
          </label>
          <span className={intakeHelperClass}>
            Audience you want in front of (founders, investors, operators), proof points, and any launch or campaign timing.
          </span>
          <Textarea
            id="goals"
            name="goals"
            required
            rows={4}
            className="mt-2"
            placeholder="e.g. Demo a new API to senior eng leaders; meet 10 seed-stage teams; align brand with frontier hardware…"
          />
        </div>
        <div>
          <label htmlFor="anythingElse" className={intakeLabelClass}>
            Anything else
          </label>
          <Textarea id="anythingElse" name="anythingElse" rows={3} placeholder="Optional — constraints, regions, past partnerships…" />
        </div>
      </IntakeFormSection>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto" size="lg">
        {isSubmitting ? "Sending…" : "Request partnership overview"}
      </Button>
    </form>
  );
}
