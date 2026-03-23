"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type NextEventData = {
  title: string;
  date: string;
  time: string;
  location: string;
  hook: string;
  ctaText: string;
  imageUrl?: string;
};

export function NextEventForm({ initial }: { initial: NextEventData }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload: NextEventData = {
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      time: (formData.get("time") as string) || "",
      location: formData.get("location") as string,
      hook: formData.get("hook") as string,
      ctaText: formData.get("ctaText") as string,
      imageUrl: (formData.get("imageUrl") as string) || undefined,
    };

    try {
      const res = await fetch("/api/admin/next-event", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      {error && (
        <p className="text-red-400 text-sm font-oswald">{error}</p>
      )}
      <div>
        <label className="block text-white/80 font-oswald text-sm mb-1">
          Title
        </label>
        <input
          type="text"
          name="title"
          defaultValue={initial.title}
          required
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-slate-300"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/80 font-oswald text-sm mb-1">
            Date
          </label>
          <input
            type="text"
            name="date"
            defaultValue={initial.date}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-slate-300"
            placeholder="March 15, 2026"
          />
        </div>
        <div>
          <label className="block text-white/80 font-oswald text-sm mb-1">
            Time
          </label>
          <input
            type="text"
            name="time"
            defaultValue={initial.time}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-slate-300"
            placeholder="6:00 PM"
          />
        </div>
      </div>
      <div>
        <label className="block text-white/80 font-oswald text-sm mb-1">
          Location
        </label>
        <input
          type="text"
          name="location"
          defaultValue={initial.location}
          required
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-slate-300"
        />
      </div>
      <div>
        <label className="block text-white/80 font-oswald text-sm mb-1">
          Hook (one line)
        </label>
        <input
          type="text"
          name="hook"
          defaultValue={initial.hook}
          required
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-slate-300"
        />
      </div>
      <div>
        <label className="block text-white/80 font-oswald text-sm mb-1">
          CTA button text
        </label>
        <input
          type="text"
          name="ctaText"
          defaultValue={initial.ctaText}
          required
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-slate-300"
          placeholder="Get my spot"
        />
      </div>
      <div>
        <label className="block text-white/80 font-oswald text-sm mb-1">
          Image URL (optional)
        </label>
        <input
          type="url"
          name="imageUrl"
          defaultValue={initial.imageUrl ?? ""}
          placeholder="https://..."
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-slate-300"
        />
      </div>
      <button
        type="submit"
        disabled={saving}
        className="px-4 py-2 rounded-lg bg-slate-200 text-slate-900 font-oswald font-bold hover:bg-white disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
