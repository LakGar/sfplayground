"use client";

import Image from "next/image";
import { PP_PROCESS } from "@/data/pitch-playoffs-page-data";
import { PPReveal, PPRevealItem, PPRevealStagger } from "@/components/pitch-playoffs/pp-reveal";

const PROCESS_IMAGE = "/images/pitch-playoffs/presentation-room.jpg";

export default function PPHowItWorks() {
  return (
    <section className="pp-section pp-how-it-works" id="format">
      <div className="pp-container">
        <PPReveal>
          <p className="pp-section-label">How it works</p>
          <h2 className="pp-section-title">One night, end to end</h2>
        </PPReveal>

        <div className="pp-how-it-works-grid">
          <PPReveal className="pp-how-it-works-visual" delay={0.06}>
            <div className="pp-how-it-works-image-wrap">
              <Image
                src={PROCESS_IMAGE}
                alt="Founders demoing at a Pitch Playoffs booth with SFPLAYGROUND branding"
                fill
                className="pp-how-it-works-image"
                sizes="(max-width: 900px) 100vw, 520px"
                priority={false}
              />
            </div>
          </PPReveal>

          <PPRevealStagger className="pp-timeline pp-how-it-works-timeline" stagger={0.07}>
            {PP_PROCESS.map((step) => (
              <PPRevealItem key={step.step}>
                <article className="pp-timeline-item">
                  <span className="pp-timeline-step">{step.step}</span>
                  <div className="pp-timeline-content">
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </article>
              </PPRevealItem>
            ))}
          </PPRevealStagger>
        </div>
      </div>
    </section>
  );
}
