import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import EventsAsServiceNav from "@/components/events-as-service-nav";
import Footer from "@/components/footer";
import { FadeInView } from "@/components/ui/fade-in-view";
import { StatsGrid } from "@/components/ui/stats-grid";

const CONTACT_EMAIL = "staff@sfplaygroundai.com";

export const metadata: Metadata = {
  title: "Founder Access Rooms | SFPLAYGROUND",
  description:
    "SFPLAYGROUND builds private founder rooms for companies that need decision-maker density, trusted introductions, and startup ecosystem access in San Francisco.",
};

const STATS = [
  { value: "$10K+", label: "pilot room starting point" },
  { value: "80-150", label: "curated guests per flagship room" },
  { value: "4", label: "weeks from thesis to room" },
  { value: "1", label: "business outcome to optimize" },
] as const;

const OUTCOMES = [
  {
    eyebrow: "Density",
    title: "Put the right people in one room.",
    text: "Founders, AI builders, operators, investors, customers, and talent - selected around your thesis, ICP, and timing.",
    image: "/images/salesforce-summit/networking-conversation.jpg",
  },
  {
    eyebrow: "Trust",
    title: "Make every invite feel intentional.",
    text: "No filler, no random foot traffic. The guest list, program, and host flow are built so conversations start warmer.",
    image: "/images/salesforce-summit/venture-network-panel.jpg",
  },
  {
    eyebrow: "Follow-up",
    title: "Convert the room after it ends.",
    text: "Recap, opt-in introductions, warm next steps, and relationship paths for sales, hiring, partnerships, or community.",
    image: "/images/immigrant-founders-night/demo-conversation.jpg",
  },
] as const;

const PACKAGES = [
  {
    name: "Private Room",
    price: "$5K+",
    fit: "Best when you have a target audience or venue and need a premium room shaped around a clear objective.",
    includes: ["room thesis", "run of show", "onsite host", "photo recap"],
  },
  {
    name: "Curated Room",
    price: "$10K+",
    fit: "Best when you want SFPLAYGROUND to source the founders, builders, investors, or operators that matter.",
    includes: ["guest sourcing", "invite campaign", "program design", "audience report"],
    featured: true,
  },
  {
    name: "Market Room",
    price: "$15K-$25K+",
    fit: "Best for product launches, Tech Week moments, category ownership, hiring pushes, and ecosystem entry.",
    includes: ["strategy", "venue support", "curated intros", "content package"],
  },
] as const;

const BUYERS = [
  "VC platforms",
  "AI companies",
  "Devtools teams",
  "Cloud and infra",
  "Startup law firms",
  "Banks and fintech",
  "Talent platforms",
  "Startup ecosystems",
] as const;

const PROCESS = [
  ["01", "Diagnose", "Pick the business outcome: pipeline, hiring, community, launch, partnerships, or market entry."],
  ["02", "Curate", "Build the room thesis, target list, invite copy, and acceptance criteria."],
  ["03", "Host", "Run the guest experience, check-in, speaker flow, photography, and onsite hosting."],
  ["04", "Compound", "Deliver the recap, audience summary, and opt-in follow-up paths after the room."],
] as const;

function Kicker({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p
      className={`text-xs font-semibold tracking-[0.24em] uppercase ${
        light ? "text-white/62" : "text-black/42"
      }`}
    >
      {children}
    </p>
  );
}

function PillLink({
  href,
  children,
  inverse = false,
}: {
  href: string;
  children: React.ReactNode;
  inverse?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-opacity hover:opacity-85 ${
        inverse ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
    </Link>
  );
}

export default function EventsAsAServicePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <EventsAsServiceNav />

      <section className="relative flex min-h-screen overflow-hidden rounded-b-[32px] bg-black text-white md:rounded-b-[48px]">
        <Image
          src="/images/events-as-service/ai-hospitality-summit-hero.jpg"
          alt="AI in Hospitality Summit group photo hosted by SFPLAYGROUND"
          fill
          priority
          className="object-cover opacity-72"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/78 via-black/48 via-48% to-black/32" />
        <div className="absolute inset-y-0 left-0 w-[72vw] bg-linear-to-r from-black/58 via-black/22 to-transparent" />

        <p
          className="pointer-events-none absolute left-4 top-[32%] z-10 hidden -translate-y-1/2 text-[10px] tracking-[0.35em] text-white/55 [writing-mode:vertical-rl] md:left-8 md:block lg:left-12"
          aria-hidden
        >
          ( FOUNDER / ROOMS )
        </p>

        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col justify-end px-4 pb-20 pt-32 md:px-8 md:pb-24">
          <div className="max-w-5xl">
            <FadeInView>
              <Kicker light>PRIVATE ROOMS FOR SERIOUS BUILDERS</Kicker>
            </FadeInView>
            <FadeInView delay={0.08}>
              <h1 className="mt-5 max-w-6xl font-oswald text-[clamp(3.6rem,11vw,11rem)] font-bold leading-[0.86] tracking-tight">
                FOUNDER ACCESS ROOMS
              </h1>
            </FadeInView>
            <FadeInView delay={0.16}>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/76 md:text-2xl">
                We create invite-only founder rooms for companies that need
                decision-maker density, trusted introductions, and relationships
                that continue after the night ends.
              </p>
            </FadeInView>
            <FadeInView delay={0.24}>
              <div className="mt-9 flex flex-wrap gap-4">
                <PillLink
                  href={`mailto:${CONTACT_EMAIL}?subject=Founder%20Access%20Rooms%20Pilot`}
                  inverse
                >
                  Pitch a pilot
                </PillLink>
                <a
                  href="#packages"
                  className="inline-flex items-center justify-center rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-85"
                >
                  View packages
                </a>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto w-full max-w-[1400px]">
          <StatsGrid
            stats={STATS}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            itemClassName="rounded-[1.25rem] bg-[#f8f7f3] px-5 py-6 shadow-[0_28px_90px_-62px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.72)] md:px-6 md:py-7"
            valueClassName="font-oswald text-[clamp(3rem,5.8vw,5.25rem)] font-bold leading-none tracking-tight text-black"
            labelClassName="mt-3 text-sm leading-relaxed text-black/56 md:text-base"
          />
        </div>
      </section>

      <section className="px-4 py-14 md:px-8 md:py-20 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1400px] gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-18">
          <FadeInView>
            <div>
              <Kicker>The shift</Kicker>
              <h2 className="mt-5 max-w-2xl font-oswald text-[clamp(2.75rem,5.4vw,5.6rem)] font-bold leading-[0.94] tracking-tight">
                Useful rooms, not performative networking.
              </h2>
            </div>
          </FadeInView>

          <FadeInView delay={0.08}>
            <div className="border-t border-black/10 lg:mt-5">
              {[
                "We do not optimize for headcount. We optimize for who should actually meet.",
                "Every room starts with a guest thesis: stage, category, buyer profile, investor fit, and follow-up value.",
                "A room only works if people leave with conversations worth continuing.",
              ].map((item) => (
                <div key={item} className="flex gap-4 border-b border-black/10 py-5 md:py-6">
                  <span className="mt-2.5 h-3 w-3 shrink-0 rounded-full bg-red-500" />
                  <p className="max-w-3xl text-lg font-medium leading-snug tracking-tight text-black/82 md:text-2xl">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </FadeInView>
        </div>
      </section>

      <section className="overflow-hidden py-16 md:py-24 lg:py-28">
        <div className="px-4 md:px-8">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col justify-between gap-6 md:flex-row md:items-end">
            <FadeInView>
              <div>
                <Kicker>What companies buy</Kicker>
                <h2 className="mt-5 max-w-4xl font-oswald text-[clamp(2.5rem,5.6vw,5.8rem)] font-bold leading-[0.98] tracking-tight">
                  Founder access with a business reason behind it.
                </h2>
              </div>
            </FadeInView>
            <FadeInView delay={0.08}>
              <p className="max-w-md text-sm leading-relaxed text-black/56 md:text-base">
                Built for companies that want the right founders, operators,
                investors, or buyers in a room where the next step is obvious.
              </p>
            </FadeInView>
          </div>
        </div>

        <div className="mx-auto mt-10 grid w-full max-w-[1400px] gap-4 px-4 md:px-8 lg:grid-cols-3">
          {OUTCOMES.map((item, index) => (
            <FadeInView key={item.title} delay={index * 0.06}>
              <article className="relative h-[520px] w-full overflow-hidden rounded-[28px] bg-black text-white">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover opacity-70"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/18 via-black/20 to-black/82" />
                <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
                  <span className="w-fit rounded-full bg-white/14 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                    {item.eyebrow}
                  </span>
                  <div>
                    <p className="font-oswald text-4xl font-bold leading-none tracking-tight md:text-5xl">
                      0{index + 1}
                    </p>
                    <h3 className="mt-5 font-oswald text-3xl font-bold leading-none tracking-tight md:text-4xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/72 md:text-base">
                      {item.text}
                    </p>
                  </div>
                </div>
              </article>
            </FadeInView>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:px-8 md:py-24 lg:py-28">
        <div className="mx-auto grid w-full max-w-[1400px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <FadeInView>
            <div>
              <Kicker>Best-fit buyers</Kicker>
              <h2 className="mt-5 font-oswald text-[clamp(2.5rem,5.5vw,5.6rem)] font-bold leading-[0.98] tracking-tight">
                Teams buying access, trust, and category presence.
              </h2>
            </div>
          </FadeInView>

          <div className="grid gap-3 sm:grid-cols-2">
            {BUYERS.map((buyer, index) => (
              <FadeInView key={buyer} delay={index * 0.035}>
                <div className="flex min-h-24 items-center justify-between gap-4 rounded-[22px] border border-black/10 bg-[#f7f6f1] px-5 py-5">
                  <span className="text-lg font-semibold tracking-tight text-black/78">
                    {buyer}
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-black/28" />
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="px-4 py-16 md:px-8 md:py-24 lg:py-28">
        <div className="mx-auto w-full max-w-[1400px]">
          <FadeInView>
            <div className="max-w-4xl">
              <Kicker>Packages</Kicker>
              <h2 className="mt-5 font-oswald text-[clamp(2.75rem,6vw,6rem)] font-bold leading-[0.96] tracking-tight">
                Choose the room you need.
              </h2>
            </div>
          </FadeInView>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {PACKAGES.map((pkg, index) => (
              <FadeInView key={pkg.name} delay={index * 0.06}>
                {(() => {
                  const isFeatured = "featured" in pkg && pkg.featured;
                  return (
                <article
                  className={`relative flex min-h-[480px] flex-col justify-between overflow-hidden rounded-[30px] p-6 md:p-7 ${
                    isFeatured
                      ? "bg-white text-black shadow-[0_34px_96px_-62px_rgba(0,0,0,0.58),inset_0_0_0_2px_rgba(239,68,68,0.42)]"
                      : "bg-white text-black shadow-[0_28px_90px_-68px_rgba(0,0,0,0.45),inset_0_0_0_1px_rgba(0,0,0,0.06)]"
                  }`}
                >
                  {isFeatured ? (
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-red-500"
                      aria-hidden
                    />
                  ) : null}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-xs font-semibold tracking-[0.2em] text-current/42 uppercase">
                        0{index + 1}
                      </p>
                      <span
                        className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${
                          isFeatured ? "bg-red-500 text-white" : "bg-black text-white"
                        }`}
                      >
                        {pkg.price}
                      </span>
                    </div>
                    {isFeatured ? (
                      <p className="mt-8 w-fit rounded-full bg-red-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                        Recommended
                      </p>
                    ) : null}
                    <h3 className={`${isFeatured ? "mt-4" : "mt-10"} font-oswald text-[clamp(2.45rem,4vw,3.8rem)] font-bold leading-[0.9] tracking-tight`}>
                      {pkg.name}
                    </h3>
                    <p
                      className={`mt-5 max-w-md text-base leading-relaxed ${
                        isFeatured ? "text-black/62" : "text-black/58"
                      }`}
                    >
                      {pkg.fit}
                    </p>
                  </div>

                  <ul className="relative z-10 mt-8 grid gap-0 border-t border-black/10">
                    {pkg.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 border-b border-black/10 py-3 text-sm text-black/72"
                      >
                        <Check className="h-4 w-4 shrink-0 text-red-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
                  );
                })()}
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#101010] px-4 py-16 text-white md:px-8 md:py-24 lg:py-28">
        <div className="mx-auto grid w-full max-w-[1400px] gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <FadeInView>
            <div>
              <Kicker light>Process</Kicker>
              <h2 className="mt-5 font-oswald text-[clamp(2.75rem,6vw,6rem)] font-bold leading-[0.96] tracking-tight">
                From room thesis to follow-up.
              </h2>
            </div>
          </FadeInView>

          <div className="border-t border-white/12">
            {PROCESS.map(([number, title, text], index) => (
              <FadeInView key={title} delay={index * 0.05}>
                <div className="grid gap-5 border-b border-white/12 py-7 md:grid-cols-[120px_0.55fr_1fr] md:items-start">
                  <p className="font-oswald text-4xl font-bold leading-none text-white/18">
                    {number}
                  </p>
                  <h3 className="font-oswald text-3xl font-bold leading-none">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/58 md:text-base">
                    {text}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white px-4 py-16 md:px-8 md:py-24 lg:py-28">
        <div className="mx-auto grid w-full max-w-[1400px] gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
          <FadeInView>
            <div className="flex h-full flex-col justify-between gap-10">
              <div>
                <Kicker>Pilot offer</Kicker>
                <h2 className="mt-5 max-w-4xl font-oswald text-[clamp(2.75rem,6vw,6rem)] font-bold leading-[0.96] tracking-tight">
                  Start with one room people would regret missing.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-black/62 md:text-xl">
                  The first pilot should be narrow: one company, one audience
                  thesis, one curated guest list, one outcome to prove.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <PillLink
                  href={`mailto:${CONTACT_EMAIL}?subject=Founder%20Access%20Rooms%20Pilot`}
                >
                  Start pilot
                </PillLink>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=Founder%20Access%20Rooms%20Question`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-7 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-black hover:text-white"
                >
                  Email the team
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </FadeInView>

          <FadeInView delay={0.08}>
            <div className="relative min-h-[420px] overflow-hidden rounded-[28px] bg-neutral-100 shadow-[0_26px_90px_-70px_rgba(0,0,0,0.45)] lg:min-h-[560px]">
              <Image
                src="/images/ai-hospitality-summit/room-toast.avif"
                alt="Guests during a SFPLAYGROUND event reception"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </FadeInView>
        </div>
      </section>

      <Footer />
    </main>
  );
}
