import Link from "next/link";
import Nav from "@/component/landing-main/nav";
import Footer from "@/component/landing-main/footer";
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
    <div className="relative min-h-screen overflow-x-clip bg-black text-white">
      <Nav />

      <div className="px-4 pb-16 pt-28 md:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            ← Back to Home
          </Link>

          <h1 className="mb-2 font-oswald text-4xl text-white md:text-5xl">
            Terms of <span className="text-white/85">Service</span>
          </h1>
          <p className="mb-12 text-sm text-white/50">
            Last updated: February 2026
          </p>

          <div className="space-y-10 leading-relaxed text-white/80">
            <section>
              <h2 className="mb-3 text-xl font-semibold text-white">
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
              <h2 className="mb-3 text-xl font-semibold text-white">
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
              <h2 className="mb-3 text-xl font-semibold text-white">
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
              <h2 className="mb-3 text-xl font-semibold text-white">
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
              <h2 className="mb-3 text-xl font-semibold text-white">
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
              <h2 className="mb-3 text-xl font-semibold text-white">
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
              <h2 className="mb-3 text-xl font-semibold text-white">
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
              <h2 className="mb-3 text-xl font-semibold text-white">
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
              <h2 className="mb-3 text-xl font-semibold text-white">
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
              <h2 className="mb-3 text-xl font-semibold text-white">
                10. Contact
              </h2>
              <p>
                Questions about these Terms of Service may be sent to{" "}
                <a
                  href="mailto:hello@sfplayground.com"
                  className="text-white/90 hover:underline"
                >
                  hello@sfplayground.com
                </a>
                .
              </p>
            </section>
          </div>

          <p className="mt-12 text-sm text-white/40">
            This is a summary for convenience. We recommend having these terms
            reviewed by your own legal advisor.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
