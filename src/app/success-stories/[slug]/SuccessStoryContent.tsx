"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Nav from "@/component/landing/nav";
import Footer from "@/component/landing/footer";
import VideoBackground from "@/component/ui/video-background";
import Image from "next/image";
import { SIGNUP_FORM_URL } from "@/data/constants";
import { convertGoogleDriveImageUrl } from "@/utils/convertDriveImageUrl";

export type SuccessStoryData = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
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
};

export function SuccessStoryContent({ story }: { story: SuccessStoryData }) {
  const challengePoints = story.challengePoints ?? [];
  const rolePoints = story.rolePoints ?? [];
  const impactPoints = story.impactPoints ?? [];

  return (
    <div className="relative overflow-x-hidden bg-black min-h-screen">
      <Nav />
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center px-4 md:px-8 lg:px-12 overflow-hidden">
        <VideoBackground />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-[#19f7ea] text-black text-xs font-oswald font-bold rounded">
              SUCCESS STORY
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-oswald text-white mb-4">
            {story.title}
          </h1>
          <p className="text-2xl md:text-3xl font-oswald text-[#19f7ea]">
            {story.tagline}
          </p>
        </div>
      </div>
      <div className="pt-16 pb-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/success-stories"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 font-oswald transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Success Stories
          </Link>
          <div className="mb-12">
            <p className="text-white/80 text-lg font-oswald leading-relaxed mb-4">
              {story.description}
            </p>
            <p className="text-white/60 text-sm font-oswald">
              {story.title} was showcased at SF Playground, where they quickly
              became one of the most voted startups on the floor.
            </p>
          </div>
          <div className="relative w-full h-64 md:h-96 mb-12 rounded-lg overflow-hidden border border-white/20 bg-white/5 flex items-center justify-center">
            <Image
              src={convertGoogleDriveImageUrl(story.image)}
              alt={story.title}
              width={400}
              height={400}
              className="object-contain p-8"
            />
          </div>
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-oswald text-white mb-6">
              The <span className="text-[#19f7ea]">Challenge</span>
            </h2>
            <p className="text-white/80 text-lg font-oswald mb-4">
              {story.challenge}
            </p>
            <ul className="space-y-3">
              {challengePoints.map((point, index) => (
                <li
                  key={index}
                  className="text-white/70 font-oswald flex items-start gap-3"
                >
                  <span className="text-[#19f7ea] mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-oswald text-white mb-6">
              Our <span className="text-[#19f7ea]">Role</span>
            </h2>
            <p className="text-white/80 text-lg font-oswald mb-4">
              {story.ourRole}
            </p>
            <ul className="space-y-3">
              {rolePoints.map((point, index) => (
                <li
                  key={index}
                  className="text-white/70 font-oswald flex items-start gap-3"
                >
                  <span className="text-[#19f7ea] mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-oswald text-white mb-6">
              The <span className="text-[#19f7ea]">Experience</span>
            </h2>
            <div className="text-white/80 text-lg font-oswald leading-relaxed whitespace-pre-line">
              {story.experience}
            </div>
          </section>
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-oswald text-white mb-6">
              The <span className="text-[#19f7ea]">Impact</span>
            </h2>
            <p className="text-white/80 text-lg font-oswald mb-4">
              {story.impact}
            </p>
            <p className="text-white/60 text-base font-oswald mb-4">
              {story.title} left the event with meaningful connections and
              momentum — not just exposure.
            </p>
            <ul className="space-y-3">
              {impactPoints.map((point, index) => (
                <li
                  key={index}
                  className="text-white/70 font-oswald flex items-start gap-3"
                >
                  <span className="text-[#19f7ea] mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-oswald text-white mb-6">
              Founder & Attendee <span className="text-[#19f7ea]">Feedback</span>
            </h2>
            <div className="space-y-6">
              <blockquote className="border-l-4 border-[#19f7ea] pl-6 py-4">
                <p className="text-white/90 text-lg font-oswald italic mb-2">
                  {story.founderQuote}
                </p>
                <p className="text-white/60 font-oswald">— {story.title} Team</p>
              </blockquote>
              <blockquote className="border-l-4 border-[#19f7ea] pl-6 py-4">
                <p className="text-white/90 text-lg font-oswald italic mb-2">
                  {story.attendeeQuote}
                </p>
                <p className="text-white/60 font-oswald">— Event Attendee</p>
              </blockquote>
              <blockquote className="border-l-4 border-[#19f7ea] pl-6 py-4">
                <p className="text-white/90 text-lg font-oswald italic mb-2">
                  {story.founderQuote2}
                </p>
                <p className="text-white/60 font-oswald">— Startup Founder</p>
              </blockquote>
            </div>
          </section>
          <section className="mb-12">
            <h2 className="text-3xl md:text-4xl font-oswald text-white mb-6">
              Why This <span className="text-[#19f7ea]">Matters</span>
            </h2>
            <div className="text-white/80 text-lg font-oswald leading-relaxed whitespace-pre-line">
              {story.whyMatters}
            </div>
          </section>
          <div className="mt-16 pt-8 border-t border-white/20 text-center">
            <h3 className="text-2xl md:text-3xl font-oswald text-white mb-4">
              Ready to Write Your Success Story?
            </h3>
            <a
              href={SIGNUP_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#19f7ea] text-black px-8 py-3 rounded-md font-oswald font-bold hover:bg-[#19f7ea]/90 transition-colors"
            >
              Get on the list
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
