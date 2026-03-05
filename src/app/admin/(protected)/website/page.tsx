"use client";

import React, { useMemo, useState } from "react";

const PAGES = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/blog", label: "Blog" },
  { path: "/success-stories", label: "Success Stories" },
  { path: "/#events", label: "Events" },
] as const;

const VIEWPORTS = [
  { id: "desktop", label: "Desktop", width: 1440 },
  { id: "tablet", label: "Tablet", width: 768 },
  { id: "mobile", label: "Mobile", width: 375 },
] as const;

export default function AdminWebsitePage() {
  const [currentPath, setCurrentPath] = useState("/");
  const [viewport, setViewport] = useState<(typeof VIEWPORTS)[number]["id"]>("desktop");

  const iframeSrc = useMemo(() => {
    const path = currentPath.startsWith("/#") ? "/" : currentPath;
    const hash = currentPath.startsWith("/#") ? currentPath.slice(2) : "";
    const base = typeof window !== "undefined" ? window.location.origin : "";
    const url = new URL(path, base || "http://localhost:3000");
    url.searchParams.set("editMode", "1");
    return url.pathname + url.search + (hash ? `#${hash}` : "");
  }, [currentPath]);

  const currentViewport = VIEWPORTS.find((v) => v.id === viewport) ?? VIEWPORTS[0];
  const iframeWidth = currentViewport.width;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <h1 className="text-2xl font-oswald font-bold text-white mb-2">
        Edit website
      </h1>
      <p className="text-white/60 mb-4">
        Click any content to edit. Use the buttons on images and videos to change media. Toggle view to preview mobile or desktop.
      </p>

      {/* Toolbar: page tabs + viewport toggle */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-white/60 text-sm font-oswald uppercase tracking-wider">
            Page
          </span>
          <div className="flex rounded-lg border border-white/20 overflow-hidden">
            {PAGES.map((p) => (
              <button
                key={p.path}
                type="button"
                onClick={() => setCurrentPath(p.path)}
                className={`px-4 py-2 text-sm font-oswald transition-colors ${
                  currentPath === p.path
                    ? "bg-[#19f7ea] text-black"
                    : "bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/60 text-sm font-oswald uppercase tracking-wider">
            View
          </span>
          <div className="flex rounded-lg border border-white/20 overflow-hidden">
            {VIEWPORTS.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setViewport(v.id)}
                className={`px-4 py-2 text-sm font-oswald transition-colors ${
                  viewport === v.id
                    ? "bg-[#19f7ea] text-black"
                    : "bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Iframe container with viewport width */}
      <div className="flex-1 min-h-0 rounded-lg border border-white/20 bg-black/50 overflow-hidden flex justify-center">
        <div
          className="h-full transition-[width] duration-200 flex justify-center bg-white/5 w-full"
          style={{ maxWidth: iframeWidth }}
        >
          <iframe
            key={iframeSrc}
            src={iframeSrc}
            title="Website preview"
            className="w-full h-full border-0 bg-white"
            style={{
              maxWidth: iframeWidth,
              boxShadow: "0 0 0 1px rgba(255,255,255,0.1)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
