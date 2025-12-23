"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplyModal = ({ isOpen, onClose }: ApplyModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-black border border-white/20 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-oswald text-white mb-2">
            Apply to <span className="text-[#feca00]">Pitch</span>
          </h2>
          <p className="text-white/70 mb-8 font-oswald text-sm md:text-base">
            Submit your startup to pitch live and receive real-time feedback
            from investors who deploy capital.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-oswald text-white border-b border-white/20 pb-2">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="founderName"
                    className="block text-white/90 font-oswald mb-2 text-sm"
                  >
                    Founder Name *
                  </label>
                  <input
                    type="text"
                    id="founderName"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-[#feca00] transition-colors font-oswald text-sm"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-white/90 font-oswald mb-2 text-sm"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-[#feca00] transition-colors font-oswald text-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-white/90 font-oswald mb-2 text-sm"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-[#feca00] transition-colors font-oswald text-sm"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            {/* Startup Information Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-oswald text-white border-b border-white/20 pb-2">
                Startup Information
              </h3>
              <div>
                <label
                  htmlFor="startupName"
                  className="block text-white/90 font-oswald mb-2 text-sm"
                >
                  Startup Name *
                </label>
                <input
                  type="text"
                  id="startupName"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-[#feca00] transition-colors font-oswald text-sm"
                  placeholder="Enter your startup name"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="stage"
                    className="block text-white/90 font-oswald mb-2 text-sm"
                  >
                    Funding Stage *
                  </label>
                  <select
                    id="stage"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-[#feca00] transition-colors font-oswald text-sm"
                  >
                    <option value="">Select funding stage</option>
                    <option value="pre-seed">Pre-Seed</option>
                    <option value="seed">Seed</option>
                    <option value="series-a">Series A</option>
                    <option value="series-b">Series B</option>
                    <option value="later">Series C+</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="industry"
                    className="block text-white/90 font-oswald mb-2 text-sm"
                  >
                    Industry *
                  </label>
                  <input
                    type="text"
                    id="industry"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-[#feca00] transition-colors font-oswald text-sm"
                    placeholder="e.g., AI, SaaS, FinTech"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="website"
                  className="block text-white/90 font-oswald mb-2 text-sm"
                >
                  Website / Demo Link
                </label>
                <input
                  type="url"
                  id="website"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-[#feca00] transition-colors font-oswald text-sm"
                  placeholder="https://yourstartup.com"
                />
              </div>
            </div>

            {/* Pitch Description Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-oswald text-white border-b border-white/20 pb-2">
                Your Pitch
              </h3>
              <div>
                <label
                  htmlFor="description"
                  className="block text-white/90 font-oswald mb-2 text-sm"
                >
                  Pitch Description *
                </label>
                <textarea
                  id="description"
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-[#feca00] transition-colors font-oswald resize-none text-sm"
                  placeholder="Tell us about your startup and what makes it unique. What problem are you solving? Who is your target market? What makes your solution different?"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/20">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-white/20 text-white rounded-md hover:bg-white/10 transition-colors font-oswald"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-[#feca00] text-black rounded-md hover:bg-[#feca00]/90 transition-colors font-oswald font-bold"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;

