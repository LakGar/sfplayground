"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteEventButton({ id }: { id: number }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!window.confirm("Delete this event? This cannot be undone.")) return;
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        router.push("/admin/events");
        router.refresh();
      } else {
        setError(data.error ?? "Failed to delete event.");
      }
    } catch {
      setError("Failed to delete event.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {" · "}
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="text-red-400 hover:underline font-oswald text-sm disabled:opacity-50"
      >
        {deleting ? "Deleting…" : "Delete"}
      </button>
      {error && (
        <span className="ml-2 text-red-400 text-sm font-oswald" role="alert">
          {error}
        </span>
      )}
    </>
  );
}
