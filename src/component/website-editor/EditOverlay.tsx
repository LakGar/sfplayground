"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useWebsiteContent } from "@/context/WebsiteContentContext";

type EditTarget = {
  key: string;
  type: "text" | "image" | "video";
  rect: DOMRect;
  element: HTMLElement;
};

export function EditOverlay({ children }: { children: React.ReactNode }) {
  const { getContent, setContent, refetch } = useWebsiteContent();
  const [targets, setTargets] = useState<EditTarget[]>([]);
  const [editing, setEditing] = useState<{
    key: string;
    type: "text" | "image" | "video";
    value: string;
    rect: DOMRect;
  } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateTargets = useCallback(() => {
    if (typeof document === "undefined") return;
    const els = document.querySelectorAll<HTMLElement>("[data-editable]");
    const next: EditTarget[] = [];
    els.forEach((el) => {
      const key = el.getAttribute("data-editable");
      const type = (el.getAttribute("data-editable-type") ?? "text") as
        | "text"
        | "image"
        | "video";
      if (!key) return;
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        next.push({ key, type, rect, element: el });
      }
    });
    setTargets(next);
  }, []);

  useEffect(() => {
    updateTargets();
    const interval = setInterval(updateTargets, 500);
    const ro = new ResizeObserver(updateTargets);
    ro.observe(document.documentElement);
    window.addEventListener("scroll", updateTargets, true);
    return () => {
      clearInterval(interval);
      ro.disconnect();
      window.removeEventListener("scroll", updateTargets, true);
    };
  }, [updateTargets]);

  const saveEdit = useCallback(async () => {
    if (!editing) return;
    try {
      await fetch("/api/admin/website-content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [editing.key]: editValue }),
      });
      setContent(editing.key, editValue);
      await refetch();
    } catch (e) {
      console.error("Failed to save:", e);
    }
    setEditing(null);
  }, [editing, editValue, setContent, refetch]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") setEditing(null);
      if (e.key === "Enter" && !e.shiftKey && editing?.type === "text") {
        e.preventDefault();
        saveEdit();
      }
    },
    [editing, saveEdit]
  );

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editing) return;
      setUploadError(null);
      setUploading(true);
      try {
        const formData = new FormData();
        formData.set("file", file);
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        if (data.url) setEditValue(data.url);
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
        e.target.value = "";
      }
    },
    [editing]
  );

  if (typeof document === "undefined") return <>{children}</>;

  const overlay = (
    <>
      <div
        className="fixed inset-0 z-[9998] pointer-events-none"
        aria-hidden
      >
        {targets
          .filter((t) => t.type === "text")
          .map((t, i) => (
            <div
              key={`text-${i}-${t.rect.top}-${t.rect.left}`}
              className="absolute border-2 border-[#19f7ea]/60 bg-[#19f7ea]/5 pointer-events-auto cursor-pointer rounded transition-colors hover:bg-[#19f7ea]/15 hover:border-[#19f7ea]"
              style={{
                left: t.rect.left,
                top: t.rect.top,
                width: t.rect.width,
                height: t.rect.height,
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const value = getContent(t.key);
                setEditValue(value);
                setEditing({
                  key: t.key,
                  type: t.type,
                  value,
                  rect: t.rect,
                });
              }}
            />
          ))}
      </div>

      {editing && (
        <div
          className="fixed z-[9999] bg-black/95 border border-white/20 rounded-lg shadow-xl p-4 min-w-[280px] max-w-[90vw]"
          style={{
            left: Math.min(editing.rect.left, window.innerWidth - 320),
            top: editing.rect.top + editing.rect.height + 8,
          }}
        >
          <div className="text-white/60 text-xs font-oswald mb-2 uppercase tracking-wider">
            {editing.type === "text"
              ? "Edit text"
              : editing.type === "image"
                ? "Change image"
                : "Change video"}
          </div>
          {editing.type === "text" ? (
            <textarea
              autoFocus
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={saveEdit}
              onKeyDown={handleKeyDown}
              className="w-full h-24 px-3 py-2 bg-white/10 border border-white/20 rounded text-white font-oswald text-sm resize-none focus:outline-none focus:border-[#19f7ea]"
              placeholder="Enter text..."
            />
          ) : (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept={editing.type === "image" ? "image/*" : "video/*"}
                className="hidden"
                onChange={handleFileSelect}
              />
              <input
                type="url"
                autoFocus
                value={editValue}
                onChange={(e) => {
                  setEditValue(e.target.value);
                  setUploadError(null);
                }}
                onKeyDown={handleKeyDown}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white font-oswald text-sm focus:outline-none focus:border-[#19f7ea] mb-2"
                placeholder={
                  editing.type === "image"
                    ? "URL or upload below"
                    : "URL or upload below"
                }
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full py-2 px-3 border border-[#19f7ea]/60 rounded text-[#19f7ea] text-sm font-oswald hover:bg-[#19f7ea]/10 disabled:opacity-50"
              >
                {uploading ? "Uploading…" : "Upload file"}
              </button>
              {uploadError && (
                <p className="text-red-400 text-xs mt-1">{uploadError}</p>
              )}
            </>
          )}
          <div className="flex gap-2 mt-3">
            <button
              type="button"
              onClick={saveEdit}
              className="px-3 py-1.5 bg-[#19f7ea] text-black text-sm font-oswald rounded hover:bg-white"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="px-3 py-1.5 text-white/70 text-sm font-oswald hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Media overlay: small "Change image/video" button in corner so the rest of the page stays clickable */}
      <div className="fixed inset-0 z-[9998] pointer-events-none" aria-hidden>
        {targets
          .filter((t) => t.type === "image" || t.type === "video")
          .map((t, i) => (
            <div
              key={`media-${i}-${t.rect.top}-${t.rect.left}`}
              className="absolute pointer-events-none"
              style={{
                left: t.rect.left,
                top: t.rect.top,
                width: t.rect.width,
                height: t.rect.height,
              }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setEditValue(getContent(t.key));
                  setEditing({
                    key: t.key,
                    type: t.type,
                    value: getContent(t.key),
                    rect: t.rect,
                  });
                }}
                className="absolute bottom-3 right-3 pointer-events-auto px-4 py-2 bg-[#19f7ea] text-black text-sm font-oswald rounded hover:bg-white shadow-lg border-2 border-black/20"
              >
                {t.type === "image" ? "Change image" : "Change video"}
              </button>
            </div>
          ))}
      </div>
    </>
  );

  return (
    <div ref={containerRef} className="relative">
      {children}
      {createPortal(overlay, document.body)}
    </div>
  );
}
