"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import type { EventRow } from "@/lib/db";

export function EventForm({ event }: { event?: EventRow }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const imagesRaw = (formData.get("images") as string) || "";
    const images = imagesRaw
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      slug: (formData.get("slug") as string).trim().toLowerCase().replace(/\s+/g, "-"),
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      location: formData.get("location") as string,
      attendees: parseInt(String(formData.get("attendees")), 10) || 0,
      status: (formData.get("status") as string) || "past",
      cover_image: (formData.get("cover_image") as string) || null,
      description: formData.get("description") as string,
      images,
    };

    try {
      const url = event
        ? `/api/admin/events/${event.id}`
        : "/api/admin/events";
      const method = event ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save");
      }
      router.push("/admin/events");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      {error && (
        <p className="text-red-400 text-sm font-oswald">{error}</p>
      )}
      <div>
        <label className="block text-white/80 font-oswald text-sm mb-1">
          Slug (URL path)
        </label>
        <input
          type="text"
          name="slug"
          defaultValue={event?.slug}
          required
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-sm placeholder-white/40 focus:outline-none focus:border-[#19f7ea]"
          placeholder="my-event-slug"
        />
      </div>
      <div>
        <label className="block text-white/80 font-oswald text-sm mb-1">
          Title
        </label>
        <input
          type="text"
          name="title"
          defaultValue={event?.title}
          required
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-[#19f7ea]"
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
            defaultValue={event?.date}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-[#19f7ea]"
            placeholder="Jan 12, 2026"
          />
        </div>
        <div>
          <label className="block text-white/80 font-oswald text-sm mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            defaultValue={event?.location}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-[#19f7ea]"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/80 font-oswald text-sm mb-1">
            Attendees
          </label>
          <input
            type="number"
            name="attendees"
            defaultValue={event?.attendees ?? 0}
            min={0}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-[#19f7ea]"
          />
        </div>
        <div>
          <label className="block text-white/80 font-oswald text-sm mb-1">
            Status
          </label>
          <select
            name="status"
            defaultValue={event?.status ?? "past"}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald focus:outline-none focus:border-[#19f7ea]"
          >
            <option value="past">past</option>
            <option value="upcoming">upcoming</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-white/80 font-oswald text-sm mb-1">
          Cover image URL
        </label>
        <input
          type="url"
          name="cover_image"
          defaultValue={event?.cover_image ?? ""}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-[#19f7ea]"
          placeholder="https://..."
        />
      </div>
      <div>
        <label className="block text-white/80 font-oswald text-sm mb-1">
          Description
        </label>
        <textarea
          name="description"
          defaultValue={event?.description ?? ""}
          required
          rows={4}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-[#19f7ea] resize-y"
        />
      </div>
      <div>
        <label className="block text-white/80 font-oswald text-sm mb-1">
          Gallery images (one URL per line)
        </label>
        <textarea
          name="images"
          defaultValue={event?.images?.join("\n") ?? ""}
          rows={6}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-sm placeholder-white/40 focus:outline-none focus:border-[#19f7ea] resize-y"
          placeholder="https://...&#10;https://..."
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 rounded-lg bg-[#19f7ea] text-black font-oswald font-bold text-sm hover:bg-white transition-colors disabled:opacity-50"
        >
          {saving ? "Saving…" : event ? "Update event" : "Create event"}
        </button>
        <Link
          href="/admin/events"
          className="px-4 py-2 rounded-lg border border-white/20 text-white/80 font-oswald text-sm hover:text-white transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
