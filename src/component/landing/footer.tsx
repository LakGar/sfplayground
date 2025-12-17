import React from "react";
import Link from "next/link";
import { TwitterIcon, LinkedinIcon, InstagramIcon, YoutubeIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 px-4 md:px-8 lg:px-12 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-oswald font-bold text-[#feca00] mb-4">
              SF<span className="text-white">PLAYGROUND</span>
            </h2>
            <p className="text-white/50 text-sm mb-4">
              Where startups get tested by real capital. Live pitches, real
              decisions.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-white/50 hover:text-[#feca00] transition-colors"
              >
                <TwitterIcon className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-white/50 hover:text-[#feca00] transition-colors"
              >
                <LinkedinIcon className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-white/50 hover:text-[#feca00] transition-colors"
              >
                <InstagramIcon className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-white/50 hover:text-[#feca00] transition-colors"
              >
                <YoutubeIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-oswald font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-white/50 hover:text-[#feca00] transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/50 hover:text-[#feca00] transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/50 hover:text-[#feca00] transition-colors text-sm"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/50 hover:text-[#feca00] transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* For Founders */}
          <div>
            <h3 className="text-white font-oswald font-bold mb-4">For Founders</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-white/50 hover:text-[#feca00] transition-colors text-sm"
                >
                  Apply to Pitch
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/50 hover:text-[#feca00] transition-colors text-sm"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/50 hover:text-[#feca00] transition-colors text-sm"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/50 hover:text-[#feca00] transition-colors text-sm"
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
              <li>+1 (415) 555-0123</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2025 SF Playground. All rights reserved.
          </p>
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

