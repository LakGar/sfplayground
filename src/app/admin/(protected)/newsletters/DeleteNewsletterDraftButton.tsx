"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteNewsletterDraftButton({ id }: { id: number }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/newsletters/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error ?? "Failed to delete draft");
        return;
      }
      router.push("/admin/newsletters");
      router.refresh();
    } finally {
      setDeleting(false);
    }
  }

  if (confirming) {
    return (
      <span className="text-sm">
        <span className="text-white/60 font-oswald">
          Delete this draft? This cannot be undone.
        </span>{" "}
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="text-red-400 hover:underline font-oswald"
        >
          {deleting ? "Deleting…" : "Yes, delete"}
        </button>{" "}
        <button
          type="button"
          onClick={() => setConfirming(false)}
          disabled={deleting}
          className="text-white/60 hover:underline font-oswald"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="text-red-400 hover:underline font-oswald text-sm"
    >
      Delete draft
    </button>
  );
}
