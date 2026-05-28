"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

const CONTACT_EMAIL = "staff@sfplaygroundai.com";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/sfplayground",
    Icon: LinkedInIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sfplayground/",
    Icon: InstagramIcon,
  },
  {
    label: "X",
    href: "https://x.com/sf_playgro27142",
    Icon: XIcon,
  },
] as const;

function UnderlineField({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm text-black/45">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-2 w-full border-0 border-b border-black/25 bg-transparent pb-3 text-base text-black outline-none transition-colors placeholder:text-transparent focus:border-black"
      />
    </div>
  );
}

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || undefined,
          email: email.trim(),
        }),
      });
      if (!res.ok) throw new Error("Subscribe failed");
      setName("");
      setEmail("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="bg-[#ebb8ff]/30 text-black">
      <div className="mx-auto max-w-[1400px] px-6 py-14 md:px-10 md:py-20 lg:px-14 lg:py-24">
        {/* Top row: logo + social */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex shrink-0 items-center overflow-hidden rounded-full"
          >
            <Image
              src="/images/logo.png"
              alt="SFPLAYGROUND"
              width={52}
              height={52}
            />
          </Link>
          <nav aria-label="Social links">
            <ul className="flex items-center gap-5 md:gap-6">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-black/35 transition-colors hover:text-black/70"
                  >
                    <Icon className="h-5 w-5 md:h-[22px] md:w-[22px]" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main content */}
        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-2 lg:gap-20">
          {/* Contact */}
          <div className="max-w-xl">
            <p className="text-[clamp(1.75rem,4vw,3.25rem)] font-normal leading-[1.15] tracking-tight text-black">
              We&apos;d love to hear from you — whether you have an event in
              mind, or just want to say hi.
            </p>
            <div className="mt-10 md:mt-12">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[clamp(1.25rem,2.5vw,2rem)] font-normal tracking-tight text-black transition-opacity hover:opacity-60"
              >
                {CONTACT_EMAIL}
              </a>
              <span className="mt-3 block h-px w-14 bg-black" aria-hidden />
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col lg:max-w-lg lg:justify-self-end lg:w-full">
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.1] tracking-tight text-black">
              Join our newsletter
            </h2>
            <p className="mt-3 font-mono text-xs tracking-wide text-black/50 md:text-sm">
              Event updates, founder stories, and investor insights from the
              team.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-8 md:mt-12">
              <UnderlineField
                id="name"
                label="Name"
                value={name}
                onChange={setName}
              />
              <UnderlineField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                required
              />
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="rounded-full bg-black px-10 py-3.5 text-sm font-medium tracking-[0.2em] text-white transition-opacity hover:opacity-80 disabled:opacity-50"
                >
                  {status === "loading" ? "SENDING…" : "SEND"}
                </button>
                {status === "success" ? (
                  <p className="mt-4 text-sm text-black/60">
                    You&apos;re subscribed. Welcome to the community.
                  </p>
                ) : null}
                {status === "error" ? (
                  <p className="mt-4 text-sm text-red-600">
                    Something went wrong. Please try again.
                  </p>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
