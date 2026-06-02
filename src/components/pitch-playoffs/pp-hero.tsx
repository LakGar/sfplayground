"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { PP_EVENT, PP_HERO, PP_SOCIAL } from "@/data/pitch-playoffs-page-data";

const EASE = [0.22, 1, 0.36, 1] as const;

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL_ICONS = [InstagramIcon, LinkedInIcon, XIcon] as const;

export default function PPHero() {
  const reduce = useReducedMotion();

  return (
    <section className="pp-hero">
      <div className="pp-hero-top">
        <div className="pp-hero-intro">
          <motion.p
            className="pp-hero-meta"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {PP_HERO.meta}
          </motion.p>
          <motion.h1
            className="pp-hero-title"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          >
            {PP_HERO.title}
          </motion.h1>
        </div>

        <motion.div
          className="pp-hero-actions"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
        >
          <Link href={PP_EVENT.startupApplyHref} className="pp-hero-btn pp-hero-btn-primary">
            Apply as founder
          </Link>
          <Link href={PP_EVENT.investorApplyHref} className="pp-hero-btn pp-hero-btn-secondary">
            Join as investor
          </Link>
          <a
            href={PP_EVENT.calendlyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="pp-hero-btn pp-hero-btn-secondary"
          >
            Book a 15 min call
          </a>
        </motion.div>
      </div>

      <motion.div
        className="pp-hero-banner-glow"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
      >
        <div className="pp-hero-banner">
        <div className="pp-hero-banner-body">
          <div className="pp-hero-banner-inner">
            <div className="pp-hero-banner-main">
              <div className="pp-avatar-row">
                <div className="pp-avatar-stack" aria-hidden>
                  {PP_HERO.avatars.map((src, i) => (
                    <div key={i} className="pp-avatar" style={{ zIndex: 10 - i }}>
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                  ))}
                </div>
                <p className="pp-avatar-more">{PP_HERO.avatarMoreLabel}</p>
              </div>
              <h2 className="pp-hero-banner-title">{PP_HERO.tagline}</h2>
              <div className="pp-hero-proof-row" aria-label="Pitch Playoffs highlights">
                {PP_HERO.proofPoints.map((point) => (
                  <span key={point}>{point}</span>
                ))}
              </div>
            </div>

            <div className="pp-hero-social">
              {PP_SOCIAL.map(({ label, href }, i) => {
                const Icon = SOCIAL_ICONS[i] ?? XIcon;
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pp-social-btn"
                    aria-label={label}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="pp-hero-photo-grid" aria-label="Pitch Playoffs moments">
            {PP_HERO.featureImages.map((image, i) => (
              <motion.div
                key={image.src}
                className={`pp-hero-photo pp-hero-photo-${i + 1}`}
                initial={reduce ? false : { opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.38 + i * 0.08, ease: EASE }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="pp-hero-photo-image"
                  sizes="(max-width: 900px) 42vw, 320px"
                />
              </motion.div>
            ))}
          </div>
        </div>

        <ol className="pp-hero-steps" aria-label="Event flow">
          {PP_HERO.steps.map((step, i) => (
            <motion.li
              key={step}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3 + i * 0.05, ease: EASE }}
            >
              <span className="pp-hero-step-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="pp-hero-step-label">{step}</span>
            </motion.li>
          ))}
        </ol>
        </div>
      </motion.div>
    </section>
  );
}
