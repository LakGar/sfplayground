"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Subscriber } from "@/lib/db";

export function SendNewsletterButton({
  draftId,
  subscribers,
}: {
  draftId: number;
  subscribers: Subscriber[];
}) {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(
    null
  );
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return subscribers;
    return subscribers.filter(
      (s) =>
        s.email.toLowerCase().includes(q) ||
        (s.name ?? "").toLowerCase().includes(q)
    );
  }, [search, subscribers]);

  const toggleSelected = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSend = async () => {
    setSending(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/newsletters/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          draftId,
          recipientIds: selectedIds.length > 0 ? selectedIds : undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setResult({ ok: true, message: data.message ?? "Sent successfully." });
        router.refresh();
      } else {
        setResult({
          ok: false,
          message: data.error ?? "Failed to send.",
        });
      }
    } catch {
      setResult({ ok: false, message: "Network error." });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-white/10 p-3 bg-white/5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipients by email or name"
            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-oswald placeholder-white/40 focus:outline-none focus:border-slate-300 text-sm"
          />
          <button
            type="button"
            onClick={() => setSelectedIds([])}
            className="px-2.5 py-2 rounded-lg border border-white/20 text-white/70 hover:bg-white/10 text-xs font-oswald whitespace-nowrap"
          >
            Clear
          </button>
        </div>
        <div className="max-h-56 overflow-auto rounded-lg border border-white/10 divide-y divide-white/10">
          {filtered.map((sub) => (
            <label
              key={sub.id}
              className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-white/5"
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(sub.id)}
                onChange={() => toggleSelected(sub.id)}
              />
              <span className="text-sm text-white/90 font-oswald">
                {sub.email}
                {sub.name ? ` (${sub.name})` : ""}
              </span>
            </label>
          ))}
          {filtered.length === 0 && (
            <p className="px-3 py-2 text-sm text-white/50 font-oswald">
              No recipients match your search.
            </p>
          )}
        </div>
        <p className="text-xs text-white/60 font-oswald">
          {selectedIds.length > 0
            ? `${selectedIds.length} selected recipient${selectedIds.length === 1 ? "" : "s"}`
            : "No recipients selected (will send to all)."}
        </p>
      </div>
      <button
        type="button"
        onClick={handleSend}
        disabled={sending}
        className="px-4 py-2 rounded-lg bg-slate-200 text-slate-900 font-oswald font-bold text-sm hover:bg-white disabled:opacity-50 transition-colors"
      >
        {sending ? "Sending…" : "Send now"}
      </button>
      {result && (
        <p
          className={
            result.ok
              ? "text-slate-200 text-sm font-oswald"
              : "text-red-400 text-sm font-oswald"
          }
        >
          {result.message}
        </p>
      )}
    </div>
  );
}
