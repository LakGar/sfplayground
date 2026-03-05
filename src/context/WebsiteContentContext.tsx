"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  WEBSITE_CONTENT_CONFIG,
  type WebsiteContentKey,
} from "@/data/website-content-keys";

type ContentMap = Record<string, string>;

const WebsiteContentContext = createContext<{
  content: ContentMap;
  getContent: (key: string) => string;
  setContent: (key: string, value: string) => void;
  refetch: () => Promise<void>;
} | null>(null);

export function WebsiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContentState] = useState<ContentMap>({});

  const refetch = useCallback(async () => {
    try {
      const res = await fetch("/api/website-content");
      const data = await res.json();
      if (typeof data === "object" && data !== null) {
        setContentState(data as ContentMap);
      }
    } catch {
      setContentState({});
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const getContent = useCallback(
    (key: string): string => {
      if (content[key] !== undefined && content[key] !== "") return content[key];
      return WEBSITE_CONTENT_CONFIG[key]?.default ?? "";
    },
    [content]
  );

  const setContent = useCallback((key: string, value: string) => {
    setContentState((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <WebsiteContentContext.Provider
      value={{ content, getContent, setContent, refetch }}
    >
      {children}
    </WebsiteContentContext.Provider>
  );
}

export function useWebsiteContent() {
  const ctx = useContext(WebsiteContentContext);
  if (!ctx) {
    return {
      getContent: (key: string) =>
        WEBSITE_CONTENT_CONFIG[key]?.default ?? "",
      setContent: () => {},
      refetch: async () => {},
      content: {} as ContentMap,
    };
  }
  return ctx;
}
