"use client";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Nav from "@/component/landing/nav";
import Footer from "@/component/landing/footer";
import VideoBackground from "@/component/ui/video-background";
import Image from "next/image";

const successStories: Record<
  string,
  {
    title: string;
    tagline: string;
    description: string;
    challenge: string;
    challengePoints: string[];
    ourRole: string;
    rolePoints: string[];
    experience: string;
    impact: string;
    impactPoints: string[];
    founderQuote: string;
    attendeeQuote: string;
    founderQuote2: string;
    whyMatters: string;
  }
> = {
  "petpin-ai": {
    title: "Petpin AI",
    tagline: "Turning an AI Pet Startup Into a Crowd Favorite",
    description:
      "Petpin AI is an AI-powered wearable that lets pet owners see the world from their pet's point of view — combining computer vision, behavioral insights, and emotional storytelling into one delightful product.",
    challenge:
      "As an early-stage startup building cutting-edge consumer AI hardware, Petpin AI needed to:",
    challengePoints: [
      "Introduce a new category (AI wearables for pets)",
      "Explain complex technology simply and emotionally",
      "Capture attention in a high-energy, competitive event environment",
      "Generate excitement, conversation, and early adopters",
    ],
    ourRole:
      "At SF Playground, we curated an environment that helped Petpin AI:",
    rolePoints: [
      "🎤 Present their story clearly to a live audience",
      "🧠 Demonstrate AI value through hands-on interaction",
      "🤝 Connect with builders, investors, and early users",
      "📣 Spark organic word-of-mouth across the event floor",
    ],
    experience:
      "Petpin AI's showcase focused on emotion-first storytelling:\n\nLive demos showing pets' POV footage\n\nApp walkthroughs highlighting mood detection and auto-generated clips\n\nOne-on-one conversations explaining how AI enhances everyday pet care\n\nThe result was an experience that felt personal, fun, and futuristic — not overly technical.",
    impact:
      "Petpin AI's presence at the event delivered real results:",
    impactPoints: [
      "🚀 High attendee engagement throughout the event",
      "🐾 Strong emotional response from pet owners and tech enthusiasts",
      "📈 Increased brand awareness and post-event traffic",
      "💬 Consistent buzz across conversations, demos, and social sharing",
    ],
    founderQuote:
      '"This event helped us explain Petpin AI in a way people immediately felt. Watching attendees light up when they saw their pets\' POV was incredible."',
    attendeeQuote:
      '"This was one of the most memorable demos at the event. It was fun, emotional, and genuinely innovative."',
    founderQuote2:
      '"Petpin AI felt like the kind of product you remember after the event ends."',
    whyMatters:
      "Petpin AI is a great example of how the right event environment can accelerate a startup's story — turning a product demo into a moment people remember.\n\nAt SF Playground, we don't just host events — we help ideas land.",
  },
};

export default function SuccessStoryPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const normalizedSlug = resolvedParams.slug.toLowerCase().trim();
  const story = successStories[normalizedSlug];

  if (!story) {
    return (
      <div className="relative overflow-x-hidden bg-black min-h-screen">
        <Nav />
        <div className="pt-24 pb-16 px-4 md:px-8 lg:px-12 text-center">
          <h1 className="text-4xl font-oswald text-white mb-4">
            Story Not Found
          </h1>
          <Link
            href="/success-stories"
            className="text-[#feca00] hover:underline font-oswald"
          >
            Back to Success Stories
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative overflow-x-hidden bg-black min-h-screen">
      <Nav />
      
      {/* Hero Section with Video Background */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center px-4 md:px-8 lg:px-12 overflow-hidden">
        <VideoBackground />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-[#feca00] text-black text-xs font-oswald font-bold rounded">
              SUCCESS STORY
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-oswald text-white mb-4">
            {story.title}
          </h1>
          <p className="text-2xl md:text-3xl font-oswald text-[#feca00]">
            {story.tagline}
          </p>
        </div>
      </div>
      
      <div className="pt-16 pb-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/success-stories"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 font-oswald transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Success Stories
          </Link>

          {/* Header */}
          <div className="mb-12">
            <p className="text-white/80 text-lg font-oswald leading-relaxed mb-4">
              {story.description}
            </p>
            <p className="text-white/60 text-sm font-oswald">
              Petpin AI was launched and showcased at SF Playground, where it
              quickly became one of the most talked-about startups on the floor.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative w-full h-64 md:h-96 mb-12 rounded-lg overflow-hidden border border-white/20 bg-white/5 flex items-center justify-center">
            <Image
              src="/petpin.png"
              alt={story.title}
              width={400}
              height={400}
              className="object-contain p-8"
            />
          </div>

          {/* The Challenge */}
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-oswald text-white mb-6">
              The <span className="text-[#feca00]">Challenge</span>
            </h2>
            <p className="text-white/80 text-lg font-oswald mb-4">
              {story.challenge}
            </p>
            <ul className="space-y-3">
              {story.challengePoints.map((point, index) => (
                <li
                  key={index}
                  className="text-white/70 font-oswald flex items-start gap-3"
                >
                  <span className="text-[#feca00] mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Our Role */}
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-oswald text-white mb-6">
              Our <span className="text-[#feca00]">Role</span>
            </h2>
            <p className="text-white/80 text-lg font-oswald mb-4">
              {story.ourRole}
            </p>
            <ul className="space-y-3">
              {story.rolePoints.map((point, index) => (
                <li
                  key={index}
                  className="text-white/70 font-oswald flex items-start gap-3"
                >
                  <span className="text-[#feca00] mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* The Experience */}
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-oswald text-white mb-6">
              The <span className="text-[#feca00]">Experience</span>
            </h2>
            <div className="text-white/80 text-lg font-oswald leading-relaxed whitespace-pre-line">
              {story.experience}
            </div>
          </section>

          {/* The Impact */}
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-oswald text-white mb-6">
              The <span className="text-[#feca00]">Impact</span>
            </h2>
            <p className="text-white/80 text-lg font-oswald mb-4">
              {story.impact}
            </p>
            <p className="text-white/60 text-base font-oswald mb-4">
              Petpin AI left the event with meaningful connections and momentum
              — not just exposure.
            </p>
            <ul className="space-y-3">
              {story.impactPoints.map((point, index) => (
                <li
                  key={index}
                  className="text-white/70 font-oswald flex items-start gap-3"
                >
                  <span className="text-[#feca00] mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Founder & Attendee Feedback */}
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-oswald text-white mb-6">
              Founder & Attendee <span className="text-[#feca00]">Feedback</span>
            </h2>
            <div className="space-y-6">
              <blockquote className="border-l-4 border-[#feca00] pl-6 py-4">
                <p className="text-white/90 text-lg font-oswald italic mb-2">
                  {story.founderQuote}
                </p>
                <p className="text-white/60 font-oswald">— Petpin AI Team</p>
              </blockquote>
              <blockquote className="border-l-4 border-[#feca00] pl-6 py-4">
                <p className="text-white/90 text-lg font-oswald italic mb-2">
                  {story.attendeeQuote}
                </p>
                <p className="text-white/60 font-oswald">— Event Attendee</p>
              </blockquote>
              <blockquote className="border-l-4 border-[#feca00] pl-6 py-4">
                <p className="text-white/90 text-lg font-oswald italic mb-2">
                  {story.founderQuote2}
                </p>
                <p className="text-white/60 font-oswald">— Startup Founder</p>
              </blockquote>
            </div>
          </section>

          {/* Why This Matters */}
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-oswald text-white mb-6">
              Why This <span className="text-[#feca00]">Matters</span>
            </h2>
            <div className="text-white/80 text-lg font-oswald leading-relaxed whitespace-pre-line">
              {story.whyMatters}
            </div>
          </section>

          {/* CTA */}
          <div className="mt-16 pt-8 border-t border-white/20 text-center">
            <h3 className="text-2xl md:text-3xl font-oswald text-white mb-4">
              Ready to Write Your Success Story?
            </h3>
            <Link
              href="/"
              className="inline-block bg-[#feca00] text-black px-8 py-3 rounded-md font-oswald font-bold hover:bg-[#feca00]/90 transition-colors"
            >
              Apply to Pitch Now
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

