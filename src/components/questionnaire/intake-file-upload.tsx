"use client";

import Image from "next/image";
import { useRef, useState } from "react";
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
};

export function IntakeFileUpload({
  value,
  fileName,
  onChange,
  category,
  label,
}: IntakeFileUploadProps) {
  const config = INTAKE_UPLOAD_CONFIG[category];
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [displayName, setDisplayName] = useState(fileName ?? "");

  const defaultLabel =
    category === "logo" ? "Choose logo file" : "Choose file to upload";

  async function handleFile(file: File) {
    setUploadError("");
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
      onChange(data.url, data.fileName ?? file.name);
    } catch (error) {
      onChange("", "");
      setDisplayName("");
      setUploadError(
        error instanceof Error ? error.message : "Upload failed. Try again.",
      );
    } finally {
      setUploading(false);
    }
  }

  function clear() {
    onChange("", "");
    setDisplayName("");
    setUploadError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  const isImage =
    category === "logo" ||
    displayName.match(/\.(png|jpe?g|webp|gif)$/i) ||
    value.match(/\.(png|jpe?g|webp|gif)$/i) ||
    value.includes("drive.google.com");

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
              {displayName || "Uploaded file"}
            </p>
            <p className="mt-1 text-xs text-black/45">Ready to submit</p>
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

      {uploadError ? (
        <p className="mt-3 text-sm text-red-600">{uploadError}</p>
      ) : null}
    </div>
  );
}
