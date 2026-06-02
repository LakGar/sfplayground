"use client";

import Image from "next/image";
import Link from "next/link";
import { PP_EVENT, PP_FINAL_CTA } from "@/data/pitch-playoffs-page-data";
import { PPReveal } from "@/components/pitch-playoffs/pp-reveal";

export default function PPFinalCta() {
  const cta = PP_FINAL_CTA;

  return (
    <section className="pp-final-cta" aria-labelledby="pp-final-cta-heading">
      <div className="pp-final-cta-bg" aria-hidden>
        <Image
          src={cta.image}
          alt=""
          fill
          className="pp-final-cta-bg-image"
          sizes="100vw"
        />
        <div className="pp-final-cta-bg-overlay" />
      </div>

      <div className="pp-final-cta-inner">
        <PPReveal className="pp-final-cta-main">
          <h2
            id="pp-final-cta-heading"
            className="pp-brand-display pp-brand-display-cta"
          >
            <span className="pp-brand-display-title font-oswald">
              {cta.brandTitle}
            </span>
            <span className="pp-brand-display-by pp-brand-display">
              {cta.brandByline}
            </span>
          </h2>
          <div className="pp-final-cta-actions">
            <Link href={PP_EVENT.startupApplyHref} className="pp-final-cta-btn">
              <span>Startup application</span>
              <span className="pp-final-cta-btn-icon" aria-hidden>
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
            </Link>
            <Link
              href={PP_EVENT.investorApplyHref}
              className="pp-final-cta-btn pp-final-cta-btn-alt"
            >
              <span>Investor application</span>
              <span className="pp-final-cta-btn-icon" aria-hidden>
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
            </Link>
            <a
              href={PP_EVENT.calendlyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="pp-final-cta-btn pp-final-cta-btn-alt"
            >
              <span>Book a 15 min call</span>
              <span className="pp-final-cta-btn-icon" aria-hidden>
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
          </div>
        </PPReveal>
      </div>
    </section>
  );
}
