import Link from "next/link";
import Nav from "@/component/landing-main/nav";
import Footer from "@/component/landing-main/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SF Playground",
  description:
    "Privacy Policy for SF Playground - how we collect, use, and protect your information.",
  alternates: {
    canonical: "https://sfplayground.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | SF Playground",
    url: "https://sfplayground.com/privacy",
  },
};

export default function PrivacyPage() {
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
            Privacy <span className="text-white/85">Policy</span>
          </h1>
          <p className="mb-12 text-sm text-white/50">
            Last updated: February 2026
          </p>

          <div className="space-y-10 leading-relaxed text-white/80">
            <section>
              <h2 className="mb-3 text-xl font-semibold text-white">
                1. Introduction
              </h2>
              <p>
                SF Playground (“we,” “us,” “our”) respects your privacy. This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you use our website
                (sfplayground.com) and related services, including event
                sign-ups, newsletter subscriptions, and pitch applications.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-white">
                2. Information We Collect
              </h2>
              <p className="mb-3">We may collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-white">Contact and account info:</strong>{" "}
                  Name, email address, and other details you provide when
                  signing up for events, subscribing to our newsletter, or
                  submitting a pitch application.
                </li>
                <li>
                  <strong className="text-white">Usage data:</strong> IP address,
                  browser type, device information, and how you use our site (e.g.,
                  pages visited), including via cookies and similar technologies.
                </li>
                <li>
                  <strong className="text-white">Communications:</strong> Records
                  of emails or other messages you send to us.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-white">
                3. How We Use Your Information
              </h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, operate, and improve our Services</li>
                <li>Process event registrations and applications</li>
                <li>Send newsletters and event-related communications (with your consent where required)</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Analyze usage and trends to improve the site</li>
                <li>Comply with legal obligations and protect our rights</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-white">
                4. Sharing of Information
              </h2>
              <p>
                We may share your information with service providers who assist
                us (e.g., hosting, email delivery, analytics), with event
                partners where relevant to an event you signed up for, or when
                required by law or to protect our rights. We do not sell your
                personal information to third parties for their marketing.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-white">
                5. Cookies and Tracking
              </h2>
              <p>
                We and our service providers may use cookies and similar
                technologies to remember preferences, analyze traffic, and
                improve the site. You can adjust your browser settings to limit
                or block cookies, though some features may not work as intended.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-white">
                6. Data Retention
              </h2>
              <p>
                We retain your information for as long as needed to provide the
                Services, comply with legal obligations, resolve disputes, and
                enforce our agreements. You may request deletion of your data
                subject to applicable law.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-white">
                7. Security
              </h2>
              <p>
                We use reasonable technical and organizational measures to
                protect your information. No method of transmission or storage
                is 100% secure; we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-white">
                8. Your Rights
              </h2>
              <p>
                Depending on where you live, you may have rights to access,
                correct, delete, or port your data, or to object to or restrict
                certain processing. To exercise these rights or opt out of
                marketing emails, contact us at{" "}
                <a
                  href="mailto:hello@sfplayground.com"
                  className="text-white/90 hover:underline"
                >
                  hello@sfplayground.com
                </a>
                . California residents may have additional rights under the CCPA.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-white">
                9. Children
              </h2>
              <p>
                Our Services are not directed to individuals under 18. We do not
                knowingly collect personal information from children. If you
                believe we have collected such information, please contact us so
                we can delete it.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-white">
                10. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will post
                the updated version on this page and update the “Last updated”
                date. Continued use of the Services after changes constitutes
                acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-white">
                11. Contact Us
              </h2>
              <p>
                For questions about this Privacy Policy or our practices, contact
                us at{" "}
                <a
                  href="mailto:hello@sfplayground.com"
                  className="text-white/90 hover:underline"
                >
                  hello@sfplayground.com
                </a>
                . SF Playground is based in San Francisco, California, USA.
              </p>
            </section>
          </div>

          <p className="mt-12 text-sm text-white/40">
            This policy is provided for general information. Consider having it
            reviewed by a legal or privacy professional for your situation.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
