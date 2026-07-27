"use client";

import * as React from "react";
import { RefreshCw, Save } from "lucide-react";
import { toast } from "sonner";

import { WEBSITE_CONTENT_CONFIG } from "@/data/website-content-keys";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type WebsiteContent = Record<string, string>;

const sectionLabels: Record<string, string> = {
  hero: "Hero",
  nav: "Navigation",
  cta: "CTA",
  faq: "FAQ",
  about: "About",
  howItWorks: "How it works",
};

function groupContentKeys() {
  return Object.keys(WEBSITE_CONTENT_CONFIG).reduce<Record<string, string[]>>((groups, key) => {
    const section = key.split(".")[0] || "other";
    groups[section] = groups[section] ?? [];
    groups[section].push(key);
    return groups;
  }, {});
}

function isLongText(value: string) {
  return value.length > 90 || /answer|subtitle|description|subline|copy/i.test(value);
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(payload.error ?? "Request failed");
  }
  return response.json() as Promise<T>;
}

export function AdminWebsiteContentPage() {
  const groups = React.useMemo(groupContentKeys, []);
  const sections = React.useMemo(() => Object.keys(groups), [groups]);
  const [activeSection, setActiveSection] = React.useState(sections[0] ?? "hero");
  const [content, setContent] = React.useState<WebsiteContent>(() =>
    Object.fromEntries(
      Object.entries(WEBSITE_CONTENT_CONFIG).map(([key, config]) => [key, config.default]),
    ),
  );
  const [dirty, setDirty] = React.useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const loadContent = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const stored = await parseResponse<WebsiteContent>(await fetch("/api/admin/website-content"));
      setContent(
        Object.fromEntries(
          Object.entries(WEBSITE_CONTENT_CONFIG).map(([key, config]) => [
            key,
            stored[key] ?? config.default,
          ]),
        ),
      );
      setDirty(new Set());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not load website content.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void loadContent();
  }, [loadContent]);

  const updateValue = (key: string, value: string) => {
    setContent((current) => ({ ...current, [key]: value }));
    setDirty((current) => new Set(current).add(key));
  };

  const saveChanges = async () => {
    if (dirty.size === 0) {
      toast.info("No content changes to save.");
      return;
    }
    setIsSaving(true);
    try {
      const payload = Object.fromEntries(Array.from(dirty).map((key) => [key, content[key] ?? ""]));
      const next = await parseResponse<WebsiteContent>(
        await fetch("/api/admin/website-content", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
      );
      setContent((current) => ({ ...current, ...next }));
      setDirty(new Set());
      toast.success("Website content saved.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save website content.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Tabs
      value={activeSection}
      onValueChange={setActiveSection}
      className="min-w-0 max-w-full flex-col gap-6 overflow-hidden px-4 lg:px-6"
    >
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <TabsList className="flex h-auto max-w-full flex-wrap justify-start overflow-x-auto">
          {sections.map((section) => (
            <TabsTrigger key={section} value={section}>
              {sectionLabels[section] ?? section}
              <Badge variant="secondary">{groups[section].length}</Badge>
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="flex max-w-full flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={loadContent} disabled={isLoading || isSaving}>
            <RefreshCw />
            Reload
          </Button>
          <Button size="sm" onClick={saveChanges} disabled={isSaving || dirty.size === 0}>
            <Save />
            {isSaving ? "Saving..." : `Save ${dirty.size || ""}`.trim()}
          </Button>
        </div>
      </div>
      {sections.map((section) => (
        <TabsContent key={section} value={section} className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>{sectionLabels[section] ?? section}</CardTitle>
              <CardDescription>
                Edit public website titles, section copy, image URLs, and video URLs.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {groups[section].map((key) => {
                const config = WEBSITE_CONTENT_CONFIG[key];
                const value = content[key] ?? config.default;
                return (
                  <div className="grid gap-2" key={key}>
                    <div className="flex items-center justify-between gap-3">
                      <Label htmlFor={`content-${key}`}>{key}</Label>
                      <Badge variant="outline">{config.type}</Badge>
                    </div>
                    {config.type === "text" && isLongText(config.default) ? (
                      <textarea
                        id={`content-${key}`}
                        value={value}
                        onChange={(event) => updateValue(key, event.target.value)}
                        className="min-h-24 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                      />
                    ) : (
                      <Input
                        id={`content-${key}`}
                        value={value}
                        onChange={(event) => updateValue(key, event.target.value)}
                      />
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
