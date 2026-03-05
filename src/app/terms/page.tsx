import Link from "next/link";
import Nav from "@/component/landing/nav";
import Footer from "@/component/landing/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | SF Playground",
  description:
    "Terms of Service for SF Playground - live startup pitch events and real investor decisions in San Francisco.",
  alternates: {
    canonical: "https://sfplayground.com/terms",
  },
  openGraph: {
    title: "Terms of Service | SF Playground",
    url: "https://sfplayground.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="relative overflow-x-hidden bg-black min-h-screen">
      <Nav />

      <div className="pt-24 pb-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#19f7ea] font-oswald text-sm mb-8 transition-colors"
          >
            ← Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-oswald text-white mb-2">
            Terms of <span className="text-[#19f7ea]">Service</span>
          </h1>
          <p className="text-white/50 font-oswald text-sm mb-12">
            Last updated: February 2026
          </p>

          <div className="space-y-10 text-white/80 font-oswald leading-relaxed">
            <section>
              <h2 className="text-xl font-oswald font-bold text-white mb-3">
                1. Agreement to Terms
              </h2>
              <p>
                By accessing or using the SF Playground website and services
                (“Services”), you agree to be bound by these Terms of Service.
                If you do not agree, do not use our Services. We may update
                these terms from time to time; continued use after changes
                constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-oswald font-bold text-white mb-3">
                2. Description of Services
              </h2>
              <p>
                SF Playground operates live startup pitch events and related
                activities in the San Francisco Bay Area. Our Services include
                event information, registration and sign-up flows, newsletter
                communications, success stories, and other content we provide.
                We do not guarantee placement at any event or any investment
                outcome.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-oswald font-bold text-white mb-3">
                3. Eligibility and Conduct
              </h2>
              <p>
                You must be at least 18 years old and able to form a binding
                contract to use our Services. You agree to provide accurate
                information and to use the Services only for lawful purposes.
                You may not misuse the site, harass others, or attempt to gain
                unauthorized access to our systems or data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-oswald font-bold text-white mb-3">
                4. Events and Applications
              </h2>
              <p>
                Signing up for events or submitting applications does not
                guarantee participation. We and our partners reserve the right
                to accept or decline registrations. Event details (date, time,
                location, format) may change; we will use reasonable efforts to
                notify registered participants.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-oswald font-bold text-white mb-3">
                5. Intellectual Property
              </h2>
              <p>
                The SF Playground name, logo, and site content are owned by SF
                Playground or our licensors. You may not copy, modify, or
                distribute our content without permission. You retain ownership
                of content you submit (e.g., application materials), but you
                grant us a license to use it in connection with operating the
                Services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-oswald font-bold text-white mb-3">
                6. Disclaimers
              </h2>
              <p>
                Our Services are provided “as is.” We do not warrant that the
                site will be error-free or uninterrupted. We are not responsible
                for investment decisions, outcomes at events, or the conduct of
                third parties (including investors or other participants).
                Nothing on the site constitutes legal, financial, or investment
                advice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-oswald font-bold text-white mb-3">
                7. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, SF Playground and its
                affiliates shall not be liable for any indirect, incidental,
                special, or consequential damages arising from your use of the
                Services. Our total liability shall not exceed the amount you
                paid to us, if any, in the twelve months prior to the claim.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-oswald font-bold text-white mb-3">
                8. Indemnification
              </h2>
              <p>
                You agree to indemnify and hold harmless SF Playground and its
                officers, directors, and agents from any claims, damages, or
                expenses (including legal fees) arising from your use of the
                Services or your violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-oswald font-bold text-white mb-3">
                9. Governing Law
              </h2>
              <p>
                These terms are governed by the laws of the State of California,
                without regard to conflict of law principles. Any disputes shall
                be resolved in the courts located in San Francisco County,
                California.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-oswald font-bold text-white mb-3">
                10. Contact
              </h2>
              <p>
                Questions about these Terms of Service may be sent to{" "}
                <a
                  href="mailto:hello@sfplayground.com"
                  className="text-[#19f7ea] hover:underline"
                >
                  hello@sfplayground.com
                </a>
                .
              </p>
            </section>
          </div>

          <p className="mt-12 text-white/40 text-sm font-oswald">
            This is a summary for convenience. We recommend having these terms
            reviewed by your own legal advisor.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
