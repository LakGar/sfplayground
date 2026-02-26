import Link from "next/link";
import Image from "next/image";
import Nav from "@/component/landing/nav";
import Footer from "@/component/landing/footer";
import VideoBackground from "@/component/ui/video-background";
import { ArrowRightIcon, Users, TrendingUp, Target, Zap } from "lucide-react";
import { SIGNUP_FORM_URL } from "@/data/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | SF Playground",
  description:
    "Learn about SF Playground - an SF-based platform for live startup pitches and real investor decisions. Discover our mission, values, and how we help startups connect with investors.",
  alternates: {
    canonical: "https://sfplayground.com/about",
  },
  openGraph: {
    title: "About Us | SF Playground",
    description:
      "Learn about SF Playground - an SF-based platform for live startup pitches and real investor decisions.",
    url: "https://sfplayground.com/about",
  },
};

const stats = [
  { number: "500+", label: "Startups Pitched" },
  { number: "$50M+", label: "Capital Deployed" },
  { number: "200+", label: "Active VCs" },
  { number: "95%", label: "Founder Satisfaction" },
];

const values = [
  {
    icon: <Target className="w-8 h-8" />,
    title: "Real Decisions",
    description:
      "No fluff, no promises. Just real-time feedback and actual investment decisions from active VCs.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Live & Immediate",
    description:
      "Watch pitches happen in real-time. Get feedback instantly. Make connections that matter.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Quality Network",
    description:
      "Connect with top-tier investors, experienced founders, and industry leaders who move fast.",
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Proven Results",
    description:
      "Our platform has helped hundreds of startups secure funding and build meaningful relationships.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-x-hidden bg-black min-h-screen">
      <Nav />

      {/* Hero Section with Video Background */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center px-4 md:px-8 lg:px-12 overflow-hidden">
        <VideoBackground />
        <div className="relative z-10 text-center max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-oswald text-white mb-6">
            About <span className="text-[#19f7ea]">SF Playground</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 font-oswald max-w-3xl mx-auto">
            An SF-based platform for live startup pitches and real investor
            decisions.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="px-4 md:px-8 lg:px-12 py-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-oswald text-white mb-6">
                Our <span className="text-[#19f7ea]">Mission</span>
              </h2>
              <p className="text-white/80 text-lg font-oswald leading-relaxed mb-6">
                We believe that great startups deserve real opportunities. Too
                many founders spend months trying to get in front of investors,
                only to receive generic feedback or no response at all.
              </p>
              <p className="text-white/80 text-lg font-oswald leading-relaxed mb-6">
                SF Playground changes that. We create an environment where
                startups can pitch live to active VCs who make real decisions.
                No waiting. No gatekeeping. Just real capital and real feedback.
              </p>
              <p className="text-white/80 text-lg font-oswald leading-relaxed">
                We're building the future of startup fundraising — one live
                pitch at a time.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden border border-white/20">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop"
                alt="Team collaboration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {/* <div className="px-4 md:px-8 lg:px-12 py-16 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center border border-white/20 rounded-lg p-6 hover:border-[#19f7ea] transition-colors"
              >
                <div className="text-4xl md:text-5xl font-oswald text-[#19f7ea] mb-2">
                  {stat.number}
                </div>
                <div className="text-white/70 font-oswald text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* How It Works Section */}
      <div className="px-4 md:px-8 lg:px-12 py-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-oswald text-white mb-12 text-center">
            How It <span className="text-[#19f7ea]">Works</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-white/20 rounded-lg p-8 hover:border-[#19f7ea] transition-colors">
              <div className="text-5xl font-oswald text-[#19f7ea] mb-4">01</div>
              <h3 className="text-2xl font-oswald text-white mb-4">
                Get on the list
              </h3>
              <p className="text-white/70 font-oswald leading-relaxed">
                Fill out our signup form. Our team reviews each application to
                ensure quality and fit for our events.
              </p>
            </div>
            <div className="border border-white/20 rounded-lg p-8 hover:border-[#19f7ea] transition-colors">
              <div className="text-5xl font-oswald text-[#19f7ea] mb-4">02</div>
              <h3 className="text-2xl font-oswald text-white mb-4">
                Demo Live
              </h3>
              <p className="text-white/70 font-oswald leading-relaxed">
                Demo your product in front of investors and builders who will
                vote for their favorite startupa live audience of VCs, founders,
                and industry experts. Get real-time feedback and questions.
              </p>
            </div>
            <div className="border border-white/20 rounded-lg p-8 hover:border-[#19f7ea] transition-colors">
              <div className="text-5xl font-oswald text-[#19f7ea] mb-4">03</div>
              <h3 className="text-2xl font-oswald text-white mb-4">
                Get Results
              </h3>
              <p className="text-white/70 font-oswald leading-relaxed">
                Receive immediate feedback, make connections, and potentially
                secure funding from investors who are ready to deploy capital.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="px-4 md:px-8 lg:px-12 py-16 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-oswald text-white mb-12 text-center">
            Our <span className="text-[#19f7ea]">Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="border border-white/20 rounded-lg p-6 hover:border-[#19f7ea] transition-colors"
              >
                <div className="text-[#19f7ea] mb-4">{value.icon}</div>
                <h3 className="text-xl font-oswald text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-white/70 font-oswald text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What We Do Section */}
      <div className="px-4 md:px-8 lg:px-12 py-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden border border-white/20 order-2 lg:order-1">
              <Image
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop"
                alt="Pitch event"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-oswald text-white mb-6">
                What We <span className="text-[#19f7ea]">Do</span>
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-oswald text-[#19f7ea] mb-2">
                    Live Pitch Events
                  </h3>
                  <p className="text-white/80 font-oswald leading-relaxed">
                    We host curated pitch events where startups present to a
                    live audience of active VCs and investors. Every pitch gets
                    real-time feedback and real decisions.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-oswald text-[#19f7ea] mb-2">
                    VC Feedback
                  </h3>
                  <p className="text-white/80 font-oswald leading-relaxed">
                    Our investors don't just watch — they engage. You'll receive
                    direct insights, tough questions, and honest feedback from
                    people who actually deploy capital.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-oswald text-[#19f7ea] mb-2">
                    Networking & Connections
                  </h3>
                  <p className="text-white/80 font-oswald leading-relaxed">
                    Connect with top-tier investors, experienced founders, and
                    industry leaders. Build relationships that matter for your
                    startup's journey.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-oswald text-[#19f7ea] mb-2">
                    Real Capital Opportunities
                  </h3>
                  <p className="text-white/80 font-oswald leading-relaxed">
                    Many of our startups have secured funding directly through
                    connections made at our events. We facilitate real
                    opportunities, not just exposure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 md:px-8 lg:px-12 py-16 bg-black border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-oswald text-white mb-6">
            Ready to <span className="text-[#19f7ea]">Join Us?</span>
          </h2>
          <p className="text-white/70 text-lg md:text-xl font-oswald mb-8 max-w-2xl mx-auto">
            Whether you're a startup looking to pitch or an investor interested
            in discovering the next big thing, we'd love to have you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={SIGNUP_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#19f7ea] text-black px-8 py-3 rounded-md text-lg flex items-center justify-center gap-2 hover:bg-white transition-colors duration-300 font-oswald font-bold"
            >
              Get on the list <ArrowRightIcon className="w-5 h-5" />
            </a>
            <Link
              href="/success-stories"
              className="border-2 border-white text-white px-8 py-3 rounded-md text-lg hover:bg-white hover:text-black transition-all duration-300 font-oswald"
            >
              View Success Stories
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
