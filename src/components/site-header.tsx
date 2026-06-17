"use client";

import { Download, Plus, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  const dispatch = (name: string) => {
    window.dispatchEvent(new CustomEvent(name));
  };

  const openNewRecord = () => {
    window.sessionStorage.setItem("sfpg-open-new-record", "1");
    window.open("/admin/relationships", "_self");
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <div className="min-w-0">
          <h1 className="truncate text-base font-medium">SFPlayground</h1>
          <p className="hidden text-xs text-muted-foreground sm:block">
            Startup, investor, sponsor, and operator relationships
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex"
            onClick={() => dispatch("admin:export-crm")}
          >
            <Download />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex"
            asChild
          >
            <a href="/admin/outreach">
              <Send />
              Outreach
            </a>
          </Button>
          <Button size="sm" onClick={openNewRecord}>
            <Plus />
            New record
          </Button>
        </div>
      </div>
    </header>
  );
}
