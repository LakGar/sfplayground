"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import Nav from "@/components/nav";
import PartnerMarquee from "@/components/partner-marquee";
import PPAbout from "@/components/pitch-playoffs/pp-about";
import PPApplyPaths from "@/components/pitch-playoffs/pp-apply-paths";
import PPAtAGlance from "@/components/pitch-playoffs/pp-at-a-glance";
import PPFinalCta from "@/components/pitch-playoffs/pp-final-cta";
import PPFooter from "@/components/pitch-playoffs/pp-footer";
import PPHero from "@/components/pitch-playoffs/pp-hero";
import PPInvestors from "@/components/pitch-playoffs/pp-investors";
import { PPReveal, PPRevealItem, PPRevealStagger } from "@/components/pitch-playoffs/pp-reveal";
import PPHowItWorks from "@/components/pitch-playoffs/pp-how-it-works";
import { PP_FAQ } from "@/data/pitch-playoffs-page-data";

const EASE = [0.22, 1, 0.36, 1] as const;

type FaqItem = { q: string; a: string };

function FaqGroup({ title, items }: { title: string; items: readonly FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <div className="pp-faq-group">
      <h3 className="pp-faq-group-title">{title}</h3>
      <div className="pp-faq-list">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="pp-faq-item">
              <button
                type="button"
                className="pp-faq-trigger"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                {item.q}
                <span aria-hidden>{isOpen ? "−" : "+"}</span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="pp-faq-answer">{item.a}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PitchPlayoffsPage() {
  return (
    <>
      <main className="pp-page">
      <Nav />
      <PPHero />

      <PPReveal>
        <PartnerMarquee className="bg-white pp-partners" />
      </PPReveal>

      <PPAbout />

      <PPHowItWorks />

      <PPInvestors />
      <PPAtAGlance />
      <PPApplyPaths />

      <section id="faq" className="pp-section">
        <div className="pp-container">
          <PPReveal>
            <p className="pp-section-label">FAQ</p>
            <h2 className="pp-section-title">Quick answers</h2>
          </PPReveal>
          <PPRevealStagger className="pp-faq-groups" stagger={0.1}>
            <PPRevealItem>
              <FaqGroup title="For founders" items={PP_FAQ.founders} />
            </PPRevealItem>
            <PPRevealItem>
              <FaqGroup title="For investors" items={PP_FAQ.investors} />
            </PPRevealItem>
          </PPRevealStagger>
        </div>
      </section>

      <PPFinalCta />
      <PPFooter />
    </main>
    <div className="pp-page-bottom-blur" aria-hidden>
      <div className="pp-page-bottom-blur-glass" />
    </div>
    </>
  );
}
