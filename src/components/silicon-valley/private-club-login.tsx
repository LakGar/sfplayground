"use client";

import { ArrowRight, LockKeyhole, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function PrivateClubLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/silicon-valley/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#f7f8fa] p-3 text-[#0b0d10] md:p-5">
      <section className="relative grid min-h-[calc(100vh-24px)] overflow-hidden rounded-[28px] bg-[#101317] shadow-[0_28px_90px_rgba(8,10,12,0.22)] md:min-h-[calc(100vh-40px)] md:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[360px] overflow-hidden md:min-h-full">
          <Image
            src="/images/events-as-service/ai-hospitality-summit-hero.jpg"
            alt="SFPLAYGROUND private member room"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 55vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/15" />
          <div className="absolute left-6 top-6 flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="SFPLAYGROUND"
              width={54}
              height={54}
              className="rounded-full"
            />
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-white/80">
              SFPLAYGROUND Club
            </span>
          </div>
          <div className="absolute inset-x-6 bottom-7 max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/18 backdrop-blur">
              <Sparkles className="size-3.5" />
              Private member access
            </div>
            <h1 className="font-stack text-[clamp(3rem,8vw,8.8rem)] font-black uppercase leading-[0.82] tracking-normal text-white">
              Silicon Valley Access
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/78">
              A private member dashboard for founders to request warm intros to
              VC speakers, operators, and experts. SFPLAYGROUND handles the
              human follow-through.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white p-6 md:p-10">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-8">
              <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-[#0b0d10] text-white">
                <LockKeyhole className="size-5" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8a919b]">
                Private club login
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight">
                Member portal
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#66707c]">
                Connect with a private circle of founders, operators, and
                investors. Exchange ideas, build meaningful relationships, and
                discover what comes next. Coming January 11.
              </p>
            </div>

            <label className="block text-sm font-medium text-[#22272f]">
              Email
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                className="mt-2 h-12 w-full rounded-xl bg-[#f3f5f7] px-4 text-sm outline-none ring-1 ring-black/8 transition focus:bg-white focus:ring-black/20"
              />
            </label>
            <label className="mt-4 block text-sm font-medium text-[#22272f]">
              Password
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                className="mt-2 h-12 w-full rounded-xl bg-[#f3f5f7] px-4 text-sm outline-none ring-1 ring-black/8 transition focus:bg-white focus:ring-black/20"
              />
            </label>

            <button
              type="submit"
              className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0b0d10] px-5 text-sm font-semibold text-white transition hover:bg-[#242930]"
            >
              Enter dashboard
              <ArrowRight className="size-4" />
            </button>

          </form>
        </div>
      </section>
    </main>
  );
}
