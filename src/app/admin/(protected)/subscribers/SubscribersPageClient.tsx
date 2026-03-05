"use client";

import { useState, useMemo } from "react";
import type { Subscriber } from "@/lib/db";
import { SubscribersList } from "./SubscribersList";

export function SubscribersPageClient({
  subscribers,
}: {
  subscribers: Subscriber[];
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return subscribers;
    return subscribers.filter(
      (s) =>
        s.email.toLowerCase().includes(q) ||
        (s.name ?? "").toLowerCase().includes(q)
    );
  }, [subscribers, search]);

  return (
    <div className="space-y-4">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by email or name"
        className="w-full max-w-md px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-[#19f7ea]"
      />
      <SubscribersList subscribers={filtered} />
    </div>
  );
}
