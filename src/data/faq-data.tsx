import Link from "next/link";
import type { ReactNode } from "react";
import {
  INSTAGRAM_PROFILE,
  LINKEDIN_COMPANY,
} from "@/data/social-links";

const CONTACT_EMAIL = "staff@sfplaygroundai.com";
const LUMA_PROFILE = "https://luma.com/user/SFPlayground";

const linkClass =
  "underline underline-offset-2 decoration-black/30 transition-colors hover:text-black";

function FaqLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={linkClass}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}

export type FaqAction = {
  label: string;
  href: string;
  external?: boolean;
};

export type FaqItem = {
  question: string;
  answer: string | ReactNode;
  action: FaqAction;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is SFPLAYGROUND?",
    answer:
      "SFPLAYGROUND connects startups, investors, and customers through live experiences designed to surface stronger signal, meaningful relationships, and real dealflow.",
    action: { label: "Explore the network", href: "/network" },
  },
  {
    question: "Who can attend SFPLAYGROUND events?",
    answer:
      "Our events are built for founders raising capital, active investors and family offices, operators, and partners who want to be part of the startup ecosystem. Some events are invite-only or application-based depending on format and capacity.",
    action: {
      label: "View upcoming events",
      href: "/#upcoming-events-heading",
    },
  },
  {
    question: "How do I demo at an event?",
    answer: (
      <>
        Apply through the program you want to join — such as{" "}
        <FaqLink href="/pitch-playoffs">Pitch Playoffs</FaqLink> or our industry
        summits on <FaqLink href={LUMA_PROFILE} external>Luma</FaqLink>.
        Selected founders receive demo time, investor feedback, and follow-up
        opportunities within our network.
      </>
    ),
    action: { label: "Apply to Pitch Playoffs", href: "/pitch-playoffs" },
  },
  {
    question: "What types of events does SFPLAYGROUND host?",
    answer:
      "We run pitch competitions, investor nights, industry summits, partner showcases, and community gatherings — from intimate dinners to large-stage events across San Francisco and Silicon Valley.",
    action: {
      label: "Browse past events",
      href: "/#previous-events-heading",
    },
  },
  {
    question: "How do I get involved with the network?",
    answer: (
      <>
        Start by{" "}
        <FaqLink href={INSTAGRAM_PROFILE} external>
          attending an upcoming event
        </FaqLink>
        , subscribing to our newsletter in the footer, or reaching out at{" "}
        <FaqLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</FaqLink>.
        Founders can use the{" "}
        <FaqLink href="/network/apply?type=startups">startup application</FaqLink>
        ; investors can use the{" "}
        <FaqLink href="/network/apply?type=vcs">investor application</FaqLink>.
      </>
    ),
    action: { label: "Start your application", href: "/network/apply" },
  },
  {
    question: "Are events in-person or virtual?",
    answer:
      "Most experiences are in-person in San Francisco and the Bay Area to maximize connection and deal flow. Select programs may include hybrid or virtual components — check each event listing for details.",
    action: {
      label: "See what's coming up",
      href: LUMA_PROFILE,
      external: true,
    },
  },
  {
    question: "How can investors participate?",
    answer: (
      <>
        Investors can attend live pitch events, join judging panels, request
        curated dealflow, or partner on themed programs. Follow us on{" "}
        <FaqLink href={LINKEDIN_COMPANY} external>LinkedIn</FaqLink> for
        program updates.
      </>
    ),
    action: {
      label: "Apply as an investor",
      href: "/network/apply?type=vcs",
    },
  },
  {
    question: "How do I contact the team?",
    answer:
      "Reach out for partnerships, event inquiries, press, or general questions. We typically respond within one to two business days.",
    action: {
      label: "Email the team",
      href: `mailto:${CONTACT_EMAIL}?subject=Question%20for%20SFPLAYGROUND`,
    },
  },
];
