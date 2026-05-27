"use client";

import Image from "next/image";
import Link from "next/link";
import { PP_INVESTORS } from "@/data/pitch-playoffs-page-data";
import { PPReveal } from "@/components/pitch-playoffs/pp-reveal";

export default function PPInvestors() {
  const section = PP_INVESTORS;

  return (
    <section
      className="pp-investors bg-white"
      id="investors"
      aria-labelledby="pp-investors-heading"
    >
      <div className="pp-container pp-investors-inner">
        <PPReveal className="pp-investors-copy">
          <p className="pp-section-label">{section.label}</p>
          <h2 id="pp-investors-heading" className="pp-investors-headline">
            {section.headline}
          </h2>
          <p className="pp-investors-body">{section.body}</p>
          <ul className="pp-investors-list">
            {section.perks.map((perk) => (
              <li key={perk}>{perk}</li>
            ))}
          </ul>
          <Link href={section.href} className="pp-text-link">
            {section.cta} →
          </Link>
        </PPReveal>

        <PPReveal className="pp-investors-visual" delay={0.1}>
          <div className="pp-investors-image-wrap">
            <Image
              src={section.image}
              alt={section.imageAlt}
              fill
              className="pp-investors-image"
              sizes="(max-width: 900px) 100vw, 540px"
            />
          </div>
        </PPReveal>
      </div>
    </section>
  );
}
