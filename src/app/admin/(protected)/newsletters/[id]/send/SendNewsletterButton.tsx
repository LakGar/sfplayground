"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SendNewsletterButton({ draftId }: { draftId: number }) {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(
    null
  );

  const handleSend = async () => {
    setSending(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/newsletters/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draftId }),
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
