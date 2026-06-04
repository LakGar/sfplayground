"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type LogoUploadFieldProps = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

export function LogoUploadField({
  value,
  onChange,
  label = "Upload logo",
}: LogoUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleFile(file: File) {
    setUploadError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/intake/upload", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json().catch(() => null)) as {
        url?: string;
        error?: string;
      } | null;
      if (!res.ok || !data?.url) {
        throw new Error(data?.error ?? "Upload failed. Try again.");
      }
      onChange(data.url);
    } catch (error) {
      onChange("");
      setUploadError(
        error instanceof Error ? error.message : "Upload failed. Try again.",
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />

      {value ? (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-black/10 bg-white">
            <Image
              src={value}
              alt="Uploaded logo"
              fill
              className="object-contain p-2"
              unoptimized
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="rounded-full border border-black/15 px-4 py-2 text-sm text-black/70 transition-opacity hover:opacity-80 disabled:opacity-40"
            >
              {uploading ? "Uploading…" : "Replace logo"}
            </button>
            <button
              type="button"
              onClick={() => {
                onChange("");
                setUploadError("");
                if (inputRef.current) inputRef.current.value = "";
              }}
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
            {uploading ? "Uploading…" : label}
          </span>
          <span className="mt-2 text-sm text-black/45">
            PNG, JPG, or WebP · max 5MB
          </span>
        </button>
      )}

      {uploadError ? (
        <p className="mt-3 text-sm text-red-600">{uploadError}</p>
      ) : null}
    </div>
  );
}
