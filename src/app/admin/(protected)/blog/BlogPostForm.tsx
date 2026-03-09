"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Wand2, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import type { BlogPost } from "@/lib/db";
import { convertGoogleDriveImageUrl } from "@/utils/convertDriveImageUrl";

function slugFromTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function BlogPostForm({ post }: { post?: BlogPost }) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [imageUrl, setImageUrl] = useState(post?.image_url ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [excerptOpen, setExcerptOpen] = useState(!!post?.excerpt);

  const [aiOpen, setAiOpen] = useState(false);
  const [aiStartingPoint, setAiStartingPoint] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!post && title && !slug) setSlug(slugFromTitle(title));
  }, [title, post, slug]);

  const [submitAction, setSubmitAction] = useState<"save" | "publish" | "unpublish">("save");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const action =
      (e.nativeEvent as SubmitEvent).submitter?.getAttribute("value") ?? submitAction;
    setError(null);
    setSaving(true);
    try {
      const url = post ? `/api/admin/blog/${post.id}` : "/api/admin/blog";
      const method = post ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
          excerpt: excerpt.trim() || null,
          image_url: imageUrl.trim() ? convertGoogleDriveImageUrl(imageUrl.trim()) : null,
          body: body.trim(),
          publish: action === "unpublish" ? false : action === "publish",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save");
      }
      if (action === "unpublish") {
        router.refresh();
      } else {
        router.push("/admin/blog");
        router.refresh();
      }
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
        body: JSON.stringify({ type: "blog", startingPoint: point }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Draft failed");
      if (data.title) setTitle(data.title);
      if (data.slug) setSlug(data.slug);
      if (data.excerpt) {
        setExcerpt(data.excerpt);
        setExcerptOpen(true);
      }
      if (data.body) setBody(data.body);
      setAiOpen(false);
      setAiStartingPoint("");
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "Could not generate draft");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      {error && (
        <p className="text-red-400 text-sm font-oswald mb-4">{error}</p>
      )}

      {/* AI draft */}
      <div className="rounded-xl border border-white/15 bg-white/5 overflow-hidden transition-all duration-200 mb-8">
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
              Give a starting point—topic, angle, or outline—and we’ll draft the post.
            </p>
            <textarea
              value={aiStartingPoint}
              onChange={(e) => setAiStartingPoint(e.target.value)}
              placeholder="e.g. Why we moved our meetup to the new venue, and what’s coming next"
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

      {/* Editor surface */}
      <div className="rounded-xl border border-white/15 bg-white/[0.06] overflow-hidden">
        <div className="px-5 pt-6 pb-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-transparent text-2xl font-oswald font-bold text-white placeholder-white/40 focus:outline-none border-none p-0"
            placeholder="Title"
          />
          <p className="mt-1.5 text-white/50 font-mono text-sm">
            /blog/
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="bg-transparent border-none p-0 w-48 focus:outline-none focus:text-white/80 text-white/70 font-mono"
              placeholder="url-slug"
            />
          </p>
          <div className="mt-4">
            <label className="block text-white/50 font-oswald text-sm mb-1.5">
              Featured image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              onBlur={(e) => {
                const v = e.target.value.trim();
                if (v && v.includes("drive.google.com")) {
                  setImageUrl(convertGoogleDriveImageUrl(v));
                }
              }}
              placeholder="https://... (Drive links auto-convert)"
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-[#19f7ea] text-sm"
            />
          </div>
        </div>

        <div className="px-5 pb-5">
          <label className="block text-white/50 font-oswald text-sm mb-2">
            Body (Markdown)
          </label>
          <textarea
            ref={bodyRef}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={18}
            className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none border-none p-0 resize-y font-mono text-[14px] leading-relaxed min-h-[320px]"
            placeholder="# Heading&#10;&#10;Use **bold**, *italic*, lists, [links](url), and more.&#10;&#10;```&#10;code block&#10;```"
          />
          <p className="mt-2 text-white/40 text-xs font-oswald">
            Supports Markdown: **bold**, *italic*, headings, lists, links, code, blockquotes, images.
          </p>
        </div>

        {/* Excerpt */}
        <div className="border-t border-white/10">
          <button
            type="button"
            onClick={() => setExcerptOpen((o) => !o)}
            className="w-full flex items-center gap-2 px-5 py-3 text-left text-white/60 hover:text-white/80 text-sm font-oswald transition-colors"
          >
            {excerptOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            Excerpt (optional)
          </button>
          {excerptOpen && (
            <div className="px-5 pb-4">
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-[#19f7ea] resize-none text-sm"
                placeholder="Short summary for listings"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        <button
          type="submit"
          value="save"
          disabled={saving}
          onClick={() => setSubmitAction("save")}
          className="px-4 py-2 rounded-lg border border-white/20 text-white font-oswald hover:bg-white/10 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save draft"}
        </button>
        <button
          type="submit"
          value="publish"
          disabled={saving}
          onClick={() => setSubmitAction("publish")}
          className="px-4 py-2 rounded-lg bg-[#19f7ea] text-black font-oswald font-bold hover:bg-white disabled:opacity-50"
        >
          {saving ? "Saving…" : "Publish"}
        </button>
        {post?.published_at && (
          <button
            type="submit"
            value="unpublish"
            disabled={saving}
            onClick={() => setSubmitAction("unpublish")}
            className="px-4 py-2 rounded-lg border border-amber-500/50 text-amber-400 font-oswald hover:bg-amber-500/10 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Revert to draft"}
          </button>
        )}
      </div>
    </form>
  );
}
