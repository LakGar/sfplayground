"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { Check, ExternalLink, MoreHorizontal, Pencil, Share2, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";

export function NavDocuments({
  items,
}: {
  items: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const { isMobile } = useSidebar();
  const [labels, setLabels] = React.useState<Record<string, string>>({});
  const [editing, setEditing] = React.useState<{ url: string; name: string } | null>(null);

  React.useEffect(() => {
    try {
      setLabels(JSON.parse(window.localStorage.getItem("sfpg-data-source-labels") ?? "{}"));
    } catch {
      setLabels({});
    }
  }, []);

  const copyLink = async (url: string) => {
    await navigator.clipboard.writeText(new URL(url, window.location.origin).href);
    toast.success("Link copied.");
  };

  const startRename = (url: string, currentName: string) => {
    setEditing({ url, name: labels[url] ?? currentName });
  };

  const saveRename = (url: string, currentName: string) => {
    const trimmed = editing?.name.trim() ?? "";
    if (!trimmed) {
      toast.error("Name cannot be empty.");
      return;
    }
    setLabels((current) => {
      const next = { ...current };
      if (trimmed === currentName) {
        delete next[url];
      } else {
        next[url] = trimmed;
      }
      window.localStorage.setItem("sfpg-data-source-labels", JSON.stringify(next));
      return next;
    });
    setEditing(null);
    toast.success("Data source renamed.");
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Data sources</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            {editing?.url === item.url ? (
              <form
                className="flex h-8 min-w-0 items-center gap-1 rounded-md p-1 pr-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  saveRename(item.url, item.name);
                }}
              >
                <item.icon className="size-4 shrink-0" />
                <Input
                  autoFocus
                  value={editing.name}
                  className="h-6 min-w-0 flex-1 px-2 text-xs"
                  onChange={(event) => setEditing({ url: item.url, name: event.target.value })}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      event.preventDefault();
                      setEditing(null);
                    }
                  }}
                  aria-label={`Rename ${item.name}`}
                />
                <button
                  type="submit"
                  className="flex size-6 shrink-0 items-center justify-center rounded-sm hover:bg-sidebar-accent"
                  aria-label="Save name"
                >
                  <Check className="size-4" />
                </button>
                <button
                  type="button"
                  className="flex size-6 shrink-0 items-center justify-center rounded-sm hover:bg-sidebar-accent"
                  onClick={() => setEditing(null)}
                  aria-label="Cancel rename"
                >
                  <X className="size-4" />
                </button>
              </form>
            ) : (
              <>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{labels[item.url] ?? item.name}</span>
                  </a>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover className="rounded-sm data-[state=open]:bg-accent">
                      <MoreHorizontal />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-32 rounded-lg"
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                  >
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <a href={item.url} target={item.url.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                          <ExternalLink />
                          <span>Open</span>
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => copyLink(item.url)}>
                        <Share2 />
                        <span>Share</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => startRename(item.url, item.name)}>
                        <Pencil />
                        <span>Rename</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => toast.info("Data sources are configured in code so they cannot be removed here.")}
                    >
                      <Trash2 />
                      <span>Remove</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
