"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import type { EventRow } from "@/lib/db";
import { Button } from "@/components/ui/button";

export function EventForm({ event }: { event?: EventRow }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [slugInput, setSlugInput] = useState(event?.slug ?? "");

  const previewSlug = slugInput.trim().toLowerCase().replace(/\s+/g, "-");
  const previewUrl = previewSlug ? `/events/${previewSlug}` : null;

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
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="font-oswald text-sm text-white/70">
          {event ? "Edit event" : "Create event"}
        </p>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={mode === "edit" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("edit")}
          >
            Edit
          </Button>
          <Button
            type="button"
            variant={mode === "preview" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("preview")}
          >
            Display mode
          </Button>
        </div>
      </div>

      {error && <p className="text-red-400 text-sm font-oswald">{error}</p>}

      {mode === "preview" ? (
        <div className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <p className="font-oswald text-white/80 text-sm">
              Preview
            </p>
          </div>
          <div className="p-0">
            {previewUrl ? (
              <div className="h-[65vh] w-full">
                <iframe
                  title={event?.title ?? "Event preview"}
                  src={previewUrl}
                  className="h-full w-full border-0 bg-white/5"
                />
              </div>
            ) : (
              <div className="p-6 text-sm text-white/60">
                Save or enter a slug to preview.
              </div>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-white/80 font-oswald text-sm mb-1">
              Slug (URL path)
            </label>
            <input
              type="text"
              name="slug"
              value={slugInput}
              onChange={(e) => setSlugInput(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-sm placeholder-white/40 focus:outline-none focus:border-slate-300"
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
                defaultValue={event?.date}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-slate-300"
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
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-slate-300"
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
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-slate-300"
              />
            </div>
            <div>
              <label className="block text-white/80 font-oswald text-sm mb-1">
                Status
              </label>
              <select
                name="status"
                defaultValue={event?.status ?? "past"}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald focus:outline-none focus:border-slate-300"
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
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-slate-300"
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
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-slate-300 resize-y"
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
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-sm placeholder-white/40 focus:outline-none focus:border-slate-300 resize-y"
              placeholder="https://...&#10;https://..."
            />
          </div>
          <div className="flex gap-3">
            <Button type="submit" disabled={saving} className="font-oswald font-bold">
              {saving ? "Saving…" : event ? "Update event" : "Create event"}
            </Button>
            <Link
              href="/admin/events"
              className="px-4 py-2 rounded-lg border border-white/20 text-white/80 font-oswald text-sm hover:text-white transition-colors inline-flex items-center justify-center h-10"
            >
              Cancel
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
