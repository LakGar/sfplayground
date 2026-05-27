"use client";

import Link from "next/link";
import { PP_APPLY_PATHS } from "@/data/pitch-playoffs-page-data";
import { PPReveal, PPRevealItem, PPRevealStagger } from "@/components/pitch-playoffs/pp-reveal";

export default function PPApplyPaths() {
  const section = PP_APPLY_PATHS;

  return (
    <section className="pp-apply-paths" id="apply" aria-labelledby="pp-apply-heading">
      <div className="pp-container">
        <PPReveal>
          <p className="pp-section-label">{section.label}</p>
          <h2 id="pp-apply-heading" className="pp-section-title">
            {section.headline}
          </h2>
        </PPReveal>

        <PPRevealStagger className="pp-apply-paths-grid" stagger={0.1}>
          {section.paths.map((path) => (
            <PPRevealItem key={path.id}>
              <Link href={path.href} className="pp-apply-path">
                <p className="pp-apply-path-eyebrow">{path.eyebrow}</p>
                <h3 className="pp-apply-path-title">{path.title}</h3>
                <p className="pp-apply-path-desc">{path.description}</p>
                <span className="pp-apply-path-cta">
                  {path.cta}
                  <span aria-hidden>→</span>
                </span>
              </Link>
            </PPRevealItem>
          ))}
        </PPRevealStagger>
      </div>
    </section>
  );
}
