"use client";

import Footer from "@/components/footer";
import Nav from "@/components/nav";
import { FadeInView } from "@/components/ui/fade-in-view";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;
const CONTACT_EMAIL = "ben@sfplaygroundai.com";

const STATS = [
  { value: "50,000+", label: "SFPlayground network" },
  { value: "14,805", label: "square feet" },
  { value: "2", label: "floors" },
  { value: "1", label: "day" },
] as const;

const AUDIENCE = [
  ["Consumers", "Early adopters and customers."],
  ["Retail + distribution", "Buyers looking for products to carry."],
  ["Enterprise", "Teams with purchasing authority."],
  ["Investors", "Seed through growth capital."],
  ["Media + creators", "People looking for stories worth covering."],
  ["Corporate innovation", "Scouting, partnerships and new technology."],
] as const;

const EXHIBIT_PACKAGES = [
  { price: "$350", name: "Shelf", detail: "1 product · 1 rep" },
  { price: "$950", name: "Stand", detail: "Up to 2 products · 3 reps" },
  { price: "$1,950", name: "Large stand", detail: "Up to 4 products · 6 reps" },
  { price: "$3,500", name: "Featured space", detail: "Prime position · custom footprint" },
] as const;

const PARTNER_PACKAGES = [
  { price: "$8,000", name: "Floor partner" },
  { price: "$12,000", name: "Store partner" },
  { price: "Custom", name: "Branded concept / activation" },
] as const;

const PAVILION_PACKAGES = [
  { price: "$6,500", name: "10 companies" },
  { price: "$11,500", name: "20 companies" },
  { price: "$15,000", name: "30 companies" },
  { price: "25%", name: "Referral · 5 minimum" },
] as const;

const PROVIDED = [
  "Allocated space",
  "Power",
  "Security",
  "Operations",
  "Marketing and audience",
  "Photo and video",
] as const;

const OPPORTUNITIES = [
  {
    label: "Exhibit",
    title: "Meet the market",
    detail: "Put the product in front of customers, buyers, investors and media.",
  },
  {
    label: "Major brand",
    title: "Own a concept",
    detail: "Create a destination people choose to enter, not another logo placement.",
  },
  {
    label: "Sponsor",
    title: "Own the relationship",
    detail: "Direct access to founders, buyers and the technology ecosystem around the day.",
  },
  {
    label: "Pavilion",
    title: "Bring your ecosystem",
    detail: "One branded destination for a group of companies your organization supports.",
  },
] as const;

function Kicker({ children }: { children: string }) {
  return (
    <p className="text-xs font-bold tracking-[0.38em] text-[#9f473d] uppercase">
      {children}
    </p>
  );
}

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.72, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function PriceRow({
  items,
}: {
  items: readonly { price: string; name: string; detail?: string }[];
}) {
  const gridClass =
    items.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3";

  return (
    <div className={`grid gap-8 border-y border-black/10 py-10 ${gridClass}`}>
      {items.map((item) => (
        <div key={`${item.price}-${item.name}`}>
          <p className="font-oswald text-4xl font-bold leading-none text-[#315f72] md:text-5xl">
            {item.price}
          </p>
          <p className="mt-3 text-base font-bold text-black">
            {item.name}
          </p>
          {item.detail ? (
            <p className="mt-2 text-sm text-black/52">
              {item.detail}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default function ShowroomPage() {
  const [selectedOpportunity, setSelectedOpportunity] = useState<(typeof OPPORTUNITIES)[number]["label"]>(
    OPPORTUNITIES[0].label,
  );
  const [formStartedAt, setFormStartedAt] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    companyWebsite: "",
    message: "",
    website: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setFormStartedAt(Date.now());
  }, []);

  const selectedOpportunityData = useMemo(
    () =>
      OPPORTUNITIES.find((item) => item.label === selectedOpportunity) ??
      OPPORTUNITIES[0],
    [selectedOpportunity],
  );

  function patchForm(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormError("");
  }

  async function submitShowroomInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus("loading");
    setFormError("");

    const message = [
      `The Showroom opportunity: ${selectedOpportunity}`,
      `Company: ${form.company.trim() || "Not provided"}`,
      `Company website: ${form.companyWebsite.trim() || "Not provided"}`,
      "",
      form.message.trim(),
    ].join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          coachingPlan: `The Showroom - ${selectedOpportunity}`,
          message,
          website: form.website,
          formStartedAt,
        }),
      });
      const data = (await res.json().catch(() => null)) as { error?: string } | null;

      if (!res.ok) {
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setFormStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        companyWebsite: "",
        message: "",
        website: "",
      });
      setFormStartedAt(Date.now());
    } catch (error) {
      setFormStatus("error");
      setFormError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#fbfbf7] text-black">
      <Nav />

      <section className="relative min-h-screen overflow-hidden bg-[#fbfbf7] text-black">
        <Image
          src="/images/showroom-hero-generated.png"
          alt="Luxury technology showroom concept at 800 Market Street"
          fill
          priority
          className="object-cover object-center opacity-92"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-[#fbfbf7]/90 via-[#fbfbf7]/42 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[52vh] bg-linear-to-t from-[#fbfbf7] via-[#fbfbf7]/58 to-transparent" />
        <div className="relative z-10 flex min-h-screen flex-col justify-end px-5 pb-12 pt-28 md:px-10 md:pb-16 lg:px-16">
          <FadeUp delay={0.12}>
            <Kicker>SFPLAYGROUND</Kicker>
          </FadeUp>
          <FadeUp delay={0.24}>
            <h1 className="mt-5 max-w-5xl font-oswald text-[clamp(4.25rem,15vw,13.5rem)] font-bold leading-[0.82] tracking-tight">
              THE
              <br />
              SHOWROOM
            </h1>
          </FadeUp>
          <FadeUp delay={0.36}>
            <p className="mt-7 max-w-3xl text-xl leading-relaxed text-black/68 md:text-2xl">
              A two story luxury technology store in the heart of San Francisco.
              One day at 800 Market Street.
            </p>
          </FadeUp>
          <FadeUp delay={0.46}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#showroom-inquiry"
                className="inline-flex rounded-full bg-black px-8 py-3.5 text-sm font-bold tracking-[0.16em] text-white uppercase transition-opacity hover:opacity-82"
              >
                Start inquiry
              </a>
              <a
                href="#showroom-opportunities"
                className="inline-flex rounded-full border border-[#b56b33]/28 bg-[#fbfbf7]/74 px-8 py-3.5 text-sm font-bold tracking-[0.16em] text-[#7a4020] uppercase backdrop-blur-sm transition-colors hover:bg-white"
              >
                View opportunities
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-[#fbfbf7] px-5 py-24 text-black md:px-10 md:py-32 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <FadeInView direction="up">
            <Kicker>The idea</Kicker>
            <h2 className="mt-8 max-w-5xl font-oswald text-[clamp(3rem,7vw,7.5rem)] font-bold leading-[0.92] tracking-tight">
              See it. Try it. Take it home.
            </h2>
            <p className="mt-8 max-w-4xl text-xl leading-relaxed text-black/60 md:text-3xl">
              For one day, new technology moves out of the screen and into a
              real place where people can discover it for themselves.
            </p>
          </FadeInView>

          <div className="mt-16 grid gap-10 border-y border-black/10 py-14 md:grid-cols-2">
            <FadeInView direction="up">
              <h3 className="text-2xl font-bold">Curated technology</h3>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-black/58">
                Robotics, wearables, AI devices, smart home, mobility and
                consumer hardware presented with the finish of a luxury retailer.
              </p>
            </FadeInView>
            <FadeInView direction="up" delay={0.08}>
              <h3 className="text-2xl font-bold">Open to the city</h3>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-black/58">
                Walk in. Pick something up. Ask the person who built it. Buy it
                and take it home.
              </p>
            </FadeInView>
          </div>

          <FadeInView direction="up">
            <p className="mt-14 max-w-6xl border-l border-[#9f473d]/34 pl-6 font-oswald text-[clamp(2rem,5vw,5rem)] font-bold leading-tight text-[#9f473d]">
              14,805 square feet devoted to technology people can actually touch.
            </p>
          </FadeInView>
        </div>
      </section>

      <section className="grid bg-[#fbfbf7] py-8 text-black lg:grid-cols-2 lg:py-12">
        <div className="min-h-[420px] p-5 md:p-8 lg:min-h-[760px] lg:p-10">
          <div className="relative h-full min-h-[380px] overflow-hidden rounded-[0.875rem] border border-black/10 bg-[#fbfbf7] shadow-[0_22px_70px_rgba(0,0,0,0.07)]">
            <Image
              src="/images/showroom-demo-generated.png"
              alt="Robotics and hardware shown inside a showroom"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized
            />
          </div>
        </div>
        <div className="flex flex-col justify-center px-5 py-16 md:px-10 lg:px-16">
          <FadeInView direction="up">
            <Kicker>The day</Kicker>
            <h2 className="mt-8 font-oswald text-[clamp(2.75rem,6vw,6.5rem)] font-bold leading-[0.94] tracking-tight">
              Built around discovery.
            </h2>
            <div className="mt-10 grid gap-8 border-t border-black/10 pt-10 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-bold">Two floors of technology</h3>
                <p className="mt-4 text-black/58">
                  Open to the street from 10 AM to 10 PM.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold">The bar is open all day</h3>
                <p className="mt-4 text-black/58">
                  DJs play all day. No panels. No stage program. The product stays
                  at the center.
                </p>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 md:py-32 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <FadeInView direction="up">
            <Kicker>The audience</Kicker>
            <h2 className="mt-8 max-w-5xl font-oswald text-[clamp(2.75rem,6vw,6.75rem)] font-bold leading-[0.96] tracking-tight">
              The people brands want in the room.
            </h2>
            <p className="mt-6 max-w-4xl text-xl leading-relaxed text-black/58 md:text-3xl">
              A mix of consumers and the people who can move a product forward.
            </p>
          </FadeInView>

          <div className="mt-14 grid gap-x-16 gap-y-10 border-y border-black/10 py-14 md:grid-cols-2 lg:grid-cols-3">
            {AUDIENCE.map(([title, detail], index) => (
              <FadeInView key={title} direction="up" delay={index * 0.03}>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-3 text-lg text-black/58">{detail}</p>
              </FadeInView>
            ))}
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {STATS.map((stat) => (
              <FadeInView key={stat.label} direction="up">
                <p className="font-oswald text-5xl font-bold leading-none text-[#315f72]">
                  {stat.value}
                </p>
                <p className="mt-3 text-black/58">{stat.label}</p>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      <section className="grid bg-[#fbfbf7] py-8 text-black lg:grid-cols-[0.9fr_1.1fr] lg:py-12">
        <div className="min-h-[420px] p-5 md:p-8 lg:min-h-[760px] lg:p-10">
          <div className="relative h-full min-h-[380px] overflow-hidden rounded-[0.875rem] border border-black/10 bg-[#fbfbf7] shadow-[0_22px_70px_rgba(0,0,0,0.07)]">
            <Image
              src="/images/showroom-market-generated.png"
              alt="800 Market Street in San Francisco"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
              unoptimized
            />
          </div>
        </div>
        <div className="flex flex-col justify-center px-5 py-16 md:px-10 lg:px-16">
          <FadeInView direction="up">
            <Kicker>The address</Kicker>
            <h2 className="mt-8 font-oswald text-[clamp(3rem,7vw,7rem)] font-bold leading-[0.94] tracking-tight">
              800 Market Street.
            </h2>
            <div className="mt-10 grid gap-8 border-t border-black/10 pt-10 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-bold">In the middle of it.</h3>
                <p className="mt-4 text-black/58">
                  Prime Market Street frontage, steps from Powell Street BART
                  and Muni and beside Union Square.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold">Two trading levels.</h3>
                <p className="mt-4 text-black/58">
                  14,805 square feet of retail, with glass on three sides and
                  visibility from the street.
                </p>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      <section className="bg-[#fbfbf7] px-5 py-24 text-black md:px-10 md:py-32 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <FadeInView direction="up">
            <Kicker>Exhibit</Kicker>
            <h2 className="mt-8 max-w-5xl font-oswald text-[clamp(3rem,7vw,7rem)] font-bold leading-[0.94] tracking-tight">
              Meet the market.
            </h2>
            <p className="mt-7 max-w-4xl text-xl leading-relaxed text-black/60 md:text-3xl">
              Put the product in front of customers, buyers, investors and
              media. Sell directly and hear the response in real time.
            </p>
          </FadeInView>

          <div className="mt-14 grid gap-10 border-t border-black/10 pt-10 md:grid-cols-3">
            {[
              ["Discovery", "Be seen by the people already looking for new products."],
              ["Business", "Meet buyers, partners, investors and potential customers."],
              ["Proof", "Leave with customer reactions, sales conversations and content."],
            ].map(([title, detail], index) => (
              <FadeInView key={title} direction="up" delay={index * 0.05}>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-black/58">{detail}</p>
              </FadeInView>
            ))}
          </div>

          <div className="mt-14">
            <PriceRow items={EXHIBIT_PACKAGES} />
          </div>

          <FadeInView direction="up">
            <div className="mt-12 max-w-5xl">
              <h3 className="text-2xl font-bold">Bring your own display.</h3>
              <p className="mt-4 text-lg leading-relaxed text-black/58">
                You bring the stand, signage and marketing materials. If you want
                a custom setup, we will get on a call, design the plan with you
                and quote production separately.
              </p>
            </div>
          </FadeInView>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 md:py-32 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <FadeInView direction="up">
            <Kicker>For major brands</Kicker>
            <h2 className="mt-8 max-w-5xl font-oswald text-[clamp(3rem,7vw,7rem)] font-bold leading-[0.94] tracking-tight">
              Own a concept.
            </h2>
            <p className="mt-7 max-w-5xl text-xl leading-relaxed text-black/58 md:text-3xl">
              For established brands that want a destination people choose to
              enter, not another logo placement.
            </p>
          </FadeInView>

          <div className="mt-14 grid gap-10 border-t border-black/10 pt-10 md:grid-cols-3">
            {[
              ["Give it a name", "Create a recognizable concept with a clear point of view."],
              ["Build around the product", "Shape the space around how the product fits into real life."],
              ["Keep it active", "Use creators, customers, private guests and content to give the concept energy."],
            ].map(([title, detail], index) => (
              <FadeInView key={title} direction="up" delay={index * 0.05}>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-black/58">{detail}</p>
              </FadeInView>
            ))}
          </div>

          <FadeInView direction="up">
            <div className="mt-14 border-y border-black/10 py-10">
              <h3 className="text-2xl font-bold">Concept examples</h3>
              <p className="mt-5 max-w-5xl text-xl leading-relaxed text-black/58">
                Boutique · Product lab · Creator studio · Listening room · Gaming
                zone · Wellness space · Private buyer suite · Launch environment
              </p>
            </div>
          </FadeInView>

          <div className="mt-12">
            <PriceRow items={PARTNER_PACKAGES} />
          </div>
        </div>
      </section>

      <section className="grid bg-[#fbfbf7] py-8 lg:grid-cols-2 lg:py-12">
        <div className="px-5 py-16 md:px-10 md:py-24 lg:px-16">
          <FadeInView direction="up">
            <Kicker>Pavilions</Kicker>
            <h2 className="mt-8 font-oswald text-[clamp(3rem,7vw,7rem)] font-bold leading-[0.94] tracking-tight">
              Bring your ecosystem to San Francisco.
            </h2>
            <p className="mt-7 text-xl leading-relaxed text-black/58 md:text-3xl">
              One branded destination for a group of companies your organization
              already supports.
            </p>
          </FadeInView>
        </div>
        <div className="px-5 pb-16 md:px-10 md:pb-24 lg:px-16 lg:py-24">
          <PriceRow items={PAVILION_PACKAGES} />
          <FadeInView direction="up">
            <div className="mt-10 border-b border-black/10 pb-10">
              <h3 className="text-2xl font-bold">Who this is for</h3>
              <p className="mt-5 text-lg leading-relaxed text-black/58">
                Trade + export agencies · Governments + regions · Accelerators ·
                Venture portfolios · Corporate innovation programs · Industry
                associations
              </p>
            </div>
          </FadeInView>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              ["One identity", "A clear branded home for the group."],
              ["One operator", "We coordinate directly with participating companies."],
              ["One outcome", "Visibility, business development, content and a simple post program summary."],
            ].map(([title, detail], index) => (
              <FadeInView key={title} direction="up" delay={index * 0.04}>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-3 text-black/58">{detail}</p>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      <section
        id="showroom-opportunities"
        className="bg-[#fbfbf7] px-5 py-24 text-black md:px-10 md:py-32 lg:px-16"
      >
        <div className="mx-auto max-w-[1400px]">
          <FadeInView direction="up">
            <Kicker>Opportunity</Kicker>
            <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <h2 className="font-oswald text-[clamp(3rem,7vw,7rem)] font-bold leading-[0.94] tracking-tight">
                Choose the way you want to show up.
              </h2>
              <p className="max-w-3xl text-xl leading-relaxed text-black/60 md:text-3xl">
                The same room can work as a product launch, a brand destination,
                a sponsor relationship engine, or a pavilion for an ecosystem.
              </p>
            </div>
          </FadeInView>

          <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {OPPORTUNITIES.map((item, index) => {
              const active = selectedOpportunity === item.label;
              return (
                <FadeInView key={item.label} direction="up" delay={index * 0.04}>
                  <button
                    type="button"
                    onClick={() => setSelectedOpportunity(item.label)}
                    className={`flex h-full min-h-[260px] w-full flex-col justify-between rounded-[1.25rem] border p-6 text-left transition-all ${
                      active
                        ? "border-[#9f473d]/38 bg-[#271d1b] text-white shadow-[0_24px_70px_rgba(39,29,27,0.16)]"
                        : "border-black/8 bg-[#fbfbf7] text-black hover:border-black/22 hover:bg-white/42"
                    }`}
                  >
                    <span
                      className={`text-xs font-bold tracking-[0.24em] uppercase ${
                        active ? "text-white/46" : "text-black/38"
                      }`}
                    >
                      {item.label}
                    </span>
                    <span>
                      <span className="block font-oswald text-4xl font-bold leading-none tracking-tight">
                        {item.title}
                      </span>
                      <span
                        className={`mt-5 block text-base leading-relaxed ${
                          active ? "text-white/62" : "text-black/58"
                        }`}
                      >
                        {item.detail}
                      </span>
                    </span>
                  </button>
                </FadeInView>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="showroom-inquiry"
        className="bg-[#fbfbf7] px-5 py-24 text-black md:px-10 md:py-32 lg:px-16"
      >
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <FadeInView direction="up">
            <div className="sticky top-28">
              <Kicker>Start inquiry</Kicker>
              <h2 className="mt-8 font-oswald text-[clamp(3rem,7vw,7rem)] font-bold leading-[0.94] tracking-tight">
                Tell us what you want to build.
              </h2>
              <p className="mt-7 text-xl leading-relaxed text-black/60 md:text-2xl">
                Selected opportunity:{" "}
                <span className="font-bold text-black">
                  {selectedOpportunityData.title}
                </span>
              </p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-black/52 md:text-lg">
                Share enough context for the team to understand your product,
                brand, or ecosystem. We will follow up directly.
              </p>
            </div>
          </FadeInView>

          <FadeInView direction="up" delay={0.08}>
            <form
              onSubmit={submitShowroomInquiry}
              className="rounded-[1.5rem] border border-black/8 bg-white/58 p-5 shadow-[0_26px_80px_rgba(0,0,0,0.07)] backdrop-blur md:p-8"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-bold tracking-[0.18em] text-black/42 uppercase">
                    Full name
                  </span>
                  <input
                    required
                    value={form.name}
                    onChange={(event) => patchForm("name", event.target.value)}
                    placeholder="First and last name"
                    className="mt-3 w-full border-0 border-b border-black/14 bg-transparent pb-3 text-base outline-none transition-colors placeholder:text-black/24 focus:border-black"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-bold tracking-[0.18em] text-black/42 uppercase">
                    Email
                  </span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => patchForm("email", event.target.value)}
                    placeholder="you@company.com"
                    className="mt-3 w-full border-0 border-b border-black/14 bg-transparent pb-3 text-base outline-none transition-colors placeholder:text-black/24 focus:border-black"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-bold tracking-[0.18em] text-black/42 uppercase">
                    Company
                  </span>
                  <input
                    required
                    value={form.company}
                    onChange={(event) => patchForm("company", event.target.value)}
                    placeholder="Company or organization"
                    className="mt-3 w-full border-0 border-b border-black/14 bg-transparent pb-3 text-base outline-none transition-colors placeholder:text-black/24 focus:border-black"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-bold tracking-[0.18em] text-black/42 uppercase">
                    Phone
                  </span>
                  <input
                    value={form.phone}
                    onChange={(event) => patchForm("phone", event.target.value)}
                    placeholder="Optional"
                    className="mt-3 w-full border-0 border-b border-black/14 bg-transparent pb-3 text-base outline-none transition-colors placeholder:text-black/24 focus:border-black"
                  />
                </label>
              </div>

              <label className="mt-5 block">
                <span className="text-xs font-bold tracking-[0.18em] text-black/42 uppercase">
                  Company website
                </span>
                <input
                  value={form.companyWebsite}
                  onChange={(event) =>
                    patchForm("companyWebsite", event.target.value)
                  }
                  placeholder="https://"
                  className="mt-3 w-full border-0 border-b border-black/14 bg-transparent pb-3 text-base outline-none transition-colors placeholder:text-black/24 focus:border-black"
                />
              </label>

              <div className="mt-7">
                <span className="text-xs font-bold tracking-[0.18em] text-black/42 uppercase">
                  Opportunity
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {OPPORTUNITIES.map((item) => {
                    const active = selectedOpportunity === item.label;
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setSelectedOpportunity(item.label)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                          active
                            ? "border-[#9f473d] bg-[#9f473d] text-white"
                            : "border-black/10 text-black/58 hover:border-[#9f473d]/38 hover:text-black"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="mt-7 block">
                <span className="text-xs font-bold tracking-[0.18em] text-black/42 uppercase">
                  What are you hoping to do at The Showroom?
                </span>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(event) => patchForm("message", event.target.value)}
                  placeholder="Tell us about the product, brand concept, sponsorship goal, or pavilion you want to bring."
                  className="mt-3 w-full resize-none border-0 border-b border-black/14 bg-transparent py-3 text-base leading-relaxed outline-none transition-colors placeholder:text-black/24 focus:border-black"
                />
              </label>

              <input
                type="text"
                value={form.website}
                onChange={(event) => patchForm("website", event.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden
              />

              {formError ? (
                <p className="mt-5 text-sm text-red-600" role="alert">
                  {formError}
                </p>
              ) : null}
              {formStatus === "success" ? (
                <p className="mt-5 text-sm font-medium text-[#315f72]" role="status">
                  Your inquiry is in. We will follow up directly.
                </p>
              ) : null}

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="rounded-full bg-black px-9 py-4 text-sm font-bold tracking-[0.16em] text-white uppercase transition-opacity hover:opacity-82 disabled:opacity-50"
                >
                  {formStatus === "loading" ? "Sending..." : "Send inquiry"}
                </button>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=The%20Showroom%20at%20800%20Market`}
                  className="text-sm font-medium text-black/52 transition-colors hover:text-black"
                >
                  Or email {CONTACT_EMAIL}
                </a>
              </div>
            </form>
          </FadeInView>
        </div>
      </section>

      <section className="bg-[#fbfbf7] px-5 py-24 text-black md:px-10 md:py-32 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <FadeInView direction="up">
            <Kicker>Practical</Kicker>
            <h2 className="mt-8 max-w-4xl font-oswald text-[clamp(3rem,7vw,7rem)] font-bold leading-[0.94] tracking-tight">
              Simple to run.
            </h2>
            <p className="mt-7 max-w-5xl text-xl leading-relaxed text-black/60 md:text-3xl">
              You arrive ready to show and sell. We handle the environment and
              operating day.
            </p>
          </FadeInView>

          <div className="mt-14 grid gap-12 border-y border-black/10 py-12 md:grid-cols-2">
            <FadeInView direction="up">
              <Kicker>You bring</Kicker>
              <div className="mt-8 grid gap-7 text-2xl font-bold">
                {[
                  "Products",
                  "Display or stand",
                  "Signage and marketing materials",
                  "Representatives",
                  "Payment method",
                  "Product insurance and shipping",
                ].map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </FadeInView>
            <FadeInView direction="up" delay={0.08}>
              <Kicker>We provide</Kicker>
              <div className="mt-8 grid gap-7 text-2xl font-bold">
                {PROVIDED.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </FadeInView>
          </div>

          <FadeInView direction="up">
            <div className="mt-12 max-w-5xl">
              <h3 className="text-3xl font-bold">Need a custom build?</h3>
              <p className="mt-5 text-lg leading-relaxed text-black/58 md:text-xl">
                We can design and produce displays, signage, printing and
                marketing materials for an additional fee. We will get on a call,
                understand what you want and send a separate production plan and
                quote.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=The%20Showroom%20at%20800%20Market`}
                className="mt-10 inline-flex rounded-full bg-black px-9 py-4 text-sm font-bold tracking-[0.18em] text-white uppercase transition-opacity hover:opacity-82"
              >
                Contact {CONTACT_EMAIL}
              </a>
            </div>
          </FadeInView>
        </div>
      </section>

      <Footer />
    </div>
  );
}
