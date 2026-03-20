"use client";
import React, { useEffect, useState } from "react";
import { X, Loader2, CheckCircle2, SendIcon } from "lucide-react";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterModal = ({ isOpen, onClose }: NewsletterModalProps) => {
  const [name, setName] = useState("");
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
      setName("");
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
        body: JSON.stringify({ email, name: name.trim() || null }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        setName("");
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
    } catch {
      setSubmitStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
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
          <h2 className="mb-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Stay in the <span className="text-white/85">Loop</span>
          </h2>
          <p className="mb-8 text-sm text-white/70 md:text-base">
            Get exclusive updates on upcoming events, featured startups, and
            investor insights delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="newsletter-name"
                className="mb-2 block text-sm text-white/90"
              >
                Name (optional)
              </label>
              <input
                type="text"
                id="newsletter-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
                className="w-full rounded-md border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 transition-colors focus:border-white/45 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="newsletter-email"
                className="mb-2 block text-sm text-white/90"
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
                className="w-full rounded-md border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 transition-colors focus:border-white/45 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="your@email.com"
              />
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="flex items-center gap-2 text-sm text-green-400">
                <CheckCircle2 className="w-5 h-5" />
                <span>Successfully subscribed! Check your email for a welcome message.</span>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="text-sm text-red-400">
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/20">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 rounded-md border border-white/20 px-6 py-3 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex flex-1 items-center justify-center gap-2 rounded-md bg-white px-6 py-3 font-semibold text-black transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
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
            <p className="text-center text-xs text-white/40">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;

