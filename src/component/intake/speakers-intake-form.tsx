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

export function SpeakersIntakeForm() {
  const { isSubmitting, submit } = useIntakeSubmit("speakers");

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
        title="Profile"
        description="We program for an operator- and investor-heavy audience—context on your background helps us slot you cleanly."
      >
        <div className={intakeGrid2}>
          <div>
            <label htmlFor="fullName" className={intakeLabelClass}>
              Full name
            </label>
            <Input id="fullName" name="fullName" required autoComplete="name" />
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
          <div>
            <label htmlFor="company" className={intakeLabelClass}>
              Company
            </label>
            <Input id="company" name="company" required />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="roleTitle" className={intakeLabelClass}>
              Role / title
            </label>
            <Input id="roleTitle" name="roleTitle" required placeholder="As you’d want it on a program page" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="webOrLinkedin" className={intakeLabelClass}>
              Website or LinkedIn
            </label>
            <Input id="webOrLinkedin" name="webOrLinkedin" required placeholder="https://..." />
          </div>
        </div>
      </IntakeFormSection>

      <IntakeFormSection
        title="Talk & format fit"
        description="We pair speakers with themes where you have real earned perspective—not generic keynotes."
      >
        <div>
          <label htmlFor="topicExpertise" className={intakeLabelClass}>
            Topics you can own
          </label>
          <span className={intakeHelperClass}>2–3 concrete angles beat a long bio.</span>
          <Textarea
            id="topicExpertise"
            name="topicExpertise"
            required
            rows={3}
            className="mt-2"
            placeholder="e.g. Shipping robotics at scale; fundraising discipline for deep tech; infra lessons from hyperscaler exits…"
          />
        </div>
        <div>
          <label htmlFor="speakingExperience" className={intakeLabelClass}>
            Where you’ve spoken before
          </label>
          <Textarea
            id="speakingExperience"
            name="speakingExperience"
            required
            rows={4}
            placeholder="Conferences, company events, podcasts, notable panels—with one link if helpful."
          />
        </div>
        <div>
          <label htmlFor="whySpeak" className={intakeLabelClass}>
            Why SF Playground
          </label>
          <Textarea
            id="whySpeak"
            name="whySpeak"
            required
            rows={4}
            placeholder="What you want the room to leave with—and why this community is the right audience for you."
          />
        </div>
        <div>
          <label htmlFor="preferredEventType" className={intakeLabelClass}>
            Preferred format
          </label>
          <Input
            id="preferredEventType"
            name="preferredEventType"
            required
            placeholder="e.g. 20-min deep dive + Q&A, fireside, moderated panel"
          />
        </div>
        <div>
          <label htmlFor="anythingElse" className={intakeLabelClass}>
            Anything else
          </label>
          <Textarea id="anythingElse" name="anythingElse" rows={3} placeholder="Optional — travel, timing constraints, co-speaker ideas…" />
        </div>
      </IntakeFormSection>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto" size="lg">
        {isSubmitting ? "Sending…" : "Submit speaker proposal"}
      </Button>
    </form>
  );
}
