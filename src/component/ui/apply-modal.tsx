"use client";
import React, { useEffect, useState } from "react";
import { X, Loader2, CheckCircle2 } from "lucide-react";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplyModal = ({ isOpen, onClose }: ApplyModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Reset form state when modal opens
      setSubmitStatus("idle");
      setErrorMessage("");
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      founderName: formData.get("founderName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      startupName: formData.get("startupName") as string,
      stage: formData.get("stage") as string,
      industry: formData.get("industry") as string,
      description: formData.get("description") as string,
      website: formData.get("website") as string,
    };

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        // Reset form
        e.currentTarget.reset();
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setSubmitStatus("idle");
        }, 2000);
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || "Failed to submit application. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            Apply to <span className="text-[#19f7ea]">Pitch</span>
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
                    name="founderName"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-[#19f7ea] transition-colors font-oswald text-sm"
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
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-[#19f7ea] transition-colors font-oswald text-sm"
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
                  name="phone"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-[#19f7ea] transition-colors font-oswald text-sm"
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
                  name="startupName"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-[#19f7ea] transition-colors font-oswald text-sm"
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
                    name="stage"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-[#19f7ea] transition-colors font-oswald text-sm"
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
                    name="industry"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-[#19f7ea] transition-colors font-oswald text-sm"
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
                  name="website"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-[#19f7ea] transition-colors font-oswald text-sm"
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
                  name="description"
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-[#19f7ea] transition-colors font-oswald resize-none text-sm"
                  placeholder="Tell us about your startup and what makes it unique. What problem are you solving? Who is your target market? What makes your solution different?"
                />
              </div>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="flex items-center gap-2 text-green-400 text-sm font-oswald pt-4 border-t border-white/20">
                <CheckCircle2 className="w-5 h-5" />
                <span>Application submitted successfully! You'll receive a confirmation email shortly.</span>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="text-red-400 text-sm font-oswald pt-4 border-t border-white/20">
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/20">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 border border-white/20 text-white rounded-md hover:bg-white/10 transition-colors font-oswald disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-[#19f7ea] text-black rounded-md hover:bg-[#19f7ea]/90 transition-colors font-oswald font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;

