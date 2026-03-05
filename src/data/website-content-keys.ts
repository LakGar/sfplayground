/**
 * Keys and defaults for visual website editor.
 * type: "text" = inline editable text, "image" | "video" = show "Change" button.
 */
export const WEBSITE_CONTENT_CONFIG: Record<
  string,
  { type: "text" | "image" | "video"; default: string }
> = {
  "hero.headline1": { type: "text", default: "Crowd " },
  "hero.headline2": { type: "text", default: " Powered." },
  "hero.headline3": { type: "text", default: " Investor " },
  "hero.headline4": { type: "text", default: " Backed." },
  "hero.subline": {
    type: "text",
    default: "Live demos. Pitch battles. Top founders. Active VCs.",
  },
  "hero.ctaPrimary": { type: "text", default: "Register for a free both" },
  "hero.ctaSecondary": { type: "text", default: "Learn more" },
  "hero.desktopCopy": {
    type: "text",
    default:
      "Startups register for a free demo booth and a chance to pitch live to VCs.",
  },
  "hero.backgroundImage": { type: "image", default: "/hero.jpg" },
  "hero.backgroundVideo": { type: "video", default: "/hero.mp4" },
  "nav.logoLeft": { type: "text", default: "SF" },
  "nav.logoRight": { type: "text", default: "PLAYGROUND" },
  "cta.headline": {
    type: "text",
    default: "Ready to Pitch Your Startup?",
  },
  "cta.subline": {
    type: "text",
    default:
      "Join hundreds of founders who have pitched live and secured funding from top VCs. Your story deserves to be heard.",
  },
  "cta.buttonPrimary": { type: "text", default: "Get on the list" },
  "cta.buttonSecondary": { type: "text", default: "Learn more" },
  "cta.backgroundImage": {
    type: "image",
    default:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2832&auto=format&fit=crop",
  },
  "faq.title": { type: "text", default: "Frequently Asked Questions" },
  "faq.subtitle": {
    type: "text",
    default: "Everything you need to know about pitching at SF Playground.",
  },
  "about.heroTitle": { type: "text", default: "About SF Playground" },
  "about.heroSubtitle": {
    type: "text",
    default:
      "An SF-based platform for live startup pitches and real investor decisions.",
  },
  "about.whatWeDo.heading": { type: "text", default: "What We Do" },
  "about.whatWeDo.tagline": {
    type: "text",
    default:
      "We connect founders to VCs through live, crowd-powered pitch competitions.",
  },
  "about.whatWeDo.card0.title": { type: "text", default: "Live Pitches" },
  "about.whatWeDo.card0.description": {
    type: "text",
    default: "Watch founders pitch in real-time",
  },
  "about.whatWeDo.card0.image": {
    type: "image",
    default:
      "https://drive.google.com/uc?export=view&id=1N91BEb6QIa1nZEipkl0DPI-4RnieS0zg",
  },
  "about.whatWeDo.card1.title": { type: "text", default: "Social Proof" },
  "about.whatWeDo.card1.description": {
    type: "text",
    default: "Receive votes from builders and investors",
  },
  "about.whatWeDo.card1.image": {
    type: "image",
    default:
      "https://drive.google.com/thumbnail?id=1zNi50nX4lS01uDR9ALRtv27BQ4kHD5Jk&sz=w1200",
  },
  "about.whatWeDo.card2.title": { type: "text", default: "VC Feedback" },
  "about.whatWeDo.card2.description": {
    type: "text",
    default: "Get direct insights from investors",
  },
  "about.whatWeDo.card2.image": {
    type: "image",
    default:
      "https://drive.google.com/uc?export=view&id=1EmPGUJXndScOSNLLDXJTp_0O6EUqUzj8",
  },
  "about.whatWeDo.card3.title": { type: "text", default: "Networking" },
  "about.whatWeDo.card3.description": {
    type: "text",
    default: "Connect with industry leaders",
  },
  "about.whatWeDo.card3.image": {
    type: "image",
    default:
      "https://drive.google.com/uc?export=view&id=1rjtcqz-O2o_0R6JFXv34h9VCx7s8mX36",
  },
  "howItWorks.title": { type: "text", default: "How it works" },
  "howItWorks.subtitle": {
    type: "text",
    default: "Four steps from demo floor to investor intro.",
  },
  "howItWorks.step1.title": { type: "text", default: "Demo booths" },
  "howItWorks.step1.description": {
    type: "text",
    default:
      "Startups showcase at demo booths; attendees explore and ask questions.",
  },
  "howItWorks.step2.title": { type: "text", default: "Crowd votes" },
  "howItWorks.step2.description": {
    type: "text",
    default: "Attendees vote for their favorites. Top startups rise to the top.",
  },
  "howItWorks.step3.title": { type: "text", default: "Finalists pitch" },
  "howItWorks.step3.description": {
    type: "text",
    default:
      "Top-voted founders pitch live to a panel of VCs and the room.",
  },
  "howItWorks.step4.title": { type: "text", default: "Investor intros" },
  "howItWorks.step4.description": {
    type: "text",
    default: "Interested investors get warm intros; founders close the loop.",
  },
  "faq.0.question": {
    type: "text",
    default: "How do I apply to pitch at SF Playground?",
  },
  "faq.0.answer": {
    type: "text",
    default:
      "Click \"Get on the list\" anywhere on the site to open our signup form. We review applications weekly and notify selected founders within 5 business days.",
  },
  "faq.1.question": { type: "text", default: "What stage startups can apply?" },
  "faq.1.answer": {
    type: "text",
    default:
      "We welcome startups from pre-seed to Series A. Whether you're just starting out or have initial traction, if you have a compelling story and vision, we want to hear from you.",
  },
  "faq.2.question": { type: "text", default: "How long is each pitch?" },
  "faq.2.answer": {
    type: "text",
    default:
      "Each founder gets 5 minutes to pitch followed by 5 minutes of Q&A from our panel of VCs. It's fast-paced and designed to simulate real investor meetings.",
  },
  "faq.3.question": { type: "text", default: "Who are the investors at these events?" },
  "faq.3.answer": {
    type: "text",
    default:
      "Past and guest investors include partners, principals, and associates from top-tier VC firms (e.g. Sequoia, a16z, Greylock) as well as active angel investors. How intros work: after you pitch, interested investors can request an intro through us; we facilitate warm intros and help track follow-ups so you can close your round.",
  },
  "faq.4.question": { type: "text", default: "Is there a fee to pitch?" },
  "faq.4.answer": {
    type: "text",
    default:
      "No, pitching at SF Playground is completely free. We believe in removing barriers for founders to access capital and feedback.",
  },
  "faq.5.question": { type: "text", default: "What happens after I pitch?" },
  "faq.5.answer": {
    type: "text",
    default:
      "Interested investors can request introductions directly through our platform. We facilitate warm intros and track follow-up meetings to help you close your round.",
  },
};

export type WebsiteContentKey = keyof typeof WEBSITE_CONTENT_CONFIG;
