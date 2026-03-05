"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { Wand2, Loader2 } from "lucide-react";
import type { NewsletterDraft } from "@/lib/db";

export function NewsletterDraftForm({ draft }: { draft?: NewsletterDraft }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiStartingPoint, setAiStartingPoint] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const subject = formData.get("subject") as string;
    const body_html = formData.get("body_html") as string;

    try {
      const url = draft
        ? `/api/admin/newsletters/${draft.id}`
        : "/api/admin/newsletters";
      const method = draft ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, body_html }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save");
      }
      router.push("/admin/newsletters");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleAiDraft = async () => {
    const point = aiStartingPoint.trim();
    if (!point) return;
    setAiError(null);
    setAiLoading(true);
    try {
      const res = await fetch("/api/admin/ai/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "newsletter", startingPoint: point }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Draft failed");
      if (data.subject && subjectRef.current) {
        subjectRef.current.value = data.subject;
      }
      if (data.body_html && bodyRef.current) {
        bodyRef.current.value = data.body_html;
      }
      setAiOpen(false);
      setAiStartingPoint("");
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "Could not generate draft");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <p className="text-red-400 text-sm font-oswald">{error}</p>
      )}

      <div className="rounded-xl border border-white/15 bg-white/5 overflow-hidden transition-all duration-200">
        <button
          type="button"
          onClick={() => setAiOpen((o) => !o)}
          className="w-full flex items-center gap-3 px-4 py-3 text-left text-white/90 hover:bg-white/5 transition-colors"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#19f7ea]/15 text-[#19f7ea]">
            <Wand2 className="w-4 h-4" strokeWidth={2} />
          </span>
          <span className="font-oswald text-sm font-medium">
            Draft with AI
          </span>
          <span className="ml-auto text-white/50 text-sm">
            {aiOpen ? "Collapse" : "Expand"}
          </span>
        </button>
        {aiOpen && (
          <div className="px-4 pb-4 pt-0 border-t border-white/10 space-y-3">
            <p className="text-white/70 text-sm font-oswald pt-3">
              Give a starting point—topic, key points, or a rough idea—and we’ll draft the subject and body.
            </p>
            <textarea
              value={aiStartingPoint}
              onChange={(e) => setAiStartingPoint(e.target.value)}
              placeholder="e.g. Recap of last week’s meetup, highlight the new venue and upcoming speaker night"
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-[#19f7ea] resize-y text-sm"
              disabled={aiLoading}
            />
            {aiError && (
              <p className="text-red-400/90 text-sm font-oswald">{aiError}</p>
            )}
            <button
              type="button"
              onClick={handleAiDraft}
              disabled={aiLoading || !aiStartingPoint.trim()}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#19f7ea]/20 text-[#19f7ea] font-oswald text-sm font-medium hover:bg-[#19f7ea]/30 disabled:opacity-50 transition-colors"
            >
              {aiLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating…
                </>
              ) : (
                "Generate draft"
              )}
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-white/80 font-oswald text-sm mb-1">
          Subject
        </label>
        <input
          ref={subjectRef}
          type="text"
          name="subject"
          defaultValue={draft?.subject}
          required
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-[#19f7ea]"
          placeholder="Newsletter subject"
        />
      </div>
      <div>
        <label className="block text-white/80 font-oswald text-sm mb-1">
          Body (HTML)
        </label>
        <textarea
          ref={bodyRef}
          name="body_html"
          defaultValue={draft?.body_html}
          required
          rows={16}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-[#19f7ea] resize-y font-mono text-sm"
          placeholder="<p>Hello...</p>"
        />
      </div>
      <button
        type="submit"
        disabled={saving}
        className="px-4 py-2 rounded-lg bg-[#19f7ea] text-black font-oswald font-bold hover:bg-white disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save draft"}
      </button>
    </form>
  );
}
