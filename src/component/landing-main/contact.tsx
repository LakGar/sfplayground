"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight, Mail, Phone } from "lucide-react";

type SubmitState = "idle" | "success" | "error";

const inputClass =
  "w-full border-0 border-b border-white/20 bg-transparent py-3 text-sm text-white placeholder:text-white/35 focus:border-white focus:outline-none focus:ring-0 transition-colors";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formStartedAt, setFormStartedAt] = useState<number>(() => Date.now());

  const coachingPlans = useMemo(
    () => [
      { value: "", label: "Select…" },
      { value: "startup", label: "I want to pitch (startup)" },
      { value: "investor", label: "I\u2019m an investor (intro request)" },
      { value: "partnership", label: "Partnership / sponsorship" },
      { value: "other", label: "Something else" },
    ],
    [],
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);
    setSubmitState("idle");
    setErrorMessage("");

    const formData = new FormData(form);
    const payload = {
      name: (formData.get("name") as string) ?? "",
      email: (formData.get("email") as string) ?? "",
      phone: (formData.get("phone") as string) ?? "",
      coachingPlan: (formData.get("coachingPlan") as string) ?? "",
      message: (formData.get("message") as string) ?? "",
      website: (formData.get("website") as string) ?? "",
      formStartedAt,
    };

    try {
      const response = await fetch("/api/contact", {
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
        setSubmitState("success");
        form.reset();
        setFormStartedAt(Date.now());
        setTimeout(() => setSubmitState("idle"), 2500);
      } else {
        setSubmitState("error");
        setErrorMessage(
          result?.error ||
            `Failed to send message (status ${response.status}). Please try again.`,
        );
      }
    } catch (err) {
      setSubmitState("error");
      setErrorMessage(
        err instanceof Error
          ? `Network error: ${err.message}`
          : "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-black w-full min-h-screen flex justify-center items-center">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: headline + contact info */}
          <div className="text-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                {/* Using an existing brand asset as a stand-in for the avatar */}
                <Image
                  src="/logo-white.png"
                  alt="SF Playground"
                  width={48}
                  height={48}
                  className="w-10 h-10 object-contain"
                  priority
                />
              </div>
            </div>

            <h2 className="font-oswald text-white text-5xl md:text-7xl leading-[1.04]">
              Let&apos;s get
              <br />
              in touch
            </h2>
            <p className="text-white/70 mt-6 max-w-[520px] text-base">
              Whether you&apos;re a startup looking to pitch or an investor
              ready to engage, reach out today and we&apos;ll help you take the
              next step.
            </p>

            <div className="h-px bg-white/15 w-full my-8" />

            <div className="space-y-6">
              <div className="flex items-center gap-3 text-white/70">
                <Phone className="w-4 h-4 text-white/85" />
                <div className=" text-sm">
                  <a
                    href="tel:+14155550123"
                    className="hover:text-white transition-colors"
                  >
                    +1 (415) 555-0123
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Mail className="w-4 h-4 text-white/85" />
                <div className=" text-sm">
                  <a
                    href="mailto:hello@sfplayground.com"
                    className="hover:text-white transition-colors"
                  >
                    hello@sfplayground.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form card */}
          <div className="rounded-3xl bg-white/8 p-6 backdrop-blur md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Status messages */}
              {submitState === "success" && (
                <div className="rounded-md bg-emerald-500/10 text-emerald-200 px-4 py-3     text-sm">
                  Message sent successfully. We&apos;ll get back to you soon.
                </div>
              )}
              {submitState === "error" && (
                <div className="rounded-md  bg-red-500/10 text-red-200 px-4 py-3     text-sm">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-white/80     text-xs"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    minLength={4}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 bg-white/10 rounded-md text-white placeholder-white/50 focus:outline-none   transition-colors     text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-white/80     text-xs"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="example@example.com"
                    className="w-full px-4 py-3 bg-white/10      -white/15 rounded-md text-white placeholder-white/50 focus:outline-none   transition-colors     text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-white/80     text-xs"
                  >
                    Phone <span className="text-white/50">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+123456789"
                    className="w-full px-4 py-3 bg-white/10      -white/15 rounded-md text-white placeholder-white/50 focus:outline-none   transition-colors     text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="coachingPlan"
                    className="block text-white/80     text-xs"
                  >
                    What are you looking for?{" "}
                    <span className="text-black/50">(optional)</span>
                  </label>
                  <select
                    id="coachingPlan"
                    name="coachingPlan"
                    defaultValue=""
                    className="w-full px-4 py-3 bg-white/10      -white/15 rounded-md text-white placeholder-white/50 focus:outline-none   transition-colors     text-sm"
                  >
                    {coachingPlans.map((p) => (
                      <option
                        className="text-black"
                        key={p.value || "empty"}
                        value={p.value}
                      >
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-white/80     text-xs"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={30}
                  rows={5}
                  placeholder="I need..."
                  className="w-full px-4 py-3 bg-white/10      -white/15 rounded-md text-white placeholder-white/50 focus:outline-none   transition-colors     text-sm resize-none"
                />
              </div>

              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-white text-black py-3 px-6 flex items-center justify-between      hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                <span className="flex-1 text-center">
                  {isSubmitting ? "Submitting..." : "Submit form"}
                </span>
                <span className=" w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
