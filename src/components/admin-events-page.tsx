"use client";

import * as React from "react";
import { CalendarDays, ExternalLink, MapPin, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { EventRow, NextEventRow } from "@/lib/db";

type EventForm = {
  id?: number;
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: string;
  status: "upcoming" | "past";
  organizer: string;
  luma_url: string;
  cover_image: string;
  description: string;
  images: string;
};

const emptyForm: EventForm = {
  slug: "",
  title: "",
  date: "",
  time: "",
  location: "",
  attendees: "0",
  status: "upcoming",
  organizer: "SFPLAYGROUND",
  luma_url: "",
  cover_image: "",
  description: "",
  images: "",
};

function formFromEvent(event: EventRow): EventForm {
  return {
    id: event.id,
    slug: event.slug,
    title: event.title,
    date: event.date,
    time: event.time ?? "",
    location: event.location,
    attendees: String(event.attendees ?? 0),
    status: event.status === "upcoming" ? "upcoming" : "past",
    organizer: event.organizer || "SFPLAYGROUND",
    luma_url: event.luma_url ?? "",
    cover_image: event.cover_image ?? "",
    description: event.description,
    images: event.images.join("\n"),
  };
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function EventImage({
  src,
  alt,
  className,
}: {
  src: string | null;
  alt: string;
  className: string;
}) {
  return src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} />
  ) : (
    <div className={className} aria-label={alt} />
  );
}

function UpcomingCard({ event, onEdit }: { event: EventRow; onEdit: (event: EventRow) => void }) {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-black/[0.06] bg-white p-4 text-black shadow-[0_6px_28px_-10px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_10px_36px_-10px_rgba(0,0,0,0.12)] md:gap-5 md:p-5">
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs text-black/45 md:text-sm">{event.time || event.date}</p>
          <Badge className="bg-[#e8f5ec] text-[#1a5c38] hover:bg-[#e8f5ec]">Upcoming</Badge>
        </div>
        <h3 className="mt-1 font-oswald text-lg font-bold leading-snug tracking-tight md:text-xl">
          {event.title}
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-black/55 md:text-sm">
          <span className="inline-flex items-center gap-1.5">
            <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full bg-black/5">
              <EventImage src="/images/logo.png" alt="" className="h-full w-full object-cover" />
            </span>
            By {event.organizer || "SFPLAYGROUND"}
          </span>
          <span className="hidden text-black/25 sm:inline" aria-hidden>
            ·
          </span>
          <span className="inline-flex min-w-0 items-start gap-1">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-black/40" />
            <span className="leading-snug">{event.location}</span>
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => onEdit(event)}>
            <Pencil />
            Edit
          </Button>
          {event.luma_url ? (
            <Button size="sm" variant="outline" asChild>
              <a href={event.luma_url} target="_blank" rel="noreferrer">
                <ExternalLink />
                Luma
              </a>
            </Button>
          ) : null}
        </div>
      </div>
      <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-xl bg-neutral-100 md:h-[100px] md:w-[100px]">
        <EventImage
          src={event.cover_image}
          alt={`${event.title} event poster`}
          className="h-full w-full object-cover"
        />
      </div>
    </article>
  );
}

function PreviousCard({ event, onEdit }: { event: EventRow; onEdit: (event: EventRow) => void }) {
  return (
    <article className="group relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-neutral-100 md:aspect-[3/4]">
      <EventImage
        src={event.cover_image}
        alt={event.title}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/65 via-black/25 to-transparent px-6 pb-6 pt-16">
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge variant="secondary">{event.date || "Previous event"}</Badge>
          {event.attendees > 0 ? <Badge variant="secondary">{event.attendees} attendees</Badge> : null}
        </div>
        <h3 className="font-oswald text-2xl font-bold leading-tight tracking-tight text-white md:text-[1.75rem]">
          {event.title}
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={() => onEdit(event)}>
            <Pencil />
            Edit
          </Button>
          {event.luma_url ? (
            <Button size="sm" variant="secondary" asChild>
              <a href={event.luma_url} target="_blank" rel="noreferrer">
                <ExternalLink />
                Link
              </a>
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function AdminEventsPage({
  events,
  nextEvent,
}: {
  events: EventRow[];
  nextEvent: NextEventRow | null;
}) {
  const [items, setItems] = React.useState(events);
  const [form, setForm] = React.useState<EventForm>(emptyForm);
  const [open, setOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const upcoming = items.filter((event) => event.status === "upcoming");
  const previous = items.filter((event) => event.status !== "upcoming");

  const updateForm = (key: keyof EventForm, value: string) => {
    setForm((current) => ({
      ...current,
      [key]: value,
      slug: key === "title" && !current.id && !current.slug ? slugify(value) : current.slug,
    }));
  };

  const openNew = (status: "upcoming" | "past") => {
    setForm({ ...emptyForm, status });
    setOpen(true);
  };

  const saveEvent = async () => {
    if (!form.title.trim() || !form.date.trim() || !form.location.trim() || !form.description.trim()) {
      toast.error("Title, date, location, and description are required.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        slug: form.slug || slugify(form.title),
        title: form.title,
        date: form.date,
        time: form.time || null,
        location: form.location,
        attendees: Number.parseInt(form.attendees, 10) || 0,
        status: form.status,
        organizer: form.organizer || "SFPLAYGROUND",
        luma_url: form.luma_url || null,
        cover_image: form.cover_image || null,
        description: form.description,
        images: form.images
          .split("\n")
          .map((image) => image.trim())
          .filter(Boolean),
      };
      const response = await fetch(form.id ? `/api/admin/events/${form.id}` : "/api/admin/events", {
        method: form.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save event.");
      setItems((current) =>
        form.id
          ? current.map((event) => (event.id === form.id ? result : event))
          : [result, ...current],
      );
      setOpen(false);
      setForm(emptyForm);
      toast.success(form.id ? "Event updated." : "Event added.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save event.");
    } finally {
      setSaving(false);
    }
  };

  const deleteEvent = async () => {
    if (!form.id || !confirm(`Delete ${form.title}?`)) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/events/${form.id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not delete event.");
      setItems((current) => current.filter((event) => event.id !== form.id));
      setOpen(false);
      toast.success("Event deleted.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete event.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-8 px-4 pb-8 lg:px-6">
      <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm font-medium">Site event source</div>
          <p className="text-sm text-muted-foreground">
            Imported from the public upcoming and previous event sections. Organizer defaults to SFPLAYGROUND.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => openNew("upcoming")}>
            <Plus />
            Upcoming event
          </Button>
          <Button variant="outline" onClick={() => openNew("past")}>
            <Plus />
            Previous event
          </Button>
        </div>
      </div>

      {nextEvent ? (
        <section className="grid gap-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-oswald text-2xl font-bold tracking-tight">Featured Next Event</h2>
            <Badge>{nextEvent.date}</Badge>
          </div>
          <div className="grid gap-4 rounded-2xl border bg-white p-4 text-black md:grid-cols-[140px_1fr]">
            <div className="aspect-square overflow-hidden rounded-xl bg-neutral-100">
              <EventImage
                src={nextEvent.image_url}
                alt={nextEvent.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid gap-2">
              <h3 className="font-oswald text-2xl font-bold">{nextEvent.title}</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-black/60">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="size-4" />
                  {nextEvent.time || "Time TBD"}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4" />
                  {nextEvent.location}
                </span>
              </div>
              <p className="text-sm text-black/70">{nextEvent.hook}</p>
              {nextEvent.cta_url ? (
                <Button size="sm" className="w-fit" asChild>
                  <a href={nextEvent.cta_url} target="_blank" rel="noreferrer">
                    <ExternalLink />
                    {nextEvent.cta_text}
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <section className="grid gap-4">
        <div>
          <h2 className="font-oswald text-3xl font-bold tracking-tight">Upcoming Events</h2>
          <p className="text-sm text-muted-foreground">Luma-style cards from the public homepage.</p>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          {upcoming.map((event) => (
            <UpcomingCard key={event.id} event={event} onEdit={(selected) => {
              setForm(formFromEvent(selected));
              setOpen(true);
            }} />
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        <div>
          <h2 className="font-oswald text-3xl font-bold tracking-tight">Previous Events</h2>
          <p className="text-sm text-muted-foreground">Poster cards matching the public previous events section.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {previous.map((event) => (
            <PreviousCard key={event.id} event={event} onEdit={(selected) => {
              setForm(formFromEvent(selected));
              setOpen(true);
            }} />
          ))}
        </div>
      </section>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>{form.id ? "Edit event" : "Add event"}</SheetTitle>
            <SheetDescription>
              Store the public event card data: Luma link, image, time, location, and organizer.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-5 px-4 py-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="event-status">Type</Label>
                <Select value={form.status} onValueChange={(value) => updateForm("status", value)}>
                  <SelectTrigger id="event-status" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="past">Previous</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="event-organizer">Organizer</Label>
                <Input
                  id="event-organizer"
                  value={form.organizer}
                  onChange={(event) => updateForm("organizer", event.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="event-title">Title</Label>
              <Input
                id="event-title"
                value={form.title}
                onChange={(event) => updateForm("title", event.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="event-slug">Slug</Label>
              <Input
                id="event-slug"
                value={form.slug}
                onChange={(event) => updateForm("slug", event.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="event-date">Date</Label>
                <Input
                  id="event-date"
                  value={form.date}
                  onChange={(event) => updateForm("date", event.target.value)}
                  placeholder="Monday, June 29, 2026"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="event-time">Time</Label>
                <Input
                  id="event-time"
                  value={form.time}
                  onChange={(event) => updateForm("time", event.target.value)}
                  placeholder="5:30 PM - 9:00 PM"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="event-location">Location</Label>
              <Input
                id="event-location"
                value={form.location}
                onChange={(event) => updateForm("location", event.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="event-luma">Luma / public link</Label>
                <Input
                  id="event-luma"
                  value={form.luma_url}
                  onChange={(event) => updateForm("luma_url", event.target.value)}
                  placeholder="https://luma.com/..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="event-attendees">Attendees</Label>
                <Input
                  id="event-attendees"
                  value={form.attendees}
                  onChange={(event) => updateForm("attendees", event.target.value)}
                  inputMode="numeric"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="event-cover">Image URL</Label>
              <Input
                id="event-cover"
                value={form.cover_image}
                onChange={(event) => updateForm("cover_image", event.target.value)}
                placeholder="/images/events/poster.png"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="event-description">Description / tags</Label>
              <textarea
                id="event-description"
                value={form.description}
                onChange={(event) => updateForm("description", event.target.value)}
                className="min-h-24 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="event-images">Gallery images</Label>
              <textarea
                id="event-images"
                value={form.images}
                onChange={(event) => updateForm("images", event.target.value)}
                placeholder="One image URL per line"
                className="min-h-24 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              />
            </div>
          </div>
          <SheetFooter className="gap-2">
            {form.id ? (
              <Button variant="destructive" onClick={deleteEvent} disabled={saving}>
                <Trash2 />
                Delete
              </Button>
            ) : null}
            <Button variant="outline" onClick={() => setOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={saveEvent} disabled={saving}>
              {saving ? "Saving..." : "Save event"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
