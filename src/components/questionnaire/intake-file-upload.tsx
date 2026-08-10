"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import {
  INTAKE_UPLOAD_CONFIG,
  type IntakeUploadCategory,
} from "@/lib/intake-upload-config";
import { getProxiedImageUrl } from "@/utils/convertDriveImageUrl";

type IntakeFileUploadProps = {
  value: string;
  fileName?: string;
  onChange: (url: string, fileName?: string) => void;
  category: IntakeUploadCategory;
  label?: string;
  allowLink?: boolean;
};

export function IntakeFileUpload({
  value,
  fileName,
  onChange,
  category,
  label,
  allowLink = category === "document",
}: IntakeFileUploadProps) {
  const config = INTAKE_UPLOAD_CONFIG[category];
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [displayName, setDisplayName] = useState(fileName ?? "");
  const [linkInput, setLinkInput] = useState(isHttpUrl(value) ? value : "");

  const defaultLabel =
    category === "logo" ? "Choose logo file" : "Choose file to upload";
  const linkLabel =
    category === "document" ? "Paste a deck or file link" : "Paste file link";
  const readyLabel = useMemo(() => {
    if (displayName) return displayName;
    if (isHttpUrl(value)) {
      return getHostLabel(value) ?? "Linked file";
    }
    return "Uploaded file";
  }, [displayName, value]);

  function applyLink() {
    setUploadError("");
    const normalized = normalizeUrl(linkInput);
    if (!normalized || !isHttpUrl(normalized)) {
      setUploadError("Paste a valid link starting with http:// or https://.");
      return;
    }
    setDisplayName(getHostLabel(normalized) ?? "Linked file");
    onChange(normalized, getHostLabel(normalized) ?? "Linked file");
  }

  async function handleFile(file: File) {
    setUploadError("");
    if (file.size > config.maxBytes) {
      setUploadError(
        `That file is over ${formatBytes(config.maxBytes)}. Paste a Google Drive, DocSend, Dropbox, or Notion link instead.`,
      );
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);
      const res = await fetch("/api/intake/upload", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json().catch(() => null)) as {
        url?: string;
        fileName?: string;
        error?: string;
      } | null;
      if (!res.ok || !data?.url) {
        throw new Error(data?.error ?? "Upload failed. Try again.");
      }
      setDisplayName(data.fileName ?? file.name);
      setLinkInput("");
      onChange(data.url, data.fileName ?? file.name);
    } catch (error) {
      setUploadError(
        error instanceof Error
          ? `${error.message} You can paste a deck link instead.`
          : "Upload failed. You can paste a deck link instead.",
      );
    } finally {
      setUploading(false);
    }
  }

  function clear() {
    onChange("", "");
    setDisplayName("");
    setLinkInput("");
    setUploadError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  const fileLooksImage =
    displayName.match(/\.(png|jpe?g|webp|gif)$/i) ||
    value.match(/\.(png|jpe?g|webp|gif)(\?|$)/i);
  const isImage =
    Boolean(fileLooksImage) ||
    (category === "logo" && value.includes("drive.google.com"));

  const imageSrc = isImage ? getProxiedImageUrl(value) : value;

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={config.accept}
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />

      {value ? (
        <div className="flex flex-col gap-4 rounded-2xl border border-black/[0.08] bg-white p-4 sm:flex-row sm:items-center">
          {isImage ? (
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-black/10 bg-neutral-50">
              <Image
                src={imageSrc}
                alt=""
                fill
                className="object-contain p-2"
                unoptimized
              />
            </div>
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#0c1222]/5 font-oswald text-xs font-bold text-[#0c1222]">
              DOC
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-black">
              {readyLabel}
            </p>
            <p className="mt-1 text-xs text-black/45">
              {isHttpUrl(value) ? "Linked and ready to submit" : "Ready to submit"}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="rounded-full border border-black/15 px-4 py-2 text-sm text-black/70 transition-opacity hover:opacity-80 disabled:opacity-40"
            >
              {uploading ? "Uploading…" : "Replace"}
            </button>
            <button
              type="button"
              onClick={clear}
              disabled={uploading}
              className="text-sm text-black/40 transition-colors hover:text-black"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-black/20 bg-black/[0.02] px-6 py-12 text-center transition-colors hover:border-black/35 disabled:opacity-50"
        >
          <span className="font-oswald text-lg font-medium text-black">
            {uploading ? "Uploading…" : (label ?? defaultLabel)}
          </span>
          <span className="mt-2 text-sm text-black/45">{config.hint}</span>
        </button>
      )}

      {allowLink ? (
        <div className="mt-4 rounded-2xl border border-black/[0.08] bg-white p-4">
          <label className="block font-oswald text-sm font-medium uppercase tracking-[0.12em] text-black/45">
            {linkLabel}
          </label>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              type="url"
              value={linkInput}
              onChange={(event) => {
                setLinkInput(event.target.value);
                setUploadError("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  applyLink();
                }
              }}
              placeholder="https://drive.google.com/…"
              className="min-w-0 flex-1 rounded-full border border-black/10 px-4 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-black/30 focus:border-black"
            />
            <button
              type="button"
              onClick={applyLink}
              disabled={uploading}
              className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85 disabled:opacity-40"
            >
              Use link
            </button>
          </div>
          <p className="mt-2 text-xs text-black/45">
            Drive, DocSend, Dropbox, Notion, or a direct deck link works.
          </p>
        </div>
      ) : null}

      {uploadError ? (
        <p className="mt-3 text-sm text-red-600">{uploadError}</p>
      ) : null}
    </div>
  );
}

function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function getHostLabel(value: string): string | null {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function formatBytes(bytes: number): string {
  const mb = bytes / 1024 / 1024;
  return `${Number.isInteger(mb) ? mb : mb.toFixed(1)}MB`;
}
