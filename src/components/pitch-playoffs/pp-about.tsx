"use client";

import Image from "next/image";
import Link from "next/link";
import { PP_ABOUT, PP_EVENT } from "@/data/pitch-playoffs-page-data";
import { PPReveal, PPRevealItem, PPRevealStagger } from "@/components/pitch-playoffs/pp-reveal";

export default function PPAbout() {
  return (
    <section className="pp-about" id="about" aria-labelledby="pp-about-heading">
      <div className="pp-about-inner">
        <div className="pp-about-grid">
          <PPReveal className="pp-about-sidebar">
            <p className="pp-about-label">
              <span className="pp-about-dot" aria-hidden />
              {PP_ABOUT.label}
            </p>
            <Link href={PP_EVENT.startupApplyHref} className="pp-text-link">
              Founder application →
            </Link>
          </PPReveal>

          <PPReveal className="pp-about-main" delay={0.08}>
            <h2 id="pp-about-heading" className="pp-about-headline">
              {PP_ABOUT.headline}
            </h2>
            <p className="pp-about-body">{PP_ABOUT.body}</p>
            <PPRevealStagger className="pp-about-images" stagger={0.1}>
              {PP_ABOUT.images.map((image, i) => (
                <PPRevealItem key={image.src}>
                  <div
                    className={`pp-about-image-wrap pp-about-image-wrap--${image.layout}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="pp-about-image"
                      sizes={
                        image.layout === "landscape"
                          ? "(max-width: 768px) 100vw, 58vw"
                          : "(max-width: 768px) 100vw, 34vw"
                      }
                      priority={i === 0}
                    />
                  </div>
                </PPRevealItem>
              ))}
            </PPRevealStagger>
          </PPReveal>
        </div>
      </div>
    </section>
  );
}
