"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";

const CONTACT_EMAIL = "staff@sfplaygroundai.com";

const SOCIAL_LINKS = [
  { label: "LinkedIn", abbr: "LI", href: "https://www.linkedin.com/company/sfplayground" },
  { label: "Instagram", abbr: "IG", href: "https://www.instagram.com/sfplayground/" },
  { label: "X", abbr: "X", href: "https://x.com/sfplayground" },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
  multiline,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  multiline?: boolean;
}) {
  const sharedClassName =
    "mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3.5 text-base text-black outline-none transition-colors placeholder:text-black/30 focus:border-black/30 md:px-5 md:py-4";

  return (
    <div>
      <label htmlFor={id} className="text-sm text-black/45">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          rows={5}
          placeholder={placeholder}
          className={`${sharedClassName} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          className={sharedClassName}
        />
      )}
    </div>
  );
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 0.75, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [formStartedAt, setFormStartedAt] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setFormStartedAt(Date.now());
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          website,
          formStartedAt,
        }),
      });

      const data = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!res.ok) {
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
      setFormStartedAt(Date.now());
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <section
      className="bg-white px-4 py-16 md:px-8 md:py-24 lg:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-3xl">
              <p className="text-sm text-black/45">Get in touch</p>
              <h2
                id="contact-heading"
                className="mt-4 font-oswald text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-black"
              >
                Got an event in mind? Let&apos;s chat and bring it to life.
              </h2>
            </div>

            <nav aria-label="Social links">
              <ul className="flex items-center gap-3 text-sm tracking-[0.18em] text-black/45 md:text-base">
                {SOCIAL_LINKS.map(({ label, abbr, href }, index) => (
                  <li key={label} className="flex items-center gap-3">
                    {index > 0 ? (
                      <span className="text-black/20" aria-hidden>
                        /
                      </span>
                    ) : null}
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-black"
                      aria-label={label}
                    >
                      {abbr}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Reveal>

        <div className="my-10 border-t border-black/[0.08] md:my-12 lg:my-14" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-24">
          <Reveal delay={0.08}>
            <div>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-oswald text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight text-black transition-opacity hover:opacity-60"
              >
                {CONTACT_EMAIL}
              </a>
              <span className="mt-4 block h-px w-16 bg-black" aria-hidden />
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div>
              <h3 className="font-oswald text-2xl font-bold tracking-tight text-black md:text-3xl">
                Send a message
              </h3>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5 md:mt-10 md:space-y-6">
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden
                />

                <FormField
                  id="contact-name"
                  label="Name"
                  value={name}
                  onChange={setName}
                  placeholder="Name"
                  required
                />
                <FormField
                  id="contact-email"
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="Email"
                  required
                />
                <FormField
                  id="contact-message"
                  label="Message"
                  value={message}
                  onChange={setMessage}
                  placeholder="Project details"
                  multiline
                  required
                />

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="rounded-full bg-[#0c1222] px-10 py-3.5 text-sm font-medium tracking-[0.12em] text-white transition-opacity hover:opacity-85 disabled:opacity-50"
                  >
                    {status === "loading" ? "SENDING…" : "SEND MESSAGE"}
                  </button>

                  {status === "success" ? (
                    <p className="mt-4 text-sm text-black/60">
                      Message sent. We&apos;ll get back to you soon.
                    </p>
                  ) : null}
                  {status === "error" ? (
                    <p className="mt-4 text-sm text-red-600">{errorMessage}</p>
                  ) : null}
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
