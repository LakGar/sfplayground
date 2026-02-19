"use client";
import React, { useEffect, useState } from "react";
import { X, Loader2, CheckCircle2, SendIcon } from "lucide-react";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterModal = ({ isOpen, onClose }: NewsletterModalProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Reset form state when modal opens
      setSubmitStatus("idle");
      setErrorMessage("");
      setEmail("");
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

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        setEmail("");
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setSubmitStatus("idle");
        }, 2000);
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || "Failed to subscribe. Please try again.");
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
        className="relative bg-black border border-white/20 rounded-lg w-full max-w-md"
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
        <div className="p-8">
          <h2 className="text-3xl md:text-4xl font-oswald text-white mb-2">
            Stay in the <span className="text-[#00d5ff]">Loop</span>
          </h2>
          <p className="text-white/70 mb-8 font-oswald text-sm md:text-base">
            Get exclusive updates on upcoming events, featured startups, and
            investor insights delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="newsletter-email"
                className="block text-white/90 font-oswald mb-2 text-sm"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="newsletter-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-[#00d5ff] transition-colors font-oswald text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="your@email.com"
              />
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="flex items-center gap-2 text-green-400 text-sm font-oswald">
                <CheckCircle2 className="w-5 h-5" />
                <span>Successfully subscribed! Check your email for a welcome message.</span>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="text-red-400 text-sm font-oswald">
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
                className="flex-1 px-6 py-3 bg-[#00d5ff] text-black rounded-md hover:bg-[#00d5ff]/90 transition-colors font-oswald font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <SendIcon className="w-4 h-4" />
                    Subscribe
                  </>
                )}
              </button>
            </div>
            <p className="text-white/40 text-xs text-center font-oswald">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;

