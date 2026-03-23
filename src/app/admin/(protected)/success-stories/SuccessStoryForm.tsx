"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import type { SuccessStoryRow } from "@/lib/db";

function linesToArray(s: string): string[] {
  return s
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);
}

export function SuccessStoryForm({ story }: { story?: SuccessStoryRow }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      slug: (formData.get("slug") as string).trim().toLowerCase().replace(/\s+/g, "-"),
      title: formData.get("title") as string,
      tagline: (formData.get("tagline") as string) || null,
      description: formData.get("description") as string,
      image: (formData.get("image") as string) || null,
      challenge: (formData.get("challenge") as string) || null,
      challenge_points: linesToArray((formData.get("challenge_points") as string) || ""),
      our_role: (formData.get("our_role") as string) || null,
      role_points: linesToArray((formData.get("role_points") as string) || ""),
      experience: (formData.get("experience") as string) || null,
      impact: (formData.get("impact") as string) || null,
      impact_points: linesToArray((formData.get("impact_points") as string) || ""),
      founder_quote: (formData.get("founder_quote") as string) || null,
      attendee_quote: (formData.get("attendee_quote") as string) || null,
      founder_quote2: (formData.get("founder_quote2") as string) || null,
      why_matters: (formData.get("why_matters") as string) || null,
    };

    try {
      const url = story
        ? `/api/admin/success-stories/${story.id}`
        : "/api/admin/success-stories";
      const method = story ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save");
      }
      router.push("/admin/success-stories");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-slate-300";
  const textareaClass = inputClass + " resize-y";
  const labelClass = "block text-white/80 font-oswald text-sm mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      {error && (
        <p className="text-red-400 text-sm font-oswald">{error}</p>
      )}
      <div>
        <label className={labelClass}>Slug (URL path)</label>
        <input
          type="text"
          name="slug"
          defaultValue={story?.slug}
          required
          className={inputClass + " font-mono text-sm"}
          placeholder="my-story-slug"
        />
      </div>
      <div>
        <label className={labelClass}>Title</label>
        <input
          type="text"
          name="title"
          defaultValue={story?.title}
          required
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Tagline</label>
        <input
          type="text"
          name="tagline"
          defaultValue={story?.tagline ?? ""}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Description</label>
        <textarea
          name="description"
          defaultValue={story?.description ?? ""}
          required
          rows={3}
          className={textareaClass}
        />
      </div>
      <div>
        <label className={labelClass}>Image URL</label>
        <input
          type="text"
          name="image"
          defaultValue={story?.image ?? ""}
          className={inputClass}
          placeholder="https://... or /images/..."
        />
      </div>
      <div>
        <label className={labelClass}>Challenge (intro paragraph)</label>
        <textarea
          name="challenge"
          defaultValue={story?.challenge ?? ""}
          rows={2}
          className={textareaClass}
        />
      </div>
      <div>
        <label className={labelClass}>Challenge points (one per line)</label>
        <textarea
          name="challenge_points"
          defaultValue={story?.challenge_points?.join("\n") ?? ""}
          rows={4}
          className={textareaClass + " font-mono text-sm"}
        />
      </div>
      <div>
        <label className={labelClass}>Our role (intro paragraph)</label>
        <textarea
          name="our_role"
          defaultValue={story?.our_role ?? ""}
          rows={2}
          className={textareaClass}
        />
      </div>
      <div>
        <label className={labelClass}>Role points (one per line)</label>
        <textarea
          name="role_points"
          defaultValue={story?.role_points?.join("\n") ?? ""}
          rows={4}
          className={textareaClass + " font-mono text-sm"}
        />
      </div>
      <div>
        <label className={labelClass}>Experience</label>
        <textarea
          name="experience"
          defaultValue={story?.experience ?? ""}
          rows={5}
          className={textareaClass}
        />
      </div>
      <div>
        <label className={labelClass}>Impact (intro paragraph)</label>
        <textarea
          name="impact"
          defaultValue={story?.impact ?? ""}
          rows={2}
          className={textareaClass}
        />
      </div>
      <div>
        <label className={labelClass}>Impact points (one per line)</label>
        <textarea
          name="impact_points"
          defaultValue={story?.impact_points?.join("\n") ?? ""}
          rows={4}
          className={textareaClass + " font-mono text-sm"}
        />
      </div>
      <div>
        <label className={labelClass}>Founder quote</label>
        <textarea
          name="founder_quote"
          defaultValue={story?.founder_quote ?? ""}
          rows={2}
          className={textareaClass}
        />
      </div>
      <div>
        <label className={labelClass}>Attendee quote</label>
        <textarea
          name="attendee_quote"
          defaultValue={story?.attendee_quote ?? ""}
          rows={2}
          className={textareaClass}
        />
      </div>
      <div>
        <label className={labelClass}>Founder quote 2</label>
        <textarea
          name="founder_quote2"
          defaultValue={story?.founder_quote2 ?? ""}
          rows={2}
          className={textareaClass}
        />
      </div>
      <div>
        <label className={labelClass}>Why it matters</label>
        <textarea
          name="why_matters"
          defaultValue={story?.why_matters ?? ""}
          rows={4}
          className={textareaClass}
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 rounded-lg bg-slate-200 text-slate-900 font-oswald font-bold text-sm hover:bg-white transition-colors disabled:opacity-50"
        >
          {saving ? "Saving…" : story ? "Update story" : "Create story"}
        </button>
        <Link
          href="/admin/success-stories"
          className="px-4 py-2 rounded-lg border border-white/20 text-white/80 font-oswald text-sm hover:text-white transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
