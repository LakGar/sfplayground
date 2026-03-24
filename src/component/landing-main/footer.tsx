import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SIGNUP_FORM_URL } from "@/data/constants";

const Footer = () => {
  return (
    <footer className="relative w-full bg-black text-white">
      <div className="relative h-[min(85vh,760px)] w-full overflow-hidden rounded-t-3xl md:h-[min(78vh,820px)] md:rounded-t-[2rem]">
        <Image
          src="/footer-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/48 to-black/55" />
        <div className="landing-grain absolute inset-0 opacity-[0.38]" />
        <div className="landing-vignette pointer-events-none absolute inset-0 opacity-60" />

        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-4 pb-14 pt-24 md:px-6 md:pb-20 md:pt-32 lg:px-8">
            <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:items-end md:gap-10">
              <div className="md:col-span-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45">
                  Floor access
                </p>
                <h2 className="mt-5 font-oswald text-[2.35rem] font-bold leading-[1.02] tracking-[-0.02em] text-white md:text-5xl lg:text-[3.5rem]">
                  Pitch when the room is paying attention.
                </h2>
                <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-white/55 md:text-lg">
                  Apply for a demo slot. Selected teams pitch live—filtered by
                  the crowd before investors weigh in.
                </p>
              </div>
              <div className="flex flex-col gap-4 md:col-span-5 md:items-end md:text-right">
                <Link
                  href={SIGNUP_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit items-center gap-3 rounded-xl border border-white/35 bg-white/[0.08] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-black"
                >
                  Register
                  <ArrowUpRight className="h-4 w-4 opacity-80 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
                </Link>
                <p className="max-w-xs text-xs leading-relaxed text-white/40 md:ml-auto">
                  No pay-to-pitch. We curate for signal density and founder fit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-black">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <p className="font-oswald text-lg font-bold tracking-[0.08em]">
                SFPLAYGROUND
              </p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
                Live startup pitches in San Francisco—crowd signal first,
                capital second.
              </p>
              <a
                href="https://www.theempowerweb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 text-[10px] uppercase tracking-[0.25em] text-white/35"
              >
                TheEmpowerWeb
              </a>
            </div>

            <div className="grid grid-cols-3 gap-10 sm:gap-16 md:col-span-7 md:justify-end md:justify-items-end">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">
                  Site
                </p>
                <ul className="mt-4 flex flex-col gap-3 text-sm text-white/60">
                  <li>
                    <Link
                      href="/about"
                      className="transition-colors hover:text-white"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/events"
                      className="transition-colors hover:text-white"
                    >
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/success-stories"
                      className="transition-colors hover:text-white"
                    >
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="transition-colors hover:text-white"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="transition-colors hover:text-white"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">
                  Socials
                </p>
                <ul className="mt-4 flex flex-col gap-3 text-sm text-white/60">
                  <li>
                    <Link
                      href="https://www.linkedin.com/company/sfplayground"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-white"
                    >
                      LinkedIn
                    </Link>
                  </li>
                </ul>
                <ul className="mt-4 flex flex-col gap-3 text-sm text-white/60">
                  <li>
                    <Link
                      href="https://www.instagram.com/sfplayground/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-white"
                    >
                      Instagram
                    </Link>
                  </li>
                </ul>
                <ul className="mt-4 flex flex-col gap-3 text-sm text-white/60">
                  <li>
                    <Link
                      href="https://x.com/sf_playgro27142"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-white"
                    >
                      X
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">
                  Legal
                </p>
                <ul className="mt-4 flex flex-col gap-3 text-sm text-white/60">
                  <li>
                    <Link
                      href="/terms"
                      className="transition-colors hover:text-white"
                    >
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="transition-colors hover:text-white"
                    >
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
