"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteBlogPostButton({ id }: { id: number }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error ?? "Failed to delete post");
        return;
      }
      router.push("/admin/blog");
      router.refresh();
    } finally {
      setDeleting(false);
    }
  }

  if (confirming) {
    return (
      <span className="text-sm">
        <span className="text-white/60 font-oswald">
          Delete this post? This cannot be undone.
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
      Delete
    </button>
  );
}
