"use client";

import Image from "next/image";
import Link from "next/link";
import { PP_FOOTER } from "@/data/pitch-playoffs-page-data";
import {
  PPReveal,
  PPRevealItem,
  PPRevealStagger,
} from "@/components/pitch-playoffs/pp-reveal";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

function FooterNavLink({ link }: { link: FooterLink }) {
  const className = "pp-footer-nav-link";

  if (
    link.external ||
    link.href.startsWith("http") ||
    link.href.startsWith("mailto:") ||
    link.href.startsWith("#")
  ) {
    return (
      <a
        href={link.href}
        className={className}
        {...(link.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

export default function PPFooter() {
  return (
    <footer className="pp-footer">
      <div className="pp-footer-inner">
        <PPReveal className="pp-footer-top">
          <Link href="/" className="pp-footer-brand">
            <Image
              src="/images/logo.png"
              alt=""
              width={36}
              height={36}
              className="pp-footer-brand-logo"
            />
            <span className="pp-footer-brand-text font-oswald">
              {PP_FOOTER.brand}
            </span>
          </Link>

          <PPRevealStagger className="pp-footer-nav" stagger={0.04}>
            {PP_FOOTER.navGroups.map((group, i) => (
              <PPRevealItem key={i}>
                <div className="pp-footer-nav-group">
                  {group.map((link) => (
                    <FooterNavLink key={link.label} link={link} />
                  ))}
                </div>
              </PPRevealItem>
            ))}
          </PPRevealStagger>

          <a href={PP_FOOTER.contactHref} className="pp-footer-contact">
            <span>{PP_FOOTER.contactLabel}</span>
            <span className="pp-footer-contact-icon" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7h8M8 4l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </PPReveal>

        <PPReveal className="pp-footer-bottom" delay={0.1}>
          <p className="pp-footer-copy">
            © {PP_FOOTER.brand}. All Rights Reserved.
          </p>
          <p className="pp-footer-credit">
            <span className="pp-brand-display-title font-oswald pp-footer-credit-title">
              Pitch Playoffs
            </span>
            <span className="pp-brand-display-by pp-footer-credit-by">
              by SFPLAYGROUND
            </span>
          </p>
        </PPReveal>
      </div>
    </footer>
  );
}
