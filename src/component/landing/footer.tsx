import React from "react";
import Link from "next/link";
import { LinkedinIcon, InstagramIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 px-4 md:px-8 lg:px-12 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-oswald font-bold text-[#00d5ff] mb-4">
              SF<span className="text-white">PLAYGROUND</span>
            </h2>
            <p className="text-white/50 text-sm mb-4">
              Where startups get tested by real capital. Live pitches, real
              decisions.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.linkedin.com/company/sfplayground"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-[#00d5ff] transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.instagram.com/sfplayground/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-[#00d5ff] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-oswald font-bold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-white/50 hover:text-[#00d5ff] transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/50 hover:text-[#00d5ff] transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/success-stories"
                  className="text-white/50 hover:text-[#00d5ff] transition-colors text-sm"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/#events"
                  className="text-white/50 hover:text-[#00d5ff] transition-colors text-sm"
                >
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* For Founders */}
          <div>
            <h3 className="text-white font-oswald font-bold mb-4">
              For Founders
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#apply"
                  className="text-white/50 hover:text-[#00d5ff] transition-colors text-sm"
                >
                  Apply to Pitch
                </Link>
              </li>
              <li>
                <Link
                  href="/success-stories"
                  className="text-white/50 hover:text-[#00d5ff] transition-colors text-sm"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/50 hover:text-[#00d5ff] transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-white/50 hover:text-[#00d5ff] transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-oswald font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-white/50 text-sm">
              <li>San Francisco, CA</li>
              <li>hello@sfplayground.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <p className="text-white/40 text-sm">
              © 2025 SF Playground. All rights reserved.
            </p>
            <p className="text-white/30 text-xs">
              Built by{" "}
              <Link
                href="https://www.theempowerweb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-[#00d5ff] transition-colors font-oswald"
              >
                Empower
              </Link>
            </p>
          </div>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-white/40 hover:text-white transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-white/40 hover:text-white transition-colors text-sm"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
